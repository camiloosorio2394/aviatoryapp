#!/usr/bin/env node
/** Renderiza las doce figuras didácticas del módulo como WebP reproducibles. */
import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const OUT = path.resolve("public/modulos/aerodinamica/figuras")
fs.mkdirSync(OUT, { recursive: true })

const C = {
  navy: "#0b1d30",
  ink: "#183047",
  blue: "#2f79c8",
  cyan: "#65bde8",
  amber: "#e6a52e",
  coral: "#d7645c",
  green: "#4b9b78",
  paper: "#f6f8fb",
  line: "#c8d5e2",
  muted: "#5d7083",
  white: "#ffffff",
}

const esc = (s) => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;")
const text = (x, y, value, size = 28, weight = 500, fill = C.ink, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(value)}</text>`
const line = (x1, y1, x2, y2, color = C.blue, width = 6, arrow = true, dash = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""} ${arrow ? `marker-end="url(#arrow-${color.slice(1)})"` : ""}/>`
const rect = (x, y, w, h, fill = C.white, stroke = C.line, r = 22, sw = 2) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`
const pill = (x, y, w, label, color = C.blue) =>
  `${rect(x, y, w, 44, color, color, 22, 0)}${text(x + w / 2, y + 30, label, 20, 700, C.white, "middle")}`
const airplane = (x, y, scale = 1, rotate = 0, fill = "#dce7ef") =>
  `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">
    <path d="M-160 0 C-110 -30 90 -30 166 -8 C184 -3 184 3 166 8 C90 30 -110 30 -160 0Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
    <path d="M-48 -8 L28 -116 L70 -112 L28 -4Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
    <path d="M-48 8 L28 116 L70 112 L28 4Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
    <path d="M-126 -4 L-92 -64 L-66 -61 L-79 -2Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
    <path d="M-126 4 L-92 64 L-66 61 L-79 2Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>
  </g>`
const airfoil = (x, y, scale = 1, fill = "#dce7ef") =>
  `<path d="M ${x} ${y} C ${x + 150 * scale} ${y - 110 * scale}, ${x + 430 * scale} ${y - 70 * scale}, ${x + 560 * scale} ${y} C ${x + 390 * scale} ${y + 35 * scale}, ${x + 145 * scale} ${y + 62 * scale}, ${x} ${y}Z" fill="${fill}" stroke="${C.ink}" stroke-width="5"/>`

const markers = [C.blue, C.cyan, C.amber, C.coral, C.green, C.ink]
  .map((color) => `<marker id="arrow-${color.slice(1)}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker>`)
  .join("")

function frame(title, kicker, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <defs>${markers}<filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0b1d30" flood-opacity=".10"/></filter></defs>
    <rect width="1600" height="900" fill="${C.paper}"/>
    <rect x="0" y="0" width="1600" height="10" fill="${C.blue}"/>
    ${text(74, 70, kicker.toUpperCase(), 20, 700, C.blue)}
    ${text(74, 120, title, 38, 700, C.navy)}
    <line x1="74" y1="145" x2="1526" y2="145" stroke="${C.line}" stroke-width="2"/>
    ${body}
  </svg>`
}

const figures = [
  {
    id: "img-01-viento-relativo",
    title: "La trayectoria define el viento relativo",
    kicker: "Fundamentos",
    body: `${rect(70, 185, 710, 630)}${rect(820, 185, 710, 630)}
      ${pill(102, 215, 250, "VUELO NIVELADO")}${pill(852, 215, 330, "NARIZ ARRIBA, DESCENSO")}
      ${airplane(190, 430, .92)}${line(170, 610, 660, 610, C.green, 7)}${text(410, 650, "Trayectoria", 23, 700, C.green, "middle")}
      ${line(660, 520, 200, 520, C.blue, 7)}${text(430, 495, "Viento relativo", 23, 700, C.blue, "middle")}
      ${airplane(900, 430, .92, -10)}${line(930, 665, 1410, 745, C.green, 7)}${text(1210, 790, "Trayectoria descendente", 23, 700, C.green, "middle")}
      ${line(1400, 610, 955, 535, C.blue, 7)}${text(1210, 540, "Viento relativo desde abajo", 23, 700, C.blue, "middle")}
      ${text(1175, 330, "AOA", 26, 700, C.amber)}<path d="M1110 380 A95 95 0 0 1 1200 345" fill="none" stroke="${C.amber}" stroke-width="7"/>
      ${text(800, 858, "La actitud muestra adónde apunta la nariz; el AOA compara la cuerda con el flujo.", 25, 600, C.ink, "middle")}`,
  },
  {
    id: "img-02-cuatro-fuerzas",
    title: "Cuatro fuerzas, dos referencias",
    kicker: "Equilibrio de vuelo",
    body: `${rect(70, 185, 700, 630)}${rect(830, 185, 700, 630)}
      ${pill(100, 215, 240, "VUELO NIVELADO")}${pill(860, 215, 300, "ASCENSO ESTABILIZADO")}
      ${airplane(250, 490, 1.05)}${line(410, 480, 670, 480, C.green, 9)}${text(535, 450, "EMPUJE", 23, 700, C.green, "middle")}
      ${line(245, 480, 95, 480, C.coral, 9)}${text(175, 450, "RESISTENCIA", 23, 700, C.coral, "middle")}
      ${line(390, 455, 390, 280, C.blue, 9)}${text(410, 300, "SUSTENTACIÓN", 23, 700, C.blue)}
      ${line(390, 520, 390, 725, C.amber, 9)}${text(410, 715, "PESO", 23, 700, C.amber)}
      ${airplane(1000, 525, .95, -12)}${line(1160, 485, 1430, 425, C.green, 9)}${text(1300, 390, "T > D", 26, 700, C.green, "middle")}
      ${line(1000, 545, 850, 578, C.coral, 9)}${line(1150, 520, 1110, 720, C.amber, 9)}${text(1128, 750, "W", 25, 700, C.amber)}
      ${line(1125, 485, 1085, 320, C.blue, 9)}${text(1070, 292, "L < W", 25, 700, C.blue, "middle")}
      ${text(1180, 800, "El exceso de empuje compensa la componente del peso sobre la trayectoria.", 21, 600, C.ink, "middle")}`,
  },
  {
    id: "img-03-perfil-aerodinamico",
    title: "Anatomía del perfil y origen de la sustentación",
    kicker: "Sustentación",
    body: `${rect(70, 185, 1460, 630)}${airfoil(300, 500, 1.6)}
      ${line(160, 520, 420, 520, C.blue, 8)}${text(160, 485, "VIENTO RELATIVO", 22, 700, C.blue)}
      ${line(300, 500, 1195, 500, C.muted, 4, false, "14 10")}${text(1190, 535, "CUERDA", 21, 700, C.muted, "end")}
      ${line(420, 420, 360, 310, C.ink, 4)}${text(350, 285, "Borde de ataque", 22, 700, C.ink, "middle")}
      ${line(1190, 500, 1285, 390, C.ink, 4)}${text(1310, 365, "Borde de salida", 22, 700, C.ink, "middle")}
      ${line(755, 360, 755, 270, C.coral, 4)}${text(755, 245, "Extradós: presión menor", 23, 700, C.coral, "middle")}
      ${line(755, 585, 755, 690, C.amber, 4)}${text(755, 735, "Intradós: presión mayor", 23, 700, C.amber, "middle")}
      ${line(1320, 430, 1320, 275, C.green, 8)}${text(1345, 290, "SUSTENTACIÓN", 22, 700, C.green)}
      <path d="M245 455 A120 120 0 0 1 355 490" fill="none" stroke="${C.amber}" stroke-width="7"/>${text(245, 410, "AOA", 24, 700, C.amber)}
      ${text(800, 780, "El ala desvía el flujo hacia abajo; la distribución de presión produce la fuerza resultante.", 25, 600, C.ink, "middle")}`,
  },
  {
    id: "img-04-curva-sustentacion",
    title: "CL aumenta hasta el ángulo de ataque crítico",
    kicker: "Pérdida aerodinámica",
    body: `${rect(70, 185, 1460, 630)}${line(230, 700, 230, 270, C.ink, 5)}${line(230, 700, 1360, 700, C.ink, 5)}
      ${text(190, 285, "CL", 26, 700, C.ink)}${text(1375, 708, "AOA", 26, 700, C.ink)}
      <path d="M240 650 C460 570 650 455 835 340 C900 300 965 320 1045 430 C1090 495 1140 565 1220 620" fill="none" stroke="${C.blue}" stroke-width="9"/>
      <path d="M240 600 C430 530 620 420 780 315 C850 270 910 300 990 420 C1040 500 1090 565 1180 635" fill="none" stroke="${C.amber}" stroke-width="8"/>
      <path d="M240 640 C480 545 700 410 950 270 C1020 232 1090 280 1170 410 C1210 480 1250 550 1320 610" fill="none" stroke="${C.green}" stroke-width="8"/>
      ${line(835, 340, 835, 700, C.blue, 3, false, "12 10")}${line(780, 315, 780, 700, C.amber, 3, false, "12 10")}${line(950, 270, 950, 700, C.green, 3, false, "12 10")}
      ${pill(1070, 245, 210, "SLATS", C.green)}${pill(1070, 305, 210, "ALA LIMPIA", C.blue)}${pill(1070, 365, 210, "FLAPS", C.amber)}
      ${text(800, 770, "Superar el ángulo crítico separa el flujo: cae CL y aumenta la resistencia.", 25, 600, C.ink, "middle")}`,
  },
  {
    id: "img-05-curva-resistencia",
    title: "La resistencia total tiene un mínimo",
    kicker: "Eficiencia aerodinámica",
    body: `${rect(70, 185, 1460, 630)}${line(230, 700, 230, 270, C.ink, 5)}${line(230, 700, 1370, 700, C.ink, 5)}
      ${text(145, 285, "RESISTENCIA", 23, 700, C.ink)}${text(1370, 742, "VELOCIDAD", 23, 700, C.ink, "end")}
      <path d="M260 335 C430 430 610 565 800 650 C1000 690 1190 696 1340 698" fill="none" stroke="${C.blue}" stroke-width="9"/>
      <path d="M260 675 C500 665 740 630 930 545 C1110 460 1230 350 1340 265" fill="none" stroke="${C.coral}" stroke-width="9"/>
      <path d="M260 315 C500 445 700 520 820 535 C1010 545 1180 440 1340 280" fill="none" stroke="${C.green}" stroke-width="10"/>
      <rect x="230" y="270" width="590" height="430" fill="${C.amber}" opacity=".08"/>
      ${line(820, 535, 820, 700, C.green, 3, false, "12 10")}${pill(690, 720, 260, "L/D MÁXIMA", C.green)}
      ${text(390, 760, "RÉGIMEN INVERTIDO", 21, 700, C.amber, "middle")}
      ${pill(1080, 360, 220, "PARÁSITA", C.coral)}${pill(1080, 545, 220, "INDUCIDA", C.blue)}${pill(1080, 465, 220, "TOTAL", C.green)}`,
  },
  {
    id: "img-06-factor-carga",
    title: "Al inclinar la sustentación, aumenta la carga",
    kicker: "Virajes",
    body: `${rect(70, 185, 710, 630)}${rect(820, 185, 710, 630)}
      ${airplane(250, 485, .9, -35)}${line(410, 460, 300, 250, C.blue, 9)}${text(310, 235, "L total", 24, 700, C.blue)}
      ${line(410, 460, 410, 685, C.amber, 9)}${text(435, 680, "W", 24, 700, C.amber)}
      ${line(410, 460, 410, 300, C.green, 6)}${text(430, 325, "L vertical", 21, 700, C.green)}
      ${line(410, 460, 590, 460, C.coral, 6)}${text(585, 430, "Giro", 21, 700, C.coral, "end")}
      ${text(420, 760, "En viraje nivelado: n = 1 / cos φ", 24, 700, C.ink, "middle")}
      ${line(930, 700, 930, 280, C.ink, 5)}${line(930, 700, 1420, 700, C.ink, 5)}
      <path d="M930 660 C1080 650 1190 610 1280 520 C1350 450 1390 360 1420 260" fill="none" stroke="${C.blue}" stroke-width="9"/>
      ${line(1090, 700, 1090, 635, C.muted, 2, false, "8 8")}${line(1215, 700, 1215, 575, C.muted, 2, false, "8 8")}${line(1350, 700, 1350, 445, C.muted, 2, false, "8 8")}
      ${text(1090, 735, "30°", 21, 700, C.ink, "middle")}${text(1215, 735, "45°", 21, 700, C.ink, "middle")}${text(1350, 735, "60°", 21, 700, C.ink, "middle")}
      ${pill(1015, 585, 150, "1,15 G", C.green)}${pill(1140, 515, 150, "1,41 G", C.amber)}${pill(1280, 385, 150, "2,00 G", C.coral)}
      ${text(1180, 245, "FACTOR DE CARGA", 23, 700, C.ink, "middle")}`,
  },
  {
    id: "img-07-superficies-control",
    title: "Qué hace cada superficie principal",
    kicker: "Control e hipersustentadores",
    body: `${rect(70, 185, 1460, 630)}${airplane(790, 500, 1.95, 0, "#e4ebf1")}
      <path d="M760 486 L830 285 L895 295 L830 485Z" fill="${C.amber}" opacity=".85"/><path d="M760 514 L830 715 L895 705 L830 515Z" fill="${C.amber}" opacity=".85"/>
      <path d="M850 330 L900 310 L920 365 L870 385Z" fill="${C.coral}"/><path d="M850 670 L900 690 L920 635 L870 615Z" fill="${C.coral}"/>
      <path d="M725 455 L795 300 L825 310 L775 468Z" fill="${C.green}"/><path d="M725 545 L795 700 L825 690 L775 532Z" fill="${C.green}"/>
      <path d="M790 430 L845 330 L870 340 L825 445Z" fill="${C.navy}"/><path d="M790 570 L845 670 L870 660 L825 555Z" fill="${C.navy}"/>
      <path d="M540 487 L585 405 L630 420 L602 492Z" fill="${C.blue}"/><path d="M540 513 L585 595 L630 580 L602 508Z" fill="${C.blue}"/>
      ${pill(105, 220, 260, "ALERONES", C.coral)}${pill(105, 280, 260, "FLAPS", C.amber)}${pill(105, 340, 260, "SLATS", C.green)}${pill(105, 400, 260, "SPOILERS", C.navy)}${pill(105, 460, 260, "ELEVADOR / TIMÓN", C.blue)}
      ${line(370, 245, 855, 340, C.coral, 4)}${line(370, 305, 815, 365, C.amber, 4)}${line(370, 365, 775, 390, C.green, 4)}${line(370, 425, 825, 390, C.navy, 4)}${line(370, 485, 590, 440, C.blue, 4)}
      ${text(800, 780, "Primarios: alerón, elevador y timón. Alta sustentación: flaps y slats. Spoilers: menos L, más D.", 24, 600, C.ink, "middle")}`,
  },
  {
    id: "img-08-centro-gravedad",
    title: "El CG cambia estabilidad, control y resistencia",
    kicker: "Balance longitudinal",
    body: `${rect(70, 185, 710, 630)}${rect(820, 185, 710, 630)}${pill(100, 215, 280, "CG ADELANTADO")}${pill(850, 215, 260, "CG ATRASADO", C.amber)}
      ${airplane(240, 455, .92)}${line(400, 470, 400, 280, C.blue, 8)}${text(420, 300, "L ala", 22, 700, C.blue)}${line(335, 500, 335, 700, C.amber, 8)}${text(355, 690, "Peso", 22, 700, C.amber)}${line(215, 485, 215, 625, C.coral, 7)}${text(195, 655, "Cola", 22, 700, C.coral, "middle")}
      ${text(420, 760, "Más estable · más fuerza · más resistencia", 22, 700, C.ink, "middle")}
      ${airplane(990, 455, .92)}${line(1150, 470, 1150, 300, C.blue, 8)}${line(1110, 500, 1110, 680, C.amber, 8)}${line(965, 485, 965, 575, C.coral, 7)}
      ${text(1170, 320, "L ala", 22, 700, C.blue)}${text(1130, 670, "Peso", 22, 700, C.amber)}${text(965, 610, "Cola", 22, 700, C.coral, "middle")}
      ${text(1170, 760, "Menos estable · mandos sensibles · peor recuperación", 22, 700, C.ink, "middle")}
      ${line(330, 570, 1110, 570, C.muted, 3, false, "12 10")}`,
  },
  {
    id: "img-09-fenomenos-operacionales",
    title: "Efecto suelo y Dutch Roll no son lo mismo",
    kicker: "Fenómenos operacionales",
    body: `${rect(70, 185, 710, 630)}${rect(820, 185, 710, 630)}${pill(100, 215, 250, "EFECTO SUELO")}${pill(850, 215, 240, "DUTCH ROLL", C.amber)}
      ${airplane(250, 445, .95)}<line x1="110" y1="650" x2="720" y2="650" stroke="${C.ink}" stroke-width="8"/>
      <path d="M230 520 C180 575 190 610 255 635" fill="none" stroke="${C.blue}" stroke-width="7"/><path d="M550 520 C600 575 590 610 525 635" fill="none" stroke="${C.blue}" stroke-width="7"/>
      ${text(420, 710, "Menos downwash y vórtices", 23, 700, C.blue, "middle")}${text(420, 755, "↓ resistencia inducida", 25, 700, C.green, "middle")}
      ${airplane(1000, 455, .95)}<path d="M945 345 C1040 275 1190 300 1280 390 C1365 475 1340 585 1240 635" fill="none" stroke="${C.amber}" stroke-width="8" stroke-dasharray="16 12" marker-end="url(#arrow-e6a52e)"/>
      ${line(1035, 510, 960, 430, C.coral, 6)}${line(1100, 500, 1185, 570, C.coral, 6)}
      ${text(1175, 710, "Alabeo + guiñada acoplados", 23, 700, C.ink, "middle")}${text(1175, 755, "El Yaw Damper los amortigua", 24, 700, C.green, "middle")}`,
  },
  {
    id: "img-10-mach-ala-flecha",
    title: "La flecha retrasa los efectos de compresibilidad",
    kicker: "Alta velocidad",
    body: `${rect(70, 185, 710, 630)}${rect(820, 185, 710, 630)}${pill(100, 215, 310, "PERFIL TRANSÓNICO")}${pill(850, 215, 240, "ALA EN FLECHA", C.amber)}
      ${airfoil(130, 480, .95)}<path d="M455 360 L490 600" stroke="${C.coral}" stroke-width="12" opacity=".85"/><path d="M250 400 C330 330 420 325 490 370" fill="none" stroke="${C.blue}" stroke-width="8"/>
      ${text(360, 315, "Zona supersónica", 22, 700, C.blue, "middle")}${text(525, 390, "Onda de choque", 22, 700, C.coral)}${text(430, 690, "Separación → buffet y wave drag", 22, 700, C.ink, "middle")}
      <path d="M990 680 L1240 300 L1430 340 L1160 710Z" fill="#dce7ef" stroke="${C.ink}" stroke-width="5"/>
      ${line(900, 640, 1320, 420, C.blue, 8)}${text(980, 585, "V", 26, 700, C.blue)}${line(1120, 535, 1280, 640, C.green, 7)}${text(1290, 675, "Componente normal", 21, 700, C.green, "end")}
      ${line(1120, 535, 1240, 350, C.amber, 7)}${text(1260, 330, "Componente spanwise", 21, 700, C.amber, "middle")}
      ${text(1175, 770, "El ala “ve” una velocidad normal menor.", 24, 700, C.ink, "middle")}`,
  },
  {
    id: "img-11-coffin-corner",
    title: "El margen de velocidad se estrecha con la altitud",
    kicker: "Coffin Corner",
    body: `${rect(70, 185, 1460, 630)}${line(240, 710, 240, 270, C.ink, 5)}${line(240, 710, 1380, 710, C.ink, 5)}
      ${text(150, 280, "ALTITUD", 23, 700, C.ink)}${text(1380, 750, "MACH", 23, 700, C.ink, "end")}
      <path d="M380 700 C520 630 690 540 900 380 C1020 300 1110 270 1190 285" fill="none" stroke="${C.blue}" stroke-width="10"/>
      <path d="M1320 700 C1280 590 1250 470 1220 300" fill="none" stroke="${C.coral}" stroke-width="10"/>
      <path d="M500 700 C650 610 820 510 1020 350 C1110 285 1160 270 1200 285" fill="none" stroke="${C.amber}" stroke-width="6" stroke-dasharray="16 12"/>
      <path d="M1185 285 L1225 300 L1210 345 L1170 330Z" fill="${C.navy}" opacity=".14"/>
      ${pill(450, 600, 300, "LOW-SPEED BUFFET", C.blue)}${pill(1040, 590, 290, "MACH / MMO", C.coral)}${pill(760, 445, 250, "LÍMITE 1,3 G", C.amber)}
      ${text(1195, 245, "MARGEN MÍNIMO", 24, 700, C.navy, "middle")}${line(1175, 255, 1190, 290, C.navy, 4)}
      ${text(800, 780, "Más peso, más G o turbulencia acercan el límite de baja velocidad.", 25, 600, C.ink, "middle")}`,
  },
  {
    id: "img-12-densidad-performance",
    title: "La misma IAS exige más TAS y más pista",
    kicker: "High, hot y heavy",
    body: `${rect(70, 185, 1460, 630)}${pill(110, 225, 180, "ALTO")}${pill(320, 225, 200, "CALIENTE", C.coral)}${pill(550, 225, 190, "PESADO", C.amber)}
      ${line(200, 285, 390, 385, C.blue, 6)}${line(420, 285, 390, 385, C.coral, 6)}${line(650, 285, 720, 385, C.amber, 6)}
      ${rect(255, 365, 370, 95, "#e8f2fb", C.blue, 18, 3)}${text(440, 405, "MENOR DENSIDAD", 24, 700, C.blue, "middle")}${text(440, 438, "menos empuje y sustentación", 19, 600, C.muted, "middle")}
      ${rect(665, 365, 330, 95, "#fff5df", C.amber, 18, 3)}${text(830, 405, "MÁS L REQUERIDA", 24, 700, C.amber, "middle")}${text(830, 438, "más velocidad", 19, 600, C.muted, "middle")}
      ${line(625, 415, 665, 415, C.green, 6)}${line(995, 415, 1180, 520, C.green, 6)}
      ${rect(1035, 500, 405, 145, "#e8f5ef", C.green, 20, 3)}${text(1238, 545, "MISMA IAS", 24, 700, C.green, "middle")}${text(1238, 585, "↑ TAS y GS", 30, 700, C.navy, "middle")}${text(1238, 620, "↑ distancia de pista", 23, 700, C.coral, "middle")}
      <line x1="150" y1="665" x2="920" y2="665" stroke="${C.ink}" stroke-width="8"/>${airplane(520, 620, .72)}${line(300, 735, 910, 735, C.green, 7)}${text(605, 775, "La IAS describe la carga aerodinámica; la GS describe el terreno recorrido.", 22, 700, C.ink, "middle")}`,
  },
]

for (const f of figures) {
  const destino = path.join(OUT, `${f.id}.webp`)
  await sharp(Buffer.from(frame(f.title, f.kicker, f.body)))
    .webp({ quality: 92, effort: 6 })
    .toFile(destino)
  console.log(path.relative(process.cwd(), destino))
}
