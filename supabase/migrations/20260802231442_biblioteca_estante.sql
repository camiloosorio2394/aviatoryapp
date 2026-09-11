-- La Biblioteca pasa a estante: filas por familia con portada por documento.
--
-- `portada_url`: ruta de la portada en public/biblioteca/portadas. Cami las
--   disena y son lo que se ve en el estante, asi que no es opcional de facto.
-- `familia`:     de que serie es. Es la fila donde cae. Cada documento tiene
--   exactamente una, sin ambiguedad, a diferencia de la materia.
-- `destacado`:   entra en la fila "Esenciales", curada a mano.
-- `paginas`:     lo rellena pdf.js la primera vez que alguien lo abre.

alter table public.library_items
  add column if not exists portada_url text,
  add column if not exists familia     text,
  add column if not exists destacado   boolean not null default false,
  add column if not exists paginas     int;

comment on column public.library_items.portada_url is
  'Ruta de la portada en public/biblioteca/portadas. Es lo que se ve en el estante.';
comment on column public.library_items.familia is
  'Serie del documento: rac, lar, oaci, iata, aviatory, otro. Define en que fila del estante aparece.';
comment on column public.library_items.paginas is
  'Numero de paginas. Lo rellena pdf.js al abrir el documento por primera vez, no se escribe a mano.';

alter table public.library_items drop constraint if exists library_items_familia_check;
alter table public.library_items add constraint library_items_familia_check
  check (familia is null or familia in ('rac','lar','oaci','iata','aviatory','otro'));

create index if not exists idx_library_items_familia
  on public.library_items (familia, order_index);

update public.library_items set
  portada_url = '/biblioteca/portadas/portada-rac-175.webp',
  familia = 'rac', destacado = true, paginas = 96
where slug = 'rac-175';

update public.library_items set
  portada_url = '/biblioteca/portadas/portada-lar-175.webp',
  familia = 'lar', destacado = true, paginas = 64
where slug = 'lar-175';

update public.library_items set
  portada_url = '/biblioteca/portadas/portada-banco-pca.webp',
  familia = 'aviatory', destacado = true, paginas = 148
where slug = 'banco-preguntas-pca';

-- Las tres fichas de referencia salen de la vista: Cami decidio que la
-- Biblioteca solo habla de lo que esta cargado. Se despublican en vez de
-- borrarse, por si algun dia se suben.
update public.library_items set is_published = false
where slug in ('oaci-anexo-18','oaci-doc-9284','iata-dgr');
