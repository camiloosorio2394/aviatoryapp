# private-batches/

**REGLA DE ORO: nada de este directorio (excepto este README y `_template.json.example`) se sube al repo.**

`.gitignore` está configurado para ignorar todo lo demás. Si alguna vez ves un PR que mete un `.json` en `private-batches/`, es un error — flagealo y rechazalo.

## Para qué sirve

Es el staging area donde Cami (o quien cargue contenido) pone los batches de preguntas/contenido en JSON ANTES de cargarlos a la DB con `npm run seed-questions`.

El script lee el JSON, llama a la RPC `private.vault_insert` que encripta server-side con la master key del Vault, y guarda en `vault_questions`. El texto plano nunca pasa por logs.

## Workflow

1. Copia `_template.json.example` a algo como `aerodinamica-batch1.json`.
2. Rellenalo con preguntas en el shape correcto.
3. Corre `node scripts/seed-questions.mjs private-batches/aerodinamica-batch1.json`.
4. Verifica en Supabase Studio que las preguntas se insertaron (count, batch_name).
5. **Borrá el JSON local**: `rm private-batches/aerodinamica-batch1.json`.

## Shape esperado

Ver `_template.json.example`.

## Si algo falla a mitad

- El script reporta cada Q como ✓ o ❌. Las ✓ ya están en DB.
- Para rollback de un batch: SQL editor con service_role:
  ```sql
  delete from public.vault_questions where batch_name = 'aerodinamica-batch1';
  ```
- Re-corres el script con el JSON ajustado.

## Por qué este directorio existe en el repo si está todo gitignored

Para que Git tenga la carpeta tracked como existente (vía este README y el template). Si no, cada clone tendría que crearla manualmente.
