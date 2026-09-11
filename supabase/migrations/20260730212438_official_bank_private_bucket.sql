-- Bucket privado para el banco oficial de preguntas de Aerocivil.
-- Privado a propósito: el archivo solo se sirve con URL firmada temporal, así
-- la ruta directa no es adivinable ni compartible más allá de su caducidad.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documentos-oficiales', 'documentos-oficiales', false, 52428800, array['application/pdf'])
on conflict (id) do update
  set public = false,
      file_size_limit = 52428800,
      allowed_mime_types = array['application/pdf'];

-- Solo usuarios autenticados pueden pedir una URL firmada. Un visitante
-- anónimo de la landing no tiene forma de llegar al archivo.
drop policy if exists "documentos oficiales lectura autenticada" on storage.objects;
create policy "documentos oficiales lectura autenticada"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'documentos-oficiales');

-- La escritura queda solo para service_role: el contenido lo carga el equipo,
-- nunca la app. Sin esto, cualquier usuario autenticado podría subir archivos
-- al bucket, que es el mismo error que dejó vault_insert abierta en su día.
drop policy if exists "documentos oficiales escritura service role" on storage.objects;
create policy "documentos oficiales escritura service role"
  on storage.objects for all
  to service_role
  using (bucket_id = 'documentos-oficiales')
  with check (bucket_id = 'documentos-oficiales');
