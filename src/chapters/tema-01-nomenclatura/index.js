// @ts-nocheck
/* Tema 1: CH[1] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
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
