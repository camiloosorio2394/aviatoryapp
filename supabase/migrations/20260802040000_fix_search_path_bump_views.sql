-- ============================================================================
-- El disparador de vistas de la Biblioteca, con search_path fijo
--
-- `bump_library_item_views()` (la de DISPARADOR, sin argumentos) no tenía
-- search_path fijo, que es lo que get_advisors reporta como
-- function_search_path_mutable: una función SECURITY DEFINER sin search_path
-- puede resolver nombres contra un esquema que controle el llamador.
--
-- Sigue viva y en uso por `trg_bump_library_views` sobre `user_library_views`,
-- así que no se borra. Solo se le pone el search_path vacío; las referencias ya
-- iban calificadas con `public.`.
--
-- No confundir con `bump_library_item_views(bigint)`, que es la RPC que llama
-- la Biblioteca y es otra función. Las dos conviven a propósito.
-- ============================================================================

create or replace function public.bump_library_item_views()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.library_items
     set views_count = coalesce(views_count, 0) + 1
   where id = new.item_id;
  return new;
end $$;
