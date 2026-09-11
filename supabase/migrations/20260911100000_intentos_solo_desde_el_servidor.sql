-- Los intentos de evaluación los escribe solo el servidor.
--
-- Desde 20260911080000 la nota se calcula en evaluacion_terminar (security
-- definer), que es la única función que inserta en estas cuatro tablas. El
-- cliente ya no las escribe; si conservara el INSERT, cualquiera podría seguir
-- guardándose un 100 con una llamada directa a la API.
--
-- Queda: cada piloto lee sus propios intentos (historial y mejor nota).
-- No se tocan filas.

drop policy if exists notam_exam_insert_own on public.user_notam_exam_attempts;
drop policy if exists metar_exam_insert_own on public.user_metar_exam_attempts;
drop policy if exists mercancias_exam_insert_own on public.user_mercancias_exam_attempts;
drop policy if exists airline_mock_insert_own on public.user_airline_mock_attempts;

revoke all on table
  public.user_notam_exam_attempts,
  public.user_metar_exam_attempts,
  public.user_mercancias_exam_attempts,
  public.user_airline_mock_attempts
from anon, authenticated;

grant select on table
  public.user_notam_exam_attempts,
  public.user_metar_exam_attempts,
  public.user_mercancias_exam_attempts,
  public.user_airline_mock_attempts
to authenticated;
