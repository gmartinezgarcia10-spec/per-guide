import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

# coast widget
rep('''["playa","Zona de baño (playa)","Los primeros <b>200 m</b> desde la playa. Si está balizada (boyas amarillas a ≤200 m entre sí), está <b>prohibido navegar dentro</b>. Si no lo está, se aplica igualmente el límite de 200 m."],
 ["canal","Canal de entrada y salida","Pasillo de 25–50 m de ancho, balizado con boyas (amarillas, marcas laterales). Se navega <b>perpendicular a la playa</b> y a <b>3 nudos</b> como máximo, solo para entrar y salir."],
 ["costa","Resto de la costa (acantilado, rocas)","Velocidad máxima <b>3 nudos</b> a menos de <b>50 m</b> de la costa no balizada."],
 ["buceo","Bandera de buceo","Bandera <b>A (Alfa)</b> del Código Internacional, o roja con franja diagonal blanca. Hay que mantenerse a <b>25 m</b> como mínimo. Los buceadores no deben alejarse más de 25 m de su boya o barco."],''',
'''["playa","Zona de baño (playa)","<b>Balizada</b>: boyas cónicas amarillas a 200 m de la orilla y a menos de 200 m entre sí; dentro está <b>prohibido entrar y fondear</b> con cualquier embarcación o artefacto. <b>No balizada</b>: se entiende que la zona de baño son los <b>200 m</b> contiguos a la costa; dentro, <b>máximo 3 nudos</b>, y las motos náuticas solo pueden cruzarla perpendicularmente a la playa a menos de 3 nudos."],
 ["canal","Canal de entrada y salida","Pasillo de <b>25–50 m</b> de ancho, marcado con boyarines amarillos y, en su entrada, una boya lateral de babor y otra de estribor. Desde los 200 m hasta la costa se navega <b>perpendicular a tierra</b> y a <b>menos de 3 nudos</b>; si hay canal, es obligatorio usarlo. En él <b>no se puede bañar</b> nadie; sí pueden navegar balandros, auxiliares y artefactos flotantes."],
 ["costa","Resto de la costa (acantilado, rocas)","En la franja de <b>50 m</b> del litoral no se pueden hacer actividades deportivas o de recreo a más de <b>3 nudos</b>."],
 ["buceo","Bandera de buceo","Bandera <b>A (Alfa)</b> del Código Internacional (blanca y azul, en forma de corneta), o la <b>Bravo modificada</b> (roja con franja diagonal blanca). Salvo la embarcación de apoyo, hay que mantenerse a <b>50 m</b> como mínimo de la zona de buceo y reducir la velocidad."],''')
rep('<div class="key"><b>Los números.</b> 200 m de las playas, 50 m del resto de la costa, 3 nudos, canales de 25–50 m de ancho, 25 m de los buceadores.</div>`],',
'''<div class="key"><b>Los números.</b> 200 m de las playas, 50 m del resto de la costa, 3 nudos, canales de 25–50 m de ancho, <b>50 m</b> de los buceadores.</div>
<h3>Reservas marinas</h3>
<p>Para estar en ellas hacen falta permisos y, en todo caso, está prohibido: <b>fondear</b> (sí se puede amarrar a las boyas habilitadas), navegar a motor salvo para acercarse a las boyas a <b>menos de 3 nudos</b>, la <b>pesca recreativa</b> en todas sus modalidades, el buceo sin licencia, recoger organismos, flora y fauna sin autorización, los deportes náuticos a motor y las actividades submarinas a motor sin autorización.</p>`],
["puerto","En puerto y cerca del tráfico",`
<p>En cada puerto, la Autoridad Portuaria, de acuerdo con la Autoridad Marítima, publica un <b>Reglamento de Policía de Puerto</b>. Normas comunes:</p>
<div class="grid2">
<div class="panel"><h4>Dentro del puerto</h4><ul>
<li>Práctico obligatorio para buques de más de <b>500 TRB</b>.</li>
<li>Los que <b>salen</b> tienen preferencia sobre los que entran; en las entradas se navega por la <b>derecha</b>.</li>
<li>Todo buque que entra arbola el pabellón nacional.</li>
<li>Atender al Capitán Marítimo; no fondear ni detenerse donde se corte el paso.</li>
<li>Entrar despacio, a <b>menos de 3 nudos</b>, sin levantar oleaje.</li>
<li>Defensas al atracar, escalas bien afirmadas, limpieza, reforzar amarras con temporal.</li>
<li>No tirar basura ni verter gasoil o residuos; <b>no pescar ni bañarse</b>; no lastrar ni deslastrar tanques.</li>
<li>Ayudar a otros barcos en maniobra si procede.</li></ul></div>
<div class="panel"><h4>Con el tráfico marítimo</h4><ul>
<li>Alejarse de las derrotas de buques, remolcadores, dragas, pasaje y prácticos, sin estorbar su maniobra y navegando lo más cerca posible del límite exterior del canal, por su <b>estribor</b>.</li>
<li>Siempre con el título adecuado y en las zonas que permite.</li>
<li>Evitar rías y afluentes en horas de riada o con corriente fuerte.</li>
<li>Dar resguardo a un barco parado: suele haber bañistas.</li>
<li>Prohibida la pesca deportiva a barlomar de almadrabas o viveros.</li>
<li>Respetar las zonas de seguridad de refinerías y boyas de carga y descarga de combustible.</li></ul></div>
</div>`],
["buzos","Buzos y bañistas",`
<p>Fuera de las zonas anteriores, vigila cerca de la costa para ver a tiempo a bañistas y buceadores. Salvo su propia embarcación de apoyo, todo barco se mantiene a <b>50 m</b> como mínimo de la zona de buceo y actúa según el RIPA, teniendo en cuenta su tipo y su velocidad.</p>
<div class="grid2">
<div class="panel"><h4>Bandera Alfa (A)</h4><p>Del Código Internacional de Señales. Es la que deben usar en España las embarcaciones dedicadas a actividades subacuáticas. Izada sola significa: «<b>tengo un buzo sumergido, manténgase alejado de mí y a poca velocidad</b>». También se lleva en boyarines cuando el buceador nada lejos de un barco.</p></div>
<div class="panel"><h4>Bravo modificada</h4><p>Roja con una franja <b>diagonal blanca</b> («la roja» o «la internacional»). Mismo significado que la Alfa. La diseñó Ruth Dockery, esposa de un buceador de la US Navy, hacia 1950, a partir de la bandera B (roja, «cargo o transporto mercancías peligrosas»). En España <b>no tiene cobertura legal</b>, pero se tolera y es la más usada en el mundo.</p></div>
</div>`],''')

# medio: replace aguas sucias panel + add more
rep('<div class="panel"><h4>Aguas sucias (negras)</h4><p>Con tratamiento (desmenuzadas y desinfectadas): a más de <b>3 mn</b> y navegando a ≥4 nudos. Sin tratar: a más de <b>12 mn</b>. Nunca en puertos ni en zonas protegidas.</p></div>',
'<div class="panel"><h4>Aguas sucias (negras)</h4><p>Desmenuzadas y desinfectadas: a más de <b>3 mn</b> de la línea de base. Sin tratar: a más de <b>12 mn</b>. Las retenidas, poco a poco y navegando a <b>≥4 nudos</b>. Con planta de tratamiento homologada, fuera de la zona 7. En <b>zona 7</b> (puertos, rías, bahías) <b>ninguna descarga</b>, ni tratada.</p></div>')
rep('''<ul>
<li><b>Posidonia oceanica</b>: planta (no un alga) endémica del Mediterráneo. Oxigena el agua, es vivero de peces y protege las playas de la erosión. Crece muy despacio, en torno a 1 cm al año: un ancla destruye décadas de pradera.</li>''',
'''<p>Los barcos de recreo cumplen los anexos <b>I</b> (hidrocarburos), <b>V</b> (basuras) y <b>VI</b> (atmosférica) del <b>MARPOL</b> (1973).</p>
<h3>Aguas sucias: equipos (barcos sin marcado CE)</h3>
<ul>
<li>Construidos para evitar descargas accidentales. Con inodoro, uno de estos: <b>tanque de retención</b> (con indicador de que supera los <b>3/4</b>), <b>planta de tratamiento</b> certificada (RD 701/2016 u homologada por la Administración), o <b>sistema que desmenuza y desinfecta</b> con almacenamiento temporal.</li>
<li>Referencia para el tanque: personas autorizadas × <b>4 L por persona y día</b> × <b>2 días</b>. 8 personas → 64 L.</li>
<li>Tanque fijo con <b>conexión universal</b> a tierra. Conductos de descarga al mar con <b>válvulas</b> que cierren herméticamente y se puedan precintar.</li>
<li>Excepciones: descarga necesaria para la seguridad del barco o para salvar vidas, y la que resulte de una avería si se tomaron todas las precauciones razonables. Si van mezcladas con otros residuos, se aplica además la norma de esos residuos.</li>
<li>Sanciones por equipos de aguas sucias: <b>500–3.000 €</b> (RD 339/2021).</li>
</ul>
<h3>Basuras (MARPOL anexo V)</h3>
<ul>
<li><b>Prohibido siempre</b> echar plásticos (cabos, redes sintéticas, bolsas de basura).</li>
<li><b>Mediterráneo, mar Rojo, mar Negro y otros</b> (zonas especiales): prohibidas todas las basuras; solo <b>restos de comida</b>, lo más lejos posible y <b>nunca a menos de 12 mn</b>. Si se mezclan residuos, manda la norma más estricta.</li>
<li>Fuera de zonas especiales, el manual da: tablas, forros y embalajes que flotan a más de <b>25 mn</b>; comida y demás basuras a más de <b>12 mn</b>; trituradas (malla ≤25 mm) a más de <b>3 mn</b>.</li>
<li>Lo que no se puede tirar se guarda a bordo y se entrega en puerto en una instalación MARPOL.</li>
</ul>
<div class="note"><b>Ojo.</b> Las distancias de 25 mn y 3 mn para papel, trapos, vidrio o metal son del anexo V anterior a 2013. Desde la revisión de 2013, fuera de las zonas especiales solo se pueden descargar restos de comida (más de 12 mn, o más de 3 mn triturados). Para el examen en el Mediterráneo: <b>solo comida, a más de 12 mn</b>.</div>
<h3>Entrega de desechos en puerto</h3>
<p>El manual describe el <b>RD 1381/2002</b> (hoy sustituido por el <b>RD 128/2022</b>, con la misma idea): el puerto tiene un plan de recepción; el patrón de un barco de recreo de hasta 12 pasajeros rellena una <b>notificación reducida</b>; con base en un puerto español se justifica <b>cada año</b> la entrega ante Capitanía (recibo anual de la instalación); viniendo del extranjero, al llegar al primer puerto español. Todo buque entrega sus desechos antes de salir, salvo autorización de Capitanía por tener capacidad suficiente hasta el siguiente puerto.</p>
<h3>Responsabilidad y avistamiento</h3>
<p>De la contaminación desde buques responden <b>solidariamente</b> el naviero, el propietario, el asegurador de responsabilidad civil y el <b>capitán</b>, y están obligados a reparar el daño (Ley de Puertos y Marina Mercante, art. 310.2.d). Si ves un vertido de hidrocarburos: <b>en puerto</b>, avisa enseguida a la Autoridad Marítima con todos los datos (barco, sustancia, viento…); <b>en la mar</b>, al Centro de Coordinación de Salvamento o al <b>900 202 202</b>.</p>
<ul>''')
rep('<li><b>Reservas marinas</b>: limitan fondeo, pesca y buceo. En tu zona: <b>islas Columbretes</b> (ZEPIM, frente a Castellón), Tabarca (Alicante), Cabo de San Antonio. Otras: Cabo de Gata, Cabrera, islas Medes.</li>',
'<li><b>Reservas marinas</b>: limitan fondeo, pesca y buceo. En tu zona: <b>islas Columbretes</b> (también ZEPIM, frente a Castellón), Tabarca (Alicante; reserva marina pero <b>no ZEPIM</b>), Cabo de San Antonio. Otras: Cabo de Gata, Cabrera, islas Medes.</li>')
rep('''<li>Respeta las <b>distancias a cetáceos</b>: no acercarse a menos de 60 m, sin cortarles el paso ni separar a las crías, y a velocidad reducida (RD 1727/2007).</li>
</ul>`],''',
'''<li>Respeta las <b>distancias a cetáceos</b>: no acercarse a menos de 60 m, sin cortarles el paso ni separar a las crías, y a velocidad reducida (RD 1727/2007).</li>
</ul>`],
["espacios","Espacios naturales: ZEPIM y posidonia",`
<p><b>Causas de la agresión al medio marino</b>: más población y urbanización del litoral (sobre todo en el Mediterráneo), consumo y residuos, obras costeras (puertos, espigones, marinas, cambios en las playas), vertidos y mareas negras, y sobrepesca con artes poco selectivas (deriva, arrastre). Cada vez cuesta más construir o ampliar puertos deportivos por su impacto.</p>
<p>El Mediterráneo recibe mucho de lo que traen ríos y ramblas: <b>dos tercios</b> de su contaminación vienen de tierra, y recibe el <b>20 %</b> de los vertidos mundiales de hidrocarburos.</p>
<h3>ZEPIM</h3>
<p><b>Zonas Especialmente Protegidas de Importancia para el Mediterráneo</b>. Nacen del Protocolo de 1995 del <b>Convenio de Barcelona</b>. Objetivo: mejorar el estado natural del mar con áreas protegidas y proteger especies amenazadas. Para entrar en la lista, la zona ya debe tener alguna protección, ecosistemas mediterráneos típicos o hábitats de especies en peligro, e interés científico, estético o cultural. Suelen tener planes de gestión.</p>
<p>España es el país con más: <b>nueve</b>.</p>
<div class="tablewrap"><table>
<tr><th>ZEPIM</th><th>Comunidad</th></tr>
<tr><td>Isla de Alborán</td><td>Andalucía</td></tr>
<tr><td>Fondos marinos del Levante almeriense</td><td>Andalucía</td></tr>
<tr><td>Cabo de Gata-Níjar</td><td>Andalucía</td></tr>
<tr><td>Acantilados de Maro-Cerro Gordo</td><td>Andalucía</td></tr>
<tr><td>Cap de Creus</td><td>Cataluña</td></tr>
<tr><td>Illes Medes</td><td>Cataluña</td></tr>
<tr><td><b>Islas Columbretes</b></td><td>C. Valenciana</td></tr>
<tr><td>Archipiélago de Cabrera</td><td>Baleares</td></tr>
<tr><td>Mar Menor y costa oriental de Murcia</td><td>Murcia</td></tr>
</table></div>
<p class="small">Fuera de España hay otras cinco (Francia y Túnez) y el santuario de cetáceos del mar de Liguria (Francia, Italia y Mónaco).</p>
<h3>Posidonia oceanica</h3>
<ul>
<li>Es una <b>planta con flores, hojas y frutos</b>, no un alga. Vive a <b>menos de 50 m</b> de profundidad, donde llega la luz para la fotosíntesis.</li>
<li>Sus praderas (<b>algueros</b> o <b>alguers</b>) son la principal fuente de <b>oxigenación</b> del Mediterráneo y el hábitat de más de <b>400 especies vegetales y 1.000 animales</b>.</li>
<li>Las hojas secas en la playa frenan el oleaje, protegen de la erosión y fijan la arena: no son suciedad.</li>
</ul>`],''')

rep('<li><b>Pabellón</b>: la bandera española se iza en el asta de popa (o en el pico del palo mayor). Ninguna otra puede izarse sin ella ni ser más grande. La autonómica o del club, siempre junto a la nacional y en lugar menos destacado.</li>\n<li><b>Auxilio en la mar</b>: obligación de auxiliar a cualquier persona en peligro, si no supone un riesgo grave para el propio barco o su gente (SOLAS cap. V, regla 33).</li>',
'''<li><b>Pabellón</b> (RD 2335/1980): todos los buques y embarcaciones, también los de recreo, llevan como único pabellón la bandera de España, en el <b>asta de popa</b> (o en el pico del palo mayor en veleros). Es obligatorio izarla a la vista de buques de guerra o fortalezas, al entrar y salir de puerto y, en puerto, <b>de sol a sol</b> los festivos o cuando lo ordene la autoridad, y en aguas extranjeras cuando lo pida la costumbre o la norma. Ninguna otra bandera puede ir izada sin ella, y su tamaño nunca supera <b>un tercio</b> del de la nacional. La autonómica, en puertos y aguas interiores, siempre junto a la nacional y con ese tamaño máximo.</li>
<li><b>Auxilio en la mar</b> (SOLAS cap. V, regla 33): el capitán que, pudiendo ayudar, sepa por cualquier fuente que hay personas en peligro, está obligado a acudir <b>a toda máquina</b> y avisar a ellas o al servicio de salvamento, sin importar su nacionalidad, condición jurídica ni circunstancias. Si no puede o considera que no es razonable o necesario, anota el motivo en el <b>diario de navegación</b> e informa a salvamento.</li>''')

QS=r'''PER.Q.push(
/* ---- 4 Legislación (manual propio, tema 4) ---- */
["leg","El práctico es obligatorio para entrar en puerto a los buques de más de…",["100 TRB","500 TRB","1.000 TRB","24 m"],1,"Toneladas de Registro Bruto."],
["leg","En la bocana de un puerto, tiene preferencia…",["El que entra","El que sale","El de mayor eslora","El de vela"],1,"Y en las entradas se navega por la derecha."],
["leg","¿Qué está prohibido dentro de un puerto?",["Colocar defensas","Pescar y bañarse","Reforzar amarras","Navegar a 2 nudos"],1,"Tampoco se lastran ni deslastran tanques."],
["leg","Cerca de un canal con tráfico de buques, un barco de recreo navega…",["Por el centro del canal","Cerca del límite exterior del canal, por su estribor","Por babor","Cortando las derrotas"],1,"Sin estorbar la maniobra de los buques."],
["leg","La pesca deportiva a barlomar de almadrabas o viveros…",["Está permitida","Está prohibida","Solo de noche","Con licencia especial"],1,"Norma de tráfico marítimo."],
["leg","En la franja de 50 m del litoral, las actividades deportivas o de recreo no pueden superar…",["1 nudo","3 nudos","5 nudos","10 nudos"],1,"Lugares próximos a la costa."],
["leg","En una playa no balizada, se considera zona de baño la franja de…",["50 m","100 m","200 m","500 m"],2,"Dentro, como máximo 3 nudos."],
["leg","Las boyas que balizan una playa son…",["Esféricas rojas a 100 m","Cónicas amarillas a 200 m de la orilla y a menos de 200 m entre sí","Cilíndricas verdes a 50 m","Cardinales"],1,"Sistema de balizamiento de playas."],
["leg","El canal de acceso a una playa tiene una anchura de…",["5–10 m","25–50 m","100 m","200 m"],1,"Marcado con boyarines amarillos y una boya lateral a cada lado de la entrada."],
["leg","En el canal de acceso a la playa…",["Se puede bañar","No se puede bañar, pero sí navegar balandros, auxiliares y artefactos flotantes","Solo pueden entrar motos náuticas","Se puede fondear"],1,"Y se navega a menos de 3 nudos."],
["leg","En una reserva marina se puede…",["Fondear","Amarrar a las boyas habilitadas","Pescar desde la embarcación","Hacer esquí náutico"],1,"El fondeo está prohibido."],
["leg","En una reserva marina, la navegación a motor solo se permite…",["Libremente","Para acercarse a las boyas a menos de 3 nudos","De noche","A más de 10 nudos"],1,"Además, la pesca recreativa está prohibida en todas sus modalidades."],
["leg","Salvo la embarcación de apoyo, hay que mantenerse de una zona de buceo al menos a…",["25 m","50 m","100 m","200 m"],1,"Según el manual y los exámenes de la GVA."],
["leg","La bandera Alfa izada sola significa…",["Necesito práctico","Tengo un buzo sumergido; manténgase alejado y a poca velocidad","Transporto mercancías peligrosas","Necesito ayuda"],1,"Blanca y azul, en forma de corneta."],
["leg","La bandera roja con una franja diagonal blanca es la…",["Alfa","Bravo modificada","Bravo","Oscar"],1,"Mismo significado que la Alfa; en España no tiene cobertura legal, pero se tolera."],
["leg","La bandera Bravo (sin modificar) del Código Internacional izada sola significa…",["Buzo sumergido","Estoy cargando, descargando o transportando mercancías peligrosas","Hombre al agua","Tengo práctico"],1,"De ella derivó la Bravo modificada."],
["leg","Las embarcaciones de recreo deben cumplir los anexos del MARPOL…",["I, V y VI","II y III","IV solamente","Todos"],0,"Hidrocarburos, basuras y contaminación atmosférica."],
["leg","El tanque de retención de aguas sucias debe indicar cuando su contenido supera…",["La mitad","Los 3/4","El 90 %","El 100 %"],1,"Para vaciarlo a tiempo."],
["leg","Como referencia, un barco autorizado para 8 personas necesita un tanque de aguas sucias de unos…",["16 L","32 L","64 L","120 L"],2,"8 personas × 4 L × 2 días."],
["leg","En zona 7 (puertos, rías, bahías), la descarga de aguas sucias…",["Se permite tratada","No se permite ni siquiera tratada","Se permite a 4 nudos","Se permite de noche"],1,"Fuera de la zona 7 y hasta 3 mn, solo con planta de tratamiento homologada."],
["leg","Las aguas sucias retenidas se descargan, cuando está permitido…",["De golpe","A ritmo moderado, navegando a 4 nudos como mínimo","Fondeado","En puerto al mar"],1,"Nunca instantáneamente."],
["leg","El tanque de retención fijo debe tener…",["Una conexión universal a tierra","Un filtro de carbón","Una bomba eléctrica","Un desagüe por el imbornal"],0,"Para acoplarlo a las instalaciones de recepción."],
["leg","Las sanciones por equipos de prevención de aguas sucias van de…",["100 a 500 €","500 a 3.000 €","3.000 a 30.000 €","No hay sanción"],1,"RD 339/2021."],
["leg","En el Mediterráneo, los restos de comida pueden echarse al mar…",["A más de 3 mn","Nunca a menos de 12 mn","En puerto","A más de 25 mn"],1,"Todas las demás basuras están prohibidas."],
["leg","Los plásticos pueden echarse al mar…",["A más de 12 mn","A más de 25 mn","Nunca","Triturados a 3 mn"],2,"Incluidos cabos, redes sintéticas y bolsas de basura."],
["leg","Si las basuras están mezcladas con otros residuos con distintas normas, se aplica…",["La más permisiva","La más rigurosa","La del puerto","Ninguna"],1,"Siempre la más estricta."],
["leg","Un barco de recreo con base en un puerto español justifica la entrega de sus desechos ante Capitanía…",["Cada mes","Cada año","Cada 5 años","Nunca"],1,"Con el recibo anual de la instalación receptora."],
["leg","De las infracciones por contaminación desde buques responden solidariamente…",["Solo el capitán","El naviero, el propietario, el asegurador y el capitán","Solo el propietario","La Capitanía"],1,"Y deben reparar el daño."],
["leg","Si en la mar avistas un vertido de hidrocarburos, debes avisar a…",["La Guardia Civil","Salvamento Marítimo (Centro de Coordinación o 900 202 202)","El club náutico","Nadie"],1,"En puerto, a la Autoridad Marítima."],
["leg","El uso de la bandera de España en barcos de recreo lo regula el…",["RD 339/2021","RD 2335/1980","RD 875/2014","RD 128/2022"],1,"De 10 de octubre de 1980."],
["leg","En un velero, el pabellón nacional puede izarse en…",["La cruceta de estribor","El asta de popa o el pico del palo mayor","El tope del palo","La proa"],1,"Se reservan para la bandera de España."],
["leg","El tamaño de cualquier otra bandera izada junto al pabellón nacional no puede superar…",["La mitad","Un tercio","Dos tercios","El mismo tamaño"],1,"Y ninguna puede ir izada sin el pabellón nacional."],
["leg","En puerto, los festivos el pabellón nacional se iza…",["Solo al mediodía","De sol a sol","Toda la noche","No se iza"],1,"También al entrar y salir de puerto y a la vista de buques de guerra."],
["leg","La obligación de prestar auxilio a personas en peligro en la mar la establece…",["El MARPOL","El SOLAS, capítulo V, regla 33","El RIPA","El RD 339/2021"],1,"Acudiendo a toda máquina."],
["leg","Si un capitán no acude a un auxilio por considerarlo innecesario, debe…",["No hacer nada","Anotar el motivo en el diario de navegación e informar a salvamento","Llamar a la Guardia Civil","Izar la bandera Alfa"],1,"Según las recomendaciones de la OMI."],
["leg","El Protocolo que creó las ZEPIM se firmó en 1995 en el marco del…",["Convenio MARPOL","Convenio de Barcelona","Convenio SOLAS","Tratado de Lisboa"],1,"Zonas Especialmente Protegidas de Importancia para el Mediterráneo."],
["leg","¿Cuántas ZEPIM tiene España?",["3","5","9","15"],2,"Es el país mediterráneo con más."],
["leg","La única ZEPIM de la Comunitat Valenciana es…",["Tabarca","Islas Columbretes","Cabo de San Antonio","Serra Gelada"],1,"Tabarca es reserva marina, pero no ZEPIM."],
["leg","¿Cuál de estas NO es una ZEPIM española?",["Cabo de Gata-Níjar","Archipiélago de Cabrera","Isla de Tabarca","Illes Medes"],2,"Pregunta real en los exámenes de la GVA."],
["leg","La posidonia oceánica vive a profundidades de…",["Menos de 50 m","Entre 100 y 200 m","Más de 200 m","Solo en la orilla"],0,"Donde llega la luz para la fotosíntesis."],
["leg","Las praderas de posidonia también se llaman…",["Arrecifes","Algueros o alguers","Manglares","Bajos"],1,"Son la principal fuente de oxigenación del Mediterráneo."],
["leg","¿Qué proporción de la contaminación del Mediterráneo tiene origen en tierra?",["Un tercio","La mitad","Dos tercios","Casi nada"],2,"La llevan ríos, ramblas y cauces."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
