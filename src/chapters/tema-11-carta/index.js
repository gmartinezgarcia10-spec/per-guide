// @ts-nocheck
/* Tema 11: CH[11] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
import { sg } from "../tema-10-teoria/index.js";
const {$,$$,CH,boatTop,r,n360,deg,pm,rad}=PER;

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
