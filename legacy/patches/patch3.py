import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

# zone widget
rep('<li>Chaleco <b>${Z.ch}</b>, uno por persona</li>',
'<li>Chaleco <b>${Z.ch}</b>, uno por persona, ${Z.z<=3?"con luz":"con luz (se puede prescindir de ella si solo navegas de día)"}</li>')
rep('${Z.aro?"<li>Aro salvavidas con luz y rabiza</li>":""}',
'${Z.aro?(Z.z===1?"<li>2 aros salvavidas: uno con luz y rabiza y otro sin ellas</li>":"<li>Aro salvavidas con luz y rabiza</li>"):""}')

# estabilidad
rep('<p>Dos fuerzas mantienen el barco derecho:',
'<p><span class="es">Estabilidad</span>: propiedad del barco de recuperar su posición de equilibrio cuando la pierde por causas externas (viento, mar). Dos fuerzas mantienen el barco derecho, y juntas forman el <b>par de estabilidad</b>:')
rep('<li><b>Barco duro</b>: GM grande, se adriza con fuerza pero da balances bruscos e incómodos. <b>Barco blando</b>: GM pequeño, balances lentos, poca reserva.</li>\n<li><span class="es">Sincronismo</span>: cuando el periodo de las olas coincide con el periodo propio de balance, los balances aumentan peligrosamente. Se rompe <b>cambiando de rumbo o de velocidad</b>.</li>',
'''<li><b>Barco duro</b>: GM grande, muy estable; se adriza rápido y a menudo de forma brusca y violenta. Los veleros, y sobre todo los monocascos de regata con el peso en el bulbo de la quilla, son barcos duros. En un mercante es peligroso porque puede correrse la carga. <b>Barco blando</b>: GM pequeño, menos estable; cómodo porque recupera la escora despacio, pero con mar fuerte puede volcar y hundirse. El diseño busca un equilibrio entre ambos.</li>
<li><span class="es">Balance</span>: vaivén de una banda a otra. Su <b>periodo</b> es el tiempo que tarda el barco en pasar de estar inclinado a una banda a estarlo los mismos grados a la otra. <span class="es">Cabezada</span> (cabeceo): vaivén proa-popa por el oleaje. Si al cabecear el barco golpea con fuerza el agua con la parte delantera de la obra viva, ha dado un <b>pantocazo</b>.</li>
<li><span class="es">Sincronismo</span>: cuando el periodo de las olas coincide (o casi) con el del barco, la amplitud crece hasta poder volcarlo. Con el balance es <b>sincronismo transversal</b>; con la cabezada, <b>sincronismo longitudinal</b>.</li>''')
rep('<li>La <b>reserva de flotabilidad</b> es el volumen estanco por encima de la flotación (depende del francobordo).</li>\n</ul>`],',
'''<li>La <b>reserva de flotabilidad</b> es el volumen estanco por encima de la flotación (depende del francobordo).</li>
</ul>
<h3>Estática y dinámica</h3>
<div class="tablewrap"><table>
<tr><th>Tipo</th><th>Qué es</th><th>Cómo se ve su pérdida</th></tr>
<tr><td class="es">Estática transversal</td><td>Recuperar el equilibrio, en aguas tranquilas, tras una fuerza lateral. Inicial (escora &lt;10°) o de grandes inclinaciones (&gt;10°).</td><td>Balance y escora. Adrizado = escora nula.</td></tr>
<tr><td class="es">Estática longitudinal</td><td>Recuperarlo en sentido proa-popa (solo se estudia la inicial, &lt;10°)</td><td>Cabeceo y cambios del asiento. En aguas iguales = asiento cero.</td></tr>
<tr><td class="es">Dinámica</td><td>Estabilidad frente a fuerzas externas como olas grandes y viento fuerte (transversal)</td><td>—</td></tr>
</table></div>
<div class="key"><b>Cómo gobernar.</b> Para cortar un <b>balance</b> excesivo, <b>cambia el rumbo</b>: la causa principal es la mar de través. Para cortar la <b>cabezada</b>, <b>cambia la velocidad</b> (más o menos), porque así cambias el periodo de cabeceo. En otros rumbos, rumbo, velocidad o las dos cosas.</div>`],''')

# antes de salir
rep('<div class="panel"><h4>Plan</h4><p>Dejar dicho en tierra a dónde vas, con quién y cuándo piensas volver.</p></div>\n</div>`],',
'''<div class="panel"><h4>Plan</h4><p>Dejar dicho en tierra a dónde vas, con quién y cuándo piensas volver.</p></div>
</div>
<p>Con la náutica de recreo muy estacional y largos periodos sin usar el barco, conviene una <b>lista de comprobación</b> el primer día y buena parte de ella antes de cada salida. Muchas de las asistencias de Salvamento cada verano se evitarían así.</p>
<div class="tablewrap"><table>
<tr><th>Qué</th><th>Qué comprobar</th></tr>
<tr><td class="es">Meteorología</td><td><b>Prioridad absoluta</b>, mejor ya en casa: parte y previsión de la zona por la que vas a navegar.</td></tr>
<tr><td class="es">Sistema de gobierno</td><td>Poleas y guardines no se ven desde la bañera: revisarlos (se rompen alambres tras mucho uso con ola o en portantes). Es una avería muy frecuente. Saber dónde está la <b>caña de emergencia</b>, que se acopla directamente a la mecha, y que la tapa roscada de la mecha en cubierta esté engrasada para abrirla rápido.</td></tr>
<tr><td class="es">Aceite</td><td>Comprobar el nivel y rellenar si hace falta; el nivel máximo es la cantidad adecuada.</td></tr>
<tr><td class="es">Filtro decantador</td><td>Separa el agua del gasoil <b>por gravedad</b> (el agua, más densa, va al fondo) y retiene impurezas. El agua es el peor enemigo del motor. Su tubo de cristal muestra el nivel de agua; se purga por un grifo de fondo del vaso.</td></tr>
<tr><td class="es">Refrigeración</td><td>Líquido refrigerante en el circuito cerrado. <b>Grifo de fondo de toma de agua de mar abierto</b>: truco, al cerrarlo deja la llave de arranque colgada de su maneta. En náutica profesional se cierran todos los grifos de fondo al atracar con el motor parado.</td></tr>
<tr><td class="es">Correa del alternador</td><td>Tensión correcta: floja, resbala y no carga las baterías; muy apretada, gasta los rodamientos.</td></tr>
<tr><td class="es">Combustible</td><td>Cada día, suficiente para el plan. Quedarse sin combustible a la deriva es de las asistencias más frecuentes.</td></tr>
<tr><td class="es">Gases explosivos</td><td>Buena ventilación de sentinas y sala de máquinas (extractores). Bombonas de butano en compartimentos de la bañera aislados; revisar conductos y abrazaderas. Disolventes, pinturas y gasolina del auxiliar, en zonas ventiladas.</td></tr>
<tr><td class="es">Fugas de aceite o combustible</td><td>Revisar sentinas y cofres; secar y limpiar. En puerto está <b>prohibido achicar</b> agua de sentina con residuos.</td></tr>
<tr><td class="es">Electricidad</td><td>Carga de baterías con el <b>voltímetro</b>. Luces de navegación funcionando.</td></tr>
<tr><td class="es">VHF</td><td>Llamada de prueba al club náutico por el <b>canal 9</b> a mínima potencia (1 W), avisando «emisión en pruebas», para confirmar que se recibe «fuerte y claro».</td></tr>
<tr><td class="es">Elementos de seguridad</td><td>En buen estado: pirotecnia sin caducar, revisiones de extintores, balsa y radiobaliza. Enseñar a la tripulación dónde están, sobre todo los <b>chalecos</b>.</td></tr>
<tr><td class="es">Estanqueidad</td><td>Cerrar portillos y escotillas antes de zarpar según la mar que vayas a encontrar.</td></tr>
<tr><td class="es">Agua dulce</td><td>Una media de <b>3 litros por persona y día</b> previsto de navegación.</td></tr>
</table></div>
<p class="small muted">El patrón es el responsable absoluto del barco y de las personas. La seguridad tiene dos objetivos: evitar el accidente (barco y equipo en buen estado, revisar el material, meteorología antes y al menos una vez al día navegando, buena vigilancia) y, si ocurre, reducir sus consecuencias.</p>`],''')

# material: RD + categorias
rep('<p>El material obligatorio depende de la <b>zona de navegación</b> para la que esté despachado el barco (figura en su certificado). Con el PER puedes ir hasta 12 mn: zona 4 como máximo.</p>',
'''<p>El <b>RD 339/2021</b> (en vigor desde el 1 de julio de 2021) regula el equipo de seguridad y de prevención de la contaminación según la <b>zona de navegación</b>. Se aplica a los barcos de recreo matriculados en España y también a los de cualquier bandera que naveguen por aguas españolas si sus propietarios o usuarios residen en España (para evitar abanderamientos de conveniencia). Con el PER puedes ir hasta 12 mn: zona 4 como máximo (zonas 2 y 3 con la habilitación a Baleares).</p>
<div class="tablewrap"><table>
<tr><th>Categoría de diseño (CE)</th><th>Viento máx.</th><th>Ola máx.</th><th>Zonas</th><th>Título</th></tr>
<tr><td class="es">A · oceánica</td><td>más de fuerza 8</td><td>más de 4 m</td><td>1 (sin límite)</td><td>Capitán de yate</td></tr>
<tr><td class="es">B · alta mar</td><td>hasta fuerza 8</td><td>hasta 4 m</td><td>2 (60 mn) · 3 (25 mn)</td><td>Patrón de yate (150 mn)</td></tr>
<tr><td class="es">C · aguas costeras</td><td>hasta fuerza 6</td><td>hasta 2 m</td><td>4 (12 mn) · 5 (5 mn de un abrigo) · 6 (2 mn)</td><td>PER · PNB · licencia de navegación</td></tr>
<tr><td class="es">D · aguas protegidas</td><td>hasta fuerza 3</td><td>hasta 0,3 m</td><td>7 (puertos, rías, bahías)</td><td>—</td></tr>
</table></div>
<p class="small">La categoría de diseño (Directiva 2013/53/UE) dice qué viento y ola aguanta el barco por cómo está construido; el RD la vincula a las zonas. Un barco sin marcado CE navega en la zona que le corresponda por su equipo, pero nunca con viento u ola por encima de su categoría. El propietario o patrón responde de que el barco pueda hacerse a la mar sin peligro, de no llevar más personas de las autorizadas y de que el equipo esté certificado (RD 701/2016 de equipos marinos: homologación <b>SOLAS</b> o <b>CE</b>; la norma <b>ISO</b> también sirve para homologar algunos equipos).</p>''')

# new section after material: chalecos, arneses, aros, balsas
NEWSEC='''`],
["salvamento","Chalecos, arneses, aros y balsas",`
<h3>Chalecos salvavidas</h3>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Chalecos (100 % de las personas)</th><th>Equivale a</th></tr>
<tr><td>1</td><td><b>275 N</b> + un chaleco adicional</td><td>28,05 kgf</td></tr>
<tr><td>2–3 (Baleares) · 4 (PER)</td><td><b>150 N</b></td><td>15,3 kgf</td></tr>
<tr><td>5–6 (PNB)</td><td><b>100 N</b></td><td>10,2 kgf</td></tr>
</table></div>
<ul>
<li>Cada chaleco lleva <b>luz</b>; en zonas 4 a 7, si solo se navega de día, se puede prescindir de ella. Homologados (SOLAS o CE, aprobados por la DGMM).</li>
<li>Los <b>menores</b>, chaleco de su talla, mejor con cinchas por las piernas.</li>
<li>Deben poner boca arriba a una persona inconsciente en <b>5–10 segundos</b> y mantener la cabeza fuera del agua. La tripulación debe poder ponérselo sola en <b>menos de 1 minuto</b> (SOLAS). Estiba accesible y conocida por todos.</li>
<li>Los <b>hinchables</b> se revisan según el fabricante, en estaciones de servicio autorizadas.</li>
<li>1 newton ≈ 0,102 kilogramos-fuerza (kilopondio).</li>
</ul>
<h3>Arnés de seguridad</h3>
<p>No es obligatorio, pero es tan importante como el chaleco: el chaleco te mantiene a flote; el arnés evita que caigas al agua o que quedes separado del barco. Cinchas con una hebilla a la que va un cabo con mosquetones (los hay dobles, corto y largo, o integrados en el chaleco o el traje de agua). Se engancha a <b>puntos muy fuertes</b> o a <b>líneas de vida</b> de proa a popa por ambas bandas. Riesgo: ahogarse arrastrado si caes; se evita usando el tramo corto y no estando solo en cubierta. Nunca salir de la bañera solo, o sin avisar al compañero de guardia. Se estiba junto a los chalecos y se pone de noche o con mal tiempo.</p>
<h3>Aros salvavidas</h3>
<ul>
<li>Aro o herradura de polietileno <b>naranja</b>, con <b>luz</b> y <b>rabiza</b> flotante de polipropileno de al menos <b>30 m</b> (flota, sirve de asidero y no se enreda en la hélice). Conviene una bobina para que salga sin enredos.</li>
<li>Estibado a <b>popa</b>, con desestiba rápida. La luz es autoadrizable por el peso de las pilas: de noche es la principal guía para el rescate.</li>
<li>Zonas 1 a 4: un aro con luz y rabiza; en zona 1, además, otro aro sin luz ni rabiza. Zonas 5–6: no obligatorio.</li>
<li>Útiles: pértiga IOR extensible con bandera, y un respondedor de radar (<b>SART</b>) en el aro, que localiza náufragos y balsas.</li>
</ul>
<h3>Balsa salvavidas</h3>
<p>Obligatoria en <b>zonas 1, 2 y 3</b>, para todas las personas autorizadas a bordo; sus datos figuran en el certificado de navegabilidad. Revisión según el fabricante (barcos sin fines lucrativos, lista 7.ª) o cada <b>24 meses</b> como máximo (uso comercial, lista 6.ª); la primera, siempre en una estación autorizada.</p>
<div class="grid2">
<div class="panel"><h4>Equipo</h4><ul><li>Luz de litio (≈12 h)</li><li>Doble cámara de flotación y doble fondo aislante</li><li>Bolsas estabilizadoras (evitan el vuelco)</li><li>Ancla flotante</li><li>Escalera y rampa de acceso</li><li>Disparo: tú haces el 10 % y el gas el 90 %; puede dispararla un niño</li><li>Temperatura de hinchado adecuada a la zona</li></ul></div>
<div class="panel"><h4>Prestaciones</h4><ul><li>Rampa que aguanta 100 kg; escala con el peldaño inferior a ≥0,40 m bajo la flotación</li><li>Una persona puede adrizarla volcada</li><li>Remolcable a 3 nudos con carga completa</li><li>30 días a la intemperie</li><li>Toldo automático; dos entradas si es de más de 8 personas</li><li>Recoge agua de lluvia; soporte para respondedor de radar a 1 m</li><li>Si falla una cámara, el resto mantiene a flote a todos (75 kg por persona)</li><li>Se hincha en ≤1 min a 18–20 °C</li><li>Capacidad mínima: 4 personas (ISO) o 6 (SOLAS)</li></ul></div>
</div>`],
["maltiempo","Mal tiempo, niebla y tormentas",`'''
rep('''`],
["maltiempo","Mal tiempo, niebla y tormentas",`''',NEWSEC)

# mal tiempo additions: insert after figure, before <ul>
rep('''<li><span class="es">Capear</span>: recibir la mar por la proa, ligeramente abierta (1–2 cuartas), con la mínima máquina que permita gobernar. Es la forma más segura de aguantar un temporal.</li>
<li><span class="es">Correr el temporal</span>: con la mar por la popa. Se avanza rápido, pero hay riesgo de que el barco <b>se atraviese</b> a la mar y de embarcar olas por la popa.</li>
<li>Nunca recibir la mar de través: es la situación de mayor riesgo de vuelco.</li>''',
'''<li>Si el parte anuncia mal tiempo, la mejor decisión es <b>no salir</b>.</li>
<li><span class="es">Capear</span>: aguantar el temporal amurado a la mar, por la proa ligeramente abierta (1–2 cuartas). A motor, con poca pero suficiente máquina para gobernar: los pantocazos son más suaves y se embarca menos agua. A vela, con la <b>mayor de capa</b>, amurado al viento y la ola, abatiendo sin avanzar; un velero solo capea si mar y viento le impiden avanzar con seguridad hacia donde quiere.</li>
<li><span class="es">Correr el temporal</span>: cuando ya no se puede mantener la proa a la mar, navegar de <b>aleta o popa</b>, avanzando con el oleaje y el viento. Hay riesgo de que el barco <b>se atraviese</b>: evitar las <b>guiñadas</b> y, si hace falta, largar cabos por la popa para frenarlo.</li>
<li><b>Nunca atravesarse a la mar</b>: es la máxima exposición. Olas de temporal de 4 m o más rompiendo en el costado pueden volcar el barco. Para dar la vuelta y poner la popa al temporal, hacerlo lo más rápido posible y aprovechando una <b>recalmada</b>.</li>
<li><span class="es">Ancla de capa</span>: saco de lona troncocónico con un aro de refuerzo (flotador arriba y lastre abajo para que quede vertical y sumergido), cuatro <b>pernadas</b> que acaban en una gaza para el cabo y una abertura en el vértice por donde sale el agua. Frena el barco con la proa o la popa a la mar y evita que se atraviese.</li>
<li><span class="es">Estiba y trinca a son de mar</span>: <b>estiba</b> es colocar ordenadamente enseres y víveres. Con mal tiempo, buscando la máxima estabilidad transversal y longitudinal, todo bien <b>trincado</b> (atado) y sin dejar cosas «empachadas» (que haya que mover otras para sacarlas). «A son de mar» = estibar, trincar y <b>arranchar</b> (limpiar y ordenar) con criterio.</li>
<li><b>Aberturas</b>: cerrar herméticamente portillos, escotillas y lumbreras (las de la sala de máquinas, según el tiempo, porque ventilan gases). Manguerotes con la boca a sotavento o directamente tapados (<b>censurados</b>). <b>Grifos de fondo cerrados</b> salvo los que estén trabajando (refrigeración del motor): aseos, fregaderos y achiques, cerrados.</li>
<li><span class="es">Derrota</span>: ruta para ir de un lugar a otro. Trazarla antes de zarpar, analizando peligros y distancia a la costa, dándoles resguardo y teniendo en cuenta corriente y viento.</li>
<li><b>Costa a sotavento</b>: evitarla. Si una avería te deja a la deriva hacia ella, orienta el barco para abatir menos (con bichero, remos, aletas…), fondea aunque el ancla no toque fondo para aproarte y frenar el abatimiento esperando que agarre, y pide auxilio por radio antes de que sea tarde.</li>''')
rep('<li><b>Niebla</b>: velocidad de seguridad, señales acústicas, vigía en proa, luces de navegación encendidas, radar si hay, reflector de radar izado y escucha en VHF.</li>\n<li><b>Tormenta eléctrica</b>: desconectar la electrónica, no tocar partes metálicas y, al acabar, comprobar la aguja (puede haberse desviado).</li>\n<li><b>Aguas someras</b>: el barco «se sienta» (asentamiento), gobierna peor y aumenta el calado efectivo. Reducir velocidad.</li>\n</ul>',
'''<li><b>Tormenta eléctrica</b>: si todos los equipos tienen <b>toma de masa</b>, la descarga va al mar sin daños. Aun así, desconectar la electrónica y no tocar partes metálicas. En barcos de fibra y sobre todo de madera conviene un <b>pararrayos</b> en el tope del palo, o unir un obenque a masa con un cable al agua. Al acabar, comprobar el <b>desvío de la aguja</b>.</li>
</ul>`],
["visibilidad","Niebla, noche, tráfico y aguas someras",`
<p>La <b>visibilidad reducida</b> la causan niebla, lluvia, granizo o tormentas de arena. La <b>noche no</b> es visibilidad reducida, aunque es un agravante porque no se ven los perfiles de la costa. Con niebla la humedad es total, la procedencia de los sonidos se distorsiona y, sin radar, la tensión es máxima: es el <b>enemigo número uno</b> del marino.</p>
<div class="grid2">
<div class="panel"><h4>Con niebla</h4><ul><li>El mayor peligro es el <b>abordaje</b>, y el barco de recreo tiene las de perder.</li><li>Luces de navegación, señales fónicas reglamentarias, radar si lo hay.</li><li>Extremar la vigilancia y <b>reducir la velocidad</b>.</li><li>Al verla venir, asegurar la situación y trazar una derrota lejos de la costa y los peligros.</li><li>Suele pegarse a la costa y altera el color de las luces y la dirección de los sonidos.</li></ul></div>
<div class="panel"><h4>De noche</h4><ul><li>Vigilancia de los 360° del horizonte cada <b>≈5 minutos</b>: un mercante a 15 nudos visto a unas 5 mn puede estar encima en unos 15 minutos.</li><li>Guardia con <b>arnés</b>; no salir de la bañera sin estar atado y sin otro tripulante presente.</li><li>No dormirse; maniobra clara (cabos ordenados y sin cocas).</li><li>Navegación precisa, sabiendo siempre dónde estás.</li><li>Si un buque en rumbo de colisión no cambia su rumbo, llamarle por el <b>canal 16</b>.</li></ul></div>
</div>
<p><span class="es">Reflector de radar</span>: en lo más alto posible, da buen eco en los radares de otros barcos. Según el manual, obligatorio en barcos de casco <b>no metálico</b> en zonas 1 a 4, y muy aconsejable en todos. El clásico son tres láminas metálicas perpendiculares (ocho triedros); hoy los hay cilíndricos, igual de eficaces.</p>
<p><b>Tráfico marítimo</b>: se concentra en recaladas, entradas de puertos, canales, estrechos y cabos. Mantenerse lejos de las rutas, evitar los <b>dispositivos de separación de tráfico</b> usando la zona de navegación costera, vigilar los 360° y cumplir el RIPA sabiendo que tienes las de perder.</p>
<h3>Aguas someras</h3>
<p>Aguas poco profundas en las que puedes varar sin querer. Técnicamente, cuando la profundidad es <b>menor que la mitad de la longitud de la ola</b>. El barco «se sienta» (asentamiento), gobierna peor y aumenta su calado efectivo.</p>
<ol>
<li>Reducir la velocidad, más cuanto menos fondo.</li>
<li>Estudiar la carta y localizar bajos y piedras que velan.</li>
<li>Sonda encendida y un tripulante «cantando» las profundidades.</li>
<li>Marcar en la carta un <b>veril de seguridad</b> que no se cruce, y demoras de seguridad.</li>
<li>Tener lista la maniobra de fondeo.</li>
<li>Un vigía en lo más alto (el palo en un velero) buscando bajos, rompientes o cambios de color del agua.</li>
</ol>'''.replace("\n</ul>`],\n[\"visibilidad\"","\n</ul>`],\n[\"visibilidad\""))

QS=r'''PER.Q.push(
/* ---- 3 Seguridad (manual propio, tema 3, 1.ª parte) ---- */
["seg","La estabilidad es la propiedad del barco de…",["Navegar sin escorar nunca","Recuperar su equilibrio inicial cuando lo pierde por causas externas","Mantener el rumbo","Flotar con cualquier carga"],1,"Viento o mar lo sacan del equilibrio; la estabilidad lo devuelve."],
["seg","El periodo de balance es el tiempo que tarda el barco en…",["Dar una vuelta completa","Pasar de estar inclinado a una banda a estarlo los mismos grados a la otra","Recuperar el asiento","Subir una ola"],1,"Definición de periodo de balance."],
["seg","Si el periodo de balance del barco coincide con el de la ola se produce…",["Arrufo","Sincronismo transversal","Pantocazo","Asiento"],1,"La amplitud del balance crece y puede volcar."],
["seg","El golpe violento de la parte delantera de la obra viva contra el agua al cabecear es un…",["Balance","Pantocazo","Garreo","Sincronismo"],1,"Pantocazo."],
["seg","La pérdida de estabilidad transversal se manifiesta con…",["Cabeceo","Balance y escora","Cambio del asiento","Arrufo"],1,"La longitudinal, con cabeceo y cambios de asiento."],
["seg","El par de estabilidad lo forman…",["El viento y la mar","El peso del barco y el empuje del agua","La quilla y el timón","La escora y el asiento"],1,"Peso en G hacia abajo, empuje en C hacia arriba."],
["seg","La estabilidad estática inicial es la que se estudia para escoras…",["Menores de 10°","Entre 10° y 30°","Mayores de 45°","De cualquier valor"],0,"Más de 10°: grandes inclinaciones."],
["seg","Un barco duro…",["Es poco estable y cómodo","Es muy estable y recupera la escora de forma brusca","Tiende a volcar con mar fuerte","No tiene quilla"],1,"Barco blando: menos estable, balances lentos, cómodo."],
["seg","Para reducir un balance excesivo, lo más eficaz es…",["Aumentar la velocidad","Cambiar el rumbo","Fondear","Arriar las velas"],1,"La mar de través es la principal causa del balance."],
["seg","Para romper una cabezada excesiva, lo más eficaz es…",["Cambiar la velocidad","Meter timón a una banda","Llenar los tanques","Abrir los portillos"],0,"Cambiando la velocidad cambias el periodo de cabeceo."],
["seg","Para hacer una llamada de prueba con el VHF se usa el canal…",["16","9 a mínima potencia (1 W)","70","72 a máxima potencia"],1,"Avisando «emisión en pruebas» y pidiendo si se recibe «fuerte y claro»."],
["seg","El filtro decantador separa el agua del gasoil…",["Por centrifugado","Por gravedad, porque el agua es más densa","Con un imán","Calentando el combustible"],1,"El agua se va al fondo del vaso."],
["seg","Una correa del alternador demasiado floja…",["Gasta los rodamientos","Resbala y no carga las baterías","Sobrecalienta el motor","No tiene efectos"],1,"Demasiado apretada, gasta los rodamientos."],
["seg","El nivel de carga de las baterías se controla con el…",["Amperímetro de la hélice","Voltímetro","Barómetro","Manómetro"],1,"Voltímetro."],
["seg","Las bombonas de butano deben ir…",["En la cocina, bajo cubierta","En compartimentos de la bañera aislados","En la sentina","En el pañol de proa"],1,"El gas pesa más que el aire y se acumula abajo."],
["seg","En puerto, achicar agua de sentina con restos de aceite o combustible…",["Está permitido de noche","Está totalmente prohibido","Se permite con bomba manual","Se permite si es poca cantidad"],1,"Hay que secar y limpiar las fugas."],
["seg","La cantidad de agua dulce recomendada es…",["1 litro por persona y día","3 litros por persona y día de navegación","5 litros por barco","10 litros por persona"],1,"Una media de 3 L por persona y día previsto."],
["seg","Si el parte meteorológico anuncia mal tiempo, la mejor decisión es…",["Salir con chalecos puestos","No salir","Salir solo hasta 2 mn","Salir de noche"],1,"La mejor decisión del patrón."],
["seg","«Arranchar» significa…",["Fondear","Limpiar y ordenar","Atar","Achicar"],1,"Estibar, trincar y arranchar a son de mar."],
["seg","Con mal tiempo, la boca de los manguerotes se orienta…",["A barlovento","A sotavento o se tapa (censura)","Hacia proa","Hacia arriba"],1,"Así no entra agua."],
["seg","Con mal tiempo, los grifos de fondo…",["Se abren todos","Se cierran salvo los que trabajan, como la refrigeración del motor","Se cierran todos, incluida la refrigeración","No importan"],1,"Aseos, fregaderos y achiques, cerrados."],
["seg","Capear el temporal a motor consiste en…",["Ir a toda máquina con la mar de popa","Aguantar proa a la mar con poca pero suficiente máquina para gobernar","Parar el motor","Poner la mar de través"],1,"Pantocazos más suaves y menos agua embarcada."],
["seg","Un velero capea el temporal con…",["Spinnaker","La mayor de capa, amurado y abatiendo sin avanzar","Todo el trapo","Solo el motor"],1,"Mayor de capa."],
["seg","Al correr un temporal hay que evitar sobre todo…",["Ir despacio","Dar guiñadas que atraviesen el barco","Llevar chalecos","Largar cabos por popa"],1,"Largar cabos por popa ayuda a frenar y evita atravesarse."],
["seg","El ancla de capa sirve para…",["Fondear en mucha profundidad","Frenar el barco y evitar que se atraviese a la mar","Sustituir al ancla principal","Medir la corriente"],1,"Saco troncocónico de lona con pernadas."],
["seg","Si una avería te deja a la deriva hacia una costa a sotavento, puedes…",["Esperar a que cambie el viento","Fondear aunque el ancla no toque fondo, para aproarte y abatir menos","Poner la mar de través","Apagar las luces"],1,"Y pedir auxilio por radio antes de que sea tarde."],
["seg","Para proteger un barco de madera de los rayos conviene…",["Desconectar la batería solo","Un pararrayos en el tope del palo u obenque unido a masa con un cable al agua","Bajar el palo","Navegar más rápido"],1,"Tras la tormenta, comprobar la aguja."],
["seg","¿Cuál NO se considera causa de visibilidad reducida?",["Niebla","Granizo","La noche","Tormenta de arena"],2,"La noche es un agravante, pero no es visibilidad reducida."],
["seg","Las nieblas suelen…",["Formarse lejos de la costa","Pegarse a la costa y distorsionar luces y sonidos","Mejorar la propagación del sonido","Durar menos de 5 minutos"],1,"Por eso con niebla conviene alejarse de la costa."],
["seg","De noche, la vigilancia de los 360° debe hacerse cada…",["Hora","5 minutos aproximadamente","30 minutos","Cuarto de guardia"],1,"15 minutos pueden bastar para un abordaje."],
["seg","El reflector de radar clásico está formado por…",["Una esfera metálica","Tres láminas perpendiculares que forman ocho triedros","Un cilindro de plástico","Una antena"],1,"Hoy también los hay cilíndricos."],
["seg","Técnicamente, son aguas someras aquellas cuya profundidad es menor que…",["El calado","La mitad de la longitud de la ola","10 m","El doble de la eslora"],1,"Definición técnica."],
["seg","Al navegar en aguas someras NO es una precaución…",["Reducir la velocidad","Fijar un veril de seguridad","Tener lista la maniobra de fondeo","Aumentar la velocidad para gobernar mejor"],3,"Hay que reducir más cuanto menos fondo."],
["seg","El RD 339/2021 se aplica a barcos de bandera extranjera en aguas españolas cuando…",["Nunca","Sus propietarios o usuarios residen en España","Miden más de 24 m","Navegan de noche"],1,"Para evitar abanderamientos de conveniencia."],
["seg","La categoría de diseño C corresponde a…",["Navegación oceánica","Aguas costeras, hasta fuerza 6 y olas de 2 m","Aguas protegidas","Alta mar"],1,"A oceánica, B alta mar, C costeras, D protegidas."],
["seg","Un barco de categoría de diseño B aguanta como máximo…",["Fuerza 3 y 0,3 m","Fuerza 6 y 2 m","Fuerza 8 y 4 m","Sin límite"],2,"La A, por encima."],
["seg","En zona 4 (PER), la flotabilidad mínima de los chalecos es…",["100 N","150 N","275 N","50 N"],1,"Zona 1: 275 N; zonas 2–4: 150 N; zonas 5–6: 100 N."],
["seg","En zona 1 hay que llevar, además de un chaleco por persona…",["Un chaleco adicional","Dos aros con luz","Una segunda balsa","Nada más"],0,"Y de 275 N."],
["seg","La luz del chaleco puede omitirse en…",["Zonas 1 a 3","Zonas 4 a 7 si solo se navega de día","Cualquier zona de día","Nunca"],1,"En zonas 1–3 es siempre obligatoria."],
["seg","Un chaleco debe poner boca arriba a una persona inconsciente en…",["1 minuto","5–10 segundos","30 segundos","2 minutos"],1,"Y la tripulación debe ponérselo en menos de 1 minuto."],
["seg","150 newtons equivalen aproximadamente a…",["15,3 kgf","1,5 kgf","150 kgf","28 kgf"],0,"1 N ≈ 0,102 kgf."],
["seg","Sobre el arnés de seguridad es cierto que…",["Es obligatorio en zona 4","No es obligatorio, pero evita caer al agua o separarse del barco","Sustituye al chaleco","Solo se usa en puerto"],1,"Se engancha a puntos fuertes o líneas de vida."],
["seg","La rabiza del aro salvavidas debe medir al menos…",["10 m","30 m","50 m","5 m"],1,"De polipropileno, flotante."],
["seg","La rabiza del aro es de polipropileno porque…",["Es más barata","Flota y no se enreda en la hélice","Es elástica","No se pudre"],1,"Además sirve de asidero inicial al náufrago."],
["seg","En zona 1, los aros salvavidas obligatorios son…",["Uno con luz y rabiza","Dos: uno con luz y rabiza y otro sin ellas","Ninguno","Tres"],1,"Zonas 2–4: uno con luz y rabiza; 5–6: ninguno."],
["seg","El SART es…",["Un tipo de bengala","Un respondedor de radar para localizar balsas y náufragos","Un chaleco","Un ancla flotante"],1,"Search and Rescue Transponder."],
["seg","La balsa salvavidas es obligatoria en…",["Todas las zonas","Zonas 1, 2 y 3","Solo zona 1","Zonas 4 a 7"],1,"Para todas las personas autorizadas a bordo."],
["seg","En barcos de recreo con fines comerciales (lista 6.ª), la balsa se revisa como máximo cada…",["12 meses","24 meses","36 meses","5 años"],1,"Sin fines lucrativos (lista 7.ª), según el fabricante."],
["seg","Las bolsas estabilizadoras de la balsa sirven para…",["Guardar víveres","Evitar el vuelco con mala mar","Recoger agua de lluvia","Hinchar el toldo"],1,"Todas las balsas homologadas las llevan."],
["seg","Una balsa salvavidas, una vez a flote, resiste a la intemperie…",["24 horas","7 días","30 días","1 año"],2,"En cualquier estado de mar."],
["seg","Una balsa de más de 8 personas tendrá…",["Una sola entrada","Dos entradas diametralmente opuestas","Motor","Dos toldos"],1,"Prestaciones de la balsa."],
["seg","El inflado completo de la balsa, a 18–20 °C, tarda como máximo…",["10 segundos","1 minuto","5 minutos","15 minutos"],1,"La temperatura de hinchado debe ser compatible con la zona."],
["seg","La capacidad mínima de una balsa con homologación SOLAS es de…",["2 personas","4 personas","6 personas","8 personas"],2,"Con homologación ISO, 4."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
rep('{z:1,lim:"Navegación ilimitada"','{z:1,lim:"Navegación ilimitada"')
open(dst,"w",encoding="utf-8").write(s); print("ok")
