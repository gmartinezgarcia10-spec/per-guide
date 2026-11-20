// @ts-nocheck
/* Tema 4: CH[4] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
const {$,$$,CH,boatTop}=PER;

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
