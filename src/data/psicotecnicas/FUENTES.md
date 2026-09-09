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
