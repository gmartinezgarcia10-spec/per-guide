// @ts-nocheck
/* Tema 11: CH[11] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5;
   the 11.2 practice chart was replaced by src/chart/practice.ts in C1.
   Shared helpers come from window.PER (src/core/per.ts). */
import { sg } from "../tema-10-teoria/index.js";
import { initPractice, practiceHTML } from "../../chart/practice.ts";
const {$,$$,CH,boatTop,r,n360,deg,pm,rad}=PER;

/* ================= TEMA 11 · CARTA ================= */
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
["practica","Carta de práctica interactiva",practiceHTML()],
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
  initPractice(root);
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
