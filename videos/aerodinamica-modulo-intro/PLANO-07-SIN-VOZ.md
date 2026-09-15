# El plano 7 va sin voz, y es una decisión

El video está terminado: 54,7 s, ocho planos, subtítulos, música y **siete** líneas de
locución. La octava —la del giro, el plano 7— no existe, y no va a existir en esta voz.

## Por qué

Al generar la locución, la cuenta de HeyGen se quedó sin minutos de TTS justo en esa línea:

```
POST /v3/voices/speech → HTTP 402
{"error":{"code":"insufficient_credit",
          "message":"Insufficient free TTS minutes. Please upgrade your plan or purchase additional credits."}}
```

Medido después: una frase de 1,4 s pasa, una de 4,5 s no. Lo que queda son segundos.

Se decidió **no comprar crédito para terminarla**, por una razón que no es el dinero: el
plan es rehacer la locución de los cuatro videos con la **voz clonada de Camilo** y meter su
avatar. Pagar por una línea en la voz de William Shanks es pagar por un archivo que se va a
tirar.

## Qué se hizo en su lugar

El plano 7 se acortó de 10,5 s a **6,8 s** y el silencio se convirtió en un recurso. La frase
que decía la locución —«la actitud por sí sola no indica si el ala está volando»— **ya está
escrita en la banda del plano**: la voz solo la iba a repetir. El narrador se calla justo
cuando aparece lo que hay que entender.

Los tiempos los pone ahora la lectura, no la voz: la banda son 55 caracteres y se queda
2,9 s quieta, que es la quietud más larga del video. Diez segundos de silencio se habrían
leído como audio roto; tres se leen como un punto y aparte.

La línea sigue escrita en `SCRIPT.md` por si algún día se graba.

## Lo que hay en la cuenta, verificado el 15 de septiembre de 2026

| Qué | Id | Nota |
|---|---|---|
| Avatar de Camilo | `ad74dc3233f04689a8e88fdda28d12ca` | instant avatar, 4 tomas |
| Su voz clonada | `8a7cc642b74240dc80dee341a545670a` | es la voz por defecto del avatar |
| Otra voz suya | `72739cb58b5349ee812599af68428341` | parece un intento anterior |
| Voz de la serie | `001248bb63f847888d37b766ee8b3a47` | William Shanks, la de los tres videos anteriores |

Plan **free**, `remaining_quota: 0`, sin créditos de complemento ni premium.

## Cuando haya saldo

No se parchea la línea 7: se rehace la locución entera.

1. Regenerar las ocho líneas de `SCRIPT.md` con la voz de Camilo
   (`--voice 8a7cc642b74240dc80dee341a545670a`), y de paso devolver el plano 7 a su duración
   narrada revirtiendo este acortamiento.
2. Probar el avatar en la apertura y el cierre. Eso resuelve además las dos preguntas que no
   se pudieron contestar sin generar: si esa voz corre en el mismo motor que usa el pipeline,
   y si el plan permite exportarlo con **fondo transparente** — que es lo que decide si el
   avatar se puede montar encima de los planos o si tiene que ir a pantalla completa.
3. Si convence, repetir en NOTAM, Meteorología y Mercancías, que hoy suenan con la otra voz.

## Lo que ya está verificado

- Las nueve líneas de la tabla de la Sección 4 salen byte a byte del documento del módulo,
  con su pie de «valores ilustrativos» en los dos planos que la muestran.
- El panel del plano 7 calca el del plano 2: mismo contrato de geometría congelada
  (left 160 · top 176 · 1600×584, mono 32/54, origen 213/225).
- `hyperframes check`: 0 errores, 0 avisos, 0 problemas de layout, 41/41 de contraste WCAG AA.
- Ninguna cifra inventada: cada número en pantalla está citado en `STORYBOARD.md` con su
  sección de procedencia.
