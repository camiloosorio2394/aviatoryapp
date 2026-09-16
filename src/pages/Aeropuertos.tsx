import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, BookOpen, GraduationCap, LayoutGrid, Target } from "lucide-react"
import { CourseCard } from "@/components/ui/course-card"
import type { CourseCardProps } from "@/components/ui/course-card"
import { EspacioVideo } from "@/components/modulo/EspacioVideo"
import {
  AP_ACENTO,
  AP_APRENDE,
  AP_CATALOGO,
  AP_EVALUACION,
  AP_LECTURA_TOTAL,
  AP_NIVELES,
  AP_PRACTICA,
  AP_TITULO,
  AP_VIGENCIA,
  readAeropuertosLocal,
} from "@/lib/aeropuertos"

/**
 * Hub del módulo Aeropuertos. Ruta: /app/aerolinea/aeropuertos
 *
 * La misma casa que los hubs de NOTAM y Mercancías: hero con velo violeta, el
 * video de apertura y las puertas numeradas. Lo que cambia aquí es que este
 * módulo **se estudia mirando**, así que el catálogo visual entra como una
 * puerta más y no como un apéndice de la práctica: es donde están todas las
 * señales, letreros, luces y balizas del Anexo 14, para consultar de un vistazo.
 *
 * El hero todavía no tiene foto y el video no está grabado. Los dos quedan como
 * huecos rotulados con lo que hace falta producir, que es como se trabaja el
 * resto del módulo: nadie tiene que venir a preguntar qué imagen va aquí.
 */
export function Aeropuertos() {
  const [leidas] = useState(() => readAeropuertosLocal().lessonScreens.length)
  const pct = Math.round((leidas / AP_LECTURA_TOTAL) * 100)

  const partes: CourseCardProps[] = [
    {
      to: AP_APRENDE,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: BookOpen,
      color: AP_ACENTO,
      meta: `${AP_LECTURA_TOTAL} lecciones · ${AP_NIVELES.length} niveles`,
      title: "1. Aprende",
      blurb:
        "Señales, letreros, luces y balizas, en el orden en que te los encuentras. Cada nivel cierra con su entrevista.",
      photoHueco: "AP-POR-01 · 5:2 · 1200×480 · Cabecera de pista con sus señales blancas desde el aire",
      status:
        leidas === 0 ? "Sin empezar" : leidas >= AP_LECTURA_TOTAL ? "Lección completa" : `${leidas} de ${AP_LECTURA_TOTAL} lecciones leídas`,
      progress: pct,
      done: leidas >= AP_LECTURA_TOTAL,
      cta: "Iniciar formación",
    },
    {
      to: AP_CATALOGO,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: LayoutGrid,
      color: AP_ACENTO,
      meta: "Todas las ayudas visuales del Anexo 14",
      title: "2. Catálogo",
      blurb:
        "La consulta rápida: cada señal, letrero, luz y baliza con su nombre, qué es y qué significa para ti.",
      photoHueco: "AP-POR-02 · 5:2 · 1200×480 · Mosaico de letreros y señales de un aeropuerto",
      status: "Abierto siempre",
      cta: "Abrir catálogo",
    },
    {
      to: AP_PRACTICA,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: Target,
      color: AP_ACENTO,
      meta: "Reconocer y decidir",
      title: "3. Práctica",
      blurb: "Qué estás viendo, dónde paras y qué cambió con la última enmienda.",
      photoHueco: "AP-POR-03 · 5:2 · 1200×480 · Punto de espera visto desde la cabina, de día",
      status: "Sin empezar",
      cta: "Iniciar práctica",
    },
    {
      to: AP_EVALUACION,
      densidad: "compacta",
      photoAspect: "5/2",
      icon: GraduationCap,
      color: AP_ACENTO,
      meta: "Opción múltiple, con explicación al final",
      title: "4. Evaluación",
      blurb: "Lo que preguntan de aeropuertos en una entrevista técnica, con corrección al terminar.",
      photoHueco: "AP-POR-04 · 5:2 · 1200×480 · Torre de control al atardecer",
      status: "Sin intentos",
      cta: "Iniciar evaluación",
    },
  ]

  return (
    <div className="notam-hub px-5 sm:px-8 py-9 sm:py-11 pb-24 max-w-[1280px] mx-auto">
      <Link
        to="/app/aerolinea"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Volver a Ingreso a aerolínea
      </Link>

      <section className="relative overflow-hidden rounded-[18px] bg-[#1A1230] shadow-[0_1px_2px_rgba(11,27,48,0.08)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(26,18,48,.96) 0%, rgba(40,28,74,.88) 45%, rgba(107,79,216,.45) 100%)",
          }}
          aria-hidden
        />

        <div className="relative grid gap-7 px-7 pb-7 pt-7 sm:px-12 sm:pb-8 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#C4B5FD" }}>
                Módulo
              </span>
              <span className="h-3 w-px bg-white/20" aria-hidden />
              <span className="nh-display text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Ingreso a aerolínea
              </span>
            </div>

            <h1 className="nh-display mt-4 text-[38px] font-bold leading-none tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
              {AP_TITULO}
            </h1>

            <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.55] text-white/80">
              Un aeropuerto te habla todo el tiempo: en el suelo, en los letreros y en las luces.
              Este módulo te enseña a leerlo de un vistazo, que es como se hace de verdad con el
              avión rodando.
            </p>

            <p className="mt-3 text-[13px] text-white/50">{AP_VIGENCIA}</p>
          </div>

          <div className="lg:justify-self-end">
            <EspacioVideo
              src="/modulos/aeropuertos/intro.mp4"
              portada="/modulos/aeropuertos/intro-poster.webp"
              duracion="1 min"
              titulo="Cómo se lee un aeropuerto"
              continuarA={AP_APRENDE}
              continuarTexto="Empezar el módulo"
              claveVisto="aviatory.aeropuertos.video"
              acento="#C4B5FD"
              rotulo="AP-VID-01 · Video de apertura · 16:9 · 60 s"
              descripcion="El video del módulo, con la misma serie que NOTAM y Mercancías: ocho escenas, un minuto, voz William Shanks en español. Recorre lo que el piloto ve al rodar, de la puerta a la pista. Se guarda como intro.mp4 y su primer cuadro como intro-poster.webp; en cuanto estén, el reproductor aparece aquí solo."
            />
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {partes.map((p) => (
          <CourseCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  )
}
