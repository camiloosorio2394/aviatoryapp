-- ============================================================================
-- Biblioteca: la bibliografía de cada módulo
--
-- Las categorías pasan a ser LOS MÓDULOS. Hoy la tabla tiene nueve categorías
-- temáticas genéricas (Manuales, SOPs, Quick References, Performance Tools,
-- Weight & Balance, Briefings, Checklist Philosophy, CRM/TEM, Accident Case
-- Studies) que se sembraron con la pantalla de marcador de posición y que no
-- tienen ni un documento: nunca se usaron.
--
-- OJO: el brief decía que library_categories estaba vacía. No lo está, tiene
-- esas nueve. Por eso esto no es solo un insert.
-- ============================================================================

-- ─── Fuera las categorías del marcador de posición ──────────────────────────
-- Con salvaguarda: solo se borra la que no tenga NI UN item colgando. Si
-- alguien subió algo mientras tanto, esa categoría se queda y se ve en pantalla.
delete from public.library_categories c
where c.slug in (
  'manuales', 'sops', 'quick_refs', 'performance', 'w_and_b',
  'briefings', 'checklist_philosophy', 'crm_tem_cases', 'accident_studies'
)
and not exists (select 1 from public.library_items i where i.category_id = c.id);

-- ─── Las categorías son los módulos ─────────────────────────────────────────
-- El icono y el color son los que ya usa cada módulo en la app, para que el
-- piloto reconozca de dónde sale cada documento.
insert into public.library_categories (slug, name, description, icon_name, color, order_index) values
  ('pca',                   'Examen PCA',               'El banco oficial y el material de referencia del examen de la Aerocivil.', 'BookOpen',      'blue',  1),
  ('icao',                  'Inglés ICAO',              'Material de referencia del examen TEA y del nivel ICAO.',                  'Radio',         'blue',  2),
  ('notam',                 'NOTAM',                    'Documentación de referencia para leer e interpretar NOTAM.',               'FileText',      'blue',  3),
  ('metar',                 'Meteorología operacional', 'Documentación de referencia de METAR y meteorología para el vuelo.',       'CloudSun',      'cyan',  4),
  ('mercancias-peligrosas', 'Mercancías peligrosas',    'La norma que respalda el módulo: RAC 175, LAR 175 y las fuentes de OACI e IATA.', 'AlertTriangle', 'red', 5),
  ('general',               'General',                  'Documentos que no pertenecen a un módulo concreto.',                       'Library',       'green', 9)
on conflict (slug) do update set
  name        = excluded.name,
  description = excluded.description,
  icon_name   = excluded.icon_name,
  color       = excluded.color,
  order_index = excluded.order_index;

-- ─── Contador de aperturas ──────────────────────────────────────────────────
-- El brief la daba por existente, pero `bump_library_item_views` NO está en la
-- base: comprobado llamándola con todas las firmas plausibles y respondiendo
-- siempre "Could not find the function". Se crea aquí.
create or replace function public.bump_library_item_views(p_item_id bigint)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.library_items
     set views_count = coalesce(views_count, 0) + 1
   where id = p_item_id and is_published = true;
$$;

comment on function public.bump_library_item_views(bigint) is
  'Suma una apertura a un documento publicado de la Biblioteca.';

revoke all on function public.bump_library_item_views(bigint) from public, anon;
grant execute on function public.bump_library_item_views(bigint) to authenticated;

-- ─── Mercancías peligrosas ──────────────────────────────────────────────────
-- Solo se alojan RAC 175 y LAR 175: son reglamentos publicados abiertamente por
-- su autoridad. El Anexo 18, el Doc 9284 y la IATA DGR van como ficha de
-- referencia, sin archivo, porque son de pago. No subirlos al bucket.
--
-- `version` es la edición EXACTA del archivo, textual, sacada de la portada del
-- propio PDF. `published_at` es la fecha de esa edición, no la de subida.
insert into public.library_items
  (category_id, slug, title, type, description, file_url, embed_url,
   source, authors, version, language, is_published, order_index, published_at)
select c.id, v.slug, v.title, v.type, v.description, v.file_url, v.embed_url,
       v.source, v.authors, v.version, 'es', true, v.order_index, v.published_at
from public.library_categories c
join (values
  (
    'rac-175',
    'RAC 175, Transporte sin riesgos de mercancías peligrosas por vía aérea',
    'pdf',
    'El reglamento colombiano. Adopta el Anexo 18 de OACI y remite a las Instrucciones Técnicas del Doc 9284. Es la norma que aplica en Colombia.',
    -- La ruta dentro del bucket. Cami sube el archivo con este nombre exacto.
    'RAC 175 - Transporte sin Riesgo de Mercancias Peligrosas por via Aerea.pdf',
    'https://www.aerocivil.gov.co/normatividad/Paginas/rac.aspx',
    'Aerocivil de Colombia',
    'Unidad Administrativa Especial de Aeronáutica Civil',
    'Edición Original, marzo 2016 · Resolución 00478 del 29 de febrero de 2016',
    1,
    '2016-03-31'::date
  ),
  (
    'lar-175',
    'LAR 175, Transporte sin riesgo de mercancías peligrosas por vía aérea',
    'pdf',
    'El reglamento regional del SRVSOP, con el que se armoniza el RAC 175. Útil para ver de dónde viene cada requisito colombiano.',
    'LAR 175 MERCANCIAS PELIGROSAS.pdf',
    'https://www.srvsop.aero/reglamentos-lar/',
    'SRVSOP',
    'Sistema Regional de Cooperación para la Vigilancia de la Seguridad Operacional',
    'Primera edición, Enmienda 4, diciembre 2017',
    2,
    '2017-12-03'::date
  ),
  (
    'oaci-anexo-18',
    'OACI, Anexo 18: Transporte sin riesgos de mercancías peligrosas por vía aérea',
    'referencia',
    'La norma marco. Establece los estándares del transporte de mercancías peligrosas por vía aérea, y es lo que el RAC 175 adopta para Colombia. No se aloja en Aviatory: es una publicación de pago de OACI.',
    null,
    'https://store.icao.int/',
    'OACI',
    'Organización de Aviación Civil Internacional',
    'Consultar la edición vigente en la tienda de OACI',
    3,
    null
  ),
  (
    'oaci-doc-9284',
    'OACI, Doc 9284: Instrucciones Técnicas',
    'referencia',
    'El cómo detallado: clasificación, embalaje, marcado y el listado de números ONU. Se reedita cada dos años, así que la edición importa. No se aloja en Aviatory: es una publicación de pago de OACI.',
    null,
    'https://store.icao.int/',
    'OACI',
    'Organización de Aviación Civil Internacional',
    'Se reedita cada 2 años. Consultar la edición vigente',
    4,
    null
  ),
  (
    'iata-dgr',
    'IATA, Dangerous Goods Regulations',
    'referencia',
    'El manual operativo de la industria, más estricto y más práctico que la norma, y alineado con el Doc 9284. Se publica cada año. Ante conflicto prevalece la norma vigente. No se aloja en Aviatory: es una publicación de pago de IATA.',
    null,
    'https://www.iata.org/en/publications/dgr/',
    'IATA',
    'International Air Transport Association',
    'Edición anual. Consultar la del año en curso',
    5,
    null
  )
) as v(slug, title, type, description, file_url, embed_url, source, authors, version, order_index, published_at)
  on true
where c.slug = 'mercancias-peligrosas'
on conflict (slug) do update set
  title        = excluded.title,
  type         = excluded.type,
  description  = excluded.description,
  file_url     = excluded.file_url,
  embed_url    = excluded.embed_url,
  source       = excluded.source,
  authors      = excluded.authors,
  version      = excluded.version,
  is_published = excluded.is_published,
  order_index  = excluded.order_index,
  published_at = excluded.published_at;

-- ─── Examen PCA: el banco oficial se muda aquí ──────────────────────────────
-- Vivía en /app/banco-oficial, dentro del módulo. Es un documento de referencia,
-- no una herramienta, así que su sitio es la Biblioteca. La ruta vieja queda
-- como redirección.
--
-- El file_url es el nombre EXACTO del archivo que ya está en el bucket,
-- verificado listándolo.
insert into public.library_items
  (category_id, slug, title, type, description, file_url, embed_url,
   source, authors, version, language, is_published, order_index, published_at)
select c.id,
       'banco-preguntas-pca',
       'Banco de preguntas oficial, licencia PCA',
       'pdf',
       'El documento oficial completo que la Aerocivil usa en sus exámenes de conocimiento, para consultar y verificar cualquier pregunta contra la fuente.',
       'Banco de Preguntas Licencia PCA.pdf',
       'https://www.aerocivil.gov.co/',
       'Aeronáutica Civil de Colombia',
       'Unidad Administrativa Especial de Aeronáutica Civil',
       'Edición sin numerar. Confirmar la vigente con la Aerocivil',
       'es', true, 1, null
from public.library_categories c
where c.slug = 'pca'
on conflict (slug) do update set
  title        = excluded.title,
  description  = excluded.description,
  file_url     = excluded.file_url,
  source       = excluded.source,
  version      = excluded.version,
  is_published = excluded.is_published;

-- ─── Índices ────────────────────────────────────────────────────────────────
create index if not exists idx_library_items_categoria
  on public.library_items (category_id, order_index);

create index if not exists idx_library_items_publicados
  on public.library_items (is_published) where is_published = true;

-- ─── Lectura del bucket privado ─────────────────────────────────────────────
-- El bucket es privado y las URL se firman desde el cliente con la sesión del
-- usuario, así que `authenticated` necesita poder leer sus objetos. Sin esto,
-- createSignedUrl responde permiso denegado.
--
-- Solo SELECT: subir y borrar se hace desde el panel, no desde la app.
drop policy if exists "documentos_oficiales_lectura_autenticada" on storage.objects;
create policy "documentos_oficiales_lectura_autenticada" on storage.objects
  for select to authenticated
  using (bucket_id = 'documentos-oficiales');
