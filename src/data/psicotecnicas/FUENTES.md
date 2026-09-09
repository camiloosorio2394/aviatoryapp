# Pruebas psicotécnicas — de dónde sale cada ejercicio

Los siete documentos que entregó Nico el 8 de septiembre de 2026. Ninguno es
material de Aviatory: son cuadernillos de terceros, y esto importa para dos
cosas —auditar una respuesta y decidir qué se publica—.

| Clave | Documento | Aporta | ¿Trae clave? |
|---|---|---|---|
| A1 | `554759531` Razonamiento Abstracto — Series de figuras (MARPID) | 20 ejercicios | Sí, hoja de soluciones |
| A2 | `455247140` Razonamiento Abstracto | 61 figuras extraídas, **sin cargar** | No |
| A3 | `354684364` RAZONAMIENTO ABSTRACTO (.docx) | 9 páginas escaneadas, **sin extraer** | No |
| E1 | `670006116` Test Razonamiento Espacial | 14 ejercicios | Sí, al final |
| E2 | `667045629` Test de Razonamiento Espacial | 4 ejercicios + 8 ejemplos + 2 láminas | Sí, marcada sobre la figura |
| N1 | `256486461` Razonamiento Numérico | 38 ejercicios | No: resueltos y verificados uno a uno |
| N2 | `336461140` Psicotécnicos — Razonamiento numérico | 173 series | Sí, sección SOLUCIONES |

Del tercer documento de espacial que menciona el encargo no llegó ninguno; el
material espacial sale de E1 y E2.

## Estado de verificación de las respuestas

Ninguna respuesta del banco se da por buena por haberla leído bien. Esto es lo
que respalda cada una, y con qué se comprueba:

| Origen | Ejercicios | Cómo está verificada |
|---|---|---|
| A1 abstracto | 20 | Contrastados uno a uno contra la lámina SOLUCIONES del documento: los 20 coinciden |
| E1 espacial | 14 | Contrastados contra la clave impresa al final del PDF: los 14 coinciden |
| E2 espacial | 4 | Transcritas del resaltado de la fuente; la 7 (27 − 6 = 21) y la 10 (dos dados suman 42 puntos) además se comprobaron por cuenta propia |
| N1 numérico | 38 | `verificar-numerico.mjs` recalcula las 38 desde el enunciado y las compara: cuadran |
| N2 series | 162 | `verificar-respuestas.mjs`: 97 verificadas aritméticamente contra las operaciones que declara la fuente, 65 sin comprobación automática posible, 0 discrepancias |

Los tres verificadores se corren así, y conviene hacerlo antes de publicar:

```
node scripts/psicotecnicas/verificar-banco.mjs
node scripts/psicotecnicas/verificar-numerico.mjs
node scripts/psicotecnicas/verificar-respuestas.mjs ~/Downloads
```

Las 65 series «sin comprobación automática» no son dudosas: son las agrupadas y
las entrelazadas, donde el documento declara menos operaciones que saltos y no
hay forma de alinearlas. Su respuesta es la que trae la fuente.

### Lo que la verificación encontró

**Once series salieron del banco** porque la serie impresa contradice las
operaciones que el propio documento declara para ella: 2.13, 3.1, 3.5, 3.18,
3.19, 3.20, 4.5, 5.7, 8.8, 8.12 y 10.14. Ejemplo: en «10, 13, 16, 19, 21, 24,
27, 30» la fuente declara «+3» en todos los saltos, y de 19 a 21 hay +2. No se
puede saber si sobra el término o la regla, y entrenar con eso enseña al revés.

**Una respuesta se corrigió.** En «1, 2, 4, 8, 16, 32» la fuente declara seis
veces «x2» e imprime como respuesta 6: es un 64 al que se le cayó el 4. Solo se
corrige cuando la operación es la misma en toda la serie, porque ahí la regla no
admite discusión. Con operaciones mezcladas, una discrepancia entre la regla y
la respuesta impresa saca al ejercicio del banco en vez de corregirlo.

## Lo que quedó fuera, y por qué

**N1, ejercicio 11** (formas de sentarse tres hombres y dos mujeres alternados).
La respuesta correcta es 3!·2! = 12 y el documento imprime como alternativa D
«12000». Es una errata evidente, pero no se puede cargar un ejercicio cuya
respuesta correcta es un número que no está entre las opciones, ni corregir la
alternativa sin cambiar el original. Si Camilo confirma que es errata, se carga
con la D corregida a 12.

**N1, ejercicio 37** (jardín triangular isósceles de perímetro 200 m). Ninguna
lectura del enunciado produce una de las cuatro alternativas: con «el lado
desigual es el doble del otro aumentado en 60» sale 130, y las opciones son 35,
65, 86 y 140. El ejercicio está mal en la fuente, no en la extracción.

**E2, preguntas 1 a 6, 11 y 12.** La fuente publica la respuesta marcada con un
círculo encima de la propia opción correcta, así que no se pueden preguntar: se
ve la solución antes de pensarla. Entran como ejemplos resueltos del modo
entrenamiento, que es lo que son. Sus preguntas 7 a 10 sí entran como ejercicio
porque ahí las alternativas van en una lista de texto aparte de la figura, y la
figura se recorta limpia.

## Lo que falta por cargar

**A2 (61 figuras) y A3 (9 escaneos).** Las figuras de A2 ya están extraídas y
versionadas en `public/psicotecnicas/abstracto/AB-A2-*.webp`; las de A3 siguen
dentro del `.docx`. Ninguno de los dos documentos trae clave de respuestas, así
que cada ejercicio hay que resolverlo y verificarlo antes de cargarlo: son unos
120 más, y cargarlos con la respuesta a ojo sería peor que no tenerlos. A2 mezcla
además ejercicios espaciales pese a llamarse «abstracto», así que la categoría se
decide ejercicio por ejercicio, no por el nombre del archivo.

## Sobre las alternativas generadas

Las 173 series de N2 son de completar el número: el original no ofrece
alternativas. Como el módulo entero funciona con opción múltiple cronometrada,
`scripts/psicotecnicas/generar-series.mjs` genera tres distractores por ítem a
partir de los errores típicos (repetir el salto anterior, adelantarse un
término, invertir el signo). La respuesta y el desglose son los del documento.

En todo lo demás no se tocó nada: ni enunciados, ni valores, ni alternativas, ni
figuras. Lo único restituido son los superíndices de unidades al cuadrado de los
ejercicios 23 y 34 de N1, que `pdftotext` pierde al extraer.

## Derechos

Los cuatro PDF llevan marca de agua o logotipo de sus autores (Hospital Farallón
y DaVinci Centro de Estudios en E1; AulaContable y Grupo Pinillos en E2; Centro
de Nivelación MARPID en A1; U. P. Aula Magna en N2). Las figuras se recortan tal
cual porque alterarlas cambiaría el ejercicio. Publicarlas en un producto de pago
es una decisión que no es técnica: queda anotada para que Camilo y Nico la tomen
antes de abrir el módulo al público.
