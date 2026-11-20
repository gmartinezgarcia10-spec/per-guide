import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

rep('''<li><b>Loxodrómica</b>: línea que corta todos los meridianos''','''<li><b>Eje</b>: diámetro sobre el que gira la Tierra; sus extremos son los <b>polos</b> Norte (Pn) y Sur (Ps). <b>Ecuador</b>: circunferencia máxima perpendicular al eje; divide la Tierra en los hemisferios <b>norte</b> y <b>sur</b>.</li>
<li><b>Paralelos</b>: circunferencias <b>menores</b> paralelas al ecuador (infinitas). <b>Meridianos</b>: circunferencias <b>máximas</b> que pasan por los polos, perpendiculares al ecuador y a los paralelos. Los polos dividen cada meridiano en dos mitades: el <b>meridiano superior</b> (el «visible») y el <b>inferior o antimeridiano</b>.</li>
<li><b>Meridiano del lugar</b>: el que pasa por donde está el barco (si está en B, Pn-B-Ps). <b>Meridiano cero</b> o primer meridiano: el de <b>Greenwich</b>; divide la Tierra en las mitades oriental y occidental.</li>
<li><span class="es">Latitud (l)</span>: arco de meridiano del lugar desde el ecuador hasta el punto. De 0° (ecuador) a 90° (polos), <b>N o S</b>; nunca pasa de 90°. Todo un paralelo tiene la misma latitud.</li>
<li><span class="es">Longitud (L)</span>: arco de ecuador desde Greenwich hasta el meridiano del lugar. De 0° a 180°, <b>E o W</b>; Greenwich es 0° y su antimeridiano 180°. Todo un meridiano tiene la misma longitud. En el cruce de Greenwich con el ecuador, l = 0 y L = 0.</li>
<li>La <b>situación</b> es el cruce del meridiano y el paralelo del lugar, en grados, minutos y décimas de minuto, siempre con su N/S y E/W. Ejemplo del manual: l = 36° 04,5′ N, L = 005° 55,0′ W.</li>
<li><b>Loxodrómica</b>: línea que corta todos los meridianos''')

rep('''<li><b>Escala</b>: relación entre la carta y la realidad, como 1:100 000. Por escala: cartas generales, de arrumbamiento, de navegación costera, de aproches y portulanos (puertos, más detalle).</li>''',
'''<li>Las edita en España el <b>Instituto Hidrográfico de la Marina</b>. Representan la costa, accidentes, faros, boyas, bajos, fondos, sondas y la cuadrícula de meridianos y paralelos.</li>
<li><b>Escala</b>: índice de reducción, en fracción con numerador 1: una carta 1/10.000 muestra la zona 10.000 veces más pequeña. Por escala: <b>general</b> (oceánica), <b>arrumbamiento</b> (rumbos directos, navegación media), <b>navegación costera</b> (costa a la vista), <b>aproches o recalada</b> (aproximación a puertos) y <b>portulanos</b> (puertos, radas, fondeaderos; la mayor escala). Las cifras de escala de cada tipo <b>no hay que memorizarlas</b>.</li>
<li>Cartas de <b>punto menor</b>: grandes extensiones (escala pequeña). De <b>punto mayor</b>: escala grande (costeras y portulanos). <span class="es">Cartucho</span>: recuadro dentro de una carta con una zona importante a mayor escala.</li>
<li>Información: unos <b>mil signos y abreviaturas</b>. Accidentes de la costa y del terreno, puntos de referencia (iglesias, torres, antenas), luces con su fase, periodo y color, marcas para situarse o enfilar, boyas y balizas (las de peligro suelen ser <b>espeques</b>, palos clavados al fondo para que no se muevan con los temporales), sondas y veriles, naturaleza del fondo, peligros (bajos, rocas, naufragios), zonas prohibidas (militares, dispositivos de separación de tráfico) y la <b>rosa de declinación magnética</b> con su variación anual (en cartas generales puede haber varias).</li>
<li><b>Faros y farolas</b>: una <b>lágrima</b> rojiza; la posición exacta es el punto (estrellita) donde arranca la lágrima.</li>''')

rep('''<li>Naturaleza del fondo: <b>A</b> arena, <b>F</b> fango, <b>R</b> roca, <b>P</b> piedra, <b>Co</b> conchuela, <b>Al</b> algas, <b>Cs</b> cascajo.</li>
<li>Los faros se ven con su característica: <span class="mono">Fl(3) 10s 23m 15M</span> = grupo de 3 destellos cada 10 s, a 23 m de altura, alcance 15 millas.</li>''',
'''<li>Naturaleza del fondo: por decisión de la <b>OMI</b>, las abreviaturas de las cartas deben ir en <b>inglés</b>, y el examen pregunta las inglesas («M» = fango o lodo, «St» = piedra).</li>
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
<tr><td>Centelleo rápido</td><td>Ct</td><td>Q</td></tr>
<tr><td>Grupo de…</td><td>Gp</td><td>Gp</td></tr>
</table></div>
<ul>
<li>Los faros se ven con su característica: <span class="mono">Fl(3) 10s 23m 15M</span> = grupo de 3 destellos cada 10 s, a 23 m de altura, alcance 15 millas. Ejemplo del manual: <span class="mono">Fl(4) WR 20s 16M</span> = faro de sectores blanco y rojo, 4 destellos cada 20 s, alcance 16 millas.</li>''')

rep('''<li><b>Publicaciones náuticas</b>: <i>Libro de Faros y Señales de Niebla</i>,''','''<li><b>Derroteros</b>: describen la costa con detalle (con fotos y dibujos) y dan información para recaladas y aproximaciones a puertos, rías y ensenadas; hay que leerlos durante la navegación. <b>Guías náuticas</b>: Código Internacional de Señales, manual de primeros auxilios, reglamento de comunicaciones… <b>Libro de faros</b>: todos los faros, balizas, marcas y señales de niebla y acústicas, con número, posición, característica, elevación sobre el nivel medio, alcance y descripción; imprescindible para navegar de noche. <b>Anuario de mareas</b>: alturas de marea por lugar y día.</li>
<li><b>Publicaciones náuticas</b>: <i>Libro de Faros y Señales de Niebla</i>,''')

UNITS=r'''["unidades","Milla, nudo, corredera, sonda y hora",`
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
'''
rep('["rumbos","Rumbos, declinación y desvío",`',UNITS+'["rumbos","Rumbos, declinación y desvío",`')

rep('''<ul><li>Notación <b>circular</b>: de 000° a 360° en sentido horario.''','''<ul>
<li><b>Rumbo</b>: ángulo entre la línea popa-proa y el meridiano del lugar (el norte). Según el norte: <b>verdadero (Rv)</b>, <b>magnético (Rm)</b> o <b>de aguja (Ra)</b>. En la carta se trazan <b>Rv</b>; el timonel sigue <b>Ra</b>. La línea popa-proa no cambia: cambia el norte de referencia.</li>
<li>Si el resultado sale <b>negativo</b>, súmale 360°; si pasa de <b>360°</b>, réstaselos. Ej.: Ra 003°, Ct −8° → −5° + 360° = <b>355°</b>. Ra 357°, Ct +8° → 365° − 360° = <b>005°</b>.</li>
<li>Ejemplos del manual: Ra 228°, dm 3° NW, Δ 1° NE → Ct −2° → <b>Rv 226°</b>. Rv 342°, dm 5° NW, Δ 2° NW → Ct −7° → Ra = 342° − (−7°) = <b>349°</b>.</li>
<li>Notación <b>circular</b>: de 000° a 360° en sentido horario.''')

# chapter 11 plotting section
PLOT=r'''["trazado","Trazado paso a paso (ejemplos del manual)",`
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
'''
rep('["tipos","Los ejercicios del examen",`',PLOT+'["tipos","Los ejercicios del examen",`')

# widget JS in CH10 init: find init of CH[10]
i=s.index('CH[10]={'); j=s.index('init(root){',i)
INIT='''init(root){
  {const a=$("#kDv",root),b=$("#kDc",root);const up=()=>{const dv=a.value/10,dc=b.value/10;$("#kDvV",root).textContent=dv.toFixed(1);$("#kDcV",root).textContent=dc.toFixed(1);const k=dv/dc;$("#kTxt",root).innerHTML=`K = ${dv.toFixed(1)} / ${dc.toFixed(1)} = <b>${k.toFixed(2)}</b> → ${Math.abs(k-1)<0.005?"corredera bien ajustada":k>1?"la corredera marca de menos":"la corredera marca de más"}.`};a.addEventListener("input",up);b.addEventListener("input",up);up();}
  {const D=$("#ud",root),V=$("#uv",root),Y=$("#uy",root),N=$("#un",root);
   const f=m=>{const a=Math.abs(m),g=Math.floor(a/60),mi=Math.round(a-g*60);return `${g}° ${String(mi).padStart(2,"0")}′ ${m<0?"NW":"NE"}`};
   const up=()=>{const d=+D.value,v=+V.value,y=+Y.value,n=+N.value;$("#udV",root).textContent=f(d);$("#uvV",root).textContent=`${Math.abs(v)}′ ${v<0?"W":"E"}`;$("#uyV",root).textContent=y;$("#unV",root).textContent=n;
     const yrs=n-y,inc=yrs*v,res=d+inc,rd=Math.round(res/30)*30;
     $("#uSteps",root).innerHTML=`<div>1. Años: ${n} − ${y} = <b>${yrs}</b></div><div>2. Cambio: ${yrs} × ${Math.abs(v)}′ ${v<0?"W":"E"} = ${inc<0?"−":"+"}${Math.abs(inc)}′</div><div>3. dm ${n}: ${d<0?"−":"+"}${Math.abs(d)}′ ${inc<0?"−":"+"} ${Math.abs(inc)}′ = ${res<0?"−":"+"}${Math.abs(res)}′ = ${f(res)}</div><div>4. Redondeo a medio grado: <b>${f(rd)}</b></div>`};
   [D,V,Y,N].forEach(x=>x.addEventListener("input",up));up();}
'''
s=s[:j]+INIT+s[j+len('init(root){'):]

QS=r'''PER.Q.push(
/* ---- 10/11 Teoría de navegación (manual propio, 1.ª parte) ---- */
["teoria","El ecuador es…",["Una circunferencia menor","La circunferencia máxima perpendicular al eje de la Tierra","Un meridiano","El paralelo de 45°"],1,"Divide la Tierra en hemisferios norte y sur."],
["teoria","Los paralelos son…",["Circunferencias máximas","Circunferencias menores paralelas al ecuador","Semicírculos de polo a polo","Líneas de igual sonda"],1,"Hay infinitos."],
["teoria","Los meridianos son…",["Circunferencias menores","Circunferencias máximas que pasan por los polos","Paralelos al ecuador","Líneas de igual presión"],1,"Perpendiculares al ecuador y a los paralelos."],
["teoria","La mitad «opuesta» de un meridiano se llama…",["Meridiano superior","Antimeridiano o meridiano inferior","Paralelo","Meridiano del lugar"],1,"La visible es el meridiano superior."],
["teoria","El meridiano cero es el de…",["París","Greenwich","Cádiz","El ecuador"],1,"Divide la Tierra en mitades oriental y occidental."],
["teoria","La latitud se mide…",["Sobre el ecuador desde Greenwich","Sobre el meridiano del lugar, desde el ecuador","Desde el polo","En la escala de longitudes"],1,"De 0° a 90° N o S."],
["teoria","La latitud nunca puede superar…",["45°","90°","180°","360°"],1,"En los polos es 90°."],
["teoria","La longitud se mide…",["De 0° a 90°","De 0° a 180° E o W desde Greenwich","De 0° a 360°","Desde el ecuador hacia el polo"],1,"Arco de ecuador hasta el meridiano del lugar."],
["teoria","Un punto en el cruce de Greenwich y el ecuador tiene…",["l 90°, L 0°","l 0°, L 0°","l 0°, L 180°","l 45°, L 45°"],1,"Latitud y longitud cero."],
["teoria","El antimeridiano de Greenwich tiene longitud…",["0°","90°","180°","360°"],2,"Greenwich es 0°."],
["teoria","El organismo que publica las cartas náuticas en España es…",["Salvamento Marítimo","El Instituto Hidrográfico de la Marina","Puertos del Estado","AEMET"],1,"También derroteros y libros de faros."],
["teoria","Una carta a escala 1/10.000 representa la zona…",["10.000 veces mayor","10.000 veces más pequeña que la real","A tamaño real","100 veces más pequeña"],1,"El numerador es siempre 1."],
["teoria","Las cartas de gran escala, como las costeras y los portulanos, se llaman de…",["Punto menor","Punto mayor","Arrumbamiento","Generales"],1,"Las de punto menor cubren grandes extensiones."],
["teoria","Las cartas que representan grandes extensiones de océano o costa son de…",["Punto mayor","Punto menor","Portulano","Aproche"],1,"Escala pequeña."],
["teoria","Los portulanos se usan para…",["Navegación oceánica","Llegar a puertos, radas y fondeaderos","Rumbos directos","Navegación costera lejana"],1,"Son las de mayor escala."],
["teoria","Las cartas de arrumbamiento sirven para…",["Entrar en puerto","Navegación media con rumbos directos","Fondear","Leer las mareas"],1,"Entre las generales y las costeras."],
["teoria","Los palos clavados al fondo para marcar un peligro se llaman…",["Boyas","Espeques","Balizas flotantes","Veriles"],1,"No cambian de lugar con los temporales."],
["teoria","En una carta, la posición exacta de un faro está…",["En el centro de la lágrima","En la estrellita donde arranca la lágrima","En el nombre","En el número de alcance"],1,"La lágrima es de color rojizo."],
["teoria","Las abreviaturas de las cartas, por decisión de la OMI, se expresan en…",["Español","Inglés","Francés","Latín"],1,"Idioma internacional del mar."],
["teoria","En una carta, «S» junto a una sonda significa fondo de…",["Piedra","Arena","Fango","Alga"],1,"Sand."],
["teoria","En una carta, «G» junto a una sonda significa fondo de…",["Arena","Cascajo (gravel)","Fango","Roca"],1,"Trozos de concha y piedra."],
["teoria","En una carta, «Wd» significa fondo de…",["Roca","Alga","Madera","Arcilla"],1,"Weed."],
["teoria","En una carta, «Cl» significa fondo de…",["Conchuela","Arcilla","Cascajo","Coral"],1,"Clay."],
["teoria","En inglés, el centelleo rápido se abrevia…",["Fl","Oc","Q","Iso"],2,"Quick flashing."],
["teoria","«Fl(4) WR 20s 16M» describe un faro…",["Fijo blanco y rojo","De sectores blanco y rojo, con 4 destellos cada 20 s y alcance de 16 millas","De 4 ocultaciones","De 16 destellos"],1,"Ejemplo del manual."],
["teoria","¿Qué publicación contiene la característica, elevación y alcance de cada faro?",["Derrotero","Libro de faros","Anuario de mareas","Avisos a los navegantes"],1,"Necesario sobre todo para navegar de noche."],
["teoria","El Código Internacional de Señales es una…",["Carta náutica","Guía náutica","Derrotero","Ley"],1,"Junto al manual de primeros auxilios y el reglamento de comunicaciones."],
["teoria","Una milla náutica equivale a…",["1.000 m","1.609 m","1.852 m","1.952 m"],2,"40.000.000 m / 21.600 minutos."],
["teoria","Un minuto de latitud equivale a…",["Un kilómetro","Una milla náutica","Un cable","Un nudo"],1,"Por eso se mide en la escala de latitudes."],
["teoria","¿Por qué no se miden distancias en la escala de longitudes?",["Porque está arriba","Porque los paralelos son circunferencias menores","Porque es más pequeña","Porque está en inglés"],1,"Solo en el ecuador valdría."],
["teoria","Un nudo es…",["Un kilómetro por hora","Una milla por hora","Un metro por segundo","Una braza"],1,"Unidad de velocidad."],
["teoria","Si la distancia verdadera es 4,5 millas y la corredera marca 3, el coeficiente es…",["0,67","1,5","7,5","1,35"],1,"K = Dv / Dc."],
["teoria","Un coeficiente de corredera K = 1 indica que…",["La corredera está estropeada","La corredera está perfectamente ajustada","Hay corriente","Hay abatimiento"],1,"Puede ser mayor o menor que 1."],
["teoria","Para hallar el coeficiente de corredera hay que navegar…",["Al azar","A rumbo fijo una distancia conocida marcada por enfilaciones","Con viento de popa","Fondeado"],1,"Y comparar con lo que marca la corredera."],
["teoria","A la lectura de la sonda ecoica hay que sumar…",["La marea","La distancia del transductor a la flotación","El calado de proa","Nada"],1,"Mide desde donde está instalada."],
["teoria","Un huso horario equivale a…",["1° de longitud","15° de longitud","30° de longitud","360°"],1,"360° / 24 h."],
["teoria","En navegación costera, como la del PER, se usa la…",["Hora legal","Hora oficial, la de nuestro reloj","Hora de Greenwich","Hora sidérea"],1,"Hrb = Ho."],
["teoria","Si el norte magnético está a la izquierda del verdadero, la declinación es…",["NE, positiva","NW, negativa","Nula","Siempre positiva"],1,"A la derecha: NE, positiva."],
["teoria","Una dm de 4° 25′ NW en 2005 con variación anual de 7′ E, en 2014 vale aproximadamente…",["5° 30′ NW","3° 30′ NW","4° 25′ NW","1° 03′ E"],1,"−4° 25′ + 1° 03′ = −3° 22′ ≈ 3° 30′ NW."],
["teoria","La dm actualizada se redondea a…",["Grados y segundos","Medio grado o grado entero","Décimas","Nunca se redondea"],1,"00′ o 30′."],
["teoria","El disco ligero de la aguja con los 360° grabados es la…",["Rosa","Bitácora","Chapitel","Línea de fe"],0,"Las agujas imantadas van debajo."],
["teoria","El eje vertical muy afilado sobre el que gira la rosa es el…",["Chapitel","Estilo","Mortero","Cardan"],1,"El chapitel es la hendidura que se apoya en él."],
["teoria","La caja circular con tapa de cristal que aloja la rosa es el…",["Mortero","Estilo","Chapitel","Alidada"],0,"Lleva las líneas de fe."],
["teoria","Las líneas de fe del mortero coinciden con…",["El norte magnético","La línea proa-popa del barco","El ecuador","La línea de flotación"],1,"Sirven para leer el rumbo."],
["teoria","El líquido del mortero suele ser…",["Aceite","Agua destilada con alcohol","Mercurio","Agua de mar"],1,"No se congela y amortigua."],
["teoria","Las propiedades fundamentales de una aguja náutica son…",["Peso y color","Sensibilidad y estabilidad","Brillo y tamaño","Precio y marca"],1,"Precisión ante cambios de rumbo y estabilidad ante balances."],
["teoria","El desvío de la aguja se debe a…",["La declinación","Objetos y equipos de a bordo imantados por inducción","La corriente","El viento"],1,"Y al casco si es metálico."],
["teoria","La tablilla de desvíos suele hacerse de…",["1° en 1°","15° en 15°","45° en 45°","90° en 90°"],1,"Los intermedios se prorratean."],
["teoria","Calcula el Rv con Ra = 228°, dm = 3° NW y Δ = 1° NE.",["230°","226°","232°","224°"],1,"Ct = −3° + 1° = −2°; Rv = 228° − 2°."],
["teoria","Calcula el Ra con Rv = 342°, dm = 5° NW y Δ = 2° NW.",["335°","349°","347°","337°"],1,"Ct = −7°; Ra = 342° + 7°."],
["teoria","Navegas a Ra 003° con Ct = −8°. El Rv es…",["−5°","355°","011°","005°"],1,"Si sale negativo, se suman 360°."],
["teoria","Navegas a Ra 357° con Ct = +8°. El Rv es…",["365°","005°","349°","355°"],1,"Si pasa de 360°, se restan 360°."],
["carta","Rv medido 215°, dm 1° NW y Δ 5° W. El Ra es…",["209°","221°","215°","216°"],1,"Ct = −6°; Ra = Rv − Ct = 215° + 6°."],
["carta","Distancia 16,2 millas a 8,1 nudos, salida HRB 10:00. La llegada es a las…",["11:00","12:00","12:30","13:00"],1,"t = 16,2 / 8,1 = 2 h."],
["carta","Al leer la latitud con el transportador, este debe estar…",["Girado 45°","Perfectamente orientado al norte","Sobre el faro siempre","En la escala de longitudes"],1,"Alguna línea paralela a un meridiano o paralelo."],
["carta","En la escala de una carta, cada celda pequeña de un minuto se divide en cinco partes de…",["0,1′","0,2′","0,5′","1″"],1,"Las fracciones van en décimas, no en segundos."],
["carta","En una carta del hemisferio norte, la escala de latitudes crece…",["De arriba abajo","De abajo arriba","De izquierda a derecha","No cambia"],1,"Pregunta real (2021)."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
