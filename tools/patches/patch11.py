import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

IMPORT=r'''["importancia","El tiempo y la seguridad: cómo obtener el parte",`
<p>El viento es la <b>causa fundamental del mal tiempo</b> en la mar: según su fuerza, levanta el oleaje que afecta a la estabilidad del barco y a la tripulación (junto con otros factores, como las corrientes). Hoy, estudiando antes la situación, una navegación puede ser razonablemente segura si no dura más de <b>48–72 horas</b>, el horizonte de las previsiones fiables a corto plazo. Zarpar sin conocer la previsión, o sin instrumentos adecuados, puede tener consecuencias muy graves: hay que <b>leerla cada día antes de salir</b>.</p>
<ul>
<li><b>Clubes náuticos y puertos deportivos</b>: tienen los partes locales.</li>
<li><b>VHF</b>: Salvamento Marítimo emite los partes costeros de AEMET a horas fijas; se anuncian por el <b>canal 16</b> y luego se pasa al canal de trabajo que indiquen.</li>
<li><b>Televisión e internet</b>: en la web de AEMET, <i>El tiempo → Predicción → Marítima</i>, eliges tu zona del litoral y lees el parte de aguas costeras y alta mar a 72 horas. Desde ahí, los <i>enlaces asociados</i> llevan a los modelos de viento y oleaje de <b>Puertos del Estado</b>, con mapas en color (azul, poca intensidad; rojo y negro, la mayor) y datos en tiempo real de viento, corrientes y oleaje.</li>
<li><b>Mapas isobáricos</b>: en AEMET, <i>Predicción → Modelos numéricos</i>, con previsión a 72 h, actualizados cada 6 horas.</li>
</ul>
<p class="small">Un parte costero suele traer, por este orden: <b>avisos</b> (si los hay), la <b>situación general</b> (bajas y altas con su presión y evolución) y la <b>predicción por zonas</b> (dirección y fuerza del viento, estado de la mar, mar de fondo, visibilidad y chubascos).</p>`],
'''
rep('["presion","Presión atmosférica e isobaras",`',IMPORT+'["presion","Presión atmosférica e isobaras",`')

rep('''<li><span class="es">Isobaras</span>: líneas que unen puntos de igual presión. <b>Cuanto más juntas, más viento</b> (mayor gradiente).</li>
</ul>''','''<li><span class="es">Isobaras</span>: líneas que unen puntos de igual presión. <b>Cuanto más juntas, más viento</b> (mayor gradiente).</li>
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
</ul>''')

rep('''<div class="panel"><h4>Borrasca · baja presión</h4><p>Aire que <b>converge y asciende</b>''','''<div class="panel"><h4>Borrasca · baja presión</h4><p>También <b>depresión</b> o ciclón extratropical: isobaras cerradas con la presión <b>disminuyendo hacia el centro</b>. «B» en los mapas («L», <i>low</i>, en inglés). Se forma cuando el aire se calienta, se aligera y sube. Viento a unos <b>10–30°</b> de las isobaras, hacia el centro. Aire que <b>converge y asciende</b>''')
rep('''<div class="panel"><h4>Anticiclón · alta presión</h4><p>Aire que <b>desciende y diverge</b>''','''<div class="panel"><h4>Anticiclón · alta presión</h4><p>Isobaras cerradas con la presión <b>aumentando hacia el centro</b>. «A» («H», <i>high</i>). El aire se hace más pesado y baja. Viento a 10–30° de las isobaras, alejándose del centro. Aire que <b>desciende y diverge</b>''')
rep('''<li><b>Frente frío</b>:''','''<li><b>Trayectorias</b>: en el hemisferio norte, las borrascas se desplazan de <b>oeste a este</b>, cargándose de humedad al cruzar el Atlántico (otras masas de aire pueden desviarlas). Los anticiclones se mueven muy despacio, casi fijos en zonas concretas, y toman su nombre: el <b>anticiclón de las Azores</b>.</li>
<li><b>Por qué sopla el viento</b>: el aire calentado por el Sol se dilata, pierde densidad y sube; el aire va siempre de las <b>altas a las bajas</b> presiones, desviado por la rotación de la Tierra y el rozamiento con la superficie. En el Ecuador el aire sube y va hacia los polos, y lo sustituye aire polar: esta circulación general, con la rotación terrestre, fija los vientos dominantes del planeta.</li>
<li><b>Frente frío</b>:''')

rep('''<li><span class="es">Rolar</span>: cambiar de dirección. <span class="es">Refrescar</span>: aumentar. <span class="es">Amainar / calmar</span>: disminuir. <span class="es">Racha</span>: aumento brusco y breve. <span class="es">Chubasco</span>: precipitación intensa y breve con viento.</li>
<li>Instrumentos: <b>anemómetro</b> (velocidad), <b>veleta</b> (dirección). A bordo se mide el <i>viento aparente</i>, combinación del real y el de la marcha.</li>''',
'''<li><span class="es">Rolar</span>: cambiar de dirección. <span class="es">Refrescar</span>: aumentar la fuerza. <span class="es">Calmar</span>: disminuir la fuerza del viento o de la mar, total o parcialmente. <span class="es">Caer</span>: disminución progresiva del viento. <span class="es">Racha</span>: aumento de fuerza durante un intervalo corto. <span class="es">Contraste</span>: cambio repentino a la dirección opuesta o casi. <span class="es">Recalmada</span>: bajada repentina y momentánea, que luego vuelve a la fuerza anterior. <span class="es">Chubasco</span>: precipitación intensa y breve con viento.</li>
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
<li>La escala <b>Beaufort</b> divide el viento en <b>13 fuerzas (0 a 12)</b>. Es útil porque los anemómetros dan nudos y los partes, fuerzas. Nació en la época de la navegación a vela, describiendo cómo se comportaba un navío en cada fuerza. El manual indica que la tabla completa <b>no es necesario estudiarla</b>.</li>''')

rep('''<p>Las olas dependen de la <b>fuerza</b> del viento, del tiempo que sopla (<b>duración</b>) y de la distancia de mar libre sobre la que sopla (<b>fetch</b>).''',
'''<p class="small">Escala <b>Douglas</b>: ideada por el vicealmirante Douglas y adoptada internacionalmente; 10 grados (0 a 9) del estado de la mar y la altura de ola. Tampoco hace falta estudiar la tabla completa. El manual da 0–0,2 m para rizada y 0,2–0,5 m para marejadilla; la tabla de arriba usa los límites de la OMM (0,1 m).</p>
<p>La altura de ola no depende solo de la fuerza del viento. Las tres variables son: <b>intensidad</b>, <b>persistencia</b> (el número de horas que ha soplado con la misma dirección e intensidad: la mar necesita tiempo para crecer) y <b>fetch</b> (la extensión de mar sobre la que sopla con la misma dirección e intensidad, medida en esa dirección en km o millas).''')

rep('''<div class="widget"><div class="eyebrow">Interactivo · brisas costeras</div>''','''<p><b>Brisas costeras</b>: vientos flojos que aparecen en la costa cuando no hay gradiente de presión, es decir, sin viento general. <b>Terral</b>: de noche, la tierra se enfría antes que el mar; sobre el mar queda una baja relativa, el aire cálido sube y lo sustituye el aire frío de tierra: sopla de <b>tierra al mar</b>, y se nota hasta unas <b>20 millas</b> mar adentro. <b>Virazón</b>: de día, la tierra se calienta antes; sopla del <b>mar a tierra</b> y llega hasta unos <b>50 km</b> tierra adentro. Entre uno y otro hay calmas, cuando tierra y mar están a la misma temperatura.</p>
<div class="widget"><div class="eyebrow">Interactivo · brisas costeras</div>''')

rep('''  const br=$("#brSvg",root);''','''  {const T=$("#awT",root),A=$("#awA",root),B=$("#awB",root),S=$("#awSvg",root);
   const up=()=>{const t=+T.value,a=+A.value,b=+B.value;$("#awTv",root).textContent=t;$("#awTa",root).textContent=a;$("#awBv",root).textContent=b;
     /* wind vectors pointing where air goes; boat heads up (north). true wind FROM angle a (clockwise from bow, starboard side) */
     const tr=a*Math.PI/180;const tx=-t*Math.sin(tr),ty=t*Math.cos(tr);/* going-to vector in screen coords (y down = astern) */
     const mx=0,my=b;const ax=tx+mx,ay=ty+my;const av=Math.hypot(ax,ay);let aa=av?Math.atan2(-ax,ay)*180/Math.PI:0;aa=Math.abs(aa);
     const k=5,c=150;const L=(x,y,col,lab,ox,oy)=>`<line x1="${c-x*k}" y1="${c-y*k}" x2="${c}" y2="${c}" stroke="${col}" stroke-width="4" marker-end="url(#aw${col.length})"/><text x="${c-x*k+ox}" y="${c-y*k+oy}" font-size="11" font-weight="700" fill="${col}">${lab}</text>`;
     S.innerHTML=`<defs>${AR("aw"+"var(--sea)".length,"var(--sea)")}${AR("aw"+"var(--accent)".length,"var(--accent)")}${AR("aw"+"#7a5cff".length,"#7a5cff")}</defs><rect width="300" height="300" fill="var(--water)" rx="10"/>${boatTop(c,c+40,60,0)}`+
       L(tx,ty,"var(--sea)","real",-10,-6)+L(mx,my,"#7a5cff","marcha",6,-4)+L(ax,ay,"var(--accent)","aparente",6,14);
     $("#awTxt",root).innerHTML=av<0.5?"Sin viento aparente.":`Aparente: <b>${av.toFixed(1)} nudos</b> desde <b>${aa.toFixed(0)}°</b> de la proa${b>0&&t>0&&a>0&&a<180?" (más a proa que el real)":""}.`};
   [T,A,B].forEach(x=>x.addEventListener("input",up));up();}
  const br=$("#brSvg",root);''')

QS=r'''PER.Q.push(
/* ---- 9 Meteorología (manual propio, tema 9) ---- */
["meteo","La causa fundamental del mal tiempo en la mar es…",["La temperatura","El viento","La humedad","La presión"],1,"Levanta el oleaje que afecta al barco y a la tripulación."],
["meteo","Según el manual, una navegación puede considerarse razonablemente segura, estudiando antes el tiempo, si no supera unas…",["6 horas","48–72 horas","7 días","15 días"],1,"Es el horizonte de las previsiones fiables a corto plazo."],
["meteo","Los partes meteorológicos por VHF se anuncian por el canal…",["9","16","70","72"],1,"Después se pasa al canal de trabajo indicado."],
["meteo","En la web de AEMET, los mapas isobáricos de previsión se actualizan cada…",["Hora","3 horas","6 horas","24 horas"],2,"Con previsión a 72 horas."],
["meteo","Los modelos de viento y oleaje enlazados desde AEMET son de…",["Salvamento Marítimo","Puertos del Estado","La OMI","Capitanía"],1,"Con datos en tiempo real de viento, corrientes y oleaje."],
["meteo","La presión atmosférica es…",["La temperatura del aire","El peso por unidad de superficie de la columna de aire sobre un lugar","La humedad del aire","La velocidad del viento"],1,"Por la atracción terrestre sobre la masa de aire."],
["meteo","La medida de la presión en milímetros de mercurio procede del experimento de…",["Pascal","Torricelli","Beaufort","Celsius"],1,"En 1643."],
["meteo","La baria es la unidad de presión del sistema…",["Internacional","Cegesimal (CGS)","Inglés","Náutico"],1,"Una dina sobre un centímetro cuadrado."],
["meteo","La unidad de presión del Sistema Internacional es el…",["Milibar","Pascal","Bar","Torr"],1,"1 newton sobre 1 m²."],
["meteo","Un hectopascal equivale a…",["10 pascales","Un milibar","Una atmósfera","1 mm de mercurio"],1,"1 hPa = 100 Pa = 1 mb."],
["meteo","Un pascal equivale a…",["1 baria","10 barias","100 barias","1 milibar"],1,"Según el manual."],
["meteo","El valor normal de la presión al nivel del mar es…",["1000 hPa","760 mm = 1013,25 hPa = 1 atmósfera","1020 mb","750 mm"],1,"A 0 °C y 45° de latitud."],
["meteo","El barómetro más usado en náutica es el…",["De mercurio","Aneroide","Digital de pared","Barógrafo"],1,"Por su lectura fácil y su robustez."],
["meteo","El barómetro aneroide funciona mediante…",["Una columna de mercurio","Cápsulas metálicas onduladas con vacío parcial","Un gas que se dilata","Un muelle de agua"],1,"Se contraen o expanden y mueven la aguja."],
["meteo","Para el navegante, lo más importante del barómetro es…",["El valor exacto","Su variación en un periodo de tiempo","La marca","El color de la aguja"],1,"La tendencia."],
["meteo","Una subida lenta y suave del barómetro indica…",["Temporal","Tendencia a la mejoría","Vientos fuertes","Niebla"],1,"Una subida brusca: mejoría pero con vientos fuertes."],
["meteo","Una bajada brusca y rápida del barómetro indica…",["Mejoría","Empeoramiento con vientos fuertes, precipitaciones y riesgo de temporal","Calma","Niebla de radiación"],1,"Una bajada lenta: tendencia al empeoramiento."],
["meteo","Una subida brusca y rápida del barómetro indica…",["Mejoría sin viento","Mejoría pero con vientos fuertes","Empeoramiento","Calma chicha"],1,"Por el gradiente existente."],
["meteo","Según el manual, una oscilación es suave y lenta cuando en una hora no supera…",["0,5 mb","1,3 mb","2 mb","5 mb"],1,"Es grande cuando llega a 2 mb en una hora."],
["meteo","El gradiente de presión es…",["La temperatura del aire","La diferencia de presión entre dos puntos al mismo nivel","La altura de las olas","El viento aparente"],1,"Pregunta real (julio 2026)."],
["meteo","En la atmósfera, a mayor altura…",["Mayor temperatura","Menor temperatura","Igual temperatura","Más presión"],1,"La atmósfera se calienta con el calor que devuelve la Tierra."],
["meteo","La variación de la temperatura en un intervalo de altura se llama…",["Gradiente de presión","Gradiente térmico","Persistencia","Fetch"],1,"Gradiente térmico."],
["meteo","La temperatura máxima del día se alcanza…",["Al mediodía solar","Entre 2 y 3 horas después de pasar el Sol por el meridiano","Al ponerse el Sol","A medianoche"],1,"La mínima, una media hora después de salir el Sol."],
["meteo","Las oscilaciones de temperatura son menores en las zonas marítimas porque…",["Hay más viento","El agua gana y pierde calor muy lentamente","Hay más nubes","La presión es mayor"],1,"La tierra se calienta y se enfría mucho más deprisa."],
["meteo","La temperatura media de un día es…",["La máxima","La semisuma de la máxima y la mínima","La de mediodía","La mínima más 10"],1,"Igual para la media anual."],
["meteo","En la escala centígrada, el 0 corresponde a…",["La ebullición del agua","La fusión del hielo (congelación del agua)","El cero absoluto","37 °C"],1,"Y 100 a la ebullición."],
["meteo","En una borrasca, la presión…",["Aumenta hacia el centro","Disminuye conforme nos acercamos al centro","Es constante","Solo cambia de noche"],1,"Pregunta real (2024)."],
["meteo","En los mapas ingleses, una baja presión se indica con…",["H","L","A","B"],1,"Low; en español, B."],
["meteo","Las bajas presiones se forman cuando el aire…",["Se enfría y desciende","Se calienta, se aligera y asciende","Se seca","Se para"],1,"Los anticiclones, cuando se hace más pesado y desciende."],
["meteo","En una borrasca del hemisferio norte, el viento gira…",["En el sentido de las agujas del reloj","En sentido contrario a las agujas del reloj, hacia el centro","Alejándose del centro","Sin dirección fija"],1,"A unos 10–30° de las isobaras."],
["meteo","El viento forma con las isobaras un ángulo de unos…",["0°","10–30°","45–60°","90°"],1,"Hacia el centro en las bajas; hacia fuera en las altas."],
["meteo","En el hemisferio norte, las borrascas se desplazan generalmente…",["De este a oeste","De oeste a este","De sur a norte","No se mueven"],1,"Cargándose de humedad en el Atlántico."],
["meteo","El anticiclón de las Azores es un ejemplo de que los anticiclones…",["Se mueven muy rápido","Son casi estacionarios y toman el nombre de su zona","Solo existen en invierno","Son bajas presiones"],1,"Se mueven muy lentamente."],
["meteo","El viento se desplaza…",["De las bajas a las altas presiones","De las altas a las bajas presiones","Siempre del norte","Siempre hacia el Ecuador"],1,"Desviado por la rotación terrestre y el rozamiento."],
["meteo","El cambio repentino del viento a la dirección opuesta o casi opuesta se llama…",["Recalmada","Contraste","Rolada","Racha"],1,"Contraste."],
["meteo","La disminución repentina y momentánea del viento que luego vuelve a su fuerza anterior es una…",["Calmada","Recalmada","Racha","Caída"],1,"Recalmada."],
["meteo","«Caer» el viento significa…",["Aumentar","Disminuir progresivamente","Cambiar de dirección","Soplar a rachas"],1,"Calmar: disminuir total o parcialmente."],
["meteo","El instrumento que mide la intensidad del viento es el…",["Barómetro","Anemómetro","Higrómetro","Catavientos"],1,"La veleta da la dirección."],
["meteo","Una lanita fijada al obenque de un velero es un…",["Anemómetro","Catavientos","Barógrafo","Pluviómetro"],1,"Indica la dirección del viento respecto a la crujía (el aparente)."],
["meteo","El viento real se mide…",["Navegando a toda máquina","Con el barco parado","Con viento de popa","De noche"],1,"Navegando se mide el aparente."],
["meteo","El viento de la marcha o relativo tiene siempre…",["La dirección del viento real","Dirección opuesta al rumbo e intensidad igual a la velocidad del barco","Dirección norte","Intensidad nula"],1,"Lo provoca el propio barco al avanzar."],
["meteo","El viento aparente es…",["El viento real","La suma vectorial del viento real y el de la marcha","El viento de la marcha","El que da el parte"],1,"Es el que medimos navegando."],
["meteo","Con viento real por el través, el viento aparente…",["Entra más a popa","Entra más a proa que el real","Coincide con el real","Desaparece"],1,"Pregunta real (julio 2023)."],
["meteo","¿Cuántas fuerzas tiene la escala Beaufort?",["10","12","13 (de 0 a 12)","9"],2,"Del 0 al 12."],
["meteo","La utilidad de la escala Beaufort a bordo es…",["Medir la presión","Relacionar los nudos del anemómetro con las fuerzas de los partes","Medir las olas","Calcular la marea"],1,"Y decidir la superficie vélica."],
["meteo","La escala Douglas describe…",["La fuerza del viento","El estado de la mar y la altura de las olas","La presión","La visibilidad"],1,"10 grados, del 0 al 9."],
["meteo","Las brisas costeras aparecen cuando…",["Hay un temporal","No hay gradiente de presión (no hay viento general)","Pasa un frente","Hay niebla"],1,"Terral de noche y virazón de día."],
["meteo","El terral se nota hasta unas…",["2 millas","20 millas mar adentro","100 millas","50 km tierra adentro"],1,"La virazón llega hasta unos 50 km tierra adentro."],
["meteo","El terral se produce porque de noche…",["La tierra se calienta más que el mar","La tierra se enfría más deprisa que el mar","Sube la marea","Baja la presión en tierra"],1,"Sobre el mar queda una baja relativa."],
["meteo","Las variables que determinan la altura de la ola son…",["Temperatura, presión y humedad","Intensidad del viento, persistencia y fetch","Marea, corriente y luna","Profundidad y salinidad"],1,"Pregunta real (2021)."],
["meteo","El número de horas que ha soplado un viento con la misma dirección e intensidad es la…",["Fetch","Persistencia","Racha","Duración de la marea"],1,"La mar necesita tiempo para crecer."],
["meteo","La extensión sobre la que el viento sopla con la misma dirección e intensidad se llama…",["Persistencia","Fetch","Gradiente","Isobara"],1,"Se mide en esa dirección, en km o millas."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
