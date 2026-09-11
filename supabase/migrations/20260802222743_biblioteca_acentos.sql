-- Los textos de la Biblioteca se insertaron sin tildes ni enies al aplicar la
-- migracion, y son texto VISIBLE para el piloto. Entre otras cosas quedaba
-- "Se publica cada ano" en la ficha de la IATA DGR. Se corrigen todos.

update public.library_categories set
  name = 'Inglés ICAO'
where slug = 'icao';

update public.library_categories set
  name = 'Meteorología operacional',
  description = 'Documentación de referencia de METAR y meteorología para el vuelo.'
where slug = 'metar';

update public.library_categories set
  name = 'Mercancías peligrosas',
  description = 'La norma que respalda el módulo: RAC 175, LAR 175 y las fuentes de OACI e IATA.'
where slug = 'mercancias-peligrosas';

update public.library_categories set
  description = 'Documentación de referencia para leer e interpretar NOTAM.'
where slug = 'notam';

update public.library_categories set
  description = 'Documentos que no pertenecen a un módulo concreto.'
where slug = 'general';

update public.library_items set
  title       = 'Banco de preguntas oficial, licencia PCA',
  description = 'El documento oficial completo que la Aerocivil usa en sus exámenes de conocimiento, para consultar y verificar cualquier pregunta contra la fuente.',
  source      = 'Aeronáutica Civil de Colombia',
  authors     = 'Unidad Administrativa Especial de Aeronáutica Civil',
  version     = 'Edición sin numerar. Confirmar la vigente con la Aerocivil'
where slug = 'banco-preguntas-pca';

update public.library_items set
  title       = 'RAC 175, Transporte sin riesgos de mercancías peligrosas por vía aérea',
  description = 'El reglamento colombiano. Adopta el Anexo 18 de OACI y remite a las Instrucciones Técnicas del Doc 9284. Es la norma que aplica en Colombia.',
  authors     = 'Unidad Administrativa Especial de Aeronáutica Civil',
  version     = 'Edición Original, marzo 2016 · Resolución 00478 del 29 de febrero de 2016'
where slug = 'rac-175';

update public.library_items set
  title       = 'LAR 175, Transporte sin riesgo de mercancías peligrosas por vía aérea',
  description = 'El reglamento regional del SRVSOP, con el que se armoniza el RAC 175. Útil para ver de dónde viene cada requisito colombiano.',
  authors     = 'Sistema Regional de Cooperación para la Vigilancia de la Seguridad Operacional',
  version     = 'Primera edición, Enmienda 4, diciembre 2017'
where slug = 'lar-175';

update public.library_items set
  title       = 'OACI, Anexo 18: Transporte sin riesgos de mercancías peligrosas por vía aérea',
  description = 'La norma marco. Establece los estándares del transporte de mercancías peligrosas por vía aérea, y es lo que el RAC 175 adopta para Colombia. No se aloja en Aviatory: es una publicación de pago de OACI.',
  authors     = 'Organización de Aviación Civil Internacional',
  version     = 'Consultar la edición vigente en la tienda de OACI'
where slug = 'oaci-anexo-18';

update public.library_items set
  title       = 'OACI, Doc 9284: Instrucciones Técnicas',
  description = 'El cómo detallado: clasificación, embalaje, marcado y el listado de números ONU. Se reedita cada dos años, así que la edición importa. No se aloja en Aviatory: es una publicación de pago de OACI.',
  authors     = 'Organización de Aviación Civil Internacional',
  version     = 'Se reedita cada 2 años. Consultar la edición vigente'
where slug = 'oaci-doc-9284';

update public.library_items set
  description = 'El manual operativo de la industria, más estricto y más práctico que la norma, y alineado con el Doc 9284. Se publica cada año. Ante conflicto prevalece la norma vigente. No se aloja en Aviatory: es una publicación de pago de IATA.',
  version     = 'Edición anual. Consultar la del año en curso'
where slug = 'iata-dgr';
