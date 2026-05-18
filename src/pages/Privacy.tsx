import { Link } from "react-router-dom"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { Seo } from "@/components/Seo"

export function Privacy() {
  return (
    <PublicLayout>
      <Seo
        path="/privacidad"
        title="Política de privacidad"
        description="Cómo recolectamos, usamos y protegemos tu data. Tu información es tuya."
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <header className="mb-12">
          <p className="text-sm text-muted-foreground">Última actualización: 18 de mayo de 2026</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
            Política de privacidad
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Tu data es tuya. Esta política explica qué información recolectamos,
            cómo la usamos y qué control tienes sobre ella.
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <Section title="1. Quién es el responsable">
            <p>
              Aviatory (proyecto de Nicolás Gómez y Camilo Osorio) es responsable
              del tratamiento de tus datos personales. Contacto:{" "}
              <a href="mailto:hola@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                hola@aviatory.app
              </a>
              .
            </p>
          </Section>

          <Section title="2. Qué datos recolectamos">
            <p>Cuando creas una cuenta y usas la plataforma, almacenamos:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Identidad:</strong> email, contraseña (cifrada con bcrypt),
                username elegido, nombre completo opcional, foto opcional.
              </li>
              <li>
                <strong>Perfil de piloto:</strong> etapa de carrera, horas de vuelo
                totales y PIC, licencias, nivel ICAO, aerolínea objetivo.
              </li>
              <li>
                <strong>Actividad:</strong> quizzes realizados, respuestas, racha,
                logros desbloqueados, mensajes en comunidad, reacciones.
              </li>
              <li>
                <strong>Suscripción:</strong> plan vigente, fechas, ID de transacción
                (cuando habilitemos pagos).
              </li>
              <li>
                <strong>Técnico:</strong> IP, navegador, OS (en logs estándar de
                Vercel y Supabase, retención 30 días para seguridad).
              </li>
            </ul>
            <p>
              <strong>No recolectamos:</strong> ubicación GPS precisa, contactos,
              calendario, micrófono ni cámara. Tampoco hacemos tracking cross-site
              con cookies de terceros.
            </p>
          </Section>

          <Section title="3. Para qué usamos tu data">
            <p>
              Usamos tu data exclusivamente para que la plataforma funcione y para
              comunicarnos contigo:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Mostrarte tu progreso, plan personalizado y dashboard.</li>
              <li>Calcular tu match con aerolíneas objetivo.</li>
              <li>Mostrar tu username, foto y racha en mensajes públicos.</li>
              <li>Enviarte notificaciones in-app sobre logros y vencimientos.</li>
              <li>Soporte técnico cuando nos escribes.</li>
              <li>Análisis agregado y anónimo para mejorar el producto.</li>
            </ul>
            <p>
              <strong>Nunca vendemos tu data.</strong> Punto.
            </p>
          </Section>

          <Section title="4. Quién accede a tu data">
            <p>Tu data vive en:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Supabase</strong> (Postgres + Storage + Auth) — provider de
                infraestructura con compliance SOC 2. Region: São Paulo, Brasil.
              </li>
              <li>
                <strong>Vercel</strong> — hosting del frontend (sin persistencia
                de data personal).
              </li>
              <li>
                <strong>Anthropic</strong> — cuando usas Wingman (tutor IA), tu
                pregunta se envía a la API de Anthropic. Anthropic no usa esos
                datos para entrenar modelos en su API empresarial.
              </li>
            </ul>
            <p>
              Nadie del equipo Aviatory accede manualmente a tu data salvo cuando
              tú nos escribes pidiendo ayuda específica. No leemos tus mensajes
              privados ni tus respuestas de quiz.
            </p>
          </Section>

          <Section title="5. Comunidad: lo público y lo privado">
            <p>
              Los mensajes en los canales de comunidad son <strong>públicos para todos los
              usuarios autenticados</strong>. Tu username, foto y racha aparecen junto
              al mensaje.
            </p>
            <p>
              No publicamos tu email, horas reales, licencias ni etapa en lugares
              públicos. Esa data solo es visible para vos en tu perfil.
            </p>
          </Section>

          <Section title="6. Tus derechos">
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>
                <strong>Acceder</strong> a toda tu data desde tu{" "}
                <Link to="/app/perfil" className="text-blue-600 dark:text-blue-400 hover:underline">
                  perfil
                </Link>
                .
              </li>
              <li>
                <strong>Rectificar</strong> información incorrecta directamente desde
                el perfil.
              </li>
              <li>
                <strong>Eliminar</strong> tu cuenta y toda tu data asociada
                escribiéndonos a{" "}
                <a href="mailto:hola@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                  hola@aviatory.app
                </a>{" "}
                con asunto "Eliminar mi cuenta". Cumplimos en menos de 30 días.
              </li>
              <li>
                <strong>Exportar</strong> tu data en formato JSON. Solicítalo al
                mismo email.
              </li>
              <li>
                <strong>Oponerte</strong> a tratamientos específicos (ej:
                notificaciones marketing — hoy no enviamos).
              </li>
            </ul>
          </Section>

          <Section title="7. Seguridad">
            <p>
              Tu contraseña se almacena cifrada con bcrypt. La conexión a la
              plataforma es HTTPS obligatorio. La base de datos tiene Row-Level
              Security activo: cada user solo puede acceder a su propia data.
            </p>
            <p>
              Si detectamos un incidente de seguridad que afecte tu data, te
              notificaremos por email dentro de las 72 horas.
            </p>
          </Section>

          <Section title="8. Cookies y tracking">
            <p>
              Solo usamos cookies <strong>esenciales</strong> para mantener tu sesión
              iniciada (Supabase Auth). No usamos cookies de tracking de terceros
              (Google Analytics, Meta Pixel, etc.) por ahora. Si en el futuro
              agregamos analítica, te avisaremos y será privacy-friendly (PostHog
              EU o Plausible).
            </p>
          </Section>

          <Section title="9. Menores de edad">
            <p>
              Aviatory está dirigida a mayores de 17 años (edad mínima común para
              comenzar formación PPL en Colombia). Si tienes menos, necesitas
              autorización de un padre o tutor.
            </p>
          </Section>

          <Section title="10. Cambios a esta política">
            <p>
              Si cambiamos esta política de forma material te avisamos por email
              con 30 días de anticipación. La fecha de "última actualización"
              arriba siempre refleja la versión vigente.
            </p>
          </Section>

          <Section title="11. Contacto y autoridad de protección">
            <p>
              Para ejercer tus derechos o reportar abusos:{" "}
              <a href="mailto:hola@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                hola@aviatory.app
              </a>
            </p>
            <p>
              Si vives en Colombia y consideras que vulneramos tus derechos,
              puedes acudir a la{" "}
              <a
                href="https://www.sic.gov.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Superintendencia de Industria y Comercio (SIC)
              </a>
              .
            </p>
          </Section>
        </article>
      </div>
    </PublicLayout>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </section>
  )
}
