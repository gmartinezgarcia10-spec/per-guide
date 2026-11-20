import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

rep('<tr><td class="es">Visibilidad reducida</td><td>Por niebla, bruma, nieve, chubascos o arena.</td></tr>',
'''<tr><td class="es">Visibilidad reducida</td><td>Por niebla, bruma, nieve, chubascos o arena.</td></tr>
<tr><td class="es">Buque</td><td>Toda embarcación usada o utilizable para transportarse sobre el agua, <b>incluidas</b> las sin desplazamiento (aerodeslizadores), las naves de vuelo rasante y los hidroaviones.</td></tr>
<tr><td class="es">Hidroavión · nave de vuelo rasante</td><td>Aeronave proyectada para maniobrar sobre el agua · nave multimodal que en su modo principal vuela muy cerca de la superficie (WIG).</td></tr>
<tr><td class="es">Eslora y manga</td><td>Eslora total y manga máxima.</td></tr>
<tr><td class="es">A la vista</td><td>Solo cuando uno puede ser <b>observado visualmente</b> desde el otro (no por radar).</td></tr>''')
rep('<tr><td class="es">Maniobrabilidad restringida</td><td>Por la naturaleza de su trabajo: dragado, cables, buceo, aprovisionamiento en navegación, remolque que le impide apartarse, limpieza de minas.</td></tr>',
'<tr><td class="es">Maniobrabilidad restringida</td><td>Por la naturaleza de su trabajo: colocar o recoger balizas, cables o conductos; dragados, trabajos hidrográficos, oceanográficos o submarinos; transbordar combustible, carga, provisiones o personas navegando; lanzar o recuperar aeronaves; limpieza de minas; remolques que le restrinjan mucho apartarse.</td></tr>')

NEW=r'''["generalidades","Reglas 1 a 10 en detalle",`
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
'''
rep('["sectores","Luces de navegación: sectores y alcances",`',NEW+'["sectores","Luces de navegación: sectores y alcances",`')

QS=r'''PER.Q.push(
/* ---- 6 RIPA (manual propio, reglas 1–25) ---- */
["ripa","El RIPA se firmó en Londres en…",["1960","1972","1977","1992"],1,"El 20 de octubre de 1972; en vigor desde el 15 de julio de 1977."],
["ripa","¿Cuántas reglas tiene el RIPA?",["25","31","37","41"],2,"37 reglas y varios anexos."],
["ripa","El RIPA se aplica…",["Solo en alta mar","En alta mar y en las aguas comunicadas con ella navegables por buques de mar","Solo en aguas territoriales","Solo a buques mercantes"],1,"Regla 1."],
["ripa","Los dispositivos de separación del tráfico los adopta…",["Cada Capitanía","La OMI","La IALA","Salvamento Marítimo"],1,"Regla 1 d)."],
["ripa","Según la regla 2, uno puede apartarse del Reglamento…",["Nunca","Para evitar un peligro inmediato","Cuando tiene preferencia","De noche"],1,"Teniendo en cuenta todas las circunstancias."],
["ripa","Para el RIPA, la palabra «buque» incluye…",["Solo los barcos con motor","También los hidroaviones, aerodeslizadores y naves de vuelo rasante","Solo los de más de 12 m","Solo los mercantes"],1,"Todo lo que se use para transportarse sobre el agua."],
["ripa","Un buque que transborda combustible navegando se considera…",["Sin gobierno","Con capacidad de maniobra restringida","Restringido por su calado","De propulsión mecánica normal"],1,"Regla 3 g)."],
["ripa","Dos buques están «a la vista» cuando…",["Se detectan por radar","Uno puede ser observado visualmente desde el otro","Se oyen","Están a menos de 2 mn"],1,"Regla 3 k)."],
["ripa","Las reglas de rumbo y gobierno de la sección I se aplican…",["Solo de día","En cualquier condición de visibilidad","Solo con niebla","Solo a la vista"],1,"Regla 4."],
["ripa","¿Cuál NO es un factor de la velocidad de seguridad?",["El estado de visibilidad","El resplandor de las luces de tierra","La densidad de tráfico","El color del casco"],3,"Regla 6."],
["ripa","Según la regla 7, deben evitarse…",["Las maniobras amplias","Las suposiciones basadas en información insuficiente, sobre todo de radar","El uso del radar","Los cambios de velocidad"],1,"Regla 7 c)."],
["ripa","Puede existir riesgo de abordaje aunque la demora cambie apreciablemente cuando…",["Es de día","Te acercas a un buque grande, un remolque o a muy corta distancia","Hay buena visibilidad","El otro es un velero"],1,"Regla 7 d) ii."],
["ripa","La eficacia de una maniobra para evitar el abordaje se comprueba hasta que…",["Se cambia de rumbo","El otro buque está pasado y en franquía","Se deja de ver","Se da la señal acústica"],1,"Regla 8 d)."],
["ripa","Si es necesario para evitar un abordaje o tener tiempo para estudiar la situación, el buque…",["Acelerará","Reducirá la velocidad o suprimirá su arrancada","Fondeará","Dará atrás siempre"],1,"Regla 8 e)."],
["ripa","En un canal angosto se navega lo más cerca posible del límite…",["De babor","De estribor","Del centro","Más profundo"],1,"Regla 9 a)."],
["ripa","En un canal angosto, ¿quién NO debe estorbar a un buque que solo puede navegar dentro?",["Solo los pesqueros","Los de menos de 20 m y los de vela","Ninguno","Los de más de 50 m"],1,"Y los pesqueros a ningún buque que navegue dentro."],
["ripa","En un canal angosto, fondear…",["Es obligatorio de noche","Debe evitarse siempre que se pueda","Está permitido en el centro","Solo a vela"],1,"Regla 9 g)."],
["ripa","Para cruzar una vía de circulación de un dispositivo de separación, el rumbo debe ser…",["Paralelo","Lo más perpendicular posible a la corriente de tráfico","A 45°","Igual al del tráfico"],1,"Regla 10 c)."],
["ripa","Para entrar en una vía de circulación por un lateral se hace…",["Perpendicular","Con el menor ángulo posible respecto a la corriente de tráfico","A 90° a estribor","Por la zona de separación"],1,"Regla 10 b) III."],
["ripa","¿Quién puede usar la zona de navegación costera aunque pueda usar la vía del dispositivo?",["Los mercantes de más de 50 m","Los de menos de 20 m, los de vela y los pesqueros","Ninguno","Los remolcadores"],1,"Regla 10 d)."],
["ripa","Se puede entrar en una zona de separación del tráfico…",["Para adelantar","En emergencia o para pescar en ella","Para fondear","Nunca"],1,"Regla 10 e)."],
["ripa","Las reglas 12 a 18 se aplican…",["En cualquier visibilidad","Solo a buques a la vista uno del otro","Solo con niebla","Solo de noche"],1,"Regla 11."],
["ripa","Para la regla 12, la banda de barlovento es…",["La que lleva cazada la mayor","La contraria a la que lleva cazada la mayor","Siempre estribor","La de la orza"],1,"Regla 12 b)."],
["ripa","Un buque alcanza a otro cuando viene desde una marcación mayor de…",["11,25° a popa del través","22,5° a popa del través","45° a proa","90°"],1,"De noche solo vería su luz de alcance."],
["ripa","Un buque que alcanza y luego cambia la marcación…",["Pasa a ser un buque que cruza","Sigue obligado a apartarse hasta estar adelantado y en franquía","Gana la preferencia","Debe parar"],1,"Regla 13 d)."],
["ripa","En vuelta encontrada, de noche se ve al otro buque…",["Solo con su luz de alcance","Con los topes enfilados y/o las dos luces de costado","Con la luz verde solamente","Con una luz amarilla"],1,"Ambos caen a estribor."],
["ripa","En un cruce, el que cede el paso, si puede, evitará…",["Reducir la velocidad","Cortar la proa del otro","Caer a estribor","Dar pitadas"],1,"Regla 15."],
["ripa","El buque con preferencia puede maniobrar…",["Nunca","En cuanto vea que el otro no actúa según el Reglamento","Siempre que quiera","Solo de día"],1,"Y debe hacerlo si la maniobra del otro ya no basta (regla 17)."],
["ripa","Un buque de motor con preferencia en un cruce que decide maniobrar evitará caer…",["A estribor","A babor por un buque que esté por su babor","Atrás","Nunca puede maniobrar"],1,"Regla 17 c)."],
["ripa","Un buque dedicado a la pesca se mantendrá, en lo posible, apartado de…",["Un velero","Un buque sin gobierno y uno de maniobra restringida","Un buque de motor","Nadie"],1,"Regla 18 c)."],
["ripa","Un hidroavión amarado…",["Tiene preferencia sobre todos","Se mantendrá alejado de todos los buques","Es un buque sin gobierno","Es un buque de vela"],1,"Si hay riesgo, cumple las reglas de esta parte."],
["ripa","Una nave de vuelo rasante que navega por la superficie se considera…",["Hidroavión","Buque de propulsión mecánica","Buque sin gobierno","Buque de vela"],1,"Regla 18 f) ii."],
["ripa","En visibilidad reducida, los buques de propulsión mecánica tendrán…",["Las luces apagadas","Las máquinas listas para maniobrar inmediatamente","El ancla a la pendura","Solo radar"],1,"Regla 19 b)."],
["ripa","Si en niebla oyes la señal de otro buque a proa de tu través, debes…",["Acelerar","Reducir a la velocidad mínima de gobierno y, si hace falta, parar","Caer a babor","Dar una pitada larga"],1,"Regla 19 e)."],
["ripa","Las marcas (esferas, conos…) se exhiben…",["De noche","De día","Solo en niebla","Nunca en recreo"],1,"Las luces, de la puesta a la salida del sol y con visibilidad reducida."],
["ripa","El sector de la luz de tope equivale a…",["10 cuartas","12 cuartas","20 cuartas","32 cuartas"],2,"225°."],
["ripa","El sector de cada luz de costado equivale a…",["6 cuartas","10 cuartas","12 cuartas","20 cuartas"],1,"112,5°."],
["ripa","La luz de alcance cubre un arco de…",["112,5°","135°","225°","360°"],1,"67,5° a cada banda desde la popa."],
["ripa","La luz de remolque es…",["Blanca","Amarilla, de las mismas características que la de alcance","Roja","Azul"],1,"Va en vertical sobre la de alcance."],
["ripa","Una luz centelleante, según el RIPA, produce…",["60 centelleos por minuto","120 o más centelleos por minuto","30 por minuto","Una luz fija"],1,"Regla 21 f)."],
["ripa","Las luces de costado pueden ir combinadas en un solo farol en buques de eslora inferior a…",["7 m","12 m","20 m","50 m"],2,"En el eje longitudinal."],
["ripa","Un aerodeslizador sin desplazamiento exhibe, además de las de motor…",["Una roja centelleante","Una amarilla centelleante todo horizonte","Dos rojas","Una azul"],1,"Pregunta real (julio 2026)."],
["ripa","Una nave de vuelo rasante que despega o vuela bajo añade a las luces de motor…",["Una amarilla centelleante","Una roja centelleante todo horizonte de gran intensidad","Una verde","Ninguna"],1,"Regla 23 c)."],
["ripa","Un buque de motor de menos de 7 m que no supera los 7 nudos puede llevar…",["Solo costados","Una blanca todo horizonte y, si es posible, costados","Nada","Una roja"],1,"Regla 23 d) II."],
["ripa","De día, un buque de propulsión mecánica en navegación lleva…",["Un cono","Una esfera","Ninguna marca","Un cilindro"],2,"Solo el velero a motor lleva cono vértice abajo."],
["ripa","Un remolcador por popa con un remolque de más de 200 m lleva…",["2 topes en vertical","3 topes en vertical","4 topes","1 tope"],1,"Y de día un bicono."],
["ripa","La longitud del remolque se mide desde…",["La proa del remolcador","La popa del remolcador hasta el extremo de popa del remolcado","El cabo solamente","La proa del remolcado"],1,"Regla 24 a) I."],
["ripa","Un buque que empuja hacia proa (sin formar unidad rígida) lleva…",["3 topes y amarilla","2 topes en vertical, costados y alcance","Solo costados","Una roja"],1,"Sin luz de remolque amarilla."],
["ripa","Un empujador y un empujado unidos rígidamente se iluminan…",["Como dos buques","Como un solo buque de propulsión mecánica","Con 3 topes","Con luces amarillas"],1,"Regla 24 b)."],
["ripa","Un objeto remolcado semisumergido de menos de 25 m de manga lleva…",["Nada","Una blanca todo horizonte a proa y otra a popa","Dos rojas","Costados"],1,"Los dragones no llevan la de proa."],
["ripa","Si un objeto remolcado semisumergido mide más de 100 m de largo, las luces blancas adicionales no distarán más de…",["25 m","50 m","100 m","200 m"],2,"Regla 24 g) III."],
["ripa","Un buque que remolca de forma imprevista a otro en peligro y no puede mostrar las luces de remolque…",["Debe parar","No está obligado a ellas, pero iluminará el cabo de remolque","Lleva 3 rojas","Iza la bandera Alfa"],1,"Regla 24 i)."],
["ripa","Un velero de menos de 20 m puede llevar sus luces de costado y alcance…",["En un farol combinado en el tope del palo","En la popa solamente","Apagadas","En la cruceta"],0,"Regla 25 b)."],
["ripa","Las luces opcionales roja sobre verde del velero NO pueden llevarse junto con…",["Las luces de costado","El farol combinado del tope","La luz de alcance","El motor"],1,"Regla 25 c)."],
["ripa","Una embarcación de vela de menos de 7 m que no lleve sus luces debe tener a mano…",["Una bengala roja","Una linterna o farol de luz blanca","Una bocina","Nada"],1,"Para mostrarla a tiempo de evitar el abordaje."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
