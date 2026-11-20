// @ts-nocheck
/* Tema 9: CH[9] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
import { AR } from "../tema-07-maniobra/index.js";
const {$,$$,CH,boatTop}=PER;

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
