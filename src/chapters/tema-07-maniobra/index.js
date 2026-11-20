// @ts-nocheck
/* Tema 7: CH[7] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
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

export { AR };
