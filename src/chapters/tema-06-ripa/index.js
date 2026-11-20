// @ts-nocheck
/* Tema 6: CH[6] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
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
