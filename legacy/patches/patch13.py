import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

# --- light abbreviation fix
rep('''<tr><td>Centelleo rápido</td><td>Ct</td><td>Q</td></tr>''',
'''<tr><td>Centelleante (50–60 por minuto)</td><td>Ct</td><td>Q</td></tr>
<tr><td>Centelleante rápido (100–120 por minuto)</td><td>Ct.R</td><td>VQ</td></tr>''')

# --- quadrantal courses and wind rose
rep('''<li>Notación <b>circular</b>: de 000° a 360° en sentido horario. <b>Cuadrantal</b>: desde N o S hacia E o W, de 0° a 90°, por ejemplo S 30° W = 210°.</li>''',
'''<li>Notación <b>circular</b>: de 000° a 360° en sentido horario. <b>Cuadrantal</b>: nunca pasa de 90°. Se escribe primero el punto cardinal desde el que se cuenta (<b>N o S</b>), luego los grados y por último hacia dónde va la proa (<b>E o W</b>). Ej.: 65° = N 65° E.</li>
<li>Para operar, los rumbos cuadrantales llevan signo: <b>+</b> en el 1.er (NE) y 3.er (SW) cuadrante, <b>−</b> en el 2.º (SE) y 4.º (NW).</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Cuadrante</th><th>A circular</th><th>Ejemplo</th></tr>
<tr><td>1.º · N…E (0°–90°)</td><td>el mismo valor</td><td>N 35° E = <b>035°</b></td></tr>
<tr><td>2.º · S…E (90°–180°)</td><td>180° − valor</td><td>S 50° E = <b>130°</b></td></tr>
<tr><td>3.º · S…W (180°–270°)</td><td>180° + valor</td><td>S 25° W = <b>205°</b></td></tr>
<tr><td>4.º · N…W (270°–360°)</td><td>360° − valor</td><td>N 50° W = <b>310°</b></td></tr>
</table></div>
<ul>
<li><span class="es">Rosa de los vientos</span> (rosa náutica): el horizonte dividido en grados. Nació para nombrar de dónde viene el viento, pero sirve igual para los rumbos. <b>Cardinales</b>: N 0°/360°, E 90°, S 180°, W 270°. Partiendo los cuadrantes por la mitad salen los <b>octantes</b> de 45°: NE 45°, SE 135°, SW 225°, NW 315°.</li>
<li>Partiendo otra vez (ángulos de <b>22° 30′</b>) salen NNE 22,5°, ENE 67,5°, ESE 112,5°, SSE 157,5°, SSW 202,5°, WSW 247,5°, WNW 292,5° y NNW 337,5°. Y partiendo una última vez, las <b>cuartas</b>: la rosa en <b>32</b> partes de <b>11° 15′</b> cada una.</li>''')

# --- bearings, fixes, bearing angles
rep('''<li><b>Demora opuesta</b> (la que trazas en la carta desde el faro): Dv ± 180°.</li>''',
'''<li><b>Demora opuesta</b> (la que trazas en la carta desde el faro): Dv ± 180°.</li>
<li>Como con los rumbos, hay tres demoras según el norte: <b>verdadera (Dv)</b>, <b>magnética (Dm)</b> y <b>de aguja (Da)</b>. La visual al objeto es siempre la misma; solo cambia el norte desde el que se mide. En la práctica solo se usan Dv y Da.</li>
<li>La Da se toma con el <b>compás de alidada</b>, una aguja magnética portátil (con lupa y luz fotoluminiscente para la noche). Como es una aguja, le afectan la dm y el desvío: hay que pasarla a Dv con la Ct antes de trazarla, porque todo lo que hay en la carta es «verdadero». Ejemplo del manual: Da 235°, dm 5° NW, Δ +4° → Ct −1° → <b>Dv 234°</b>.</li>
<li>Las demoras siempre van de 0° a 360°: si el cálculo da negativo, súmale 360°; si pasa de 360°, réstaselos.</li>
<li>Una demora te dice que estás <b>en algún punto de esa recta</b>; necesitas una segunda que la corte (o incluso tres simultáneas).</li>
</ul>
<div class="key"><b>Cuándo fiarte de una situación por demoras.</b> Buena visibilidad y mar razonable · tablilla de desvíos bien hecha · con dos demoras, que se corten con una abertura de entre <b>60° y 120°</b> (fuera de ese margen se agrandan los errores) · tomar <b>primero</b> la del faro cuya demora cambie <b>más despacio</b> (el más lejano o el más cercano a la proa o la popa) y enseguida la otra.</div>
<ul>
<li><span class="es">Enfilación</span>: recta que une dos marcas; estás en ella cuando las ves una detrás de otra (como las torres roja y verde de un puerto que se tapan). Más fiable cuanto más lejos estés de las marcas y más separadas estén entre sí. Su gran ventaja: el error de observación es <b>prácticamente nulo</b>.</li>
<li><span class="es">Oposición</span>: también una recta entre dos marcas, pero el barco está <b>entre</b> ellas. Mucho menos precisa. Como desde el barco las dos marcas tienen demoras que difieren 180°, hay que decir cuál se toma de referencia.</li>
<li>Una enfilación u oposición se puede trazar <b>antes</b> de llegar a ella, uniendo las marcas con la regla, y medir su Dv con el transportador. Si al pasar por ella tomas la Da con la alidada, tienes las dos y sale la corrección total: <span class="formula">Ct = Dv − Da</span>.</li>
<li><b>Distancias</b> (normalmente con radar): cada distancia es un arco de circunferencia con centro en el punto de la costa. Dos arcos se cortan en dos puntos: si ambos caen en el mar, elige el más cercano a tu situación de estima.</li>
<li><span class="es">Veril</span> o línea isobática: une puntos de igual profundidad (en la carta, líneas azules o negras con la cifra intercalada). Una demora o enfilación cortada con el veril de la sonda que lees da una situación <b>estimada</b> de cierto rigor, pero no muy fiable.</li>
<li><b>Líneas de seguridad</b>: la más fiable es la <b>enfilación</b>, pero hay pocas en la costa. Las <b>demoras</b> tienen errores de medición que el desvío puede aumentar. Las <b>sondas</b> pueden no coincidir con la carta por movimientos del fondo o cartas sin actualizar. Lo ideal: dos o tres demoras simultáneas.</li>
<li><span class="es">Marcación</span>: ángulo desde la línea de <b>crujía</b> (proa) hasta el objeto. <b>Circular</b>: de 0° a 360° en sentido horario, siempre positiva. <b>Semicircular</b>: de 0° a 180° por cada banda, <b>+ por estribor</b> y <b>− por babor</b>. <span class="formula">D = R + M</span> · <span class="formula">Dv = Rv + M</span>.</li>
<li>Ejemplo del manual: Ra 123°, dm 4° NW, Δ 8° NW → Ct −12° → Rv 111°. Pta. de Gracia 30° por babor → Dv = 111° − 30° = <b>81°</b>. Cabo Trafalgar 154° por babor → 111° − 154° = −43° + 360° = <b>317°</b>.</li>''')

rep('''<p><b>Navegación por estima</b>: desde una situación conocida, con el rumbo y la distancia navegada (D = V·t) calculas la nueva.''',
'''<p><b>Navegación por estima</b>: desde una situación conocida, con el rumbo y la distancia navegada (D = V·t) calculas la nueva. Desde el punto de salida trazas el Rv y, pasado un tiempo, la distancia recorrida sobre él; si cambias de rumbo, repites desde ahí. Se hace a intervalos de <b>una hora</b>, estimando un rumbo y una velocidad medios, y para eso cuentan mucho la atención del timonel y del navegante. En la carta, la <b>situación de estima</b> se marca con un <b>triángulo con un punto en el centro</b>.''')

# --- new section: aids to navigation
rep('''["viento","Abatimiento y corriente",`''',
'''["ayudas","Faros, luces y otras ayudas",`
<ul>
<li>Hay señales <b>diurnas, nocturnas y de niebla</b>; y, por su naturaleza, <b>visuales, sonoras, electromagnéticas o electrónicas</b>. Las luminosas son faros, <b>farolas</b> (en el extremo de los muelles), <b>buques faro</b> (frecuentes en latitudes del norte), marcas de la costa, balizas y boyas.</li>
<li>Toda luz se describe por tres cosas: <span class="es">período</span>, el tiempo tras el que una luz no fija repite sus aspectos en el mismo orden; <span class="es">fase</span>, los aspectos que toma durante ese período (un destello, un grupo de tres…); y <span class="es">color</span>: blanco, verde, rojo y amarillo los más usados. Ejemplo del manual: el faro del <b>Cabo de La Nao</b> da un destello blanco cada 5 s: período 5 s, fase un destello, color blanco.</li>
</ul>
<div class="tablewrap"><table>
<tr><th>Ritmo</th><th>Cómo es</th></tr>
<tr><td>Fija (F)</td><td>continua y uniforme</td></tr>
<tr><td>Destellos (D · Fl)</td><td>la luz dura <b>menos</b> que la oscuridad; destellos normalmente iguales</td></tr>
<tr><td>Ocultaciones (Oc)</td><td>la luz dura <b>más</b> que la oscuridad; ocultaciones normalmente iguales</td></tr>
<tr><td>Isofase (Iso)</td><td>luz y oscuridad exactamente iguales</td></tr>
<tr><td>Centelleante (Ct · Q)</td><td>50 a 60 destellos por minuto</td></tr>
<tr><td>Centelleante rápido (Ct.R · VQ)</td><td>100 a 120 destellos por minuto</td></tr>
</table></div>
<ul>
<li><span class="es">Faro de sectores</span>: da colores distintos en distintos arcos del horizonte para señalar bajos o peligros. Ejemplo: el faro de la <b>isla de Botafoch</b> (entrada de Ibiza) se ve <b>blanco</b> en aguas profundas y <b>rojo</b> si te acercas demasiado a la zona de islotes sin señalizar.</li>
<li><span class="es">Alcance geográfico</span>: la mayor distancia a la que se puede ver una luz por la <b>curvatura de la Tierra</b> y las alturas del foco y del observador. <span class="es">Alcance luminoso</span>: la distancia máxima a la que la luz se hace visible por su <b>potencia</b>, la <b>visibilidad</b> meteorológica, la duración de los destellos… Ves la luz hasta el menor de los dos.</li>
<li><b>Identificar un faro</b>: prepara antes una lista de los faros, balizas y marcas de tu derrota. Al avistarlo, mide primero el <b>período</b> (cuánto tarda en repetirse) y cuenta la fase a grandes rasgos; luego afina. No te dejes llevar por lo que «debería» ser según la estima: así se cometen errores peligrosos. Antes del GPS, las luces eran imprescindibles para situarse de noche; conviene recordarlo por si falla.</li>
<li><b>Boyas y balizas</b>: úsalas con precaución, porque el temporal puede desplazarlas o hacerlas desaparecer, salvo los <b>espeques</b>, clavados al fondo. <span class="es">Balizas fijas</span>: pilares o estacas de mampostería o metal en aguas poco profundas, para señalar canales o bajos. <span class="es">Boyas</span>: balizas flotantes, más bajas y de corto alcance; su luz suele ser de destellos.</li>
<li>Todas están en el <b>Libro de Faros y Señales de Niebla</b> del Instituto Hidrográfico de la Marina. Los ritmos de las marcas de balizamiento están en el tema 5.</li>
</ul>`],
["viento","Abatimiento y corriente",`''')

# --- tides
rep('''<li><span class="formula wrap">Sonda en el momento = sonda en la carta + altura de la marea</span>. La presión también cuenta: unos <b>1 cm por cada hPa</b> de diferencia con 1013. Presión baja, más agua.</li>''',
'''<li><span class="formula wrap">Sonda en el momento = sonda en la carta + altura de la marea</span>. La presión también cuenta: unos <b>1 cm por cada hPa</b> de diferencia con 1013. Presión baja, más agua.</li>
<li>Las mareas son el movimiento oscilatorio, diario y periódico del nivel del mar por la atracción de la <b>Luna</b> y el <b>Sol</b>. <span class="es">Nivel medio</span>: el promedio entre pleamar y bajamar. Marea <span class="es">creciente</span> (entrante, flujo): de bajamar a pleamar; <span class="es">vaciante</span> (saliente, reflujo): de pleamar a bajamar. Entre pleamar y bajamar pasan unas <b>6 h 15 min</b> (duración de la creciente o de la vaciante), aunque varía.</li>
<li><b>Por qué manda la Luna</b>: la atracción depende de la masa y de la distancia. La Luna tiene casi 27 millones de veces menos masa que el Sol, pero está unas 389 veces más cerca, y su efecto sobre las mareas es unas <b>2,17 veces</b> el del Sol. Los demás astros no cuentan.</li>
<li><span class="es">Cero hidrográfico</span> (LAT, <i>Lowest Astronomical Tide</i>): la bajamar más baja que puede predecirse en condiciones meteorológicas medias. También se llama <b>bajamar escorada</b> o <b>Datum</b>. Es la referencia de las sondas de la carta, así que el agua real casi siempre es la de la carta o más. Para calcularlo, la Organización Hidrográfica Internacional usa una predicción de 19 años.</li>
<li><span class="es">Altura de la marea</span>: lo que sube el agua sobre el Datum en un momento dado. <span class="es">Amplitud</span>: diferencia, en metros, entre la bajamar y la pleamar más próximas. <span class="es">Duración</span>: tiempo entre una bajamar y la pleamar (o al revés).</li>
<li><span class="es">Anuario de Mareas</span> (Instituto Hidrográfico de la Marina, cada año): hora y altura de cada pleamar y bajamar de todos los días para los puertos de la península, Canarias, Ceuta y algunos de África occidental, Lisboa, Gibraltar y la Antártida. Las horas van en <b>GMT</b> (huso 0): para la hora del reloj suma el adelanto vigente, <b>+1 en invierno y +2 en verano</b>. Las alturas, en metros al centímetro y sobre el Datum: se suman a la sonda de la carta.</li>
<li><b>Lo que el Anuario no prevé</b>: con presión <b>alta</b>, las alturas son <b>menores</b>; con presión <b>baja</b>, mayores. Su tabla de corrección va de <b>−0,25 m a 1038 mb</b> a <b>+0,50 m a 963 mb</b>. El viento también influye: <b>de mar</b> sube la altura y adelanta la pleamar; <b>de tierra</b> la baja y la retrasa. Para el viento no hay tablas.</li>
</ul>
<div class="widget"><div class="eyebrow">Interactivo · sonda con el Anuario y la presión</div>
<label class="small">Sonda de la carta: <b id="mzCV"></b></label><input type="range" id="mzC" min="0" max="150" value="62">
<label class="small">Altura de marea del Anuario: <b id="mzAV"></b></label><input type="range" id="mzA" min="0" max="400" value="231">
<label class="small">Presión: <b id="mzPV"></b></label><input type="range" id="mzP" min="963" max="1038" value="1003">
<div class="steps" id="mzSteps"></div></div>
<ul>''')

# --- chapter 11: new worked-examples section
rep('''["tipos","Los ejercicios del examen",`''',
'''["situar","Situarse y mareas paso a paso (ejemplos del manual)",`
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
["tipos","Los ejercicios del examen",`''')

# --- widget code for tide calculator
rep('''  {const a=$("#kDv",root),b=$("#kDc",root);''',
'''  {const C=$("#mzC",root),A=$("#mzA",root),P=$("#mzP",root);const f=v=>v.toFixed(2).replace(".",",");
   const up=()=>{const c=C.value/10,a=A.value/100,p=+P.value,k=(1013-p)/100,h=a+k;$("#mzCV",root).textContent=c.toFixed(1).replace(".",",")+" m";$("#mzAV",root).textContent=f(a)+" m";$("#mzPV",root).textContent=p+" hPa";
     $("#mzSteps",root).innerHTML=`<div>1. Corrección por presión: (1013 − ${p}) cm = <b>${k>=0?"+":"−"}${f(Math.abs(k))} m</b></div><div>2. Altura corregida: ${f(a)} ${k>=0?"+":"−"} ${f(Math.abs(k))} = ${f(h)} m</div><div>3. Sonda: ${c.toFixed(1).replace(".",",")} + ${f(h)} = <b>${f(c+h)} m</b></div>`};
   [C,A,P].forEach(e=>e.addEventListener("input",up));up();}
  {const a=$("#kDv",root),b=$("#kDc",root);''')

QS=r'''PER.Q.push(
["teoria","Un rumbo de 65° expresado en cuadrantal es…",["S 65° E","N 65° E","N 25° E","E 65° N"],1,"Primero N o S, luego los grados y luego E o W."],
["teoria","En el sistema cuadrantal los rumbos van de…",["0° a 360°","0° a 180°","0° a 90°","0° a 45°"],2,"Se cuentan desde el N o el S hacia el E o el W."],
["teoria","S 50° E en circular es…",["050°","130°","230°","310°"],1,"2.º cuadrante: 180° − 50°."],
["teoria","S 25° W en circular es…",["205°","155°","245°","335°"],0,"3.er cuadrante: 180° + 25°."],
["teoria","N 50° W en circular es…",["050°","130°","230°","310°"],3,"4.º cuadrante: 360° − 50°."],
["teoria","Para operar, tienen signo negativo los rumbos cuadrantales del…",["1.º y 3.er cuadrante","2.º y 4.º cuadrante","1.º y 2.º cuadrante","3.º y 4.º cuadrante"],1,"Positivos: 1.º y 3.º."],
["teoria","El rumbo SW en circular vale…",["135°","225°","247,5°","315°"],1,"NE 45°, SE 135°, SW 225°, NW 315°."],
["teoria","Una cuarta vale…",["22° 30′","11° 15′","45°","5° 37′"],1,"La rosa dividida en 32 partes."],
["teoria","El rumbo ENE vale…",["22,5°","67,5°","112,5°","45°"],1,"A medio camino entre NE (45°) y E (90°)."],
["teoria","La rosa de los vientos nació para…",["Medir la profundidad","Designar la procedencia del viento","Medir la velocidad","Calcular mareas"],1,"Luego se aplicó también a los rumbos."],
["teoria","La demora es el ángulo entre…",["La proa y el objeto","El meridiano del lugar (norte) y la visual al objeto","Dos faros","El rumbo y el viento"],1,"La marcación se mide desde la proa."],
["teoria","Las demoras se toman normalmente con…",["El sextante","El compás de alidada","La corredera","La sonda"],1,"Una aguja portátil: da demoras de aguja (Da)."],
["teoria","Calcula la Dv con Da 235°, dm 5° NW y Δ +4°.",["236°","234°","244°","226°"],1,"Ct = −5° + 4° = −1°."],
["teoria","Con dos demoras, para que la situación sea fiable deben cortarse con una abertura de…",["0° a 30°","60° a 120°","150° a 180°","Cualquiera"],1,"Fuera de ese margen se agrandan los errores."],
["teoria","Al tomar dos demoras, se toma primero la del faro cuya demora…",["Cambia más deprisa","Cambia más despacio","Está más cerca","Es mayor"],1,"Así se reduce el desfase entre una y otra observación."],
["teoria","Una situación por demoras es fiable cuando, entre otras cosas…",["La tablilla de desvíos está bien hecha","Hay niebla","La mar es gruesa","Solo hay una demora"],0,"Y con buena visibilidad y mar razonable."],
["teoria","En una oposición, el observador está…",["Detrás de las dos marcas","Entre las dos marcas","Muy lejos de ambas","En una de ellas"],1,"En la enfilación las ve una detrás de otra."],
["teoria","Comparada con la enfilación, la oposición es…",["Más precisa","Mucho menos precisa","Igual de precisa","No es línea de posición"],1,"El manual la considera mucho menos precisa."],
["teoria","Una enfilación es más fiable si…",["Estamos muy cerca de las marcas","Estamos alejados y las marcas están algo separadas entre sí","Las marcas están juntas","Es de noche"],1,""],
["teoria","Desde una oposición, las demoras a las dos marcas se diferencian…",["90°","180°","0°","45°"],1,"Hay que decir cuál se toma como referencia."],
["teoria","La corrección total en una enfilación se calcula como…",["Ct = Da − Dv","Ct = Dv − Da","Ct = Dv + Da","Ct = Rv − Ra"],1,"Dv de la carta, Da de la alidada."],
["teoria","La línea de posición con menor error de observación es la…",["Demora","Enfilación","Sonda","Distancia por radar"],1,"Su error es prácticamente nulo."],
["teoria","Las sondas como línea de posición pueden fallar porque…",["El agua cambia de color","Los fondos se mueven o la carta no está actualizada","El compás se desvía","La marea no existe"],1,""],
["teoria","Situándonos por dos distancias, si los dos cortes de los arcos caen en el mar elegimos…",["El más al norte","El más cercano a la situación de estima","El más alejado de la costa","Cualquiera"],1,""],
["teoria","Las distancias a la costa para situarse se obtienen normalmente con…",["La corredera","El radar","La alidada","El barómetro"],1,"Y se trazan como arcos de circunferencia."],
["teoria","La situación por una demora y un veril es…",["Muy fiable","Una situación estimada de cierto rigor, poco fiable","Imposible","Siempre exacta"],1,"Útil a falta de otras referencias."],
["teoria","La marcación es el ángulo entre…",["El norte y el objeto","La línea de crujía (proa) y el objeto","Dos faros","El meridiano y la proa"],1,""],
["teoria","En la marcación semicircular, por babor el signo es…",["+","−","Depende del rumbo","No lleva signo"],1,"Estribor +, babor −."],
["teoria","La marcación circular se cuenta…",["De 0° a 180° por cada banda","De 0° a 360° en sentido horario, siempre positiva","Desde el norte","Desde la popa"],1,""],
["teoria","Navegando a Rv 111°, marcas un faro 30° por babor. Su Dv es…",["141°","081°","030°","261°"],1,"Dv = Rv + M = 111° − 30°."],
["teoria","Navegando a Rv 111°, marcas un faro 154° por babor. Su Dv es…",["265°","317°","043°","223°"],1,"111° − 154° = −43° + 360°."],
["teoria","La situación de estima se representa en la carta con…",["Un círculo","Un triángulo con un punto en el centro","Una cruz","Un cuadrado"],1,""],
["teoria","En navegación por estima, la operación se repite a intervalos de…",["Un minuto","Una hora","Un día","Una guardia de 4 h"],1,"Y siempre que se cambie de rumbo."],
["teoria","El período de una luz es…",["Su color","El tiempo tras el que repite sus aspectos en el mismo orden","Su alcance","El número de destellos"],1,""],
["teoria","El faro del Cabo de La Nao da un destello blanco cada 5 s. Su fase es…",["5 segundos","Un destello","Blanca","Fija"],1,"Período 5 s; color blanco."],
["teoria","El alcance geográfico de una luz depende de…",["Su potencia","La curvatura de la Tierra y las alturas del foco y del observador","La visibilidad","El color"],1,"El luminoso depende de la potencia y la visibilidad."],
["teoria","El alcance luminoso de una luz depende de…",["Solo de su altura","Su potencia, la visibilidad meteorológica y la duración de los destellos","La curvatura terrestre","La altura del observador"],1,""],
["teoria","Un faro de sectores sirve para…",["Indicar el norte","Señalar bajos o peligros con colores distintos según el arco","Dar la hora","Marcar la marea"],1,"Como el de Botafoch en Ibiza."],
["teoria","Al identificar un faro, lo primero es observar…",["Su color","Su período","Su altura","Su forma"],1,"Luego se afina la fase."],
["teoria","Las boyas hay que usarlas con precaución porque…",["Brillan poco","Pueden desplazarse o desaparecer con los temporales","Cambian de color","Son caras"],1,"Salvo los espeques, clavados al fondo."],
["teoria","Las balizas fijas son…",["Boyas flotantes","Pilares o estacas en aguas poco profundas que señalan canales o bajos","Buques faro","Luces de los barcos"],1,""],
["teoria","Las farolas están normalmente en…",["Lo alto de los acantilados","Los extremos de los muelles","Mar abierto","Los buques"],1,""],
["teoria","La causa principal de las mareas es la atracción de…",["El Sol","La Luna","Los planetas","El viento"],1,"La de la Luna es unas 2,17 veces la del Sol."],
["teoria","La Luna influye más que el Sol en las mareas porque…",["Tiene más masa","Está mucho más cerca de la Tierra","Brilla menos","Gira más rápido"],1,"Masa casi 27 millones de veces menor, pero 389 veces más cerca."],
["teoria","El tiempo entre una pleamar y la bajamar siguiente es de unas…",["12 h","6 h 15 min","3 h","24 h"],1,"Duración de la vaciante."],
["teoria","La marea creciente también se llama…",["Reflujo","Flujo o entrante","Vaciante","Repunte"],1,"La vaciante: saliente o reflujo."],
["teoria","El cero hidrográfico o LAT es…",["El nivel medio","La bajamar más baja que puede predecirse en condiciones meteorológicas medias","La pleamar máxima","El nivel del mar en Greenwich"],1,"También se llama bajamar escorada o Datum."],
["teoria","Las sondas de las cartas españolas están referidas a…",["La pleamar","El nivel medio","El cero hidrográfico (bajamar escorada)","La superficie del agua en el momento"],2,""],
["teoria","Las horas del Anuario de Mareas están en…",["Hora oficial","GMT (huso 0)","Hora solar","Hora de verano"],1,"Para la hora del reloj, sumar el adelanto vigente (+1 o +2)."],
["teoria","Con una presión atmosférica alta, las alturas reales de la marea serán…",["Mayores que en el Anuario","Menores que en el Anuario","Iguales","Nulas"],1,"Con presión baja, mayores."],
["teoria","Con viento de mar (de fuera), la marea…",["Baja y se retrasa","Sube y se adelanta la pleamar","No cambia","Se invierte"],1,"De tierra, al revés."],
["teoria","La tabla de corrección por presión del Anuario va aproximadamente de…",["−0,25 m a 1038 mb a +0,50 m a 963 mb","+1 m a −1 m","0 a 10 cm","−0,50 m a +0,25 m"],0,""],
["teoria","El Anuario de Mareas lo publica…",["AEMET","El Instituto Hidrográfico de la Marina","Salvamento Marítimo","Puertos del Estado"],1,"Cada año."],
["carta","Ra 032°, Ct −7°. El Rv es…",["039°","025°","032°","018°"],1,"Rv = Ra + Ct."],
["carta","Da Tarifa 296°, Ct −5°. La Dv que se traza es…",["301°","291°","111°","296°"],1,"Desde el faro, hacia el mar."],
["carta","Dv medida de una oposición 350°, Da N 05° W. La Ct es…",["+5°","−5°","−15°","+15°"],1,"N 05° W = 355°; Ct = 350° − 355°."],
["carta","Dv de la enfilación en la carta 244°, Da 251°. La Ct es…",["+7°","−7°","−3°","+3°"],1,"Ct = Dv − Da."],
["carta","Estás al W verdadero de un faro y a 5 millas. Para situarte trazas desde el faro…",["El 090° y 5 millas","El 270° y 5 millas","El 180° y 5 millas","El 000° y 5 millas"],1,"Si estás al W del faro, desde el faro trazas hacia el W."],
["carta","Sonda en la carta 6,2 m y altura de marea corregida 2,41 m. La sonda real es…",["3,79 m","8,61 m","6,20 m","2,41 m"],1,"Se suman."],
["carta","Con 1003 hPa, la corrección por presión a la altura de la marea es de unos…",["−0,10 m","+0,10 m","+1,0 m","0"],1,"10 hPa por debajo de 1013: +10 cm."],
["carta","Una dm de 2° 50′ W en 2005 con variación anual de 7′ E vale en 2015…",["4° 00′ W","1° 30′ W (redondeada)","2° 50′ W","1° 10′ E"],1,"−2° 50′ + 1° 10′ = −1° 40′ ≈ 1° 30′ W."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
