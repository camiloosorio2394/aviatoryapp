-- Add 'instructor' to pilot_stage enum
--
-- Context: el onboarding fue revisado por Camilo (piloto del equipo, 2026-05-24)
-- y la nomenclatura oficial colombiana incluye INSTRUCTOR DE VUELO AVIÓN (IVA)
-- como etapa propia de carrera. Las etapas viejas 'cpl_in_progress' y
-- 'hour_building' quedan en el enum por compatibilidad pero ya no se muestran
-- como opciones en el onboarding (frontend filtra).
--
-- ALTER TYPE ... ADD VALUE no puede correr dentro de una transacción, por eso
-- Supabase CLI lo maneja como migración separada.

alter type public.pilot_stage add value if not exists 'instructor';
