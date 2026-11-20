import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)
rep('note:"Verde sobre blanca (y opcionalmente tope a popa, más alto). De día, dos conos unidos por los vértices."',
    'note:"Verde sobre blanca. Tope a popa más alto que la verde: obligatorio si ≥50 m, opcional si es menor. De día, dos conos unidos por los vértices."')
rep('note:"Roja sobre blanca. Si el aparejo se extiende más de 150 m, una blanca todo horizonte hacia él."',
    'note:"Roja sobre blanca. Si el aparejo se extiende más de 150 m en horizontal, una blanca todo horizonte (de día, un cono vértice arriba) en la dirección del aparejo."')
rep('note:"Blanca a proa y otra más baja a popa (y puede iluminar la cubierta)."',
    'note:"Blanca a proa y otra más baja a popa. Puede iluminar la cubierta; si mide 100 m o más, es obligatorio."')

NEW=r'''["reglas26","Reglas 26 a 37 en detalle",`
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
'''
rep('["socorro","Señales de socorro (anexo IV)",`',NEW+'["socorro","Señales de socorro (anexo IV)",`')

QS=r'''PER.Q.push(
/* ---- 6 RIPA (manual propio, reglas 26–37) ---- */
["ripa","Un pesquero de arrastre de 60 m exhibe, además de verde sobre blanca…",["Nada más","Una luz de tope a popa más alta que la verde","Una roja","Una amarilla"],1,"Obligatoria con ≥50 m; opcional si es menor."],
["ripa","Si el aparejo de un pesquero que no es de arrastre se extiende más de 150 m, exhibe hacia él…",["Una roja","Una blanca todo horizonte o, de día, un cono con el vértice arriba","Dos verdes","Un cilindro"],1,"Regla 26 c) II."],
["ripa","Un pesquero que no está faenando exhibe…",["Las luces de pesca","Las de un buque de su eslora","Solo la de alcance","Ninguna"],1,"Regla 26 e)."],
["ripa","Un buque sin gobierno con arrancada exhibe dos rojas en vertical y…",["Luz de tope","Costados y alcance","Una blanca a proa","Nada más"],1,"Nunca luz de tope."],
["ripa","Un buque con capacidad de maniobra restringida con arrancada exhibe roja-blanca-roja y además…",["Solo costados","Tope(s), costados y alcance","Dos verdes","Una amarilla"],1,"Regla 27 b) III."],
["ripa","Una draga con obstrucción indica la banda por la que puede pasar otro buque con…",["Dos rojas o dos bolas","Dos verdes o dos biconos","Una blanca","Un cilindro"],1,"La banda de la obstrucción: dos rojas o dos bolas."],
["ripa","Una draga fondeada con obstrucción exhibe…",["Las luces de fondeo","Las de dragado en lugar de las de fondeo","Solo dos rojas","Nada"],1,"Regla 27 d) III."],
["ripa","Una embarcación pequeña dedicada al buceo que no puede llevar todas las luces y marcas muestra…",["Bandera B","Roja-blanca-roja y una bandera A rígida de al menos 1 m","Dos rojas","Un cono"],1,"Regla 27 e)."],
["ripa","Las tres luces verdes de un dragaminas van…",["En vertical","Una en el tope del palo de proa y una en cada penol de su verga","En la popa","A proa y a popa"],1,"Regla 27 f)."],
["ripa","Los buques de menos de 12 m no están obligados a las luces de la regla 27, salvo…",["Los sin gobierno","Los dedicados a operaciones de buceo","Los dragaminas","Los remolcadores"],1,"Regla 27 g)."],
["ripa","Las luces de buque sin gobierno o de maniobra restringida…",["Son señales de socorro","No son señales de socorro","Equivalen a MAYDAY","Solo se usan en niebla"],1,"Las de socorro están en el anexo IV."],
["ripa","La señal diurna de un buque restringido por su calado es…",["Una bola","Un cilindro","Un cono","Un bicono"],1,"De noche, tres rojas en vertical."],
["ripa","Un práctico en servicio fondeado exhibe…",["Solo blanca sobre roja","Blanca sobre roja y las luces de fondeo","Dos rojas","Las de motor"],1,"Navegando: blanca sobre roja, costados y alcance."],
["ripa","Fuera de servicio, una embarcación de práctico exhibe…",["Blanca sobre roja","Las luces de las embarcaciones de su eslora","Nada","Cuatro cortas"],1,"Regla 29 b)."],
["ripa","Un buque fondeado de 120 m debe además…",["Llevar tres bolas","Iluminar sus cubiertas con luces de trabajo","Dar pitadas","Llevar luz amarilla"],1,"Obligatorio con ≥100 m."],
["ripa","Un buque fondeado de 40 m puede exhibir…",["Dos blancas","Una sola blanca todo horizonte en el lugar más visible","Una roja","Nada"],1,"Regla 30 b)."],
["ripa","Una embarcación de menos de 7 m fondeada lejos de canales, fondeaderos y zonas de tráfico…",["Lleva una bola","No está obligada a luces ni marcas de fondeo","Lleva dos blancas","Da pitadas"],1,"Regla 30 e)."],
["ripa","De día, un buque varado exhibe…",["Una bola","Dos bolas","Tres bolas en vertical","Un cilindro"],2,"De noche, luces de fondeo + dos rojas."],
["ripa","Un buque varado de menos de 12 m…",["Debe llevar dos rojas","No está obligado a las dos rojas ni a las tres bolas","Lleva un cono","Lleva bandera A"],1,"Regla 30 f)."],
["ripa","Una pitada larga dura aproximadamente…",["1 s","2–3 s","4–6 s","10 s"],2,"La corta, unos 1 s."],
["ripa","Un buque de 15 m debe ir dotado de…",["Pito, campana y gong","Pito y campana","Pito","Nada"],2,"≥20 m: pito y campana; ≥100 m: además gong."],
["ripa","Un buque de 25 m debe llevar…",["Solo pito","Pito y campana","Pito, campana y gong","Solo campana"],1,"Regla 33 a)."],
["ripa","Dos pitadas cortas de un buque de motor a la vista significan…",["Caigo a estribor","Caigo a babor","Estoy dando atrás","Tengo dudas"],1,"Regla 34 a)."],
["ripa","Los destellos que complementan las pitadas de maniobra se hacen con una luz…",["Roja","Blanca todo horizonte visible a 5 mn","Amarilla","Verde"],1,"De ≈1 s, con ≈1 s entre destellos."],
["ripa","El intervalo entre señales luminosas de maniobra sucesivas no será inferior a…",["2 s","5 s","10 s","1 min"],2,"Regla 34 b) II."],
["ripa","En un canal angosto, dos largas seguidas de una corta significan…",["Pretendo alcanzarle por su babor","Pretendo alcanzarle por su estribor","Conforme","Me acerco a un recodo"],1,"Dos largas y dos cortas: por su babor."],
["ripa","El buque que va a ser alcanzado da su conformidad con…",["Una larga","Larga-corta-larga-corta","Cinco cortas","Tres cortas"],1,"Regla 34 c) II."],
["ripa","Al menos cinco pitadas cortas y rápidas significan…",["Socorro","Duda sobre las intenciones del otro","Doy atrás","Fondeado"],1,"Puede complementarse con cinco destellos."],
["ripa","Al aproximarse a un recodo sin visibilidad se da…",["Una corta","Una larga, que se contesta con otra larga","Dos largas","Cinco cortas"],1,"Regla 34 e)."],
["ripa","Si los pitos de un buque distan entre sí más de 100 m…",["Se usan todos a la vez","Solo se usa uno para las señales de maniobra","Se usan alternados","No se usan"],1,"Regla 34 f)."],
["ripa","Con niebla, un buque de motor parado y sin arrancada da cada 2 minutos…",["Una larga","Dos largas separadas unos 2 s","Larga y dos cortas","Cuatro cortas"],1,"Con arrancada, una larga."],
["ripa","Con niebla, un velero da cada 2 minutos…",["Una larga","Una larga y dos cortas","Dos largas","Una corta"],1,"Igual que sin gobierno, maniobra restringida, calado, pesca y remolcadores."],
["ripa","Con niebla, un pesquero fondeado emite…",["Repique de campana","Una larga y dos cortas","Dos largas","Nada"],1,"También los de maniobra restringida fondeados."],
["ripa","El último buque remolcado, si va tripulado, emite con niebla…",["Una larga y dos cortas","Una larga y tres cortas, justo después del remolcador","Cuatro cortas","Repique"],1,"Regla 35 e)."],
["ripa","En niebla, un buque fondeado puede dar además corta-larga-corta para…",["Pedir socorro","Señalar su posición y el riesgo de abordaje a quien se acerque","Pedir práctico","Indicar que leva"],1,"Regla 35 g)."],
["ripa","Con niebla, un buque fondeado de 120 m hace sonar…",["Solo campana","Campana a proa y después gong a popa","Solo gong","Pito"],1,"Unos 5 s cada uno, cada minuto."],
["ripa","Un buque varado en niebla da, antes y después del repique de campana…",["Un golpe","Tres golpes de campana claros y separados","El gong","Cuatro cortas"],1,"Y puede añadir una señal de pito."],
["ripa","Un buque de 15 m fondeado en niebla que no lleva campana…",["No hace nada","Emite otra señal acústica eficaz cada ≤2 min","Da cinco cortas","Enciende luces de cubierta"],1,"Regla 35 i)."],
["ripa","Un práctico en servicio puede dar como señal de identificación…",["Tres cortas","Cuatro cortas","Una larga","Dos largas"],1,"Regla 35 k)."],
["ripa","Para llamar la atención NO deben usarse…",["Señales acústicas","El proyector hacia el peligro","Luces estroboscópicas","Luces que no se confundan"],2,"Regla 36."],
["ripa","¿Cuál de estas es una señal de peligro del anexo IV?",["Una luz blanca intermitente","Cohetes que despiden estrellas rojas uno a uno","Una bengala blanca","Cuatro pitadas cortas"],1,"A cortos intervalos."],
["ripa","El canal de ondas métricas para la alerta de socorro LSD es el…",["9","16","70","72"],2,"MAYDAY por voz, en el 16."],
["ripa","Para identificación desde el aire puede usarse…",["Una bandera Alfa","Una lona naranja con un cuadrado y un círculo negros","Una luz amarilla","Un bicono"],1,"También una marca colorante en el agua."],
["ripa","Usar una señal de peligro sin estar en peligro…",["Está permitido para practicar","Está prohibido","Se permite de día","Solo en puerto"],1,"Ni señales que puedan confundirse con ellas."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
