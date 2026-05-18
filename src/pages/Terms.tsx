import { Link } from "react-router-dom"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { Seo } from "@/components/Seo"

export function Terms() {
  return (
    <PublicLayout>
      <Seo
        path="/terminos"
        title="Términos y condiciones"
        description="Términos de uso de Aviatory. Cuentas, suscripciones, comunidad, propiedad intelectual."
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <header className="mb-12">
          <p className="text-sm text-muted-foreground">Última actualización: 18 de mayo de 2026</p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
            Términos y condiciones
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Estos términos rigen el uso de Aviatory ("la plataforma"). Al crear una
            cuenta o usar nuestros servicios, aceptas estos términos.
          </p>
        </header>

        <article className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <Section title="1. Quiénes somos">
            <p>
              Aviatory es una plataforma educativa dirigida a pilotos en Latinoamérica
              que están en formación PPL/CPL o buscando empleo en aerolínea. Operamos
              como proyecto en etapa de validación y nuestro equipo está conformado
              por Nicolás Gómez y Camilo Osorio.
            </p>
            <p>
              Para asuntos legales o de soporte:{" "}
              <a href="mailto:hola@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                hola@aviatory.app
              </a>
              .
            </p>
          </Section>

          <Section title="2. Cuentas de usuario">
            <p>
              Para usar la plataforma debes crear una cuenta proporcionando un email
              válido y una contraseña segura. Eres responsable de mantener la
              confidencialidad de tus credenciales.
            </p>
            <p>
              Debes tener al menos 17 años para crear una cuenta. Si tienes menos,
              necesitas autorización de un padre o tutor legal.
            </p>
            <p>
              Podemos suspender o cerrar cuentas que violen estos términos,
              incluyendo: compartir contenido protegido por derechos de autor,
              suplantar identidad, distribuir preguntas oficiales de exámenes, o
              utilizar la plataforma con fines fraudulentos.
            </p>
          </Section>

          <Section title="3. Contenido de la plataforma">
            <p>
              El banco de preguntas, simulacros, guías y demás contenido educativo
              son producidos por instructores aeronáuticos certificados. Están
              inspirados en la teoría oficial de Aerocivil Colombia y otros
              reguladores, pero no son copia literal de exámenes oficiales.
            </p>
            <p>
              <strong>Importante:</strong> aprobar nuestros simulacros no garantiza
              aprobar el examen oficial. Aviatory es una herramienta de preparación
              complementaria, no un sustituto de tu escuela de aviación ni del
              examen del regulador.
            </p>
            <p>
              Tampoco garantizamos que obtendrás un empleo en aerolínea. Te
              preparamos para que cumplas los requisitos; la decisión final la toma
              cada aerolínea.
            </p>
          </Section>

          <Section title="4. Suscripciones y pagos">
            <p>
              Aviatory ofrece un plan gratuito y planes pagos (Pro mensual, Pro
              anual, Founder Lifetime). Los precios se muestran en la página de{" "}
              <Link to="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">
                planes
              </Link>{" "}
              y pueden actualizarse con 30 días de aviso previo.
            </p>
            <p>
              Las suscripciones Pro renuevan automáticamente al final de cada
              período. Puedes cancelar en cualquier momento desde tu perfil; el
              acceso se mantiene hasta el final del período pagado, sin cargos
              adicionales.
            </p>
            <p>
              No hacemos reembolsos por períodos parciales ya transcurridos. Para
              disputas o problemas con el pago, contáctanos en{" "}
              <a href="mailto:hola@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                hola@aviatory.app
              </a>{" "}
              dentro de los primeros 14 días.
            </p>
          </Section>

          <Section title="5. Conducta en la comunidad">
            <p>Al participar en los canales públicos te comprometes a:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
              <li>Mantener un tono respetuoso y profesional.</li>
              <li>No compartir preguntas literales de exámenes oficiales.</li>
              <li>No distribuir material pirata, links a torrents o contenido sin licencia.</li>
              <li>No suplantar a otros pilotos, instructores ni aerolíneas.</li>
              <li>No hacer spam, marketing no solicitado ni acoso.</li>
            </ul>
            <p>
              Los moderadores pueden editar o eliminar mensajes que violen estas
              normas, y en casos graves suspender cuentas sin devolución.
            </p>
          </Section>

          <Section title="6. Propiedad intelectual">
            <p>
              Aviatory, su logo, marca y todo el contenido producido por el equipo
              son propiedad nuestra. No puedes copiarlos, redistribuirlos ni usarlos
              para fines comerciales sin autorización escrita.
            </p>
            <p>
              El contenido que tú generas (mensajes en comunidad, perfil, foto)
              sigue siendo tuyo. Al publicarlo nos otorgas una licencia limitada
              para mostrarlo dentro de la plataforma.
            </p>
          </Section>

          <Section title="7. Limitación de responsabilidad">
            <p>
              Aviatory se ofrece "tal cual". Hacemos todo lo posible por mantener
              la información actualizada y precisa, pero la aviación es un dominio
              regulado donde los requisitos cambian. Siempre consulta el RAC vigente
              y a tu escuela de aviación para decisiones críticas.
            </p>
            <p>
              No somos responsables por decisiones que tomes basándote únicamente
              en información de la plataforma, ni por interrupciones técnicas
              temporales del servicio.
            </p>
          </Section>

          <Section title="8. Cambios a estos términos">
            <p>
              Podemos actualizar estos términos cuando agreguemos features o cambien
              las regulaciones. Te avisaremos por email con al menos 30 días de
              anticipación si los cambios afectan tus derechos.
            </p>
          </Section>

          <Section title="9. Ley aplicable">
            <p>
              Estos términos se rigen por las leyes de la República de Colombia.
              Cualquier disputa se resolverá en los tribunales competentes de
              Bogotá, salvo que la legislación de tu país de residencia
              establezca lo contrario.
            </p>
          </Section>

          <Section title="10. Contacto">
            <p>
              Para cualquier consulta sobre estos términos:{" "}
              <a href="mailto:hola@aviatory.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                hola@aviatory.app
              </a>
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
