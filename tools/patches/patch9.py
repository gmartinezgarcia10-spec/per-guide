import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

AMARRAS=r'''["amarras7","Amarras: voces y efectos",`
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
'''
rep('["helice","Efecto de la hélice",`',AMARRAS+'["helice","Efecto de la hélice",`')

rep('<div class="key"><b>Consecuencia práctica.</b> Con una hélice dextrógira es más fácil <b>atracar por babor</b>',
'''<ul>
<li><b>Sin arrancada, la popa cae a la banda hacia la que gira la hélice</b> (efecto de «rodadura»: presión lateral del agua impulsada por las palas sobre la obra viva), y la proa a la contraria. Atrás, una dextrógira gira a izquierdas: la popa cae a <b>babor</b> hasta que el barco coge arrancada; una levógira, a estribor.</li>
<li><b>Avante sin arrancada</b>: se gobierna desde el primer momento, porque el chorro de la hélice va directo a la pala del timón.</li>
<li><b>Atrás, parado y timón a la vía</b>: el chorro va hacia proa y no toca la pala; los primeros segundos el timón <b>no hace nada</b> y manda la presión lateral de las palas. Cuando el barco coge arrancada atrás, ya se gobierna con el timón.</li>
<li><b>Con arrancada avante y máquina atrás</b>: el barco frena y a la vez la popa cae a la banda de giro de la hélice (babor si dextrógira). Con arrancada atrás, se gobierna sujetando firme la caña o la rueda.</li>
<li><b>Dos hélices</b>: giran en sentidos contrarios para compensar sus efectos, avante y atrás.</li>
</ul>
<div class="key"><b>Consecuencia práctica.</b> Con una hélice dextrógira es más fácil <b>atracar por babor</b>''')

rep('''<li>La curva es más cerrada a poca velocidad con mucha máquina momentánea (una palada), y más abierta a mucha velocidad.</li><li><span class="es">Ciaboga</span>: girar en el sitio. Con dos motores, uno avante y otro atrás. Con uno, paladas cortas avante y atrás con el timón a la misma banda.</li></ul>`],''',
'''<li>La curva es más cerrada a poca velocidad con mucha máquina momentánea (una palada), y más abierta a mucha velocidad.</li></ul>
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
</ul>`],''')

PUNTAS=r'''["puntas","Atraque de puntas y de costado, paso a paso",`
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
'''
rep('["atraque","Atracar y desatracar",`',PUNTAS+'["atraque","Atracar y desatracar",`')

QS=r'''PER.Q.push(
/* ---- 7 Maniobra (manual propio, tema 7) ---- */
["man","Al encapillar una gaza en un noray donde ya hay otras, se pasa…",["Por encima de todas","De abajo arriba por dentro de las otras gazas","Por fuera","Anudada a otra"],1,"Así cualquier barco puede soltar la suya sin quitar las demás."],
["man","Amarrar por seno consiste en…",["Dar una gaza fija al noray","Pasar el seno por el noray y hacer firmes los dos chicotes a bordo","Usar una cadena","Amarrar a una boya"],1,"Para largar basta soltar un chicote y cobrar del otro."],
["man","«Virar» un cabo es…",["Soltarlo","Cobrarlo por medios mecánicos","Aflojarlo un poco","Enrollarlo"],1,"Con molinete o cabrestante."],
["man","«Amollar» es…",["Soltar un poco de cabo","Cobrar","Hacer firme","Adujar"],0,"Lascar es aflojar un poco un cabo que estaba tenso."],
["man","La codera sirve para…",["Fondear por popa","Aguantar el barco con viento de fuera y que no apriete contra el muelle","Remolcar","Sujetar el ancla"],1,"También ayuda a separarlo al desatracar."],
["man","Al cobrar del largo de proa, el barco…",["Se mueve atrás","Atraca la proa y se mueve avante","Se separa del muelle","No se mueve"],1,"El largo de popa: atraca la popa y lo mueve atrás."],
["man","Al cobrar del esprín de proa, el barco…",["Se mueve hacia proa","Atraca la proa y se mueve hacia popa","Se separa","Gira a estribor"],1,"El esprín trabaja al revés que su largo."],
["man","Para desatracar con viento o corriente de proa, se deja el…",["Largo de proa","Esprín de popa","Través de proa","Largo de popa"],1,"El barco se abre de proa."],
["man","Para desatracar con viento o corriente de popa, se deja el…",["Esprín de proa","Esprín de popa","Largo de popa","Través de popa"],0,"El barco se abre de popa."],
["man","Si el viento acuesta fuertemente el barco contra el muelle, para desatracar se usan…",["Solo los largos","Una o dos coderas a una boya, muelle o barco","El ancla de capa","Los traveses"],1,"Y se vira de ellas."],
["man","Con un timón de caña, para que el barco caiga a estribor la caña se mete a…",["Estribor","Babor","La vía","Proa"],1,"La pala va a la banda contraria de la caña."],
["man","La velocidad de gobierno es…",["La máxima del barco","La mínima con la que el barco sigue siendo gobernable desde el timón","La de crucero","La de planeo"],1,"Arrancada es la velocidad que lleva el barco."],
["man","La curva de evolución se describe con…",["El timón cambiando","Revoluciones y ángulo de timón constantes","El motor parado","Viento de través"],1,"Trayectoria del centro de gravedad."],
["man","Las tres fases de la curva de evolución son…",["Avance, giro y parada","Maniobra, variable y uniforme","Aceleración, crucero y frenado","Proa, través y popa"],1,"La que más interesa es la fase de maniobra."],
["man","La fase de maniobra va desde que se empieza a meter el timón hasta que…",["El barco ha girado 90°","La pala alcanza el ángulo deseado","Se alcanza el equilibrio","El barco se para"],1,"Después viene la fase variable."],
["man","En la fase de maniobra, la popa se desplaza hacia…",["La banda de la metida","La banda contraria a la metida","Proa","No se desplaza"],1,"Es el rabeo."],
["man","El desplazamiento transversal de la popa al girar se llama…",["Abatimiento","Rabeo","Deriva","Cabeceo"],1,"Ojo con la aleta cerca de barcos, muelles o boyas."],
["man","Al girar, un barco escora…",["A la banda de la metida","A la banda contraria a la metida","Siempre a babor","No escora"],1,"Por la fuerza centrífuga, más cuanto mayor sea la velocidad."],
["man","¿Qué barco hace una curva de evolución más abierta y con más rabeo?",["Un velero con quilla","Una lancha con obra viva muy plana","Un catamarán","Un remolcador"],1,"El velero pivota casi sobre su quilla."],
["man","Sin arrancada, al dar máquina la popa cae…",["A la banda contraria al giro de la hélice","A la banda hacia la que gira la hélice","Siempre a estribor","No cae"],1,"Efecto de rodadura; la proa cae a la contraria."],
["man","Con una hélice levógira, al dar atrás la popa cae inicialmente a…",["Babor","Estribor","Ninguna banda","Proa"],1,"Con dextrógira, a babor."],
["man","Parado, con el timón a la vía y dando atrás, en los primeros segundos…",["El timón gobierna perfectamente","El timón no influye y manda la presión lateral de las palas","El barco va avante","La proa cae a babor siempre"],1,"El chorro va hacia proa y no toca la pala."],
["man","Dando avante desde parado, el timón…",["No gobierna hasta coger arrancada","Gobierna desde el primer momento","Solo gobierna a babor","Gobierna al revés"],1,"El chorro de la hélice va directo a la pala."],
["man","Navegando avante con una dextrógira, al dar atrás…",["Solo frena","Frena y la popa cae a babor","Frena y la popa cae a estribor","Acelera"],1,"Una vez con arrancada atrás, se gobierna con el timón."],
["man","El origen del término «ciaboga» está en…",["Los veleros de regata","Los botes de remos: bogar y ciar","Los remolcadores","La pesca"],1,"Bogando con un remo y ciando con el otro, el bote pivota."],
["man","Para ciabogar a estribor con una hélice dextrógira se alterna…",["Avante con timón a babor y atrás con timón a estribor","Avante con timón a estribor y atrás, manteniendo el timón a estribor","Solo atrás","Avante con timón a la vía"],1,"Atrás la popa cae a babor, es decir, la proa a estribor."],
["man","En la ciaboga con dos hélices, la proa cae…",["A la banda de la hélice que da avante","A la banda contraria a la hélice que da avante","Siempre a estribor","A la banda de la hélice que da atrás... nunca"],1,"Motor de babor avante y estribor atrás: proa a estribor."],
["man","En la ciaboga con dos hélices, la que da atrás debe ir a…",["Las mismas revoluciones","Aproximadamente el doble de revoluciones","La mitad","Parada"],1,"Rinde mucho menos atrás; si no, el barco coge arrancada avante."],
["man","En la ciaboga con dos hélices, los timones se dejan…",["A estribor","A babor","A la vía","Alternando"],2,"Su efecto es inapreciable."],
["man","El abatimiento es el desplazamiento lateral del barco por efecto…",["De la corriente sobre la obra viva","Del viento sobre la obra muerta","De las olas","De la hélice"],1,"Si el viento entra por proa o popa, solo cambia la velocidad."],
["man","La deriva es el desplazamiento del barco por efecto…",["Del viento","De la corriente sobre la obra viva","Del timón","Del oleaje"],1,"En la dirección de la corriente."],
["man","«Libre a sotavento» significa…",["Navegar a sotavento de otro","Mantenerse alejado de cualquier peligro a sotavento con margen para maniobrar","Soltar las amarras de sotavento","Fondear a sotavento"],1,"Por si el viento nos empuja hacia él."],
["man","En el atraque de puntas, la crujía queda…",["Paralela al muelle","Perpendicular al muelle","A 45°","Indiferente"],1,"Dando al muelle la popa o la proa."],
["man","En el atraque de puntas, la guía…",["Trabaja como amarra principal","No trabaja: solo une el largo con el muelle","Va al ancla","Se da al barco vecino"],1,"El largo va de proa al muerto."],
["man","Un barco atracado de puntas queda con…",["Un largo al muelle","Dos largos al muelle y uno o dos al agua, a un muerto o cadena","Traveses y esprines","Solo el ancla"],1,"Atraque mediterráneo."],
["man","Con hélice dextrógira, si el puesto de amarre está a babor, para entrar de popa…",["Se entra de proa","Se pasa un poco el hueco y se da atrás con timón a babor, aprovechando la caída de la popa","Se gira con dos hélices","Se usa el ancla"],1,"Supuesto 1 del manual."],
["man","Con viento fuerte perpendicular al amarre o poca experiencia, en el atraque de puntas conviene…",["Entrar de popa a toda máquina","Entrar de proa, avante con poca arrancada","Fondear fuera","Esperar"],1,"Gobernar atrás siempre es más difícil."],
["man","Al amarrar, ¿qué amarras se dan primero?",["Las de sotavento","Las de barlovento","Las de popa siempre","Los traveses"],1,"Son las que trabajan en cuanto el barco se para."],
["man","Al desamarrar, las amarras de barlovento se largan…",["Las primeras","Las últimas","A la vez que las otras","Nunca"],1,"Para sujetar el barco hasta el último segundo."],
["man","Atracando de puntas con la popa al muelle y viento de proa (del mar), la primera amarra es…",["El largo de popa","El largo de proa","Un través","Un esprín"],1,"Es la de barlovento: evita que la popa golpee el muelle."],
["man","Atracando de puntas con viento del muelle (de popa), las primeras amarras son…",["El largo de proa","Los largos de popa por seno","La guía","Los traveses"],1,"El viento nos separa del muelle."],
["man","En un atraque de costado, la aproximación se hace…",["Con el viento de popa","Proa al viento o a la corriente, al más fuerte de los dos","De través","A toda máquina"],1,"Así se frena y se controla mejor."],
["man","«Hacer cabeza» es…",["Fondear de proa","Separar la popa del muelle trabajando sobre el esprín de proa para salir atrás","Atracar de proa","Abarloarse"],1,"Defensa grande en la amura, todo largado menos el esprín de proa, poco avante con timón hacia el muelle."],
["man","Al hacer cabeza atracado por babor, el timón se mete…",["A estribor","A babor (hacia el muelle)","A la vía","Indiferente"],1,"Con muy poco avante: la popa se abre."],
["man","Al desatracar de costado con viento de proa paralelo, se aguanta…",["El esprín de proa","El esprín de popa","El largo de proa","Un través"],1,"Defensa grande en la aleta y separar la proa con el bichero."],
["man","Atracando por babor con viento de popa paralelo al muelle, la amarra que detiene el barco y atraca la proa es…",["El largo de popa","El esprín de proa","El través de popa","La codera"],1,"Después, largo de popa y largo de proa."],
["man","Al abarloarse a un barco atracado, los largos van…",["Al otro barco","Al muelle","Al fondo","A una boya"],1,"Traveses y esprines, al barco al que nos abarloamos."],
["man","Para desabarloarse se sale…",["Contra el viento","A favor del viento o de la corriente","De través","Dando atrás siempre"],1,"Así los barcos exteriores siguen firmes con sus estachas de barlovento."],
["man","Para abarloarse a un barco fondeado, la aproximación se hace…",["Con viento de popa","Proa al viento","De través al viento","Por su popa"],1,"Así está todo barco fondeado."],
["man","Al amarrar a una boya, hay que quedar parado muy cerca de ella y…",["A sotavento","A barlovento","Por la popa","De través"],1,"Y amarrar mejor por seno a las cornamusas de proa."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
