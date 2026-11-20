// @ts-nocheck
/* Tema 5: CH[5] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
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
