/**
 * Lo que comparten las pruebas de pantalla: montar con `act`, esperar a que
 * resuelvan las promesas simuladas y manejar el formulario como lo haría el
 * piloto (escribir, hacer clic, buscar un campo por su rótulo).
 *
 * No hay Testing Library en el repo; esto es lo mínimo para no repetirlo en
 * cada archivo. Las pantallas se prueban sin red: cada prueba simula los
 * servicios de `src/services/*` que la pantalla usa.
 */
import { act, type ReactNode } from "react"
import { createRoot, type Root } from "react-dom/client"

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

/**
 * jsdom no trae `matchMedia`. Se responde «prefiere menos movimiento», así
 * `CountUp` y compañía pintan la cifra final de una vez en lugar de animarla.
 */
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (consulta: string) =>
    ({
      matches: consulta.includes("prefers-reduced-motion"),
      media: consulta,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

/** jsdom declara `scrollTo` pero no lo implementa y lo grita en la consola. */
if (typeof window !== "undefined") window.scrollTo = () => {}

export interface Pantalla {
  contenedor: HTMLDivElement
  /** Todo el texto visible de la pantalla. */
  texto: () => string
  desmontar: () => void
}

let montadas: Pantalla[] = []

/** Deja correr las promesas pendientes (las respuestas simuladas de los servicios). */
export async function esperar(vueltas = 3): Promise<void> {
  for (let i = 0; i < vueltas; i++) {
    await act(async () => {
      await Promise.resolve()
    })
  }
}

export async function montar(ui: ReactNode): Promise<Pantalla> {
  const contenedor = document.createElement("div")
  document.body.appendChild(contenedor)
  const raiz: Root = createRoot(contenedor)
  await act(async () => {
    raiz.render(ui)
  })
  await esperar()
  const pantalla: Pantalla = {
    contenedor,
    texto: () => document.body.textContent ?? "",
    desmontar: () => {
      act(() => raiz.unmount())
      contenedor.remove()
    },
  }
  montadas.push(pantalla)
  return pantalla
}

/** Desmonta lo que quedó montado. Va en el `afterEach` de cada archivo. */
export function desmontarTodo(): void {
  for (const p of montadas) p.desmontar()
  montadas = []
  document.body.innerHTML = ""
}

/** El botón (o enlace con rol de botón) cuyo texto o `aria-label` contiene `nombre`. */
export function boton(nombre: string | RegExp, raiz: ParentNode = document.body): HTMLButtonElement {
  const botones = [...raiz.querySelectorAll<HTMLButtonElement>("button")]
  const coincide = (b: HTMLButtonElement) => {
    const textos = [b.textContent ?? "", b.getAttribute("aria-label") ?? ""]
    return textos.some((t) => (typeof nombre === "string" ? t.includes(nombre) : nombre.test(t)))
  }
  const encontrado = botones.find(coincide)
  if (!encontrado) {
    throw new Error(`No hay botón «${String(nombre)}». Hay: ${botones.map((b) => b.textContent?.trim()).join(" | ")}`)
  }
  return encontrado
}

/** Si existe un botón con ese nombre, sin lanzar. */
export function hayBoton(nombre: string | RegExp, raiz: ParentNode = document.body): boolean {
  try {
    boton(nombre, raiz)
    return true
  } catch {
    return false
  }
}

export async function clic(elemento: HTMLElement): Promise<void> {
  await act(async () => {
    elemento.click()
  })
  await esperar()
}

/**
 * El campo que acompaña a un rótulo. Sirve con `htmlFor` y también con el
 * patrón de la app, donde rótulo y campo son hermanos dentro del mismo bloque.
 */
export function campo(rotulo: string, raiz: ParentNode = document.body): HTMLInputElement | HTMLTextAreaElement {
  const etiquetas = [...raiz.querySelectorAll("label")]
  const etiqueta = etiquetas.find((l) => l.textContent?.trim() === rotulo)
  if (!etiqueta) throw new Error(`No hay rótulo «${rotulo}». Hay: ${etiquetas.map((l) => l.textContent?.trim()).join(" | ")}`)
  const porId = etiqueta.htmlFor ? document.getElementById(etiqueta.htmlFor) : null
  const elemento = porId ?? etiqueta.parentElement?.querySelector("input, textarea") ?? null
  if (!(elemento instanceof HTMLInputElement || elemento instanceof HTMLTextAreaElement)) {
    throw new Error(`El rótulo «${rotulo}» no tiene campo`)
  }
  return elemento
}

/** Escribe como el piloto: React solo se entera si el valor pasa por el setter nativo. */
export async function escribir(elemento: HTMLInputElement | HTMLTextAreaElement, valor: string): Promise<void> {
  const prototipo = elemento instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototipo, "value")!.set!.call(elemento, valor)
    elemento.dispatchEvent(new Event("input", { bubbles: true }))
  })
}

/** El `<select>` que acompaña a un rótulo (con `@/test/selectNativo` en lugar del de Radix). */
export function desplegable(rotulo: string, raiz: ParentNode = document.body): HTMLSelectElement {
  const etiqueta = [...raiz.querySelectorAll("label")].find((l) => l.textContent?.trim() === rotulo)
  const elemento = etiqueta?.parentElement?.querySelector("select")
  if (!elemento) throw new Error(`No hay desplegable con el rótulo «${rotulo}»`)
  return elemento
}

/** Elige una opción de un `<select>` como lo haría el piloto. */
export async function elegir(elemento: HTMLSelectElement, valor: string): Promise<void> {
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value")!.set!.call(elemento, valor)
    elemento.dispatchEvent(new Event("change", { bubbles: true }))
  })
}
