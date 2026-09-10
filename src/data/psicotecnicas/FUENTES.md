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
| A1 abstracto | 20 | `verificar-claves.mjs` lee la lámina SOLUCIONES del propio PDF y compara: los 20 coinciden |
| E1 espacial | 14 | `verificar-claves.mjs` lee la clave del final del PDF y compara: los 14 coinciden |
| E2 espacial | 4 | Revisadas mirando las páginas 10 a 13, que resaltan la opción correcta: las 4 coinciden. La 7 (27 − 6 = 21) y la 10 (dos dados suman 42 puntos, se ven 17) además cuadran por cuenta propia |
| N1 numérico | 38 | `verificar-numerico.mjs` recalcula las 38 desde el enunciado —con la aritmética escrita y ejecutada, no leída— y las compara: cuadran |
| N2 series | 162 | `verificar-series.mjs` las resuelve **de cero, sin mirar la respuesta**: 129 coinciden, 0 discrepan, 2 salen ambiguas y 31 usan reglas fuera de su familia |

En total, **205 de las 238 respuestas del banco están comprobadas por una vía
independiente de quien las cargó**. Las 33 que faltan no están sin revisar: son
2 series ambiguas en el propio original y 31 cuya regla no cubre el
solucionador —tríos, ciclos sobre las diferencias, cosas así—. Se revisaron a
mano por muestreo y salieron bien, pero eso no es lo mismo que estar
comprobadas, y por eso se cuentan aparte.

Los verificadores se corren así, y conviene hacerlo antes de publicar:

```
node scripts/psicotecnicas/verificar-banco.mjs
node scripts/psicotecnicas/verificar-claves.mjs ~/Downloads
node scripts/psicotecnicas/verificar-numerico.mjs
node scripts/psicotecnicas/verificar-series.mjs
node scripts/psicotecnicas/verificar-respuestas.mjs ~/Downloads
node scripts/psicotecnicas/verificar-figuras.mjs
```

Todos comparten una regla: **cero comprobaciones no es un aprobado**. Si no
encuentran el PDF, o su clave, o no llegan a comprobar nada, salen con error en
vez de dar por bueno lo que no miraron.

Las 65 series «sin comprobación automática» no son dudosas: son las agrupadas y
las entrelazadas, donde el documento declara menos operaciones que saltos y no
hay forma de alinearlas. Su respuesta es la que trae la fuente.

### El fallo gordo: once ejercicios preguntaban otra cosa

El documento N2 tiene diez bloques, y **no todos piden lo mismo**. Seis dicen
«completa la serie», dos dicen «señala el número erróneo que hay en cada serie»
y uno pide «los dos números que siguen». El generador los cargaba todos como
«Complete la serie», así que once ejercicios acabaron con un enunciado que no
era el suyo y una respuesta que, leída como continuación, no tiene sentido.

El ejemplo más claro es el 7.1: la serie es «2, 4, 6, 7, 8, 10, 12» y el banco
respondía **7**. Como continuación es absurdo —el 7 ya está en la serie—; como
respuesta a «cuál sobra», es exactamente el número que rompe el +2.

Y hay un agravante: el cuadernillo **mezcla los dos tipos dentro del mismo
bloque**. Bajo el encabezado «señala el número erróneo» hay series limpias
(«18, 21, 24, 27, 30») cuya solución impresa es la continuación, no un intruso.
Por eso el tipo no se puede decidir por bloque: `generar-series.mjs` lo decide
**por ítem y con evidencia** —si la respuesta impresa es uno de los términos de
la serie, es el intruso; si no aparece en ella, es la continuación—.

Los once quedaron como ejercicios de «Señala el número que sobra», con las
alternativas sacadas de la propia serie (un número que no aparece en ella se
descarta de un vistazo y regala el ejercicio) y comprobados al revés:
`verificar-series.mjs` prueba a quitar cada término y comprueba que solo uno
deja una serie con una única regla.

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

## El cuadernillo A1 marca su propia respuesta, lámina por lámina

Hallazgo del 9 de septiembre, y no lo estábamos usando. El PDF `554759531` no
solo trae la lámina SOLUCIONES al final: cada problema ocupa **cinco o seis
diapositivas**, una por alternativa, y en cada una la letra elegida aparece
recuadrada —**azul cuando es la correcta, roja cuando no**—. Es el material de
un curso pensado para proyectarse y hacer clic.

Eso es una **cuarta fuente independiente** de la respuesta, y de las buenas:
está pegada al problema, no en una hoja aparte donde un desliz de numeración
descoloca veinte respuestas de golpe. Contrastar la lámina SOLUCIONES contra
esos recuadros comprobaría de una vez que la hoja de soluciones no está corrida.

Dónde vive cada problema, para no volver a buscarlo: **la diapositiva de un
problema es la que lleva en su flecha de avance el número del problema
siguiente**. El número grande de la esquina es el del problema actual, y el de
la flecha es el del que viene, así que buscar «11/20» encuentra también las
diapositivas del 10. Medido: el problema 11 está en las páginas 66 a 70, el 14
en las 84 a 88 y el 18 en las 108 a 112.

## Las tres que estaban paradas: qué se ve en el PDF

Las láminas 08, 10 y 11 se dejaron sin dibujar porque en el recorte `.webp` no
se leían sus extensiones. Abiertas en el PDF de origen a 240 puntos por pulgada,
**las tres se leen**. Lo que se ve, para que no haya que redescubrirlo:

- **La 11** es un rectángulo partido en dos. A la izquierda un lóbulo relleno
  —blanco, rayado o negro—; a la derecha dos lóbulos apilados y una letra (A, C
  o D) arriba. La letra y el relleno se reparten como un sudoku, y a la casilla
  que falta le tocan la A y el rayado. Las cinco alternativas comparten letra y
  relleno: se distinguen por si el lóbulo de abajo a la derecha va relleno, por
  la trama —diagonal contra escamas— y por un travesaño al pie del eje.
- **La 14** es una circunferencia con sus dos diámetros y un radio más en
  diagonal, un número y una cuña negra en el centro que gira. Los números van
  1·3·5 / 2·4·6 / 3·6·**9** y las cinco alternativas llevan todas el 9, así que
  lo que decide es la posición angular de la cuña.
- **La 18** es una retícula de dos por dos con las diagonales de cada cuadrante,
  una letra constante por fila (A, B, C), un triángulo negro que ocupa uno de
  los ocho medios cuadrantes y un punto negro que aparece y desaparece.

Ninguna de las tres está transcrita todavía. **Se leen, pero leerlas no es
haberlas comprobado**: cada una necesita su primitiva nueva y sus catorce
casillas contrastadas una a una, y hacerlo con prisa es justo lo que la regla de
las tres fuentes existe para impedir.

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
