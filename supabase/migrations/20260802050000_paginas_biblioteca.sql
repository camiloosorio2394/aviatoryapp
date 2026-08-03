-- ============================================================================
-- El número de páginas de un documento se rellena solo
--
-- `library_items.paginas` no lo escribe nadie a mano: pdf.js ya sabe cuántas
-- páginas tiene un documento en cuanto lo abre, y el visor de la Biblioteca usa
-- pdf.js. La primera vez que alguien abre un documento con `paginas` en null,
-- se guarda. Gratis y siempre correcto.
--
-- Va por RPC y no por un update directo a propósito: `library_items` es de solo
-- lectura para los pilotos y tiene que seguir siéndolo. Esta función es la única
-- puerta, y es de un solo sentido:
--
--   * solo escribe cuando `paginas` es null, así que no puede pisar un dato ya
--     puesto ni servir para ir cambiándolo;
--   * solo sobre documentos publicados;
--   * rechaza cifras absurdas, para que un cliente manipulado no meta ruido;
--   * requiere sesión: un anónimo no escribe nada.
-- ============================================================================

create or replace function public.set_library_item_pages(
  p_item_id bigint,
  p_paginas integer
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    return;
  end if;
  if p_paginas is null or p_paginas < 1 or p_paginas > 10000 then
    return;
  end if;

  update public.library_items
     set paginas = p_paginas
   where id = p_item_id
     and is_published = true
     and paginas is null;
end $$;

revoke all on function public.set_library_item_pages(bigint, integer) from public;
grant execute on function public.set_library_item_pages(bigint, integer) to authenticated;
