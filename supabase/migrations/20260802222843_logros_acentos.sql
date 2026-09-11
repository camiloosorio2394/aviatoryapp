-- Diez logros se insertaron sin tildes desde las migraciones del 1 de agosto.
-- Es texto VISIBLE: sale en el aviso de logro desbloqueado y en el perfil.
update public.achievements set name = 'NOTAM leído',
  description = 'Leíste la lección de NOTAM completa' where code = 'notam_lesson';

update public.achievements set
  description = 'Resolviste toda la práctica de NOTAM' where code = 'notam_practice';

update public.achievements set name = 'METAR leído',
  description = 'Leíste la lección de METAR completa' where code = 'metar_lesson';

update public.achievements set
  description = 'Terminaste el tema entero: lección, práctica y evaluación' where code = 'notam_master';

update public.achievements set
  description = 'Terminaste el tema entero: lección, práctica y evaluación' where code = 'metar_master';

update public.achievements set
  description = 'Aprobaste el simulacro de entrevista técnica' where code = 'airline_mock_passed';

update public.achievements set name = 'Mercancías leído',
  description = 'Leíste las nueve secciones del módulo de mercancías peligrosas' where code = 'mercancias_lesson';

update public.achievements set name = 'Mercancías clasificadas',
  description = 'Resolviste los cuatro casos de clasificación' where code = 'mercancias_practice';

update public.achievements set
  description = 'Aprobaste el chequeo final de mercancías peligrosas' where code = 'mercancias_exam';

update public.achievements set name = 'Mercancías dominadas',
  description = 'Terminaste el módulo entero: lectura, práctica y chequeo' where code = 'mercancias_master';

update public.achievements set
  description = 'Aprobaste la evaluación de NOTAM' where code = 'notam_exam';
