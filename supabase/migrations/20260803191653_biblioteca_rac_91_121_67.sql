-- Tres RAC nuevos en la Biblioteca: 91, 121 y 67.
--
-- El 121 y el 67 tienen su PDF en el bucket documentos-oficiales y se publican
-- de una vez. El PDF del RAC 91 todavía no está cargado: su fila queda lista
-- pero SIN publicar, apuntando al nombre de archivo acordado; cuando el PDF
-- esté en el bucket solo hay que poner is_published = true.
--
-- Los file_url copian el nombre del bucket LETRA POR LETRA, incluido el typo
-- "Certiciado" del RAC 67 y el espaciado irregular del RAC 121: corregirlos
-- aquí sin renombrar el archivo rompería el visor.
--
-- category_id 16 (Examen PCA) y version "Confirmar la edición vigente" siguen
-- el molde de RAC 2 y RAC 61. La familia 'rac' es la que agrupa el estante.

insert into public.library_items
  (category_id, slug, title, type, description, file_url, source, version,
   familia, portada_url, is_published, published_at)
select v.* from (values
  (16::bigint, 'rac-91',
   'RAC 91, Reglas generales de vuelo y operación', 'pdf',
   'Las reglas del aire en Colombia: VFR, IFR, mínimos y operación general de aeronaves.',
   'RAC 91 - Reglas Generales de Vuelo y Operacion.pdf',
   'Aerocivil de Colombia', 'Confirmar la edición vigente con la Aerocivil',
   'rac', '/biblioteca/portadas/portada-rac-91.webp', false, null::timestamptz),

  (16::bigint, 'rac-121',
   'RAC 121, Requisitos de operación: operaciones domésticas e internacionales, regulares y no regulares', 'pdf',
   'El reglamento de operación del transporte aéreo comercial, el del día a día de una aerolínea.',
   'RAC 121 -Requisitos De Operacion - Operaciones Domesticas - Internacionales-Regulares y No Regulares.pdf',
   'Aerocivil de Colombia', 'Confirmar la edición vigente con la Aerocivil',
   'rac', '/biblioteca/portadas/portada-rac-121.webp', true, now()),

  (16::bigint, 'rac-67',
   'RAC 67, Otorgamiento del certificado médico aeronáutico', 'pdf',
   'El certificado médico: clases, requisitos y vigencias por tipo de licencia.',
   'RAC 67- Otorgamiento del Certiciado Medico.pdf',
   'Aerocivil de Colombia', 'Confirmar la edición vigente con la Aerocivil',
   'rac', '/biblioteca/portadas/portada-rac-67.webp', true, now())
) as v(category_id, slug, title, type, description, file_url, source, version,
       familia, portada_url, is_published, published_at)
where not exists (
  select 1 from public.library_items li where li.slug = v.slug
);
