// @ts-nocheck
/* Tema 10: CH[10] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
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

export { sg };
