// @ts-nocheck
/* Chapters 1-11 (CH[n] = {intro, sections, init}).
   Moved verbatim from index.html in F4; reads shared helpers from window.PER (src/core/per.ts).
   F5 splits this into src/chapters/tema-NN/. */
(function(){
"use strict";
const {$,$$,CH,boatTop,n360,r}=PER;

/* ================= TEMA 1 · NOMENCLATURA ================= */
const PARTS=[
 /* id, x, y, name, def */
 ["proa",548,64,"Proa","Parte delantera del barco. Corta el agua; su forma afilada se llama <i>roda</i> en la estructura."],
 ["popa",58,82,"Popa","Parte trasera. En las lanchas suele ser un plano vertical llamado <span class='es'>espejo de popa</span>."],
 ["roda",520,130,"Roda","Pieza que prolonga la quilla hacia proa y forma la proa. Es la «columna» delantera del casco."],
 ["codaste",92,150,"Codaste","Prolongación de la quilla hacia popa. En él se apoya el timón."],
 ["quilla",300,192,"Quilla","Pieza longitudinal que recorre el fondo de proa a popa: es la columna vertebral del casco."],
 ["ov",380,166,"Obra viva (carena)","Parte del casco que queda <b>sumergida</b>, por debajo de la línea de flotación. Se pinta con antiincrustante (patente)."],
 ["om",380,112,"Obra muerta","Parte del casco <b>fuera del agua</b>, de la flotación hacia arriba."],
 ["flot",470,150,"Línea de flotación","Línea que separa obra viva y obra muerta: donde el agua corta el casco."],
 ["timon",110,206,"Timón","Pala que, al girar, desvía el agua y hace caer la popa. Partes: <b>pala</b>, <b>mecha</b> (eje) y <b>caña</b> o rueda para gobernarlo. La mecha atraviesa el casco por la <b>limera</b>."],
 ["helice",150,198,"Hélice","Propulsor. Sale del casco por la <b>bocina</b> (tubo del eje), un punto clásico de vía de agua."],
 ["banera",160,84,"Bañera","Zona abierta y rebajada a popa desde la que se gobierna. Desagua por los imbornales."],
 ["cubierta",300,72,"Cubierta","Superficie que cierra el casco por arriba. Su borde con el costado es la <b>regala</b> / <b>borda</b>."],
 ["camarote",340,48,"Superestructura / cabina","Construcción sobre la cubierta. Las aberturas de luz son <b>lumbreras</b> y las ventanas redondas del costado, <b>portillos</b>."],
 ["candelero",470,58,"Candeleros y guardamancebos","Postes metálicos (candeleros) que sostienen el cable o cabo de seguridad (guardamancebos) alrededor de la cubierta. El pasamanos de proa es el <b>púlpito</b>."]
];
function profileSVG(){
  const hull="M70 95 L540 78 C 528 120, 505 160, 462 180 L 122 184 L 82 158 Z";
  let s=`<svg viewBox="0 0 600 240" role="img" aria-label="Perfil de una lancha con sus partes">
  <defs><clipPath id="below"><rect x="0" y="150" width="600" height="100"/></clipPath><clipPath id="hullc"><path d="${hull}"/></clipPath></defs>
  <rect x="0" y="150" width="600" height="90" fill="var(--water)"/>
  <path d="${hull}" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
  <g clip-path="url(#hullc)"><rect x="0" y="150" width="600" height="100" fill="var(--red)" opacity=".55"/></g>
  <path d="${hull}" fill="none" stroke="var(--ink)" stroke-width="2"/>
  <path d="M255 80 L275 42 L410 38 L430 76" fill="var(--shoal)" stroke="var(--ink)" stroke-width="1.6"/>
  <path d="M282 50 L300 50 L300 66 L282 66 Z M320 48 L360 47 L360 64 L320 65 Z" fill="var(--sea)" opacity=".6"/>
  <circle cx="390" cy="56" r="6" fill="var(--sea)" opacity=".6"/>
  <path d="M95 94 L95 104 L235 100 L235 90" fill="none" stroke="var(--muted)" stroke-width="1.4" stroke-dasharray="4 3"/>
  <path d="M440 76 L440 60 L540 54 L548 72" fill="none" stroke="var(--muted)" stroke-width="1.6"/>
  <line x1="460" y1="76" x2="460" y2="59" stroke="var(--muted)" stroke-width="1.6"/><line x1="500" y1="75" x2="500" y2="57" stroke="var(--muted)" stroke-width="1.6"/>
  <path d="M104 184 L104 214 L124 214 L124 184" fill="var(--muted)" stroke="var(--ink)" stroke-width="1"/>
  <line x1="200" y1="183" x2="150" y2="198" stroke="var(--ink)" stroke-width="3"/>
  <ellipse cx="148" cy="190" rx="4" ry="11" fill="var(--ink)"/><ellipse cx="148" cy="206" rx="4" ry="9" fill="var(--ink)"/>
  <line x1="0" y1="150" x2="600" y2="150" stroke="var(--sea)" stroke-width="1.4" stroke-dasharray="6 4"/>
  <line x1="122" y1="184" x2="462" y2="180" stroke="var(--ink)" stroke-width="4"/>`;
  PARTS.forEach((p,i)=>{s+=`<g class="hot pin" data-id="${p[0]}" tabindex="0" role="button" aria-label="${p[3]}"><circle class="hl" cx="${p[1]}" cy="${p[2]}" r="11" fill="var(--accent)" stroke="var(--paper)" stroke-width="2"/><text x="${p[1]}" y="${p[2]+4}" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">${i+1}</text></g>`});
  return s+`<text x="12" y="168" font-size="11" fill="var(--sea)">flotación</text></svg>`;
}
function topSVG(){
  const cx=180,cy=180;let s=`<svg viewBox="0 0 360 360" role="img" aria-label="Direcciones respecto al barco">
  <circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="var(--line)" stroke-dasharray="3 4"/>`;
  const L=[[0,"PROA"],[45,"Amura Er"],[90,"Través Er"],[135,"Aleta Er"],[180,"POPA"],[225,"Aleta Br"],[270,"Través Br"],[315,"Amura Br"]];
  L.forEach(([a,t])=>{const x=cx+150*Math.sin(a*Math.PI/180),y=cy-150*Math.cos(a*Math.PI/180);const tx=cx+128*Math.sin(a*Math.PI/180),ty=cy-128*Math.cos(a*Math.PI/180);
    s+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--line)"/><text x="${tx}" y="${ty+4}" text-anchor="middle" font-size="12" font-weight="600" fill="${a>0&&a<180?"var(--green)":a>180?"var(--red)":"var(--ink)"}">${t}</text>`});
  s+=boatTop(cx,cy,130,0,"var(--paper)",`<path d="M0 -65 C 42 -29, 47 6, 37 65" fill="none" stroke="var(--green)" stroke-width="5"/><path d="M0 -65 C -42 -29, -47 6, -37 65" fill="none" stroke="var(--red)" stroke-width="5"/><line x1="0" y1="-62" x2="0" y2="64" stroke="var(--muted)" stroke-dasharray="4 3"/><text x="10" y="-6" font-size="10" fill="var(--muted)" transform="rotate(90 10 -6)">crujía</text><text x="-26" y="30" font-size="12" fill="var(--red)" font-weight="700">BR</text><text x="12" y="30" font-size="12" fill="var(--green)" font-weight="700">ER</text>`);
  s+=`<g id="mArrow"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-100}" stroke="var(--accent)" stroke-width="3"/><circle cx="${cx}" cy="${cy-104}" r="6" fill="var(--accent)"/></g></svg>`;
  return s;
}
function marcName(a){a=n360(a);const side=a===0||a===180?"":a<180?"estribor":"babor";const m=a<=180?a:360-a;
  let n;if(m<=5)n="Por la proa";else if(m<35)n="Entre proa y amura de "+side;else if(m<=55)n="Por la amura de "+side;else if(m<85)n="Entre amura y través de "+side;else if(m<=95)n="Por el través de "+side;else if(m<125)n="Entre través y aleta de "+side;else if(m<=145)n="Por la aleta de "+side;else if(m<175)n="Entre aleta y popa por "+side;else n="Por la popa";
  return {n,m,side}}

CH[1]={
intro:"Es vocabulario: cuatro preguntas casi regaladas si dominas las palabras. Y es el idioma en que te hablará el instructor en las prácticas («larga el esprín de popa», «defensa a la aleta de babor»).",
sections:[
["partes","Partes del barco",`
<p>Toca cada número para ver qué es. Después usa el modo «Encuentra la parte» hasta que las aciertes todas.</p>
<div class="widget"><div class="eyebrow">Interactivo · perfil de una lancha</div>
<figure>${profileSVG()}</figure>
<div class="row" style="margin:6px 0"><button class="btn sm" id="nomGame">Encuentra la parte</button><span class="fb" id="nomScore"></span></div>
<div class="info" id="nomInfo">Toca un número.</div></div>
<div class="key"><b>Lo esencial.</b> Obra viva = sumergida (carena). Obra muerta = fuera del agua. Las separa la línea de flotación. Roda a proa, codaste a popa, quilla abajo de una a otra.</div>`],
["direcciones","Babor, estribor y direcciones a bordo",`
<p>Mirando hacia proa, <b>babor</b> es la izquierda y <b>estribor</b> la derecha. Truco para las luces: las palabras cortas van juntas (<i>babor–rojo</i>) y las largas también (<i>estribor–verde</i>). La <span class="es">línea (y plano) de crujía</span> divide el barco de proa a popa en dos mitades simétricas: las <b>bandas</b> de babor y estribor. Ojo: si miras el barco <i>desde proa</i>, su babor queda a tu derecha.</p>
<div class="widget"><div class="eyebrow">Interactivo · mueve la visual</div>
<div class="grid2" style="align-items:center"><figure style="margin:0">${topSVG()}</figure>
<div><label class="small muted" for="mSl">Ángulo desde la proa (marcación)</label><input type="range" id="mSl" min="0" max="359" value="45">
<p style="font-size:22px;font-family:var(--display);font-weight:700;margin:8px 0 2px" id="mName"></p><p class="muted small" id="mDeg"></p>
<p class="small">Las marcaciones se miden desde la proa, de 0° a 180°, hacia estribor (+) o hacia babor (−). Una <b>cuarta</b> son 11,25° (la rosa tiene 32 cuartas): «dos cuartas por la amura» son 22,5°.</p></div></div></div>
<div class="tablewrap"><table>
<tr><th>Término</th><th>Dónde</th></tr>
<tr><td class="es">Costados</td><td>Cada una de las dos caras laterales exteriores del casco, de proa a popa. Cada costado tiene amura, través y aleta.</td></tr>
<tr><td class="es">Amura</td><td>Tramo del costado entre el través y la proa (como dirección, ≈45° de la proa)</td></tr>
<tr><td class="es">Través</td><td>Parte central del costado en sentido longitudinal. Como dirección, perpendicular a la crujía (90°): «tener un barco por el través».</td></tr>
<tr><td class="es">Aleta</td><td>Tramo del costado entre el través y la popa, donde los costados se juntan (como dirección, ≈135°)</td></tr>
<tr><td class="es">Barlovento / sotavento</td><td>Lado por donde viene el viento / lado contrario, hacia donde va</td></tr>
<tr><td class="es">Socaire</td><td>Zona resguardada a la que no llega el viento (detrás de un cabo, de un muro…). No es lo mismo que sotavento.</td></tr>
<tr><td class="es">Escorar · adrizar</td><td>Escorar: inclinarse hacia una banda (pesos mal repartidos, viento u ola). Adrizar: volver a la posición derecha.</td></tr>
<tr><td class="es">Balanceo</td><td>Movimiento de vaivén de una banda a otra (babor ↔ estribor)</td></tr>
<tr><td class="es">A proa / a popa de</td><td>Por delante / por detrás de algo (o del través)</td></tr>
</table></div>`],
["estructura","Estructura del casco",`
<figure><svg viewBox="0 0 600 230" role="img" aria-label="Sección transversal del casco con cuadernas, baos y quilla">
<rect x="0" y="0" width="600" height="230" fill="none"/>
<g transform="translate(150 20)">
 <path d="M10 30 Q 10 150 150 185 Q 290 150 290 30" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/>
 <line x1="10" y1="30" x2="290" y2="30" stroke="var(--ink)" stroke-width="5"/>
 <path d="M30 34 Q 30 140 150 168 Q 270 140 270 34" fill="none" stroke="var(--sea)" stroke-width="5" opacity=".7"/>
 <rect x="138" y="168" width="24" height="22" fill="var(--ink)"/>
 <path d="M60 150 Q 150 172 240 150" fill="var(--sea)" opacity=".25"/>
 <line x1="150" y1="34" x2="150" y2="168" stroke="var(--muted)" stroke-dasharray="4 3"/>
</g>
<g font-size="12" fill="var(--ink)">
 <text x="20" y="40">Bao (transversal, sostiene la cubierta)</text><line x1="175" y1="50" x2="230" y2="50" stroke="var(--muted)"/>
 <text x="455" y="110">Cuaderna (costilla)</text><line x1="452" y1="106" x2="420" y2="106" stroke="var(--muted)"/>
 <text x="330" y="222">Quilla</text><line x1="326" y1="218" x2="312" y2="205" stroke="var(--muted)"/>
 <text x="40" y="178">Sentina (agua acumulada)</text><line x1="190" y1="174" x2="235" y2="174" stroke="var(--muted)"/>
 <text x="455" y="60">Forro / casco</text><line x1="452" y1="56" x2="440" y2="56" stroke="var(--muted)"/>
 <text x="306" y="125" fill="var(--muted)">crujía</text>
</g></svg><figcaption>Sección transversal: el «esqueleto» del barco.</figcaption></figure>
<p><span class="es">Casco</span>: el cuerpo del barco, sin contar arboladura (palos y jarcia), máquinas ni superestructuras. Puede ser <b>monocasco</b> o <b>multicasco</b>: catamarán (dos cascos) o trimarán (uno central y dos laterales que le dan estabilidad).</p>
<div class="tablewrap"><table>
<tr><th>Pieza</th><th>Qué es</th></tr>
<tr><td class="es">Quilla</td><td>Pieza longitudinal del fondo, de proa a popa</td></tr>
<tr><td class="es">Roda · codaste</td><td>Pieza robusta, recta o curva, que sube desde la quilla y cierra el casco a proa · pieza que cierra la popa; en barcos pequeños y veleros clásicos sujeta el timón</td></tr>
<tr><td class="es">Cuadernas</td><td>Piezas transversales y simétricas que salen de la quilla hacia cada banda y suben por los costados (costillas)</td></tr>
<tr><td class="es">Baos</td><td>Vigas transversales de banda a banda que sostienen la cubierta</td></tr>
<tr><td class="es">Mamparos</td><td>Separaciones verticales (transversales o longitudinales) del interior: las «paredes». Los <b>estancos</b> dan seguridad; el de proa es el <b>de colisión</b>.</td></tr>
<tr><td class="es">Sentina</td><td>Parte más baja del interior, donde se acumula el agua. Hay que achicarla (bombas de achique).</td></tr>
<tr><td class="es">Plan</td><td>Superficie horizontal interior más baja del casco: el «suelo» del barco</td></tr>
<tr><td class="es">Bombas de achique</td><td>Sacan el agua de la sentina. Además de las eléctricas conviene llevar una <b>manual</b> (aspira en la sentina, se acciona desde la bañera y descarga por el costado sobre la flotación).</td></tr>
<tr><td class="es">Grifos de fondo</td><td>Válvulas de mar bajo la flotación que dan o cortan el agua de refrigeración del motor, aseos, cocina… Abrir solo cuando haga falta y mantener limpios. Van roscados a los <b>pasacascos</b>, piezas que atraviesan el casco.</td></tr>
<tr><td class="es">Pantoque</td><td>Zona curva de unión entre el fondo y el costado</td></tr>
</table></div>
<div class="key"><b>Para el examen.</b> La estructura la forman <b>quilla + roda + codaste + cuadernas + baos</b>. Los grifos de fondo y la bocina son puntos por donde puede entrar agua: revísalos.</div>`],
["dimensiones","Dimensiones",`
<figure><svg viewBox="0 0 780 220" role="img" aria-label="Eslora, manga, puntal, calado y francobordo">
<g transform="translate(0 0)">
 <rect x="0" y="120" width="330" height="100" fill="var(--water)"/>
 <path d="M30 70 L300 62 C 292 90, 278 112, 255 125 L 60 128 L 36 112 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
 <line x1="0" y1="105" x2="330" y2="105" stroke="var(--sea)" stroke-dasharray="5 4"/>
 <line x1="30" y1="40" x2="300" y2="40" stroke="var(--accent)" stroke-width="2" marker-start="url(#ar)" marker-end="url(#ar)"/>
 <text x="165" y="34" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">ESLORA</text>
 <defs><marker id="ar" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>
 <text x="12" y="100" font-size="11" fill="var(--sea)">flotación</text>
</g>
<g transform="translate(420 20)">
 <rect x="0" y="85" width="220" height="110" fill="var(--water)"/>
 <path d="M20 30 Q 20 130 110 160 Q 200 130 200 30 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
 <line x1="-20" y1="85" x2="240" y2="85" stroke="var(--sea)" stroke-dasharray="5 4"/>
 <line x1="20" y1="14" x2="200" y2="14" stroke="var(--accent)" stroke-width="2" marker-start="url(#ar)" marker-end="url(#ar)"/><text x="110" y="9" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent)">MANGA</text>
 <line x1="-6" y1="30" x2="-6" y2="160" stroke="var(--ink)" stroke-width="1.6" marker-start="url(#ar)" marker-end="url(#ar)"/><text x="-12" y="100" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">PUNTAL</text>
 <line x1="226" y1="85" x2="226" y2="160" stroke="var(--sea)" stroke-width="2" marker-start="url(#ar)" marker-end="url(#ar)"/><text x="234" y="128" font-size="12" font-weight="700" fill="var(--sea)">CALADO</text>
 <line x1="210" y1="30" x2="210" y2="85" stroke="var(--green)" stroke-width="2" marker-start="url(#ar)" marker-end="url(#ar)"/><text x="234" y="62" font-size="11" font-weight="700" fill="var(--green)">FRANCOBORDO</text>
 <line x1="20" y1="160" x2="200" y2="160" stroke="var(--line)"/>
</g></svg></figure>
<ul>
<li><span class="es">Eslora máxima</span>: distancia entre la parte más saliente de proa y la de popa, medida paralela a la flotación de diseño. Incluye las partes estructurales y la unión casco-cubierta; <b>excluye el púlpito</b> (se mide desde donde la cubierta corta la roda) y las piezas desmontables sin romper nada. Es la que figura en la documentación oficial. Para amarrar en puerto, en cambio, cuenta la <b>mayor longitud ocupacional</b> (con todo lo que sobresalga). La eslora de flotación es la medida en el agua.</li>
<li><span class="es">Manga máxima</span>: anchura máxima con las estructuras fijas, medida por fuera de los forros (el revestimiento del casco).</li>
<li><span class="es">Puntal</span>: altura máxima medida a media eslora, desde la línea de cubierta hasta el canto superior de la quilla.</li>
<li><span class="es">Calado</span>: distancia vertical del canto inferior de la quilla a la flotación (altura de la obra viva). Lo que necesitas saber para no varar. Hay calado <b>a proa</b>, <b>a popa</b> y <b>en el medio</b>; no confundir con el <b>calado medio</b> = (Cpr + Cpp) / 2.</li>
<li><span class="es">Francobordo</span>: altura del costado desde la flotación, con máxima carga, hasta la cubierta estanca más alta, es decir, la altura de la obra muerta. Más francobordo, más reserva de flotabilidad.</li>
<li><span class="es">Desplazamiento máximo</span>: peso del barco con la máxima carga segura de tripulantes, equipaje y carga. Se da en toneladas métricas.</li>
<li><span class="es">Desplazamiento</span>: peso del agua que desaloja el barco = peso del barco (Arquímedes). <span class="es">Arqueo</span>: volumen interior (GT), no es un peso.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · asiento</div>
<div class="grid2"><div>
<label class="small">Calado a proa: <b id="cprV"></b></label><input type="range" id="cpr" min="60" max="160" value="110">
<label class="small">Calado a popa: <b id="cppV"></b></label><input type="range" id="cpp" min="60" max="160" value="130">
<p id="asTxt" style="font-weight:600"></p>
<p class="small muted">Ejemplo: Cpr 1,5 m y Cpp 1,9 m → calado medio (1,5 + 1,9)/2 = 1,7 m; asiento 1,9 − 1,5 = +0,4 m (apopado). Asiento = calado de popa − calado de proa. Positivo: <b>apopado</b> (normal en lanchas). Negativo: <b>aproado</b>. Cero: en <b>aguas iguales</b>. Conviene adaptar el asiento al estado de la mar. La inclinación lateral es otra cosa: <b>escora</b>.</p>
</div><svg viewBox="0 0 300 150" id="asSvg" role="img" aria-label="Barco con asiento"></svg></div></div>`],
["cubierta","Cubierta, aberturas y accesorios",`
<div class="tablewrap"><table>
<tr><th>Término</th><th>Qué es</th></tr>
<tr><td class="es">Cubierta</td><td>Pieza horizontal que cierra el casco por arriba; se fabrica aparte y se une al casco</td></tr>
<tr><td class="es">Escotilla</td><td>Abertura en cubierta, normalmente rectangular, que comunica los distintos departamentos del barco</td></tr>
<tr><td class="es">Escotilla principal</td><td>La de acceso de la tripulación al interior, con escalera. Suele estar junto a la bañera.</td></tr>
<tr><td class="es">Lumbrera</td><td>Abertura en cubierta, cerrada con cristal, solo para dar luz y ventilación a las cámaras</td></tr>
<tr><td class="es">Portillos y tragaluces</td><td>Aberturas, normalmente redondas, en los costados para dar luz y ventilación</td></tr>
<tr><td class="es">Manguerotes</td><td>Tubos verticales de fibra o acero para ventilar. Si puede entrar agua de lluvia o de mar, se orienta la boca <b>a sotavento</b>.</td></tr>
<tr><td class="es">Bañera</td><td>Zona abierta desde donde se gobierna (caña o rueda) y se maneja la maniobra. Debe ser <b>autoachicable</b>.</td></tr>
<tr><td class="es">Imbornales</td><td>Orificios de desagüe de la bañera, y a la altura del trancanil para la cubierta. Siempre limpios. Se tapan al repostar para que no salga combustible al mar.</td></tr>
<tr><td class="es">Borda / regala</td><td>Canto superior del costado (la regala es la parte de arriba de la borda). Se usan como sinónimos.</td></tr>
<tr><td class="es">Pasamanos</td><td>Asideros de madera o inox sobre cubierta para sujetarse al moverse por ella</td></tr>
<tr><td class="es">Candeleros · guardamancebos</td><td>Postes · cable o cabo de seguridad que sostienen</td></tr>
<tr><td class="es">Púlpito · balcón de popa</td><td>Pasamanos metálico a proa · a popa</td></tr>
<tr><td class="es">Bitas · cornamusas</td><td>Piezas fuertes para amarrar cabos (tema 2)</td></tr>
<tr><td class="es">Gateras / guías</td><td>Piezas por donde pasan los cabos para que no rocen. En el fondeo, la <b>gatera</b> es el orificio de cubierta por el que la cadena baja a la caja de cadenas.</td></tr>
<tr><td class="es">Escobén</td><td>Conducto por donde sale la cadena del ancla</td></tr>
<tr><td class="es">Tambucho</td><td>Cierre corredizo de la entrada a la cabina</td></tr>
<tr><td class="es">Pañol</td><td>Compartimento para guardar material</td></tr>
</table></div>
<div class="key"><b>Recuerda.</b> Portillos, escotillas y lumbreras deben cerrar <b>herméticamente</b> para que no entre agua de lluvia ni de los golpes de mar.</div>`],
["timon","Timón y hélice",`
<figure><svg viewBox="0 0 600 200" role="img" aria-label="Timón y hélice">
<g transform="translate(40 10)">
 <path d="M0 40 L180 40" stroke="var(--ink)" stroke-width="3"/><text x="0" y="30" font-size="12">casco</text>
 <line x1="100" y1="10" x2="100" y2="80" stroke="var(--accent)" stroke-width="5"/><line x1="100" y1="12" x2="160" y2="12" stroke="var(--ink)" stroke-width="5"/><text x="166" y="16" font-size="12" fill="var(--ink)">caña (o rueda)</text>
 <text x="108" y="64" font-size="12" fill="var(--accent)">mecha (eje) · pasa por la limera</text>
 <path d="M86 80 L140 80 L140 170 L94 170 Q 86 130 86 80Z" fill="var(--muted)" stroke="var(--ink)"/><text x="148" y="130" font-size="12">pala</text>
</g>
<g transform="translate(330 10)">
 <line x1="0" y1="100" x2="140" y2="100" stroke="var(--ink)" stroke-width="5"/><text x="0" y="88" font-size="12">eje</text>
 <rect x="10" y="92" width="34" height="16" fill="none" stroke="var(--accent)" stroke-width="2"/><text x="6" y="128" font-size="12" fill="var(--accent)">bocina</text>
 <circle cx="150" cy="100" r="7" fill="var(--ink)"/>
 <ellipse cx="150" cy="64" rx="11" ry="34" fill="var(--sea)" opacity=".75"/><ellipse cx="150" cy="136" rx="11" ry="34" fill="var(--sea)" opacity=".75"/>
 <path d="M200 40 A 50 50 0 0 1 200 160" fill="none" stroke="var(--green)" stroke-width="2.5" marker-end="url(#ar2)"/>
 <defs><marker id="ar2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--green)"/></marker></defs>
 <text x="-10" y="190" font-size="12" fill="var(--green)">dextrógira: horaria vista desde popa, en avante</text>
 <text x="175" y="70" font-size="12">palas</text><text x="175" y="104" font-size="12">núcleo</text>
</g></svg></figure>
<ul>
<li><b>Caña</b>: se mueve <i>al contrario</i> de donde quieres ir. Caña a babor → la proa cae a estribor. <b>Rueda</b>: se gira hacia donde quieres ir, como un coche.</li>
<li><b>Hélice dextrógira</b>: en marcha avante gira en sentido horario mirándola desde popa. <b>Levógira</b>: al revés. Su efecto lateral (la popa «camina») se estudia en el tema 7.</li>
<li><b>Paso</b> de la hélice: lo que avanzaría en una vuelta completa sin resbalar. El <b>retroceso</b> o resbalamiento es la diferencia con lo que avanza de verdad.</li>
<li><b>Pala</b> del timón: si gira sobre su borde de proa es <b>timón ordinario</b> (más sensible, pero más duro); si gira sobre un eje más o menos centrado es <b>timón compensado</b> (más suave y algo menos sensible). Con fueraborda o dentro-fueraborda no hay pala: gobierna la cola del motor.</li>
<li>La <b>mecha</b> une la pala con la caña o rueda y pasa por la <b>limera</b>. Con rueda, los cables y poleas que llevan el movimiento a la pala son los <b>guardines</b>.</li>
<li>Partes de la hélice: <b>núcleo</b> (se rosca al eje), <b>palas</b> y <b>capacete</b> (pieza cónica que cubre el núcleo, con pasador de seguridad para que la hélice no se suelte). <b>Diámetro</b>: el del círculo que describen las palas.</li>
<li><b>Hélices gemelas de giro al exterior</b>: con dos motores, la dextrógira va a <b>estribor</b> y la levógira a <b>babor</b>; sus efectos laterales se anulan.</li>
<li><b>Hélice de paso variable (reversible)</b>: orienta las palas para ir avante, atrás o quedarse sin empuje, siempre girando en el mismo sentido; el motor no lleva inversora. <b>Hélice abatible o plegable</b> («pico de pato»): en veleros, se pliega al navegar a vela y se abre por fuerza centrífuga.</li>
<li><b>Hélice de proa</b>: empuja la proa a una banda en el atraque. Habitual por encima de 15 m de eslora y cada vez más en barcos de más de 9 m.</li>
<li>Según su uso: hélice <b>de velocidad</b> (mucho paso y poco diámetro, típica de fuerabordas) o <b>de arrastre</b> (poco paso y mucho diámetro, barcos de gran desplazamiento).</li>
<li>La <b>bocina</b> recubre el orificio por donde sale el eje: hay que revisarla periódicamente, porque un golpe en la hélice o una red enganchada pueden abrir una vía de agua rápida.</li>
<li>Motores: <b>intraborda</b> (dentro del casco, con eje y bocina), <b>fueraborda</b> (colgado del espejo, gira entero para gobernar) y <b>dentro-fueraborda</b> o <i>sterndrive</i> (motor dentro, cola fuera que orienta el empuje). Los waterjet no llevan hélice exterior.</li>
</ul>
<div class="sea"><b>A bordo.</b> En una lancha con fueraborda o cola, no hay timón separado: giras la propia hélice. Sin motor en marcha casi no gobiernas, así que no lo pongas en punto muerto en mitad de una maniobra.</div>`],
["cascos","Tipos de casco y de embarcación",`
<div class="grid2">
<div class="panel"><h4>Casco de desplazamiento</h4><p>Siempre «dentro» del agua, la empuja hacia los lados. Velocidad limitada por su eslora. Veleros y barcos de pesca. Más cómodo con mar.</p></div>
<div class="panel"><h4>Casco de planeo</h4><p>A partir de cierta velocidad sube y «patina» sobre el agua. Lanchas rápidas. Fondo en V o plano, con <i>redanes</i>. Golpea con ola.</p></div>
<div class="panel"><h4>Semirrígida (neumática)</h4><p>Casco rígido y flotadores inflables. Muy estable y muy segura por su reserva de flotabilidad.</p></div>
<div class="panel"><h4>Multicasco</h4><p>Catamarán (dos cascos) o trimarán (uno central y dos laterales que aseguran la estabilidad). Estabilidad de forma, poca escora.</p></div>
</div>`]
],
init(root){
  const info=$("#nomInfo",root);let game=null,score=0,tries=0;
  const set=id=>{$$(".pin",root).forEach(p=>p.classList.toggle("on",p.dataset.id===id))};
  const ask=()=>{const p=PARTS[r(0,PARTS.length-1)];game=p[0];info.innerHTML=`¿Dónde está: <b>${p[3]}</b>? Toca el número.`};
  $$(".pin",root).forEach(p=>{const act=()=>{const d=PARTS.find(x=>x[0]===p.dataset.id);
    if(game){tries++;const ok=d[0]===game;if(ok)score++;$("#nomScore",root).textContent=`${score}/${tries}`;$("#nomScore",root).className="fb "+(ok?"pass":"fail");info.innerHTML=(ok?"✓ Correcto. ":"✗ Eso es <b>"+d[3]+"</b>. ")+d[4];set(d[0]);setTimeout(ask,ok?1100:2600);return}
    set(d[0]);info.innerHTML=`<b>${d[3]}.</b> ${d[4]}`};
    p.addEventListener("click",act);p.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();act()}})});
  $("#nomGame",root).addEventListener("click",e=>{if(game){game=null;e.target.textContent="Encuentra la parte";info.textContent="Toca un número.";return}score=0;tries=0;e.target.textContent="Salir del juego";ask()});
  const sl=$("#mSl",root),ar=$("#mArrow",root);
  const upd=()=>{const a=+sl.value;ar.setAttribute("transform",`rotate(${a} 180 180)`);const m=marcName(a);$("#mName",root).textContent=m.n;$("#mDeg",root).textContent=m.side?`Marcación ${m.m}° ${m.side==="estribor"?"Er (+)":"Br (−)"} · ${(m.m/11.25).toFixed(1)} cuartas`:`Marcación ${m.m}°`};
  sl.addEventListener("input",upd);upd();
  const cpr=$("#cpr",root),cpp=$("#cpp",root),sv=$("#asSvg",root);
  const upa=()=>{const a=+cpr.value/100,b=+cpp.value/100;$("#cprV",root).textContent=a.toFixed(2)+" m";$("#cppV",root).textContent=b.toFixed(2)+" m";const as=b-a;
    $("#asTxt",root).innerHTML=`Calado medio = (${a.toFixed(2)} + ${b.toFixed(2)}) / 2 = <b>${((a+b)/2).toFixed(2)} m</b><br>Asiento = ${b.toFixed(2)} − ${a.toFixed(2)} = <b>${as>=0?"+":""}${as.toFixed(2)} m</b> → ${Math.abs(as)<0.005?"en aguas iguales":as>0?"apopado":"aproado"}`;
    const ang=Math.atan2((b-a)*40,220)*180/Math.PI;
    sv.innerHTML=`<rect x="0" y="80" width="300" height="70" fill="var(--water)"/><line x1="0" y1="80" x2="300" y2="80" stroke="var(--sea)" stroke-dasharray="5 4"/><g transform="translate(150 ${80+((a+b)/2-1.1)*40}) rotate(${-ang})"><path d="M-120 -30 L120 -36 C 112 -10, 100 5, 85 12 L -100 14 L -116 0 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/></g><text x="10" y="20" font-size="12" fill="var(--muted)">popa</text><text x="290" y="20" font-size="12" fill="var(--muted)" text-anchor="end">proa</text>`};
  cpr.addEventListener("input",upa);cpp.addEventListener("input",upa);upa();
}};

/* ================= TEMA 2 · AMARRE Y FONDEO ================= */
const LINES=[
 /* id, name, from(x,y boat), to(x,y dock), prevents, works when */
 ["lpr","Largo de proa",[392,96],[470,40],"Que el barco vaya <b>hacia atrás</b> y que la proa se abra del muelle.","viento o corriente de proa"],
 ["epr","Esprín de proa",[372,92],[250,40],"Que el barco <b>avance</b>. Va desde la proa hacia popa por el muelle.","viento o corriente de popa"],
 ["tpr","Través de proa",[350,90],[350,40],"Que la proa <b>se separe</b> del muelle.","viento que sopla desde el muelle"],
 ["tpp","Través de popa",[190,90],[190,40],"Que la popa <b>se separe</b> del muelle.","viento que sopla desde el muelle"],
 ["epp","Esprín de popa",[170,92],[290,40],"Que el barco <b>retroceda</b>. Va desde la popa hacia proa por el muelle.","viento o corriente de proa"],
 ["lpp","Largo de popa",[148,96],[70,40],"Que el barco vaya <b>hacia delante</b> y que la popa se abra.","viento o corriente de popa"]
];
function dockSVG(){
  let s=`<svg viewBox="0 0 540 190" role="img" aria-label="Barco atracado de costado con sus amarras">
  <rect x="0" y="0" width="540" height="40" fill="var(--land)" stroke="var(--ink)"/><text x="530" y="25" font-size="12" fill="var(--ink)" text-anchor="end">MUELLE</text>
  <rect x="0" y="40" width="540" height="150" fill="var(--water)"/>
  <g transform="translate(270 120) rotate(90)">${'' }</g>`;
  s+=`<path d="M140 120 L140 70 L380 70 C 430 72, 440 95, 445 120 C 440 145, 430 168, 380 170 L140 170 Z" transform="translate(0 -18)" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>`;
  s+=`<text x="300" y="130" font-size="12" fill="var(--muted)" text-anchor="middle">proa →</text>`;
  const LB={lpr:"Largo Pr",epr:"Esprín Pr",tpr:"Través Pr",tpp:"Través Pp",epp:"Esprín Pp",lpp:"Largo Pp"};LINES.forEach((l,i)=>s+=`<text x="${l[3][0]}" y="${i%2?32:20}" font-size="9" text-anchor="middle" fill="var(--ink)">${LB[l[0]]}</text>`);
  LINES.forEach(l=>{s+=`<g class="hot amarra" data-id="${l[0]}" tabindex="0" role="button" aria-label="${l[1]}"><line x1="${l[2][0]}" y1="${l[2][1]-18+0}" x2="${l[3][0]}" y2="${l[3][1]}" stroke="transparent" stroke-width="16"/><line class="hl" x1="${l[2][0]}" y1="${l[2][1]-18}" x2="${l[3][0]}" y2="${l[3][1]}" stroke="var(--ink)" stroke-width="2.4"/><circle cx="${l[3][0]}" cy="${l[3][1]-4}" r="5" fill="var(--ink)"/></g>`});
  return s+`<g id="windArrow"></g></svg>`;
}
function anchorsSVG(){
  return `<svg viewBox="0 0 640 215" role="img" aria-label="Tipos de ancla">
  <g transform="translate(95 20)" stroke="var(--ink)" stroke-width="3" fill="none">
   <line x1="0" y1="0" x2="0" y2="110"/><circle cx="0" cy="-6" r="6"/><path d="M-40 90 Q 0 140 40 90" /><path d="M-40 90 l-8 -12 M40 90 l8 -12"/><line x1="-30" y1="18" x2="30" y2="18"/>
   <text x="0" y="160" text-anchor="middle" fill="var(--ink)" stroke="none" font-size="13" font-weight="600">Almirantazgo (con cepo)</text>
   <g font-size="10" fill="var(--accent)" stroke="none"><text x="8" y="-4">arganeo</text><text x="34" y="22">cepo</text><text x="8" y="60">caña</text><text x="6" y="128">cruz</text><text x="42" y="98">brazo / uña</text></g>
  </g>
  <g transform="translate(250 20)" stroke="var(--ink)" stroke-width="3" fill="var(--shoal)">
   <line x1="0" y1="0" x2="0" y2="112"/><path d="M-6 112 L-34 50 L-14 50 L0 100 Z"/><path d="M6 112 L34 50 L14 50 L0 100 Z"/><line x1="-40" y1="112" x2="40" y2="112"/>
   <text x="0" y="160" text-anchor="middle" fill="var(--ink)" stroke="none" font-size="13" font-weight="600">Danforth</text><text x="0" y="176" text-anchor="middle" fill="var(--muted)" stroke="none" font-size="11">arena y fango · poco peso</text>
  </g>
  <g transform="translate(400 20)" stroke="var(--ink)" stroke-width="3" fill="var(--shoal)">
   <line x1="0" y1="0" x2="0" y2="80"/><path d="M0 80 Q -30 95 -26 125 Q 0 108 0 80 Q 0 108 26 125 Q 30 95 0 80"/>
   <text x="0" y="160" text-anchor="middle" fill="var(--ink)" stroke="none" font-size="13" font-weight="600">Arado (CQR)</text><text x="0" y="176" text-anchor="middle" fill="var(--muted)" stroke="none" font-size="11">polivalente</text>
  </g>
  <g transform="translate(560 20)" stroke="var(--ink)" stroke-width="3" fill="none">
   <line x1="0" y1="0" x2="0" y2="100"/><path d="M0 100 Q -30 100 -36 70 M0 100 Q 30 100 36 70 M0 100 Q -14 110 -24 90 M0 100 Q 14 110 24 90"/>
   <text x="0" y="160" text-anchor="middle" fill="var(--ink)" stroke="none" font-size="13" font-weight="600">Rezón</text><text x="0" y="176" text-anchor="middle" fill="var(--muted)" stroke="none" font-size="11">auxiliares · roca</text>
  </g></svg>`;
}
CH[2]={
intro:"Dos preguntas en el examen, pero en las prácticas lo vas a hacer todo: dar amarras, hacer firme en una cornamusa y fondear. Aquí lo importante es entender para qué trabaja cada cabo.",
sections:[
["cabos","Cabos: partes, materiales y maniobras",`
<figure><svg viewBox="0 0 600 120" role="img" aria-label="Partes de un cabo">
<path d="M20 60 C 140 60, 160 20, 260 20 C 360 20, 380 100, 480 100 L 580 100" fill="none" stroke="var(--warn)" stroke-width="7" stroke-linecap="round"/>
<g font-size="12" fill="var(--ink)"><text x="10" y="90">chicote (extremo)</text><text x="230" y="50">seno (parte curva)</text><text x="590" y="86" text-anchor="end">firme (parte que trabaja)</text></g>
</svg></figure>
<ul>
<li><span class="es">Chicote</span>: extremo libre. <span class="es">Seno</span>: curva o parte central. <span class="es">Firme</span>: parte fija o que soporta la tensión. <span class="es">Mena</span>: grosor (el diámetro del cabo). <span class="es">Gaza</span>: curva cerrada o lazo en un cabo; se hace con un as de guía o trenzando (ayustando) los cordones del chicote en los del firme.</li>
<li><b>Materiales</b>: <b>poliamida (nailon)</b>, elástica, ideal para amarras y fondeo porque absorbe los tirones; <b>poliéster</b> (tergal/dacron), poco elástico, para escotas y drizas; <b>polipropileno</b>, flota, para rabizas y cabos de remolque/salvavidas. Las fibras naturales (cáñamo, manila) ya casi no se usan.</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Voz</th><th>Significa</th></tr>
<tr><td class="es">Cobrar</td><td>Tirar de un cabo para recoger el seno o para tensarlo</td></tr>
<tr><td class="es">Lascar / amollar</td><td>Aflojar un poco un cabo que estaba tenso</td></tr>
<tr><td class="es">Arriar</td><td>Aflojar un cabo; lleva implícita la idea de bajar (se arrían las velas y los botes)</td></tr>
<tr><td class="es">Arriar en banda</td><td>Soltar un cabo de golpe, sin retenerlo nada</td></tr>
<tr><td class="es">Hacer firme</td><td>Sujetar el cabo a un punto fijo (cornamusa, bita)</td></tr>
<tr><td class="es">Tomar vuelta</td><td>Dar una vuelta a una cornamusa o bita para aguantar sin soltar</td></tr>
<tr><td class="es">Adujar</td><td>Recoger el cabo en vueltas ordenadas (adujas) para que no se enrede</td></tr>
<tr><td class="es">Largar</td><td>Soltar del todo un cabo y dejarlo libre, desconectándose de él (o lanzarlo a tierra)</td></tr>
<tr><td class="es">Tesar / templar</td><td>Poner un cabo en tensión</td></tr>
<tr><td class="es">Encapillar</td><td>Colocar una gaza en una bita o noray</td></tr>
</table></div>`],
["nudos","Nudos y cornamusa",`
<div class="grid2"><figure style="margin:0"><svg viewBox="0 0 300 160" role="img" aria-label="Vuelta de cornamusa">
<rect x="0" y="0" width="300" height="160" fill="none"/>
<path d="M60 80 L240 80" stroke="var(--muted)" stroke-width="20" stroke-linecap="round"/>
<rect x="132" y="80" width="36" height="40" fill="var(--muted)"/>
<path d="M10 140 C 80 140, 100 104, 132 98 C 180 90, 240 104, 240 80 C 240 54, 180 64, 150 80 C 120 96, 60 104, 60 80 C 60 56, 120 64, 150 80 C 180 96, 240 104, 240 80" fill="none" stroke="var(--warn)" stroke-width="5"/>
<text x="10" y="20" font-size="12" font-weight="600" fill="var(--ink)">Vuelta de cornamusa</text>
<text x="10" y="36" font-size="11" fill="var(--muted)">1 vuelta completa · ochos · vuelta mordida</text></svg></figure>
<div><p><b>Cómo hacer firme en una cornamusa</b>: entra el cabo por el lado más alejado de la carga, da una vuelta completa a la base, después uno o dos «ochos» por encima de los cuernos, y termina con una vuelta mordida (el cabo pasa por debajo de sí mismo). Así se puede soltar aunque esté en tensión.</p></div></div>
<div class="tablewrap"><table>
<tr><th>Nudo</th><th>Para qué sirve</th><th>Lo que pregunta el examen</th></tr>
<tr><td class="es">As de guía</td><td>Gaza fija, no corrediza, para encapillar un cabo (en un noray, alrededor de una persona). El más usado a bordo, sobre todo en vela</td><td>«El rey de los nudos»; no se corre</td></tr>
<tr><td class="es">Ballestrinque</td><td>Hacer firme el chicote: a una bita (amarras) o a un pasamanos o candelero (cabos de las defensas). Se remata con un <b>cote de seguridad</b></td><td>Defensas; termina con cote</td></tr>
<tr><td class="es">Nudo llano</td><td>Unir por los chicotes dos cabos de <b>igual</b> mena</td><td>Igual mena</td></tr>
<tr><td class="es">Vueltas de rezón</td><td>Afirmar una amarra a una argolla protegiendo el cabo del roce. Muy usado para unir el cabo de fondeo a un ancla pequeña</td><td>Argolla · ancla pequeña</td></tr>
<tr><td class="es">Vuelta de escota</td><td>Unir dos cabos de <b>distinta</b> mena</td><td>Distinta mena</td></tr>
<tr><td class="es">Nudo de ocho</td><td>Tope en un chicote para que no se escape por una polea o guía</td><td>Nudo de tope</td></tr>
<tr><td class="es">Vuelta redonda y dos medios cotes</td><td>Hacer firme a una argolla o boya, aguantando tensión</td><td>Para argollas</td></tr>
</table></div>
<p class="small">Un buen nudo tiene que poder deshacerse con facilidad aunque haya trabajado mucho.</p>
<div class="sea"><b>A bordo.</b> Practica el as de guía con los ojos cerrados y en las dos manos. En las prácticas es el que te pedirán siempre, y al pasar una amarra a un noray tienes segundos.</div>`],
["amarras","Las amarras de un barco atracado",`
<div class="widget"><div class="eyebrow">Interactivo · toca cada amarra</div>
<figure>${dockSVG()}</figure>
<div class="row" style="margin:6px 0"><span class="small muted">¿Qué amarras trabajan con viento…?</span>
<button class="btn sm ghost wind" data-w="proa">de proa</button><button class="btn sm ghost wind" data-w="popa">de popa</button><button class="btn sm ghost wind" data-w="tierra">desde el muelle</button><button class="btn sm ghost wind" data-w="mar">desde el mar</button></div>
<div class="info" id="amInfo">Toca una amarra.</div></div>
<div class="key"><b>Regla para no fallar.</b> El <b>largo</b> va hacia fuera (proa hacia delante, popa hacia atrás). El <b>esprín</b> va «cruzado» hacia el centro del barco: el de proa hacia popa y el de popa hacia proa. Cada cabo impide el movimiento <i>contrario</i> a hacia donde apunta desde el barco.</div>
<h3>Elementos de amarre</h3>
<div class="tablewrap"><table>
<tr><th>Elemento</th><th>Qué es</th></tr>
<tr><td class="es">Noray</td><td>Pieza de hierro fundido fijada al <b>muelle</b> para sujetar las amarras</td></tr>
<tr><td class="es">Bita</td><td>Pieza cilíndrica y sólida fijada a la <b>cubierta</b> para amarrar cabos</td></tr>
<tr><td class="es">Cornamusa</td><td>Pieza sólida de madera o metal, fijada en cubierta, para amarrar cabos (con dos «cuernos»)</td></tr>
<tr><td class="es">Muerto</td><td>Peso sólido en el fondo, adecuado al barco, para asegurar el amarre en puerto o fondeadero. De él salen las cadenas o cabos que sujetan las boyas.</td></tr>
<tr><td class="es">Boya</td><td>Cuerpo ligero y flotante sujeto al fondo por un lastre o muerto. Sirve para amarrar un barco o para señalizar.</td></tr>
<tr><td class="es">Defensas</td><td>Protegen el casco de golpes y rozaduras</td></tr>
<tr><td class="es">Bichero</td><td>Palo o percha larga con un gancho en la punta (también llamado <b>puntera</b>) para coger la guía o las amarras</td></tr>
<tr><td class="es">Roldana</td><td>Rueda de madera o metal sobre la que gira el cabo en poleas, motones y otras cajeras. Sirve para dirigir los cabos de amarre hacia los elementos de cubierta.</td></tr>
<tr><td class="es">Guía-cabos</td><td>Piezas, normalmente de inox, fijadas en la borda para pasar y guiar las amarras hacia el muelle</td></tr>
<tr><td class="es">Boza</td><td>Trozo de cabo que sujeta una cadena o cabo en tensión para poder manipularlo</td></tr>
<tr><td class="es">Guía</td><td>Cabo fino, a veces con peso, que se lanza para pasar luego uno más grueso</td></tr>
</table></div>
<div class="key"><b>No confundir.</b> El <b>noray</b> está en el muelle; la <b>bita</b> y la <b>cornamusa</b>, a bordo. La boya flota; el muerto está en el fondo.</div>`],
["fondeo","Anclas y fondeo",`
<figure>${anchorsSVG()}<figcaption>Partes de un ancla (ancla de almirantazgo) y los tipos habituales.</figcaption></figure>
<div class="tablewrap"><table>
<tr><th>Elemento</th><th>Qué es</th></tr>
<tr><td class="es">Molinete (chigre)</td><td>Máquina eléctrica para virar (subir) la cadena; eje <b>horizontal</b></td></tr>
<tr><td class="es">Cabrestante</td><td>Igual pero con eje <b>vertical</b></td></tr>
<tr><td class="es">Barbotén</td><td>Corona del molinete con huecos donde encajan los eslabones: la pieza clave para virar cadena</td></tr>
<tr><td class="es">Cabirón</td><td>Tambor liso en el otro extremo del eje del molinete, para virar un cabo (fondeo o atraque)</td></tr>
<tr><td class="es">Embrague · freno</td><td>El embrague acopla o suelta el barbotén del eje del motor; el freno bloquea el barbotén</td></tr>
<tr><td class="es">Estopor</td><td>Mordaza que trinca la cadena para que no se suelte</td></tr>
<tr><td class="es">Escobén</td><td>Conducto por donde pasa la cadena hacia fuera</td></tr>
<tr><td class="es">Caja de cadenas («pozo de anclas»)</td><td>Compartimento bajo cubierta, normalmente a proa, donde se estiba la línea de fondeo y se hace firme su chicote</td></tr>
<tr><td class="es">Gatera</td><td>Orificio de cubierta por el que pasa la cadena o el cabo hacia la caja</td></tr>
<tr><td class="es">Grillete</td><td>Pieza en U con perno que une ancla y cadena. También es una medida de cadena (27,5 m)</td></tr>
<tr><td class="es">Grillete de unión (giratorio)</td><td>Une cadena y ancla dejando girar el ancla sin retorcer la cadena; ayuda a que el ancla entre bien en la puntera</td></tr>
<tr><td class="es">Puntera</td><td>Pieza de proa por la que corren la cadena y la caña del ancla al empezar y acabar el fondeo</td></tr>
<tr><td class="es">Orinque</td><td>Cabo con boya firme a la cruz del ancla para recuperarla si se engancha</td></tr>
</table></div>
<h3>Partes y tipos de ancla</h3>
<p>Partes: <b>caña</b> (barra principal), <b>arganeo</b> (argolla de arriba, donde se hace firme el cabo o el grillete), <b>cruz</b> (unión de caña y brazos), <b>brazos</b> terminados en <b>uñas</b> que se clavan, y <b>mapa</b> (la cara plana de la uña). El <b>cepo</b>, barra transversal de las anclas clásicas, mejoraba el agarre; las anclas modernas no lo llevan y agarran gracias a los brazos móviles.</p>
<ul>
<li><b>Arado</b>: brazos y uñas forman una sola pieza. Según el manual, apropiada para fondos de <b>fango</b>.</li>
<li><b>Danforth</b>: barra bajo la cruz y dos uñas planas. Muy usada en recreo por su gran agarre.</li>
<li><b>Rezón</b>: sin cepo, cuatro brazos; caiga como caiga, siempre quedan dos en posición de clavar. Para neumáticas y auxiliares hay rezones plegables con un capuchón (caperuzón) que cierra las uñas.</li>
</ul>
<div class="key"><b>Línea de fondeo (norma).</b> Longitud total de al menos <b>5 veces la eslora</b>. El tramo de cadena, como mínimo <b>igual a la eslora</b>, salvo en barcos de menos de 6 m, que pueden llevar solo estacha (cabo). La tabla de pesos y diámetros por eslora es orientativa y no entra en el examen.</div>
<div class="widget"><div class="eyebrow">Interactivo · cuánta cadena filar</div>
<div class="grid2"><div>
<label class="small">Sonda (profundidad): <b id="sdV"></b></label><input type="range" id="sd" min="2" max="20" value="6">
<div class="seg" style="margin:8px 0"><button class="btn sm" data-ty="cadena" aria-pressed="true">Cadena</button><button class="btn sm ghost" data-ty="mixto" aria-pressed="false">Cadena + cabo</button><button class="btn sm ghost" data-ty="cabo" aria-pressed="false">Solo cabo</button></div>
<label class="row small"><input type="checkbox" id="mt"> Mal tiempo / se espera que refresque</label>
<p id="scTxt" style="font-weight:600"></p><p class="small muted" id="scSub"></p></div>
<svg viewBox="0 0 300 170" id="scSvg" role="img" aria-label="Catenaria del fondeo"></svg></div></div>
<h3>Dónde fondear: el tenedero</h3>
<p><b>Fondear</b> es afirmar el barco al fondo con el ancla y su cadena o cabo. Un barco fondeado <b>nunca</b> es como un barco atracado: muchos se pierden por confiarse. El <span class="es">tenedero</span> es la superficie del fondo donde se clava el ancla.</p>
<div class="grid2">
<div class="panel"><h4>Buenos tenederos</h4><p>Fango duro, arena fangosa, arena dura o incluso fina.</p></div>
<div class="panel"><h4>Malos tenederos</h4><p>Piedra y fondos duros en general, y los de algas. En roca, el ancla puede <b>enrocarse</b> y no poder levarse.</p></div>
</div>
<ul>
<li><b>Resguardo</b>: el mayor posible del viento y, sobre todo, de la mar.</li>
<li><b>Profundidad</b>: adecuada al calado, al tipo de barco y a la longitud de tu línea de fondeo.</li>
<li><b>Salida fácil</b>: si el tiempo cambia de golpe, el refugio no puede convertirse en una «ratonera».</li>
<li><b>Nunca sobre posidonia</b> (manchas oscuras en el fondo). Además de ser mal tenedero, en la Comunitat Valenciana está prohibido (Decreto 64/2022) y en Baleares y otras zonas protegidas hay boyas de amarre.</li>
</ul>
<h3>Fondeo a la gira, paso a paso</h3>
<p>Fondear <b>a la gira</b> es hacerlo con <b>una sola ancla por proa</b>, filando la cadena por la puntera o el escobén: el ancla es el único punto de sujeción.</p>
<ol>
<li><b>Aproximación</b>: ancla a la pendura, proa al viento, con velocidad de gobierno pero la mínima arrancada.</li>
<li><b>Dar fondo</b>: en el punto elegido, se para el barco y se da un poco atrás. Se abre el freno del barbotén y se fila hasta que el ancla esté a pique (toque fondo), sin dejar caer la cadena encima.</li>
<li><b>Filar cadena</b> mientras el barco cae atrás, hasta 3–6 veces la sonda según viento y corriente. Si la proa se abre al viento, se deja de filar un momento para que la cadena «llame» y el barco vuelva a aproarse.</li>
<li><b>Hacer firme</b> la cadena a una cornamusa o al barbotén. Mejor <b>abozarla</b> con un cabo a las cornamusas de proa: los anclajes del molinete no siempre aguantan el esfuerzo.</li>
<li>Antes de parar el motor, toma <b>referencias en tierra</b> (enfilaciones) para comprobar que ha agarrado.</li>
</ol>
<div class="key"><b>Cuánta cadena.</b> Normalmente <b>3–4 veces la profundidad</b>. Con mucho viento, corriente o efecto de marea, <b>5–6 veces</b>. El barco debe llevar en total una cadena de 5 veces su eslora.</div>
<ul>
<li><span class="es">Virar</span>: cobrar (recoger) cabo o cadena. <span class="es">Filar</span>: largar o arriar cabo o cadena.</li>
<li><span class="es">Levar</span>: virar la cadena para recoger el ancla. Se avanza despacio hacia ella mientras se vira, hasta que esté «a pique» y se desclave.</li>
<li><span class="es">A la pendura</span>: ancla destrincada, bajada y colgando, lista para darle fondo cuando se decida. <span class="es">Ancla al pelo</span>: justo despegada del fondo.</li>
<li><span class="es">A pique</span>: al fondear, el momento en que el ancla toca fondo; al levar, cuando la cadena está vertical con el ancla aún en el fondo, justo antes de despegarse.</li>
<li><span class="es">Zarpar</span>: momento en que el ancla se despega del fondo, justo después de estar a pique.</li>
<li><span class="es">¡Clara! / ¡Libre!</span>: voz que indica que el ancla ha zarpado y viene limpia (sin fango, algas ni cabos enredados).</li>
</ul>
<div class="note"><b>Ojo en el examen.</b> Lo que hace agarrar al ancla es sobre todo que la cadena trabaje <i>horizontal</i> sobre el fondo: por eso cuenta la longitud filada (y el peso de la cadena) más que el peso del ancla.</div>`],
["borneo","Borneo, garreo y vigilancia",`
<p><span class="es">Bornear</span>: el barco gira alrededor del ancla, con la cadena como radio, cuando cambia el viento o la corriente; la proa queda hacia el que domine. El <b>círculo de borneo</b> depende de la cadena filada, de la fuerza del viento o la corriente y de la obra muerta del barco. El <b>espacio de borneo</b> de cada barco hay que respetarlo en el fondeadero para no chocar.</p>
<div class="widget"><div class="eyebrow">Interactivo · rola el viento</div>
<div class="grid2"><div>
<label class="small">Dirección del viento: <b id="bwV"></b></label><input type="range" id="bw" min="0" max="359" value="0">
<div class="seg" style="margin:8px 0"><button class="btn sm" data-bz="cerca" aria-pressed="true">Fondeados muy juntos</button><button class="btn sm ghost" data-bz="lejos" aria-pressed="false">Respetando el borneo</button></div>
<p id="bTxt" style="font-weight:600"></p>
<p class="small">Barco claro: velero (bornea despacio). Barco oscuro: lancha (sigue enseguida al viento).</p>
<p class="small muted">De día, en verano, el viento suele rolar unos 40–50°. De noche puede rolar hasta 180°: por eso, quien pasa la noche fondeado necesita su círculo completo libre. Las lanchas (mucha obra muerta, poca obra viva) bornean más rápido que los veleros.</p>
</div><svg viewBox="0 0 300 260" id="bSvg" role="img" aria-label="Dos barcos fondeados y sus círculos de borneo"></svg></div></div>
<h3>Garreo</h3>
<p>Un barco <span class="es">garrea</span> cuando el ancla no queda firme y el barco se va desplazando a <b>sotavento</b>.</p>
<div class="grid2">
<div class="panel"><h4>Causas</h4><ul><li>No se ha filado bastante cadena para el fondo o el viento.</li><li>Fondo duro: el ancla no penetra.</li><li>Fondo demasiado blando: el ancla va abriendo surco.</li><li>La cadena cayó encima del ancla y la bloquea.</li></ul></div>
<div class="panel"><h4>Cómo evitarlo</h4><ul><li>Filar más cadena.</li><li>Cambiar de fondeadero si el fondo no es bueno.</li><li>Fondear una segunda ancla.</li><li>Aguantarse con máquina avante.</li></ul></div>
</div>
<p><b>Vigilancia</b>: referencias en tierra tomadas antes de parar el motor, alarma de la sonda con un fondo mínimo y, si hay radar, distancias mínimas a rocas y peligros.</p>
<p><span class="es">Orinque</span>: cabo firme por un chicote a la <b>cruz</b> del ancla y por el otro a un <b>boyarín</b>. Permite levar el ancla tirando de la cruz si se enroca y marca su vertical si hay que abandonarla para recuperarla luego con buceadores.</p>
<div class="note"><b>Ojo.</b> Garrear sobre algas y posidonia destroza el fondo: es una de las principales causas de su degradación en el Mediterráneo.</div>`],
["dosanclas","Dos anclas y levar",`
<div class="grid2">
<div class="panel"><h4>Dos anclas por la proa</h4><p>Da más seguridad. Se fondea la primera y se fila; luego se mete timón a la banda contraria, se da un poco avante y se fondea la segunda, cerca de la primera. Se fila de la segunda procurando que las dos líneas tengan la <b>misma longitud</b>.</p></div>
<div class="panel"><h4>A barbas de gato</h4><p>Dos anclas cuyas líneas forman un ángulo de <b>90° a 120°</b>. Además de más seguridad, <b>reduce el espacio de borneo</b>. Se llega de través al viento, se fondea la primera por <b>barlovento</b>, se fila, se fondea la segunda por <b>sotavento</b> y se vira de la primera mientras se fila de la segunda, hasta igualar longitudes. El barco queda aproado al viento.</p></div>
</div>
<figure><svg viewBox="0 0 600 200" role="img" aria-label="Fondeo a barbas de gato">
<rect x="0" y="0" width="600" height="34" fill="var(--land)"/><rect x="0" y="34" width="600" height="166" fill="var(--water)"/>
<g stroke="var(--accent)" stroke-width="3" fill="none"><path d="M60 44 V70 M53 62 L60 70 L67 62"/><path d="M110 44 V70 M103 62 L110 70 L117 62"/><path d="M490 44 V70 M483 62 L490 70 L497 62"/><path d="M540 44 V70 M533 62 L540 70 L547 62"/></g>
<text x="85" y="88" font-size="12" text-anchor="middle" fill="var(--accent)">viento</text><text x="515" y="88" font-size="12" text-anchor="middle" fill="var(--accent)">viento</text>
<text x="300" y="22" font-size="11" text-anchor="middle" fill="var(--ink)">costa</text>
<path d="M300 140 L200 60" stroke="var(--ink)" stroke-width="2.5" fill="none"/><path d="M300 140 L400 60" stroke="var(--ink)" stroke-width="2.5" fill="none"/>
<path d="M196 56 l-8 -6 M196 56 l2 -10" stroke="var(--ink)" stroke-width="3"/><path d="M404 56 l8 -6 M404 56 l-2 -10" stroke="var(--ink)" stroke-width="3"/>
<path d="M265 112 A 45 45 0 0 1 335 112" fill="none" stroke="var(--green)" stroke-width="2"/><text x="300" y="84" font-size="12" text-anchor="middle" fill="var(--green)">90°–120°</text>
${boatTop(300,170,56,0)}
<text x="186" y="74" font-size="11" text-anchor="end" fill="var(--muted)">1.ª ancla</text><text x="414" y="74" font-size="11" fill="var(--muted)">2.ª ancla</text>
</svg><figcaption>A barbas de gato: dos líneas iguales y abiertas; menos borneo.</figcaption></figure>
<h3>Levar el ancla</h3>
<ol>
<li>Un tripulante a <b>proa</b> indica con la mano hacia dónde «llama» la cadena: tras horas de borneo, la cadena dibuja curvas en el fondo y el timonel corrige el rumbo para que llame siempre por la proa.</li>
<li>Se da un poco <b>avante</b> mientras se cobra, para que ni el molinete ni el tripulante hagan esfuerzo.</li>
<li>Con el ancla <b>a pique</b> (cadena vertical, ancla aún en el fondo) se para el barco y se sigue virando.</li>
<li>El ancla <b>zarpa</b>, sube <b>clara</b> y se iza rápido.</li>
<li>El barco vuelve a tomar arrancada. Hay que <b>estibar el ancla enseguida</b> para que no golpee la roda ni las amuras.</li>
</ol>`]
],
init(root){
  const info=$("#amInfo",root);
  const sel=ids=>$$(".amarra",root).forEach(g=>g.classList.toggle("on",ids.includes(g.dataset.id)));
  $$(".amarra",root).forEach(g=>{const act=()=>{const l=LINES.find(x=>x[0]===g.dataset.id);sel([l[0]]);$("#windArrow",root).innerHTML="";info.innerHTML=`<b>${l[1]}.</b> Evita: ${l[4]} Trabaja sobre todo con ${l[5]}.`};g.addEventListener("click",act);g.addEventListener("keydown",e=>{if(e.key==="Enter"){act()}})});
  const W={proa:[["lpr","epp"],"El viento empuja el barco hacia atrás: trabajan el <b>largo de proa</b> y el <b>esprín de popa</b>. Son los que hay que reforzar.","M520 150 L440 150"],
           popa:[["lpp","epr"],"El viento empuja el barco hacia delante: trabajan el <b>largo de popa</b> y el <b>esprín de proa</b>.","M20 150 L100 150"],
           tierra:[["tpr","tpp","lpr","lpp"],"El viento separa el barco del muelle: trabajan los <b>traveses</b> (y los largos). Al atracar así, hay que llegar más cerrado y dar rápido la primera amarra.","M270 20 L270 64"],
           mar:[[],"El viento aprieta el barco contra el muelle: las amarras apenas trabajan; lo que trabaja son las <b>defensas</b>. Al desatracar costará separarse: se sale abriendo con el esprín.","M270 186 L270 150"]};
  $$(".wind",root).forEach(b=>b.addEventListener("click",()=>{const w=W[b.dataset.w];sel(w[0]);info.innerHTML=w[1];$("#windArrow",root).innerHTML=`<path d="${w[2]}" stroke="var(--accent)" stroke-width="4" marker-end="url(#wa)"/><defs><marker id="wa" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>`}));
  {const bw=$("#bw",root),bs=$("#bSvg",root);let bz="cerca";
   const draw=()=>{const a=+bw.value;$("#bwV",root).textContent=a+"°";const R=55;
     const A=bz==="cerca"?[[150,85],[150,155]]:[[80,75],[215,185]];/* boat 0 = velero (bornea despacio, se queda atrás); boat 1 = lancha (sigue al viento) */
     const ang=[a*0.5,a],V=ang.map(g=>[Math.sin(g*Math.PI/180),-Math.cos(g*Math.PI/180)]);
     const P=A.map(([x,y],i)=>[x-V[i][0]*R,y-V[i][1]*R]);
     const d=Math.hypot(P[0][0]-P[1][0],P[0][1]-P[1][1]);const hit=d<26;
     let h=`<rect x="0" y="0" width="300" height="260" fill="var(--water)"/>`;
     A.forEach(([x,y],i)=>{h+=`<circle cx="${x}" cy="${y}" r="${R+12}" fill="none" stroke="${hit?"var(--red)":"var(--muted)"}" stroke-dasharray="4 4"/><path d="M${x} ${y} L${P[i][0]} ${P[i][1]}" stroke="var(--ink)" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="3" fill="var(--ink)"/>`;
       h+=boatTop(P[i][0]-V[i][0]*10,P[i][1]-V[i][1]*10,24,ang[i],i?"var(--shoal)":"var(--paper)")});
     h+=`<g transform="translate(270 30) rotate(${a})"><line x1="0" y1="-16" x2="0" y2="14" stroke="var(--accent)" stroke-width="3"/><path d="M-6 8 L0 16 L6 8" fill="none" stroke="var(--accent)" stroke-width="3"/></g><text x="270" y="62" font-size="10" text-anchor="middle" fill="var(--accent)">viento</text>`;
     bs.innerHTML=h;$("#bTxt",root).innerHTML=hit?"✗ Los barcos se tocan: no han respetado el espacio de borneo.":"✓ Hay sitio: cada uno bornea en su círculo.";$("#bTxt",root).className=hit?"fail":"pass"};
   bw.addEventListener("input",draw);
   $$("[data-bz]",root).forEach(b=>b.addEventListener("click",()=>{bz=b.dataset.bz;$$("[data-bz]",root).forEach(x=>{const on=x===b;x.classList.toggle("ghost",!on);x.setAttribute("aria-pressed",on)});draw()}));
   draw();}
  let ty="cadena";
  const sd=$("#sd",root),mt=$("#mt",root),svg=$("#scSvg",root);
  const up=()=>{const s=+sd.value;$("#sdV",root).textContent=s+" m";const f={cadena:3,mixto:4,cabo:5}[ty]+(mt.checked?2:0);const L=s*f;
    $("#scTxt",root).textContent=`Fila unos ${L} m (${f} × sonda)`;$("#scSub",root).textContent=`Radio de borneo ≈ ${Math.round(Math.sqrt(L*L-s*s))+8} m (cadena + eslora). Deja ese círculo libre de otros barcos y de piedras.`;
    const depth=30+s*6,ax=40+Math.min(230,L*2.2);
    svg.innerHTML=`<rect x="0" y="20" width="300" height="${depth-20}" fill="var(--water)"/><rect x="0" y="${depth}" width="300" height="${170-depth}" fill="var(--land)"/><path d="M8 20 L48 20 L44 30 L12 30 Z" fill="var(--paper)" stroke="var(--ink)"/><path d="M44 26 Q ${44+(ax-44)*0.35} ${depth-2}, ${ax} ${depth-1}" fill="none" stroke="var(--ink)" stroke-width="2" ${ty==="cabo"?'stroke-dasharray="5 3"':""}/><path d="M${ax} ${depth-1} l10 -8 M${ax} ${depth-1} l10 6" stroke="var(--ink)" stroke-width="2.5"/><text x="150" y="${Math.min(depth+16,164)}" font-size="11" fill="var(--ink)" text-anchor="middle">sonda ${s} m · filado ${L} m</text>`};
  $$("[data-ty]",root).forEach(b=>b.addEventListener("click",()=>{ty=b.dataset.ty;$$("[data-ty]",root).forEach(x=>{x.setAttribute("aria-pressed",x===b);x.classList.toggle("ghost",x!==b)});up()}));
  sd.addEventListener("input",up);mt.addEventListener("change",up);up();
}};
})();
(function(){
"use strict";
const {$,$$,CH,boatTop}=PER;

/* ================= TEMA 3 · SEGURIDAD ================= */
const ZONES=[
 {z:1,lim:"Navegación ilimitada",bm:6,co:6,fu:2,ch:"275 N",balsa:true,aro:true},
 {z:2,lim:"Hasta 60 mn de la costa",bm:6,co:6,fu:1,ch:"150 N",balsa:true,aro:true},
 {z:3,lim:"Hasta 25 mn de la costa",bm:6,co:6,fu:1,ch:"150 N",balsa:true,aro:true},
 {z:4,lim:"Hasta 12 mn de la costa",bm:3,co:3,fu:0,ch:"150 N",balsa:false,aro:true},
 {z:5,lim:"Hasta 5 mn de un abrigo",bm:3,co:0,fu:0,ch:"100 N",balsa:false,aro:false},
 {z:6,lim:"Hasta 2 mn de un abrigo",bm:3,co:0,fu:0,ch:"100 N",balsa:false,aro:false},
 {z:7,lim:"Aguas protegidas (puertos, rías, bahías)",bm:0,co:0,fu:0,ch:"100 N",balsa:false,aro:false}
];
const pathA="M150 330 L150 250 C 150 200, 240 175, 268 220 C 296 268, 236 316, 186 300 C 160 292, 150 280, 150 262";
const pathW="M150 330 L150 245 Q 156 205 196 186 Q 240 166 236 126 Q 230 86 186 92 Q 150 100 150 150 L150 255";
CH[3]={
intro:"Cuatro preguntas que salen de pocos datos fijos: estabilidad, material obligatorio por zonas, mal tiempo y hombre al agua. Y es, con diferencia, el tema que más te servirá navegando.",
sections:[
["estabilidad","Estabilidad",`
<p><span class="es">Estabilidad</span>: propiedad del barco de recuperar su posición de equilibrio cuando la pierde por causas externas (viento, mar). Dos fuerzas mantienen el barco derecho, y juntas forman el <b>par de estabilidad</b>: el <b>peso</b>, aplicado en el <b>centro de gravedad G</b>, que tira hacia abajo, y el <b>empuje</b>, aplicado en el <b>centro de carena C</b> (el centro del volumen sumergido), que empuja hacia arriba. Al escorar, C se desplaza hacia la banda que se hunde y las dos fuerzas forman un <b>par adrizante</b>. El punto donde la vertical del empuje corta la crujía es el <b>metacentro M</b>.</p>
<div class="widget"><div class="eyebrow">Interactivo · escora y altura de G</div>
<div class="grid2"><div>
<label class="small">Escora: <b id="esV"></b></label><input type="range" id="es" min="0" max="35" value="15">
<label class="small">Altura de G (pesos altos ↑): <b id="gV"></b></label><input type="range" id="gh" min="0" max="100" value="35">
<p id="stTxt" style="font-weight:600"></p>
<p class="small muted">GZ es el brazo adrizante: GZ ≈ GM · sen(escora). Mientras M quede por encima de G, el barco vuelve a adrizarse.</p></div>
<svg viewBox="0 0 300 240" id="stSvg" role="img" aria-label="Sección del barco escorado con G, C y M"></svg></div></div>
<ul>
<li><b>Empeoran la estabilidad</b>: pesos <b>altos</b> (gente de pie en la cubierta superior, carga en el techo), <b>superficies libres</b> (tanques a medias, agua en la sentina o en cubierta, que se desplaza a la banda baja) y pesos <b>desplazados a una banda</b>.</li>
<li><b>Barco duro</b>: GM grande, muy estable; se adriza rápido y a menudo de forma brusca y violenta. Los veleros, y sobre todo los monocascos de regata con el peso en el bulbo de la quilla, son barcos duros. En un mercante es peligroso porque puede correrse la carga. <b>Barco blando</b>: GM pequeño, menos estable; cómodo porque recupera la escora despacio, pero con mar fuerte puede volcar y hundirse. El diseño busca un equilibrio entre ambos.</li>
<li><span class="es">Balance</span>: vaivén de una banda a otra. Su <b>periodo</b> es el tiempo que tarda el barco en pasar de estar inclinado a una banda a estarlo los mismos grados a la otra. <span class="es">Cabezada</span> (cabeceo): vaivén proa-popa por el oleaje. Si al cabecear el barco golpea con fuerza el agua con la parte delantera de la obra viva, ha dado un <b>pantocazo</b>.</li>
<li><span class="es">Sincronismo</span>: cuando el periodo de las olas coincide (o casi) con el del barco, la amplitud crece hasta poder volcarlo. Con el balance es <b>sincronismo transversal</b>; con la cabezada, <b>sincronismo longitudinal</b>.</li>
<li>La <b>reserva de flotabilidad</b> es el volumen estanco por encima de la flotación (depende del francobordo).</li>
</ul>
<h3>Estática y dinámica</h3>
<div class="tablewrap"><table>
<tr><th>Tipo</th><th>Qué es</th><th>Cómo se ve su pérdida</th></tr>
<tr><td class="es">Estática transversal</td><td>Recuperar el equilibrio, en aguas tranquilas, tras una fuerza lateral. Inicial (escora &lt;10°) o de grandes inclinaciones (&gt;10°).</td><td>Balance y escora. Adrizado = escora nula.</td></tr>
<tr><td class="es">Estática longitudinal</td><td>Recuperarlo en sentido proa-popa (solo se estudia la inicial, &lt;10°)</td><td>Cabeceo y cambios del asiento. En aguas iguales = asiento cero.</td></tr>
<tr><td class="es">Dinámica</td><td>Estabilidad frente a fuerzas externas como olas grandes y viento fuerte (transversal)</td><td>—</td></tr>
</table></div>
<div class="key"><b>Cómo gobernar.</b> Para cortar un <b>balance</b> excesivo, <b>cambia el rumbo</b>: la causa principal es la mar de través. Para cortar la <b>cabezada</b>, <b>cambia la velocidad</b> (más o menos), porque así cambias el periodo de cabeceo. En otros rumbos, rumbo, velocidad o las dos cosas.</div>`],
["antes","Antes de salir",`
<div class="grid3">
<div class="panel"><h4>Tiempo</h4><p>Parte de AEMET o de Salvamento por VHF para toda la salida, con su tendencia. Si hay duda, no se sale.</p></div>
<div class="panel"><h4>Combustible</h4><p>Regla de los <b>tercios</b>: ⅓ ida, ⅓ vuelta, ⅓ reserva. Filtro decantador sin agua.</p></div>
<div class="panel"><h4>Motor</h4><p>Aceite, refrigeración (grifo de fondo abierto, sale agua por el escape), correas, baterías.</p></div>
<div class="panel"><h4>Gasolina intraborda</h4><p>Ventilar la cámara del motor <b>4–5 min</b> antes de arrancar: los vapores de gasolina pesan más que el aire y se acumulan abajo.</p></div>
<div class="panel"><h4>Material</h4><p>Chalecos para todos, bengalas en vigor, extintores con el manómetro en verde, achique, luces, VHF.</p></div>
<div class="panel"><h4>Plan</h4><p>Dejar dicho en tierra a dónde vas, con quién y cuándo piensas volver.</p></div>
</div>
<p>Con la náutica de recreo muy estacional y largos periodos sin usar el barco, conviene una <b>lista de comprobación</b> el primer día y buena parte de ella antes de cada salida. Muchas de las asistencias de Salvamento cada verano se evitarían así.</p>
<div class="tablewrap"><table>
<tr><th>Qué</th><th>Qué comprobar</th></tr>
<tr><td class="es">Meteorología</td><td><b>Prioridad absoluta</b>, mejor ya en casa: parte y previsión de la zona por la que vas a navegar.</td></tr>
<tr><td class="es">Sistema de gobierno</td><td>Poleas y guardines no se ven desde la bañera: revisarlos (se rompen alambres tras mucho uso con ola o en portantes). Es una avería muy frecuente. Saber dónde está la <b>caña de emergencia</b>, que se acopla directamente a la mecha, y que la tapa roscada de la mecha en cubierta esté engrasada para abrirla rápido.</td></tr>
<tr><td class="es">Aceite</td><td>Comprobar el nivel y rellenar si hace falta; el nivel máximo es la cantidad adecuada.</td></tr>
<tr><td class="es">Filtro decantador</td><td>Separa el agua del gasoil <b>por gravedad</b> (el agua, más densa, va al fondo) y retiene impurezas. El agua es el peor enemigo del motor. Su tubo de cristal muestra el nivel de agua; se purga por un grifo de fondo del vaso.</td></tr>
<tr><td class="es">Refrigeración</td><td>Líquido refrigerante en el circuito cerrado. <b>Grifo de fondo de toma de agua de mar abierto</b>: truco, al cerrarlo deja la llave de arranque colgada de su maneta. En náutica profesional se cierran todos los grifos de fondo al atracar con el motor parado.</td></tr>
<tr><td class="es">Correa del alternador</td><td>Tensión correcta: floja, resbala y no carga las baterías; muy apretada, gasta los rodamientos.</td></tr>
<tr><td class="es">Combustible</td><td>Cada día, suficiente para el plan. Quedarse sin combustible a la deriva es de las asistencias más frecuentes.</td></tr>
<tr><td class="es">Gases explosivos</td><td>Buena ventilación de sentinas y sala de máquinas (extractores). Bombonas de butano en compartimentos de la bañera aislados; revisar conductos y abrazaderas. Disolventes, pinturas y gasolina del auxiliar, en zonas ventiladas.</td></tr>
<tr><td class="es">Fugas de aceite o combustible</td><td>Revisar sentinas y cofres; secar y limpiar. En puerto está <b>prohibido achicar</b> agua de sentina con residuos.</td></tr>
<tr><td class="es">Electricidad</td><td>Carga de baterías con el <b>voltímetro</b>. Luces de navegación funcionando.</td></tr>
<tr><td class="es">VHF</td><td>Llamada de prueba al club náutico por el <b>canal 9</b> a mínima potencia (1 W), avisando «emisión en pruebas», para confirmar que se recibe «fuerte y claro».</td></tr>
<tr><td class="es">Elementos de seguridad</td><td>En buen estado: pirotecnia sin caducar, revisiones de extintores, balsa y radiobaliza. Enseñar a la tripulación dónde están, sobre todo los <b>chalecos</b>.</td></tr>
<tr><td class="es">Estanqueidad</td><td>Cerrar portillos y escotillas antes de zarpar según la mar que vayas a encontrar.</td></tr>
<tr><td class="es">Agua dulce</td><td>Una media de <b>3 litros por persona y día</b> previsto de navegación.</td></tr>
</table></div>
<p class="small muted">El patrón es el responsable absoluto del barco y de las personas. La seguridad tiene dos objetivos: evitar el accidente (barco y equipo en buen estado, revisar el material, meteorología antes y al menos una vez al día navegando, buena vigilancia) y, si ocurre, reducir sus consecuencias.</p>`],
["material","Material de seguridad por zonas (RD 339/2021)",`
<p>El <b>RD 339/2021</b> (en vigor desde el 1 de julio de 2021) regula el equipo de seguridad y de prevención de la contaminación según la <b>zona de navegación</b>. Se aplica a los barcos de recreo matriculados en España y también a los de cualquier bandera que naveguen por aguas españolas si sus propietarios o usuarios residen en España (para evitar abanderamientos de conveniencia). Con el PER puedes ir hasta 12 mn: zona 4 como máximo (zonas 2 y 3 con la habilitación a Baleares).</p>
<div class="tablewrap"><table>
<tr><th>Categoría de diseño (CE)</th><th>Viento máx.</th><th>Ola máx.</th><th>Zonas</th><th>Título</th></tr>
<tr><td class="es">A · oceánica</td><td>más de fuerza 8</td><td>más de 4 m</td><td>1 (sin límite)</td><td>Capitán de yate</td></tr>
<tr><td class="es">B · alta mar</td><td>hasta fuerza 8</td><td>hasta 4 m</td><td>2 (60 mn) · 3 (25 mn)</td><td>Patrón de yate (150 mn)</td></tr>
<tr><td class="es">C · aguas costeras</td><td>hasta fuerza 6</td><td>hasta 2 m</td><td>4 (12 mn) · 5 (5 mn de un abrigo) · 6 (2 mn)</td><td>PER · PNB · licencia de navegación</td></tr>
<tr><td class="es">D · aguas protegidas</td><td>hasta fuerza 3</td><td>hasta 0,3 m</td><td>7 (puertos, rías, bahías)</td><td>—</td></tr>
</table></div>
<p class="small">La categoría de diseño (Directiva 2013/53/UE) dice qué viento y ola aguanta el barco por cómo está construido; el RD la vincula a las zonas. Un barco sin marcado CE navega en la zona que le corresponda por su equipo, pero nunca con viento u ola por encima de su categoría. El propietario o patrón responde de que el barco pueda hacerse a la mar sin peligro, de no llevar más personas de las autorizadas y de que el equipo esté certificado (RD 701/2016 de equipos marinos: homologación <b>SOLAS</b> o <b>CE</b>; la norma <b>ISO</b> también sirve para homologar algunos equipos).</p>
<div class="widget"><div class="eyebrow">Interactivo · elige la zona</div>
<div class="seg" id="zoneBtns"></div>
<div class="grid2" style="margin-top:10px;align-items:center"><svg viewBox="0 0 300 180" id="zoneSvg" role="img" aria-label="Distancia de la zona a la costa"></svg><div id="zoneInfo"></div></div></div>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Límite</th><th>Bengalas de mano</th><th>Cohetes paracaídas</th><th>Fumígenas</th><th>Chaleco</th></tr>
${ZONES.map(z=>`<tr><td>${z.z}</td><td>${z.lim}</td><td>${z.bm||"—"}</td><td>${z.co||"—"}</td><td>${z.fu||"—"}</td><td>${z.ch}</td></tr>`).join("")}
</table></div>
<div class="grid3">
<div class="panel"><h4>Bengala de mano</h4><p>Luz roja ≈ 1 min. Se ve a unas 4 mn de día y 8 de noche. Se enciende <b>por sotavento</b>, con el brazo extendido y sin mirarla.</p></div>
<div class="panel"><h4>Cohete con paracaídas</h4><p>Sube ≈ 300 m y cae despacio ≈ 40 s. Visible a ≈ 16 mn de noche. Vertical, o a unos 45° si hay nubes bajas.</p></div>
<div class="panel"><h4>Señal fumígena</h4><p>Humo naranja ≈ 3 min. <b>Solo de día</b>. Se lanza al agua por sotavento.</p></div>
<div class="panel"><h4>Chalecos</h4><p>Uno por persona, con silbato y bandas reflectantes. Los automáticos se inflan al contacto con el agua: revisa la pastilla y la botella.</p></div>
<div class="panel"><h4>Aro salvavidas</h4><p>Con luz y rabiza flotante. Se lanza a barlovento del náufrago para que el viento se lo acerque.</p></div>
<div class="panel"><h4>Radiobaliza (RLS)</h4><p>Emite en 406 MHz por satélite (Cospas-Sarsat) la identidad y la posición. Las de zafa hidrostática se activan solas al hundirse.</p></div>
</div>
<div class="note"><b>Ojo en el examen.</b> Las pirotécnicas llevan fecha de caducidad: caducadas no cuentan como material válido. Los extintores deben tener eficacia mínima <b>34B</b> según el RD 339/2021 (los manuales antiguos dicen 21B). Para fuego de combustibles se usan de <b>polvo</b> o CO₂.</div>`],
["salvamento","Chalecos, arneses, aros y balsas",`
<h3>Chalecos salvavidas</h3>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Chalecos (100 % de las personas)</th><th>Equivale a</th></tr>
<tr><td>1</td><td><b>275 N</b> + un chaleco adicional</td><td>28,05 kgf</td></tr>
<tr><td>2–3 (Baleares) · 4 (PER)</td><td><b>150 N</b></td><td>15,3 kgf</td></tr>
<tr><td>5–6 (PNB)</td><td><b>100 N</b></td><td>10,2 kgf</td></tr>
</table></div>
<ul>
<li>Cada chaleco lleva <b>luz</b>; en zonas 4 a 7, si solo se navega de día, se puede prescindir de ella. Homologados (SOLAS o CE, aprobados por la DGMM).</li>
<li>Los <b>menores</b>, chaleco de su talla, mejor con cinchas por las piernas.</li>
<li>Deben poner boca arriba a una persona inconsciente en <b>5–10 segundos</b> y mantener la cabeza fuera del agua. La tripulación debe poder ponérselo sola en <b>menos de 1 minuto</b> (SOLAS). Estiba accesible y conocida por todos.</li>
<li>Los <b>hinchables</b> se revisan según el fabricante, en estaciones de servicio autorizadas.</li>
<li>1 newton ≈ 0,102 kilogramos-fuerza (kilopondio).</li>
</ul>
<h3>Arnés de seguridad</h3>
<p>No es obligatorio, pero es tan importante como el chaleco: el chaleco te mantiene a flote; el arnés evita que caigas al agua o que quedes separado del barco. Cinchas con una hebilla a la que va un cabo con mosquetones (los hay dobles, corto y largo, o integrados en el chaleco o el traje de agua). Se engancha a <b>puntos muy fuertes</b> o a <b>líneas de vida</b> de proa a popa por ambas bandas. Riesgo: ahogarse arrastrado si caes; se evita usando el tramo corto y no estando solo en cubierta. Nunca salir de la bañera solo, o sin avisar al compañero de guardia. Se estiba junto a los chalecos y se pone de noche o con mal tiempo.</p>
<h3>Aros salvavidas</h3>
<ul>
<li>Aro o herradura de polietileno <b>naranja</b>, con <b>luz</b> y <b>rabiza</b> flotante de polipropileno de al menos <b>30 m</b> (flota, sirve de asidero y no se enreda en la hélice). Conviene una bobina para que salga sin enredos.</li>
<li>Estibado a <b>popa</b>, con desestiba rápida. La luz es autoadrizable por el peso de las pilas: de noche es la principal guía para el rescate.</li>
<li>Zonas 1 a 4: un aro con luz y rabiza; en zona 1, además, otro aro sin luz ni rabiza. Zonas 5–6: no obligatorio.</li>
<li>Útiles: pértiga IOR extensible con bandera, y un respondedor de radar (<b>SART</b>) en el aro, que localiza náufragos y balsas.</li>
</ul>
<h3>Balsa salvavidas</h3>
<p>Obligatoria en <b>zonas 1, 2 y 3</b>, para todas las personas autorizadas a bordo; sus datos figuran en el certificado de navegabilidad. Revisión según el fabricante (barcos sin fines lucrativos, lista 7.ª) o cada <b>24 meses</b> como máximo (uso comercial, lista 6.ª); la primera, siempre en una estación autorizada.</p>
<div class="grid2">
<div class="panel"><h4>Equipo</h4><ul><li>Luz de litio (≈12 h)</li><li>Doble cámara de flotación y doble fondo aislante</li><li>Bolsas estabilizadoras (evitan el vuelco)</li><li>Ancla flotante</li><li>Escalera y rampa de acceso</li><li>Disparo: tú haces el 10 % y el gas el 90 %; puede dispararla un niño</li><li>Temperatura de hinchado adecuada a la zona</li></ul></div>
<div class="panel"><h4>Prestaciones</h4><ul><li>Rampa que aguanta 100 kg; escala con el peldaño inferior a ≥0,40 m bajo la flotación</li><li>Una persona puede adrizarla volcada</li><li>Remolcable a 3 nudos con carga completa</li><li>30 días a la intemperie</li><li>Toldo automático; dos entradas si es de más de 8 personas</li><li>Recoge agua de lluvia; soporte para respondedor de radar a 1 m</li><li>Si falla una cámara, el resto mantiene a flote a todos (75 kg por persona)</li><li>Se hincha en ≤1 min a 18–20 °C</li><li>Capacidad mínima: 4 personas (ISO) o 6 (SOLAS)</li></ul></div>
</div>`],
["balsauso","Balsa: estiba, lanzamiento y adrizado",`
<ul>
<li><b>Accesorios</b>: guirnaldas salvavidas (asideros) por dentro y por fuera; una <b>boza</b> de longitud al menos el doble de la distancia de la estiba a la flotación, para lanzarla sin que se dispare la apertura; lámpara exterior en el toldo (blanca, fija o de 50–70 destellos/min, ≥12 h, se enciende sola al montarse la balsa, pila activada por agua de mar o seca); lámpara interior (≥12 h, para leer las instrucciones).</li>
<li><b>Envoltorio</b>: <b>contenedor rígido</b> (más protección, se trinca en un soporte, con asas para botarlo) o <b>saco</b> plastificado anti-UV. El saco, en un sitio protegido y accesible donde nadie se siente ni lo pise; nunca se arrastra.</li>
<li><b>Estiba del contenedor</b>: en cubierta, en su varadero o sobre calzos, bien trincado pero fácil de lanzar, con una cincha o llanta y un tensor de gancho a un disparador fijo.</li>
<li><span class="es">Zafa hidrostática</span>: libera sola el contenedor si el barco se hunde, al llegar a unos <b>4 m</b> de profundidad (entre 1,5 y 4 m); la balsa sube a la superficie y se puede hinchar desde el barco. Caduca a los <b>dos años</b>.</li>
</ul>
<h3>Cómo lanzarla</h3>
<ol>
<li>Soltar las trincas y buscar una zona de cubierta con la vertical exterior despejada.</li>
<li>Hacer firme a bordo la <b>tira de disparo</b> (que es también la tira de unión con el barco) y lanzar el contenedor al agua.</li>
<li>Cobrar de la tira de disparo dando un <b>tirón fuerte</b> para abrir la válvula de inflado. Hinchada, acercarla al costado y embarcar.</li>
<li>Cortar la tira de unión con el <b>cuchillo</b> antes de que el barco se hunda, recoger a quien esté en el agua y alejarse.</li>
</ol>
<p><span class="es">Adrizado</span>: si se abre invertida, una sola persona puede darle la vuelta. Se sube por <b>sotavento</b> con los pies sobre la <b>botella de inflado</b> (el punto más pesado), agarrada a las cinchas de adrizado, de cara al viento, y se deja caer hacia atrás; el resto ayuda desde barlovento.</p>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Balsa (100 % de las personas)</th><th>Paquete de emergencia</th></tr>
<tr><td>1</td><td>SOLAS o equivalente</td><td><b>SOLAS A</b>: más de 60 mn, socorro en más de 24 h. Con comida (10.000 kJ por persona), agua (1,5 L por persona) y kit de pesca.</td></tr>
<tr><td>2–3</td><td>SOLAS, equivalente o ISO 9650</td><td><b>SOLAS B</b>: menos de 60 mn, socorro en menos de 24 h. <b>Sin agua, comida ni kit de pesca.</b></td></tr>
<tr><td>4–6</td><td>No obligatoria</td><td>—</td></tr>
</table></div>
<p class="small">El kit incluye, entre otras cosas: manual, tabla de señales de salvamento, botiquín, pastillas y bolsas para el mareo, bote de humo, bengalas, cohetes, ayuda térmica, reflector de radar, linterna estanca, remos flotantes, espejo de señales, kit de reparación, achicador, cuchillo, esponja, silbato, inflador, ancla de capa y anilla de rescate con cabo.</p>`],
["equipo","Pirotecnia, material náutico, extintores y achique",`
<h3>Señales pirotécnicas</h3>
<ul>
<li>Solo en emergencia. Siempre hacia <b>sotavento</b>, con el brazo por fuera del barco y nunca hacia una persona. Caducadas no sirven. Estiba en lugar seco, accesible y lejos del calor. Homologadas según el <b>RD 809/1999</b>. Conviene haber simulado su uso.</li>
<li>No dispararlas precipitadamente: primero asegúrate de que te pueden ver y decide entre cohete y bengala según distancia y condiciones.</li>
<li><b>Cohete con paracaídas</b>: de noche se ve a 8–16 mn, sube unos 300 m y dura unos 40 s. <b>Bengala de mano</b>: unas 8 mn de noche y 4 de día, dura 60 s. <b>Fumígena flotante</b>: solo de día; se lanza al agua, humo naranja al menos <b>3 minutos</b>, sin llama, y sigue humeando tras 10 s sumergida a 10 cm.</li>
</ul>
<p><b>Luces</b>: en zonas 4–7 y navegando solo de día, con eslora total &lt;12 m se admiten luces no homologadas visibles a 1 mn; con eslora &lt;7 m se puede llevar en su lugar una linterna de luz blanca.</p>
<h3>Material náutico por zonas</h3>
<div class="tablewrap"><table>
<tr><th>Material</th><th>Zonas</th><th>Notas</th></tr>
<tr><td class="es">Compás</td><td>1–4</td><td>Sin interferencias eléctricas; tablilla de desvíos en zonas 1–2, revisada cada 5 años</td></tr>
<tr><td class="es">Compás de marcaciones</td><td>1–2</td><td></td></tr>
<tr><td class="es">Sextante, cronómetro, diario de navegación</td><td>1</td><td></td></tr>
<tr><td class="es">Cartas y accesorios</td><td>1–4</td><td>Cartas y portulanos, regla, compás de puntas; derrotero, libro de faros y anuario de mareas (en aguas atlánticas)</td></tr>
<tr><td class="es">Manuales náuticos</td><td>1</td><td>Manual SMM, nomenclátor de costeras, Código internacional de señales, libro de radioseñales</td></tr>
<tr><td class="es">Tabla de señales de salvamento</td><td>1–7</td><td></td></tr>
<tr><td class="es">Bocina de niebla</td><td>1–7</td><td>Manual o de gas (con recambio); ≥20 m de eslora, también campana de ≥200 mm</td></tr>
<tr><td class="es">Prismáticos</td><td>1–4</td><td></td></tr>
<tr><td class="es">Barómetro · pabellón nacional · linterna estanca</td><td>1–2</td><td></td></tr>
<tr><td class="es">Código de banderas</td><td>1–7</td><td></td></tr>
<tr><td class="es">Reflector de radar</td><td>1–7</td><td>En cascos no metálicos</td></tr>
<tr><td class="es">Baldes contra incendios</td><td>2 en zonas 1–3 · 1 en 4–6</td><td>3 en zonas 1–2 si eslora &gt;20 m</td></tr>
</table></div>
<p><b>Material de armamento</b> (todas las zonas): <b>caña de emergencia</b> (veleros y barcos con intraborda), al menos <b>dos estachas</b> de amarre, <b>bichero</b>, remo con dispositivo de boga o un par de zaguales si mide menos de 8 m (no obligatorio pero muy recomendable), inflador y kit de pinchazos en neumáticas y semirrígidas. <b>Botiquín</b> tipo «balsas de salvamento» en zonas 1–4 (RD 258/1999), con su <b>Guía sanitaria</b>.</p>
<h3>Combustibles</h3>
<div class="tablewrap"><table>
<tr><th>Grupo</th><th>Qué es</th></tr>
<tr><td>1</td><td>Líquido con punto de inflamación <b>&lt;55 °C</b>: gasolina (motores de chispa)</td></tr>
<tr><td>2</td><td>Líquido con punto de inflamación <b>≥55 °C</b>: gasoil (motores de compresión)</td></tr>
<tr><td>3</td><td><b>GLP</b>: propano, butano…</td></tr>
</table></div>
<h3>Extintores</h3>
<ul>
<li>Al alcance de la mano, lejos de posibles focos, y toda la tripulación sabe dónde están y cómo se usan. Los de <b>polvo seco</b> son polivalentes (todo menos metales). Con instalación eléctrica de más de 50 V, uno apto para fuego eléctrico (CO₂ o polvo). Con motores de GLP, uno apto para gases.</li>
<li>Homologados por la DGMM o con la <b>marca del timón</b> (RD 809/1999). Al menos 2 kg de agente. <b>Revisión anual</b> por empresa autorizada (con tarjeta), <b>retimbrado a los 5, 10 y 15 años</b> y vida útil de <b>20 años</b>.</li>
<li>No obligatorio en fuerabordas de menos de 20 kW (27,2 CV) en zonas 6 y 7.</li>
<li><b>Uso</b>: quitar el seguro al llegar al fuego; extintor <b>vertical</b>; apuntar a la <b>base de las llamas</b>, de abajo arriba, sin acercarse a menos de unos 3 m. Dura alrededor de <b>1 minuto</b>: dosificarlo.</li>
</ul>
<div class="grid2">
<div class="panel"><h4>Según eslora</h4><ul><li>Cabina cerrada y &lt;10 m: 1 de 34B</li><li>10–15 m: 1 de 34B</li><li>15–20 m: 2 de 34B</li><li>20–24 m: 3 de 34B</li></ul></div>
<div class="panel"><h4>Según potencia</h4><ul><li>≤25 kW (36 CV): 1 de 34B (no en fueraborda)</li><li>25–220 kW: 1 de 34B</li><li>&gt;220 kW: capacidad total B = 0,3 × kW (250 kW → 75B → 3 de 34B)</li><li>1 kW = 1,36 CV. 21B ≈ 2 kg de polvo; 34B ≈ 3 kg de polvo o 5 kg de CO₂; 55B ≈ 4 kg de polvo</li></ul></div>
</div>
<p class="small">Barcos con marcado CE: lo que diga el manual del fabricante (que pueden pedirte). Sin marcado CE o con uso comercial: como mínimo las tablas. Sin CE y con motores de gasolina o GLP: <b>sistema fijo</b> de extinción en el compartimento del motor. Con instalación de gas en el interior: <b>detector de gases</b> con alarma luminosa y sonora. Compartimentos de gasolina sin CE: ventilación según norma; si el arranque es eléctrico, <b>forzada</b>, con una placa junto al arranque que recuerde <b>ventilar 4 minutos</b>. Los depósitos de gasolina no forman parte del casco y van protegidos del fuego.</p>
<h3>Achique</h3>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Bomba del motor u otra fuente</th><th>Bomba manual o eléctrica</th><th>Baldes</th></tr>
<tr><td>1, 2, 3</td><td>1</td><td>1</td><td>2 (&gt;5 L)</td></tr>
<tr><td>4, 5, 6</td><td>—</td><td>1</td><td>1 (&gt;5 L)</td></tr>
<tr><td>7</td><td>—</td><td>1</td><td>— (≤6 m con cámaras: un achicador de 2 L)</td></tr>
</table></div>
<p class="small">Veleros en zonas 1–6: al menos una bomba <b>manual y fija</b>, manejable desde la bañera con todo cerrado. Capacidad mínima (a ≥10 kPa): ≤6 m, 10 L/min; 6–12 m, 15 L/min; ≥12 m, 30 L/min; las manuales, con 45 emboladas por minuto. <b>Sanciones</b> (RD 339/2021): según eslora (hasta 7,5 m, 7,5–12 m, más de 12 m), desde 100 € por cada chaleco sin luz hasta 3.000 € por no llevar sistema fijo de extinción, detección de gases o ventilación.</p>`],
["maltiempo","Mal tiempo y tormentas",`
<figure><svg viewBox="0 0 600 190" role="img" aria-label="Capear y correr el temporal">
<defs><marker id="wv" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--sea)"/></marker></defs>
<g transform="translate(20 0)">
 <text x="130" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">CAPEAR</text>
 ${[50,90,130].map(y=>`<path d="M10 ${y} q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="var(--sea)" stroke-width="2"/>`).join("")}
 <line x1="250" y1="150" x2="250" y2="110" stroke="var(--sea)" stroke-width="3" marker-end="url(#wv)"/><text x="244" y="108" font-size="11" fill="var(--sea)" text-anchor="end">mar y viento</text>
 ${boatTop(130,120,60,200)}
 <text x="130" y="180" text-anchor="middle" font-size="11" fill="var(--muted)">proa a la mar, 1–2 cuartas abierta, poca máquina</text>
</g>
<g transform="translate(320 0)">
 <text x="130" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">CORRER EL TEMPORAL</text>
 ${[50,90,130].map(y=>`<path d="M10 ${y} q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="var(--sea)" stroke-width="2"/>`).join("")}
 <line x1="250" y1="150" x2="250" y2="110" stroke="var(--sea)" stroke-width="3" marker-end="url(#wv)"/>
 ${boatTop(130,105,60,10)}
 <text x="130" y="180" text-anchor="middle" font-size="11" fill="var(--muted)">popa a la mar, velocidad similar a la ola</text>
</g></svg></figure>
<ul>
<li>Si el parte anuncia mal tiempo, la mejor decisión es <b>no salir</b>.</li>
<li><span class="es">Capear</span>: aguantar el temporal amurado a la mar, por la proa ligeramente abierta (1–2 cuartas). A motor, con poca pero suficiente máquina para gobernar: los pantocazos son más suaves y se embarca menos agua. A vela, con la <b>mayor de capa</b>, amurado al viento y la ola, abatiendo sin avanzar; un velero solo capea si mar y viento le impiden avanzar con seguridad hacia donde quiere.</li>
<li><span class="es">Correr el temporal</span>: cuando ya no se puede mantener la proa a la mar, navegar de <b>aleta o popa</b>, avanzando con el oleaje y el viento. Hay riesgo de que el barco <b>se atraviese</b>: evitar las <b>guiñadas</b> y, si hace falta, largar cabos por la popa para frenarlo.</li>
<li><b>Nunca atravesarse a la mar</b>: es la máxima exposición. Olas de temporal de 4 m o más rompiendo en el costado pueden volcar el barco. Para dar la vuelta y poner la popa al temporal, hacerlo lo más rápido posible y aprovechando una <b>recalmada</b>.</li>
<li><span class="es">Ancla de capa</span>: saco de lona troncocónico con un aro de refuerzo (flotador arriba y lastre abajo para que quede vertical y sumergido), cuatro <b>pernadas</b> que acaban en una gaza para el cabo y una abertura en el vértice por donde sale el agua. Frena el barco con la proa o la popa a la mar y evita que se atraviese.</li>
<li><span class="es">Estiba y trinca a son de mar</span>: <b>estiba</b> es colocar ordenadamente enseres y víveres. Con mal tiempo, buscando la máxima estabilidad transversal y longitudinal, todo bien <b>trincado</b> (atado) y sin dejar cosas «empachadas» (que haya que mover otras para sacarlas). «A son de mar» = estibar, trincar y <b>arranchar</b> (limpiar y ordenar) con criterio.</li>
<li><b>Aberturas</b>: cerrar herméticamente portillos, escotillas y lumbreras (las de la sala de máquinas, según el tiempo, porque ventilan gases). Manguerotes con la boca a sotavento o directamente tapados (<b>censurados</b>). <b>Grifos de fondo cerrados</b> salvo los que estén trabajando (refrigeración del motor): aseos, fregaderos y achiques, cerrados.</li>
<li><span class="es">Derrota</span>: ruta para ir de un lugar a otro. Trazarla antes de zarpar, analizando peligros y distancia a la costa, dándoles resguardo y teniendo en cuenta corriente y viento.</li>
<li><b>Costa a sotavento</b>: evitarla. Si una avería te deja a la deriva hacia ella, orienta el barco para abatir menos (con bichero, remos, aletas…), fondea aunque el ancla no toque fondo para aproarte y frenar el abatimiento esperando que agarre, y pide auxilio por radio antes de que sea tarde.</li>
<li>Con mal tiempo: chalecos (y arneses) puestos, escotillas y portillos cerrados, objetos trincados, imbornales libres, situación tomada y comunicar el plan.</li>
<li><b>Tormenta eléctrica</b>: si todos los equipos tienen <b>toma de masa</b>, la descarga va al mar sin daños. Aun así, desconectar la electrónica y no tocar partes metálicas. En barcos de fibra y sobre todo de madera conviene un <b>pararrayos</b> en el tope del palo, o unir un obenque a masa con un cable al agua. Al acabar, comprobar el <b>desvío de la aguja</b>.</li>
</ul>`],
["visibilidad","Niebla, noche, tráfico y aguas someras",`
<p>La <b>visibilidad reducida</b> la causan niebla, lluvia, granizo o tormentas de arena. La <b>noche no</b> es visibilidad reducida, aunque es un agravante porque no se ven los perfiles de la costa. Con niebla la humedad es total, la procedencia de los sonidos se distorsiona y, sin radar, la tensión es máxima: es el <b>enemigo número uno</b> del marino.</p>
<div class="grid2">
<div class="panel"><h4>Con niebla</h4><ul><li>El mayor peligro es el <b>abordaje</b>, y el barco de recreo tiene las de perder.</li><li>Luces de navegación, señales fónicas reglamentarias, radar si lo hay.</li><li>Extremar la vigilancia y <b>reducir la velocidad</b>.</li><li>Al verla venir, asegurar la situación y trazar una derrota lejos de la costa y los peligros.</li><li>Suele pegarse a la costa y altera el color de las luces y la dirección de los sonidos.</li></ul></div>
<div class="panel"><h4>De noche</h4><ul><li>Vigilancia de los 360° del horizonte cada <b>≈5 minutos</b>: un mercante a 15 nudos visto a unas 5 mn puede estar encima en unos 15 minutos.</li><li>Guardia con <b>arnés</b>; no salir de la bañera sin estar atado y sin otro tripulante presente.</li><li>No dormirse; maniobra clara (cabos ordenados y sin cocas).</li><li>Navegación precisa, sabiendo siempre dónde estás.</li><li>Si un buque en rumbo de colisión no cambia su rumbo, llamarle por el <b>canal 16</b>.</li></ul></div>
</div>
<p><span class="es">Reflector de radar</span>: en lo más alto posible, da buen eco en los radares de otros barcos. Según el manual, obligatorio en barcos de casco <b>no metálico</b> en zonas 1 a 4, y muy aconsejable en todos. El clásico son tres láminas metálicas perpendiculares (ocho triedros); hoy los hay cilíndricos, igual de eficaces.</p>
<p><b>Tráfico marítimo</b>: se concentra en recaladas, entradas de puertos, canales, estrechos y cabos. Mantenerse lejos de las rutas, evitar los <b>dispositivos de separación de tráfico</b> usando la zona de navegación costera, vigilar los 360° y cumplir el RIPA sabiendo que tienes las de perder.</p>
<h3>Aguas someras</h3>
<p>Aguas poco profundas en las que puedes varar sin querer. Técnicamente, cuando la profundidad es <b>menor que la mitad de la longitud de la ola</b>. El barco «se sienta» (asentamiento), gobierna peor y aumenta su calado efectivo.</p>
<ol>
<li>Reducir la velocidad, más cuanto menos fondo.</li>
<li>Estudiar la carta y localizar bajos y piedras que velan.</li>
<li>Sonda encendida y un tripulante «cantando» las profundidades.</li>
<li>Marcar en la carta un <b>veril de seguridad</b> que no se cruce, y demoras de seguridad.</li>
<li>Tener lista la maniobra de fondeo.</li>
<li>Un vigía en lo más alto (el palo en un velero) buscando bajos, rompientes o cambios de color del agua.</li>
</ol>`],
["mob","Hombre al agua",`
<div class="widget"><div class="eyebrow">Interactivo · las dos maniobras</div>
<div class="row"><button class="btn sm" id="mobA">Ver Anderson</button><button class="btn sm ghost" id="mobW">Ver Boutakow</button><span class="small muted" id="mobT"></span></div>
<figure><svg viewBox="0 0 300 340" id="mobSvg" role="img" aria-label="Trayectoria de la maniobra de hombre al agua" style="max-height:340px">
<rect width="300" height="340" fill="var(--water)" rx="8"/>
<path id="pA" d="${pathA}" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-dasharray="6 4" opacity=".25"/>
<path id="pW" d="${pathW}" fill="none" stroke="var(--sea)" stroke-width="2.4" stroke-dasharray="6 4" opacity=".25"/>
<g><circle cx="146" cy="258" r="7" fill="var(--warn)"/><circle cx="146" cy="258" r="12" fill="none" stroke="var(--warn)" stroke-width="2"/><text x="132" y="262" font-size="11" text-anchor="end" fill="var(--ink)">náufrago</text></g>
<g id="mobBoat"><path d="M0 -12 C 7 -5, 7 4, 5 12 L -5 12 C -7 4, -7 -5, 0 -12 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5"/></g>
</svg></figure></div>
<p>Prevenir es la clave: en 20 segundos un náufrago es casi invisible desde la bañera, y de noche desaparece al instante. La cabeza puede no verse ni a 100 m.</p>
<div class="panel"><h4>Prevención</h4><ul><li>Moverse lo mínimo fuera de la bañera y nunca solo.</li><li>Dos líneas de vida, una por banda, de proa a popa.</li><li>Arneses para al menos el <b>50 %</b> de la tripulación; obligatorios con tiempo fresco, de noche y en maniobras en cubierta.</li><li>Cubierta iluminada de noche al maniobrar; antideslizante y candeleros fuertes.</li><li>«Una mano para el barco y otra para ti».</li></ul></div>
<ol>
<li><b>Dar la voz</b> «¡hombre al agua por estribor/babor!», lanzar el <b>aro</b>, poner a alguien de <b>vigía</b> señalándolo sin perderlo de vista y pulsar <b>MOB</b> en el GPS.</li>
<li>Meter el timón <b>a la banda por la que cayó</b>: así la popa y la hélice se separan del náufrago.</li>
<li><b>Anderson</b>: mantener el timón a esa banda y describir un giro de unos <b>270°</b> hasta tenerlo por la proa. Es la más rápida; se usa cuando se le ve.</li>
<li><b>Boutakow</b> (o Williamson): timón a la banda de caída hasta caer <b>unos 60–70°</b>, después todo a la banda contraria hasta llegar al <b>rumbo opuesto</b>. Se vuelve por la propia estela: sirve de noche o con mala visibilidad.</li>
<li>Si le ves, <b>para el barco</b> enseguida (un barco de recreo maniobra bien) y acércate con poca arrancada, recibiendo el viento por la amura y quedando <b>a barlovento</b> del náufrago: el barco no se aleja y le protege con el casco. Luego te dejas caer hasta él. Valora si con mucha mar la aproximación por barlovento es peligrosa.</li>
<li>Si no se puede maniobrar enseguida, anota <b>posición y hora</b>. Si no se le recupera casi sobre la marcha: <b>alerta LSD en el canal 70</b> con el código <b>110 «Man over board»</b> o llamada de urgencia <b>PAN PAN</b>.</li>
<li>La tecla <b>MOB</b> del GNSS memoriza posición, fecha y hora; volviendo a pulsarla da rumbo y distancia a ese punto. El <b>respondedor de radar</b> lanzado en los primeros segundos es de los apoyos más fiables.</li>
<li>Si no se le ve, a partir de la posición inicial: <b>espiral cuadrada</b> (cuadrados concéntricos desde el datum; precisa, para áreas pequeñas) o <b>exploración por sectores</b> (tramos iguales de ≈1 mn, giros de <b>120° a estribor</b>; al acabar, se gira el primer sector <b>30°</b> a estribor y se repite; cuando se sabe más o menos dónde está).</li>
<li><b>Recogida</b>: con mucha mar, largar cabos para que se agarre; escala en la banda o la de baño. Si está inconsciente, se tira otro tripulante bien equipado. En un velero, un aparejo de poleas en una driza es lo mejor para izarlo.</li>
</ol>
<h3>Hipotermia y reanimación</h3>
<div class="tablewrap"><table>
<tr><th>Agua</th><th>Supervivencia</th></tr>
<tr><td>&lt;2 °C</td><td>&lt;45 min</td></tr><tr><td>2–5 °C</td><td>≈1 h</td></tr><tr><td>5–10 °C</td><td>&lt;3 h</td></tr><tr><td>10–15 °C</td><td>&lt;7 h</td></tr><tr><td>15–20 °C</td><td>&lt;16 h</td></tr><tr><td>&gt;20 °C</td><td>indefinida</td></tr>
</table></div>
<ul>
<li>Influyen la temperatura del agua, el viento, la corpulencia, la edad y la obesidad. <b>Moverse en el agua hace perder calor.</b></li>
<li>Hipotermia por debajo de <b>35 °C</b>: cansancio, falta de coordinación, aturdimiento, habla torpe, desorientación. Bajo <b>31 °C</b>, pérdida de conocimiento, pupilas dilatadas, pulso débil e irregular. Bajo <b>30 °C</b>, difícil saber si está vivo.</li>
<li>Con ≤34 °C y síntomas: comprobar pulso y pupilas, respiración artificial y, sin pulso, masaje cardíaco.</li>
<li><b>Si respira</b>: abrigarlo, ponerlo a resguardo y en <b>posición lateral</b>, calor (botellas de agua, toallas calientes) en <b>cuello, ingles y axilas</b>, bebidas calientes sin alcohol, y vigilarlo.</li>
<li><b>Si no respira</b> ni da signos de vida: avisar al <b>Radiomédico</b> (913 103 475), a Salvamento (900 202 202) o al 112, e iniciar <b>RCP</b>: <b>30 compresiones y 2 insuflaciones</b>, a <b>100 compresiones por minuto</b>, manos entrelazadas en el centro del pecho y brazos rectos. Si eres el único o dudas, solo masaje. Para el boca a boca: cabeza hacia atrás, tapar la nariz, sujetar la mandíbula. Hasta que llegue ayuda o haya signos de vida, unos 30–40 min (más si hay hipotermia).</li>
</ul>
<div class="note"><b>Ojo.</b> El manual habla de calentar al náufrago «friccionándole». Las pautas actuales de primeros auxilios desaconsejan frotar las extremidades de una persona con hipotermia: mejor quitarle la ropa mojada y calentar el tronco poco a poco.</div>`],
["remolque","Remolque y auxilio",`
<p><span class="es">Remolque</span>: la línea de cabo que une remolcador y remolcado. Se pide por cualquier avería de gobierno o máquina que impida seguir el rumbo.</p>
<ul>
<li><b>Cabo</b>: fibra sintética; las amarras van bien por su elasticidad, que absorbe los <b>estrechonazos</b> (tirones), el principal problema. También ayudan un ramal de cadena bajo el agua, un remolque muy largo o un ancla en el centro del remolque. Mena y puntos de fijación, con resistencia adecuada.</li>
<li><b>Longitud</b>: según la mar, para que los dos barcos estén <b>a la vez en la cresta o en el seno</b> de la ola.</li>
<li><b>Aproximación</b>: el que da la guía, sea remolcador o remolcado, se pone <b>a barlovento</b> para que el viento acerque el cabo. Si cuesta, se ata una boya al extremo y se describe un semicírculo a barlovento del remolcado largando cabo.</li>
<li><b>Fijación</b>: en puntos muy fuertes de <b>proa del remolcado</b> (cornamusas), guiado por los guía-cabos para que tire desde la crujía. El remolcador lo fija a <b>popa</b>, con un aparejo que salve las hélices si son exteriores, tirando por su eje longitudinal.</li>
<li><b>Inicio y fin</b>: templar a muy baja velocidad y subir revoluciones poco a poco; al parar, igual de progresivo, para que no quede seno flojo que se enrede en la hélice ni se aborde al remolcado.</li>
<li><b>Gobierno</b>: el remolcado intenta que el cabo llame lo más de popa posible, en línea con la crujía, metiendo timón a la banda <b>contraria</b> a la que cae el remolcador cuando éste cambia de rumbo, y <b>sigue sus aguas</b>. El remolcador decide la derrota, lejos de la costa, con cambios de rumbo suaves (±10°), velocidad constante y <b>nunca más de 10 nudos</b>. Si el remolcado tiene hélices, deben poder girar libres. Vigilar los roces. Con mar de proa fuerte puede haber que suspenderlo.</li>
<li><b>Abarloado</b>: solo con mar perfecta. Defensas en las dos bandas de contacto y aproximación por <b>sotavento</b>. Sin largos, los <b>esprines</b> son determinantes y los <b>traveses</b> impiden que se separen.</li>
</ul>
<h3>Salvamento Marítimo (SASEMAR)</h3>
<p>Organismo público creado en <b>1992</b> por la Ley de Puertos del Estado y de la Marina Mercante. Se encarga de búsqueda, rescate y salvamento; control y ayuda al tráfico; lucha contra la contaminación; remolques; y servicios complementarios (meteorología, avisos a los navegantes). Alerta 24 h, 365 días.</p>
<div class="key"><b>Cómo contactar.</b> Voz por el <b>canal 16</b> (socorro o urgencia), alerta LSD por el <b>canal 70</b>, móvil <span class="mono">900 202 202</span> o <span class="mono">112</span>.</div>`]
],
init(root){
  const es=$("#es",root),gh=$("#gh",root),sv=$("#stSvg",root);
  const up=()=>{const th=+es.value,g=+gh.value;$("#esV",root).textContent=th+"°";$("#gV",root).textContent=g<30?"baja":g<65?"media":"muy alta";
    const yM=70,yG=170-g*1.3,GM=yG-yM;const s=Math.sin(th*Math.PI/180);const GZ=(GM/40)*s;
    const cx=150,cy=140;const rot=-th;
    const sn=Math.sin(th*Math.PI/180),cs=Math.cos(th*Math.PI/180);const Cx=150-70*sn,Cy=178;const Mx=150-70*sn,My=140-70*cs;const Gx=150-(140-yG)*sn,Gy=140-(140-yG)*cs;
    const gz=GM*s;
    $("#stTxt",root).innerHTML=GM>0?`<span class="pass">Estable</span>: M por encima de G. Brazo adrizante GZ ≈ ${(GZ).toFixed(2)} (relativo)`:`<span class="fail">Inestable</span>: G por encima de M, el barco tiende a volcar.`;
    sv.innerHTML=`<rect x="0" y="120" width="300" height="120" fill="var(--water)"/><line x1="0" y1="120" x2="300" y2="120" stroke="var(--sea)" stroke-dasharray="5 4"/>
    <g transform="rotate(${rot} ${cx} ${cy})"><path d="M70 60 Q 70 190 150 205 Q 230 190 230 60 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/><line x1="150" y1="40" x2="150" y2="210" stroke="var(--muted)" stroke-dasharray="4 3"/>
    <circle cx="150" cy="${yG}" r="6" fill="var(--accent)"/><text x="158" y="${yG+4}" font-size="13" font-weight="700" fill="var(--accent)">G</text></g>
    <circle cx="${Cx}" cy="${Cy}" r="6" fill="var(--sea)"/><text x="${Cx+9}" y="${Cy+4}" font-size="13" font-weight="700" fill="var(--sea)">C</text>
    <line x1="${Cx}" y1="${Cy}" x2="${Mx}" y2="${My}" stroke="var(--sea)" stroke-width="2" stroke-dasharray="3 3"/><line x1="${Cx}" y1="${Cy}" x2="${Cx}" y2="${Cy-34}" stroke="var(--sea)" stroke-width="3"/><text x="${Cx-8}" y="${Cy-20}" font-size="11" fill="var(--sea)" text-anchor="end">empuje</text>
    <line x1="${Gx}" y1="${Gy}" x2="${Gx}" y2="${Gy+34}" stroke="var(--accent)" stroke-width="3"/><text x="${Gx+8}" y="${Gy+30}" font-size="11" fill="var(--accent)">peso</text>
    ${th>=3?`<circle cx="${Mx}" cy="${My}" r="5" fill="var(--ink)"/><text x="${Mx-10}" y="${My+4}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">M</text>`:""}
    <text x="10" y="20" font-size="12" fill="var(--muted)">Escora ${th}°</text>`};
  es.addEventListener("input",up);gh.addEventListener("input",up);up();
  const zb=$("#zoneBtns",root),zs=$("#zoneSvg",root),zi=$("#zoneInfo",root);
  const D=[999,60,25,12,5,2,0.4];
  zb.innerHTML=[1,2,3,4,5,6,7].map(z=>`<button class="btn sm ${z===4?"":"ghost"}" data-z="${z}" aria-pressed="${z===4}">Zona ${z}</button>`).join("");
  const showZ=z=>{const Z=ZONES[z-1];$$("button",zb).forEach(b=>{const on=+b.dataset.z===z;b.classList.toggle("ghost",!on);b.setAttribute("aria-pressed",on)});
    const w=z===1?280:Math.max(14,Math.min(270,Math.log(D[z-1]+1)/Math.log(61)*270));
    zs.innerHTML=`<rect width="300" height="180" fill="var(--water)" rx="8"/><rect x="0" y="0" width="22" height="180" fill="var(--land)"/><rect x="22" y="30" width="${w}" height="120" fill="var(--sea)" opacity=".22"/><line x1="${22+w}" y1="30" x2="${22+w}" y2="150" stroke="var(--sea)" stroke-width="2" ${z===1?'stroke-dasharray="6 4"':""}/><text x="${Math.min(22+w/2+10,240)}" y="96" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">${z===1?"sin límite":z===7?"puerto":D[z-1]+" mn"}</text><text x="6" y="20" font-size="11" fill="var(--ink)">costa / abrigo</text>${z>=5&&z<=6?'<text x="30" y="170" font-size="10" fill="var(--muted)">distancia a un puerto o abrigo</text>':""}`;
    zi.innerHTML=`<h3 style="margin-top:0">Zona ${Z.z}</h3><p class="muted">${Z.lim}</p><ul><li>Chaleco <b>${Z.ch}</b>, uno por persona, ${Z.z<=3?"con luz":"con luz (se puede prescindir de ella si solo navegas de día)"}</li><li>${Z.bm?Z.bm+" bengalas de mano":"Sin bengalas obligatorias"}</li>${Z.co?`<li>${Z.co} cohetes con paracaídas</li>`:""}${Z.fu?`<li>${Z.fu} fumígena${Z.fu>1?"s":""} flotante${Z.fu>1?"s":""}</li>`:""}${Z.balsa?"<li>Balsa salvavidas para todos</li>":""}${Z.aro?(Z.z===1?"<li>2 aros salvavidas: uno con luz y rabiza y otro sin ellas</li>":"<li>Aro salvavidas con luz y rabiza</li>"):""}</ul>${Z.z===4?'<p class="small" style="color:var(--accent)">Es el máximo con el PER (12 mn).</p>':""}`};
  zb.addEventListener("click",e=>{const b=e.target.closest("button");if(b)showZ(+b.dataset.z)});showZ(4);
  const boat=$("#mobBoat",root);let raf=0;
  const run=(id,label)=>{cancelAnimationFrame(raf);const p=$("#"+id,root);$("#pA",root).style.opacity=id==="pA"?1:.15;$("#pW",root).style.opacity=id==="pW"?1:.15;$("#mobT",root).textContent=label;
    const L=p.getTotalLength();let t0=null;const dur=5200;
    const step=ts=>{if(!t0)t0=ts;const k=Math.min(1,(ts-t0)/dur);const a=p.getPointAtLength(k*L),b=p.getPointAtLength(Math.min(L,k*L+1));const ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+90;boat.setAttribute("transform",`translate(${a.x} ${a.y}) rotate(${ang})`);if(k<1)raf=requestAnimationFrame(step)};
    raf=requestAnimationFrame(step)};
  $("#mobA",root).addEventListener("click",()=>run("pA","Anderson: un solo giro de ≈270° hacia la banda de caída."));
  $("#mobW",root).addEventListener("click",()=>run("pW","Boutakow: 60–70° a una banda, luego toda a la otra hasta el rumbo opuesto."));
  boat.setAttribute("transform","translate(150 318)");
}};

/* ================= TEMA 4 · LEGISLACIÓN ================= */
const COAST=[
 ["playa","Zona de baño (playa)","<b>Balizada</b>: boyas cónicas amarillas a 200 m de la orilla y a menos de 200 m entre sí; dentro está <b>prohibido entrar y fondear</b> con cualquier embarcación o artefacto. <b>No balizada</b>: se entiende que la zona de baño son los <b>200 m</b> contiguos a la costa; dentro, <b>máximo 3 nudos</b>, y las motos náuticas solo pueden cruzarla perpendicularmente a la playa a menos de 3 nudos."],
 ["canal","Canal de entrada y salida","Pasillo de <b>25–50 m</b> de ancho, marcado con boyarines amarillos y, en su entrada, una boya lateral de babor y otra de estribor. Desde los 200 m hasta la costa se navega <b>perpendicular a tierra</b> y a <b>menos de 3 nudos</b>; si hay canal, es obligatorio usarlo. En él <b>no se puede bañar</b> nadie; sí pueden navegar balandros, auxiliares y artefactos flotantes."],
 ["costa","Resto de la costa (acantilado, rocas)","En la franja de <b>50 m</b> del litoral no se pueden hacer actividades deportivas o de recreo a más de <b>3 nudos</b>."],
 ["buceo","Bandera de buceo","Bandera <b>A (Alfa)</b> del Código Internacional (blanca y azul, en forma de corneta), o la <b>Bravo modificada</b> (roja con franja diagonal blanca). Salvo la embarcación de apoyo, hay que mantenerse a <b>50 m</b> como mínimo de la zona de buceo y reducir la velocidad."],
 ["fondeo","Fondeo","No fondear dentro de las zonas de baño balizadas, ni sobre posidonia, ni en canales o zonas prohibidas en la carta. En la Comunitat Valenciana fondear sobre posidonia está prohibido (Decreto 64/2022)."]
];
function coastSVG(){
  return `<svg viewBox="0 0 600 260" role="img" aria-label="Límites de navegación junto a la costa">
  <rect width="600" height="260" fill="var(--water)"/>
  <path d="M0 0 L600 0 L600 40 Q 520 60 460 46 L 420 44 L 400 30 L 0 30 Z" fill="var(--land)" stroke="var(--ink)"/>
  <path d="M400 30 L420 44 L460 46 Q 520 60 600 40 L600 0 L400 0Z" fill="var(--muted)" opacity=".4"/>
  <g class="hot cz" data-id="playa" tabindex="0" role="button" aria-label="Zona de baño"><rect class="hl" x="0" y="30" width="330" height="96" fill="var(--yellow)" opacity=".22" stroke="var(--warn)" stroke-dasharray="6 4"/>
   ${[20,80,140,200,260,320].map(x=>`<circle cx="${x}" cy="126" r="5" fill="var(--yellow)" stroke="var(--ink)"/>`).join("")}<text x="20" y="80" font-size="13" font-weight="700" fill="var(--warn)">ZONA DE BAÑO · 200 m</text></g>
  <g class="hot cz" data-id="canal" tabindex="0" role="button" aria-label="Canal"><rect class="hl" x="340" y="30" width="44" height="110" fill="var(--sea)" opacity=".18" stroke="var(--sea)"/>${[50,80,110,140].map(y=>`<circle cx="340" cy="${y}" r="4" fill="var(--red)"/><circle cx="384" cy="${y}" r="4" fill="var(--green)"/>`).join("")}<text x="362" y="160" font-size="11" text-anchor="middle" fill="var(--sea)" font-weight="700">canal</text></g>
  <g class="hot cz" data-id="costa" tabindex="0" role="button" aria-label="Costa"><path class="hl" d="M400 30 L420 44 L460 46 Q 520 60 600 40 L600 80 Q 520 100 460 86 L 420 80 L 396 60Z" fill="var(--accent)" opacity=".18" stroke="var(--accent)" stroke-dasharray="5 3"/><text x="500" y="100" font-size="12" font-weight="700" fill="var(--accent)" text-anchor="middle">50 m · 3 nudos</text></g>
  <g class="hot cz" data-id="buceo" tabindex="0" role="button" aria-label="Buceadores"><circle class="hl" cx="500" cy="190" r="34" fill="none" stroke="var(--ink)" stroke-dasharray="4 3"/><line x1="500" y1="190" x2="500" y2="160" stroke="var(--ink)" stroke-width="2"/><rect x="500" y="160" width="10" height="16" fill="#fff" stroke="var(--ink)"/><path d="M510 160 L530 160 L522 168 L530 176 L510 176 Z" fill="#2a62c9" stroke="var(--ink)"/><text x="500" y="240" font-size="11" text-anchor="middle" fill="var(--ink)">buceadores · 50 m</text></g>
  <g class="hot cz" data-id="fondeo" tabindex="0" role="button" aria-label="Fondeo"><ellipse class="hl" cx="200" cy="205" rx="80" ry="28" fill="var(--green)" opacity=".28" stroke="var(--green)"/><text x="200" y="210" font-size="11" text-anchor="middle" fill="var(--green)" font-weight="700">posidonia: no fondear</text></g>
  <text x="10" y="20" font-size="12" font-weight="700" fill="var(--ink)">PLAYA</text><text x="590" y="20" font-size="12" font-weight="700" fill="var(--ink)" text-anchor="end">ACANTILADO</text>
  </svg>`;
}
CH[4]={
intro:"Dos preguntas. Casi siempre caen límites de velocidad junto a la costa, buceadores, protección del medio marino y atribuciones de los títulos. Son números fijos: memorízalos.",
sections:[
["costa","Navegar cerca de la costa",`
<div class="widget"><div class="eyebrow">Interactivo · toca cada zona</div><figure>${coastSVG()}</figure><div class="info" id="czInfo">Toca una zona del dibujo.</div></div>
<div class="key"><b>Los números.</b> 200 m de las playas, 50 m del resto de la costa, 3 nudos, canales de 25–50 m de ancho, <b>50 m</b> de los buceadores.</div>
<h3>Reservas marinas</h3>
<p>Para estar en ellas hacen falta permisos y, en todo caso, está prohibido: <b>fondear</b> (sí se puede amarrar a las boyas habilitadas), navegar a motor salvo para acercarse a las boyas a <b>menos de 3 nudos</b>, la <b>pesca recreativa</b> en todas sus modalidades, el buceo sin licencia, recoger organismos, flora y fauna sin autorización, los deportes náuticos a motor y las actividades submarinas a motor sin autorización.</p>`],
["puerto","En puerto y cerca del tráfico",`
<p>En cada puerto, la Autoridad Portuaria, de acuerdo con la Autoridad Marítima, publica un <b>Reglamento de Policía de Puerto</b>. Normas comunes:</p>
<div class="grid2">
<div class="panel"><h4>Dentro del puerto</h4><ul>
<li>Práctico obligatorio para buques de más de <b>500 TRB</b>.</li>
<li>Los que <b>salen</b> tienen preferencia sobre los que entran; en las entradas se navega por la <b>derecha</b>.</li>
<li>Todo buque que entra arbola el pabellón nacional.</li>
<li>Atender al Capitán Marítimo; no fondear ni detenerse donde se corte el paso.</li>
<li>Entrar despacio, a <b>menos de 3 nudos</b>, sin levantar oleaje.</li>
<li>Defensas al atracar, escalas bien afirmadas, limpieza, reforzar amarras con temporal.</li>
<li>No tirar basura ni verter gasoil o residuos; <b>no pescar ni bañarse</b>; no lastrar ni deslastrar tanques.</li>
<li>Ayudar a otros barcos en maniobra si procede.</li></ul></div>
<div class="panel"><h4>Con el tráfico marítimo</h4><ul>
<li>Alejarse de las derrotas de buques, remolcadores, dragas, pasaje y prácticos, sin estorbar su maniobra y navegando lo más cerca posible del límite exterior del canal, por su <b>estribor</b>.</li>
<li>Siempre con el título adecuado y en las zonas que permite.</li>
<li>Evitar rías y afluentes en horas de riada o con corriente fuerte.</li>
<li>Dar resguardo a un barco parado: suele haber bañistas.</li>
<li>Prohibida la pesca deportiva a barlomar de almadrabas o viveros.</li>
<li>Respetar las zonas de seguridad de refinerías y boyas de carga y descarga de combustible.</li></ul></div>
</div>`],
["buzos","Buzos y bañistas",`
<p>Fuera de las zonas anteriores, vigila cerca de la costa para ver a tiempo a bañistas y buceadores. Salvo su propia embarcación de apoyo, todo barco se mantiene a <b>50 m</b> como mínimo de la zona de buceo y actúa según el RIPA, teniendo en cuenta su tipo y su velocidad.</p>
<div class="grid2">
<div class="panel"><h4>Bandera Alfa (A)</h4><p>Del Código Internacional de Señales. Es la que deben usar en España las embarcaciones dedicadas a actividades subacuáticas. Izada sola significa: «<b>tengo un buzo sumergido, manténgase alejado de mí y a poca velocidad</b>». También se lleva en boyarines cuando el buceador nada lejos de un barco.</p></div>
<div class="panel"><h4>Bravo modificada</h4><p>Roja con una franja <b>diagonal blanca</b> («la roja» o «la internacional»). Mismo significado que la Alfa. La diseñó Ruth Dockery, esposa de un buceador de la US Navy, hacia 1950, a partir de la bandera B (roja, «cargo o transporto mercancías peligrosas»). En España <b>no tiene cobertura legal</b>, pero se tolera y es la más usada en el mundo.</p></div>
</div>`],
["titulos","Títulos y atribuciones",`
<div class="tablewrap"><table>
<tr><th>Título</th><th>Eslora</th><th>Distancia</th><th>Notas</th></tr>
<tr><td>Licencia de navegación</td><td>Hasta 6 m (motor o vela) y motos náuticas</td><td>2 mn de un puerto, diurna</td><td>Curso práctico corto, sin examen</td></tr>
<tr><td>PNB · Patrón de Navegación Básica</td><td>Hasta 8 m (y motos náuticas)</td><td>5 mn de un abrigo, diurna</td><td></td></tr>
<tr><td><b>PER</b></td><td><b>Hasta 15 m</b> a motor (vela con habilitación)</td><td><b>12 mn</b> de la costa, también de noche; navegación interinsular en Baleares y Canarias</td><td>Motos náuticas. Con prácticas extra: hasta 24 m y travesía Península–Baleares</td></tr>
<tr><td>Patrón de Yate</td><td>Hasta 24 m</td><td>150 mn de la costa</td><td></td></tr>
<tr><td>Capitán de Yate</td><td>Hasta 24 m</td><td>Sin límite</td><td></td></tr>
</table></div>
<p>Una <b>embarcación de recreo</b> es la de 2,5 a 24 m de eslora destinada a uso deportivo o de ocio. En el registro, la <b>lista 7ª</b> es la de las de uso particular sin ánimo de lucro y la <b>6ª</b> la de las que se explotan comercialmente (chárter).</p>
<h3>Documentación a bordo</h3>
<ul><li>Certificado de registro (o permiso de navegación) y certificado de navegabilidad.</li><li><b>Seguro obligatorio</b> de responsabilidad civil.</li><li>Título del patrón y DNI.</li><li>Licencia de estación radio si lleva VHF.</li><li>Rol o lista de tripulantes cuando corresponda.</li></ul>`],
["medio","Protección del medio marino",`
<div class="grid2">
<div class="panel"><h4>Basuras · MARPOL Anexo V</h4><p>Descarga <b>prohibida por defecto</b>. <b>Plásticos, nunca</b>. En el Mediterráneo (zona especial) solo restos de comida, a más de <b>12 mn</b>. Todo lo demás se entrega en el puerto (RD 128/2022).</p></div>
<div class="panel"><h4>Aguas sucias (negras)</h4><p>Desmenuzadas y desinfectadas: a más de <b>3 mn</b> de la línea de base. Sin tratar: a más de <b>12 mn</b>. Las retenidas, poco a poco y navegando a <b>≥4 nudos</b>. Con planta de tratamiento homologada, fuera de la zona 7. En <b>zona 7</b> (puertos, rías, bahías) <b>ninguna descarga</b>, ni tratada.</p></div>
<div class="panel"><h4>Hidrocarburos</h4><p>Ni una gota de aceite o combustible. Al repostar, tapar imbornales y tener absorbentes. El agua de sentina sucia se entrega en puerto.</p></div>
<div class="panel"><h4>Obligación de informar</h4><p>El patrón debe avisar de cualquier vertido o mancha que vea a Salvamento Marítimo o a Capitanía.</p></div>
</div>
<p>Los barcos de recreo cumplen los anexos <b>I</b> (hidrocarburos), <b>V</b> (basuras) y <b>VI</b> (atmosférica) del <b>MARPOL</b> (1973).</p>
<h3>Aguas sucias: equipos (barcos sin marcado CE)</h3>
<ul>
<li>Construidos para evitar descargas accidentales. Con inodoro, uno de estos: <b>tanque de retención</b> (con indicador de que supera los <b>3/4</b>), <b>planta de tratamiento</b> certificada (RD 701/2016 u homologada por la Administración), o <b>sistema que desmenuza y desinfecta</b> con almacenamiento temporal.</li>
<li>Referencia para el tanque: personas autorizadas × <b>4 L por persona y día</b> × <b>2 días</b>. 8 personas → 64 L.</li>
<li>Tanque fijo con <b>conexión universal</b> a tierra. Conductos de descarga al mar con <b>válvulas</b> que cierren herméticamente y se puedan precintar.</li>
<li>Excepciones: descarga necesaria para la seguridad del barco o para salvar vidas, y la que resulte de una avería si se tomaron todas las precauciones razonables. Si van mezcladas con otros residuos, se aplica además la norma de esos residuos.</li>
<li>Sanciones por equipos de aguas sucias: <b>500–3.000 €</b> (RD 339/2021).</li>
</ul>
<h3>Basuras (MARPOL anexo V)</h3>
<ul>
<li><b>Prohibido siempre</b> echar plásticos (cabos, redes sintéticas, bolsas de basura).</li>
<li><b>Mediterráneo, mar Rojo, mar Negro y otros</b> (zonas especiales): prohibidas todas las basuras; solo <b>restos de comida</b>, lo más lejos posible y <b>nunca a menos de 12 mn</b>. Si se mezclan residuos, manda la norma más estricta.</li>
<li>Fuera de zonas especiales, el manual da: tablas, forros y embalajes que flotan a más de <b>25 mn</b>; comida y demás basuras a más de <b>12 mn</b>; trituradas (malla ≤25 mm) a más de <b>3 mn</b>.</li>
<li>Lo que no se puede tirar se guarda a bordo y se entrega en puerto en una instalación MARPOL.</li>
</ul>
<div class="note"><b>Ojo.</b> Las distancias de 25 mn y 3 mn para papel, trapos, vidrio o metal son del anexo V anterior a 2013. Desde la revisión de 2013, fuera de las zonas especiales solo se pueden descargar restos de comida (más de 12 mn, o más de 3 mn triturados). Para el examen en el Mediterráneo: <b>solo comida, a más de 12 mn</b>.</div>
<h3>Entrega de desechos en puerto</h3>
<p>El manual describe el <b>RD 1381/2002</b> (hoy sustituido por el <b>RD 128/2022</b>, con la misma idea): el puerto tiene un plan de recepción; el patrón de un barco de recreo de hasta 12 pasajeros rellena una <b>notificación reducida</b>; con base en un puerto español se justifica <b>cada año</b> la entrega ante Capitanía (recibo anual de la instalación); viniendo del extranjero, al llegar al primer puerto español. Todo buque entrega sus desechos antes de salir, salvo autorización de Capitanía por tener capacidad suficiente hasta el siguiente puerto.</p>
<h3>Responsabilidad y avistamiento</h3>
<p>De la contaminación desde buques responden <b>solidariamente</b> el naviero, el propietario, el asegurador de responsabilidad civil y el <b>capitán</b>, y están obligados a reparar el daño (Ley de Puertos y Marina Mercante, art. 310.2.d). Si ves un vertido de hidrocarburos: <b>en puerto</b>, avisa enseguida a la Autoridad Marítima con todos los datos (barco, sustancia, viento…); <b>en la mar</b>, al Centro de Coordinación de Salvamento o al <b>900 202 202</b>.</p>
<ul>
<li><b>Reservas marinas</b>: limitan fondeo, pesca y buceo. En tu zona: <b>islas Columbretes</b> (también ZEPIM, frente a Castellón), Tabarca (Alicante; reserva marina pero <b>no ZEPIM</b>), Cabo de San Antonio. Otras: Cabo de Gata, Cabrera, islas Medes.</li>
<li>Respeta las <b>distancias a cetáceos</b>: no acercarse a menos de 60 m, sin cortarles el paso ni separar a las crías, y a velocidad reducida (RD 1727/2007).</li>
</ul>`],
["espacios","Espacios naturales: ZEPIM y posidonia",`
<p><b>Causas de la agresión al medio marino</b>: más población y urbanización del litoral (sobre todo en el Mediterráneo), consumo y residuos, obras costeras (puertos, espigones, marinas, cambios en las playas), vertidos y mareas negras, y sobrepesca con artes poco selectivas (deriva, arrastre). Cada vez cuesta más construir o ampliar puertos deportivos por su impacto.</p>
<p>El Mediterráneo recibe mucho de lo que traen ríos y ramblas: <b>dos tercios</b> de su contaminación vienen de tierra, y recibe el <b>20 %</b> de los vertidos mundiales de hidrocarburos.</p>
<h3>ZEPIM</h3>
<p><b>Zonas Especialmente Protegidas de Importancia para el Mediterráneo</b>. Nacen del Protocolo de 1995 del <b>Convenio de Barcelona</b>. Objetivo: mejorar el estado natural del mar con áreas protegidas y proteger especies amenazadas. Para entrar en la lista, la zona ya debe tener alguna protección, ecosistemas mediterráneos típicos o hábitats de especies en peligro, e interés científico, estético o cultural. Suelen tener planes de gestión.</p>
<p>España es el país con más: <b>nueve</b>.</p>
<div class="tablewrap"><table>
<tr><th>ZEPIM</th><th>Comunidad</th></tr>
<tr><td>Isla de Alborán</td><td>Andalucía</td></tr>
<tr><td>Fondos marinos del Levante almeriense</td><td>Andalucía</td></tr>
<tr><td>Cabo de Gata-Níjar</td><td>Andalucía</td></tr>
<tr><td>Acantilados de Maro-Cerro Gordo</td><td>Andalucía</td></tr>
<tr><td>Cap de Creus</td><td>Cataluña</td></tr>
<tr><td>Illes Medes</td><td>Cataluña</td></tr>
<tr><td><b>Islas Columbretes</b></td><td>C. Valenciana</td></tr>
<tr><td>Archipiélago de Cabrera</td><td>Baleares</td></tr>
<tr><td>Mar Menor y costa oriental de Murcia</td><td>Murcia</td></tr>
</table></div>
<p class="small">Fuera de España hay otras cinco (Francia y Túnez) y el santuario de cetáceos del mar de Liguria (Francia, Italia y Mónaco).</p>
<h3>Posidonia oceanica</h3>
<ul>
<li>Es una <b>planta con flores, hojas y frutos</b>, no un alga. Vive a <b>menos de 50 m</b> de profundidad, donde llega la luz para la fotosíntesis.</li>
<li>Sus praderas (<b>algueros</b> o <b>alguers</b>) son la principal fuente de <b>oxigenación</b> del Mediterráneo y el hábitat de más de <b>400 especies vegetales y 1.000 animales</b>.</li>
<li>Las hojas secas en la playa frenan el oleaje, protegen de la erosión y fijan la arena: no son suciedad.</li>
</ul>`],
["normas","Otras normas que caen",`
<ul>
<li><b>Pabellón</b> (RD 2335/1980): todos los buques y embarcaciones, también los de recreo, llevan como único pabellón la bandera de España, en el <b>asta de popa</b> (o en el pico del palo mayor en veleros). Es obligatorio izarla a la vista de buques de guerra o fortalezas, al entrar y salir de puerto y, en puerto, <b>de sol a sol</b> los festivos o cuando lo ordene la autoridad, y en aguas extranjeras cuando lo pida la costumbre o la norma. Ninguna otra bandera puede ir izada sin ella, y su tamaño nunca supera <b>un tercio</b> del de la nacional. La autonómica, en puertos y aguas interiores, siempre junto a la nacional y con ese tamaño máximo.</li>
<li><b>Auxilio en la mar</b> (SOLAS cap. V, regla 33): el capitán que, pudiendo ayudar, sepa por cualquier fuente que hay personas en peligro, está obligado a acudir <b>a toda máquina</b> y avisar a ellas o al servicio de salvamento, sin importar su nacionalidad, condición jurídica ni circunstancias. Si no puede o considera que no es razonable o necesario, anota el motivo en el <b>diario de navegación</b> e informa a salvamento.</li>
<li><b>Puertos</b>: respetar su límite de velocidad (normalmente 3 nudos), no fondear en la bocana ni cortar el paso al tráfico comercial, y seguir las órdenes de la Capitanía.</li>
<li><b>Pesca recreativa</b>: necesita licencia autonómica; limitada en reservas y a distancia de las artes de pesca profesionales.</li>
<li><b>Alcohol y drogas</b>: prohibido gobernar bajo sus efectos; las sanciones siguen la Ley de Puertos y de la Marina Mercante.</li>
</ul>`]
],
init(root){
  const info=$("#czInfo",root);
  $$(".cz",root).forEach(g=>{const act=()=>{$$(".cz",root).forEach(x=>x.classList.toggle("on",x===g));const c=COAST.find(x=>x[0]===g.dataset.id);info.innerHTML=`<b>${c[1]}.</b> ${c[2]}`};g.addEventListener("click",act);g.addEventListener("keydown",e=>{if(e.key==="Enter")act()})});
}};
})();
(function(){
"use strict";
const {$,$$,CH,buoy,r,shuffle}=PER;

/* rhythm: list of [ms on, ms off]; color */
const RH={
 "Q":{c:"#fff",seq:[[300,700]],txt:"Centelleante continua: 60 destellos/min"},
 "VQ":{c:"#fff",seq:[[200,300]],txt:"Centelleante rápida: 120 destellos/min"},
 "Q(3) 10s":{c:"#fff",seq:[[300,700],[300,700],[300,7700]],txt:"3 centelleos cada 10 s"},
 "Q(6)+LFl 15s":{c:"#fff",seq:[[300,700],[300,700],[300,700],[300,700],[300,700],[300,700],[2000,7000]],txt:"6 centelleos + 1 destello largo cada 15 s"},
 "Q(9) 15s":{c:"#fff",seq:[[300,700],[300,700],[300,700],[300,700],[300,700],[300,700],[300,700],[300,700],[300,6700]],txt:"9 centelleos cada 15 s"},
 "Fl(2) 5s":{c:"#fff",seq:[[400,600],[400,3600]],txt:"Grupo de 2 destellos cada 5 s"},
 "Iso 4s":{c:"#fff",seq:[[2000,2000]],txt:"Isofase: luz y oscuridad de igual duración"},
 "LFl 10s":{c:"#fff",seq:[[2000,8000]],txt:"Destello largo (≥2 s) cada 10 s"},
 "Mo(A) 6s":{c:"#fff",seq:[[400,500],[1300,3800]],txt:"Morse «A» (· —) cada 6 s"},
 "Oc 4s":{c:"#fff",seq:[[3000,1000]],txt:"Ocultación: más luz que oscuridad"},
 "Fl R 4s":{c:"#ff3b30",seq:[[500,3500]],txt:"Destello rojo cada 4 s (babor)"},
 "Fl G 4s":{c:"#34c759",seq:[[500,3500]],txt:"Destello verde cada 4 s (estribor)"},
 "Fl(2+1) R 10s":{c:"#ff3b30",seq:[[400,600],[400,1600],[400,6600]],txt:"Grupo 2+1 rojo: canal principal a estribor"},
 "Fl(2+1) G 10s":{c:"#34c759",seq:[[400,600],[400,1600],[400,6600]],txt:"Grupo 2+1 verde: canal principal a babor"},
 "Fl Y 5s":{c:"#ffd60a",seq:[[600,4400]],txt:"Destello amarillo: marca especial"},
 "Al Bu Y":{c:"#4aa3ff",alt:"#ffd60a",seq:[[1000,500],[1000,500]],txt:"Azul 1 s y amarilla 1 s, con 0,5 s de oscuridad entre ambas: peligro nuevo"}
};
const MARKS=[
 /* name, bands, top, desc, rhythm, how to pass */
 ["Lateral de babor",["r"],"can-r","Roja, marca de tope <b>cilíndrica</b>. Entrando en puerto se deja por <b>babor</b>.","Fl R 4s","Entrando, déjala a tu izquierda."],
 ["Lateral de estribor",["g"],"cone-g","Verde, <b>cono</b> con el vértice hacia arriba. Entrando se deja por <b>estribor</b>.","Fl G 4s","Entrando, déjala a tu derecha."],
 ["Cardinal Norte",["b","y"],"NN","Negro sobre amarillo. Conos <b>hacia arriba</b>. Aguas seguras al <b>N</b> de la marca.","Q","Pásala por su Norte."],
 ["Cardinal Este",["b","y","b"],"EE","Negro-amarillo-negro. Conos <b>opuestos por las bases</b> (forma de rombo). Aguas seguras al <b>E</b>.","Q(3) 10s","Pásala por su Este."],
 ["Cardinal Sur",["y","b"],"SS","Amarillo sobre negro. Conos <b>hacia abajo</b>. Aguas seguras al <b>S</b>.","Q(6)+LFl 15s","Pásala por su Sur."],
 ["Cardinal Oeste",["y","b","y"],"WW","Amarillo-negro-amarillo. Conos <b>unidos por los vértices</b> (reloj de arena / «copa de vino»). Aguas seguras al <b>W</b>.","Q(9) 15s","Pásala por su Oeste."],
 ["Peligro aislado",["b","r","b"],"balls2","Negra con franjas rojas, <b>dos esferas negras</b>. Peligro pequeño con aguas navegables alrededor.","Fl(2) 5s","Pásala a distancia prudente, mejor por su sotavento si hace mal tiempo."],
 ["Aguas navegables",[["r","w","r","w"]],"ball","Franjas <b>verticales</b> rojas y blancas, <b>una esfera roja</b>. Aguas seguras: recalada, centro del canal.","LFl 10s","Puedes pasarla por cualquier lado."],
 ["Marca especial",["y"],"x","Amarilla, <b>aspa amarilla</b>. Señala zonas especiales: baño, cables, emisarios, ejercicios militares.","Fl Y 5s","Mira la carta para saber qué indica."],
 ["Peligro nuevo",[["bl","y","bl","y"]],"cross","Franjas verticales azules y amarillas, <b>cruz amarilla</b>. Peligro aún no cartografiado (un pecio reciente).","Al Bu Y","Trátala como el peligro más serio. Puede llevar racón «D»."],
 ["Canal principal a estribor",["r","g","r"],"can-r","Roja con franja verde (bifurcación). Cilindro rojo. Entrando, sigue el canal principal dejándola por <b>babor</b>.","Fl(2+1) R 10s","Canal preferido a estribor."],
 ["Canal principal a babor",["g","r","g"],"cone-g","Verde con franja roja. Cono verde. Entrando, sigue el canal principal dejándola por <b>estribor</b>.","Fl(2+1) G 10s","Canal preferido a babor."]
];

function lampRunner(el,code){
  let stop=false,i=0;const R=RH[code];
  const tick=()=>{if(stop)return;const [on,off]=R.seq[i%R.seq.length];const col=R.alt&&(i%2)?R.alt:R.c;el.style.fill=col;el.style.opacity=1;
    setTimeout(()=>{if(stop)return;if(off>0){el.style.opacity=.08}setTimeout(()=>{i++;tick()},off)},on)};
  tick();return()=>{stop=true;el.style.opacity=.08};
}

function cardinalSVG(){
  const c=160;let s=`<svg viewBox="0 0 320 320" role="img" aria-label="Sistema cardinal alrededor de un peligro">
  <rect width="320" height="320" fill="var(--water)" rx="10"/>
  <line x1="${c-120}" y1="${c-120}" x2="${c+120}" y2="${c+120}" stroke="var(--muted)" stroke-dasharray="5 4"/><line x1="${c+120}" y1="${c-120}" x2="${c-120}" y2="${c+120}" stroke="var(--muted)" stroke-dasharray="5 4"/>
  <circle cx="${c}" cy="${c}" r="32" fill="var(--land)" stroke="var(--ink)"/><text x="${c}" y="${c+4}" font-size="10" text-anchor="middle" fill="var(--ink)" font-weight="700">PELIGRO</text>`;
  const P=[["N",c,40,["b","y"],"NN"],["E",280,c,["b","y","b"],"EE"],["S",c,280,["y","b"],"SS"],["W",40,c,["y","b","y"],"WW"]];
  P.forEach(p=>{s+=`<g class="hot card" data-q="${p[0]}" tabindex="0" role="button" aria-label="Cardinal ${p[0]}"><g transform="translate(${p[1]-15} ${p[2]-30}) scale(.5)">${buoy(p[3],p[4]).replace('<svg viewBox="0 0 60 100" aria-hidden="true">','').replace('</svg>','')}</g><text x="${p[1]}" y="${p[2]+6}" dx="${p[0]==="E"?-34:p[0]==="W"||p[0]==="N"||p[0]==="S"?34:0}" text-anchor="middle" font-size="16" font-weight="700" class="lbl" fill="var(--ink)">${p[0]}</text></g>`});
  
  return s+`</svg>`;
}
function harbourSVG(){
  return `<svg viewBox="0 0 320 300" role="img" aria-label="Entrada a puerto con balizas laterales" id="hbSvg">
  <rect width="320" height="300" fill="var(--water)" rx="10"/>
  <path d="M0 0 L120 0 L120 70 L95 70 L95 20 L0 20Z" fill="var(--land)" stroke="var(--ink)"/>
  <path d="M320 0 L200 0 L200 70 L225 70 L225 20 L320 20Z" fill="var(--land)" stroke="var(--ink)"/>
  ${[110,170,230].map(y=>`<g transform="translate(108 ${y-28}) scale(.42)">${buoy(["r"],"can-r").replace(/<\/?svg[^>]*>/g,"")}</g><g transform="translate(187 ${y-28}) scale(.42)">${buoy(["g"],"cone-g").replace(/<\/?svg[^>]*>/g,"")}</g>`).join("")}
  <text x="160" y="40" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">PUERTO</text>
  <g id="hbBoat" transform="translate(160 255)"><path d="M0 -16 C 9 -6, 9 6, 7 16 L -7 16 C -9 6, -9 -6, 0 -16 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6"/></g>
  <text x="160" y="292" font-size="12" fill="var(--ink)" text-anchor="middle" id="hbTxt">Entrando: roja a babor, verde a estribor</text>
  </svg>`;
}

CH[5]={
intro:"Cinco preguntas y hace falta acertar tres. Es un tema cerrado y muy visual: en una tarde lo tienes. Aprende cada marca por su <b>forma, color, marca de tope y luz</b>, que es exactamente como lo pregunta el examen.",
sections:[
["region","IALA región A y sentido del balizamiento",`
<p>España está en la <b>región A de IALA</b> (Europa, África, casi toda Asia y Oceanía). En la <b>región B</b> (América, Japón, Corea, Filipinas) se invierten los colores laterales: allí la roja va a estribor al entrar.</p>
<p>El <span class="es">sentido convencional del balizamiento</span> es el de quien <b>entra en puerto viniendo de la mar</b> (o remonta un río). Cuando puede haber duda, la carta lo indica con una flecha magenta.</p>
<div class="widget"><div class="eyebrow">Interactivo · entrando y saliendo</div>
<div class="grid2" style="align-items:center"><figure style="margin:0">${harbourSVG()}</figure>
<div><div class="seg"><button class="btn sm" id="hbIn" aria-pressed="true">Entrando</button><button class="btn sm ghost" id="hbOut" aria-pressed="false">Saliendo</button></div>
<p class="small" style="margin-top:10px">Al <b>salir</b> de puerto todo se invierte: dejas las rojas por <b>estribor</b> y las verdes por babor. En el examen lee bien si el barco entra o sale.</p>
<div class="note"><b>Truco.</b> «Roja a babor <i>entrando</i>»: piensa en el vino tinto que te bebes al volver a puerto. Rojo, babor, regreso.</div></div></div></div>`],
["iala","Sistema IALA/AISM: qué balizan y cómo se distinguen",`
<p>La <b>AISM</b> (Asociación Internacional de Señalización Marítima; en inglés <b>IALA</b>) define <b>seis tipos de marcas</b>, combinables entre sí: laterales, cardinales, peligro aislado, aguas navegables, especiales y peligro nuevo.</p>
<p><b>Qué balizan</b>: límites laterales de los canales, peligros naturales y obstáculos (naufragios), recalada y rumbo a seguir, otras zonas de interés y peligros nuevos. <b>No</b> se incluyen faros, luces de sector, enfilaciones, buques faro ni grandes boyas de navegación.</p>
<div class="grid2">
<div class="panel"><h4>De día</h4><ul><li><b>Forma</b>: castillete, espeque, cónica, cilíndrica o esférica.</li><li><b>Color</b>: rojo, verde, negro, amarillo, blanco, y combinaciones negro-rojo, amarillo-negro, blanco-rojo y amarillo-azul.</li><li><b>Tope</b>: cilindro, cono, esfera, aspa o cruz; rojo, verde, negro o amarillo.</li></ul></div>
<div class="panel"><h4>De noche</h4><ul><li><b>Color</b> de la luz: blanco, amarillo, rojo o verde (y azul en el peligro nuevo).</li><li><b>Ritmo</b>: destellos, ocultaciones, centelleos o isofase.</li></ul><p class="small">También pueden señalizarse con símbolos electrónicos, como complemento de una marca física o de forma exclusiva (marcas virtuales).</p></div>
</div>
<h3>Marcas laterales en detalle</h3>
<ul>
<li>Balizan canales en ríos, rías, aguas someras y bocanas. El <b>sentido convencional</b> es el de quien viene de alta mar hacia un puerto, estuario o río; o el que fije la autoridad, y en principio siguiendo las costas en el <b>sentido de las agujas del reloj</b>.</li>
<li><b>Babor</b>: roja, castillete, espeque o <b>cilíndrica</b>, tope cilindro rojo. <b>Estribor</b>: verde, castillete, espeque o <b>cónica</b>, tope cono verde. Luz de su color con <b>cualquier ritmo excepto el 2+1</b>, reservado a la bifurcación.</li>
<li><b>Numeración</b>: desde la mar; <b>pares las rojas</b> e <b>impares las verdes</b>.</li>
<li>Las luces pueden ser <b>sincronizadas</b> (destellan a la vez) o <b>secuenciales</b> (una tras otra).</li>
<li><b>Bifurcación</b>: el color dominante y el tope dicen por dónde se deja; la franja central de otro color avisa de que hay bifurcación; de noche, la luz <b>2+1</b>. Canal principal a <b>estribor</b> → marca roja con franja verde, cilíndrica, tope cilindro rojo, luz roja Fl(2+1), se deja por <b>babor</b>. Canal principal a <b>babor</b> → verde con franja roja, cónica, tope cono verde, luz verde Fl(2+1), se deja por <b>estribor</b>.</li>
</ul>
<h3>Cardinales: uso y periodos</h3>
<ul>
<li>Los cuadrantes se limitan por las demoras verdaderas <b>NW-NE, NE-SE, SE-SW y SW-NW</b> tomadas desde el punto a balizar. La marca se llama como el cuadrante donde está y <b>se pasa por ese lado</b>: la Norte se pasa por el norte y deja el peligro al sur.</li>
<li>Sirven para indicar dónde están las aguas más profundas, el lado por el que salvar un peligro, o una configuración especial del canal (recodo, confluencia, bifurcación, extremo de un bajo). Son iguales en las regiones A y B. No conviene abusar de ellas: sus luces blancas pueden confundirse.</li>
<li>Castillete o espeque, con <b>bandas horizontales amarillas y negras</b>. El tope de dos conos es su característica diurna más importante, lo más grande posible y bien separados.</li>
<li>Luz blanca Q o VQ. <b>N</b>: continua. <b>E</b>: 3 centelleos, periodo 5 o 10 s. <b>S</b>: 6 centelleos + 1 destello largo, periodo 10 o 15 s. <b>W</b>: 9 centelleos, periodo 10 o 15 s.</li>
</ul>
<h3>Peligro aislado, aguas navegables, especiales y peligro nuevo</h3>
<ul>
<li><b>Peligro aislado</b>: sobre un peligro con aguas navegables alrededor; a menudo un espeque clavado en el propio bajo. Negra con franjas horizontales rojas, forma libre (mejor castillete o espeque, que no se confunda con las laterales), tope de <b>dos esferas negras</b>, luz blanca en grupos de <b>2 destellos</b>. Se pasa a distancia prudente, preferiblemente por <b>sotavento</b> con mal tiempo.</li>
<li><b>Aguas navegables</b>: no señalan peligro; marcan eje o centro de canal, recalada, entrada de un puerto o estuario, o el mejor paso bajo un puente. Esférica, castillete o espeque, <b>franjas verticales rojas y blancas</b>, tope <b>una esfera roja</b>. Luz blanca isofase, ocultaciones, un destello largo cada 10 s o Morse «A».</li>
<li><b>Especiales</b>: zonas que se entienden mirando la carta. Ejemplos: boyas oceanográficas (SADO), separación de tráfico donde el balizamiento normal confunda, vertederos, ejercicios militares, cables o conductos submarinos, zonas reservadas al recreo, límites de fondeaderos, parques de energía renovable en el mar y acuicultura. Amarillas, forma libre, tope <b>aspa amarilla</b> y luz amarilla de cualquier ritmo que no se confunda.</li>
<li><b>Peligro nuevo</b>: peligro recién descubierto que aún no figura en las publicaciones (bancos, escollos, naufragios). Se puede balizar con laterales, cardinales, peligro aislado o con la boya de emergencia: castillete o espeque, <b>franjas verticales azules y amarillas</b> en igual número, tope <b>cruz amarilla</b> vertical, y luz <b>azul 1 s y amarilla 1 s con 0,5 s de oscuridad</b> entre ambas. Si el riesgo es alto se <b>duplica</b> alguna marca (idéntica a su pareja). Si se usa una lateral luminosa, su luz será <b>Q o VQ</b>. Puede llevar <b>racón «D»</b> («manténgase separado de mí») o AIS (incluso solo marcas virtuales). Se retira cuando el peligro ya se ha difundido o ha desaparecido.</li>
</ul>
<h3>Simulacro: entrando en un estuario</h3>
<ol>
<li>Por estribor, cuatro marcas especiales amarillas rodean una piscifactoría: no pasar entre ellas.</li>
<li>Por la amura de estribor, una marca de peligro nuevo azul y amarilla sobre un barco hundido: darle resguardo.</li>
<li>En el eje del canal, una marca de aguas navegables señala la entrada al estuario.</li>
<li>Ya en el canal: rojas por babor y verdes por estribor.</li>
<li>Un peligro aislado: darle resguardo (aquí se deja por babor).</li>
<li>Una bifurcación con el canal principal a babor (verde con franja roja): se deja por estribor.</li>
<li>Una bifurcación con el canal principal a estribor (roja con franja verde): se deja por babor.</li>
<li>Un barco que sale hacia el mar ve todo al revés: rojas por estribor y verdes por babor.</li>
<li>Al salir, una cardinal Sur por la amura de babor le dice que las aguas profundas están entre el SW y el SE de la marca.</li>
</ol>`],
["marcas","Las marcas: forma, color, tope y luz",`
<p>Toca cada marca para ver su luz encendida con su ritmo real.</p>
<div class="marks" id="markGrid">${MARKS.map((m,i)=>`<div class="mark" role="button" tabindex="0" aria-pressed="false" data-i="${i}">${buoy(m[1],m[2])}<b>${m[0]}</b><span class="small">${m[3]}</span></div>`).join("")}</div>
<div class="widget"><div class="eyebrow">Luz de la marca seleccionada</div>
<div class="row" style="gap:16px;align-items:center"><svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true"><rect width="80" height="80" rx="10" fill="var(--night)"/><circle id="selLamp" cx="40" cy="40" r="16" fill="#fff" opacity=".08" class="lamp"/></svg>
<div><b id="selName">Elige una marca</b><div class="mono small" id="selCode"></div><div class="small muted" id="selTxt"></div><div class="small" id="selPass"></div></div></div></div>
<div class="note"><b>Solo tres tipos de marca llevan luz blanca</b>: cardinales, peligro aislado y aguas navegables. Las laterales, roja o verde. La especial, amarilla. El peligro nuevo, azul y amarilla alternativas.</div>`],
["cardinales","El sistema cardinal",`
<div class="grid2" style="align-items:center"><figure style="margin:0">${cardinalSVG()}</figure>
<div><p>Una marca cardinal se coloca en un <b>cuadrante</b> respecto al peligro y te dice <b>por qué lado pasar</b>: la cardinal Norte está al norte del peligro y se pasa por su norte.</p>
<ul><li><b>Conos</b>: apuntan hacia donde está el <b>negro</b>. Arriba y arriba: negro arriba (N). Abajo y abajo: negro abajo (S). Bases juntas: negro arriba y abajo (E). Vértices juntos: negro en medio (W).</li>
<li><b>Luces</b>: piensa en un <b>reloj</b>. E = 3 centelleos (las 3), S = 6 (+ uno largo para distinguirla), W = 9, N = continua (las 12, o las 0).</li>
<li>Todas las cardinales tienen luz <b>blanca</b>, Q o VQ.</li></ul>
<div class="info" id="cardInfo">Toca una cardinal del dibujo.</div></div></div>`],
["luces","Luces: ritmos, fase y periodo",`
<div class="widget"><div class="eyebrow">Interactivo · reproduce cada ritmo</div>
<div class="grid3" id="rhGrid">${Object.keys(RH).map(k=>`<button class="mark" data-rh="${k}" aria-pressed="false" style="display:flex;gap:10px;align-items:center;text-align:left"><svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" style="height:40px;margin:0"><rect width="40" height="40" rx="8" fill="var(--night)"/><circle cx="20" cy="20" r="9" fill="${RH[k].c}" opacity=".08" class="lamp"/></svg><span><b class="mono" style="font-family:var(--mono);font-size:13px">${k}</b><span class="small">${RH[k].txt}</span></span></button>`).join("")}</div></div>
<ul>
<li><span class="es">Fase</span>: cada uno de los aspectos de la luz (luz u oscuridad) dentro de la secuencia. <span class="es">Periodo</span>: duración de un ciclo completo hasta que se repite. <span class="es">Característica</span>: el conjunto de ritmo, color y periodo que identifica a una luz, como <span class="mono">Fl(3) W 10s</span>.</li>
<li><b>Fl</b> destello (luz más corta que la oscuridad). <b>LFl</b> destello largo (≥ 2 s). <b>Oc</b> ocultación (luz más larga que la oscuridad). <b>Iso</b> isofase (iguales). <b>Q</b> centelleante, 50–60/min. <b>VQ</b> centelleante rápida, 100–120/min. <b>Al</b> alternativa (cambia de color). <b>Mo</b> Morse. <b>F</b> fija.</li>
<li>Los <b>faros</b> se identifican por su característica y aparecen en el <i>Libro de Faros y Señales de Niebla</i> y en la carta, con su alcance en millas. Algunos tienen <b>sectores</b> de distinto color que marcan peligros o canales.</li>
</ul>`],
["juego","¿Qué marca es?",`
<div class="widget"><div class="eyebrow">Interactivo · reconoce la marca</div>
<div class="grid2" style="align-items:center"><div id="bzFig" style="text-align:center"></div><div><div class="opts" id="bzOpts"></div><p class="small" id="bzFb"></p><div class="row"><button class="btn sm" id="bzNext">Otra</button><span class="small muted" id="bzSc"></span><label class="small row"><input type="checkbox" id="bzNight"> Solo la luz (de noche)</label></div></div></div></div>`]
],
init(root){
  let stopSel=null;
  const pick=i=>{const m=MARKS[i];$$("#markGrid .mark",root).forEach(x=>x.setAttribute("aria-pressed",+x.dataset.i===i));if(stopSel)stopSel();stopSel=lampRunner($("#selLamp",root),m[4]);$("#selName",root).textContent=m[0];$("#selCode",root).textContent=m[4];$("#selTxt",root).textContent=RH[m[4]].txt;$("#selPass",root).textContent=m[5]};
  $$("#markGrid .mark",root).forEach(el=>{el.addEventListener("click",()=>pick(+el.dataset.i));el.addEventListener("keydown",e=>{if(e.key==="Enter")pick(+el.dataset.i)})});
  const stops={};
  $$("#rhGrid [data-rh]",root).forEach(b=>b.addEventListener("click",()=>{const k=b.dataset.rh;if(stops[k]){stops[k]();delete stops[k];b.setAttribute("aria-pressed","false");return}stops[k]=lampRunner($(".lamp",b),k);b.setAttribute("aria-pressed","true")}));
  const CI={N:"Cardinal <b>Norte</b>: conos arriba, negro arriba. Luz Q o VQ continua. Pasa por el norte.",E:"Cardinal <b>Este</b>: conos base con base. Luz Q(3) 10 s o VQ(3) 5 s. Pasa por el este.",S:"Cardinal <b>Sur</b>: conos abajo, negro abajo. Luz Q(6)+LFl 15 s o VQ(6)+LFl 10 s. Pasa por el sur.",W:"Cardinal <b>Oeste</b>: conos vértice con vértice. Luz Q(9) 15 s o VQ(9) 10 s. Pasa por el oeste."};
  $$(".card",root).forEach(g=>{const act=()=>{$$(".card",root).forEach(x=>x.classList.toggle("on",x===g));$("#cardInfo",root).innerHTML=CI[g.dataset.q]};g.addEventListener("click",act);g.addEventListener("keydown",e=>{if(e.key==="Enter")act()})});
  const boat=$("#hbBoat",root);let anim=0;
  const move=(inb)=>{cancelAnimationFrame(anim);$("#hbIn",root).setAttribute("aria-pressed",inb);$("#hbOut",root).setAttribute("aria-pressed",!inb);$("#hbIn",root).classList.toggle("ghost",!inb);$("#hbOut",root).classList.toggle("ghost",inb);
    $("#hbTxt",root).textContent=inb?"Entrando: roja a babor, verde a estribor":"Saliendo: roja a estribor, verde a babor";
    let t0=null;const y0=inb?255:60,y1=inb?60:255;const st=ts=>{if(!t0)t0=ts;const k=Math.min(1,(ts-t0)/3500);boat.setAttribute("transform",`translate(160 ${y0+(y1-y0)*k}) rotate(${inb?0:180})`);if(k<1)anim=requestAnimationFrame(st)};anim=requestAnimationFrame(st)};
  $("#hbIn",root).addEventListener("click",()=>move(true));$("#hbOut",root).addEventListener("click",()=>move(false));
  let sc=0,n=0,stopG=null;
  const game=()=>{if(stopG){stopG();stopG=null}const i=r(0,MARKS.length-1),m=MARKS[i],night=$("#bzNight",root).checked;
    $("#bzFig",root).innerHTML=night?`<svg viewBox="0 0 120 120" width="140" height="140" aria-label="Luz de una marca"><rect width="120" height="120" rx="12" fill="var(--night)"/><circle cx="60" cy="60" r="18" class="lamp" opacity=".08" fill="#fff"/></svg><div class="small muted">Mira el ritmo unos segundos</div>`:`<div style="height:150px">${buoy(m[1],m[2]).replace("<svg ",'<svg style="height:150px" ')}</div>`;
    if(night)stopG=lampRunner($("#bzFig .lamp",root),m[4]);
    const pool=night?MARKS.filter(x=>x[4]!==m[4]).map(x=>x[0]):MARKS.filter(x=>x!==m).map(x=>x[0]);
    const opts=shuffle([m[0],...shuffle([...new Set(pool)]).slice(0,3)]);
    $("#bzFb",root).textContent="";
    $("#bzOpts",root).innerHTML=opts.map(o=>`<button class="opt" data-o="${o}">${o}</button>`).join("");
    $$("#bzOpts .opt",root).forEach(b=>b.addEventListener("click",()=>{n++;const ok=b.dataset.o===m[0];if(ok)sc++;$$("#bzOpts .opt",root).forEach(x=>{x.disabled=true;if(x.dataset.o===m[0])x.classList.add("right")});if(!ok)b.classList.add("wrong");$("#bzFb",root).innerHTML=(ok?"<span class='pass'>✓</span> ":"<span class='fail'>✗</span> ")+m[3]+` Luz: <span class="mono">${m[4]}</span>.`;$("#bzSc",root).textContent=`${sc}/${n}`},{once:true}))};
  $("#bzNext",root).addEventListener("click",game);$("#bzNight",root).addEventListener("change",game);game();
  this._cleanup=()=>{if(stopSel)stopSel();if(stopG)stopG();Object.values(stops).forEach(f=>f());cancelAnimationFrame(anim)};
}};
})();
(function(){
"use strict";
const {$,$$,CH,boatTop,r,shuffle,horn,n360}=PER;

/* ---------- vessel light specs ---------- */
/* mast: masthead lights (0..3) · side · stern · tow (yellow above stern) · ar: all-round colours top→bottom · anchor: 1|2 · shapes: top→bottom */
const V=[
 {id:"pm",name:"Propulsión mecánica, menos de 50 m",mast:1,side:1,stern:1,ar:[],shapes:[],grp:"pm",note:"Una luz de tope a proa, costados y alcance."},
 {id:"pm50",name:"Propulsión mecánica, 50 m o más",mast:2,side:1,stern:1,ar:[],shapes:[],grp:"pm",note:"Dos luces de tope: la de popa más alta que la de proa."},
 {id:"pm12",name:"Propulsión mecánica, menos de 12 m",mast:0,side:1,stern:0,ar:["w"],shapes:[],grp:"pm",note:"Puede sustituir tope y alcance por una blanca todo horizonte, más costados."},
 {id:"vela",name:"Velero en navegación",mast:0,side:1,stern:1,ar:[],shapes:[],grp:"vela",note:"Solo costados y alcance: ninguna luz de tope. Opcional: roja sobre verde todo horizonte en el tope del palo."},
 {id:"velam",name:"Velero navegando también a motor",mast:1,side:1,stern:1,ar:[],shapes:["coneDown"],grp:"pm",note:"De noche es un buque de propulsión mecánica. De día lleva un cono con el vértice hacia abajo."},
 {id:"sg",name:"Sin gobierno, sin arrancada",mast:0,side:0,stern:0,ar:["r","r"],shapes:["ball","ball"],grp:"sg",note:"Dos rojas todo horizonte en vertical. De día, dos esferas."},
 {id:"sga",name:"Sin gobierno, con arrancada",mast:0,side:1,stern:1,ar:["r","r"],shapes:["ball","ball"],grp:"sg",note:"Dos rojas + costados y alcance (pero no luz de tope)."},
 {id:"mr",name:"Maniobra restringida, con arrancada",mast:1,side:1,stern:1,ar:["r","w","r"],shapes:["ball","diamond","ball"],grp:"mr",note:"Roja-blanca-roja en vertical, más las luces de navegación. De día: esfera-bicono-esfera."},
 {id:"cal",name:"Restringido por su calado",mast:1,side:1,stern:1,ar:["r","r","r"],shapes:["cyl"],grp:"cal",note:"Tres rojas en vertical, además de las de propulsión mecánica. De día, un cilindro."},
 {id:"arr",name:"Pesquero de arrastre, con arrancada",mast:1,side:1,stern:1,ar:["g","w"],shapes:["coneDown","coneUp"],grp:"arr",note:"Verde sobre blanca. Tope a popa más alto que la verde: obligatorio si ≥50 m, opcional si es menor. De día, dos conos unidos por los vértices."},
 {id:"pes",name:"Pesquero (no arrastre), con arrancada",mast:0,side:1,stern:1,ar:["r","w"],shapes:["coneDown","coneUp"],grp:"pes",note:"Roja sobre blanca. Si el aparejo se extiende más de 150 m en horizontal, una blanca todo horizonte (de día, un cono vértice arriba) en la dirección del aparejo."},
 {id:"prac",name:"Práctico en servicio",mast:0,side:1,stern:1,ar:["w","r"],shapes:[],grp:"prac",note:"Blanca sobre roja en el tope («blanco sobre rojo, práctico a bordo»)."},
 {id:"rem",name:"Remolcador, remolque de 200 m o menos",mast:2,side:1,stern:1,tow:1,ar:[],shapes:[],grp:"rem",note:"Dos luces de tope en vertical a proa y luz amarilla de remolque encima de la de alcance."},
 {id:"rem200",name:"Remolcador, remolque de más de 200 m",mast:3,side:1,stern:1,tow:1,ar:[],shapes:["diamond"],grp:"rem",note:"Tres luces de tope en vertical. De día, bicono en remolcador y remolcado."},
 {id:"fond",name:"Fondeado, menos de 50 m",anchor:1,mast:0,side:0,stern:0,ar:[],shapes:["ball"],grp:"fond",note:"Una blanca todo horizonte a proa. De día, una esfera."},
 {id:"fond50",name:"Fondeado, 50 m o más",anchor:2,mast:0,side:0,stern:0,ar:[],shapes:["ball"],grp:"fond",note:"Blanca a proa y otra más baja a popa. Puede iluminar la cubierta; si mide 100 m o más, es obligatorio."},
 {id:"var",name:"Varado",anchor:1,mast:0,side:0,stern:0,ar:["r","r"],shapes:["ball","ball","ball"],grp:"var",note:"Luces de fondeo + dos rojas en vertical. De día, tres esferas."},
 {id:"drag",name:"Dragaminas",mast:1,side:1,stern:1,ar:[],mine:1,shapes:["ball3"],grp:"drag",note:"Tres verdes en triángulo. Peligroso acercarse a menos de 1000 m."}
];
const LC={w:"#fff",r:"#ff3b30",g:"#34c759",y:"#ffd60a"};
function glow(x,y,c,R=5.5){return `<circle cx="${x}" cy="${y}" r="${R*2.4}" fill="${LC[c]}" opacity=".18"/><circle cx="${x}" cy="${y}" r="${R}" fill="${LC[c]}"/>`}
function shape(k,x,y){const B="var(--black)";
  if(k==="ball")return `<circle cx="${x}" cy="${y}" r="8" fill="${B}"/>`;
  if(k==="coneUp")return `<polygon points="${x-8},${y+8} ${x+8},${y+8} ${x},${y-8}" fill="${B}"/>`;
  if(k==="coneDown")return `<polygon points="${x-8},${y-8} ${x+8},${y-8} ${x},${y+8}" fill="${B}"/>`;
  if(k==="cyl")return `<rect x="${x-7}" y="${y-10}" width="14" height="20" fill="${B}"/>`;
  if(k==="diamond")return `<polygon points="${x},${y-11} ${x+8},${y} ${x},${y+11} ${x-8},${y}" fill="${B}"/>`;
  if(k==="ball3")return `<circle cx="${x}" cy="${y}" r="7" fill="${B}"/><circle cx="${x-34}" cy="${y+16}" r="7" fill="${B}"/><circle cx="${x+34}" cy="${y+16}" r="7" fill="${B}"/>`;
  return "";}
/* aspect: 'proa' | 'er' | 'popa' | 'br' ; night bool. returns {svg, sig} */
function drawVessel(v,aspect,night){
  const W=320,H=200,wl=150;const side=aspect==="er"||aspect==="br";const flip=aspect==="br";const X=x=>flip?W-x:x;
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${night?"Luces":"Marcas"} vistas ${aspect==="proa"?"por la proa":aspect==="popa"?"por la popa":"por "+(aspect==="er"?"estribor":"babor")}">`;
  s+=`<rect width="${W}" height="${H}" fill="${night?"var(--night)":"#cfe6f5"}" rx="10"/><rect y="${wl}" width="${W}" height="${H-wl}" fill="${night?"#0d2233":"#7fb2d1"}"/>`;
  const hullC=night?"#1b2a36":"#58636b",supC=night?"#22323f":"#8a959c";const sig=[];
  /* hull & masts */
  if(side){s+=`<path d="M${X(40)} ${wl-18} L${X(280)} ${wl-24} L${X(262)} ${wl+8} L${X(58)} ${wl+8} Z" fill="${hullC}"/><rect x="${Math.min(X(150),X(205))}" y="${wl-50}" width="55" height="28" fill="${supC}"/>`;
    s+=`<line x1="${X(230)}" y1="${wl-24}" x2="${X(230)}" y2="${wl-112}" stroke="${supC}" stroke-width="3"/><line x1="${X(120)}" y1="${wl-24}" x2="${X(120)}" y2="${wl-150}" stroke="${supC}" stroke-width="3"/>`;}
  else{s+=`<path d="M120 ${wl-22} L200 ${wl-22} L188 ${wl+8} L132 ${wl+8} Z" fill="${hullC}"/><rect x="138" y="${wl-50}" width="44" height="28" fill="${supC}"/><line x1="160" y1="${wl-22}" x2="160" y2="${wl-150}" stroke="${supC}" stroke-width="3"/>`}
  if(night){
    /* masthead: visible proa & sides */
    if(v.mast&&aspect!=="popa"){
      if(v.mast===1){const x=side?X(230):160;s+=glow(x,wl-110,"w");sig.push("Tw")}
      if(v.mast===2&&v.grp!=="rem"){if(side){s+=glow(X(230),wl-100,"w")+glow(X(120),wl-140,"w")}else{s+=glow(160,wl-100,"w")+glow(160,wl-140,"w")}sig.push("Tw2s")}
      if(v.grp==="rem"){const n=v.mast;for(let i=0;i<n;i++){const x=side?X(230):160;s+=glow(x,wl-80-i*18,"w")}sig.push("Tv"+n)}
    }
    if(v.side){if(aspect==="proa"){s+=glow(195,wl-40,"r")+glow(125,wl-40,"g");sig.push("RG")}if(aspect==="er"){s+=glow(X(205),wl-40,"g");sig.push("G")}if(aspect==="br"){s+=glow(X(205),wl-40,"r");sig.push("R")}}
    if(v.stern&&aspect==="popa"){s+=glow(160,wl-26,"w");sig.push("A")}
    if(v.tow&&aspect==="popa"){s+=glow(160,wl-46,"y");sig.push("Y")}
    if(v.ar.length){const x=side?X(120):(v.mast?182:160);v.ar.forEach((c,i)=>s+=glow(x,wl-140+i*20+(v.mast===2&&!side?0:0),c));sig.push("AR"+v.ar.join(""))}
    if(v.anchor){if(side){s+=glow(X(270),wl-60,"w");if(v.anchor===2)s+=glow(X(55),wl-40,"w")}else{s+=glow(160,wl-60,"w");if(v.anchor===2)s+=glow(160,wl-36,"w")}sig.push("F"+v.anchor)}
    if(v.mine){const x=side?X(230):160;s+=glow(x,wl-130,"g")+(side?glow(X(208),wl-118,"g")+glow(X(252),wl-118,"g"):glow(130,wl-118,"g")+glow(190,wl-118,"g"));sig.push("MINE")}
  }else{
    const x=side?X(120):160;let y=wl-140;
    v.shapes.forEach(k=>{s+=shape(k,k==="ball3"?(side?X(230):160):x,k==="ball3"?wl-130:y);y+=24});
    sig.push("S"+v.shapes.join("-"));
  }
  const cnt={};(s.match(/r="5.5" fill="(#[0-9a-f]+)"/g)||[]).forEach(m=>{cnt[m]=(cnt[m]||0)+1});
  const vis=night?Object.entries(cnt).sort().map(e=>e.join(":")).join("|"):"S"+v.shapes.join("-");
  return {svg:s+"</svg>",sig:vis};
}

/* ---------- encounter scenarios ---------- */
const SC=[
 {t:"Cruce: un buque de motor se acerca por tu estribor.",me:"pm",o:{x:250,y:120,h:270,k:"pm"},a:0,e:"Regla 15: maniobra el que tiene al otro por su <b>estribor</b>. Tú. Cae a estribor y pásale por la popa, sin cortarle la proa."},
 {t:"Cruce: un buque de motor se acerca por tu babor.",me:"pm",o:{x:50,y:120,h:90,k:"pm"},a:1,e:"Regla 15: él te tiene por su estribor, así que maniobra él. Tú mantienes rumbo y velocidad (regla 17), atento por si no lo hace."},
 {t:"Vuelta encontrada: otro buque de motor viene de frente.",me:"pm",o:{x:155,y:40,h:180,k:"pm"},a:2,e:"Regla 14: los dos caen a <b>estribor</b> para pasar babor con babor."},
 {t:"Un buque de motor más rápido te alcanza por la popa.",me:"pm",o:{x:150,y:290,h:0,k:"pm"},a:1,e:"Regla 13: el que alcanza se aparta siempre. Tú mantienes rumbo y velocidad."},
 {t:"Alcanzas a un velero que va más despacio, por su popa.",me:"pm",o:{x:150,y:90,h:0,k:"vela"},a:0,e:"Regla 13: el que alcanza se mantiene apartado. Tú, y además eres de motor."},
 {t:"Un velero cruza por tu babor.",me:"pm",o:{x:50,y:120,h:90,k:"vela"},a:0,e:"Regla 18: un buque de propulsión mecánica se aparta de un velero, venga por donde venga (salvo que el velero le esté alcanzando)."},
 {t:"Un pesquero arrastrando cruza por tu babor.",me:"pm",o:{x:50,y:120,h:90,k:"arr"},a:0,e:"Regla 18: el buque de motor se aparta del buque dedicado a la pesca."},
 {t:"Un buque sin gobierno por tu estribor.",me:"pm",o:{x:240,y:100,h:200,k:"sg"},a:0,e:"Está en lo más alto de la escala: todos se apartan de un buque sin gobierno."},
 {t:"Eres un velero. Un buque de motor cruza por tu estribor.",me:"vela",o:{x:250,y:120,h:270,k:"pm"},a:1,e:"Regla 18: el motor se aparta del velero. Tú mantienes rumbo y velocidad."},
 {t:"Eres un velero amurado a babor (viento por babor). El otro velero va amurado a estribor.",me:"vela",wind:225,o:{x:250,y:110,h:175,k:"vela"},a:0,e:"Regla 12: con amuras distintas, se aparta el que recibe el viento por <b>babor</b>: tú."},
 {t:"Los dos veleros amurados a estribor. Tú estás a barlovento del otro.",me:"vela",wind:120,o:{x:90,y:190,h:330,k:"vela"},a:0,e:"Regla 12: con la misma amura, se aparta el que está a <b>barlovento</b>. Tú."},
 {t:"Eres un velero en un canal angosto. Un buque grande que solo puede navegar por el canal viene de frente.",me:"vela",o:{x:155,y:40,h:180,k:"cal"},a:0,e:"Regla 9: los veleros y los buques de menos de 20 m no estorbarán el paso de un buque que solo puede navegar con seguridad dentro del canal."},
 {t:"Tu velero alcanza a una lancha a motor más lenta.",me:"vela",o:{x:150,y:90,h:0,k:"pm"},a:0,e:"Regla 13: el que alcanza se aparta siempre, aunque sea un velero."}
];
const SOUNDS=[
 ["·","Caigo a estribor","Maniobra (regla 34)"],["··","Caigo a babor","Maniobra"],["···","Estoy dando atrás","Maniobra"],["·····","No entiendo sus intenciones (duda)","Al menos 5 cortas y rápidas"],
 ["--·","Pretendo alcanzarle por su estribor","Canal angosto"],["--··","Pretendo alcanzarle por su babor","Canal angosto"],["-·-·","Conforme, puede alcanzarme","Canal angosto"],["-","Me acerco a un recodo","Canal angosto · también, buque de motor con arrancada en niebla"],
 ["--","Buque de motor parado, sin arrancada","Visibilidad reducida · cada 2 min"],["-··","Sin gobierno, maniobra restringida, calado, vela, pesca o remolcando","Visibilidad reducida · cada 2 min"],["-···","Buque remolcado (tripulado)","Visibilidad reducida · tras la del remolcador"],["·-·","Buque fondeado: aviso de su posición","Opcional, además de la campana"]
];
const fmt=p=>p.replace(/·/g,"• ").replace(/-/g,"▬ ").trim();

function sectorSVG(){const c=150;const P=(a,R)=>[c+R*Math.sin(a*Math.PI/180),c-R*Math.cos(a*Math.PI/180)];
  const arc=(a1,a2,R,col,op)=>{const [x1,y1]=P(a1,R),[x2,y2]=P(a2,R);const large=((a2-a1+360)%360)>180?1:0;return `<path d="M${c} ${c} L${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z" fill="${col}" opacity="${op}"/>`};
  return `<svg viewBox="0 0 300 300" role="img" aria-label="Sectores de las luces de navegación"><rect width="300" height="300" fill="var(--night)" rx="10"/>
  ${arc(247.5,112.5,135,"#fff",.13)}${arc(0,112.5,110,"#34c759",.35)}${arc(247.5,360,110,"#ff3b30",.35)}${arc(112.5,247.5,90,"#fff",.25)}
  ${boatTop(c,c,60,0,"#22323f")}
  <text x="${c}" y="22" text-anchor="middle" font-size="12" fill="#fff">tope 225°</text><text x="292" y="110" font-size="12" fill="#34c759" text-anchor="end">verde 112,5°</text><text x="16" y="110" font-size="12" fill="#ff3b30">roja 112,5°</text><text x="${c}" y="262" text-anchor="middle" font-size="12" fill="#fff">alcance 135°</text>
  <g id="obs"><circle cx="${c}" cy="20" r="0"/><circle id="obsDot" cx="${c}" cy="${c-130}" r="8" fill="var(--accent)" stroke="#fff" stroke-width="2"/></g></svg>`;}

CH[6]={
intro:"Diez preguntas y hacen falta cinco. Es el tema que más pesa y el más importante en la mar: quién se aparta de quién y cómo reconocer cada buque por sus luces y marcas. Dedícale la mitad de tu tiempo.",
sections:[
["defs","Definiciones (regla 3)",`
<div class="tablewrap"><table>
<tr><th>Término</th><th>Qué significa</th></tr>
<tr><td class="es">Buque de propulsión mecánica</td><td>Cualquier buque movido por una máquina. Un velero con el motor en marcha <b>lo es</b>, aunque lleve velas izadas.</td></tr>
<tr><td class="es">Buque de vela</td><td>Navega solo a vela, sin usar el motor.</td></tr>
<tr><td class="es">Dedicado a la pesca</td><td>Pesca con redes, líneas o arrastre que <b>restringen su maniobrabilidad</b>. La pesca con curricán o caña no cuenta.</td></tr>
<tr><td class="es">Sin gobierno</td><td>No puede maniobrar por una circunstancia excepcional (avería del timón o del motor).</td></tr>
<tr><td class="es">Maniobrabilidad restringida</td><td>Por la naturaleza de su trabajo: colocar o recoger balizas, cables o conductos; dragados, trabajos hidrográficos, oceanográficos o submarinos; transbordar combustible, carga, provisiones o personas navegando; lanzar o recuperar aeronaves; limpieza de minas; remolques que le restrinjan mucho apartarse.</td></tr>
<tr><td class="es">Restringido por su calado</td><td>Buque de propulsión mecánica que, por su calado respecto a la sonda, no puede apartarse de su derrota.</td></tr>
<tr><td class="es">En navegación</td><td>No está fondeado, ni amarrado, ni varado. Puede estar parado: «en navegación sin arrancada».</td></tr>
<tr><td class="es">Visibilidad reducida</td><td>Por niebla, bruma, nieve, chubascos o arena.</td></tr>
<tr><td class="es">Buque</td><td>Toda embarcación usada o utilizable para transportarse sobre el agua, <b>incluidas</b> las sin desplazamiento (aerodeslizadores), las naves de vuelo rasante y los hidroaviones.</td></tr>
<tr><td class="es">Hidroavión · nave de vuelo rasante</td><td>Aeronave proyectada para maniobrar sobre el agua · nave multimodal que en su modo principal vuela muy cerca de la superficie (WIG).</td></tr>
<tr><td class="es">Eslora y manga</td><td>Eslora total y manga máxima.</td></tr>
<tr><td class="es">A la vista</td><td>Solo cuando uno puede ser <b>observado visualmente</b> desde el otro (no por radar).</td></tr>
</table></div>`],
["escala","Quién se aparta de quién",`
<figure><svg viewBox="0 0 600 300" role="img" aria-label="Escala de preferencias de la regla 18">
${[["Sin gobierno","2 rojas"],["Maniobra restringida","roja-blanca-roja"],["Restringido por calado","3 rojas · no estorbar"],["Pesca","verde/blanca · roja/blanca"],["Vela","solo costados y alcance"],["Propulsión mecánica","tope, costados, alcance"]].map((x,i)=>`<g><rect x="${60+i*40}" y="${14+i*46}" width="${480-i*80}" height="42" rx="6" fill="${i<3?"var(--accent-soft)":"var(--sea-soft)"}" stroke="var(--line)"/><text x="300" y="${32+i*46}" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">${i+1}. ${x[0]}</text><text x="300" y="${48+i*46}" text-anchor="middle" font-size="11" fill="var(--muted)">${x[1]}</text></g>`).join("")}
<text x="20" y="40" font-size="11" fill="var(--accent)" transform="rotate(-90 20 40)" text-anchor="end">preferencia</text><path d="M30 280 L30 30" stroke="var(--accent)" stroke-width="2" marker-end="url(#ar6)"/><defs><marker id="ar6" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker></defs>
</svg><figcaption>Cada buque se aparta de los que están por encima de él. Por debajo de todos, los hidroaviones y naves WIG.</figcaption></figure>
<div class="note"><b>Por encima de la escala.</b> El <span class="es">buque que alcanza</span> se aparta <i>siempre</i> (regla 13), sea del tipo que sea: un velero que alcanza a una lancha se aparta. En canales angostos y dispositivos de separación de tráfico, los buques de menos de 20 m y los de vela <i>no estorbarán</i> a los que solo pueden navegar dentro (reglas 9 y 10).</div>
<div class="tablewrap"><table>
<tr><th>Situación</th><th>Regla</th><th>Quién maniobra</th></tr>
<tr><td><b>Alcance</b>: te acercas desde más de 22,5° a popa del través del otro (de noche solo verías su luz de alcance)</td><td>13</td><td>El que alcanza</td></tr>
<tr><td><b>Vuelta encontrada</b>: dos de motor proa con proa (ves sus dos costados o sus palos en línea)</td><td>14</td><td>Los dos caen a estribor</td></tr>
<tr><td><b>Cruce</b> de dos de motor</td><td>15</td><td>El que tiene al otro por su estribor</td></tr>
<tr><td>Dos veleros, amuras distintas</td><td>12</td><td>El amurado a babor</td></tr>
<tr><td>Dos veleros, misma amura</td><td>12</td><td>El de barlovento</td></tr>
<tr><td>Velero amurado a babor que no sabe por dónde recibe el viento el otro</td><td>12</td><td>Se aparta igualmente</td></tr>
</table></div>
<ul>
<li><b>Regla 5, vigilancia</b>: mantener siempre vigilancia visual y auditiva, y con todos los medios disponibles.</li>
<li><b>Regla 6, velocidad de seguridad</b>: la que permite parar o maniobrar a tiempo según visibilidad, tráfico, maniobrabilidad, viento, mar y corrientes.</li>
<li><b>Regla 7, riesgo de abordaje</b>: existe si la <b>demora</b> de un buque que se acerca <b>no cambia</b> de forma apreciable. Si hay duda, se considera que existe.</li>
<li><b>Regla 8, maniobras</b>: con antelación, amplias y claras. Nada de pequeños cambios sucesivos. Reducir velocidad también es una maniobra.</li>
<li><b>Regla 16</b>: el que cede el paso maniobra pronto y franco. <b>Regla 17</b>: el que sigue a rumbo mantiene rumbo y velocidad; <i>puede</i> maniobrar si el otro no lo hace y <i>debe</i> hacerlo si ya no basta la maniobra del otro. Si es de motor, evita caer a babor ante un buque por su babor.</li>
<li><b>Regla 19, visibilidad reducida</b> y contacto solo por radar: no caer a babor ante un buque a proa del través (salvo que lo alcances) ni caer hacia un buque por el través o a popa. Si oyes una señal de niebla a proa del través: reducir al mínimo para gobernar y, si hace falta, parar.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · ¿quién maniobra?</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 320" id="encSvg" role="img" aria-label="Situación de encuentro"></svg>
<div><p id="encT" style="font-weight:600"></p><div class="opts" id="encOpts"></div><p class="small" id="encFb"></p><div class="row"><button class="btn sm" id="encNext">Otra situación</button><span class="small muted" id="encSc"></span></div></div></div></div>`],
["generalidades","Reglas 1 a 10 en detalle",`
<p>El RIPA (COLREG) se firmó en <b>Londres el 20 de octubre de 1972</b> y entró en vigor el <b>15 de julio de 1977</b>. Tiene 37 reglas. Según el manual, es el tema que explica la gran mayoría de suspensos.</p>
<div class="tablewrap"><table>
<tr><th>Regla</th><th>Lo esencial</th></tr>
<tr><td>1 · Ámbito</td><td>Todos los buques en alta mar y en las aguas comunicadas con ella navegables por buques de mar (también aguas interiores). Las autoridades pueden dictar reglas especiales para radas, puertos, ríos o lagos, lo más parecidas posible al RIPA; y los Estados, luces o señales extra para buques de guerra, convoyes o pesca en flotilla. La <b>OMI</b> aprueba los dispositivos de separación de tráfico. Buques especiales: lo más parecido posible que su Gobierno decida.</td></tr>
<tr><td>2 · Responsabilidad</td><td>Cumplir el RIPA no exime de las consecuencias de una negligencia ni de las precauciones de la buena práctica marinera. Para evitar un <b>peligro inmediato</b> se puede apartar del Reglamento.</td></tr>
<tr><td>4–5</td><td>Las reglas de rumbo y gobierno valen en <b>cualquier condición de visibilidad</b>. Vigilancia visual y auditiva siempre, con todos los medios.</td></tr>
<tr><td>6 · Velocidad de seguridad</td><td>Todos: visibilidad, densidad de tráfico (pesqueros incluidos), maniobrabilidad (distancia de parada, giro), de noche el <b>resplandor</b> de luces de tierra o propias, viento, mar, corriente y peligros, y el calado respecto a la sonda. Con radar además: sus limitaciones, la escala en uso, ecos perdidos por la mar o la lluvia, buques pequeños o hielos que no detecta, y que permite medir mejor la visibilidad.</td></tr>
<tr><td>7 · Riesgo de abordaje</td><td>Usar todos los medios, el radar a larga distancia y el punteo. <b>Nada de suposiciones con información escasa</b>, sobre todo de radar. Hay riesgo si la demora no cambia; y puede haberlo aunque cambie, con un buque grande, un remolque o a muy corta distancia.</td></tr>
<tr><td>8 · Maniobras</td><td>Claras, con antelación y de buen marino; cambios amplios, visibles a ojo o por radar, sin pequeños cambios sucesivos. Con espacio, cambiar solo el rumbo puede ser lo más eficaz si se hace pronto y no crea otra aproximación. Comprobar la eficacia hasta que el otro esté <b>pasado y en franquía</b>. Si hace falta, <b>reducir o parar</b>. Quien debe «no estorbar» maniobra pronto, y sigue obligado aunque llegue a haber riesgo; el que no debe ser estorbado sigue obligado por estas reglas.</td></tr>
<tr><td>9 · Canales angostos</td><td>Navegar lo más cerca posible del límite de <b>estribor</b>. Los de &lt;20 m, los de vela y los pesqueros no estorbarán a quien solo puede navegar dentro. No cruzar si se estorba (el otro puede dar la señal de duda, regla 34d). Para adelantar, señales de la regla 34c y conformidad del alcanzado; sigue vigente la regla 13. En recodos sin visibilidad, la señal de la regla 34e. Evitar fondear.</td></tr>
<tr><td>10 · Dispositivos de separación de tráfico</td><td>Seguir la vía en su dirección, fuera de la zona o línea de separación; entrar y salir por los extremos o, por los lados, con el <b>menor ángulo</b> posible. Cruzar lo más <b>perpendicular</b> posible. Quien pueda usar la vía no usa la zona de navegación costera, salvo &lt;20 m, vela y pesca, o para ir o venir de un puerto o evitar un peligro. No entrar en la zona de separación salvo emergencia o para pescar. Precaución en los extremos; evitar fondear dentro. Los que no lo usan, se apartan con el mayor margen. Pesca, &lt;20 m y vela no estorban a los que siguen la vía. Exentos, en lo necesario, los de maniobra restringida trabajando en él (seguridad o cables).</td></tr>
</table></div>`],
["reglas11","Reglas 11 a 19 en detalle",`
<ul>
<li><b>Regla 11</b>: la sección II (reglas 12 a 18) solo se aplica a buques <b>a la vista</b> uno del otro.</li>
<li><b>Regla 12 · veleros</b>: amuras distintas, se aparta el que recibe el viento por <b>babor</b>; misma amura, el de <b>barlovento</b>; si un amurado a babor ve a otro a barlovento y no sabe su amura, se aparta (suele darse con viento de popa). Banda de barlovento = la <b>contraria a la que lleva cazada la mayor</b> (en aparejo cruzado, la mayor de cuchillo).</li>
<li><b>Regla 13 · alcance</b>: se aparta el que alcanza, prevalece sobre las secciones I y II. Viene desde más de <b>22,5° a popa del través</b>: de noche solo vería la luz de alcance. Con duda, se considera que alcanza. Ningún cambio posterior de marcación lo convierte en cruce hasta que esté adelantado y en franquía.</li>
<li><b>Regla 14 · vuelta encontrada</b>: dos de motor a rumbos opuestos o casi; de noche ves sus topes enfilados y/o los dos costados. Ambos caen a estribor y pasan babor con babor. Con duda, se supone que existe.</li>
<li><b>Regla 15 · cruce</b>: se aparta el que tiene al otro por su estribor y, si puede, <b>evita cortarle la proa</b>.</li>
<li><b>Regla 16</b>: el que cede, pronto y de forma decidida. <b>Regla 17</b>: el que sigue a rumbo mantiene rumbo y velocidad; <i>puede</i> maniobrar en cuanto vea que el otro no lo hace; <i>debe</i> maniobrar si ya no basta la del otro. Siendo de motor en un cruce, no cae a babor por un buque que tenga por su babor. Nada de esto exime al que cede.</li>
<li><b>Regla 18 · categorías</b> (sin perjuicio de las reglas 9, 10 y 13): el de <b>motor</b> se aparta de sin gobierno, maniobra restringida, pesca y vela. El de <b>vela</b>, de sin gobierno, maniobra restringida y pesca. El de <b>pesca</b>, en lo posible, de sin gobierno y maniobra restringida. Todos salvo sin gobierno y maniobra restringida evitan estorbar al <b>restringido por su calado</b> que muestre las señales de la regla 28; éste navega con particular precaución. El <b>hidroavión amarado</b> se aleja de todos y, si hay riesgo, cumple estas reglas. Las <b>naves de vuelo rasante</b> despegando, aterrizando o volando bajo se apartan de todos; navegando en superficie, como un buque de motor.</li>
<li><b>Regla 19 · visibilidad reducida</b> (buques que no están a la vista): velocidad de seguridad y máquinas listas. Contacto solo por radar: si hay aproximación excesiva, maniobrar con antelación evitando caer a babor por un buque a proa del través (salvo que lo alcances) y caer hacia uno por el través o a popa. Si oyes una señal de niebla a proa del través o no puedes evitar la aproximación: <b>velocidad mínima de gobierno</b> o parar, y extrema precaución.</li>
</ul>
<div class="sea"><b>A bordo.</b> Un mercante que se acerca por tu estribor con riesgo aparente puede saber por su radar que te pasará por la proa con margen. Vigila la demora: si cambia de forma clara, no hay riesgo.</div>`],
["luces2025","Reglas 20 a 25: definiciones y buques",`
<ul>
<li><b>Regla 20</b>: las luces, con cualquier tiempo, de la <b>puesta a la salida del sol</b> (ninguna otra que pueda confundirse o dificultar la vigilancia); también de día con visibilidad reducida, y cuando se considere necesario. Las <b>marcas</b>, de día.</li>
<li><b>Regla 21</b>: tope blanca en crujía, <b>225° (20 cuartas)</b>; costados verde Er y roja Br, <b>112,5° (10 cuartas)</b> cada una, y combinadas en un farol en crujía si &lt;20 m; alcance blanca, <b>135° (12 cuartas)</b>, 67,5° (6 cuartas) a cada banda desde la popa; remolque <b>amarilla</b> como la de alcance; todo horizonte 360°; centelleante, <b>120 o más</b> por minuto.</li>
<li><b>Regla 22</b> (alcances): el manual la marca como <b>no examinable</b>; la tabla de la sección anterior basta como referencia.</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Buque</th><th>Luces</th></tr>
<tr><td>Motor ≥50 m</td><td>Tope a proa, otro a popa <b>más alto</b>, costados y alcance. <b>De día no lleva marca.</b></td></tr>
<tr><td>Motor &lt;50 m</td><td>Un tope (el segundo es opcional), costados y alcance</td></tr>
<tr><td>Motor &lt;12 m</td><td>Puede llevar blanca todo horizonte + costados. La blanca puede ir fuera de crujía si los costados van en farol combinado en crujía.</td></tr>
<tr><td>Motor &lt;7 m y ≤7 nudos</td><td>Blanca todo horizonte y, si es posible, costados</td></tr>
<tr><td>Aerodeslizador sin desplazamiento</td><td>Las de motor + <b>amarilla centelleante</b> todo horizonte</td></tr>
<tr><td>Nave de vuelo rasante (despegando, aterrizando o en vuelo bajo)</td><td>Las de motor + <b>roja centelleante</b> todo horizonte de gran intensidad</td></tr>
<tr><td>Remolcando por popa</td><td>2 topes en vertical (<b>3 si el remolque mide más de 200 m</b>, desde la popa del remolcador al extremo del remolcado), costados, alcance y <b>remolque amarilla sobre la de alcance</b>; bicono de día si &gt;200 m. Si ≥50 m, también el tope de popa.</td></tr>
<tr><td>Empujando o remolcando abarloado</td><td>2 topes en vertical, costados y alcance (sin luz amarilla). Unidad rígida empujador-empujado: como un solo buque de motor.</td></tr>
<tr><td>Remolcado</td><td>Costados y alcance; bicono si &gt;200 m. Empujado: costados a proa. Abarloado: alcance y costados a proa. Varios en grupo: como un solo buque.</td></tr>
<tr><td>Objeto remolcado poco visible o semisumergido</td><td>Manga &lt;25 m: blanca todo horizonte a proa y a popa (los <b>dragones</b> no llevan la de proa). ≥25 m: otras dos en los extremos de la manga. &gt;100 m de largo: más blancas, a ≤100 m entre sí. Bicono en el extremo de popa y otro a proa si &gt;200 m.</td></tr>
<tr><td>Remolque de auxilio imprevisto</td><td>Un buque que no remolca normalmente no está obligado a esas luces si remolca a otro en peligro: iluminará el cabo de remolque (regla 36).</td></tr>
<tr><td>Vela</td><td>Costados y alcance. &lt;20 m: pueden ir en un <b>farol combinado</b> en el tope del palo. Opcional: <b>roja sobre verde</b> todo horizonte en el tope, pero <b>nunca con el farol combinado</b>. &lt;7 m: si no puede, linterna de luz blanca a mano.</td></tr>
<tr><td>Remo</td><td>Las de vela o una linterna de luz blanca a mano</td></tr>
<tr><td>Vela a motor</td><td>Las de motor; de día <b>cono vértice abajo</b> a proa</td></tr>
</table></div>`],
["sectores","Luces de navegación: sectores y alcances",`
<div class="widget"><div class="eyebrow">Interactivo · rodea el barco</div>
<div class="grid2" style="align-items:center"><figure style="margin:0">${sectorSVG()}</figure>
<div><label class="small">Tu posición respecto a su proa: <b id="obV"></b></label><input type="range" id="obA" min="0" max="359" value="20"><p id="obTxt" style="font-weight:600"></p><p class="small muted">Si solo ves la luz de alcance blanca, estás a más de 22,5° a popa de su través: si te acercas, <b>le estás alcanzando</b>.</p></div></div></div>
<div class="tablewrap"><table>
<tr><th>Luz</th><th>Sector</th><th>≥ 50 m</th><th>12–50 m</th><th>&lt; 12 m</th></tr>
<tr><td>Tope, blanca</td><td>225° (de proa a 22,5° a popa del través)</td><td>6 mn</td><td>5 mn (3 si &lt;20 m)</td><td>2 mn</td></tr>
<tr><td>Costado, roja Br / verde Er</td><td>112,5° cada una</td><td>3</td><td>2</td><td>1</td></tr>
<tr><td>Alcance, blanca</td><td>135° hacia popa</td><td>3</td><td>2</td><td>2</td></tr>
<tr><td>Remolque, amarilla</td><td>135° (sobre la de alcance)</td><td>3</td><td>2</td><td>2</td></tr>
<tr><td>Todo horizonte</td><td>360°</td><td>3</td><td>2</td><td>2</td></tr>
</table></div>
<p>Las luces se encienden de la puesta a la salida del sol y con visibilidad reducida. Las marcas (esferas, conos…) se muestran de día.</p>`],
["luces","Reconocer buques por sus luces y marcas",`
<div class="widget"><div class="eyebrow">Interactivo · simulador de luces y marcas</div>
<div class="row" style="margin-bottom:8px"><select id="vSel" aria-label="Tipo de buque">${V.map(v=>`<option value="${v.id}">${v.name}</option>`).join("")}</select></div>
<div class="row" style="margin-bottom:8px"><div class="seg" id="aspBtns">${[["proa","Por la proa"],["er","Por estribor"],["popa","Por la popa"],["br","Por babor"]].map((a,i)=>`<button class="btn sm ${i?"ghost":""}" data-a="${a[0]}" aria-pressed="${!i}">${a[1]}</button>`).join("")}</div><div class="seg"><button class="btn sm" id="nightB" aria-pressed="true">Noche</button><button class="btn sm ghost" id="dayB" aria-pressed="false">Día</button></div></div>
<figure id="vFig" style="margin:0"></figure><p id="vNote" class="small"></p></div>
<div class="tablewrap"><table>
<tr><th>Buque</th><th>Noche (todo horizonte, en vertical)</th><th>Día</th><th>Truco</th></tr>
<tr><td>Sin gobierno</td><td>Roja, roja</td><td>2 esferas</td><td>«Rojo sobre rojo, peligro de muerte»</td></tr>
<tr><td>Maniobra restringida</td><td>Roja, blanca, roja</td><td>Esfera, bicono, esfera</td><td>Mismo dibujo de día y de noche</td></tr>
<tr><td>Restringido por calado</td><td>Roja, roja, roja</td><td>Cilindro</td><td>Tres rojas: «tres veces cuidado»</td></tr>
<tr><td>Arrastrero</td><td>Verde sobre blanca</td><td>2 conos vértice con vértice</td><td>«Verde sobre blanco, arrastrero»</td></tr>
<tr><td>Pesquero (no arrastre)</td><td>Roja sobre blanca</td><td>2 conos vértice con vértice</td><td>«Rojo sobre blanco, pesca al cerco»</td></tr>
<tr><td>Práctico</td><td>Blanca sobre roja</td><td>—</td><td>«Blanco sobre rojo, práctico a bordo»</td></tr>
<tr><td>Fondeado</td><td>Blanca a proa (y a popa si ≥50 m)</td><td>1 esfera</td><td></td></tr>
<tr><td>Varado</td><td>Fondeo + roja, roja</td><td>3 esferas</td><td></td></tr>
<tr><td>Velero a motor</td><td>Las de motor</td><td>Cono vértice abajo</td><td></td></tr>
<tr><td>Remolque &gt;200 m</td><td>3 topes en vertical + amarilla</td><td>Bicono</td><td></td></tr>
<tr><td>Dragaminas</td><td>3 verdes en triángulo</td><td>3 esferas</td><td>Mantente a 1000 m</td></tr>
</table></div>
<div class="widget"><div class="eyebrow">Interactivo · ¿qué buque ves?</div>
<div class="grid2" style="align-items:center"><div id="vqFig"></div><div><div class="opts" id="vqOpts"></div><p class="small" id="vqFb"></p><div class="row"><button class="btn sm" id="vqNext">Otro</button><span class="small muted" id="vqSc"></span></div></div></div></div>`],
["sonido","Señales acústicas",`
<p>Una <b>pitada corta</b> dura ≈ 1 s y una <b>larga</b> de 4 a 6 s. Pulsa cada una para oírla (acelerada).</p>
<div class="grid2">${SOUNDS.map((s,i)=>`<button class="mark snd" data-i="${i}" style="text-align:left;display:block"><span class="mono" style="font-size:16px;letter-spacing:2px">${fmt(s[0])}</span><b style="font-size:16px">${s[1]}</b><span class="small muted">${s[2]}</span></button>`).join("")}</div>
<ul style="margin-top:12px">
<li><b>Fondeado</b> en niebla: repique rápido de campana durante 5 s cada minuto (≥100 m: además gong a popa). <b>Varado</b>: 3 campanadas separadas + repique + 3 campanadas.</li>
<li><b>Equipo acústico (regla 33)</b>: ≥12 m, pito; ≥20 m, pito y campana; ≥100 m, además gong. Menos de 12 m: cualquier medio eficaz.</li>
<li><b>Señal luminosa</b> (regla 34): los destellos de una luz blanca pueden acompañar a las pitadas de maniobra con el mismo significado.</li>
</ul>`],
["reglas26","Reglas 26 a 37 en detalle",`
<h3>Pesca, sin gobierno y maniobra restringida (26–27)</h3>
<ul>
<li><b>Pesca</b> (en navegación o fondeado), solo estas luces. <b>Arrastre</b>: verde sobre blanca; tope a popa más alto que la verde (opcional &lt;50 m); con arrancada, costados y alcance. <b>No arrastre</b>: roja sobre blanca; si el aparejo se extiende más de <b>150 m</b>, blanca todo horizonte o <b>cono vértice arriba</b> hacia el aparejo; con arrancada, costados y alcance. De día, ambos: dos conos unidos por los vértices. Fuera de faena, como cualquier buque de su eslora. El anexo II añade señales para pesqueros faenando juntos.</li>
<li><b>Sin gobierno</b>: dos rojas todo horizonte en vertical o dos bolas; con arrancada, más costados y alcance (nunca tope).</li>
<li><b>Maniobra restringida</b> (salvo dragaminas): roja-blanca-roja o bola-bicono-bola; con arrancada, más tope(s), costados y alcance; fondeado, más las de fondeo. Remolque que restringe en extremo: las de remolque (24a) más roja-blanca-roja.</li>
<li><b>Dragado u operaciones submarinas</b> con obstrucción: además, <b>dos rojas o dos bolas</b> en la banda de la obstrucción y <b>dos verdes o dos biconos</b> en la banda por la que se puede pasar. Fondeados, estas en lugar de las de fondeo.</li>
<li><b>Buceo</b> en buque pequeño: roja-blanca-roja y una <b>bandera A rígida de al menos 1 m</b> visible en todo el horizonte.</li>
<li><b>Dragaminas</b>: además de las de motor o fondeo, <b>tres verdes o tres bolas</b>, una en el tope del palo de proa y una en cada penol de su verga. Peligroso acercarse a menos de <b>1.000 m</b>.</li>
<li>Los de <b>menos de 12 m</b> no están obligados a las luces de la regla 27, <b>salvo los de buceo</b>. Estas señales no son de socorro (anexo IV).</li>
</ul>
<h3>Calado, práctico, fondeados, varados e hidroaviones (28–31)</h3>
<ul>
<li><b>Restringido por su calado</b>: luces de motor + <b>tres rojas</b> en vertical o un <b>cilindro</b> (es potestativo: «podrá exhibir»).</li>
<li><b>Práctico en servicio</b>: blanca sobre roja en el tope; navegando, más costados y alcance; fondeado, más las de fondeo. Fuera de servicio, como cualquier buque de su eslora.</li>
<li><b>Fondeado</b>: a proa blanca todo horizonte o bola; a popa otra blanca más baja. &lt;50 m: puede llevar solo una blanca. Luces de cubierta: opcionales, <b>obligatorias con ≥100 m</b>. &lt;7 m, fuera de canales, fondeaderos y zonas de tráfico: no está obligado.</li>
<li><b>Varado</b>: las de fondeo + <b>dos rojas</b> en vertical o <b>tres bolas</b>. &lt;12 m: no obligado a las rojas ni a las bolas.</li>
<li><b>Hidroaviones y WIG</b>: si no pueden llevar las luces reglamentarias, las más parecidas posibles.</li>
</ul>
<h3>Señales acústicas y luminosas (32–36)</h3>
<ul>
<li>Pitada <b>corta ≈ 1 s</b>; <b>larga 4–6 s</b>. Equipo: ≥12 m pito; ≥20 m pito y campana; ≥100 m además gong. Campana y gong pueden sustituirse por equipos equivalentes que puedan accionarse a mano. &lt;12 m: otro medio eficaz.</li>
<li><b>Maniobra</b> (buques de motor a la vista): 1 corta estribor, 2 babor, 3 atrás. Pueden acompañarse de <b>destellos</b> de luz blanca todo horizonte visible a <b>5 mn</b>: cada uno de ≈1 s, con ≈1 s entre ellos y <b>al menos 10 s</b> entre señales.</li>
<li><b>Canal angosto</b>: 2 largas + 1 corta, «le alcanzo por su estribor»; 2 largas + 2 cortas, «por su babor»; conformidad: larga-corta-larga-corta. <b>Duda</b>: al menos 5 cortas y rápidas (o 5 destellos). <b>Recodo</b>: una larga, contestada con otra larga. Si los pitos distan más de 100 m entre sí, solo se usa uno.</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Visibilidad reducida (regla 35)</th><th>Señal</th></tr>
<tr><td>Motor con arrancada</td><td>1 larga cada ≤2 min</td></tr>
<tr><td>Motor parado, sin arrancada</td><td>2 largas separadas por ≈2 s, cada ≤2 min</td></tr>
<tr><td>Sin gobierno, maniobra restringida, calado, vela, pesca, remolcando o empujando</td><td>1 larga + 2 cortas cada ≤2 min. Pesqueros y maniobra restringida <b>fondeados</b>, la misma.</td></tr>
<tr><td>Remolcado tripulado (el último)</td><td>1 larga + 3 cortas cada ≤2 min, justo después de la del remolcador</td></tr>
<tr><td>Unidad rígida empujador-empujado</td><td>Como un buque de motor</td></tr>
<tr><td>Fondeado</td><td>Repique de campana ≈5 s cada ≤1 min. ≥100 m: campana a proa y luego gong a popa ≈5 s. Opcional: corta-larga-corta para avisar a quien se acerque.</td></tr>
<tr><td>Varado</td><td>La de fondeado + 3 golpes de campana claros antes y después del repique; puede añadir una señal de pito.</td></tr>
<tr><td>12–20 m fondeado o varado</td><td>Campana no obligatoria; si no, otra señal eficaz cada ≤2 min</td></tr>
<tr><td>&lt;12 m</td><td>No obligado; si no, otra señal eficaz cada ≤2 min</td></tr>
<tr><td>Práctico en servicio</td><td>Además puede dar <b>4 cortas</b> de identificación</td></tr>
</table></div>
<p><b>Regla 36</b>: para llamar la atención, señales que no se confundan con otras o el haz del proyector hacia el peligro, sin molestar. Se evitan las luces intermitentes o giratorias de gran intensidad (<b>estroboscópicas</b>).</p>
<h3>Señales de peligro (regla 37, anexo IV)</h3>
<p>Además de las de la última sección: cohetes o granadas que despiden <b>estrellas rojas</b> uno a uno a cortos intervalos; alerta LSD en el <b>canal 70</b> o en 2187,5, 8414,5, 4207,5, 6312, 12577 o 16804,5 kHz; alerta buque-costera por <b>Inmarsat</b> u otro servicio por satélite; radiobalizas; y respondedores de radar de las embarcaciones de supervivencia. Para identificación desde el aire: <b>lona naranja con un cuadrado y un círculo negros</b>, y colorante en el agua. <b>Prohibido</b> usarlas salvo en peligro, o usar señales que puedan confundirse con ellas.</p>`],
["socorro","Señales de socorro (anexo IV)",`
<div class="grid3">
${["SOS (··· ——— ···) por cualquier medio","«MAYDAY» por radio","Cohete con paracaídas o bengala de mano roja","Humo naranja","Subir y bajar lentamente los brazos extendidos","Banderas N sobre C","Una bandera cuadra con una esfera encima o debajo","Sonido continuo con la bocina","Cañonazos a intervalos de 1 min","Llamas a bordo (un barril ardiendo)","Radiobaliza o alerta LSD","Colorante en el agua"].map(x=>`<div class="panel small">${x}</div>`).join("")}
</div>
<div class="note"><b>Ojo en el examen.</b> Una luz <b>blanca</b> o una bengala <b>blanca</b> no es señal de socorro: sirve para llamar la atención. La de socorro es <b>roja</b>.</div>`]
],
init(root){
  /* encounter */
  let es=0,en=0;const OPT=["Me aparto yo","Se aparta el otro: yo mantengo rumbo y velocidad","Los dos caemos a estribor"];
  const enc=()=>{const s=SC[r(0,SC.length-1)];const svg=$("#encSvg",root);
    const col=k=>k==="vela"?"var(--sea)":k==="pm"?"var(--paper)":"var(--warn-soft)";
    const lab={pm:"motor",vela:"velero",arr:"arrastrero",sg:"sin gobierno",cal:"calado"};
    let w="";if(s.wind!=null){const a=s.wind;w=`<g transform="rotate(${a} 40 40)"><line x1="40" y1="12" x2="40" y2="64" stroke="var(--accent)" stroke-width="3" marker-end="url(#wnd)"/></g><text x="40" y="84" text-anchor="middle" font-size="11" fill="var(--accent)">viento</text>`}
    svg.innerHTML=`<defs><marker id="wnd" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker><marker id="hd" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--muted)"/></marker></defs><rect width="300" height="320" rx="10" fill="var(--water)"/>${w}
      <line x1="150" y1="230" x2="150" y2="170" stroke="var(--muted)" stroke-dasharray="4 3" marker-end="url(#hd)"/>${boatTop(150,240,44,0,col(s.me))}<text x="150" y="290" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">TÚ (${lab[s.me]})</text>
      <g transform="translate(${s.o.x} ${s.o.y})"><line x1="0" y1="0" x2="${55*Math.sin(s.o.h*Math.PI/180)}" y2="${-55*Math.cos(s.o.h*Math.PI/180)}" stroke="var(--muted)" stroke-dasharray="4 3" marker-end="url(#hd)"/></g>${boatTop(s.o.x,s.o.y,40,s.o.h,col(s.o.k))}<text x="${s.o.x}" y="${s.o.y+(s.o.y<60?40:-30)}" text-anchor="middle" font-size="11" fill="var(--ink)">${lab[s.o.k]}</text>`;
    $("#encT",root).textContent=s.t;$("#encFb",root).textContent="";
    $("#encOpts",root).innerHTML=OPT.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("");
    $$("#encOpts .opt",root).forEach(b=>b.addEventListener("click",()=>{en++;const ok=+b.dataset.i===s.a;if(ok)es++;$$("#encOpts .opt",root).forEach(x=>{x.disabled=true;if(+x.dataset.i===s.a)x.classList.add("right")});if(!ok)b.classList.add("wrong");$("#encFb",root).innerHTML=s.e;$("#encSc",root).textContent=`${es}/${en}`},{once:true}))};
  $("#encNext",root).addEventListener("click",enc);enc();
  /* sectors */
  const ob=$("#obA",root),dot=$("#obsDot",root);
  const upo=()=>{const a=+ob.value;dot.setAttribute("transform",`rotate(${a} 150 150)`);const rel=a<=180?a:360-a;$("#obV",root).textContent=a<=180?`${a}° por su estribor`:`${360-a}° por su babor`;
    const see=[];if(rel<=112.5)see.push("tope blanca");if(a>0&&a<=112.5)see.push("verde");if(a>=247.5&&a<360)see.push("roja");if(a===0)see.push("roja y verde");if(rel>=112.5)see.push("alcance blanca");
    $("#obTxt",root).innerHTML="Ves: "+see.join(" + ")+(rel>112.5?" → le estás viendo por la popa":a===0?" → lo tienes de frente":"")};
  ob.addEventListener("input",upo);upo();
  /* simulator */
  let asp="proa",night=true;const sel=$("#vSel",root);
  const draw=()=>{const v=V.find(x=>x.id===sel.value);$("#vFig",root).innerHTML=drawVessel(v,asp,night).svg;$("#vNote",root).innerHTML=`<b>${v.name}.</b> ${v.note}`};
  sel.addEventListener("change",draw);
  $$("#aspBtns button",root).forEach(b=>b.addEventListener("click",()=>{asp=b.dataset.a;$$("#aspBtns button",root).forEach(x=>{x.classList.toggle("ghost",x!==b);x.setAttribute("aria-pressed",x===b)});draw()}));
  const nb=$("#nightB",root),db=$("#dayB",root);
  const setN=n=>{night=n;nb.classList.toggle("ghost",!n);db.classList.toggle("ghost",n);nb.setAttribute("aria-pressed",n);db.setAttribute("aria-pressed",!n);draw()};
  nb.addEventListener("click",()=>setN(true));db.addEventListener("click",()=>setN(false));draw();
  /* quiz */
  let qs=0,qn=0;
  const vq=()=>{const night=Math.random()<.75;const pool=V.filter(v=>v.id!=="pm12"&&(night||v.shapes.length));const v=pool[r(0,pool.length-1)];const aspects=night?["proa","er","br","popa"]:["er"];let a=aspects[r(0,aspects.length-1)];
    let d=drawVessel(v,a,night);
    const others=V.filter(x=>x.id!=="pm12"&&x.grp!==v.grp&&drawVessel(x,a,night).sig!==d.sig&&(night||x.shapes.length));
    const opts=shuffle([v,...shuffle(others).slice(0,3)]);
    $("#vqFig",root).innerHTML=d.svg+`<p class="small muted">${night?"De noche":"De día"}, visto ${a==="proa"?"por la proa":a==="popa"?"por la popa":"por su "+(a==="er"?"estribor":"babor")}.</p>`;
    $("#vqFb",root).textContent="";
    $("#vqOpts",root).innerHTML=opts.map(o=>`<button class="opt" data-id="${o.id}">${o.name}</button>`).join("");
    $$("#vqOpts .opt",root).forEach(b=>b.addEventListener("click",()=>{qn++;const ok=b.dataset.id===v.id;if(ok)qs++;$$("#vqOpts .opt",root).forEach(x=>{x.disabled=true;if(x.dataset.id===v.id)x.classList.add("right")});if(!ok)b.classList.add("wrong");$("#vqFb",root).innerHTML=v.note;$("#vqSc",root).textContent=`${qs}/${qn}`},{once:true}))};
  $("#vqNext",root).addEventListener("click",vq);vq();
  $$(".snd",root).forEach(b=>b.addEventListener("click",()=>{const p=SOUNDS[+b.dataset.i][0].replace(/·/g,".");b.classList.add("flash");setTimeout(()=>b.classList.remove("flash"),1000);horn(p)}));
}};
})();
(function(){
"use strict";
const {$,$$,CH,boatTop}=PER;
const AR=(id,c)=>`<marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`;

/* ================= TEMA 7 · MANIOBRA ================= */
function evolSVG(){
  return `<svg viewBox="0 0 600 300" role="img" aria-label="Curva de evolución"><defs><marker id="e1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--accent)"/></marker>${AR("e2","var(--sea)")}</defs>
  <rect width="600" height="300" fill="var(--water)" rx="10"/>
  <path d="M120 280 L120 200 C 120 120, 200 80, 290 80 C 400 80, 440 160, 400 220 C 360 270, 260 260, 230 200 C 210 160, 240 110, 300 100" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-dasharray="7 4"/>
  ${boatTop(120,262,30,0)}
  <line x1="120" y1="200" x2="120" y2="70" stroke="var(--muted)" stroke-dasharray="3 3"/>
  <line x1="96" y1="200" x2="96" y2="82" stroke="var(--accent)" stroke-width="2" marker-start="url(#e1)" marker-end="url(#e1)"/><text x="90" y="140" font-size="12" fill="var(--accent)" font-weight="700" text-anchor="end">avance</text><line x1="96" y1="80" x2="290" y2="80" stroke="var(--accent)" stroke-dasharray="3 3"/>
  <line x1="120" y1="40" x2="430" y2="40" stroke="var(--sea)" stroke-width="2" marker-start="url(#e2)" marker-end="url(#e2)"/><text x="275" y="32" font-size="12" fill="var(--sea)" font-weight="700" text-anchor="middle">diámetro táctico (al caer 180°)</text>
  <text x="140" y="230" font-size="12" fill="var(--ink)">metida del timón</text>
  <text x="440" y="260" font-size="12" fill="var(--muted)">diámetro final de evolución</text>
  </svg>`;
}
function walkSVG(){return `<svg viewBox="0 0 300 260" id="pwSvg" role="img" aria-label="Efecto de la hélice en la popa"><defs>${AR("pw","var(--accent)")}</defs><rect width="300" height="260" fill="var(--water)" rx="10"/>${boatTop(150,130,140,0)}<g id="pwArr"></g><text x="150" y="20" text-anchor="middle" font-size="12" fill="var(--muted)">proa</text></svg>`}
CH[7]={
intro:"Dos preguntas, casi siempre sobre el efecto de la hélice y del timón, o qué amarra trabaja en una maniobra. En las prácticas es lo que más vas a hacer: atracar y desatracar.",
sections:[
["fuerzas","Qué mueve el barco en una maniobra",`
<div class="grid3">
<div class="panel"><h4>Timón</h4><p>Solo gobierna si pasa agua por él: necesita <b>arrancada</b> o el chorro de la hélice. Avante, la popa cae al lado contrario de la caña… o hacia donde giras la rueda con la proa.</p></div>
<div class="panel"><h4>Hélice</h4><p>Empuja, y además «camina» lateralmente (<b>efecto evolutivo</b>): avante, una hélice dextrógira lleva la popa a estribor; atrás, a babor, y mucho más marcado.</p></div>
<div class="panel"><h4>Viento</h4><p>Lo que más influye en una lancha: la proa, alta y ligera, cae a sotavento. Maniobra <b>contra</b> el viento siempre que puedas: frena y controla.</p></div>
<div class="panel"><h4>Corriente</h4><p>Mueve el barco entero. Igual que el viento, mejor recibirla por la proa al atracar.</p></div>
<div class="panel"><h4>Arrancada</h4><p>La inercia. Un barco no tiene frenos: para pararlo hay que dar atrás. Calcula con tiempo.</p></div>
<div class="panel"><h4>Amarras</h4><p>Son una herramienta de maniobra: trabajando sobre un esprín puedes abrir la proa o la popa del muelle.</p></div>
</div>`],
["amarras7","Amarras: voces y efectos",`
<div class="tablewrap"><table>
<tr><th>Voz</th><th>Significa</th></tr>
<tr><td class="es">Atracar · desatracar</td><td>Arrimar el barco a un muelle · separarse de él</td></tr>
<tr><td class="es">Amarrar · desamarrar</td><td>Asegurar el barco en puerto o fondeadero con cabos, maromas o cadenas · lo contrario</td></tr>
<tr><td class="es">Encapillar la gaza en el noray</td><td>Pasarla <b>de abajo arriba por dentro</b> de las gazas que ya hay: así cualquier barco puede soltar la suya sin quitar las demás</td></tr>
<tr><td class="es">Amarrar por seno</td><td>Pasar el seno por el noray y hacer firmes <b>los dos chicotes a bordo</b>. Para largar basta soltar un chicote y cobrar del otro, sin ayuda de tierra</td></tr>
<tr><td class="es">Tomar vueltas · hacer firme</td><td>Dar vueltas a una bita, cornamusa o pasamanos para sujetar · afirmar con nudos o vueltas para que no se mueva</td></tr>
<tr><td class="es">Virar</td><td>Cobrar un cabo o cadena <b>por medios mecánicos</b> (molinete, cabrestante)</td></tr>
<tr><td class="es">Amollar</td><td>Soltar un poco de cabo</td></tr>
<tr><td class="es">Adujar</td><td>Enrollar el cabo en vueltas (adujas) para que ocupe poco y salga sin problemas</td></tr>
<tr><td class="es">Codera</td><td>Cabo que se da a una boya, muerto o barco para aguantar el barco con viento de fuera y que no apriete contra el muelle; también sirve para separarlo al desatracar</td></tr>
</table></div>
<h3>Qué hace cada amarra al cobrar de ella</h3>
<ul>
<li><b>Largo de proa</b>: atraca la proa y mueve el barco <b>avante</b>. <b>Largo de popa</b>: atraca la popa y lo mueve <b>atrás</b>.</li>
<li><b>Esprín de proa</b>: atraca la proa y lo mueve <b>hacia popa</b>. <b>Esprín de popa</b>: atraca la popa y lo mueve <b>hacia proa</b>. El esprín trabaja al revés que su largo y es muy útil para <b>abrir</b> la proa o la popa del muelle.</li>
<li><b>Traveses</b>: atracan de través y evitan que el barco se separe.</li>
<li><b>Coderas</b>: amarran a boyas y separan el costado del muelle.</li>
</ul>
<div class="key"><b>Idea clave.</b> Lo que atraca la proa desatraca la popa, y al revés. Para desatracar: con viento o corriente de <b>proa</b>, deja el <b>esprín de popa</b> y la proa se abre; de <b>popa</b>, deja el <b>esprín de proa</b> y se abre la popa; con viento fuerte <b>de fuera</b>, da una o dos coderas a una boya, muelle o barco y vira de ellas.</div>
<h3>Gobierno, velocidad de gobierno y arrancada</h3>
<ul>
<li><b>Caña</b>: la pala va a la banda contraria. Para caer a estribor, caña a <b>babor</b>. <b>Rueda</b> (con guardines): el barco cae hacia donde giras la rueda.</li>
<li><span class="es">Velocidad de gobierno</span>: la mínima con la que el barco sigue maniobrable desde el timón. <span class="es">Arrancada</span>: la velocidad que lleva. Sin arrancada, no hay velocidad de gobierno.</li>
</ul>`],
["helice","Efecto de la hélice",`
<div class="widget"><div class="eyebrow">Interactivo · hacia dónde va la popa</div>
<div class="grid2" style="align-items:center"><figure style="margin:0">${walkSVG()}</figure>
<div><div class="seg" style="margin-bottom:6px"><button class="btn sm pwD" data-v="dex" aria-pressed="true">Dextrógira</button><button class="btn sm ghost pwD" data-v="lev" aria-pressed="false">Levógira</button></div>
<div class="seg"><button class="btn sm pwM" data-v="av" aria-pressed="true">Avante</button><button class="btn sm ghost pwM" data-v="at" aria-pressed="false">Atrás</button></div>
<p id="pwTxt" style="font-weight:600;margin-top:10px"></p>
<p class="small muted">La hélice dextrógira gira en sentido horario vista desde popa en marcha avante. Sus palas inferiores trabajan en agua más densa y «empujan» la popa hacia ese lado.</p></div></div></div>
<ul>
<li><b>Sin arrancada, la popa cae a la banda hacia la que gira la hélice</b> (efecto de «rodadura»: presión lateral del agua impulsada por las palas sobre la obra viva), y la proa a la contraria. Atrás, una dextrógira gira a izquierdas: la popa cae a <b>babor</b> hasta que el barco coge arrancada; una levógira, a estribor.</li>
<li><b>Avante sin arrancada</b>: se gobierna desde el primer momento, porque el chorro de la hélice va directo a la pala del timón.</li>
<li><b>Atrás, parado y timón a la vía</b>: el chorro va hacia proa y no toca la pala; los primeros segundos el timón <b>no hace nada</b> y manda la presión lateral de las palas. Cuando el barco coge arrancada atrás, ya se gobierna con el timón.</li>
<li><b>Con arrancada avante y máquina atrás</b>: el barco frena y a la vez la popa cae a la banda de giro de la hélice (babor si dextrógira). Con arrancada atrás, se gobierna sujetando firme la caña o la rueda.</li>
<li><b>Dos hélices</b>: giran en sentidos contrarios para compensar sus efectos, avante y atrás.</li>
</ul>
<div class="key"><b>Consecuencia práctica.</b> Con una hélice dextrógira es más fácil <b>atracar por babor</b>: la palada final atrás para frenar acerca la popa al muelle. Atracando por estribor, esa palada la separa.</div>`],
["evolucion","Curva de evolución",`
<figure>${evolSVG()}</figure>
<ul><li><span class="es">Avance</span>: lo que avanza el barco desde que mete el timón hasta que ha caído 90°.</li><li><span class="es">Diámetro táctico</span>: separación lateral cuando ha caído 180°.</li><li>La curva es más cerrada a poca velocidad con mucha máquina momentánea (una palada), y más abierta a mucha velocidad.</li></ul>
<p><span class="es">Curva de evolución</span>: trayectoria (de su centro de gravedad) que describe el barco al girar con revoluciones y ángulo de timón <b>constantes</b>. Tiene tres fases:</p>
<ol><li><b>Fase de maniobra</b>: desde que empiezas a meter timón hasta que la pala llega al ángulo deseado.</li><li><b>Fase variable</b>: ángulo constante, pero aún sin equilibrio dinámico entre las fuerzas: el movimiento varía.</li><li><b>Fase uniforme</b>: desde que se alcanza ese equilibrio y mientras no cambien máquina ni timón.</li></ol>
<p>En la <b>fase de maniobra</b> el barco: pierde velocidad (la pala frena); cae hacia la banda de la metida; desplaza la popa hacia la banda <b>contraria</b> (<span class="es">rabeo</span>, ojo con la aleta al girar cerca de barcos, muelles o boyas); y <b>escora a la banda contraria</b> a la metida (fuerza centrífuga), más cuanto más rápido vaya.</p>
<p>Depende del barco, la velocidad, el viento y la ola, y del diseño de la obra viva: un <b>velero</b> pivota casi sobre su quilla (curva limpia, poco abatimiento y poco rabeo); una <b>lancha de obra viva plana</b> hace una curva muy abierta y con <b>rabeo acusado</b>.</p>`],
["ciaboga","Ciaboga y agentes externos",`
<p><span class="es">Ciabogar</span>: girar el barco en el mínimo espacio, casi sobre sí mismo, para orientar proa o popa. Viene de los botes de remos: <b>bogar</b> es remar para ir avante y <b>ciar</b>, para ir atrás; bogando con un remo y ciando con el otro, el bote pivota.</p>
<h3>Con una hélice dextrógira, ciaboga a estribor</h3>
<ol>
<li>Avante poco, timón a <b>estribor</b>, antes de que el barco coja arrancada: empieza el giro.</li>
<li>Atrás: frena y la popa cae a <b>babor</b>, es decir, la proa sigue cayendo a estribor. El timón se deja a estribor (atrás su efecto es nulo).</li>
<li>Se repite avante-atrás hasta tener la proa donde se quiere; después, avante con el timón a la vía.</li>
</ol>
<p class="small">Por eso con una dextrógira es más fácil ciabogar a <b>estribor</b>.</p>
<h3>Con dos hélices</h3>
<p>Una avante y otra atrás a la vez: la proa cae a la banda <b>contraria a la hélice que da avante</b> (motor de babor avante y de estribor atrás → proa a estribor). Como una hélice rinde mucho más avante, la que da atrás debe ir a unas <b>dobles revoluciones</b>, o el barco cogerá arrancada. Timones a la vía: su efecto es inapreciable.</p>
<h3>Viento, corriente y olas</h3>
<ul>
<li>El <b>viento</b> actúa sobre la obra muerta (barlovento, por donde entra; sotavento, por donde sale). Produce <span class="es">abatimiento</span>: desplazamiento lateral cuando entra por un costado; si entra por proa o popa, solo cambia la velocidad.</li>
<li>La <b>corriente</b> actúa sobre la obra viva: produce <span class="es">deriva</span>, desplazamiento en su dirección.</li>
<li>El <b>oleaje</b> (de viento o de corriente) actúa sobre todo el barco y dificulta las maniobras.</li>
<li><span class="es">Libre a sotavento</span>: mantenerse alejado de cualquier peligro a sotavento, con margen para maniobrar.</li>
</ul>`],
["puntas","Atraque de puntas y de costado, paso a paso",`
<p><span class="es">Atraque de puntas</span>: el barco queda con la crujía <b>perpendicular</b> al muelle, dándole la popa o la proa. Ahorra espacio en las marinas frente al atraque de costado. Queda con <b>dos largos al muelle</b> y uno o dos largos al agua, firmes a un <b>muerto</b> o una cadena del fondo.</p>
<ol>
<li>Atrás y muy despacio hacia el puesto, con el espejo de agua libre.</li>
<li>El largo de proa y su <b>guía</b> descansan en el fondo: el largo va del muerto a la guía, y la guía acaba con una gaza en el noray.</li>
<li>Cerca del muelle, un tripulante coge la guía con el bichero (o la da el marinero).</li>
<li>Se desplaza a proa tirando de la guía hasta recuperar el largo, lo tensa y lo hace firme en una cornamusa de proa. Otro tripulante, en popa, amarra por seno los largos de popa. La guía <b>no trabaja</b>: solo une el largo con el muelle.</li>
</ol>
<p class="small">Supuestos con una sola hélice <b>dextrógira</b> (popa a babor dando atrás). Defensas en ambos costados, sobre todo en sotavento, y amarras preparadas.</p>
<div class="tablewrap"><table>
<tr><th>Supuesto</th><th>Cómo</th></tr>
<tr><td>1 · Puesto a la banda de caída atrás (babor)</td><td>Paralelo al pantalán por fuera de la línea de muertos, poca arrancada; pasado un poco el hueco, atrás con timón a babor: la popa cae y entra.</td></tr>
<tr><td>2 · Puesto a la banda contraria</td><td>En una zona espaciosa, atrás hasta que el barco gobierne solo con el timón; desde ahí, marcha atrás gobernando hasta el hueco.</td></tr>
<tr><td>3 · Viento fuerte perpendicular o poca experiencia</td><td>Entrar <b>de proa</b>, avante con velocidad de gobierno y poca arrancada, y un poco atrás para parar. Pega: el timonel ve mal la distancia de la proa al muelle (de ahí las rodas golpeadas de los chárter).</td></tr>
</table></div>
<div class="key"><b>Orden de las amarras.</b> Al amarrar, <b>primero las de barlovento</b>: son las que trabajan en cuanto el barco se para. Al desamarrar, las de barlovento son <b>las últimas</b> en largarse.</div>
<ul>
<li><b>Viento de proa (del mar), popa al muelle</b>: primero el largo de proa, que es el de barlovento (que la popa no golpee el muelle): coger la guía, cobrar y hacer firme; enseguida, los largos de popa por seno. Desamarre: largos de popa y por último el de proa, dando ligeramente avante sin enganchar la guía.</li>
<li><b>Viento de popa (del muelle)</b>: la aproximación es fácil; el marinero ofrece la guía, pero lo primero son los <b>largos de popa</b> por seno, porque el viento separa del muelle; después la guía y el largo de proa. Desamarre: largar el largo de proa y dejar que se hunda con la guía, luego los de popa, y salir con muy poco avante.</li>
<li><b>Viento de través</b>: al parar, el barco cae a sotavento. Dar a la vez el largo de popa de barlovento y el de proa (el de barlovento si hay dos), luego el largo de popa de sotavento, y cobrar fuerte de los de barlovento. Desamarre: primero el de popa de sotavento (y el de proa si hay), luego el de popa de barlovento y, por último, el de proa dando avante, separando con el bichero, defensas en sotavento y sin enganchar la guía.</li>
</ul>
<h3>De costado a un muelle</h3>
<p>Aproximación <b>proa al viento o a la corriente</b>, o al más fuerte de los dos. Para salir hay que separar antes el barco: con viento del muelle basta largar amarras; en barcos pequeños, abriendo la popa con el bichero y saliendo atrás.</p>
<p><span class="es">Hacer cabeza</span> (cuando el viento acuesta el barco contra el muelle): defensa grande en la <b>amura</b> de babor, largar todo menos el <b>esprín de proa</b>, avante muy poco con timón a babor (hacia el muelle); la popa se abre; al final, largar y salir atrás.</p>
<p class="small">Premisas: atraque por babor, una hélice dextrógira, defensas en la banda de atraque y amarras adujadas y pasadas.</p>
<div class="tablewrap"><table>
<tr><th>Viento</th><th>Atraque</th><th>Desatraque</th></tr>
<tr><td>De proa, paralelo</td><td>Muy poco ángulo, poca arrancada, timón a la vía. Punto muerto (casi se para) y <b>largo de proa</b>. Poco atrás con timón a babor: la popa cae al muelle; largo de popa, luego esprines y traveses.</td><td>Largar traveses, largos y esprín de proa, defensa grande en la <b>aleta</b> de babor. Aguantar el <b>esprín de popa</b>, separar la proa con el bichero (el viento hace el resto), poco avante, largar el esprín y salir.</td></tr>
<tr><td>De popa, paralelo</td><td>Muy poco ángulo, punto muerto con velocidad de gobierno. Poco timón a babor y atrás (popa a babor). <b>Esprín de proa</b> para parar y atracar la proa; poco atrás, timón a la vía, largo de popa y largo de proa.</td><td>Largar las de popa, defensa a proa y aguantar el <b>esprín de proa</b> (hacer cabeza). Separar la popa en punto muerto o con muy poco avante y timón a babor; poco atrás, largar el esprín y salir atrás.</td></tr>
<tr><td>De dentro (del muelle al mar)</td><td>Ángulo algo más abierto, poca arrancada. Con la proa en el muelle, esprín de proa y muy poco avante con timón a estribor: el esprín frena y mete la popa (defensa en la amura de babor). Traveses enseguida, luego largos y esprín de popa.</td><td>Largar todo menos el esprín de proa, defensa a proa. En punto muerto el viento separa la popa; poco atrás, largar el esprín y salir. También puede hacerse abriendo la proa.</td></tr>
<tr><td>De fuera (del mar al muelle)</td><td>Ángulo abierto, muy poco avante o punto muerto. Con la proa cerca y sin arrancada, largo de proa y timón a estribor: el viento acuesta el barco. Timón a la vía, largo de popa y el resto.</td><td>Largar todo menos el esprín de proa, defensa a proa (hacer cabeza). Poco avante con timón a babor para abrir la popa; con la popa bien separada, poco atrás controlando la caída a babor, largar el esprín y salir atrás.</td></tr>
</table></div>
<h3>Abarloarse y amarrar a una boya</h3>
<ul>
<li><span class="es">Abarloarse</span>: amarrarse de costado a otro barco. Si ese barco está atracado, la maniobra es como atracar a un muelle, pero los <b>largos van al muelle</b> y <b>traveses y esprines al otro barco</b>.</li>
<li>Para <b>desabarloarse</b>, salir <b>a favor</b> del viento o la corriente, para que los barcos exteriores sigan firmes con sus estachas de barlovento. Ejemplo: el barco exterior larga las de sotavento (su largo de popa), el nuestro larga todo y sale avante hacia sotavento, y luego el exterior cobra y se abarloa al de muelle.</li>
<li>A un barco <b>fondeado</b> se llega <b>proa al viento</b>, que es como está todo barco fondeado.</li>
<li><b>Boya</b>: proa al viento y a la boya, velocidad de gobierno y muy poca arrancada, hasta quedar parado muy cerca y <b>a barlovento</b> de ella. Coger cabo o boya con el bichero y amarrar mejor <b>por seno</b>, con los dos chicotes a las cornamusas de proa.</li>
</ul>`],
["atraque","Atracar y desatracar",`
<figure><svg viewBox="0 0 600 200" role="img" aria-label="Secuencia de atraque de costado por babor"><defs>${AR("at","var(--accent)")}</defs>
<rect width="600" height="200" fill="var(--water)" rx="10"/><rect x="0" y="0" width="600" height="34" fill="var(--land)"/><text x="10" y="22" font-size="12" fill="var(--ink)">MUELLE</text>
${boatTop(90,140,70,62)}<text x="70" y="190" font-size="12" fill="var(--ink)">1 · 20–30°, muy despacio</text>
${boatTop(290,90,70,78)}<text x="230" y="190" font-size="12" fill="var(--ink)">2 · punto muerto, timón a Er</text>
${boatTop(490,62,70,90)}<path d="M450 92 Q 440 80 450 64" fill="none" stroke="var(--accent)" stroke-width="2.5" marker-end="url(#at)"/><text x="420" y="190" font-size="12" fill="var(--ink)">3 · palada atrás: la popa entra</text>
</svg><figcaption>Atraque de costado por babor con hélice dextrógira.</figcaption></figure>
<ol>
<li><b>Prepara</b> defensas y amarras en la banda del muelle antes de llegar. Reparte la tripulación: una persona a proa y otra a popa.</li>
<li><b>Aproxímate</b> a 20–30° del muelle, muy despacio, contra el viento o la corriente si es posible.</li>
<li>A una eslora, punto muerto; gira para ponerte paralelo y da una <b>palada atrás</b> para parar.</li>
<li>Da primero el <b>largo de proa</b> o el <b>esprín</b> (el cabo que impide el movimiento que llevas), después la popa.</li>
</ol>
<h3>Desatraque</h3>
<ul>
<li><b>Abrir la popa</b> (lo más habitual): largas todo menos el <b>esprín de proa</b>, timón hacia el muelle y avante despacio. La proa se apoya en el muelle (con defensa) y la popa se abre. Cuando está abierta, largas el esprín y sales <b>atrás</b>.</li>
<li><b>Abrir la proa</b>: trabajas sobre el <b>esprín de popa</b> dando atrás; la proa se abre y sales avante.</li>
<li>Con viento desde el muelle no hace falta: largas y el viento te separa.</li>
</ul>
<h3>Otras maniobras</h3>
<ul>
<li><b>Atraque en punta</b> (de popa, amarre mediterráneo): coger el <b>muerto</b> (con su cabo guía) o largar el ancla bien separado, entrar atrás despacio y dar las amarras de popa. Lo difícil es gobernar marcha atrás.</li>
<li><b>Coger una boya</b>: llegar proa al viento o a la corriente, a muy poca velocidad, y cogerla con el bichero por la amura.</li>
<li><span class="es">Abarloarse</span>: amarrarse al costado de otro barco, con defensas y con amarras propias a tierra.</li>
</ul>`],
["mar","Navegar con mar",`
<ul>
<li><b>Mar de proa</b>: reducir velocidad para no golpear y cortar las olas ligeramente por la amura.</li>
<li><b>Mar de popa</b>: cuidado con que el barco <b>se atraviese</b> (la ola levanta la popa y la cruza). Ajusta la velocidad a la de las olas y no bajes por la cara de la ola a toda máquina.</li>
<li><b>Mar de través</b>: la más incómoda y la de mayor balance. Si es grande, navegar en zigzag cogiéndola por la amura o la aleta.</li>
<li><b>Planeo</b>: con la cola o los <i>flaps</i> se trima la lancha. Proa abajo con ola corta; proa algo arriba para planear en aguas tranquilas.</li>
<li>Con poco fondo o en un canal estrecho, el barco gobierna peor y se «sienta»: velocidad reducida.</li>
</ul>`]
],
init(root){
  let d="dex",m="av";
  const up=()=>{const right=(d==="dex")===(m==="av");$("#pwTxt",root).innerHTML=`${d==="dex"?"Dextrógira":"Levógira"} ${m==="av"?"avante":"atrás"}: la popa cae a <b>${right?"estribor":"babor"}</b>, la proa a ${right?"babor":"estribor"}.`;
    const x2=right?230:70;$("#pwArr",root).innerHTML=`<path d="M150 205 Q ${(150+x2)/2} 230 ${x2} 200" fill="none" stroke="var(--accent)" stroke-width="4" marker-end="url(#pw)"/><text x="${right?240:60}" y="190" font-size="12" font-weight="700" fill="var(--accent)" text-anchor="${right?"start":"end"}">popa</text><path d="M150 ${m==="av"?"240 L150 225":"210 L150 238"}" stroke="var(--sea)" stroke-width="3"/><text x="150" y="254" text-anchor="middle" font-size="11" fill="var(--sea)">${m==="av"?"avante ↑":"atrás ↓"}</text>`};
  const bind=(cls,setv)=>$$(cls,root).forEach(b=>b.addEventListener("click",()=>{setv(b.dataset.v);$$(cls,root).forEach(x=>{x.classList.toggle("ghost",x!==b);x.setAttribute("aria-pressed",x===b)});up()}));
  bind(".pwD",v=>d=v);bind(".pwM",v=>m=v);up();
}};

/* ================= TEMA 8 · EMERGENCIAS ================= */
const FIRE={A:["Alfa · sólidos que hacen llama y brasa (madera, papel, lona, cabos), salvo metales","Enfriamiento con chorro de agua; también espuma o polvo ABC"],B:["Bravo · líquidos que arden en superficie: gasolina, gasoil, aceites, pinturas, alcohol","Sofocación: espuma o gas inerte; niebla de agua para enfriar. ¡Nunca agua a chorro!"],C:["Charlie · gases a presión: butano, propano, metano, hidrógeno","Cortar el gas; sofocación con gas inerte (o polvo)"],D:["Delta · metales ligeros: aluminio, magnesio (no alcalinos como sodio o potasio)","Polvos especiales (cloruro sódico, polvo de cobre para litio)"],F:["Aceites de cocina","Tapar (manta ignífuga) o extintor clase F. Nunca agua"],E:["Echo · equipos eléctricos con tensión (o un A–D en presencia de ellos)","Cortar la corriente. CO₂ o polvo seco. Nunca agua ni otro conductor"]};
CH[8]={
intro:"Tres preguntas: fuego, vías de agua, varada, abordaje, primeros auxilios y abandono. La idea que repite el examen es siempre la misma: primero valorar la situación y mantener la calma.",
sections:[
["fuego","Incendios",`
<div class="widget"><div class="eyebrow">Interactivo · el triángulo del fuego</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 260" id="ftSvg" role="img" aria-label="Triángulo del fuego"></svg>
<div><p class="small">Quita un lado del triángulo y el fuego se apaga. Cada forma de extinción ataca uno:</p>
<div class="seg"><button class="btn sm ghost ft" data-k="comb">Quitar combustible</button><button class="btn sm ghost ft" data-k="ox">Quitar oxígeno</button><button class="btn sm ghost ft" data-k="cal">Quitar calor</button><button class="btn sm ghost ft" data-k="">Restaurar</button></div>
<p id="ftTxt" style="font-weight:600"></p></div></div></div>
<div class="widget"><div class="eyebrow">Interactivo · qué extintor uso</div>
<div class="seg" id="fcBtns">${Object.keys(FIRE).map(k=>`<button class="btn sm ghost" data-c="${k}">Clase ${k}</button>`).join("")}</div><div class="info" id="fcInfo" style="margin-top:8px">Elige una clase de fuego.</div>
<p class="small muted">Clases UNE-EN 2: A, B, C, D y F. La «E» (eléctrico) no es una clase oficial pero el manual y el examen la usan. Clase F (Foxtrot): aceites y grasas de cocina; agente químico húmedo (espuma AFF de pH bajo) que enfría y forma una capa que impide que se reactive.</p></div>
<ol>
<li>Dar la <b>alarma</b> y pedir ayuda si no se controla en segundos.</li>
<li><b>Parar motores</b>, cortar el <b>combustible</b> y la <b>electricidad</b>.</li>
<li>Cerrar escotillas y puertas para quitar aire, y orientar el barco para que el fuego quede <b>a sotavento</b> del resto del barco y de las personas.</li>
<li>Atacar con el extintor a la <b>base de las llamas</b>, desde barlovento, en ráfagas cortas.</li>
</ol>
<h3>Tetraedro del fuego y métodos de extinción</h3>
<p>Además del triángulo, el examen pregunta por el <b>tetraedro</b>: <b>combustible, comburente (oxígeno), calor (temperatura de ignición) y reacción en cadena</b>. Basta eliminar uno.</p>
<div class="tablewrap"><table>
<tr><th>Método</th><th>Elimina</th><th>Con qué</th></tr>
<tr><td>Enfriamiento</td><td>Temperatura</td><td>Agua o niebla de agua</td></tr>
<tr><td>Sofocación</td><td>Oxígeno</td><td>CO₂ u otro gas inerte, espuma, mantas mojadas o arena, cierre hermético del compartimento y cortar la ventilación</td></tr>
<tr><td>Eliminación del combustible</td><td>Combustible</td><td>Cerrar llaves y válvulas, reducir la fuga, retirar el sólido que arde</td></tr>
<tr><td>Supresión de la reacción en cadena</td><td>Reacción</td><td>Polvo seco (bicarbonato sódico o potásico)</td></tr>
</table></div>
<p><b>El agua</b> absorbe mucho calor y, al evaporarse, aumenta unas <b>1.700 veces</b> su volumen y desplaza el aire (también sofoca). Pero reacciona con aluminio y magnesio liberando gases inflamables, conduce la electricidad y, más densa, no sirve en combustibles más ligeros. Ideal para clase <b>A</b>; ineficaz en <b>C</b>; peligrosa en <b>D</b> y <b>E</b>; en <b>B</b>, solo pulverizada (niebla) para refrigerar.</p>
<p><b>Extintores</b>: 21B ≈ 2 kg de polvo o 3,5 kg de CO₂; 34B ≈ 3 kg de polvo o 5 kg de CO₂; 55B ≈ 4 kg de polvo o 6,5 kg de CO₂. Siempre <b>en vertical</b> (inclinado, su rendimiento es parcial; nunca boca abajo).</p>
<h3>Al declararse un incendio</h3>
<ol>
<li><b>Localización</b>: dónde está, qué arde, qué extensión tiene, qué combustibles hay cerca y por dónde puede propagarse (comunicaciones, viento, corrientes).</li>
<li><b>Confinamiento</b>: el calor pasa por radiación, conducción (sólidos, líquidos, gases) y convección. Taponar conductos, cerrar puertas y portillos, parar ventiladores, refrescar y humedecer las zonas próximas.</li>
<li><b>Extinción</b>: quitar uno de los elementos del tetraedro.</li>
</ol>
<ul>
<li>No abrir de golpe un compartimento incendiado: con <b>monóxido de carbono</b> dentro, el aire puede provocar una explosión. No entrar en espacios cerrados sin máscara antigás (tipo OBA).</li>
<li>Impedir que el fuego llegue a combustibles cercanos y que se acerquen más; evitar que los vapores pasen a otras zonas.</li>
<li>Si es imposible sofocarlo, y sobre todo si hay riesgo de explosión, <b>abandonar el barco sin dilación</b>.</li>
</ul>
<h3>Socairear el fuego: rumbo para que el viento aparente sea cero</h3>
<ul>
<li>El foco principal debe quedar <b>a sotavento</b> del resto del barco.</li>
<li>Viento igual o más flojo que tu velocidad: <b>popa al viento</b>, igualando velocidades hasta tener viento aparente cero.</li>
<li>Viento más fuerte que el barco y fuego <b>a proa</b>: popa al viento a toda máquina. Fuego <b>a popa</b>: proa al viento con la mínima máquina para gobernar.</li>
<li>Si no se puede apagar y hay un fondo aplacerado y poco profundo cerca, se puede <b>hundir el barco</b> abriendo los grifos de fondo para reflotarlo después.</li>
</ul>
<p><b>Lugares de riesgo</b>: cocina (apagar cerrando la llave de paso para vaciar los conductos y dejarla cerrada), cámara de motores (bien ventilada: muchos gases pesan más que el aire y van a la sentina), tomas de combustible (sin derrames, tapas cerradas), baterías (gases explosivos y venenosos al cargar: ventilación), instalación eléctrica (sin chispas) y pañol de pinturas (ventilado, botes cerrados, brochas limpias y envueltas, sin calor cerca).</p>
<p><b>Dónde empieza</b>: cocina, cámara de motores, baterías (desprenden hidrógeno al cargar), instalación eléctrica, pañol de pinturas. <b>Al repostar</b>: motores y fogones apagados, no fumar, escotillas cerradas, imbornales tapados y ventilar después.</p>`],
["agua","Vías de agua",`
<figure><svg viewBox="0 0 600 200" role="img" aria-label="Puntos débiles del casco"><rect width="600" height="200" fill="none"/>
<rect x="0" y="100" width="600" height="100" fill="var(--water)"/>
<path d="M60 70 L540 60 C 528 100, 505 140, 462 160 L 122 164 L 82 138 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
${[[112,150,"limera (timón)"],[195,163,"bocina (eje)"],[300,163,"grifos de fondo"],[380,160,"tomas de mar / sonda"],[470,100,"manguitos y abrazaderas"]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="var(--bad)" opacity=".8"/><text x="${p[0]}" y="${i%2?40:24}" text-anchor="middle" font-size="12" fill="var(--ink)">${p[2]}</text><line x1="${p[0]}" y1="${(i%2?40:24)+4}" x2="${p[0]}" y2="${p[1]-9}" stroke="var(--muted)"/>`).join("")}
</svg></figure>
<p>Además de varadas y abordajes, el agua suele entrar por los orificios de la obra viva: <b>bocina, limera, grifos de fondo</b> de servicios y fregaderos, <b>manguitos, abrazaderas, escapes</b> e <b>imbornales</b> de la bañera. Hay que revisarlos periódicamente.</p>
<div class="key"><b>Primeras medidas</b>: localizar la vía de agua y <b>achicar</b> (el examen lo resume en «achicar e intentar taponar»).</div>
<ul><li><b>Localizar</b> la entrada (escuchar, palpar, ver de dónde sube el agua) y comprobar si es agua salada o dulce (puede ser un depósito).</li>
<li><b>Achicar</b> con las bombas eléctricas y manuales, y con baldes si hace falta.</li>
<li><b>Taponar</b>: <span class="es">espiches</span> (tapones cónicos de madera; conviene tener uno atado junto a cada grifo de fondo), trapos, cuñas o un <span class="es">pallete de colisión</span> (lona por fuera del casco, que la presión del agua aprieta).</li>
<li>Escorar el barco a la banda contraria para sacar la brecha del agua, si está cerca de la flotación y la mar es muy buena.</li>
<li><b>Bombas</b>: las manuales, de al menos <b>medio litro por embolada</b>; las eléctricas, unos <b>1.800 L/h</b>. Llevar <b>rotores de repuesto</b>: las palas se calientan y rompen al trabajar en vacío. Muy útiles las automáticas con sensor de nivel.</li>
<li><b>Otras medidas de fortuna</b>: <span class="es">turafallas</span> (disco de fieltro, goma o lona con un eje roscado y un brazo articulado que forman una «T»); sobre la flotación, con la zona seca, un tablero de <b>contrachapado marino</b> sellado con sicaflex o silicona; vías grandes, mantas, colchonetas o almohadas apuntaladas con puntales de madera. Las <b>encajonadas de cemento</b> (cajones apuntalados y rellenos de cemento rápido) no se usan en recreo.</li>
<li>Toda vía de agua implica <b>rumbo al puerto más cercano</b> o al más fácil de recalar.</li></ul>`],
["varada","Varada y abordaje",`
<div class="grid2">
<div class="panel"><h4>Varada involuntaria</h4><ol class="small"><li>Parar máquina y valorar daños en la obra viva: ¿hay vías de agua?</li><li>Sondar alrededor para ver por dónde hay más agua.</li><li>Valorar la resistencia del casco y la estabilidad según los puntos de apoyo (si baja la marea, un velero con orza puede acostarse y sufrir daños graves).</li><li>Reflotar: esperar a que suba la marea, trasladar pesos para cambiar el asiento o escorar hacia el lado de más fondo, aligerar carga, espiarse con el ancla o pedir remolque. Para avisar a Salvamento, canal 16.</li></ol></div>
<div class="panel"><h4>Abordaje</h4><ol class="small"><li>Investigar la gravedad de las averías y <b>detener el barco</b>. Comprobar si hay heridos.</li><li>Prestar ayuda al barco dañado.</li><li><b>No separarse</b> sin evaluar juntos la situación: la proa empotrada puede estar taponando la vía de agua y el abordado se hundiría.</li><li>Tomar los datos del otro (barco, seguro, titulación del patrón) y comunicarlo a la aseguradora; en tierra, pedir la <b>peritación</b>.</li><li>Si estás seguro de no ser culpable, formular una <b>protesta de mar</b> ante el juzgado más próximo.</li></ol></div>
</div>
<div class="tablewrap"><table>
<tr><th>Tipo de varada</th><th>Qué hacer</th></tr>
<tr><td>En seco (ha bajado la marea)</td><td>Apuntalar el barco, reparar averías y reflotar en pleamar con remolque y escora.</td></tr>
<tr><td>Fondo fangoso</td><td>No suele haber daños, pero el barco se incrusta, la hélice queda atrapada y las tomas de refrigeración pueden obturarse. Trasladar pesos para cambiar el asiento, anular el efecto ventosa «rabeando» (moviendo lateralmente a un lado y a otro), esperar la marea y, en el peor caso, aligerar carga.</td></tr>
<tr><td>Fondo rocoso</td><td>Si <b>no hay vías de agua</b>, <b>dar atrás rápidamente</b> o desplazar pesos para aliviar la zona varada.</td></tr>
<tr><td>Velero</td><td>Provocar escora para que pierda calado: izar todo el aparejo o templar una driza desde la perilla del palo (otra embarcación tira de ella desde su popa y da avante), controlando las tensiones del mástil. En el Mediterráneo, sin mareas, casi siempre hará falta otra embarcación.</td></tr>
</table></div>`],
["auxilios","Primeros auxilios",`
<div class="tablewrap"><table>
<tr><th>Situación</th><th>Qué hacer</th><th>Qué no hacer</th></tr>
<tr><td>Hemorragia</td><td>Presión directa con gasa limpia (unos 15 min) y elevar el miembro</td><td>Torniquete salvo último recurso</td></tr>
<tr><td>Hemorragia nasal</td><td>Sentarle y que se apriete suavemente las fosas nasales</td><td>Echar la cabeza hacia atrás</td></tr>
<tr><td>Quemadura</td><td>Agua fría 10–20 min, cubrir con apósito limpio (graso)</td><td>Reventar las ampollas, poner hielo</td></tr>
<tr><td>Golpe de calor / insolación</td><td>Sombra, enfriar, agua a sorbos si está consciente</td><td></td></tr>
<tr><td>Hipotermia</td><td>Quitar la ropa mojada, abrigar, calentar el tronco poco a poco, bebidas calientes</td><td>Alcohol, frotar las extremidades</td></tr>
<tr><td>Mareo</td><td>Aire fresco, mirar el horizonte, centro del barco, llevar el timón, comer algo ligero</td><td>Bajar al interior, leer</td></tr>
<tr><td>Ahogado inconsciente que no respira</td><td>RCP: 30 compresiones y 2 insuflaciones. Abrir la vía aérea con la maniobra frente-mentón</td><td>Perder tiempo intentando sacar el agua de los pulmones</td></tr>
<tr><td>Fractura</td><td>Inmovilizar en la postura en que esté</td><td>Intentar recolocarla</td></tr>
</table></div>
<div class="widget"><div class="eyebrow">Interactivo · ritmo de compresiones</div>
<div class="row"><button class="btn sm" id="rcpB">Iniciar metrónomo 110/min</button><span class="count" style="font-size:40px" id="rcpN">0</span><span class="muted small">de 30, luego 2 insuflaciones</span></div>
<p class="small muted">Comprime el centro del pecho 5–6 cm, a 100–120 por minuto, dejando que el pecho vuelva entero.</p></div>
<h3>Lo que dice el manual</h3>
<p>Los accidentes más frecuentes a bordo son <b>contusiones, heridas, fracturas y esguinces</b> (cubierta mojada, movimientos imprevistos, golpes de mar). Primera asistencia: alejar al herido del peligro o cortar la causa; observarle; controlar respiración y pulso (RCP si hace falta); localizar y detener hemorragias; no intentar reducir fracturas ni luxaciones, inmovilizar; <b>no dar nunca por muerto</b> a un accidentado; y después, consulta radiomédica y evacuación (Salvamento, Cruz Roja del Mar o arribar al puerto más próximo).</p>
<ul>
<li><b>Heridas</b>: traumatismos abiertos; riesgos inmediatos, pérdida de sangre e infección. Desinfectar y cubrir con un apósito estéril.</li>
<li><b>Contusiones</b>: traumatismos cerrados, graves en cabeza o abdomen por posibles hemorragias internas. En la cabeza, vigilar pérdida de conocimiento y vómitos; en el tórax, dolor fuerte al toser o moverse puede indicar costillas rotas (reposo total); en el abdomen, riesgo para vejiga, hígado, riñones. Reposo, observación y consulta radiomédica.</li>
<li><b>Hemorragias</b>: <b>arterial</b>, rojo vivo, a borbotones con el pulso (reducir cuanto antes); <b>venosa</b>, rojo oscuro y continua; <b>capilar</b>, intermedia y poco importante. Riesgo: shock. Medio litro se tolera; 1,5 L es grave; 3 L, mortal. El torniquete, como <b>última medida</b>, se pone <b>entre la herida y el corazón</b>, un poco por encima; temporal (el manual dice máximo 3 h aflojándolo cada cuarto de hora). Evacuar con los pies más altos que el cuerpo. En la venosa, vendaje compresivo por debajo de la herida.</li>
<li><b>Quemaduras</b>: su gravedad depende sobre todo de la <b>extensión</b> (la palma de la mano ≈ 1 % del cuerpo): más del 33 % es grave; menos del 10 %, leve. Zonas más graves: cara y cuello, manos y pies, genitales, pliegues y orificios. <b>1.er grado</b>: enrojecimiento y dolor. <b>2.º</b>: ampollas de líquido transparente, dolor intenso. <b>3.er</b>: costras, nervios destruidos, menos dolor pero más riesgo (shock, infección); no quitar la costra y prevenir el tétanos. Ampollas: cubrir con apósitos grasos, <b>no romper nunca</b>.</li>
<li><b>Quemaduras solares</b>: el viento reduce la sensación de calor y aumenta el riesgo. Filtro alto unos <b>30 min antes</b> (cara, nariz, orejas, hombros), bálsamo labial, exposición moderada, evitar el mediodía, gorra, gafas y manga larga. Pueden tardar 24 h en manifestarse. Tratamiento: analgésico (ibuprofeno; <b>nunca aspirina a los niños</b>), cremas de cortisona o aloe vera, bañarse en el mar, compresas frías, no reventar ampollas, ropa holgada de algodón.</li>
<li><b>Insolación</b>: cara roja y caliente, dolor de cabeza en la frente, náuseas y vómitos, fatiga y calambres, sed intensa y sudor. Sombra, lugar fresco y ventilado, posición <b>semisentado</b>, compresas frías en frente y nuca, sorbos de agua fresca.</li>
<li><b>Mareo</b>: boca pastosa, somnolencia, náuseas, dolor de cabeza, sudor frío; vómitos repetidos pueden deshidratar. Se supera navegando con continuidad. Prevención con dimenhidrinato (Biodramina) una hora antes de embarcar, siguiendo el prospecto. Ya mareado: quieto, reclinado, mirando un punto fijo lejano o cerrando los ojos, en el centro del barco; comer algo seco (galletas, pan tostado), no en ayunas. El primer vómito suele marcar el inicio de la mejoría; si se repite, sales de rehidratación oral.</li>
</ul>
<div class="note"><b>Ojo: consejos anticuados.</b> El manual propone para las quemaduras sumergirlas o aplicar alcohol, y para el inconsciente el lado derecho; también cita mercromina, morfina y pomadas antiguas. Las pautas actuales de primeros auxilios dicen otra cosa: <b>agua fría 10–20 min</b> para la quemadura (nunca alcohol) y <b>posición lateral de seguridad</b>, sin importar el lado. En el examen de la GVA, lo que se ha preguntado es «apósitos grasos y venda», «compresión directa» y «torniquete entre la herida y el corazón».</div>
<h3>Servicio Radiomédico y Guía sanitaria</h3>
<ul>
<li>El <b>Centro Radio-Médico Español (CRME)</b> depende del <b>Instituto Social de la Marina (ISM)</b>. Se contacta por una estación costera pidiendo «consulta médica», por teléfono al <b>913 103 475</b> (24 h, los 365 días) o, con Inmarsat o móvil, marcando ese número directamente. Fax 913 083 302; télex 43340.</li>
<li>El ISM recomienda las consultas no urgentes o de control <b>entre las 09:00 y las 15:00</b> (hora peninsular); fuera de ese horario solo hay un médico de guardia.</li>
<li>La <b>Guía sanitaria a bordo</b> (Guía médica sanitaria), del ISM, es gratuita; se reparte en mercantes y pesqueros y se puede descargar. Sirve para las consultas a distancia, para usar bien el botiquín y como guía de prevención.</li>
</ul>
<p>Botiquín: el que corresponde a la zona de navegación.</p>`],
["abandono","Abandono, helicóptero y comunicaciones",`
<ul>
<li><b>Abandonar el barco es el último recurso</b>: solo con peligro inminente de hundimiento o un incendio declarado con gran riesgo de explosión. Se está más seguro encima del barco, aunque esté escorado, semihundido o con la quilla al aire.</li>
<li>Antes: instruir a quien embarca sobre los medios de salvamento y dónde están; decidido el abandono, alerta de socorro por <b>LSD canal 70</b> o voz por el <b>16</b> indicando la naturaleza («abandono»), activar el <b>respondedor de radar</b> y la <b>radiobaliza</b>; coger agua (lo primero para sobrevivir), comida energética y la pirotecnia.</li>
<li><b>Saltar al agua</b> por <b>sotavento</b> (por barlovento si hay incendio o combustible derramado a sotavento), con el chaleco puesto, de pie y los brazos cruzados sujetándolo. El chaleco hinchable no se dispara hasta estar en el agua. Traje de agua puesto y bien cerrado en muñecas, tobillos y cuello: aísla. Alejarse unos metros, siempre hacia la balsa.</li>
<li><b>En el agua</b>: los peligros son asfixia, hipotermia, sed, hambre y estrés por miedo. Posición <b>fetal</b> (HELP: rodillas a la barbilla, brazos cruzados al pecho, pies cruzados). En grupo, <b>agruparse</b> o formar un <b>círculo</b> cogidos de los brazos: conserva calor, ayuda a los más débiles y se ve mejor. Si se ve un buque, encender una bengala o bote de humo en el centro del círculo.</li>
<li><b>Pirotecnia</b>: solo cuando haya certeza de que alguien la puede ver, siempre por sotavento; leer antes las instrucciones.</li>
<li>La <b>balsa</b> se lanza por sotavento, sujeta por su boza (al tirar de ella se infla). Se sube sin mojarse si se puede; si hay que saltar al agua, con los brazos cruzados sobre el chaleco y las piernas juntas.</li>
<li><b>Evacuación en helicóptero</b>: despejar la cubierta, navegar a rumbo constante con el viento entrando por la <b>amura de babor</b> (unos 30°), no tocar el cable ni el gancho hasta que toquen el agua o el barco (descarga electrostática) y nunca hacerlo firme al barco.</li>
<li><b>Prioridad de las llamadas</b>: MAYDAY (socorro, peligro grave e inminente) &gt; PAN PAN (urgencia) &gt; SÉCURITÉ (seguridad, avisos). Canal 16 VHF, LSD por el 70.</li>
</ul>
<div class="script">MAYDAY MAYDAY MAYDAY
AQUÍ  [nombre ×3]  [indicativo]  MMSI [nº]
MAYDAY  [nombre]
POSICIÓN  [lat/long o demora y distancia]
NATURALEZA  [vía de agua / incendio / hombre al agua…]
AYUDA REQUERIDA · [nº] PERSONAS A BORDO · otra info
CAMBIO</div>`]
],
init(root){
  const sv=$("#ftSvg",root);
  const draw=k=>{const f=!k;const side=(p,q,lab,key,tx,ty)=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${key===k?"var(--line)":"var(--accent)"}" stroke-width="10" stroke-linecap="round" ${key===k?'stroke-dasharray="2 14"':""}/><text x="${tx}" y="${ty}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">${lab}</text>`;
    sv.innerHTML=`${side([150,30],[40,220],"COMBUSTIBLE","comb",55,110)}${side([150,30],[260,220],"OXÍGENO","ox",250,110)}${side([40,220],[260,220],"CALOR","cal",150,250)}
    ${f?`<path d="M150 190 C 120 170, 128 130, 150 100 C 152 125, 168 130, 162 150 C 175 140, 178 120, 172 110 C 195 135, 190 180, 150 190 Z" fill="#ff7a1a"/><path d="M150 188 C 136 176, 140 156, 150 140 C 156 158, 166 166, 150 188Z" fill="#ffd60a"/>`:`<text x="150" y="160" text-anchor="middle" font-size="14" fill="var(--muted)">apagado</text>`}`;
    $("#ftTxt",root).innerHTML={comb:"Cortar el combustible o retirar lo que arde.",ox:"Sofocar: cerrar escotillas, manta, espuma, CO₂.",cal:"Enfriar: agua (solo clase A).","":"Con los tres lados (y la reacción en cadena) hay fuego."}[k]};
  $$(".ft",root).forEach(b=>b.addEventListener("click",()=>draw(b.dataset.k)));draw("");
  $$("#fcBtns button",root).forEach(b=>b.addEventListener("click",()=>{$$("#fcBtns button",root).forEach(x=>x.classList.toggle("ghost",x!==b));const f=FIRE[b.dataset.c];$("#fcInfo",root).innerHTML=`<b>Clase ${b.dataset.c}</b>: ${f[0]}. → ${f[1]}.`}));
  let t=null,n=0;const b=$("#rcpB",root);
  b.addEventListener("click",()=>{if(t){clearInterval(t);t=null;b.textContent="Iniciar metrónomo 110/min";return}n=0;b.textContent="Parar";t=setInterval(()=>{n=n%30+1;$("#rcpN",root).textContent=n;PER.horn(".",0.25)},545)});
  this._cleanup=()=>{if(t)clearInterval(t)};
}};

/* ================= TEMA 9 · METEOROLOGÍA ================= */
const BF=[[0,"Calma","<1",0,"Mar como un espejo"],[1,"Ventolina","1–3",1,"Rizos sin espuma"],[2,"Flojito","4–6",2,"Olas pequeñas, crestas sin romper"],[3,"Flojo","7–10",2,"Crestas que empiezan a romper, algún borreguillo"],[4,"Bonancible","11–16",3,"Olas más largas, borreguillos frecuentes"],[5,"Fresquito","17–21",4,"Olas moderadas, muchos borreguillos, algún roción"],[6,"Fresco","22–27",5,"Olas grandes, crestas de espuma blanca por todas partes"],[7,"Frescachón","28–33",6,"La mar engruesa, espuma en franjas"],[8,"Temporal","34–40",7,"Olas altas, rompientes, espuma en densas franjas"],[9,"Temporal fuerte","41–47",7,"Olas muy altas, rociones que reducen la visibilidad"],[10,"Temporal duro","48–55",8,"Mar blanca, olas muy altas con crestas largas"],[11,"Temporal muy duro","56–63",8,"Olas excepcionalmente altas"],[12,"Temporal huracanado","≥64",9,"Aire lleno de espuma y rociones"]];
const DG=[["Calma (llana)","0 m"],["Rizada","0–0,1 m"],["Marejadilla","0,1–0,5 m"],["Marejada","0,5–1,25 m"],["Fuerte marejada","1,25–2,5 m"],["Gruesa","2,5–4 m"],["Muy gruesa","4–6 m"],["Arbolada","6–9 m"],["Montañosa","9–14 m"],["Enorme","> 14 m"]];
const WR=[[0,"Tramontana","N"],[45,"Gregal","NE"],[90,"Levante","E"],[135,"Siroco · xaloc","SE"],[180,"Mediodía · migjorn","S"],[225,"Lebeche · garbí","SW"],[270,"Poniente","W"],[315,"Mistral · maestral","NW"]];
function isobarSVG(){
  let s=`<svg viewBox="0 0 600 300" role="img" aria-label="Isobaras con una borrasca y un anticiclón"><defs>${AR("w9","var(--sea)")}</defs><rect width="600" height="300" fill="var(--paper)" rx="10"/>`;
  [40,75,110].forEach((rr,i)=>s+=`<ellipse cx="160" cy="150" rx="${rr*1.25}" ry="${rr}" fill="none" stroke="var(--bad)" stroke-width="1.6"/><text x="160" y="${150-rr+12}" font-size="10" fill="var(--bad)" text-anchor="middle">${996+i*4}</text>`);
  [40,80,120].forEach((rr,i)=>s+=`<ellipse cx="440" cy="150" rx="${rr*1.05}" ry="${rr}" fill="none" stroke="var(--sea)" stroke-width="1.6"/><text x="440" y="${150-rr+12}" font-size="10" fill="var(--sea)" text-anchor="middle">${1028-i*4}</text>`);
  s+=`<text x="160" y="160" text-anchor="middle" font-size="30" font-weight="700" fill="var(--bad)">B</text><text x="440" y="160" text-anchor="middle" font-size="30" font-weight="700" fill="var(--sea)">A</text>`;
  /* winds HN: low anticlockwise inward; high clockwise outward */
  const arrows=(cx,cy,R,low)=>{let o="";for(let a=0;a<360;a+=45){const t=a*Math.PI/180;const x=cx+R*1.15*Math.cos(t),y=cy+R*Math.sin(t);const tang=low?-1:1;const dx=-Math.sin(t)*tang*22+(low?-Math.cos(t)*9:Math.cos(t)*9),dy=Math.cos(t)*tang*22+(low?-Math.sin(t)*9:Math.sin(t)*9);o+=`<line class="wind" x1="${x}" y1="${y}" x2="${x+dx}" y2="${y+dy}" stroke="var(--sea)" stroke-width="2.4" marker-end="url(#w9)"/>`}return o};
  s+=`<g id="windG" opacity="0">${arrows(160,150,92,true)}${arrows(440,150,100,false)}</g>`;
  return s+`<text x="20" y="290" font-size="11" fill="var(--muted)">Hemisferio norte · isobaras en hPa</text></svg>`;
}
function breezeSVG(){return `<svg viewBox="0 0 600 220" id="brSvg" role="img" aria-label="Brisa de mar y de tierra"></svg>`}
function roseSVG(){const c=150;let s=`<svg viewBox="0 0 300 300" role="img" aria-label="Rosa de los vientos del Mediterráneo"><circle cx="${c}" cy="${c}" r="120" fill="var(--paper)" stroke="var(--line)"/>`;
  WR.forEach(w=>{const t=(w[0]-90)*Math.PI/180;const x=c+100*Math.cos(t),y=c+100*Math.sin(t);s+=`<line x1="${c}" y1="${c}" x2="${c+120*Math.cos(t)}" y2="${c+120*Math.sin(t)}" stroke="var(--line)"/><polygon points="${c+20*Math.cos(t-0.2)},${c+20*Math.sin(t-0.2)} ${c+86*Math.cos(t)},${c+86*Math.sin(t)} ${c+20*Math.cos(t+0.2)},${c+20*Math.sin(t+0.2)}" fill="${w[0]%90?"var(--muted)":"var(--ink)"}"/><text x="${c+134*Math.cos(t)}" y="${c+134*Math.sin(t)+4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--ink)">${w[2]}</text><text x="${x}" y="${y+(w[0]===0?-10:w[0]===180?18:0)}" text-anchor="middle" font-size="10" fill="var(--accent)" dx="${w[0]>0&&w[0]<180?-18:w[0]>180?18:0}">${w[1].split(" · ")[0]}</text>`});
  return s+`</svg>`}
CH[9]={
intro:"Cuatro preguntas. Lo que más cae: presión e isobaras, cómo gira el viento en borrascas y anticiclones, Buys-Ballot, escalas Beaufort y Douglas, brisas y nieblas. Y lo más útil en la mar: saber leer un parte y la tendencia del barómetro.",
sections:[
["importancia","El tiempo y la seguridad: cómo obtener el parte",`
<p>El viento es la <b>causa fundamental del mal tiempo</b> en la mar: según su fuerza, levanta el oleaje que afecta a la estabilidad del barco y a la tripulación (junto con otros factores, como las corrientes). Hoy, estudiando antes la situación, una navegación puede ser razonablemente segura si no dura más de <b>48–72 horas</b>, el horizonte de las previsiones fiables a corto plazo. Zarpar sin conocer la previsión, o sin instrumentos adecuados, puede tener consecuencias muy graves: hay que <b>leerla cada día antes de salir</b>.</p>
<ul>
<li><b>Clubes náuticos y puertos deportivos</b>: tienen los partes locales.</li>
<li><b>VHF</b>: Salvamento Marítimo emite los partes costeros de AEMET a horas fijas; se anuncian por el <b>canal 16</b> y luego se pasa al canal de trabajo que indiquen.</li>
<li><b>Televisión e internet</b>: en la web de AEMET, <i>El tiempo → Predicción → Marítima</i>, eliges tu zona del litoral y lees el parte de aguas costeras y alta mar a 72 horas. Desde ahí, los <i>enlaces asociados</i> llevan a los modelos de viento y oleaje de <b>Puertos del Estado</b>, con mapas en color (azul, poca intensidad; rojo y negro, la mayor) y datos en tiempo real de viento, corrientes y oleaje.</li>
<li><b>Mapas isobáricos</b>: en AEMET, <i>Predicción → Modelos numéricos</i>, con previsión a 72 h, actualizados cada 6 horas.</li>
</ul>
<p class="small">Un parte costero suele traer, por este orden: <b>avisos</b> (si los hay), la <b>situación general</b> (bajas y altas con su presión y evolución) y la <b>predicción por zonas</b> (dirección y fuerza del viento, estado de la mar, mar de fondo, visibilidad y chubascos).</p>`],
["presion","Presión atmosférica e isobaras",`
<ul>
<li>Presión normal: <b>1013 hPa</b> (milibares) = 760 mm de mercurio. Se mide con el <b>barómetro</b> (aneroide: una cápsula metálica de vacío que se deforma) y su registro continuo con el <b>barógrafo</b>.</li>
<li>Lo importante es la <b>tendencia</b>: una caída de 3 hPa o más en 3 horas anuncia viento fuerte. Caída lenta y continua: empeora poco a poco. Subida rápida tras un frente: viento racheado que luego amaina.</li>
<li><span class="es">Isobaras</span>: líneas que unen puntos de igual presión. <b>Cuanto más juntas, más viento</b> (mayor gradiente).</li>
</ul>
<h3>Qué es y cómo se mide</h3>
<ul>
<li><b>Presión atmosférica</b>: el peso de la columna de aire, por unidad de superficie, sobre un lugar; se debe a la atracción de la Tierra sobre la masa de aire.</li>
<li><b>Unidades</b>: los <b>milímetros de mercurio</b> vienen del experimento de <b>Torricelli</b> (1643). Después se usó la <b>baria</b>, unidad del sistema cegesimal (CGS: centímetro, gramo, segundo): una dina sobre un cm². Hoy, la del Sistema Internacional es el <b>pascal</b> (Pa): 1 newton sobre 1 m² (1 Pa = 10 barias). <b>1 hPa = 100 Pa = 1 milibar</b>.</li>
<li><b>Valor normal</b> al nivel del mar (a 0 °C y 45° de latitud): <b>760 mm = 1013,25 mb = 1013,25 hPa = 1 atmósfera</b>. En el examen suele aparecer como 1013,2 mb.</li>
<li><b>Barómetro aneroide</b>: el más usado a bordo por su lectura fácil y su robustez. Cápsulas metálicas onduladas con vacío parcial que se contraen o expanden con la presión y mueven una aguja sobre un limbo graduado. El <b>barógrafo</b> la mide y registra de forma continua.</li>
<li>Para el navegante importa poco el valor exacto: lo que importa es <b>cómo varía</b> en un periodo de tiempo.</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Barómetro</th><th>Indica</th></tr>
<tr><td>Sube lento y suave</td><td>Tendencia a la mejoría</td></tr>
<tr><td>Sube brusco y rápido</td><td>Mejoría pero con vientos fuertes (por el gradiente)</td></tr>
<tr><td>Baja lento y suave</td><td>Tendencia al empeoramiento</td></tr>
<tr><td>Baja brusco y rápido</td><td>Empeoramiento con vientos fuertes, precipitaciones y riesgo de temporal</td></tr>
</table></div>
<p class="small">Según el manual, una variación es <b>suave y lenta</b> si no pasa de <b>1,3 mb en una hora</b>, y <b>grande</b> si llega a <b>2 mb en una hora</b>. <span class="es">Gradiente de presión</span>: diferencia de presión entre dos puntos al mismo nivel, por unidad de distancia.</p>
<h3>Temperatura</h3>
<ul>
<li>Grado de calor de los cuerpos; en meteorología, el de la atmósfera. A más altura, <b>menos temperatura</b>, porque la atmósfera se calienta desde abajo, con el calor que devuelve la Tierra. <span class="es">Gradiente térmico</span>: variación de temperatura con la altura.</li>
<li>La tierra se calienta y se enfría mucho más deprisa que el mar, que retiene el calor: por eso las oscilaciones son menores en las zonas marítimas que en las continentales.</li>
<li>Al día, la <b>máxima</b> se da entre 2 y 3 horas después de pasar el Sol por el meridiano (mediodía solar) y la <b>mínima</b>, una media hora después de salir el Sol. La <b>temperatura media</b> es la semisuma de la máxima y la mínima.</li>
<li>Se mide con el <b>termómetro</b> (el de mercurio se basa en la dilatación del líquido). Escala <b>Celsius o centígrada</b>: 0° es la fusión del hielo (congelación del agua) y 100° la ebullición, con 100 divisiones. Como con la presión, importa más la <b>variación</b> que el valor exacto.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · el viento en las isobaras</div>
<figure>${isobarSVG()}</figure><div class="row"><button class="btn sm" id="wBtn">Mostrar el viento</button><span class="small muted">En el hemisferio norte: borrasca (B) antihoraria y hacia dentro; anticiclón (A) horario y hacia fuera.</span></div></div>
<div class="grid2">
<div class="panel"><h4>Borrasca · baja presión</h4><p>También <b>depresión</b> o ciclón extratropical: isobaras cerradas con la presión <b>disminuyendo hacia el centro</b>. «B» en los mapas («L», <i>low</i>, en inglés). Se forma cuando el aire se calienta, se aligera y sube. Viento a unos <b>10–30°</b> de las isobaras, hacia el centro. Aire que <b>converge y asciende</b>: nubes, lluvia y viento. En el hemisferio norte el viento gira en sentido <b>antihorario</b> y hacia dentro. Lleva asociados los frentes.</p></div>
<div class="panel"><h4>Anticiclón · alta presión</h4><p>Isobaras cerradas con la presión <b>aumentando hacia el centro</b>. «A» («H», <i>high</i>). El aire se hace más pesado y baja. Viento a 10–30° de las isobaras, alejándose del centro. Aire que <b>desciende y diverge</b>: tiempo estable, cielos despejados, vientos flojos. Gira en sentido <b>horario</b> y hacia fuera. En verano, posibles nieblas y calimas.</p></div>
</div>`],
["buys","Ley de Buys-Ballot",`
<div class="widget"><div class="eyebrow">Interactivo · ¿dónde está la borrasca?</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 300" id="bbSvg" role="img" aria-label="Buys-Ballot"></svg>
<div><label class="small">El viento viene del: <b id="bbV"></b></label><input type="range" id="bbA" min="0" max="345" step="15" value="180">
<p id="bbTxt" style="font-weight:600"></p>
<p class="small muted">Hemisferio norte: <b>de espaldas al viento</b>, las bajas presiones quedan a tu <b>izquierda</b> y algo adelantadas; las altas, a la derecha y algo atrás. En el hemisferio sur, al revés.</p></div></div></div>`],
["frentes","Frentes, nubes y nieblas",`
<figure><svg viewBox="0 0 600 160" role="img" aria-label="Símbolos de frentes"><rect width="600" height="160" fill="var(--paper)" rx="10"/>
<path d="M30 60 Q 150 40 270 60" fill="none" stroke="#2a62c9" stroke-width="3"/>${[60,110,160,210].map(x=>`<polygon points="${x},${52} ${x+16},${50} ${x+8},${36}" fill="#2a62c9"/>`).join("")}<text x="150" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="#2a62c9">FRENTE FRÍO</text><text x="150" y="120" text-anchor="middle" font-size="11" fill="var(--muted)">cumulonimbos, chubascos, rolada brusca</text>
<path d="M330 60 Q 450 40 570 60" fill="none" stroke="var(--red)" stroke-width="3"/>${[360,410,460,510].map(x=>`<path d="M${x} 53 A 8 8 0 0 1 ${x+16} 51" fill="var(--red)"/>`).join("")}<text x="450" y="100" text-anchor="middle" font-size="13" font-weight="700" fill="var(--red)">FRENTE CÁLIDO</text><text x="450" y="120" text-anchor="middle" font-size="11" fill="var(--muted)">nubes que se espesan, lluvia continua</text></svg></figure>
<ul>
<li><b>Trayectorias</b>: en el hemisferio norte, las borrascas se desplazan de <b>oeste a este</b>, cargándose de humedad al cruzar el Atlántico (otras masas de aire pueden desviarlas). Los anticiclones se mueven muy despacio, casi fijos en zonas concretas, y toman su nombre: el <b>anticiclón de las Azores</b>.</li>
<li><b>Por qué sopla el viento</b>: el aire calentado por el Sol se dilata, pierde densidad y sube; el aire va siempre de las <b>altas a las bajas</b> presiones, desviado por la rotación de la Tierra y el rozamiento con la superficie. En el Ecuador el aire sube y va hacia los polos, y lo sustituye aire polar: esta circulación general, con la rotación terrestre, fija los vientos dominantes del planeta.</li>
<li><b>Frente frío</b>: el aire frío empuja al cálido y lo levanta de golpe. Cumulonimbos, chubascos fuertes, rachas y cambio brusco del viento. Después, la presión sube y el cielo se despeja.</li>
<li><b>Frente cálido</b>: el aire cálido sube despacio sobre el frío. Cirros, después estratos que se espesan, lluvia continua y visibilidad reducida.</li>
<li><b>Frente ocluido</b>: el frío alcanza al cálido. Tiempo de los dos.</li>
<li><b>Cumulonimbo</b>: nube de gran desarrollo vertical en forma de yunque. Tormenta, rachas violentas, granizo. Evítalo.</li>
<li><b>Niebla de advección</b> (la típica en la mar): aire cálido y húmedo que pasa sobre agua fría. <b>Niebla de radiación</b>: se forma en tierra en noches despejadas y puede llegar a la costa por la mañana.</li>
<li><span class="es">Calima</span>: polvo en suspensión (del norte de África). Reduce la visibilidad sin humedad.</li>
</ul>`],
["viento","Viento: escalas, brisas y vientos locales",`
<ul>
<li>El viento se nombra por <b>de dónde viene</b>: viento norte es el que sopla desde el norte. (Las corrientes, al revés: hacia dónde van).</li>
<li><span class="es">Rolar</span>: cambiar de dirección. <span class="es">Refrescar</span>: aumentar la fuerza. <span class="es">Calmar</span>: disminuir la fuerza del viento o de la mar, total o parcialmente. <span class="es">Caer</span>: disminución progresiva del viento. <span class="es">Racha</span>: aumento de fuerza durante un intervalo corto. <span class="es">Contraste</span>: cambio repentino a la dirección opuesta o casi. <span class="es">Recalmada</span>: bajada repentina y momentánea, que luego vuelve a la fuerza anterior. <span class="es">Chubasco</span>: precipitación intensa y breve con viento.</li>
<li>Instrumentos: <b>anemómetro</b> (intensidad), <b>veleta</b> (dirección; suele ir en el tope del palo) y <span class="es">catavientos</span>: un indicador sencillo de la dirección respecto a la crujía (una manga troncocónica pequeña o una lanita en el obenque).</li>
</ul>
<h3>Viento real, relativo y aparente</h3>
<ul>
<li><b>Real</b>: el que sopla en un momento dado; es el que mides con el barco <b>parado</b>.</li>
<li><b>De la marcha o relativo</b> (viento de la velocidad del barco): el que provocas al avanzar; siempre de <b>dirección opuesta a tu rumbo</b> e intensidad igual a tu velocidad.</li>
<li><b>Aparente</b>: la <b>suma vectorial</b> de los dos; el que mides navegando, y el que marca el catavientos. Siempre queda <b>más a proa</b> que el real: con viento real de través, el aparente entra por la amura.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · viento aparente</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 300" id="awSvg" role="img" aria-label="Suma de viento real y de la marcha"></svg>
<div><label class="small">Viento real: <b id="awTv"></b> nudos desde <b id="awTa"></b>° de la proa</label><input type="range" id="awT" min="0" max="25" value="12"><input type="range" id="awA" min="0" max="180" step="5" value="90">
<label class="small">Velocidad del barco: <b id="awBv"></b> nudos</label><input type="range" id="awB" min="0" max="20" value="6">
<p id="awTxt" style="font-weight:600"></p></div></div></div>
<ul>
<li>La escala <b>Beaufort</b> divide el viento en <b>13 fuerzas (0 a 12)</b>. Es útil porque los anemómetros dan nudos y los partes, fuerzas. Nació en la época de la navegación a vela, describiendo cómo se comportaba un navío en cada fuerza. El manual indica que la tabla completa <b>no es necesario estudiarla</b>.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · escala Beaufort</div>
<label class="small">Fuerza: <b id="bfV"></b></label><input type="range" id="bfS" min="0" max="12" value="4">
<div class="grid2" style="align-items:center"><div id="bfInfo"></div><svg viewBox="0 0 300 120" id="bfSvg" role="img" aria-label="Estado de la mar"></svg></div></div>
<div class="tablewrap"><table><tr><th>Douglas</th><th>Nombre</th><th>Altura de ola</th></tr>${DG.map((d,i)=>`<tr><td>${i}</td><td>${d[0]}</td><td>${d[1]}</td></tr>`).join("")}</table></div>
<p class="small">Escala <b>Douglas</b>: ideada por el vicealmirante Douglas y adoptada internacionalmente; 10 grados (0 a 9) del estado de la mar y la altura de ola. Tampoco hace falta estudiar la tabla completa. El manual da 0–0,2 m para rizada y 0,2–0,5 m para marejadilla; la tabla de arriba usa los límites de la OMM (0,1 m).</p>
<p>La altura de ola no depende solo de la fuerza del viento. Las tres variables son: <b>intensidad</b>, <b>persistencia</b> (el número de horas que ha soplado con la misma dirección e intensidad: la mar necesita tiempo para crecer) y <b>fetch</b> (la extensión de mar sobre la que sopla con la misma dirección e intensidad, medida en esa dirección en km o millas). <span class="es">Mar de viento</span>: la que levanta el viento local, corta y desordenada. <span class="es">Mar de fondo</span> (mar tendida): olas largas y regulares que vienen de un temporal lejano.</p>
<p><b>Brisas costeras</b>: vientos flojos que aparecen en la costa cuando no hay gradiente de presión, es decir, sin viento general. <b>Terral</b>: de noche, la tierra se enfría antes que el mar; sobre el mar queda una baja relativa, el aire cálido sube y lo sustituye el aire frío de tierra: sopla de <b>tierra al mar</b>, y se nota hasta unas <b>20 millas</b> mar adentro. <b>Virazón</b>: de día, la tierra se calienta antes; sopla del <b>mar a tierra</b> y llega hasta unos <b>50 km</b> tierra adentro. Entre uno y otro hay calmas, cuando tierra y mar están a la misma temperatura.</p>
<div class="widget"><div class="eyebrow">Interactivo · brisas costeras</div>
<div class="seg"><button class="btn sm" id="brD" aria-pressed="true">De día</button><button class="btn sm ghost" id="brN" aria-pressed="false">De noche</button></div>
<figure>${breezeSVG()}</figure></div>
<div class="grid2" style="align-items:center"><figure style="margin:0">${roseSVG()}</figure>
<div><h4>Vientos del Mediterráneo español</h4><ul class="small">${WR.map(w=>`<li><b>${w[2]}</b>: ${w[1]}</li>`).join("")}</ul><p class="small">En la Comunitat Valenciana, el <b>levante</b> es el que levanta más mar en la costa (y trae las gotas frías en otoño). El <b>poniente</b> es seco y racheado, y despeja.</p></div></div>`],
["parte","Información meteorológica",`
<ul>
<li><b>AEMET</b>: predicción costera (hasta 20 mn) y de alta mar, por web, app y teléfono.</li>
<li><b>Salvamento Marítimo</b>: boletines por VHF a horas fijas, anunciados por el canal 16 y emitidos en un canal de trabajo.</li>
<li><b>NAVTEX</b>: receptor automático de avisos en 518 kHz (en inglés) y 490 kHz (en español).</li>
<li>Avisos: <b>aviso de temporal</b> a partir de fuerza 8. «Aviso costero» con fuerza 7 en las aguas costeras.</li>
</ul>
<div class="sea"><b>A bordo.</b> Mira el parte de la víspera y el de la mañana, y anota la presión al salir. Si baja rápido o ves cumulonimbos acercándose, vuelve a puerto: en el Mediterráneo el tiempo cambia en una hora.</div>`]
],
init(root){
  $("#wBtn",root).addEventListener("click",e=>{const g=$("#windG",root);const on=g.getAttribute("opacity")==="0";g.setAttribute("opacity",on?1:0);e.target.textContent=on?"Ocultar el viento":"Mostrar el viento"});
  const bb=$("#bbA",root),bs=$("#bbSvg",root);const N=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  const upb=()=>{const a=+bb.value;const name=N[Math.round(a/22.5)%16];$("#bbV",root).textContent=`${name} (${a}°)`;
    const to=(a+180)%360;const low=(to-70+360)%360;const t=x=>(x-90)*Math.PI/180;const c=150;
    $("#bbTxt",root).innerHTML=`Mirando hacia el ${N[Math.round(to/22.5)%16]} con el viento en la espalda, la borrasca queda hacia el <b>${N[Math.round(low/22.5)%16]}</b>.`;
    bs.innerHTML=`<defs>${AR("bb","var(--sea)")}</defs><circle cx="${c}" cy="${c}" r="130" fill="var(--paper)" stroke="var(--line)"/><text x="${c}" y="16" text-anchor="middle" font-size="12" fill="var(--muted)">N</text>
    <line x1="${c+110*Math.cos(t(a))}" y1="${c+110*Math.sin(t(a))}" x2="${c+30*Math.cos(t(a))}" y2="${c+30*Math.sin(t(a))}" stroke="var(--sea)" stroke-width="4" marker-end="url(#bb)"/><text x="${c+120*Math.cos(t(a))}" y="${c+120*Math.sin(t(a))+4}" font-size="11" text-anchor="middle" fill="var(--sea)">viento</text>
    <circle cx="${c}" cy="${c}" r="9" fill="var(--ink)"/><text x="${c}" y="${c+26}" text-anchor="middle" font-size="11" fill="var(--ink)">tú</text>
    <text x="${c+92*Math.cos(t(low))}" y="${c+92*Math.sin(t(low))+10}" text-anchor="middle" font-size="28" font-weight="700" fill="var(--bad)">B</text>
    <text x="${c+92*Math.cos(t((low+180)%360))}" y="${c+92*Math.sin(t((low+180)%360))+10}" text-anchor="middle" font-size="28" font-weight="700" fill="var(--sea)">A</text>`};
  bb.addEventListener("input",upb);upb();
  const bf=$("#bfS",root),bsv=$("#bfSvg",root);
  const upf=()=>{const b=BF[+bf.value];const d=DG[b[3]];$("#bfV",root).textContent=b[0];$("#bfInfo",root).innerHTML=`<p style="font-size:22px;font-family:var(--display);font-weight:700;margin:0">${b[1]}</p><p class="mono small">${b[2]} nudos</p><p class="small">${b[4]}.</p><p class="small">Mar típica: <b>${d[0]}</b> (Douglas ${b[3]}, ${d[1]})</p>${b[0]>=6?'<p class="small" style="color:var(--accent)">Con fuerza 6 o más, una lancha de recreo no debería salir.</p>':""}`;
    const A=Math.min(42,2+b[3]*5),L=Math.max(30,80-b[3]*4);let p=`M0 70`;for(let x=0;x<=300;x+=L/2){p+=` Q ${x+L/4} ${70-(((x/(L/2))%2)?-A:A)} ${x+L/2} 70`}
    bsv.innerHTML=`<rect width="300" height="120" fill="var(--water)" rx="8"/><path d="${p} L300 120 L0 120 Z" fill="var(--sea)" opacity=".5"/>${b[0]>=4?Array.from({length:Math.min(12,b[0]*1)},(_,i)=>`<circle cx="${(i*53)%300}" cy="${70-A+((i*7)%10)}" r="3" fill="#fff"/>`).join(""):""}`};
  bf.addEventListener("input",upf);upf();
  {const T=$("#awT",root),A=$("#awA",root),B=$("#awB",root),S=$("#awSvg",root);
   const up=()=>{const t=+T.value,a=+A.value,b=+B.value;$("#awTv",root).textContent=t;$("#awTa",root).textContent=a;$("#awBv",root).textContent=b;
     /* wind vectors pointing where air goes; boat heads up (north). true wind FROM angle a (clockwise from bow, starboard side) */
     const tr=a*Math.PI/180;const tx=-t*Math.sin(tr),ty=t*Math.cos(tr);/* going-to vector in screen coords (y down = astern) */
     const mx=0,my=b;const ax=tx+mx,ay=ty+my;const av=Math.hypot(ax,ay);let aa=av?Math.atan2(-ax,ay)*180/Math.PI:0;aa=Math.abs(aa);
     const k=7,c=150;const L=(x,y,col,lab,ox,oy)=>`<line x1="${c-x*k}" y1="${c-y*k}" x2="${c}" y2="${c}" stroke="${col}" stroke-width="4" marker-end="url(#aw${col.length})"/><text x="${c-x*k+ox}" y="${c-y*k+oy}" font-size="11" font-weight="700" fill="${col}">${lab}</text>`;
     S.innerHTML=`<defs>${AR("aw"+"var(--sea)".length,"var(--sea)")}${AR("aw"+"var(--accent)".length,"var(--accent)")}${AR("aw"+"#7a5cff".length,"#7a5cff")}</defs><rect width="300" height="300" fill="var(--water)" rx="10"/>${boatTop(c,c+40,60,0)}`+
       L(tx,ty,"var(--sea)","real",-10,-6)+L(mx,my,"#7a5cff","marcha",6,-4)+L(ax,ay,"var(--accent)","aparente",6,14);
     $("#awTxt",root).innerHTML=av<0.5?"Sin viento aparente.":`Aparente: <b>${av.toFixed(1)} nudos</b> desde <b>${aa.toFixed(0)}°</b> de la proa${b>0&&t>0&&a>0&&a<180?" (más a proa que el real)":""}.`};
   [T,A,B].forEach(x=>x.addEventListener("input",up));up();}
  const br=$("#brSvg",root);
  const drawB=day=>{$("#brD",root).classList.toggle("ghost",!day);$("#brN",root).classList.toggle("ghost",day);$("#brD",root).setAttribute("aria-pressed",day);$("#brN",root).setAttribute("aria-pressed",!day);
    br.innerHTML=`<defs>${AR("bz","var(--accent)")}</defs><rect width="600" height="220" fill="${day?"#d8ecfa":"var(--night)"}" rx="10"/><rect x="0" y="150" width="300" height="70" fill="var(--sea)" opacity=".6"/><path d="M300 150 L600 150 L600 220 L300 220Z" fill="var(--land)"/>
    ${day?`<circle cx="520" cy="40" r="20" fill="#ffd60a"/>`:`<circle cx="520" cy="40" r="14" fill="#e3edf2"/>`}
    <path d="${day?"M120 130 L460 130":"M460 130 L120 130"}" stroke="var(--accent)" stroke-width="4" marker-end="url(#bz)"/>
    <path d="${day?"M480 120 L480 60 M480 60 L140 60 M140 60 L140 118":"M140 120 L140 60 M140 60 L480 60 M480 60 L480 118"}" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
    <text x="150" y="200" font-size="13" text-anchor="middle" fill="${day?"var(--ink)":"#fff"}" font-weight="700">MAR ${day?"(más fría)":"(más templada)"}</text><text x="450" y="200" font-size="13" text-anchor="middle" fill="var(--ink)" font-weight="700">TIERRA ${day?"(se calienta)":"(se enfría)"}</text>
    <text x="290" y="120" text-anchor="middle" font-size="15" font-weight="700" fill="var(--accent)">${day?"VIRAZÓN: del mar a tierra":"TERRAL: de tierra al mar"}</text>`};
  $("#brD",root).addEventListener("click",()=>drawB(true));$("#brN",root).addEventListener("click",()=>drawB(false));drawB(true);
}};
})();
(function(){
"use strict";
const {$,$$,CH,boatTop,r,n360,deg,pm,rad}=PER;
const AR=(id,c)=>`<marker id="${id}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="${c}"/></marker>`;
const sg=(x,e="E",w="W")=>x>=0?`${Math.abs(x)}° ${e}`:`${Math.abs(x)}° ${w}`;

function globeSVG(){
  return `<svg viewBox="0 0 600 300" role="img" aria-label="Latitud y longitud en la esfera terrestre"><defs>${AR("g1","var(--accent)")}</defs>
  <g transform="translate(160 150)">
   <circle r="120" fill="var(--water)" stroke="var(--ink)" stroke-width="1.6"/>
   ${[-60,-30,30,60].map(l=>{const y=-120*Math.sin(l*Math.PI/180),rx=120*Math.cos(l*Math.PI/180);return `<ellipse cx="0" cy="${y}" rx="${rx}" ry="${rx*0.18}" fill="none" stroke="var(--line)"/>`}).join("")}
   <ellipse cx="0" cy="0" rx="120" ry="22" fill="none" stroke="var(--ink)" stroke-width="1.6"/>
   ${[30,60].map(a=>`<ellipse cx="0" cy="0" rx="${120*Math.sin(a*Math.PI/180)}" ry="120" fill="none" stroke="var(--line)"/>`).join("")}
   <line x1="0" y1="-120" x2="0" y2="120" stroke="var(--accent)" stroke-width="2"/>
   <text x="0" y="-128" text-anchor="middle" font-size="12" font-weight="700">Polo N</text><text x="0" y="140" text-anchor="middle" font-size="12" font-weight="700">Polo S</text>
   <text x="126" y="4" font-size="12" fill="var(--ink)">ecuador</text><text x="6" y="-70" font-size="11" fill="var(--accent)">Greenwich</text>
   <line x1="0" y1="0" x2="70" y2="-58" stroke="var(--ink)" stroke-dasharray="3 3"/><circle cx="70" cy="-58" r="5" fill="var(--bad)"/>
   <path d="M30 4 A 32 32 0 0 0 26 -21" fill="none" stroke="var(--bad)" stroke-width="2"/><text x="38" y="-8" font-size="12" fill="var(--bad)" font-weight="700">l</text>
  </g>
  <g font-size="13" fill="var(--ink)"><text x="320" y="60"><tspan font-weight="700">Latitud (l)</tspan>: arco de meridiano desde el</text><text x="320" y="78">ecuador al lugar. 0°–90° N o S.</text>
  <text x="320" y="118"><tspan font-weight="700">Longitud (L)</tspan>: arco de ecuador desde el</text><text x="320" y="136">meridiano de Greenwich. 0°–180° E o W.</text>
  <text x="320" y="176"><tspan font-weight="700">Δl, ΔL</tspan>: diferencias de latitud y longitud.</text>
  <text x="320" y="216"><tspan font-weight="700">1 milla</tspan> = 1′ de latitud = 1852 m.</text><text x="320" y="234">1 nudo = 1 mn/h. 1 cable = 0,1 mn.</text></g></svg>`;
}
function roseSVG(){return `<svg viewBox="0 0 320 320" id="crSvg" role="img" aria-label="Rosa con norte verdadero, magnético y de aguja"></svg>`}
CH[10]={
intro:"Cinco preguntas de teoría que luego aplicas en la carta: coordenadas, unidades, rumbos, corrección total, demoras, marcaciones, mareas y publicaciones. Si entiendes la rosa de abajo, la mitad del tema está hecho.",
sections:[
["tierra","La Tierra, coordenadas y unidades",`
<figure>${globeSVG()}</figure>
<ul>
<li>Se escribe la latitud primero: <span class="mono">36° 05,2′ N · 005° 21,8′ W</span>. Los minutos se dividen en décimas (no en segundos) en la navegación.</li>
<li><b>Meridianos</b>: semicírculos de polo a polo (todos iguales). <b>Paralelos</b>: círculos paralelos al ecuador, cada vez más pequeños hacia los polos. Por eso 1′ de longitud vale cada vez menos millas al subir de latitud, y <b>las distancias siempre se miden en la escala de latitudes</b>.</li>
<li><b>Eje</b>: diámetro sobre el que gira la Tierra; sus extremos son los <b>polos</b> Norte (Pn) y Sur (Ps). <b>Ecuador</b>: circunferencia máxima perpendicular al eje; divide la Tierra en los hemisferios <b>norte</b> y <b>sur</b>.</li>
<li><b>Paralelos</b>: circunferencias <b>menores</b> paralelas al ecuador (infinitas). <b>Meridianos</b>: circunferencias <b>máximas</b> que pasan por los polos, perpendiculares al ecuador y a los paralelos. Los polos dividen cada meridiano en dos mitades: el <b>meridiano superior</b> (el «visible») y el <b>inferior o antimeridiano</b>.</li>
<li><b>Meridiano del lugar</b>: el que pasa por donde está el barco (si está en B, Pn-B-Ps). <b>Meridiano cero</b> o primer meridiano: el de <b>Greenwich</b>; divide la Tierra en las mitades oriental y occidental.</li>
<li><span class="es">Latitud (l)</span>: arco de meridiano del lugar desde el ecuador hasta el punto. De 0° (ecuador) a 90° (polos), <b>N o S</b>; nunca pasa de 90°. Todo un paralelo tiene la misma latitud.</li>
<li><span class="es">Longitud (L)</span>: arco de ecuador desde Greenwich hasta el meridiano del lugar. De 0° a 180°, <b>E o W</b>; Greenwich es 0° y su antimeridiano 180°. Todo un meridiano tiene la misma longitud. En el cruce de Greenwich con el ecuador, l = 0 y L = 0.</li>
<li>La <b>situación</b> es el cruce del meridiano y el paralelo del lugar, en grados, minutos y décimas de minuto, siempre con su N/S y E/W. Ejemplo del manual: l = 36° 04,5′ N, L = 005° 55,0′ W.</li>
<li><b>Loxodrómica</b>: línea que corta todos los meridianos con el mismo ángulo (rumbo constante). En la carta Mercator es una recta. <b>Ortodrómica</b>: el camino más corto (círculo máximo).</li>
</ul>`],
["carta","La carta náutica",`
<ul>
<li><b>Proyección Mercator</b>: cilíndrica, <b>conforme</b> (conserva los ángulos), meridianos y paralelos son rectas perpendiculares, la loxodrómica es una recta. Deforma las superficies en latitudes altas (las latitudes «crecen»).</li>
<li>Las edita en España el <b>Instituto Hidrográfico de la Marina</b>. Representan la costa, accidentes, faros, boyas, bajos, fondos, sondas y la cuadrícula de meridianos y paralelos.</li>
<li><b>Escala</b>: índice de reducción, en fracción con numerador 1: una carta 1/10.000 muestra la zona 10.000 veces más pequeña. Por escala: <b>general</b> (oceánica), <b>arrumbamiento</b> (rumbos directos, navegación media), <b>navegación costera</b> (costa a la vista), <b>aproches o recalada</b> (aproximación a puertos) y <b>portulanos</b> (puertos, radas, fondeaderos; la mayor escala). Las cifras de escala de cada tipo <b>no hay que memorizarlas</b>.</li>
<li>Cartas de <b>punto menor</b>: grandes extensiones (escala pequeña). De <b>punto mayor</b>: escala grande (costeras y portulanos). <span class="es">Cartucho</span>: recuadro dentro de una carta con una zona importante a mayor escala.</li>
<li>Información: unos <b>mil signos y abreviaturas</b>. Accidentes de la costa y del terreno, puntos de referencia (iglesias, torres, antenas), luces con su fase, periodo y color, marcas para situarse o enfilar, boyas y balizas (las de peligro suelen ser <b>espeques</b>, palos clavados al fondo para que no se muevan con los temporales), sondas y veriles, naturaleza del fondo, peligros (bajos, rocas, naufragios), zonas prohibidas (militares, dispositivos de separación de tráfico) y la <b>rosa de declinación magnética</b> con su variación anual (en cartas generales puede haber varias).</li>
<li><b>Faros y farolas</b>: una <b>lágrima</b> rojiza; la posición exacta es el punto (estrellita) donde arranca la lágrima.</li>
<li><b>Sondas</b>: en metros, referidas a la <b>bajamar escorada</b> (cero hidrográfico), el nivel más bajo esperable. <b>Veriles</b> o isobáticas: líneas que unen puntos de igual sonda.</li>
<li>Naturaleza del fondo: por decisión de la <b>OMI</b>, las abreviaturas de las cartas deben ir en <b>inglés</b>, y el examen pregunta las inglesas («M» = fango o lodo, «St» = piedra).</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Fondo</th><th>Español</th><th>Inglés</th></tr>
<tr><td>Arena</td><td>A</td><td><b>S</b> (sand)</td></tr>
<tr><td>Piedra</td><td>P</td><td><b>St</b> (stone)</td></tr>
<tr><td>Fango, lodo</td><td>F</td><td><b>M</b> (mud)</td></tr>
<tr><td>Cascajo (trozos de concha y piedra)</td><td>Co</td><td><b>G</b> (gravel)</td></tr>
<tr><td>Alga</td><td>Alg</td><td><b>Wd</b> (weed)</td></tr>
<tr><td>Roca</td><td>R</td><td><b>Rk</b> (rock)</td></tr>
<tr><td>Arcilla</td><td>Arc</td><td><b>Cl</b> (clay)</td></tr>
</table></div>
<div class="tablewrap"><table>
<tr><th>Luz</th><th>Español</th><th>Inglés</th></tr>
<tr><td>Blanca · roja · verde</td><td>B · R · V</td><td>W · R · G</td></tr>
<tr><td>Destellos</td><td>D</td><td>Fl</td></tr>
<tr><td>Isofase</td><td>Iso</td><td>Iso</td></tr>
<tr><td>Ocultaciones</td><td>Oc</td><td>Oc</td></tr>
<tr><td>Centelleante (50–60 por minuto)</td><td>Ct</td><td>Q</td></tr>
<tr><td>Centelleante rápido (100–120 por minuto)</td><td>Ct.R</td><td>VQ</td></tr>
<tr><td>Grupo de…</td><td>Gp</td><td>Gp</td></tr>
</table></div>
<ul>
<li>Los faros se ven con su característica: <span class="mono">Fl(3) 10s 23m 15M</span> = grupo de 3 destellos cada 10 s, a 23 m de altura, alcance 15 millas. Ejemplo del manual: <span class="mono">Fl(4) WR 20s 16M</span> = faro de sectores blanco y rojo, 4 destellos cada 20 s, alcance 16 millas.</li>
<li><b>Derroteros</b>: describen la costa con detalle (con fotos y dibujos) y dan información para recaladas y aproximaciones a puertos, rías y ensenadas; hay que leerlos durante la navegación. <b>Guías náuticas</b>: Código Internacional de Señales, manual de primeros auxilios, reglamento de comunicaciones… <b>Libro de faros</b>: todos los faros, balizas, marcas y señales de niebla y acústicas, con número, posición, característica, elevación sobre el nivel medio, alcance y descripción; imprescindible para navegar de noche. <b>Anuario de mareas</b>: alturas de marea por lugar y día.</li>
<li><b>Publicaciones náuticas</b>: <i>Libro de Faros y Señales de Niebla</i>, <i>Derrotero</i> (descripción de costas y puertos), <i>Avisos a los Navegantes</i> (correcciones semanales a cartas y libros), <i>Anuario de Mareas</i>, <i>Radioavisos</i>. El organismo responsable en España es el <b>Instituto Hidrográfico de la Marina</b> (Cádiz).</li>
</ul>`],
["unidades","Milla, nudo, corredera, sonda y hora",`
<ul>
<li><span class="es">Milla náutica</span>: <b>1 minuto de arco de meridiano</b> (1′ de latitud) = <b>1.852 m</b>. Sale de dividir la longitud de un meridiano completo (≈ 40.000.000 m) entre los 21.600 minutos de sus 360°.</li>
<li>Las distancias se miden con el <b>compás de puntas</b> y se llevan a la <b>escala de latitudes</b>, a la misma altura, <b>nunca a la de longitudes</b>: los paralelos son circunferencias menores. El único paralelo que valdría es el ecuador, que es círculo máximo.</li>
<li><span class="es">Nudo</span>: unidad de velocidad, <b>una milla por hora</b>.</li>
<li><span class="es">Corredera</span>: mide la velocidad y la distancia recorrida. <b>Coeficiente de corredera</b>: <span class="formula">K = Vv / Vc = Dv / Dc</span>. Multiplicado por lo que marca la corredera da lo verdadero; K = 1, corredera bien ajustada. Se calcula navegando a rumbo fijo una distancia conocida marcada por enfilaciones. Ejemplo: Dv 4,5 mn, Dc 3 mn → <b>K = 1,5</b>.</li>
<li><span class="es">Sonda</span> (ecosonda): un emisor de ultrasonidos en el casco mide el tiempo hasta el eco. Mide desde el transductor, no desde la flotación: a su lectura hay que <b>sumar la distancia del transductor a la flotación</b> para tener la profundidad total.</li>
<li><span class="es">Hora del reloj de bitácora (Hrb)</span>: la hora de a bordo. En navegaciones largas coincide con la <b>hora legal (Hz)</b> del huso: <b>1 huso = 15° de longitud = 1 hora</b> (360°/24 h). En costera, la del PER, se usa la <b>hora oficial (Ho)</b>, la de tu reloj.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · coeficiente de corredera</div>
<label class="small">Distancia verdadera (carta): <b id="kDvV"></b> mn</label><input type="range" id="kDv" min="10" max="100" value="45">
<label class="small">Distancia de corredera: <b id="kDcV"></b> mn</label><input type="range" id="kDc" min="10" max="100" value="30">
<p id="kTxt" style="font-weight:600"></p></div>`],
["aguja","Magnetismo, aguja náutica y desvío",`
<ul>
<li>La Tierra se comporta como un gran imán (núcleo de hierro y níquel). Una aguja imantada libre apunta a los <b>polos magnéticos</b>, que no coinciden con los geográficos. <b>Campo magnético</b>: zona de influencia de un imán, con intensidad y dirección en cada punto.</li>
<li><span class="es">Declinación magnética (dm)</span> o <b>variación (local)</b>: ángulo entre el meridiano geográfico (Nv) y el magnético (Nm). Nm a la <b>derecha</b> de Nv: NE, <b>+</b>; a la izquierda: NW, <b>−</b>. Cambia con el lugar y con los años: la carta da su valor, el año y la variación anual (E o W).</li>
<li><b>Actualizarla</b>: variación anual × años transcurridos, con su signo, sumada a la dm de la carta. Se redondea a medio grado o grado entero (00′ o 30′). Ejemplo del manual: dm 4° 25′ NW en 2005, variación 7′ E al año; en 2014: 9 × 7′ = 1° 03′ E → −4° 25′ + 1° 03′ = −3° 22′ ≈ <b>3° 30′ NW</b>.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · actualizar la dm</div>
<div class="grid2"><div>
<label class="small">dm de la carta: <b id="udV"></b></label><input type="range" id="ud" min="-600" max="600" step="5" value="-265">
<label class="small">Variación anual: <b id="uvV"></b></label><input type="range" id="uv" min="-12" max="12" value="7">
</div><div>
<label class="small">Año de la carta: <b id="uyV"></b></label><input type="range" id="uy" min="1990" max="2026" value="2005">
<label class="small">Año en curso: <b id="unV"></b></label><input type="range" id="un" min="1990" max="2030" value="2014">
</div></div><div class="steps" id="uSteps"></div></div>
<h3>La aguja náutica (compás)</h3>
<ul>
<li>Da el rumbo en todo momento; funciona porque los imanes se orientan paralelos a las líneas de fuerza del campo magnético terrestre.</li>
<li><b>Rosa</b>: disco muy ligero con los 360° grabados y las agujas imantadas debajo. <b>Chapitel</b>: hendidura central, apoyada en el <b>estilo</b>, un eje vertical muy afilado que reduce el rozamiento y deja girar la rosa. <b>Mortero</b>: caja circular metálica con tapa de cristal, con las <b>líneas de fe</b> alineadas con la línea proa-popa. Va lleno de agua destilada con alcohol (o glicerol), que no se congela y amortigua, y descansa sobre una <b>suspensión cardan</b>. <b>Bitácora</b>: soporte de fibra, madera o metal no magnético, fijado normalmente en crujía.</li>
<li><b>Propiedades</b>: <b>sensibilidad</b> a cualquier cambio de rumbo (precisión) y <b>estabilidad</b> frente a vibraciones, balances, escora y cabeceo.</li>
<li><b>Instalación</b>: en el eje longitudinal si se puede (en barcos pequeños, donde se vea bien desde el gobierno) y lo más lejos posible del material magnético.</li>
<li><b>Perturbaciones</b>: navajas, ceniceros de hierro, pulseras y hebillas, motores eléctricos, altavoces, radio, radar, sondas…</li>
</ul>
<h3>Desvío (Δ)</h3>
<ul>
<li>Los objetos de a bordo, e incluso el casco si es metálico, se imantan temporalmente por inducción del campo terrestre y desvían la aguja. <b>Desvío</b>: ángulo entre el meridiano magnético (Nm) y el de aguja (<b>Na</b>). Na a la derecha de Nm: NE, +; a la izquierda: NW, −.</li>
<li>Cambia con el <b>rumbo</b> (cada rumbo tiene el suyo). <b>Tablilla de desvíos</b>: hecha por un profesional, normalmente de 15° en 15°; hay que tenerla a mano y <b>prorratear</b> los rumbos intermedios.</li>
</ul>`],
["rumbos","Rumbos, declinación y desvío",`
<p>Hay tres «nortes»: el <b>verdadero</b> (el del meridiano, el de la carta), el <b>magnético</b> (adonde apunta una aguja sin perturbar) y el <b>de aguja</b> (adonde apunta la aguja de tu barco, perturbada por sus hierros y electricidad).</p>
<div class="widget"><div class="eyebrow">Interactivo · la rosa de la corrección total</div>
<div class="grid2" style="align-items:center"><figure style="margin:0">${roseSVG()}</figure>
<div><label class="small">Declinación magnética dm: <b id="dmV"></b></label><input type="range" id="dmS" min="-15" max="15" value="-3">
<label class="small">Desvío Δ (de la tablilla): <b id="dvV"></b></label><input type="range" id="dvS" min="-10" max="10" value="4">
<label class="small">Rumbo de aguja Ra: <b id="raV"></b></label><input type="range" id="raS" min="0" max="359" value="60">
<div class="steps" id="crSteps"></div></div></div></div>
<div class="tablewrap"><table>
<tr><th>Ángulo</th><th>Entre</th><th>Signo</th></tr>
<tr><td><b>dm</b> declinación magnética</td><td>Nv y Nm. Viene en la rosa de la carta con un año y su variación anual</td><td>NE (+) · NW (−)</td></tr>
<tr><td><b>Δ</b> desvío</td><td>Nm y Na. Depende del <b>rumbo</b> del barco: se lee en la tablilla con el Ra</td><td>E (+) · W (−)</td></tr>
<tr><td><b>Ct</b> corrección total</td><td>Nv y Na. <span class="formula">Ct = dm + Δ</span></td><td>suma algebraica</td></tr>
</table></div>
<div class="key"><b>Fórmulas.</b> <span class="formula">Rv = Ra + Ct</span> · <span class="formula">Ra = Rv − Ct</span> · <span class="formula">Rm = Ra + Δ</span> · <span class="formula">Rv = Rm + dm</span>. De aguja a verdadero se <b>suma</b> la Ct; de verdadero a aguja se <b>resta</b>.</div>
<ul>
<li><b>Rumbo</b>: ángulo entre la línea popa-proa y el meridiano del lugar (el norte). Según el norte: <b>verdadero (Rv)</b>, <b>magnético (Rm)</b> o <b>de aguja (Ra)</b>. En la carta se trazan <b>Rv</b>; el timonel sigue <b>Ra</b>. La línea popa-proa no cambia: cambia el norte de referencia.</li>
<li>Si el resultado sale <b>negativo</b>, súmale 360°; si pasa de <b>360°</b>, réstaselos. Ej.: Ra 003°, Ct −8° → −5° + 360° = <b>355°</b>. Ra 357°, Ct +8° → 365° − 360° = <b>005°</b>.</li>
<li>Ejemplos del manual: Ra 228°, dm 3° NW, Δ 1° NE → Ct −2° → <b>Rv 226°</b>. Rv 342°, dm 5° NW, Δ 2° NW → Ct −7° → Ra = 342° − (−7°) = <b>349°</b>.</li>
<li>Notación <b>circular</b>: de 000° a 360° en sentido horario. <b>Cuadrantal</b>: nunca pasa de 90°. Se escribe primero el punto cardinal desde el que se cuenta (<b>N o S</b>), luego los grados y por último hacia dónde va la proa (<b>E o W</b>). Ej.: 65° = N 65° E.</li>
<li>Para operar, los rumbos cuadrantales llevan signo: <b>+</b> en el 1.er (NE) y 3.er (SW) cuadrante, <b>−</b> en el 2.º (SE) y 4.º (NW).</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Cuadrante</th><th>A circular</th><th>Ejemplo</th></tr>
<tr><td>1.º · N…E (0°–90°)</td><td>el mismo valor</td><td>N 35° E = <b>035°</b></td></tr>
<tr><td>2.º · S…E (90°–180°)</td><td>180° − valor</td><td>S 50° E = <b>130°</b></td></tr>
<tr><td>3.º · S…W (180°–270°)</td><td>180° + valor</td><td>S 25° W = <b>205°</b></td></tr>
<tr><td>4.º · N…W (270°–360°)</td><td>360° − valor</td><td>N 50° W = <b>310°</b></td></tr>
</table></div>
<ul>
<li><span class="es">Rosa de los vientos</span> (rosa náutica): el horizonte dividido en grados. Nació para nombrar de dónde viene el viento, pero sirve igual para los rumbos. <b>Cardinales</b>: N 0°/360°, E 90°, S 180°, W 270°. Partiendo los cuadrantes por la mitad salen los <b>octantes</b> de 45°: NE 45°, SE 135°, SW 225°, NW 315°.</li>
<li>Partiendo otra vez (ángulos de <b>22° 30′</b>) salen NNE 22,5°, ENE 67,5°, ESE 112,5°, SSE 157,5°, SSW 202,5°, WSW 247,5°, WNW 292,5° y NNW 337,5°. Y partiendo una última vez, las <b>cuartas</b>: la rosa en <b>32</b> partes de <b>11° 15′</b> cada una.</li>
<li>Para actualizar la dm: dm del año = dm de la carta + (años transcurridos × variación anual), con su signo.</li></ul>
<div class="widget"><div class="eyebrow">Interactivo · circular ↔ cuadrantal</div>
<div class="row"><input type="range" id="cqS" min="0" max="359" value="210" style="max-width:320px"><b id="cqV" class="mono"></b></div></div>`],
["demoras","Demoras, marcaciones y líneas de posición",`
<div class="widget"><div class="eyebrow">Interactivo · demora = rumbo + marcación</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 300" id="dmSvg" role="img" aria-label="Demora y marcación"></svg>
<div><label class="small">Rumbo verdadero Rv: <b id="rvV"></b></label><input type="range" id="rvS" min="0" max="359" value="40">
<label class="small">Marcación M (− babor · + estribor): <b id="mmV"></b></label><input type="range" id="mmS" min="-180" max="180" value="70">
<div class="steps" id="dmSteps"></div></div></div></div>
<ul>
<li><b>Demora</b>: ángulo desde el <b>norte</b> hasta la visual a un objeto (Dv verdadera, Da de aguja). <span class="formula">Dv = Da + Ct</span>.</li>
<li><b>Marcación</b>: ángulo desde la <b>proa</b> hasta la visual, de 0° a 180° por estribor (+) o por babor (−). <span class="formula">Dv = Rv + M</span>.</li>
<li><b>Demora opuesta</b> (la que trazas en la carta desde el faro): Dv ± 180°.</li>
<li>Como con los rumbos, hay tres demoras según el norte: <b>verdadera (Dv)</b>, <b>magnética (Dm)</b> y <b>de aguja (Da)</b>. La visual al objeto es siempre la misma; solo cambia el norte desde el que se mide. En la práctica solo se usan Dv y Da.</li>
<li>La Da se toma con el <b>compás de alidada</b>, una aguja magnética portátil (con lupa y luz fotoluminiscente para la noche). Como es una aguja, le afectan la dm y el desvío: hay que pasarla a Dv con la Ct antes de trazarla, porque todo lo que hay en la carta es «verdadero». Ejemplo del manual: Da 235°, dm 5° NW, Δ +4° → Ct −1° → <b>Dv 234°</b>.</li>
<li>Las demoras siempre van de 0° a 360°: si el cálculo da negativo, súmale 360°; si pasa de 360°, réstaselos.</li>
<li>Una demora te dice que estás <b>en algún punto de esa recta</b>; necesitas una segunda que la corte (o incluso tres simultáneas).</li>
</ul>
<div class="key"><b>Cuándo fiarte de una situación por demoras.</b> Buena visibilidad y mar razonable · tablilla de desvíos bien hecha · con dos demoras, que se corten con una abertura de entre <b>60° y 120°</b> (fuera de ese margen se agrandan los errores) · tomar <b>primero</b> la del faro cuya demora cambie <b>más despacio</b> (el más lejano o el más cercano a la proa o la popa) y enseguida la otra.</div>
<ul>
<li><span class="es">Enfilación</span>: recta que une dos marcas; estás en ella cuando las ves una detrás de otra (como las torres roja y verde de un puerto que se tapan). Más fiable cuanto más lejos estés de las marcas y más separadas estén entre sí. Su gran ventaja: el error de observación es <b>prácticamente nulo</b>.</li>
<li><span class="es">Oposición</span>: también una recta entre dos marcas, pero el barco está <b>entre</b> ellas. Mucho menos precisa. Como desde el barco las dos marcas tienen demoras que difieren 180°, hay que decir cuál se toma de referencia.</li>
<li>Una enfilación u oposición se puede trazar <b>antes</b> de llegar a ella, uniendo las marcas con la regla, y medir su Dv con el transportador. Si al pasar por ella tomas la Da con la alidada, tienes las dos y sale la corrección total: <span class="formula">Ct = Dv − Da</span>.</li>
<li><b>Distancias</b> (normalmente con radar): cada distancia es un arco de circunferencia con centro en el punto de la costa. Dos arcos se cortan en dos puntos: si ambos caen en el mar, elige el más cercano a tu situación de estima.</li>
<li><span class="es">Veril</span> o línea isobática: une puntos de igual profundidad (en la carta, líneas azules o negras con la cifra intercalada). Una demora o enfilación cortada con el veril de la sonda que lees da una situación <b>estimada</b> de cierto rigor, pero no muy fiable.</li>
<li><b>Líneas de seguridad</b>: la más fiable es la <b>enfilación</b>, pero hay pocas en la costa. Las <b>demoras</b> tienen errores de medición que el desvío puede aumentar. Las <b>sondas</b> pueden no coincidir con la carta por movimientos del fondo o cartas sin actualizar. Lo ideal: dos o tres demoras simultáneas.</li>
<li><span class="es">Marcación</span>: ángulo desde la línea de <b>crujía</b> (proa) hasta el objeto. <b>Circular</b>: de 0° a 360° en sentido horario, siempre positiva. <b>Semicircular</b>: de 0° a 180° por cada banda, <b>+ por estribor</b> y <b>− por babor</b>. <span class="formula">D = R + M</span> · <span class="formula">Dv = Rv + M</span>.</li>
<li>Ejemplo del manual: Ra 123°, dm 4° NW, Δ 8° NW → Ct −12° → Rv 111°. Pta. de Gracia 30° por babor → Dv = 111° − 30° = <b>81°</b>. Cabo Trafalgar 154° por babor → 111° − 154° = −43° + 360° = <b>317°</b>.</li>
</ul>
<figure><svg viewBox="0 0 600 200" role="img" aria-label="Enfilación, oposición y demoras cruzadas"><rect width="600" height="200" fill="var(--water)" rx="10"/>
<g><path d="M0 0 L190 0 L190 40 Q 120 60 0 50Z" fill="var(--land)"/><circle cx="90" cy="18" r="5" fill="var(--accent)"/><circle cx="110" cy="43" r="5" fill="var(--accent)"/><line x1="90" y1="18" x2="186" y2="138" stroke="var(--accent)" stroke-dasharray="6 4"/>${boatTop(166,113,22,219)}<text x="20" y="190" font-size="12" font-weight="700" fill="var(--ink)">Enfilación</text><text x="20" y="175" font-size="11" fill="var(--muted)">dos objetos en línea</text></g>
<g><path d="M210 0 L260 0 L250 60 L210 70Z M360 0 L410 0 L410 70 L370 60Z" fill="var(--land)"/><circle cx="245" cy="40" r="5" fill="var(--accent)"/><circle cx="375" cy="40" r="5" fill="var(--accent)"/><line x1="245" y1="40" x2="375" y2="40" stroke="var(--accent)" stroke-dasharray="6 4"/>${boatTop(310,40,22,0)}<text x="230" y="190" font-size="12" font-weight="700" fill="var(--ink)">Oposición</text><text x="230" y="175" font-size="11" fill="var(--muted)">estás entre los dos</text></g>
<g><path d="M430 0 L600 0 L600 50 Q 520 60 430 40Z" fill="var(--land)"/><circle cx="460" cy="35" r="5" fill="var(--accent)"/><circle cx="570" cy="40" r="5" fill="var(--accent)"/><line x1="460" y1="35" x2="540" y2="140" stroke="var(--accent)"/><line x1="570" y1="40" x2="510" y2="150" stroke="var(--accent)"/><circle cx="526" cy="121" r="5" fill="none" stroke="var(--ink)" stroke-width="2"/><text x="440" y="190" font-size="12" font-weight="700" fill="var(--ink)">Dos demoras</text><text x="440" y="175" font-size="11" fill="var(--muted)">el corte es tu situación</text></g></svg></figure>
<p><b>Líneas de posición</b>: demora, enfilación (la más precisa y sin instrumentos), oposición, distancia a un punto (círculo, medida con radar o por ángulo vertical) e isobática (sonda). Con dos líneas que se cortan tienes tu situación; con tres, un pequeño triángulo que te dice cuánto te fías.</p>
<p><b>Navegación por estima</b>: desde una situación conocida, con el rumbo y la distancia navegada (D = V·t) calculas la nueva. Desde el punto de salida trazas el Rv y, pasado un tiempo, la distancia recorrida sobre él; si cambias de rumbo, repites desde ahí. Se hace a intervalos de <b>una hora</b>, estimando un rumbo y una velocidad medios, y para eso cuentan mucho la atención del timonel y del navegante. En la carta, la <b>situación de estima</b> se marca con un <b>triángulo con un punto en el centro</b>. La <b>corredera</b> mide la velocidad y la distancia en el agua; la <b>sonda</b> (ecosonda), la profundidad; el <b>GPS</b>, la situación; el <b>radar</b>, distancias y demoras a costa y barcos; el <b>AIS</b>, identifica barcos cercanos.</p>`],
["ayudas","Faros, luces y otras ayudas",`
<ul>
<li>Hay señales <b>diurnas, nocturnas y de niebla</b>; y, por su naturaleza, <b>visuales, sonoras, electromagnéticas o electrónicas</b>. Las luminosas son faros, <b>farolas</b> (en el extremo de los muelles), <b>buques faro</b> (frecuentes en latitudes del norte), marcas de la costa, balizas y boyas.</li>
<li>Toda luz se describe por tres cosas: <span class="es">período</span>, el tiempo tras el que una luz no fija repite sus aspectos en el mismo orden; <span class="es">fase</span>, los aspectos que toma durante ese período (un destello, un grupo de tres…); y <span class="es">color</span>: blanco, verde, rojo y amarillo los más usados. Ejemplo del manual: el faro del <b>Cabo de La Nao</b> da un destello blanco cada 5 s: período 5 s, fase un destello, color blanco.</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Ritmo</th><th>Cómo es</th></tr>
<tr><td>Fija (F)</td><td>continua y uniforme</td></tr>
<tr><td>Destellos (D · Fl)</td><td>la luz dura <b>menos</b> que la oscuridad; destellos normalmente iguales</td></tr>
<tr><td>Ocultaciones (Oc)</td><td>la luz dura <b>más</b> que la oscuridad; ocultaciones normalmente iguales</td></tr>
<tr><td>Isofase (Iso)</td><td>luz y oscuridad exactamente iguales</td></tr>
<tr><td>Centelleante (Ct · Q)</td><td>50 a 60 destellos por minuto</td></tr>
<tr><td>Centelleante rápido (Ct.R · VQ)</td><td>100 a 120 destellos por minuto</td></tr>
</table></div>
<ul>
<li><span class="es">Faro de sectores</span>: da colores distintos en distintos arcos del horizonte para señalar bajos o peligros. Ejemplo: el faro de la <b>isla de Botafoch</b> (entrada de Ibiza) se ve <b>blanco</b> en aguas profundas y <b>rojo</b> si te acercas demasiado a la zona de islotes sin señalizar.</li>
<li><span class="es">Alcance geográfico</span>: la mayor distancia a la que se puede ver una luz por la <b>curvatura de la Tierra</b> y las alturas del foco y del observador. <span class="es">Alcance luminoso</span>: la distancia máxima a la que la luz se hace visible por su <b>potencia</b>, la <b>visibilidad</b> meteorológica, la duración de los destellos… Ves la luz hasta el menor de los dos.</li>
<li><b>Identificar un faro</b>: prepara antes una lista de los faros, balizas y marcas de tu derrota. Al avistarlo, mide primero el <b>período</b> (cuánto tarda en repetirse) y cuenta la fase a grandes rasgos; luego afina. No te dejes llevar por lo que «debería» ser según la estima: así se cometen errores peligrosos. Antes del GPS, las luces eran imprescindibles para situarse de noche; conviene recordarlo por si falla.</li>
<li><b>Boyas y balizas</b>: úsalas con precaución, porque el temporal puede desplazarlas o hacerlas desaparecer, salvo los <b>espeques</b>, clavados al fondo. <span class="es">Balizas fijas</span>: pilares o estacas de mampostería o metal en aguas poco profundas, para señalar canales o bajos. <span class="es">Boyas</span>: balizas flotantes, más bajas y de corto alcance; su luz suele ser de destellos.</li>
<li>Todas están en el <b>Libro de Faros y Señales de Niebla</b> del Instituto Hidrográfico de la Marina. Los ritmos de las marcas de balizamiento están en el tema 5.</li>
</ul>`],
["viento","Abatimiento y corriente",`
<ul><li><b>Viento</b>: aire en movimiento. Su dirección se da siempre <b>de dónde viene</b>, no hacia dónde va: un viento NE nos «entra» del 045°.</li>
<li><span class="es">Rumbo de superficie (Rs)</span>: el viento hace que el barco se deslice de lado hacia sotavento <b>sin cambiar la dirección de la proa</b>. El rumbo que traza de verdad sobre el agua ya no es el Rv: es el Rs.</li>
<li><b>Abatimiento (Abt, en el manual «ab»)</b>: ángulo entre la proa (Rv) y el rumbo de superficie (Rs) por efecto del viento. Viento por <b>babor</b> → te desplaza a estribor → Abt <b>+</b>. Viento por <b>estribor</b> → Abt <b>−</b>. <span class="formula">Rs = Rv + Abt</span>.</li>
<li>Con viento por la <b>proa (0°)</b> o por la <b>popa (180°)</b> no hay abatimiento: el viento solo frena o empuja.</li>
<li>Con el mismo viento, cada barco abate distinto según su obra viva y su obra muerta. Las <b>lanchas de motor</b> de fondo plano, sin apéndices y con mucho francobordo abaten mucho con viento de través o por la amura, y cuesta atracarlas y desatracarlas (de ahí las hélices de proa). Los <b>veleros</b>, con quilla y pala de timón y menos obra muerta, lo aguantan mucho mejor.</li>
<li><b>Contrarrestar el abatimiento</b>: cae hacia barlovento (la banda contraria a la que abates) los mismos grados que abates. El rumbo a seguir: <span class="formula">Rv = Rs − Abt</span>. Ejemplo del manual: quieres un Rs de 225° con viento del NW (315°) que te abate 5°. El viento entra por estribor → Abt −5° → Rv = 225° − (−5°) = <b>230°</b>.</li>
<li><b>Corriente</b>: movimiento del agua en una dirección. Se da por su rumbo (Rc, <b>hacia dónde va</b>, al revés que el viento) y su intensidad horaria (Ihc o Ic, en nudos). Afecta sobre todo a la velocidad y a la derrota.</li>
<li>Causas: temperatura y densidad del agua (<b>oceánicas</b>), viento constante (<b>de impulsión</b> o superficie), diferencia de nivel (<b>de descarga</b>, como la general del Estrecho) y las <b>mareas</b> (las más frecuentes y complicadas). En el Estrecho, el Mediterráneo evapora más de lo que recibe y el agua atlántica entra hacia el <b>E</b>, con intensidad variable que en verano llega a <b>4 nudos</b>.</li>
<li><span class="es">Deriva (D)</span>: ángulo entre el Rv y el <b>rumbo efectivo (Ref)</b>, la derrota real sobre el fondo. A diferencia del abatimiento, que depende de cada barco, la deriva afecta <b>igual a todos</b>.</li>
<li><b>Triángulo de vectores</b>: <b>Rv con Vm</b> (velocidad de máquinas o del barco, Vb: la que marca la corredera sobre el agua) + <b>Rc con Ihc</b> = <b>Ref con Vef</b> (rumbo y velocidad efectivos o sobre el fondo, la única referencia inmóvil).</li>
<li><b>Casos especiales</b>: si Rv y Rc son <b>iguales</b>, Ref = Rv y <span class="formula">Vef = Vm + Ihc</span>. Si son <b>opuestos</b> (con Vm &gt; Ihc), Ref = Rv y <span class="formula">Vef = Vm − Ihc</span>. Si Vm = Ihc, el barco no avanza nada sobre el fondo; si Ihc &gt; Vm, retrocede.</li></ul>
<div class="widget"><div class="eyebrow">Interactivo · triángulo de velocidades</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 300" id="cvSvg" role="img" aria-label="Vectores de rumbo y corriente"></svg>
<div><label class="small">Rv: <b id="cRvV"></b></label><input type="range" id="cRv" min="0" max="359" value="45"><label class="small">Velocidad: <b id="cVV"></b></label><input type="range" id="cV" min="2" max="15" value="8">
<label class="small">Rc (hacia dónde va): <b id="cRcV"></b></label><input type="range" id="cRc" min="0" max="359" value="160"><label class="small">Ihc: <b id="cIV"></b></label><input type="range" id="cI" min="0" max="40" value="20">
<div class="steps" id="cvSteps"></div></div></div></div>`],
["mareas","Mareas",`
<div class="widget"><div class="eyebrow">Interactivo · ¿cuánta agua tengo ahora?</div>
<label class="small">Hora tras la bajamar: <b id="tdV"></b></label><input type="range" id="tdS" min="0" max="124" value="30">
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 200" id="tdSvg" role="img" aria-label="Curva de marea"></svg><div id="tdInfo"></div></div></div>
<ul>
<li><span class="es">Pleamar</span>: nivel máximo. <span class="es">Bajamar</span>: nivel mínimo. <span class="es">Amplitud</span> (carrera): diferencia entre ambas. <span class="es">Repunte</span> o estoa: momento de cambio, sin corriente de marea. <span class="es">Flujo</span>: la marea sube; <span class="es">reflujo</span>: baja.</li>
<li>Mareas <b>vivas</b> (con luna nueva y llena): mayor amplitud. <b>Muertas</b> (cuartos): menor. En el Mediterráneo apenas hay marea; en el Estrecho y el Atlántico, mucha.</li>
<li><span class="formula wrap">Sonda en el momento = sonda en la carta + altura de la marea</span>. La presión también cuenta: unos <b>1 cm por cada hPa</b> de diferencia con 1013. Presión baja, más agua.</li>
<li>Las mareas son el movimiento oscilatorio, diario y periódico del nivel del mar por la atracción de la <b>Luna</b> y el <b>Sol</b>. <span class="es">Nivel medio</span>: el promedio entre pleamar y bajamar. Marea <span class="es">creciente</span> (entrante, flujo): de bajamar a pleamar; <span class="es">vaciante</span> (saliente, reflujo): de pleamar a bajamar. Entre pleamar y bajamar pasan unas <b>6 h 15 min</b> (duración de la creciente o de la vaciante), aunque varía.</li>
<li><b>Por qué manda la Luna</b>: la atracción depende de la masa y de la distancia. La Luna tiene casi 27 millones de veces menos masa que el Sol, pero está unas 389 veces más cerca, y su efecto sobre las mareas es unas <b>2,17 veces</b> el del Sol. Los demás astros no cuentan.</li>
<li><span class="es">Cero hidrográfico</span> (LAT, <i>Lowest Astronomical Tide</i>): la bajamar más baja que puede predecirse en condiciones meteorológicas medias. También se llama <b>bajamar escorada</b> o <b>Datum</b>. Es la referencia de las sondas de la carta, así que el agua real casi siempre es la de la carta o más. Para calcularlo, la Organización Hidrográfica Internacional usa una predicción de 19 años.</li>
<li><span class="es">Altura de la marea</span>: lo que sube el agua sobre el Datum en un momento dado. <span class="es">Amplitud</span>: diferencia, en metros, entre la bajamar y la pleamar más próximas. <span class="es">Duración</span>: tiempo entre una bajamar y la pleamar (o al revés).</li>
<li><span class="es">Anuario de Mareas</span> (Instituto Hidrográfico de la Marina, cada año): hora y altura de cada pleamar y bajamar de todos los días para los puertos de la península, Canarias, Ceuta y algunos de África occidental, Lisboa, Gibraltar y la Antártida. Las horas van en <b>GMT</b> (huso 0): para la hora del reloj suma el adelanto vigente, <b>+1 en invierno y +2 en verano</b>. Las alturas, en metros al centímetro y sobre el Datum: se suman a la sonda de la carta.</li>
<li><b>Lo que el Anuario no prevé</b>: con presión <b>alta</b>, las alturas son <b>menores</b>; con presión <b>baja</b>, mayores. Su tabla de corrección va de <b>−0,25 m a 1038 mb</b> a <b>+0,50 m a 963 mb</b>. El viento también influye: <b>de mar</b> sube la altura y adelanta la pleamar; <b>de tierra</b> la baja y la retrasa. Para el viento no hay tablas.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · sonda con el Anuario y la presión</div>
<label class="small">Sonda de la carta: <b id="mzCV"></b></label><input type="range" id="mzC" min="0" max="150" value="62">
<label class="small">Altura de marea del Anuario: <b id="mzAV"></b></label><input type="range" id="mzA" min="0" max="400" value="231">
<label class="small">Presión: <b id="mzPV"></b></label><input type="range" id="mzP" min="963" max="1038" value="1003">
<div class="steps" id="mzSteps"></div></div>
<ul>
<li><b>Regla de los doceavos</b>: en las 6 horas entre bajamar y pleamar, sube 1/12, 2/12, 3/12, 3/12, 2/12 y 1/12 de la amplitud. Lo más rápido, en las horas centrales.</li>
</ul>`],
["formulas","Abreviaturas y fórmulas",`
<div class="tablewrap"><table>
<tr><th>Abrev.</th><th>Significado</th><th>Abrev.</th><th>Significado</th></tr>
<tr><td>Abt (ab)</td><td>Abatimiento</td><td>Ic · Ihc</td><td>Intensidad (horaria) de la corriente</td></tr>
<tr><td>Br · Er</td><td>Babor · Estribor</td><td>K</td><td>Coeficiente de corredera</td></tr>
<tr><td>D</td><td>Deriva</td><td>l · le · lv</td><td>Latitud · estimada · verdadera</td></tr>
<tr><td>Da · Dm · Dv</td><td>Demora de aguja · magnética · verdadera</td><td>L · Le · Lv</td><td>Longitud · estimada · verdadera</td></tr>
<tr><td>dm</td><td>Declinación magnética</td><td>M</td><td>Marcación</td></tr>
<tr><td>Δ</td><td>Desvío</td><td>Ra · Rm · Rv</td><td>Rumbo de aguja · magnético · verdadero</td></tr>
<tr><td>GMT · T.U.</td><td>Hora del meridiano de Greenwich · Tiempo universal</td><td>Rc · Ref · Rs</td><td>Rumbo de la corriente · efectivo · de superficie</td></tr>
<tr><td>HCL</td><td>Hora civil del lugar</td><td>Sc</td><td>Sonda de la carta</td></tr>
<tr><td>HRB</td><td>Hora del reloj de bitácora</td><td>Se · Sv</td><td>Situación estimada · verdadera</td></tr>
<tr><td>Vb · Vm</td><td>Velocidad del barco · de máquinas</td><td>Vef</td><td>Velocidad efectiva</td></tr>
</table></div>
<div class="tablewrap"><table>
<tr><th>Fórmula</th><th>En palabras</th></tr>
<tr><td><span class="formula">Ct = dm + Δ</span></td><td>declinación con su signo más desvío con su signo</td></tr>
<tr><td><span class="formula">Rv = Ra + Ct</span></td><td>de aguja a verdadero se suma la Ct</td></tr>
<tr><td><span class="formula">Ra = Rv − Ct</span></td><td>de verdadero a aguja se resta</td></tr>
<tr><td><span class="formula">Dv = Da + Ct</span></td><td>igual con las demoras</td></tr>
<tr><td><span class="formula">Ct = Dv − Da</span></td><td>Ct con una enfilación u oposición</td></tr>
<tr><td><span class="formula">Rs = Rv + Abt</span></td><td>rumbo de superficie con el abatimiento</td></tr>
<tr><td><span class="formula">Rv = Rs − Abt</span></td><td>qué proa llevar para compensar el abatimiento</td></tr>
<tr><td><span class="formula">Dv = Rv + M</span></td><td>de marcación a demora verdadera</td></tr>
<tr><td><span class="formula">D = V · t</span></td><td>distancia, velocidad y tiempo</td></tr>
<tr><td><span class="formula">Sonda = Sc + altura de marea</span></td><td>con la corrección por presión</td></tr>
</table></div>
<p class="small muted">Todas las cantidades van con su signo: dm y Δ, + al E y − al W; M y Abt, + por estribor y − por babor (el Abt + cuando el viento entra por babor).</p>`]
],
init(root){
  {const C=$("#mzC",root),A=$("#mzA",root),P=$("#mzP",root);const f=v=>v.toFixed(2).replace(".",",");
   const up=()=>{const c=C.value/10,a=A.value/100,p=+P.value,k=(1013-p)/100,h=a+k;$("#mzCV",root).textContent=c.toFixed(1).replace(".",",")+" m";$("#mzAV",root).textContent=f(a)+" m";$("#mzPV",root).textContent=p+" hPa";
     $("#mzSteps",root).innerHTML=`<div>1. Corrección por presión: (1013 − ${p}) cm = <b>${k>=0?"+":"−"}${f(Math.abs(k))} m</b></div><div>2. Altura corregida: ${f(a)} ${k>=0?"+":"−"} ${f(Math.abs(k))} = ${f(h)} m</div><div>3. Sonda: ${c.toFixed(1).replace(".",",")} + ${f(h)} = <b>${f(c+h)} m</b></div>`};
   [C,A,P].forEach(e=>e.addEventListener("input",up));up();}
  {const a=$("#kDv",root),b=$("#kDc",root);const up=()=>{const dv=a.value/10,dc=b.value/10;$("#kDvV",root).textContent=dv.toFixed(1);$("#kDcV",root).textContent=dc.toFixed(1);const k=dv/dc;$("#kTxt",root).innerHTML=`K = ${dv.toFixed(1)} / ${dc.toFixed(1)} = <b>${k.toFixed(2)}</b> → ${Math.abs(k-1)<0.005?"corredera bien ajustada":k>1?"la corredera marca de menos":"la corredera marca de más"}.`};a.addEventListener("input",up);b.addEventListener("input",up);up();}
  {const D=$("#ud",root),V=$("#uv",root),Y=$("#uy",root),N=$("#un",root);
   const f=m=>{const a=Math.abs(m),g=Math.floor(a/60),mi=Math.round(a-g*60);return `${g}° ${String(mi).padStart(2,"0")}′ ${m<0?"NW":"NE"}`};
   const up=()=>{const d=+D.value,v=+V.value,y=+Y.value,n=+N.value;$("#udV",root).textContent=f(d);$("#uvV",root).textContent=`${Math.abs(v)}′ ${v<0?"W":"E"}`;$("#uyV",root).textContent=y;$("#unV",root).textContent=n;
     const yrs=n-y,inc=yrs*v,res=d+inc,rd=Math.round(res/30)*30;
     $("#uSteps",root).innerHTML=`<div>1. Años: ${n} − ${y} = <b>${yrs}</b></div><div>2. Cambio: ${yrs} × ${Math.abs(v)}′ ${v<0?"W":"E"} = ${inc<0?"−":"+"}${Math.abs(inc)}′</div><div>3. dm ${n}: ${d<0?"−":"+"}${Math.abs(d)}′ ${inc<0?"−":"+"} ${Math.abs(inc)}′ = ${res<0?"−":"+"}${Math.abs(res)}′ = ${f(res)}</div><div>4. Redondeo a medio grado: <b>${f(rd)}</b></div>`};
   [D,V,Y,N].forEach(x=>x.addEventListener("input",up));up();}

  /* compass rose */
  const dmS=$("#dmS",root),dvS=$("#dvS",root),raS=$("#raS",root),sv=$("#crSvg",root);const c=160;
  const P=(a,R)=>[c+R*Math.sin(rad(a)),c-R*Math.cos(rad(a))];
  const arrow=(a,R,col,lab,w=3)=>{const [x,y]=P(a,R);return `<line x1="${c}" y1="${c}" x2="${x}" y2="${y}" stroke="${col}" stroke-width="${w}" marker-end="url(#cr-${lab})"/><defs>${AR("cr-"+lab,col)}</defs>`};
  const up=()=>{const dm=+dmS.value,dv=+dvS.value,ra=+raS.value,ct=dm+dv,rv=n360(ra+ct),rm=n360(ra+dv);
    $("#dmV",root).textContent=sg(dm,"E (NE)","W (NW)");$("#dvV",root).textContent=pm(dv);$("#raV",root).textContent=deg(ra);
    let ticks="";for(let a=0;a<360;a+=10){const [x1,y1]=P(a,132),[x2,y2]=P(a,a%30?126:120);ticks+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--muted)"/>`;if(a%30===0){const [tx,ty]=P(a,108);ticks+=`<text x="${tx}" y="${ty+4}" text-anchor="middle" font-size="9" fill="var(--muted)">${String(a).padStart(3,"0")}</text>`}}
    sv.innerHTML=`<circle cx="${c}" cy="${c}" r="134" fill="var(--paper)" stroke="var(--line)"/>${ticks}${arrow(0,96,"var(--ink)","Nv")}${arrow(dm,86,"var(--sea)","Nm")}${arrow(ct,76,"var(--accent)","Na")}
    <g transform="rotate(${rv} ${c} ${c})"><line x1="${c}" y1="${c}" x2="${c}" y2="${c-130}" stroke="var(--warn)" stroke-width="2" stroke-dasharray="6 4"/></g>${boatTop(c,c,46,rv)}<g font-size="11" font-weight="700"><text x="6" y="300" fill="var(--ink)">▲ Nv verdadero</text><text x="6" y="314" fill="var(--sea)">▲ Nm magnético</text><text x="314" y="300" text-anchor="end" fill="var(--accent)">▲ Na de aguja</text><text x="314" y="314" text-anchor="end" fill="var(--warn)">- - rumbo</text></g>`;
    $("#crSteps",root).textContent=`Ct = dm + Δ = ${pm(dm)} ${pm(dv)} = ${pm(ct)}\nRm = Ra + Δ = ${deg(ra)} ${pm(dv)} = ${deg(rm)}\nRv = Ra + Ct = ${deg(ra)} ${pm(ct)} = ${deg(rv)}`};
  [dmS,dvS,raS].forEach(e=>e.addEventListener("input",up));up();
  const cq=$("#cqS",root);const upq=()=>{const a=+cq.value;let t;if(a<=90)t=`N ${a}° E`;else if(a<=180)t=`S ${180-a}° E`;else if(a<=270)t=`S ${a-180}° W`;else t=`N ${360-a}° W`;$("#cqV",root).textContent=`${deg(a)} = ${t}`};cq.addEventListener("input",upq);upq();
  /* demora */
  const rvS=$("#rvS",root),mmS=$("#mmS",root),ds=$("#dmSvg",root);
  const upd=()=>{const rv=+rvS.value,m=+mmS.value,dv=n360(rv+m);const C=150;const Q=(a,R)=>[C+R*Math.sin(rad(a)),C-R*Math.cos(rad(a))];
    $("#rvV",root).textContent=deg(rv);$("#mmV",root).textContent=`${Math.abs(m)}° ${m<0?"Br":m>0?"Er":""}`;
    const [fx,fy]=Q(dv,120);const arcM=(a1,a2,R,col)=>{const [x1,y1]=Q(a1,R),[x2,y2]=Q(a2,R);const sweep=((a2-a1+360)%360)<180?1:0;const large=0;return `<path d="M${x1} ${y1} A ${R} ${R} 0 ${large} ${sweep} ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="2"/>`};
    ds.innerHTML=`<rect width="300" height="300" fill="var(--water)" rx="10"/><line x1="${C}" y1="${C}" x2="${C}" y2="20" stroke="var(--ink)" stroke-width="2"/><text x="${C}" y="14" text-anchor="middle" font-size="11" font-weight="700">Nv</text>
    <g transform="rotate(${rv} ${C} ${C})"><line x1="${C}" y1="${C}" x2="${C}" y2="40" stroke="var(--sea)" stroke-width="2" stroke-dasharray="5 4"/></g>${boatTop(C,C,40,rv)}
    <line x1="${C}" y1="${C}" x2="${fx}" y2="${fy}" stroke="var(--accent)" stroke-width="2.4"/><circle cx="${fx}" cy="${fy}" r="7" fill="var(--yellow)" stroke="var(--ink)"/><text x="${fx}" y="${fy-12}" text-anchor="middle" font-size="11">faro</text>
    ${arcM(0,dv,60,"var(--accent)")}${m!==0?arcM(Math.min(rv,rv+m)===rv?rv:rv+m,Math.min(rv,rv+m)===rv?rv+m:rv,85,"var(--sea)"):""}
    <text x="12" y="290" font-size="11" fill="var(--accent)">demora (desde el N)</text><text x="288" y="290" font-size="11" fill="var(--sea)" text-anchor="end">marcación (desde la proa)</text>`;
    $("#dmSteps",root).textContent=`Dv = Rv + M = ${deg(rv)} ${pm(m)} = ${deg(dv)}\nEn la carta trazas desde el faro la opuesta: ${deg(dv+180)}`};
  [rvS,mmS].forEach(e=>e.addEventListener("input",upd));upd();
  /* current vectors */
  const cRv=$("#cRv",root),cV=$("#cV",root),cRc=$("#cRc",root),cI=$("#cI",root),cs=$("#cvSvg",root);
  const upc=()=>{const rv=+cRv.value,v=+cV.value,rc=+cRc.value,ic=+cI.value/10;$("#cRvV",root).textContent=deg(rv);$("#cVV",root).textContent=v+" nudos";$("#cRcV",root).textContent=deg(rc);$("#cIV",root).textContent=ic.toFixed(1)+" nudos";
    const k=14;const x0=150-((v*Math.sin(rad(rv))+ic*Math.sin(rad(rc)))*k)/2,y0=150+((v*Math.cos(rad(rv))+ic*Math.cos(rad(rc)))*k)/2;
    const x1=x0+v*k*Math.sin(rad(rv)),y1=y0-v*k*Math.cos(rad(rv)),x2=x1+ic*k*Math.sin(rad(rc)),y2=y1-ic*k*Math.cos(rad(rc));
    const ex=v*Math.sin(rad(rv))+ic*Math.sin(rad(rc)),ny=v*Math.cos(rad(rv))+ic*Math.cos(rad(rc));const ref=n360(Math.atan2(ex,ny)*180/Math.PI),vef=Math.hypot(ex,ny);
    cs.innerHTML=`<defs>${AR("v1","var(--sea)")}${AR("v2","var(--warn)")}${AR("v3","var(--accent)")}</defs><rect width="300" height="300" fill="var(--water)" rx="10"/><text x="150" y="14" text-anchor="middle" font-size="11">N ↑</text>
    <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="var(--sea)" stroke-width="3" marker-end="url(#v1)"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--warn)" stroke-width="3" marker-end="url(#v2)"/><line x1="${x0}" y1="${y0}" x2="${x2}" y2="${y2}" stroke="var(--accent)" stroke-width="3" marker-end="url(#v3)"/>
    <text x="10" y="270" font-size="11" fill="var(--sea)">rumbo y velocidad propios</text><text x="10" y="284" font-size="11" fill="var(--warn)">corriente</text><text x="150" y="284" font-size="11" fill="var(--accent)">efectivo</text>`;
    $("#cvSteps",root).textContent=`Rumbo efectivo Ref = ${deg(ref)}\nVelocidad efectiva Vef = ${vef.toFixed(1)} nudos\nEn la carta: tu vector de ${v} mn al ${deg(rv)} y, desde su extremo, ${ic.toFixed(1)} mn al ${deg(rc)}.`};
  [cRv,cV,cRc,cI].forEach(e=>e.addEventListener("input",upc));upc();
  /* tide */
  const td=$("#tdS",root),ts=$("#tdSvg",root);const BM=0.4,PMh=2.6,DUR=6.2,SC=2.0,CAL=1.6;
  const H=t=>BM+(PMh-BM)*(1-Math.cos(Math.PI*t/DUR))/2;
  const upt=()=>{const t=+td.value/10;const h=H(t);const hh=Math.floor(t),mm=Math.round((t-hh)*60);$("#tdV",root).textContent=`${hh} h ${String(mm).padStart(2,"0")} min`;
    let p="";for(let x=0;x<=12.4;x+=0.2){p+=(x?" L":"M")+(20+x/12.4*260).toFixed(1)+" "+(150-H(x)*40).toFixed(1)}
    const px=20+t/12.4*260,py=150-h*40;const sonda=SC+h;
    ts.innerHTML=`<rect width="300" height="200" fill="var(--paper)" rx="8"/><line x1="20" y1="150" x2="280" y2="150" stroke="var(--ink)"/><text x="22" y="164" font-size="10" fill="var(--muted)">cero hidrográfico</text><path d="${p}" fill="none" stroke="var(--sea)" stroke-width="2.4"/><line x1="${px}" y1="150" x2="${px}" y2="${py}" stroke="var(--accent)" stroke-width="2"/><circle cx="${px}" cy="${py}" r="5" fill="var(--accent)"/><text x="${20+DUR/12.4*260}" y="${150-PMh*40-8}" text-anchor="middle" font-size="10">PM ${String(PMh).replace(".",",")} m</text><text x="24" y="${150-BM*40-6}" font-size="10">BM ${String(BM).replace(".",",")} m</text><text x="280" y="${150-BM*40-6}" font-size="10" text-anchor="end">BM</text><text x="150" y="190" text-anchor="middle" font-size="10" fill="var(--muted)">0 h → 12 h 24 min</text>`;
    $("#tdInfo",root).innerHTML=`<p class="small">Sonda en la carta: <b>${SC.toFixed(1)} m</b> · calado de tu barco: <b>${CAL} m</b></p><p>Altura de marea ahora: <b>${h.toFixed(2)} m</b></p><p>Sonda en el momento: ${SC.toFixed(1)} + ${h.toFixed(2)} = <b>${sonda.toFixed(2)} m</b></p><p class="${sonda-CAL>=1?"pass":"fail"}">Agua bajo la quilla: ${(sonda-CAL).toFixed(2)} m ${sonda-CAL>=1?"· pasas con margen":"· poco margen, espera a que suba"}</p>`};
  td.addEventListener("input",upt);upt();
}};

/* ================= TEMA 11 · CARTA ================= */
/* practice chart: lat 36°00'–36°11' N, long 5°40'–5°20' W ; Mercator px: 28/min long, 34.55/min lat */
const CX0=20,CY0=400,KL=28,KP=34.55,LAT0=36*60,LON0=-(5*60+40);
const toXY=(latm,lonm)=>[CX0+(lonm-LON0)*KL,CY0-(latm-LAT0)*KP];
const toLL=(x,y)=>[LAT0+(CY0-y)/KP,LON0+(x-CX0)/KL];
const fLat=m=>{const d=Math.floor(m/60),mm=m-d*60;return `${d}° ${mm.toFixed(1).replace(".",",").padStart(4,"0")}′ N`};
const fLon=m=>{const a=Math.abs(m);const d=Math.floor(a/60),mm=a-d*60;return `${String(d).padStart(3,"0")}° ${mm.toFixed(1).replace(".",",").padStart(4,"0")}′ W`};
const LH=[{n:"Faro Pta. Alta",lat:LAT0+9.2,lon:LON0+4.5,c:"Fl(2) 10s 15M"},{n:"Faro C. Gaviota",lat:LAT0+8.6,lon:LON0+15.8,c:"Oc 4s 12M"},{n:"Torre del Moro",lat:LAT0+10.1,lon:LON0+10.2,c:"(visible)"}];
function chartSVG(){
  let s=`<svg viewBox="0 0 600 420" id="chSvg" role="img" aria-label="Carta de práctica" style="max-height:none;touch-action:manipulation"><rect width="600" height="420" fill="var(--water)"/>`;
  /* coast */
  const coast=[[0,0],[600,0],[600,90],[560,96],[520,130],[470,124],[440,108],[400,104],[370,80],[330,90],[300,74],[250,82],[200,96],[180,128],[150,120],[110,88],[70,100],[40,80],[20,84],[20,0]];
  s+=`<path d="M${coast.map(p=>p.join(" ")).join(" L")} Z" fill="var(--land)" stroke="var(--ink)" stroke-width="1.4"/>`;
  s+=`<path d="M20 130 Q 120 160 200 150 Q 300 140 420 170 Q 520 190 580 160" fill="none" stroke="var(--sea)" stroke-width="1" stroke-dasharray="4 3"/><text x="300" y="150" font-size="9" fill="var(--sea)">10</text><text x="160" y="250" font-size="11" fill="var(--sea)">24  ·  31 A</text><text x="420" y="300" font-size="11" fill="var(--sea)">48 F</text><text x="300" y="360" font-size="11" fill="var(--sea)">63</text>`;
  /* scales */
  for(let i=0;i<=11;i++){const y=CY0-i*KP;s+=`<line x1="20" y1="${y}" x2="${i%1?26:30}" y2="${y}" stroke="var(--ink)"/>${i%2===0&&i>0?`<text x="34" y="${y+4}" font-size="9" fill="var(--ink)">36°${String(i).padStart(2,"0")}′</text>`:""}`;for(let k=1;k<10&&i<11;k++){const yy=y-k*KP/10;s+=`<line x1="20" y1="${yy}" x2="24" y2="${yy}" stroke="var(--ink)" stroke-width=".6"/>`}}
  for(let i=0;i<=20;i++){const x=CX0+i*KL;s+=`<line x1="${x}" y1="410" x2="${x}" y2="402" stroke="var(--ink)"/>${i%4===0?`<text x="${x}" y="398" font-size="9" text-anchor="middle" fill="var(--ink)">5°${String(40-i).padStart(2,"0")}′W</text>`:""}`}
  s+=`<line x1="20" y1="0" x2="20" y2="420" stroke="var(--ink)" stroke-width="1.4"/><line x1="0" y1="410" x2="600" y2="410" stroke="var(--ink)" stroke-width="1.4"/>`;
  /* grid lines */
  [2,4,6,8,10].forEach(i=>s+=`<line x1="20" y1="${CY0-i*KP}" x2="600" y2="${CY0-i*KP}" stroke="var(--ink)" stroke-width=".3" opacity=".5"/>`);[4,8,12,16].forEach(i=>s+=`<line x1="${CX0+i*KL}" y1="0" x2="${CX0+i*KL}" y2="410" stroke="var(--ink)" stroke-width=".3" opacity=".5"/>`);
  LH.forEach((l,i)=>{const [x,y]=toXY(l.lat,l.lon);s+=`<g><circle cx="${x}" cy="${y}" r="4" fill="var(--accent)"/><path d="M${x} ${y} l14 -10 a 16 16 0 0 1 -4 18 z" fill="var(--accent)" opacity=".6"/><text x="${x+8}" y="${y-12}" font-size="10" font-weight="700" fill="var(--ink)">${l.n}</text><text x="${x+8}" y="${y-2}" font-size="9" fill="var(--accent)">${l.c}</text></g>`});
  s+=`<g transform="translate(520 330)"><circle r="40" fill="none" stroke="var(--accent)"/><circle r="28" fill="none" stroke="var(--accent)" stroke-dasharray="2 2"/><line x1="0" y1="-44" x2="0" y2="44" stroke="var(--accent)"/><line x1="-44" y1="0" x2="44" y2="0" stroke="var(--accent)"/><text y="-46" text-anchor="middle" font-size="9" fill="var(--accent)">N</text><text y="56" text-anchor="middle" font-size="8" fill="var(--accent)">dm 2°W (2026)</text></g>`;
  s+=`<text x="590" y="414" font-size="8" text-anchor="end" fill="var(--muted)">Carta de práctica, no para navegar</text>`;
  return s+`<g id="chLayer"></g></svg>`;
}
const DRILLS={
 rarv:{name:"Ra → Rv (de aguja a verdadero)",gen(){const ra=r(0,359),dm=r(-6,4)||-2,dv=r(-5,5);const ct=dm+dv;return{q:`Gobiernas Ra = ${deg(ra)}. dm = ${sg(dm)}, Δ = ${pm(dv)}. ¿Rv?`,ans:n360(ra+ct),unit:"°",steps:`Ct = dm + Δ = ${pm(dm)} ${pm(dv)} = ${pm(ct)}\nRv = Ra + Ct = ${deg(ra)} ${pm(ct)} = ${deg(ra+ct)}`}}},
 rvra:{name:"Rv → Ra (de verdadero a aguja)",gen(){const rv=r(0,359),dm=r(-6,4)||-3,dv=r(-5,5);const ct=dm+dv;return{q:`Necesitas Rv = ${deg(rv)}. dm = ${sg(dm)}, Δ = ${pm(dv)}. ¿Ra a gobernar?`,ans:n360(rv-ct),unit:"°",steps:`Ct = ${pm(dm)} ${pm(dv)} = ${pm(ct)}\nRa = Rv − Ct = ${deg(rv)} − (${pm(ct)}) = ${deg(rv-ct)}`}}},
 enf:{name:"Ct y Δ por enfilación",gen(){const dvv=r(0,359),dm=r(-5,3)||-2,dv=r(-6,6)||3;const ct=dm+dv;const da=n360(dvv-ct);return{q:`Una enfilación tiene Dv = ${deg(dvv)} en la carta. La observas a Da = ${deg(da)}. dm = ${sg(dm)}. ¿Desvío Δ?`,ans:dv,unit:"°",signed:true,steps:`Ct = Dv − Da = ${deg(dvv)} − ${deg(da)} = ${pm(ct)}\nΔ = Ct − dm = ${pm(ct)} − (${pm(dm)}) = ${pm(dv)}`}}},
 marc:{name:"Marcación → Dv",gen(){const rv=r(0,359),m=r(10,170),br=Math.random()<.5;const M=br?-m:m;return{q:`Navegas a Rv = ${deg(rv)} y ves un faro por la marcación ${m}° ${br?"Br":"Er"}. ¿Dv del faro?`,ans:n360(rv+M),unit:"°",steps:`M = ${pm(M)} (${br?"babor, negativa":"estribor, positiva"})\nDv = Rv + M = ${deg(rv)} ${pm(M)} = ${deg(rv+M)}`}}},
 da2dv:{name:"Da (aguja) → Dv",gen(){const da=r(0,359),dm=r(-6,4)||-1,dv=r(-5,5);const ct=dm+dv;return{q:`Tomas Da = ${deg(da)} con la aguja. dm = ${sg(dm)}, Δ (para tu Ra) = ${pm(dv)}. ¿Dv para trazar?`,ans:n360(da+ct),unit:"°",steps:`Ct = ${pm(dm)} ${pm(dv)} = ${pm(ct)}\nDv = Da + Ct = ${deg(da)} ${pm(ct)} = ${deg(da+ct)}`}}},
 eta:{name:"Hora de llegada (D = V·t)",gen(){const v=r(5,16),d=+(r(30,240)/10).toFixed(1),h=r(7*60,16*60);const t=d/v*60;const hh=m=>{m=((Math.round(m)%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0")};return{q:`A las ${hh(h)} estás a ${String(d).replace(".",",")} mn del destino, navegando a ${v} nudos. ¿Hora de llegada? (hh:mm)`,ans:hh(h+t),unit:"",time:true,steps:`t = D / V = ${d} / ${v} = ${(d/v).toFixed(3)} h = ${Math.round(t)} min\nHora = ${hh(h)} + ${Math.round(t)} min = ${hh(h+t)}`}}},
 dm:{name:"Actualizar la dm a 2026",gen(){const y=r(1995,2015),dm0=r(-180,120),ch=r(5,9)*(Math.random()<.7?1:-1);const yrs=2026-y,tot=dm0+ch*yrs;const f=m=>`${Math.floor(Math.abs(m)/60)}°${String(Math.abs(m)%60).padStart(2,"0")}′ ${m>=0?"E":"W"}`;return{q:`La rosa indica dm ${y} = ${f(dm0)}, variación anual ${Math.abs(ch)}′ ${ch>0?"E":"W"}. ¿dm en 2026? (grados decimales, W negativo)`,ans:+(tot/60).toFixed(2),unit:"°",signed:true,tol:.1,steps:`Años = 2026 − ${y} = ${yrs}\nCambio = ${yrs} × ${ch>0?"+":"−"}${Math.abs(ch)}′ = ${ch*yrs>0?"+":"−"}${Math.abs(ch*yrs)}′\ndm = ${dm0>=0?"+":"−"}${Math.abs(dm0)}′ ${ch*yrs>0?"+":"−"} ${Math.abs(ch*yrs)}′ = ${tot}′ = ${f(tot)}  (${(tot/60).toFixed(2)}°)`}}},
 sonda:{name:"Sonda en el momento (marea + presión)",gen(){const sc=+(r(10,80)/10).toFixed(1),hm=+(r(20,320)/100).toFixed(2),p=r(990,1030);const corr=(1013-p)/100;const res=sc+hm+corr;return{q:`Sonda en carta ${String(sc).replace(".",",")} m, altura de marea ${String(hm).replace(".",",")} m, presión ${p} hPa. ¿Sonda en el momento? (m)`,ans:+res.toFixed(2),unit:" m",tol:.03,steps:`Corrección por presión ≈ (1013 − ${p}) cm = ${corr>=0?"+":""}${corr.toFixed(2)} m\nSonda = ${sc} + ${hm} ${corr>=0?"+":"−"} ${Math.abs(corr).toFixed(2)} = ${res.toFixed(2)} m`}}},
 abt:{name:"Abatimiento → Rs",gen(){const rv=r(0,359),a=r(3,10),er=Math.random()<.5;const A=er?-a:a;return{q:`Rv = ${deg(rv)}, viento por ${er?"estribor":"babor"} que produce ${a}° de abatimiento. ¿Rumbo de superficie (Rs)?`,ans:n360(rv+A),unit:"°",steps:`Viento por ${er?"Er → abatimiento negativo":"Br → abatimiento positivo"}: Abt = ${pm(A)}\nRs = Rv + Abt = ${deg(rv)} ${pm(A)} = ${deg(rv+A)}`}}},
 cor:{name:"Corriente → rumbo efectivo",gen(){const rv=r(0,359),v=r(5,12),rc=r(0,359),ic=+(r(10,30)/10).toFixed(1);const x=v*Math.sin(rad(rv))+ic*Math.sin(rad(rc)),y=v*Math.cos(rad(rv))+ic*Math.cos(rad(rc));const ref=n360(Math.atan2(x,y)*180/Math.PI),vef=Math.hypot(x,y);return{q:`Rv = ${deg(rv)}, velocidad ${v} nudos. Corriente Rc = ${deg(rc)}, Ihc = ${String(ic).replace(".",",")} nudos. ¿Rumbo efectivo?`,ans:Math.round(ref),unit:"°",tol:1.5,steps:`Traza tu vector de ${v} mn al ${deg(rv)} y, desde su extremo, ${ic} mn al ${deg(rc)}.\nCálculo: E = ${x.toFixed(2)}, N = ${y.toFixed(2)}\nRef = ${deg(ref)}   ·   Vef = ${vef.toFixed(1)} nudos`}}}
};
CH[11]={
intro:"Cuatro preguntas sobre la carta 25-C del Estrecho y hace falta acertar dos. Son siempre del mismo tipo y se resuelven con un método fijo: aquí practicarlas rinde más que en ningún otro tema. El trazado de verdad hay que hacerlo a mano, con instrumentos.",
sections:[
["instr","Instrumentos y método",`
<div class="grid3">
<div class="panel"><h4>Compás de puntas</h4><p>Medir distancias: abres sobre los dos puntos y lo llevas a la <b>escala de latitudes</b> (lateral), a la misma altura. 1′ = 1 mn.</p></div>
<div class="panel"><h4>Transportador</h4><p>Medir y trazar rumbos y demoras. Se alinea con un meridiano o un paralelo.</p></div>
<div class="panel"><h4>Regla paralela / cartabón</h4><p>Trasladar una dirección desde la rosa o un meridiano hasta tu punto.</p></div>
<div class="panel"><h4>Lápiz y goma</h4><p>Blando (2B) y fino. Traza solo lo necesario y borra al terminar cada ejercicio.</p></div>
<div class="panel"><h4>Calculadora</h4><p>No programable, para D = V·t y las horas.</p></div>
<div class="panel"><h4>Lo primero</h4><p>Corregir siempre la <b>dm al año del examen</b> con la rosa de la carta antes de pasar rumbos.</p></div>
</div>`],
["practica","Carta de práctica interactiva",`
<div class="widget"><div class="eyebrow">Interactivo · trabaja sobre la carta</div>
<div class="seg" id="chModes"><button class="btn sm" data-m="pos" aria-pressed="true">Leer coordenadas</button><button class="btn sm ghost" data-m="rd" aria-pressed="false">Rumbo y distancia</button><button class="btn sm ghost" data-m="dem" aria-pressed="false">Situación por 2 demoras</button></div>
<figure style="margin:8px 0">${chartSVG()}</figure>
<div id="chPanel" class="info"></div></div>
<p class="small muted">Esta carta es inventada pero respeta la proyección Mercator: fíjate en que un minuto de latitud (lateral) mide más que uno de longitud (abajo). Por eso las distancias se miden siempre en la escala lateral.</p>`],
["trazado","Trazado paso a paso (ejemplos del manual)",`
<ul>
<li>En la carta los <b>meridianos</b> son rectas verticales con su longitud en los bordes de arriba y abajo; los <b>paralelos</b>, rectas horizontales con la latitud en los bordes laterales. En el hemisferio norte la latitud crece hacia arriba; la longitud W crece de derecha a izquierda (la E, al revés).</li>
<li>En las escalas, cada celda es <b>1′</b>, dividida en cinco de <b>0,2′</b>.</li>
<li><b>Transportador rectangular</b>: ángulos de 0° a 360° en el borde y líneas N-S y E-W dentro. Su centro se pone en el barco o en el faro, <b>orientado al norte</b> (alguna línea paralela o encima de un meridiano o paralelo).</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Tarea</th><th>Cómo</th></tr>
<tr><td>Coordenadas de un punto (opción A)</td><td>Borde superior o inferior del transportador tangente al punto, bien orientado; donde corta la escala lateral, la latitud. Con el borde lateral, la longitud en la escala de arriba o abajo.</td></tr>
<tr><td>Coordenadas de un punto (opción B)</td><td>Con el compás, distancia del punto al paralelo (o meridiano) más próximo; se lleva a la escala y se lee.</td></tr>
<tr><td>Situar unas coordenadas</td><td>Al revés: transportador en la latitud exacta de la escala lateral y se traza el paralelo; en la longitud exacta de la escala de abajo, el meridiano. El cruce es el punto.</td></tr>
<tr><td>Medir una distancia</td><td>Compás sobre los dos puntos y a la escala de latitudes a esa altura. Si es larga, toma 10 millas en la escala y ve marcándolas sobre la línea, midiendo luego el resto.</td></tr>
<tr><td>Medir un rumbo</td><td>Centro del transportador en el punto de salida, orientado al norte; el rumbo se lee donde la línea corta el borde.</td></tr>
<tr><td>Trazar un rumbo</td><td>Centro en el punto, orientado; marca el valor en el borde y une. Traza en el sentido de avance del barco.</td></tr>
</table></div>
<div class="grid2">
<div class="panel"><h4>Isla de Tarifa → Tánger</h4><p>dm 1° NW, Δ 5° W. Rv medido 215°. Ct = −1° − 5° = −6°. Ra = 215° − (−6°) = <b>221°</b>.</p></div>
<div class="panel"><h4>Algeciras → Ceuta</h4><p>Salida HRB 10:00, 8,1 nudos, dm 3° NW, Δ 5° E. Rv 158°, Ct +2°, Ra <b>156°</b>. Distancia 16,2 mn; t = 16,2 / 8,1 = 2 h; llegada <b>12:00</b>.</p></div>
<div class="panel"><h4>Pasar a 4 millas de Punta Europa</h4><p>Desde l 36° 09,6′ N, L 005° 12,4′ W, Ct −8°. Arco de 4 mn de radio con centro en el faro, tangente desde la situación: Rv 213° → Ra = 213° + 8° = <b>221°</b>.</p></div>
<div class="panel"><h4>Fórmula del tiempo</h4><p><span class="formula">t = D / V</span> · <span class="formula">D = V · t</span> · <span class="formula">V = D / t</span>. Hora de llegada = hora de salida + t.</p></div>
</div>`],
["situar","Situarse y mareas paso a paso (ejemplos del manual)",`
<ul>
<li><b>Trazar una demora</b>: igual que un rumbo, pero el centro del transportador va en la estrellita del <b>faro</b>, orientado al norte, y la marca queda en el lado contrario al que vas a trazar. Con la regla unes la marca con el faro y trazas desde el faro <b>hacia el mar</b> (el ángulo opuesto).</li>
<li><b>Trazar una enfilación u oposición</b>: el borde de la regla sobre las estrellitas de los dos faros.</li>
<li><b>Trazar una distancia</b>: con el compás, la distancia en la escala de latitudes a la altura del faro, y un arco con centro en el faro.</li>
</ul>
<div class="grid2">
<div class="panel"><h4>Estima desde Tánger</h4><p>HRB 12:00 en el espigón de Tánger, Ra 032°, 8 nudos, Ct −7°. Rv = 32° − 7° = <b>25°</b>. En una hora, 8 millas sobre el Rv: a las 13:00, s/e <b>l 35° 54,6′ N, L 005° 43,6′ W</b>.</p></div>
<div class="panel"><h4>Dos demoras: Tarifa y Pta. Carnero</h4><p>Da Tarifa 296°, Da Pta. Carnero 020°, Ct −5°. Dv 291° y 015°. Se trazan desde cada faro hacia el mar: s/v <b>l 35° 57,2′ N, L 005° 27,7′ W</b>.</p></div>
<div class="panel"><h4>Ct por una oposición</h4><p>Oposición Pta. de Gracia–Pta. Malabata; Dv medida en la carta (referencia Gracia) 350°. Da a Gracia N 05° W = 360° − 5° = 355°. Ct = 350° − 355° = <b>−5°</b>.</p></div>
<div class="panel"><h4>Ct con la dm de la carta</h4><p>Estrecho, Δ 4° NE, rosa: 2° 50′ W en 2005, 7′ E por año; año 2015. 10 × 7′ = 1° 10′ E; dm = −2° 50′ + 1° 10′ = −1° 40′ ≈ 1° 30′ W. Ct = −1° 30′ + 4° = <b>+2° 30′</b>.</p></div>
<div class="panel"><h4>Demora + enfilación sin conocer la Ct</h4><p>En la enfilación Pta. Europa–Pta. Carnero: Dv de Europa en la carta 244°, Da 251° → Ct <b>−7°</b>. Da Pta. Carbonera 342° → Dv 335°. Corte: s/v <b>l 36° 09′ N, L 005° 14,6′ W</b>.</p></div>
<div class="panel"><h4>Dos oposiciones</h4><p>Pta. Carnero–Pta. Alcázar e Isla de Tarifa–Pta. Cires: basta trazar las dos rectas, sin cálculos. s/v <b>l 35° 55,8′ N, L 005° 30,8′ W</b>. Es un caso bastante excepcional.</p></div>
<div class="panel"><h4>Dos distancias</h4><p>4 mn al faro de Pta. Carnero y 2,2 mn al de Pta. Europa. Dos arcos; su corte: s/v <b>l 36° 04,3′ N, L 005° 20,5′ W</b>.</p></div>
<div class="panel"><h4>Demora y distancia al mismo faro</h4><p>Al W verdadero de Cabo Espartel y a 5 mn: desde el faro se traza el <b>270°</b> y se miden 5 millas sobre él: s/v <b>l 35° 47,4′ N, L 006° 01,6′ W</b>.</p></div>
<div class="panel"><h4>Demora y veril</h4><p>Dv 017° a Cabo Trafalgar y la sonda marca 50 m: el corte de la demora con el veril de 50 m es la situación <b>estimada</b> l 36° 05,8′ N, L 006° 04′ W.</p></div>
<div class="panel"><h4>Marcaciones simultáneas</h4><p>Ra 123°, Ct −12° → Rv 111°. Pta. de Gracia 30° Br → Dv 81°; Cabo Trafalgar 154° Br → Dv 317°. s/v <b>l 36° 04,6′ N, L 005° 54,6′ W</b>.</p></div>
<div class="panel"><h4>Mareas en Barbate</h4><p>22-12-2014, sonda carta 6,2 m, 1003 hPa, entre las 12:00 y las 23:00. Anuario: pleamar 14:09 GMT 2,31 m; bajamar 20:10 GMT 0,23 m. Corrección por presión +0,10 m. Sonda en pleamar 2,41 + 6,2 = <b>8,61 m</b>; en bajamar 0,33 + 6,2 = <b>6,53 m</b>.</p></div>
</div>
<p class="small muted">En el examen, las respuestas de situación difieren a veces en décimas de minuto: los resultados de arriba son los del manual sobre la carta del Estrecho, y tu trazado puede variar un poco.</p>`],
["tipos","Los ejercicios del examen",`
<ol>
<li><b>Coordenadas</b> de un faro o un punto: latitud en las escalas laterales, longitud en las de arriba y abajo.</li>
<li><b>Rumbo y distancia</b> entre dos puntos. El rumbo que mides es verdadero; si te piden el de aguja, réstale la Ct.</li>
<li><b>Situación por dos demoras</b> simultáneas: pasa las Da a Dv (suma la Ct) o las marcaciones a Dv (Dv = Rv + M), y traza desde cada faro la opuesta. El corte es tu posición.</li>
<li><b>Demora y distancia</b> a un mismo faro: traza la demora y mide la distancia sobre ella.</li>
<li><b>Estima</b>: desde una situación, navegar el Rv durante t a V. D = V·t sobre la línea del rumbo.</li>
<li><b>Ct por enfilación</b>: Ct = Dv (carta) − Da (aguja). Y Δ = Ct − dm.</li>
<li><b>Corriente</b>: rumbo y velocidad efectivos, o qué Rv hay que hacer para seguir un rumbo efectivo dado (el problema inverso).</li>
<li><b>Mareas</b>: sonda en el momento, o la hora a la que habrá agua suficiente.</li>
<li><b>Pasar a X millas de un faro</b>: círculo de radio X con centro en el faro y tangente desde tu posición.</li>
</ol>
<div class="note"><b>Truco de velocidad.</b> Las cuatro respuestas suelen diferir en pocos grados o décimas de minuto. Traza con cuidado una sola vez, no redondees hasta el final y descarta primero las opciones absurdas (rumbos al revés, latitudes fuera de la carta).</div>`],
["generador","Generador de ejercicios de cálculo",`
<div class="widget"><div class="eyebrow">Interactivo · ejercicios infinitos</div>
<div class="row"><select id="drillType" aria-label="Tipo de ejercicio">${Object.entries(DRILLS).map(([k,d])=>`<option value="${k}">${d.name}</option>`).join("")}</select><button class="btn" id="newDrill">Nuevo ejercicio</button></div>
<div id="drill" style="margin-top:14px"></div></div>
<div class="tablewrap"><table><tr><th>Magnitud</th><th>Positivo (+)</th><th>Negativo (−)</th></tr>
<tr><td><b>dm</b></td><td>Este (NE)</td><td>Oeste (NW)</td></tr><tr><td><b>Δ</b></td><td>Este / «+»</td><td>Oeste / «−»</td></tr><tr><td><b>M</b> marcación</td><td>Estribor</td><td>Babor</td></tr><tr><td><b>Abt</b></td><td>Viento por babor</td><td>Viento por estribor</td></tr></table></div>`]
],
init(root){
  const svg=$("#chSvg",root),L=$("#chLayer",root),P=$("#chPanel",root);let mode="pos",pts=[];const DM=-2;
  const pt=e=>{const b=svg.getBoundingClientRect();return [(e.clientX-b.left)*600/b.width,(e.clientY-b.top)*420/b.height]};
  const dot=(x,y,c="var(--ink)")=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${c}" stroke="#fff" stroke-width="1.5"/>`;
  let ex=null;
  const setMode=m=>{mode=m;pts=[];L.innerHTML="";$$("#chModes button",root).forEach(b=>{b.classList.toggle("ghost",b.dataset.m!==m);b.setAttribute("aria-pressed",b.dataset.m===m)});
    if(m==="pos")P.innerHTML="Toca cualquier punto de la carta para leer su latitud y longitud.";
    if(m==="rd")P.innerHTML="Toca el punto de salida y después el de llegada.";
    if(m==="dem")newEx()};
  const newEx=()=>{const lat=LAT0+r(25,55)/10,lon=LON0+r(60,150)/10;const [a,b]=[LH[0],LH[1]];
    const bear=(l)=>{const dl=l.lat-lat,dL=(l.lon-lon)*Math.cos(rad(36.1));return n360(Math.atan2(dL,dl)*180/Math.PI)};
    const dv=r(-4,4);const ct=DM+dv;ex={lat,lon,d1:Math.round(bear(a)),d2:Math.round(bear(b)),ct,dv};
    P.innerHTML=`<p style="margin-top:0">Tomas simultáneamente <b>Da ${deg(ex.d1-ct)}</b> del ${a.n} y <b>Da ${deg(ex.d2-ct)}</b> del ${b.n}. dm = 2° W, Δ = ${pm(dv)}. Pasa a Dv y ajusta las dos demoras.</p>
    <label class="small">Dv al ${a.n}: <b id="d1V"></b></label><input type="range" id="d1" min="0" max="359" value="${r(150,200)}">
    <label class="small">Dv al ${b.n}: <b id="d2V"></b></label><input type="range" id="d2" min="0" max="359" value="${r(250,320)}">
    <div class="row"><button class="btn sm" id="dChk">Comprobar</button><button class="btn sm ghost" id="dNew">Otro ejercicio</button></div><div id="dOut" class="small"></div>`;
    const draw=()=>{const v1=+$("#d1",root).value,v2=+$("#d2",root).value;$("#d1V",root).textContent=deg(v1);$("#d2V",root).textContent=deg(v2);
      const line=(l,dv)=>{const [x,y]=toXY(l.lat,l.lon);const op=n360(dv+180);const dx=Math.sin(rad(op)),dy=-Math.cos(rad(op));return {x,y,dx,dy,svg:`<line x1="${x}" y1="${y}" x2="${x+dx*500}" y2="${y+dy*500}" stroke="var(--accent)" stroke-width="1.6"/>`}};
      const A=line(a,v1),B=line(b,v2);const den=A.dx*B.dy-A.dy*B.dx;let cut="";
      if(Math.abs(den)>1e-6){const t=((B.x-A.x)*B.dy-(B.y-A.y)*B.dx)/den;const u=((B.x-A.x)*A.dy-(B.y-A.y)*A.dx)/den;if(t>0&&u>0){const cx=A.x+A.dx*t,cy=A.y+A.dy*t;cut=`<circle cx="${cx}" cy="${cy}" r="7" fill="none" stroke="var(--ink)" stroke-width="2"/>`;ex.cut=[cx,cy]}else ex.cut=null}
      L.innerHTML=A.svg+B.svg+cut};
    $("#d1",root).addEventListener("input",draw);$("#d2",root).addEventListener("input",draw);draw();
    $("#dNew",root).addEventListener("click",newEx);
    $("#dChk",root).addEventListener("click",()=>{const v1=+$("#d1",root).value,v2=+$("#d2",root).value;const ok=Math.abs(((v1-ex.d1+540)%360)-180)<=1&&Math.abs(((v2-ex.d2+540)%360)-180)<=1;const [tx,ty]=toXY(ex.lat,ex.lon);
      $("#dOut",root).innerHTML=`<p class="${ok?"pass":"fail"}">${ok?"✓ Bien trazado.":"✗ Revisa las demoras."}</p><div class="steps">Ct = dm + Δ = −2° ${pm(ex.dv)} = ${pm(ex.ct)}\nDv1 = Da + Ct = ${deg(ex.d1-ex.ct)} ${pm(ex.ct)} = ${deg(ex.d1)}\nDv2 = ${deg(ex.d2-ex.ct)} ${pm(ex.ct)} = ${deg(ex.d2)}\nSituación: ${fLat(ex.lat)}  ${fLon(ex.lon)}</div>`;
      L.innerHTML+=dot(tx,ty,"var(--ok)")})};
  svg.addEventListener("click",e=>{const [x,y]=pt(e);if(y>405||x<20)return;const [la,lo]=toLL(x,y);
    if(mode==="pos"){L.innerHTML=dot(x,y)+`<line x1="20" y1="${y}" x2="${x}" y2="${y}" stroke="var(--ink)" stroke-dasharray="3 3"/><line x1="${x}" y1="${y}" x2="${x}" y2="410" stroke="var(--ink)" stroke-dasharray="3 3"/>`;P.innerHTML=`<b class="mono">${fLat(la)}  ·  ${fLon(lo)}</b><br><span class="small muted">Latitud leída en la escala lateral; longitud en la inferior.</span>`}
    if(mode==="rd"){pts.push([x,y,la,lo]);if(pts.length>2)pts=[pts[2]];
      L.innerHTML=pts.map(p=>dot(p[0],p[1])).join("");
      if(pts.length===2){const [a,b]=pts;const dl=b[2]-a[2],dL=(b[3]-a[3])*Math.cos(rad((a[2]+b[2])/120));const rv=n360(Math.atan2(dL,dl)*180/Math.PI),d=Math.hypot(dl,dL);
        L.innerHTML+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="var(--accent)" stroke-width="2"/><line x1="12" y1="${a[1]}" x2="12" y2="${a[1]-d*KP}" stroke="var(--accent)" stroke-width="4"/>`;
        P.innerHTML=`<b>Rv = ${deg(rv)}</b> · <b>distancia = ${d.toFixed(1).replace(".",",")} mn</b><br><span class="small">La barra magenta de la escala lateral es esa distancia medida en minutos de latitud. Rumbo de aguja con Δ = 0: Ra = Rv − dm = ${deg(rv+2)}.</span>`}
      else P.innerHTML="Ahora toca el punto de llegada."}
  });
  $$("#chModes button",root).forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.m)));setMode("pos");
  /* drills */
  const box=$("#drill",root);
  const newDrill=()=>{const p=DRILLS[$("#drillType",root).value].gen();
    box.innerHTML=`<p style="font-weight:600">${p.q}</p><div class="row"><input id="drillIn" type="${p.time?"text":"number"}" step="any" aria-label="Respuesta" placeholder="${p.time?"hh:mm":"respuesta"}"><button class="btn" id="chk">Comprobar</button><button class="btn ghost" id="sol">Ver solución</button><span class="fb" id="fb"></span></div><div class="steps" id="steps" hidden></div>`;
    const show=()=>{const s=$("#steps",box);s.hidden=false;s.textContent=p.steps};
    $("#chk",box).addEventListener("click",()=>{const v=$("#drillIn",box).value.trim();let ok=false;
      if(p.time)ok=v.replace(".",":")===p.ans;else{const x=parseFloat(v.replace(",","."));if(!isNaN(x)){const tol=p.tol??1;if(p.unit==="°"&&!p.signed){const d=Math.abs(n360(x)-n360(p.ans));ok=Math.min(d,360-d)<=tol}else ok=Math.abs(x-p.ans)<=tol}}
      const fb=$("#fb",box);fb.textContent=ok?"✓ Correcto":"✗ No es correcto";fb.className="fb "+(ok?"pass":"fail");show()});
    $("#drillIn",box).addEventListener("keydown",e=>{if(e.key==="Enter")$("#chk",box).click()});$("#sol",box).addEventListener("click",show)};
  $("#newDrill",root).addEventListener("click",newDrill);$("#drillType",root).addEventListener("change",newDrill);newDrill();
}};
})();
