-- ============================================================================
-- get_subject_mastery pasa a contar contra el banco real.
--
-- APLICADA en produccion el 31 jul 2026 desde la sesion de Camilo (MCP).
--
-- Antes leia `subjects` + `questions`, la pareja legada, que hoy tiene UNA
-- pregunta en total: Meteorologia reportaba 1 pregunta y 3 intentos, o sea un
-- 300% de cobertura. El banco de verdad son 459 preguntas en vault_questions,
-- y la practica vive en vault_sessions, no en quiz_attempts.
--
-- COBERTURA: de las 11 materias del vault, solo 4 existen en `subjects`
-- (meteorologia, aerodinamica, navegacion, weight-balance). Al mover la fuente
-- al vault, la funcion deja de perder siete materias: reglamentacion,
-- procedimientos, servicios_meteo, factores_humanos, sistemas, instrumentos y
-- performance.
--
-- Verificado tras aplicar: 11 materias y 459 preguntas (antes 6 y 1).
--
-- CONTRATO: se respeta la firma anterior al detalle, incluido el orden de las
-- columnas (avg_score antes que attempts_count) y el tipo bigint de
-- subject_id, para no romper al cliente.
--
-- OJO para el frontend: subject_id llega NULL en las siete materias sin
-- registro legado. Tratarlo como opcional y usar subject_slug con
-- getSubjectMeta() de src/lib/vaultSubjects.ts para el nombre mostrado, que es
-- donde viven los nombres buenos. El fallback de subject_name aqui es un
-- initcap del slug, suficiente pero no bonito.
-- ============================================================================

create or replace function public.get_subject_mastery()
returns table (
  subject_id bigint,
  subject_name text,
  subject_slug text,
  total_questions integer,
  total_attempted integer,
  avg_score numeric,
  mastery_level text,
  attempts_count integer
)
language sql
security definer
set search_path = ''
as $$
  with banco as (
    select vq.subject_slug as slug, count(*)::int as total_q
    from public.vault_questions vq
    where vq.module = 'pca' and vq.is_active
    group by vq.subject_slug
  ),
  practica as (
    select
      s.subject_slug as slug,
      count(*)::int as attempts,
      sum(s.correct_count)::int as aciertos,
      -- Preguntas distintas vistas: repetir una no amplia cobertura.
      (select count(distinct q)
         from public.vault_sessions s2, unnest(s2.question_ids) as q
        where s2.user_id = auth.uid()
          and s2.module = 'pca'
          and s2.subject_slug = s.subject_slug
          and s2.completed_at is not null)::int as vistas
    from public.vault_sessions s
    where s.user_id = auth.uid()
      and s.module = 'pca'
      and s.completed_at is not null
      and s.subject_slug is not null
      and s.subject_slug <> 'examen'
    group by s.subject_slug
  )
  select
    sj.id::bigint as subject_id,
    coalesce(sj.name, initcap(replace(replace(b.slug, '_', ' '), '-', ' '))) as subject_name,
    b.slug as subject_slug,
    b.total_q as total_questions,
    coalesce(p.vistas, 0) as total_attempted,
    case
      when coalesce(p.vistas, 0) > 0
        then round((p.aciertos::numeric / p.vistas) * 100, 0)
      else 0
    end as avg_score,
    case
      when p.attempts is null or coalesce(p.vistas, 0) = 0 then 'novice'
      when (p.aciertos::numeric / p.vistas) * 100 < 30 then 'novice'
      when (p.aciertos::numeric / p.vistas) * 100 < 50 then 'learning'
      when (p.aciertos::numeric / p.vistas) * 100 < 70 then 'proficient'
      when (p.aciertos::numeric / p.vistas) * 100 < 85 then 'advanced'
      else 'expert'
    end as mastery_level,
    coalesce(p.attempts, 0) as attempts_count
  from banco b
  left join public.subjects sj on sj.slug = b.slug
  left join practica p on p.slug = b.slug
  order by b.total_q desc, b.slug
$$;

comment on function public.get_subject_mastery() is
  'Dominio por materia del banco PCA real (vault_questions + vault_sessions). subject_id es null en materias sin registro en la tabla legada subjects.';

-- Trampa conocida: create or replace restaura EXECUTE a PUBLIC.
revoke all on function public.get_subject_mastery() from public, anon;
grant execute on function public.get_subject_mastery() to authenticated, service_role;

-- ============================================================================
-- Contenido: voseo en las descripciones de canales de comunidad.
-- La convencion del proyecto es tuteo neutro LATAM.
-- ============================================================================
update public.community_channels
   set description = 'Comparte tus aprobados, hitos y horas nuevas'
 where slug = 'logros'
   and description = 'Compartí tus aprobados, hitos y horas nuevas';
