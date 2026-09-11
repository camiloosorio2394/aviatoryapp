# SCRIPT — meteorologia-modulo-intro

**Voice:** William Shanks (HeyGen · Starfish) · `001248bb63f847888d37b766ee8b3a47`
**Voice settings:** velocidad 0.92 (la misma del video de NOTAM; a 1.0 la locución va demasiado rápida)
**Voice direction:** Instructor de aviación explicándole algo a un piloto, no locutor de anuncio. Ritmo pausado, sin sonrisa forzada. Español neutro latinoamericano.

> **Nota de producción (heredada del video de NOTAM, sigue vigente).** El motor de voz
> no acepta parámetro de idioma, así que lee las siglas y las letras sueltas con reglas
> inglesas: la «Q» salía «kiu». Las letras sueltas van escritas **como se pronuncian en
> español** («cu», «ene», «erre», «ce»). En este guion no hay letras sueltas, pero sí
> tres siglas, y cada una tiene su tratamiento:
>
> | En pantalla | En el guion | Por qué |
> |---|---|---|
> | `METAR` | `METAR` | Se lee como palabra, igual que «NOTAM» en el video anterior. Verificado ahí. |
> | `TAF` | `taf` | Tres letras: en mayúsculas el riesgo es que salga «te a efe». En minúsculas se lee como palabra, que es como lo dice un piloto. |
> | `TAF SKXX …` | no se dice | El pronóstico nunca se locuta. Sale en pantalla y se lee, no se recita. |
>
> Y los números van escritos con letras («Treinta lecciones», no «30 lecciones»): el
> motor lee bien los cardinales en español, pero «30» junto a una coma a veces sale como
> ordinal. No cambiar a cifra sin volver a escuchar.

**Presupuesto de duración.** El video tiene tope de 1 minuto. El guion está medido a
12,0 caracteres por segundo, que es el ritmo medido del video de NOTAM con esta misma
voz a 0,92 (sus ocho líneas dieron entre 11,7 y 13,3 c/s en prosa sin letras sueltas, y
12,0 es el extremo lento de ese rango). 568 caracteres de locución dan unos 47,3 s, y con
el silencio de cola de cada plano (1,2 s, y 1,6 s en el giro) el total queda en
**57,3 s estimados**.

**Puerta antes de renderizar.** Cuando exista la locución real, sumar las ocho duraciones
de `audio_engine_meta.json` y comprobar:

    suma(voz) + 10,0 s de silencio  ≤  58,5 s

Si se pasa, se recorta el guion y se vuelve a generar la voz. No se recorta el silencio
de cola (es el estándar del video de NOTAM y es lo que le da el aire documental), y no se
sube la velocidad de la voz por encima de 0,92 (es lo que hace que los dos módulos suenen
al mismo curso). El margen que queda contra el tope de 1 minuto es de 2,7 s, así que una
locución más lenta de 12,0 c/s obliga a recortar.

---

## Line 1 — Bienvenida (Frame 1)

**Delivery:** Directo y tranquilo. Es una puerta que se abre, no un anuncio. Idéntico en tono al Line 1 del video de NOTAM: los dos módulos abren igual a propósito.

    Bienvenido al módulo de Meteorología de Aviatory.

## Line 2 — El pronóstico que ya lo dice todo (Frame 2)

**Delivery:** Baja el ritmo en la primera frase, que es la que carga el peso. Pausa clara antes de «Y descifrarlo». La segunda frase es el argumento del módulo entero: dicha sin énfasis, como una constatación.

    Este pronóstico ya dice lo que te vas a encontrar al aterrizar. Y descifrarlo no sirve si no sabes qué lo produce.

## Line 3 — La atmósfera (Frame 3)

**Delivery:** Cambia el tono: aquí empieza la promesa. Más claro, un punto más arriba. «Altímetro» sin prisa.

    Aquí vas a entender por qué se mueve el aire, y qué le hace la presión al altímetro.

## Line 4 — El agua en el aire (Frame 4)

**Delivery:** Los tres sustantivos de la enumeración, separados. No es una lista que se corra: son tres cosas distintas.

    Vas a leer el agua que lleva dentro: rocío, nubes y niebla.

## Line 5 — Frentes y tormentas (Frame 5)

**Delivery:** «Sabiendo qué hay al otro lado» es la clave de la línea y va despacio. Punto real antes de «Y a leer».

    Vas a cruzar un frente sabiendo qué hay al otro lado. Y a leer una tormenta por dentro.

## Line 6 — El código (Frame 6)

**Delivery:** Cierra la serie de promesas. Ligero acento en «descifrar». Las dos siglas marcadas por separado, con una respiración entre ellas.

    Y vas a descifrar el código: METAR, taf y los avisos en vuelo.

## Line 7 — El giro (Frame 7)

**Delivery:** La frase del video. Pausa antes. Los dos puntos son una pausa real. Sin énfasis de vendedor: dicha como un hecho.

    Al terminar, no lees el pronóstico entero: buscas tu ventana.

## Line 8 — Empecemos (Frame 8)

**Delivery:** Cierre seco. «Empecemos» no se alarga.

    Treinta lecciones, práctica y evaluación. Empecemos.
