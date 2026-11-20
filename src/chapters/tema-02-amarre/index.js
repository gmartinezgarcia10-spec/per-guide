// @ts-nocheck
/* Tema 2: CH[2] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
const {$,$$,CH,boatTop,n360,r}=PER;

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
