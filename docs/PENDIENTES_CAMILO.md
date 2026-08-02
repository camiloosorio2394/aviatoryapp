# Pendientes y comentarios para Camilo

Documento vivo. Lo que está aquí necesita algo de tu lado: aplicar, decidir o
confirmar. Cuando algo se cierra, se borra de aquí.

Última actualización: 2 de agosto de 2026.

---

## 1 · Migraciones escritas y sin aplicar

Van en orden. Las tres están en `supabase/migrations/` y **ninguna se aplicó**:
se escribieron para que las apliques tú por MCP.

| Archivo | Qué trae |
|---|---|
| `20260801030000_metar_master_condicion.sql` | La condición de `metar_master`, que existía en el catálogo y era imposible de desbloquear |
| `20260801040000_simulacro_aerolinea.sql` | `user_airline_mock_attempts` + logro `airline_mock_passed` (gold, mínimo 85) + disparador |
| `20260802010000_modulo_mercancias.sql` | Todo el módulo Mercancías Peligrosas: progreso, RPC, intentos, umbrales y 4 logros |

Cada una trae la tabla, el logro **con su condición dentro de
`check_and_unlock_achievements`** y **su disparador**, en la misma migración. Es
la lección de `metar_master`: separarlos deja el logro visible en el perfil y
sin forma de ganarlo.

Las tres recrean `check_and_unlock_achievements`, así que **el orden importa**:
la última en aplicarse es la que queda. Aplícalas en orden de nombre.

Y las tres llevan el `revoke`, porque Postgres devuelve `EXECUTE` a `PUBLIC` en
cada `create or replace function`.

Después de aplicarlas: `get_advisors` tipo `security`, y regenerar los tipos.

```bash
npx supabase gen types typescript --project-id $REF > src/integrations/supabase/types.ts
```

Mientras tanto los tipos están escritos a mano para las cuatro tablas nuevas.
La regeneración debería dejarlos igual; si algo cambia, es que la migración y lo
que escribí no coinciden y hay que mirarlo.

---

## 2 · El diseño de Mercancías Peligrosas no es accesible

Esto es lo que más me condiciona y lo que más rápido se arregla de tu lado.

El brief manda importar el diseño con el MCP y da la URL:

```
https://claude.ai/design/p/2c3494a5-8704-49d9-93d0-ce93cbf2946b
```

Desde la cuenta de Nico responde **"Project not found — This project may have
been deleted, or you might not have access to it"**, y no aparece en su lista de
diseños. No está compartido con él.

**Lo que necesito:** que lo compartas, o que nos pases el `.dc.html`. Con eso
contrasto en un rato lo que sigue.

### Qué construí mientras tanto

El contenido salió del `.docx` que pasó Nico, que es la fuente con la que se
hizo el propio diseño. La estructura, la paleta y las 11 secciones salieron del
brief, que las documenta con detalle.

### Qué falta contrastar contra el diseño

| Dato | Estado |
|---|---|
| `CLASES[1]` (Explosivos) | **Alineado**. El brief transcribe sus `ejemplos` y su `divisiones[0]` literal, y así quedaron |
| `CLASES` 2 a 9: `desc`, `ejemplos`, `divisiones` | Del `.docx`. Redacción probablemente distinta |
| `CLASES[].bg` | Ver el punto 3. Solo conozco el de la clase 1 |
| `CLASES[].fg` (`#16202A`) | **No implementado**. Ver el punto 3 |
| `CASOS`, los 4 de práctica | **Escritos por mí.** Los del diseño no los tengo |
| `PREGUNTAS`, las 5 del chequeo | **Escritas por mí.** Las del diseño no las tengo |

Los `CASOS` y las `PREGUNTAS` son lo más probable que quieras revisar: son
contenido pedagógico, no maquetación. Están en
`src/lib/mercanciasPractica.ts` y se cambian sin tocar nada más.

### Y dos archivos que tampoco pude leer

El brief dice que el proyecto del diseño trae `rac175.txt` (la fuente normativa)
y el PDF del material. No están en el repo y no tengo acceso al proyecto, así
que **el módulo no está contrastado contra el texto del RAC 175**. Todo lo
normativo sale del `.docx`.

---

## 3 · Decisión que tomé y quiero que confirmes: el color de clase

El brief dice que `CLASES[].bg` es el sistema del módulo, "el naranja de la
clase 1 reaparece cada vez que se hable de explosivos". Solo documenta el de la
clase 1 (`#E87722`).

Como no tenía los otros ocho, **los saqué muestreando los rombos oficiales**.
El resultado es fiel pero choca:

| Clase | Color del rombo real |
|---|---|
| 1 Explosivos | naranja `#E87722` |
| 2 Gases | verde `#1E8A4C` (del 2.2; el 2.1 es rojo y el 2.3 blanco) |
| 3 Líq. inflamables | rojo `#D0102E` |
| 4 Sól. inflamables | rojo `#D0102E` — igual que la 3 |
| 5 Oxidantes | amarillo `#C08A00` |
| 6 Tóxicas | la etiqueta es blanca |
| 7 Radiactivo | amarillo — igual que la 5 |
| 8 Corrosivas | la etiqueta es blanca y negra |
| 9 Varias | la etiqueta es blanca y negra |

O sea: **el color no distingue las nueve clases, porque en la realidad no las
distingue.** Rojo significa inflamable dos veces, y eso es lo correcto de
enseñar.

**Lo que hice:** que la identidad la lleve **el rombo**, no un cuadro de color.
Donde hay que identificar una clase se pone su etiqueta oficial. El color solo
tiñe bordes y acentos, y que dos clases lo compartan deja de importar.

**Lo que necesito de ti:** si tu diseño tiene nueve colores distintos e
inventados para que cada clase se distinga por color, dímelo y me alineo. Si no,
esto se queda como está, que además usa los rombos que ya extrajimos.

Por lo mismo, `fg` (`#16202A`, el texto sobre el color de clase) **no está
implementado**: hoy no hay ningún sitio donde se ponga texto encima del color de
una clase. Si el diseño sí lo tiene, entra con el resto.

---

## 4 · Tres desviaciones menores del brief, con su motivo

**El índice muestra las 11 secciones, no las 9.** El brief dice "las 9 secciones
numeradas 00 a 08". Yo muestro las once, separadas en dos grupos: *Contenido*
(00 a 08) y *Ponte a prueba* (09 y 10). El contador de la barra sí cuenta solo
las de lectura (`03 / 09`) y en la práctica y el chequeo cambia el número por el
nombre de la sección. Me pareció que esconder del índice las dos secciones que
cierran el módulo las dejaba sin puerta de entrada. Se revierte en un minuto.

**El índice en celular no colapsa, se convierte en una tira de números.** El
brief pedía que colapsara. Un cajón esconde en qué sección vas, que es la mitad
de la utilidad del índice, así que la tira horizontal me pareció mejor. Probado
a 375 px, cero scroll lateral en las once secciones.

**La banda de "Recuerda" no está al pie de todas las secciones.** El brief la
describe como parte de la estructura de pantalla. La puse solo donde hay algo
que subrayar (06, 08 y 10): repetirla en las nueve la habría convertido en
decoración, y el resto de secciones ya cierran con un aviso. Si la quieres fija,
se pone.

---

## 5 · La sección se marca leída al entrar

Va contra la regla del proyecto, que es no registrar nada al montar una página.
Aquí lo hice a propósito: en un lector la sección se abre para leerla, no hay un
botón de "ya la leí" y no lo va a haber.

Lo que **no** se infla es la racha: `registrarEstudioDiario` tiene tope de una
vez al día por superficie, así que leer nueve secciones cuenta como un día de
estudio, no como nueve.

---

## 6 · Contenido que conviene que revise un experto

El módulo enseña normativa. Yo lo redacté desde el `.docx`, pero hay tres
puntos donde una revisión tuya vale la pena:

- **Sección 04, grupos de embalaje.** El `.docx` casi no lo desarrolla. Escribí
  qué son, los tres niveles y qué clases no lo llevan. Es correcto en general,
  pero es la sección con menos respaldo del material original.
- **Sección 07, "Mercancías ocultas y estiba".** El `.docx` no trae una sección
  de mercancías ocultas como tal. La armé alrededor de lo que sí trae: lo que
  sube en el equipaje de un pasajero, las baterías de litio y la segregación.
  Si esperabas la lista clásica de indicadores de mercancía oculta (descripciones
  genéricas de carga, equipaje de tripulación, etc.), esa no está.
- **Los 4 casos de práctica.** Pintura (clase 3), litio como carga (9), hielo
  seco (9) y sodio metálico (4.3). Elegidos para enseñar cosas distintas, no
  para cubrir las nueve clases.

Donde una cifra depende de la edición vigente, la sección lo dice. **No hay
ningún límite presentado como aplicable en línea de vuelo**, que era la
condición del punto 6 del brief.

---

## 7 · Lo que sigue esperando una decisión tuya, de antes

Sin cambios desde la auditoría del módulo Ingreso a aerolínea:

**Entrevista técnica, Entrevista HR y CRM, y Psicotécnicos: ¿son temas del
módulo o módulos aparte?** Hoy están prometidos en los dos sitios, en `PROXIMOS`
de `AirlinePrep.tsx` y como `/app/entrevistas` y `/app/psicotecnicas` en el
bloque "Próximamente" del sidebar, los dos como marcador de posición. No se ha
tocado nada a la espera de que elijas.

**Repetición espaciada.** Entre las 22 preguntas intercaladas de la lección, los
50 ejercicios de práctica, las 60 de evaluación y ahora las 45 del banco del
simulacro, hay material de sobra para una cola de repaso con lo que fallaste.
Hoy nada te devuelve un error. Es decisión de plataforma y toca también el banco
PCA, así que no se empezó.
