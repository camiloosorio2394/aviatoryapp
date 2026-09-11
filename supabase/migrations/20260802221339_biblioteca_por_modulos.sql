-- Biblioteca: las categorias pasan a ser los modulos.
--
-- Primero la restriccion de `type`: la original solo admitia los tipos del
-- marcador de posicion (manual, sop, quick_ref...) y la pantalla real usa
-- `pdf` para el documento alojado y `referencia` para la ficha sin archivo
-- (Library.tsx:182). Sin esto la migracion falla entera.
alter table public.library_items drop constraint if exists library_items_type_check;
alter table public.library_items add constraint library_items_type_check
  check (type in ('pdf', 'referencia'));

delete from public.library_categories c
where c.slug in (
  'manuales', 'sops', 'quick_refs', 'performance', 'w_and_b',
  'briefings', 'checklist_philosophy', 'crm_tem_cases', 'accident_studies'
)
and not exists (select 1 from public.library_items i where i.category_id = c.id);

insert into public.library_categories (slug, name, description, icon_name, color, order_index) values
  ('pca',                   'Examen PCA',               'El banco oficial y el material de referencia del examen de la Aerocivil.', 'BookOpen',      'blue',  1),
  ('icao',                  'Ingles ICAO',              'Material de referencia del examen TEA y del nivel ICAO.',                  'Radio',         'blue',  2),
  ('notam',                 'NOTAM',                    'Documentacion de referencia para leer e interpretar NOTAM.',               'FileText',      'blue',  3),
  ('metar',                 'Meteorologia operacional', 'Documentacion de referencia de METAR y meteorologia para el vuelo.',       'CloudSun',      'cyan',  4),
  ('mercancias-peligrosas', 'Mercancias peligrosas',    'La norma que respalda el modulo: RAC 175, LAR 175 y las fuentes de OACI e IATA.', 'AlertTriangle', 'red', 5),
  ('general',               'General',                  'Documentos que no pertenecen a un modulo concreto.',                       'Library',       'green', 9)
on conflict (slug) do update set
  name        = excluded.name,
  description = excluded.description,
  icon_name   = excluded.icon_name,
  color       = excluded.color,
  order_index = excluded.order_index;

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

insert into public.library_items
  (category_id, slug, title, type, description, file_url, embed_url,
   source, authors, version, language, is_published, order_index, published_at)
select c.id, v.slug, v.title, v.type, v.description, v.file_url, v.embed_url,
       v.source, v.authors, v.version, 'es', true, v.order_index, v.published_at
from public.library_categories c
join (values
  (
    'rac-175',
    'RAC 175, Transporte sin riesgos de mercancias peligrosas por via aerea',
    'pdf',
    'El reglamento colombiano. Adopta el Anexo 18 de OACI y remite a las Instrucciones Tecnicas del Doc 9284. Es la norma que aplica en Colombia.',
    'RAC 175 - Transporte sin Riesgo de Mercancias Peligrosas por via Aerea.pdf',
    'https://www.aerocivil.gov.co/normatividad/Paginas/rac.aspx',
    'Aerocivil de Colombia',
    'Unidad Administrativa Especial de Aeronautica Civil',
    'Edicion Original, marzo 2016 - Resolucion 00478 del 29 de febrero de 2016',
    1,
    '2016-03-31'::date
  ),
  (
    'lar-175',
    'LAR 175, Transporte sin riesgo de mercancias peligrosas por via aerea',
    'pdf',
    'El reglamento regional del SRVSOP, con el que se armoniza el RAC 175. Util para ver de donde viene cada requisito colombiano.',
    'LAR 175 MERCANCIAS PELIGROSAS.pdf',
    'https://www.srvsop.aero/reglamentos-lar/',
    'SRVSOP',
    'Sistema Regional de Cooperacion para la Vigilancia de la Seguridad Operacional',
    'Primera edicion, Enmienda 4, diciembre 2017',
    2,
    '2017-12-03'::date
  ),
  (
    'oaci-anexo-18',
    'OACI, Anexo 18: Transporte sin riesgos de mercancias peligrosas por via aerea',
    'referencia',
    'La norma marco. Establece los estandares del transporte de mercancias peligrosas por via aerea, y es lo que el RAC 175 adopta para Colombia. No se aloja en Aviatory: es una publicacion de pago de OACI.',
    null,
    'https://store.icao.int/',
    'OACI',
    'Organizacion de Aviacion Civil Internacional',
    'Consultar la edicion vigente en la tienda de OACI',
    3,
    null
  ),
  (
    'oaci-doc-9284',
    'OACI, Doc 9284: Instrucciones Tecnicas',
    'referencia',
    'El como detallado: clasificacion, embalaje, marcado y el listado de numeros ONU. Se reedita cada dos anos, asi que la edicion importa. No se aloja en Aviatory: es una publicacion de pago de OACI.',
    null,
    'https://store.icao.int/',
    'OACI',
    'Organizacion de Aviacion Civil Internacional',
    'Se reedita cada 2 anos. Consultar la edicion vigente',
    4,
    null
  ),
  (
    'iata-dgr',
    'IATA, Dangerous Goods Regulations',
    'referencia',
    'El manual operativo de la industria, mas estricto y mas practico que la norma, y alineado con el Doc 9284. Se publica cada ano. Ante conflicto prevalece la norma vigente. No se aloja en Aviatory: es una publicacion de pago de IATA.',
    null,
    'https://www.iata.org/en/publications/dgr/',
    'IATA',
    'International Air Transport Association',
    'Edicion anual. Consultar la del ano en curso',
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

insert into public.library_items
  (category_id, slug, title, type, description, file_url, embed_url,
   source, authors, version, language, is_published, order_index, published_at)
select c.id,
       'banco-preguntas-pca',
       'Banco de preguntas oficial, licencia PCA',
       'pdf',
       'El documento oficial completo que la Aerocivil usa en sus examenes de conocimiento, para consultar y verificar cualquier pregunta contra la fuente.',
       'Banco de Preguntas Licencia PCA.pdf',
       'https://www.aerocivil.gov.co/',
       'Aeronautica Civil de Colombia',
       'Unidad Administrativa Especial de Aeronautica Civil',
       'Edicion sin numerar. Confirmar la vigente con la Aerocivil',
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

create index if not exists idx_library_items_categoria
  on public.library_items (category_id, order_index);

create index if not exists idx_library_items_publicados
  on public.library_items (is_published) where is_published = true;

drop policy if exists "documentos_oficiales_lectura_autenticada" on storage.objects;
create policy "documentos_oficiales_lectura_autenticada" on storage.objects
  for select to authenticated
  using (bucket_id = 'documentos-oficiales');
