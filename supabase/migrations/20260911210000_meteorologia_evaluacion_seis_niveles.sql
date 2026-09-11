-- La evaluación de Meteorología cubre ahora los seis niveles del módulo.
--
-- El banco pasó de 20 preguntas (todas del código METAR) a 104, repartidas por
-- los seis niveles: la atmósfera, el agua y las nubes, los frentes y las
-- tormentas, el METAR, el TAF y la información en ruta. Con un banco de ese
-- tamaño, un intento deja de ser «todas las preguntas» y pasa a ser una
-- muestra, como en NOTAM.
--
-- Dos cambios, los dos UPDATE: no se borra ninguna fila.

-- 25 de 104 al azar, el mismo reparto que NOTAM (25 de 100).
update public.evaluaciones
   set preguntas_por_intento = 25
 where clave = 'metar_evaluacion'
   and preguntas_por_intento <> 25;

-- El título decía «Evaluación de METAR» de cuando el módulo era solo el
-- código. El módulo son treinta lecciones y seis niveles desde el PR #124.
update public.evaluaciones
   set titulo = 'Meteorología · Evaluación'
 where clave = 'metar_evaluacion'
   and titulo <> 'Meteorología · Evaluación';
