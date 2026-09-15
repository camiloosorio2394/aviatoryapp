# Aviatory — instrucciones para Codex

Las reglas del proyecto están en `CLAUDE.md`: stack, sistema de diseño, y cómo se edita
este repo (CRLF, ediciones por scripts `.mjs`, `npx tsc -b` para comprobar).
**Léelo antes de tocar nada.** Aplica igual para ti.

Tres que no se negocian:

- Nunca borrar filas de la base de datos del usuario, y nunca aplicar una migración. Se le
  entrega el SQL para que lo corra él.
- Una cosa a la vez. Si se pide «sección 1», se trabaja solo la sección 1.
- Verificar antes de afirmar. Comprobar con `npx tsc -b` antes de dar algo por terminado.

## La carpeta: hay dos árboles del mismo repo

En esta máquina trabajan dos agentes sobre Aviatory, y cada uno tiene su propia carpeta:

| Agente | Carpeta |
|---|---|
| Claude Code | `C:\Datos\Documents\Projects\aviatoryapp` |
| **Codex (tú)** | `C:\Datos\Documents\Projects\aviatoryapp-codex` |

No son dos copias ni dos repos. Son dos *working trees* de git sobre el mismo historial:
comparten commits, ramas y remoto, pero cada uno tiene sus propios archivos en disco.

**Antes de editar, confirma dónde estás:**

```bash
git rev-parse --show-toplevel
```

Si no termina en `aviatoryapp-codex`, **detente y dilo**. No edites.

Por qué importa: los cambios sin commitear del otro árbol no existen para ti — no los ves
en `git status` ni en el diff. Si escribes en la carpeta de Claude Code, sobrescribes
trabajo en curso que git no puede recuperar, porque nunca llegó a un commit. Tampoco hagas
`cd` a la otra carpeta para «ir a mirar algo»: si necesitas ver código que no está en tu
árbol, léelo del historial (`git show origin/main:ruta/al/archivo`).

Si intentas hacer `checkout` de una rama que el otro árbol ya tiene puesta, git se va a
negar. Eso es correcto, no es un error que haya que forzar. Crea otra rama.

Tu carpeta queda parqueada en la rama `codex/base`, que no se usa para trabajar: es solo el
punto de reposo del árbol. Para cada tarea sales de ahí con una rama nueva:

```bash
git fetch origin && git checkout -b area/descripcion-de-la-tarea origin/main
```

Al terminar y con el PR abierto, vuelves a `codex/base` para dejar el árbol libre.

## El trabajo: carriles separados

La división es por área del código, no por archivo suelto. Así los diffs casi nunca se
cruzan y los PR entran sin conflictos.

| Tuyo (Codex) | De Claude Code |
|---|---|
| `supabase/` — migraciones, functions, RLS, políticas | `src/components/lesson/` — el lector |
| Tests de base y de integración | `src/data/` — contenido de los módulos |
| `scripts/`, `vercel.json`, `vite.config.ts`, PWA | `public/infografias/`, `brand/` |
| Rendimiento, escalabilidad, índices, permisos | `src/pages/` y UI de módulos |

**`src/components/lesson/LectorLeccion.tsx` no se toca.** Es el lector único y compartido
por NOTAM, Mercancías y Meteorología: un cambio ahí afecta tres módulos a la vez y es el
punto exacto donde un conflicto duele más. Si una tarea tuya parece necesitarlo, párate y
dilo en vez de editarlo.

Zona gris: `src/lib/`, `src/hooks/` y `src/integrations/` los pueden necesitar los dos. Si
entras ahí, haz el cambio pequeño y abre el PR el mismo día — no lo dejes reposando.

**Las migraciones son tuyas y de nadie más.** `supabase/migrations/` se ordena por
timestamp: si dos agentes crean migraciones en paralelo, al mergear quedan en un orden que
nunca se probó. Tú eres el único que crea archivos ahí.

**Pero no apliques migraciones nunca, por ningún medio.** Crear el archivo sí; ejecutarlo
contra la base, no. En Codex Desktop tienes el conector de Supabase con `apply_migration`:
no lo uses en este proyecto. Dejas la migración en el PR y le entregas el SQL a Camilo para
que lo corra él, igual que con el borrado de filas. Esa base es producción y tiene alumnos
dentro.

## Ramas y merge

- **Nunca commitees en `main`.** `main` es solo para `git pull`.
- Una rama por tarea, con la convención que ya usa el repo: `area/descripcion-en-espanol`
  (`escalabilidad/rls-indices-permisos`, `correccion/meteorologia-nunca-se-cargo`).
- Antes de abrir el PR, siempre: `git fetch origin && git rebase origin/main`.
- El historial de `main` es lineal y los PR entran squasheados. **No mergees `main` hacia
  tu rama** — eso mete un commit de merge y lo ensucia. Rebase.
- PR pequeños y del mismo día. Una rama que vive una semana es una rama que va a conflictuar.

## El plugin de Codex dentro de Claude Code

Este repo tiene instalado `codex@openai-codex`, así que a veces te llegan tareas desde
Claude Code vía `/codex:review`, `/codex:adversarial-review` o `/codex:rescue`. Cuando
entres por esa vía:

- Corres en sandbox **read-only** salvo que la tarea traiga `--write`, y sin aprobaciones
  interactivas: nadie va a confirmarte nada a mitad de camino.
- **No tienes los conectores de Supabase ni de GitHub.** Solo existen en la app de Codex.
  No propongas pasos que dependan de `apply_migration`, de consultar la base en vivo, o de
  `gh`. Tampoco hay red en el sandbox: `git push` no va a funcionar.
- Corres sobre la carpeta desde la que se lanzó Claude Code, no sobre la tuya. Ahí solo
  lees.
- Entrega el hallazgo completo y el parche propuesto **en el mensaje final**: ese texto es
  lo único que Claude Code lee de vuelta. Lo que dejes a medias en el razonamiento se pierde.
