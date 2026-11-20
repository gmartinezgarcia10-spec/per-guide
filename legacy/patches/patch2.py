import sys,re
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

# --- cabos: gaza, terms
rep('<span class="es">Gaza</span>: lazo u ojo en el extremo.</li>',
'<span class="es">Gaza</span>: curva cerrada o lazo en un cabo; se hace con un as de guía o trenzando (ayustando) los cordones del chicote en los del firme.</li>')
rep('<tr><td class="es">Cobrar</td><td>Recoger un cabo tirando de él</td></tr>\n<tr><td class="es">Lascar / amollar</td><td>Soltar poco a poco un cabo que está trabajando</td></tr>\n<tr><td class="es">Arriar</td><td>Bajar algo (una vela, una bandera) o soltar un cabo</td></tr>',
'<tr><td class="es">Cobrar</td><td>Tirar de un cabo para recoger el seno o para tensarlo</td></tr>\n<tr><td class="es">Lascar / amollar</td><td>Aflojar un poco un cabo que estaba tenso</td></tr>\n<tr><td class="es">Arriar</td><td>Aflojar un cabo; lleva implícita la idea de bajar (se arrían las velas y los botes)</td></tr>\n<tr><td class="es">Arriar en banda</td><td>Soltar un cabo de golpe, sin retenerlo nada</td></tr>')
rep('<tr><td class="es">Largar</td><td>Soltar del todo un cabo, o lanzarlo a tierra</td></tr>',
'<tr><td class="es">Largar</td><td>Soltar del todo un cabo y dejarlo libre, desconectándose de él (o lanzarlo a tierra)</td></tr>')
rep('<tr><td class="es">Tesar / templar</td><td>Poner un cabo tenso</td></tr>',
'<tr><td class="es">Tesar / templar</td><td>Poner un cabo en tensión</td></tr>')

# --- nudos
rep('<tr><td class="es">As de guía</td><td>Gaza fija que no se corre ni se aprieta. Amarras a un noray, rodear a una persona</td><td>«El rey de los nudos»; no se corre</td></tr>\n<tr><td class="es">Ballestrinque</td><td>Hacer firme rápido a un poste, candelero o guardamancebos (defensas)</td><td>Se hace y deshace rápido; puede correrse</td></tr>\n<tr><td class="es">Nudo llano</td><td>Unir dos cabos de <b>igual</b> mena</td><td>Igual mena</td></tr>',
'<tr><td class="es">As de guía</td><td>Gaza fija, no corrediza, para encapillar un cabo (en un noray, alrededor de una persona). El más usado a bordo, sobre todo en vela</td><td>«El rey de los nudos»; no se corre</td></tr>\n<tr><td class="es">Ballestrinque</td><td>Hacer firme el chicote: a una bita (amarras) o a un pasamanos o candelero (cabos de las defensas). Se remata con un <b>cote de seguridad</b></td><td>Defensas; termina con cote</td></tr>\n<tr><td class="es">Nudo llano</td><td>Unir por los chicotes dos cabos de <b>igual</b> mena</td><td>Igual mena</td></tr>\n<tr><td class="es">Vueltas de rezón</td><td>Afirmar una amarra a una argolla protegiendo el cabo del roce. Muy usado para unir el cabo de fondeo a un ancla pequeña</td><td>Argolla · ancla pequeña</td></tr>')
rep('<div class="sea"><b>A bordo.</b> Practica el as de guía con los ojos cerrados',
'<p class="small">Un buen nudo tiene que poder deshacerse con facilidad aunque haya trabajado mucho.</p>\n<div class="sea"><b>A bordo.</b> Practica el as de guía con los ojos cerrados')

# --- elementos de amarre
rep('<p>Otros elementos: <span class="es">defensas</span> (protegen el costado), <span class="es">bichero</span> (pértiga con gancho), <span class="es">bita</span> (a bordo) y <span class="es">noray</span> (en el muelle), <span class="es">argolla</span>, <span class="es">guía</span> (cabo fino con peso para lanzar uno grueso), <span class="es">muerto</span> (peso en el fondo con una boya para amarrar).</p>',
'''<h3>Elementos de amarre</h3>
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
<div class="key"><b>No confundir.</b> El <b>noray</b> está en el muelle; la <b>bita</b> y la <b>cornamusa</b>, a bordo. La boya flota; el muerto está en el fondo.</div>''')

# --- fondeo: procedure
old_start=s.index('<h3>Cómo se fondea</h3>')
old_end=s.index('<ul>\n<li><span class="es">Garrear</span>',old_start)
s=s[:old_start]+'''<h3>Dónde fondear: el tenedero</h3>
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
'''+s[old_end:]
rep('<li><span class="es">Garrear</span>: el ancla se arrastra sin agarrar. Señales: las enfilaciones cambian, la cadena da tirones. Hay que filar más o volver a fondear.</li>\n<li><span class="es">Bornear</span>: el barco gira alrededor del ancla al cambiar el viento o la corriente. Deja un círculo libre de radio ≈ la cadena filada.</li>\n','')

# --- new sections after fondeo
NEW='''`],
["borneo","Borneo, garreo y vigilancia",`
<p><span class="es">Bornear</span>: el barco gira alrededor del ancla, con la cadena como radio, cuando cambia el viento o la corriente; la proa queda hacia el que domine. El <b>círculo de borneo</b> depende de la cadena filada, de la fuerza del viento o la corriente y de la obra muerta del barco. El <b>espacio de borneo</b> de cada barco hay que respetarlo en el fondeadero para no chocar.</p>
<div class="widget"><div class="eyebrow">Interactivo · rola el viento</div>
<div class="grid2"><div>
<label class="small">Dirección del viento: <b id="bwV"></b></label><input type="range" id="bw" min="0" max="359" value="0">
<div class="seg" style="margin:8px 0"><button class="btn sm" data-bz="cerca" aria-pressed="true">Fondeados muy juntos</button><button class="btn sm ghost" data-bz="lejos" aria-pressed="false">Respetando el borneo</button></div>
<p id="bTxt" style="font-weight:600"></p>
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
<g stroke="var(--accent)" stroke-width="3">
<line x1="260" y1="12" x2="260" y2="30"/><line x1="340" y1="12" x2="340" y2="30"/><line x1="420" y1="12" x2="420" y2="30"/><line x1="180" y1="12" x2="180" y2="30"/></g>
<text x="460" y="24" font-size="12" fill="var(--ink)">viento ↓</text>
<path d="M300 140 L200 60" stroke="var(--ink)" stroke-width="2.5" fill="none"/><path d="M300 140 L400 60" stroke="var(--ink)" stroke-width="2.5" fill="none"/>
<path d="M196 56 l-8 -6 M196 56 l2 -10" stroke="var(--ink)" stroke-width="3"/><path d="M404 56 l8 -6 M404 56 l-2 -10" stroke="var(--ink)" stroke-width="3"/>
<path d="M262 110 A 50 50 0 0 1 338 110" fill="none" stroke="var(--green)" stroke-width="2"/><text x="300" y="100" font-size="12" text-anchor="middle" fill="var(--green)">90°–120°</text>
${boatTop(300,170,56,0)}
<text x="150" y="88" font-size="11" fill="var(--muted)">1.ª ancla (barlovento)</text><text x="408" y="88" font-size="11" fill="var(--muted)">2.ª ancla</text>
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
init(root){'''
rep('más que el peso del ancla.</div>`]\n],\ninit(root){','más que el peso del ancla.</div>'+NEW)

# --- widget JS: append at start of init
rep('''  let ty="cadena";
  const sd=$("#sd",root)''','''  {const bw=$("#bw",root),bs=$("#bSvg",root);let bz="cerca";
   const draw=()=>{const a=+bw.value;$("#bwV",root).textContent=a+"°";const gap=bz==="cerca"?70:150,R=55;
     const A=[[150-gap/2,130],[150+gap/2,130]];const t=(a)*Math.PI/180;const dx=Math.sin(t),dy=-Math.cos(t);
     /* boat lies downwind of anchor; motor boat (2) reacts faster: assume both settle */
     const P=A.map(([x,y],i)=>[x-dx*R*(i?1:0.9),y-dy*R*(i?1:0.9)]);
     const d=Math.hypot(P[0][0]-P[1][0],P[0][1]-P[1][1]);const hit=d<26;
     let h=`<rect x="0" y="0" width="300" height="260" fill="var(--water)"/>`;
     A.forEach(([x,y],i)=>{h+=`<circle cx="${x}" cy="${y}" r="${R+12}" fill="none" stroke="${hit?"var(--red)":"var(--muted)"}" stroke-dasharray="4 4"/><path d="M${x} ${y} L${P[i][0]} ${P[i][1]}" stroke="var(--ink)" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="3" fill="var(--ink)"/>`;
       const rot=(a+180)%360;h+=boatTop(P[i][0]-dx*10,P[i][1]-dy*10,24,rot+180,i?"var(--shoal)":"var(--paper)")});
     h+=`<g transform="translate(270 30) rotate(${a+180})"><line x1="0" y1="-16" x2="0" y2="14" stroke="var(--accent)" stroke-width="3"/><path d="M-6 8 L0 16 L6 8" fill="none" stroke="var(--accent)" stroke-width="3"/></g><text x="270" y="62" font-size="10" text-anchor="middle" fill="var(--accent)">viento</text>`;
     bs.innerHTML=h;$("#bTxt",root).innerHTML=hit?"✗ Los barcos se tocan: no han respetado el espacio de borneo.":"✓ Hay sitio: cada uno bornea en su círculo.";$("#bTxt",root).className=hit?"fail":"pass"};
   bw.addEventListener("input",draw);
   $$("[data-bz]",root).forEach(b=>b.addEventListener("click",()=>{bz=b.dataset.bz;$$("[data-bz]",root).forEach(x=>{const on=x===b;x.classList.toggle("ghost",!on);x.setAttribute("aria-pressed",on)});draw()}));
   draw();}
  let ty="cadena";
  const sd=$("#sd",root)''')

QS=r'''PER.Q.push(
/* ---- 2 Amarre y fondeo (manual propio, tema 2) ---- */
["amarre","La pieza de hierro fundido fijada al muelle para sujetar las amarras es el…",["Bita","Noray","Cornamusa","Muerto"],1,"El noray está en tierra; bita y cornamusa, a bordo."],
["amarre","El peso sólido depositado en el fondo para sujetar una boya de amarre es el…",["Rezón","Muerto","Orinque","Lastre de quilla"],1,"Del muerto salen las cadenas o cabos que sujetan las boyas."],
["amarre","La rueda sobre la que gira el cabo dentro de una polea o motón es la…",["Roldana","Cabirón","Barbotén","Gaza"],0,"Roldana."],
["amarre","El trozo de cabo que sujeta una cadena en tensión para poder manipularla es la…",["Gaza","Boza","Guía","Rabiza"],1,"Abozar = sujetar con una boza."],
["amarre","Las piezas de inox fijadas en la borda para guiar las amarras al muelle son los…",["Candeleros","Guía-cabos","Pasamanos","Noráis"],1,"Guía-cabos."],
["amarre","Aflojar un poco un cabo que estaba tenso es…",["Arriar en banda","Lascar","Largar","Templar"],1,"Lascar: aflojar un poco."],
["amarre","Soltar un cabo de golpe, sin retención alguna, es…",["Lascar","Arriar en banda","Cobrar","Tesar"],1,"Arriar en banda."],
["amarre","Soltar del todo un cabo y desconectarse de él es…",["Largar","Lascar","Cobrar","Templar"],0,"Largar."],
["amarre","Para unir por sus chicotes dos cabos de la misma mena se usa el…",["As de guía","Nudo llano","Ballestrinque","Vueltas de rezón"],1,"Llano: igual mena."],
["amarre","Para afirmar un cabo de fondeo a un ancla pequeña, protegiéndolo del roce con la argolla, se usan…",["Vueltas de rezón","Un nudo llano","Un ballestrinque","Un as de guía"],0,"Vueltas de rezón."],
["amarre","El cabo de una defensa se afirma al pasamanos con un…",["Nudo llano","Ballestrinque con cote de seguridad","As de guía","Vuelta de escota"],1,"Ballestrinque rematado con un cote."],
["amarre","El nudo para hacer una gaza no corrediza y encapillar un cabo es el…",["Ballestrinque","As de guía","Nudo llano","Vuelta de rezón"],1,"El nudo más usado a bordo."],
["amarre","El tenedero es…",["El lugar donde se estiba el ancla","La superficie del fondo donde se clava el ancla","El cabo del orinque","La zona de borneo"],1,"Tenedero."],
["amarre","¿Cuál es un mal tenedero?",["Fango duro","Arena fangosa","Arena dura","Algas"],3,"Malos: piedra, fondos duros y algas."],
["amarre","El mayor riesgo de fondear en roca es que el ancla…",["Garree","Se enroque y no pueda levarse","Zarpe sola","Se doble"],1,"Por eso conviene el orinque."],
["amarre","Al elegir fondeadero hay que buscar, sobre todo, resguardo…",["Del sol","De la mar","De otros barcos","De la corriente"],1,"Del viento y, sobre todo, de la mar."],
["amarre","Fondear «a la gira» es fondear con…",["Dos anclas a barbas de gato","Una sola ancla por proa","Un ancla por proa y otra por popa","Una boya"],1,"El ancla es el único elemento de sujeción."],
["amarre","En la aproximación para fondear, el ancla debe ir…",["A pique","A la pendura","Estibada","Clara"],1,"Colgando, lista para dar fondo; proa al viento y mínima arrancada."],
["amarre","En condiciones normales se fila una cadena de…",["1–2 veces la profundidad","3–4 veces la profundidad","5 veces la eslora","10 veces la profundidad"],1,"Con mucho viento, corriente o marea, 5–6 veces."],
["amarre","Una vez fondeado, en lugar de dejar trabajar la cadena sobre el molinete conviene…",["Arriarla en banda","Abozarla con un cabo a las cornamusas de proa","Soltar el freno","Izar el ancla"],1,"Los anclajes del molinete pueden ceder."],
["amarre","El radio del círculo de borneo NO depende de…",["La cadena filada","La fuerza del viento o la corriente","La obra muerta del barco","El color del casco"],3,"Depende de la cadena, del viento/corriente y de la obra muerta."],
["amarre","Al bornear, la proa queda orientada…",["Siempre al norte","Al factor dominante entre viento y corriente","A la costa","A sotavento"],1,"Al que domine de los dos."],
["amarre","¿Qué barcos bornean más rápido?",["Los veleros","Las lanchas a motor, con más obra muerta y menos obra viva","Los de quilla larga","Todos igual"],1,"La obra muerta les da más superficie al viento."],
["amarre","Un barco que garrea se desplaza hacia…",["Barlovento","Sotavento","Proa","El ancla"],1,"El viento lo empuja a sotavento."],
["amarre","¿Cuál NO es una causa de garreo?",["Poca cadena filada","Fondo duro","Cadena caída sobre el ancla","Haber filado 5 veces la sonda"],3,"Filar mucha cadena es precisamente un remedio."],
["amarre","Para evitar el garreo NO sirve…",["Filar más cadena","Fondear una segunda ancla","Aguantarse con máquina avante","Virar cadena"],3,"Virar acorta la cadena y empeora el agarre."],
["amarre","El orinque se anuda…",["Al arganeo","A la cruz del ancla y a un boyarín","Al barbotén","A la bita de proa"],1,"Permite recuperar el ancla si se enroca."],
["amarre","En el fondeo a barbas de gato, las dos líneas forman un ángulo de…",["10°–20°","45°","90°–120°","180°"],2,"Y reducen el espacio de borneo."],
["amarre","En el fondeo a barbas de gato, la primera ancla se fondea por…",["Sotavento","Barlovento","La popa","El través"],1,"Llegando de través al viento: primera por barlovento, segunda por sotavento."],
["amarre","Con dos anclas por proa, las longitudes de las dos líneas deben ser…",["Lo más distintas posible","Iguales","La de barlovento el doble","Indiferentes"],1,"Misma longitud para repartir el esfuerzo."],
["amarre","Al levar, el tripulante de proa indica con la mano…",["La sonda","Hacia dónde llama la cadena","La velocidad","El rumbo a seguir"],1,"Para que el timonel haga llamar la cadena por la proa."],
["amarre","Al levar, cuando el ancla está a pique…",["Se da toda avante","Se detiene el barco y se sigue virando","Se fila más cadena","Se suelta el freno"],1,"Después zarpa y sube clara."],
["amarre","Tras levar, hay que estibar el ancla rápido para que no…",["Se oxide","Golpee la roda o las amuras","Se enrede el orinque","Se suelte el barbotén"],1,"Un ancla colgando golpea el casco."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
