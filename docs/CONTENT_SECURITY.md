# Content Security — Vault Question Bank

Documento de referencia de cómo está protegido el banco de preguntas de Aviatory.

> **TL;DR**: imposible impedir que un usuario individual VEA preguntas (las paga). El objetivo es subir DRÁSTICAMENTE el costo de scraping/exfiltración masiva. Lo logramos con 5 capas de defensa.

## Las 5 capas

### Capa 1 — Encriptación at-rest (`pgcrypto.pgp_sym_encrypt`)

- Todas las preguntas, opciones, respuestas correctas y explicaciones se guardan **encriptadas** en `vault_questions` como `bytea`.
- La master key vive en **Supabase Vault** (Settings → Vault → secret name: `vault_questions_master_key`). NUNCA en código, .env, ni logs.
- Si alguien hace dump de la DB, obtiene blobs sin la key son ininteligibles.
- Solo `private.get_master_key()` (security definer) puede leer el secret.

### Capa 2 — RLS bloquea SELECT directo

```sql
-- vault_questions tiene RLS habilitado y CERO policies.
-- Esto significa que ningún role (authenticated, anon) puede hacer
-- `select * from vault_questions`. NI con SQL injection.
```

Solo las RPCs definidas (security definer) pueden leer la tabla. Service role sí tiene acceso para mantenimiento.

### Capa 3 — La respuesta correcta jamás sale al cliente antes del submit

`vault_start_quiz(...)` devuelve solo:
- `position` (1..N)
- `question` (texto descifrado)
- `options` (opciones descifradas)

NO devuelve `correct_answer` ni `explanation`. Esos se entregan únicamente después del submit, en `vault_submit_answer(...)`.

Significa que inspeccionar la network tab del browser no revela las respuestas. Aunque el atacante guarde todo el JSON de respuesta, no tiene la answer.

### Capa 4 — Sessions con tokens efímeros (20 min)

`vault_sessions` crea un token UUID por cada quiz iniciado. El cliente solo ve:
- El token de su sesión (uuid v4, no correlacionable)
- Las preguntas por posición (1, 2, 3...) — NO los `question_id` reales

Aunque el atacante acumule preguntas de muchas sesiones, no puede deduplicar fácilmente porque los IDs no son visibles. Y el token expira en 20 min.

### Capa 5 — Rate limiting + audit log

`vault_access_log` registra cada `request` y `submit` con `user_id`, `question_id` (internal), `accessed_at`.

`vault_start_quiz` valida que el usuario no haya pedido más de **100 preguntas en la última hora**. Si excede, error `rate_limit_exceeded`.

Adicionales:
- Patrón detectable: usuario pidiendo 100/hora repetidamente → flag para revisión manual.
- Patrón detectable: usuario abriendo sesión, leyendo preguntas, abandonando sin submit → scraper.

## Plus: frontend (ya activo)

PR #29 ya añadió en `src/components/ProtectedContent.tsx`:
- `user-select: none` en preguntas/respuestas
- Right-click bloqueado en contenido protegido
- Watermark con email del usuario superpuesto al contenido

Esos son **deterrentes psicológicos** — fáciles de bypass técnicamente, pero suben fricción para usuarios no técnicos y dejan trazabilidad si comparten screenshots.

## Workflow de carga de contenido

Ver `private-batches/README.md` y `scripts/seed-questions.mjs`.

Resumen:
1. Cami pone JSON en `private-batches/` (gitignored).
2. `npm run seed-questions -- private-batches/X.json` lo encripta y sube.
3. Borra el JSON local.

## Master key — cómo generar y guardar

```bash
# Generar 256 bits de entropía (32 bytes en hex)
openssl rand -hex 32
# → ejemplo: 7f3b9c2a8e1d4f6...
```

En Supabase Dashboard:
1. Settings → Vault → "New secret"
2. Name: `vault_questions_master_key`
3. Value: el hex generado arriba
4. Save

**IMPORTANTE**: una vez creado el secret, NO LO PIERDAS. Si se pierde, todas las preguntas encriptadas quedan irrecuperables. Guárdalo en un password manager además del Vault.

Si necesitas rotarlo (recomendado anualmente):
1. Crea nuevo secret `vault_questions_master_key_v2`.
2. Script de re-encriptación: descifra con v1, encripta con v2, actualiza la fila.
3. Rota el secret name al final.

## Monitoreo

Queries útiles para Supabase Studio:

```sql
-- Total de preguntas por subject
select subject_slug, module, count(*) from public.vault_questions group by 1, 2;

-- Top usuarios pidiendo muchas preguntas (posible scraping)
select user_id, count(*) as requests
from public.vault_access_log
where access_type = 'request' and accessed_at > now() - interval '24 hours'
group by user_id
order by requests desc
limit 20;

-- Sesiones nunca completadas (scraper que solo lee)
select user_id, count(*) as abandoned
from public.vault_sessions
where completed_at is null and expires_at < now()
group by user_id
having count(*) > 5
order by abandoned desc;

-- Cleanup manual de sesiones viejas
select public.vault_cleanup_expired_sessions();
```

## Lo que NO está cubierto (riesgos residuales)

- **Usuario legítimo que copia manualmente las 52 preguntas a un Doc**: detectable solo por watermark / patrón de uso anómalo. Mitigación: subir la cantidad total de preguntas a >1000 para hacer la tarea proceduralmente costosa.
- **Captura con OCR de screenshots**: el watermark con email da trazabilidad. La detección automática requeriría análisis del flujo de captura.
- **Compromiso de la master key**: si alguien hackea Supabase Vault, todo el contenido es accesible. Mitigación: rotar la key periódicamente + monitorear acceso al Vault.
- **Compromiso de service_role key**: si se filtra, pueden llamar `private.vault_decrypt` con cualquier UUID. Mitigación: no commitear nunca, rotarla si hay sospecha.

## Roadmap de hardening (próximos sprints)

- [ ] Edge function intermedia que aplica rate limiting por IP además de por user
- [ ] Detección de "DevTools abierto" cuando se ve una pregunta (deterrente, no bloqueo)
- [ ] Honeypot questions: 5-10 preguntas fake con explicación distintiva. Si aparecen en otra plataforma, sabemos quién scrapeó (correlation con `vault_access_log`)
- [ ] Rotación automática de master key cada 90 días via cron
