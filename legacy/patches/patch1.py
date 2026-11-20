import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
n=0
def rep(old,new,count=1):
    global s,n
    c=s.count(old)
    assert c==count, (c,old[:80])
    s=s.replace(old,new); n+=1

# --- Direcciones table: costado/amura/través/aleta per manual + socaire + escora terms
rep('<tr><td class="es">Amura</td><td>Parte del costado que se curva hacia proa (≈45° de la proa)</td></tr>',
'<tr><td class="es">Costados</td><td>Cada una de las dos caras laterales exteriores del casco, de proa a popa. Cada costado tiene amura, través y aleta.</td></tr>\n<tr><td class="es">Amura</td><td>Tramo del costado entre el través y la proa (como dirección, ≈45° de la proa)</td></tr>')
rep('<tr><td class="es">Través</td><td>Perpendicular a la crujía (90°). «Tener un barco por el través».</td></tr>',
'<tr><td class="es">Través</td><td>Parte central del costado en sentido longitudinal. Como dirección, perpendicular a la crujía (90°): «tener un barco por el través».</td></tr>')
rep('<tr><td class="es">Aleta</td><td>Parte del costado que se curva hacia popa (≈135°)</td></tr>\n<tr><td class="es">Costado</td><td>Cada lado del casco entre amura y aleta</td></tr>',
'<tr><td class="es">Aleta</td><td>Tramo del costado entre el través y la popa, donde los costados se juntan (como dirección, ≈135°)</td></tr>')
rep('<tr><td class="es">Barlovento / sotavento</td><td>Lado por donde viene el viento / lado contrario, hacia donde va</td></tr>',
'<tr><td class="es">Barlovento / sotavento</td><td>Lado por donde viene el viento / lado contrario, hacia donde va</td></tr>\n<tr><td class="es">Socaire</td><td>Zona resguardada a la que no llega el viento (detrás de un cabo, de un muro…). No es lo mismo que sotavento.</td></tr>\n<tr><td class="es">Escorar · adrizar</td><td>Escorar: inclinarse hacia una banda (pesos mal repartidos, viento u ola). Adrizar: volver a la posición derecha.</td></tr>\n<tr><td class="es">Balanceo</td><td>Movimiento de vaivén de una banda a otra (babor ↔ estribor)</td></tr>')
rep('La <span class="es">línea de crujía</span> divide el barco en dos bandas.</p>',
'La <span class="es">línea (y plano) de crujía</span> divide el barco de proa a popa en dos mitades simétricas: las <b>bandas</b> de babor y estribor. Ojo: si miras el barco <i>desde proa</i>, su babor queda a tu derecha.</p>')

# --- Estructura
rep('<figcaption>Sección transversal: el «esqueleto» del barco.</figcaption></figure>',
'<figcaption>Sección transversal: el «esqueleto» del barco.</figcaption></figure>\n<p><span class="es">Casco</span>: el cuerpo del barco, sin contar arboladura (palos y jarcia), máquinas ni superestructuras. Puede ser <b>monocasco</b> o <b>multicasco</b>: catamarán (dos cascos) o trimarán (uno central y dos laterales que le dan estabilidad).</p>')
rep('<tr><td class="es">Cuadernas</td><td>Piezas curvas transversales que dan forma al casco (costillas)</td></tr>',
'<tr><td class="es">Quilla</td><td style="display:none"></td></tr>'.replace('<tr><td class="es">Quilla</td><td style="display:none"></td></tr>','')+'<tr><td class="es">Cuadernas</td><td>Piezas transversales y simétricas que salen de la quilla hacia cada banda y suben por los costados (costillas)</td></tr>')
rep('<tr><td class="es">Roda · codaste</td><td>Prolongación de la quilla a proa · a popa</td></tr>',
'<tr><td class="es">Roda · codaste</td><td>Pieza robusta, recta o curva, que sube desde la quilla y cierra el casco a proa · pieza que cierra la popa; en barcos pequeños y veleros clásicos sujeta el timón</td></tr>')
rep('<tr><td class="es">Plan</td><td>Parte inferior, casi plana, del fondo</td></tr>',
'<tr><td class="es">Plan</td><td>Superficie horizontal interior más baja del casco: el «suelo» del barco</td></tr>\n<tr><td class="es">Bombas de achique</td><td>Sacan el agua de la sentina. Además de las eléctricas conviene llevar una <b>manual</b> (aspira en la sentina, se acciona desde la bañera y descarga por el costado sobre la flotación).</td></tr>\n<tr><td class="es">Grifos de fondo</td><td>Válvulas de mar bajo la flotación que dan o cortan el agua de refrigeración del motor, aseos, cocina… Abrir solo cuando haga falta y mantener limpios. Van roscados a los <b>pasacascos</b>, piezas que atraviesan el casco.</td></tr>')
rep('<tr><td class="es">Mamparos</td><td>Tabiques que dividen el interior. Los <b>estancos</b> dan seguridad; el de proa es el <b>de colisión</b>.</td></tr>',
'<tr><td class="es">Mamparos</td><td>Separaciones verticales (transversales o longitudinales) del interior: las «paredes». Los <b>estancos</b> dan seguridad; el de proa es el <b>de colisión</b>.</td></tr>')
rep('<tr><td class="es">Pantoque</td><td>Zona curva de unión entre el fondo y el costado</td></tr>\n</table></div>`],',
'<tr><td class="es">Pantoque</td><td>Zona curva de unión entre el fondo y el costado</td></tr>\n</table></div>\n<div class="key"><b>Para el examen.</b> La estructura la forman <b>quilla + roda + codaste + cuadernas + baos</b>. Los grifos de fondo y la bocina son puntos por donde puede entrar agua: revísalos.</div>`],')

# --- Dimensiones
rep('<li><span class="es">Eslora</span>: longitud de proa a popa. La <i>eslora total</i> es la máxima; la de flotación, la medida en el agua.</li>\n<li><span class="es">Manga</span>: anchura máxima.</li>\n<li><span class="es">Puntal</span>: altura desde la quilla hasta la cubierta.</li>\n<li><span class="es">Calado</span>: profundidad de la parte sumergida (de la flotación a la quilla). Lo que necesitas saber para no varar.</li>\n<li><span class="es">Francobordo</span>: altura de la flotación a la cubierta. Más francobordo, más reserva de flotabilidad.</li>',
'<li><span class="es">Eslora máxima</span>: distancia entre la parte más saliente de proa y la de popa, medida paralela a la flotación de diseño. Incluye las partes estructurales y la unión casco-cubierta; <b>excluye el púlpito</b> (se mide desde donde la cubierta corta la roda) y las piezas desmontables sin romper nada. Es la que figura en la documentación oficial. Para amarrar en puerto, en cambio, cuenta la <b>mayor longitud ocupacional</b> (con todo lo que sobresalga). La eslora de flotación es la medida en el agua.</li>\n<li><span class="es">Manga máxima</span>: anchura máxima con las estructuras fijas, medida por fuera de los forros (el revestimiento del casco).</li>\n<li><span class="es">Puntal</span>: altura máxima medida a media eslora, desde la línea de cubierta hasta el canto superior de la quilla.</li>\n<li><span class="es">Calado</span>: distancia vertical del canto inferior de la quilla a la flotación (altura de la obra viva). Lo que necesitas saber para no varar. Hay calado <b>a proa</b>, <b>a popa</b> y <b>en el medio</b>; no confundir con el <b>calado medio</b> = (Cpr + Cpp) / 2.</li>\n<li><span class="es">Francobordo</span>: altura del costado desde la flotación, con máxima carga, hasta la cubierta estanca más alta, es decir, la altura de la obra muerta. Más francobordo, más reserva de flotabilidad.</li>\n<li><span class="es">Desplazamiento máximo</span>: peso del barco con la máxima carga segura de tripulantes, equipaje y carga. Se da en toneladas métricas.</li>')
rep('<p class="small muted">Asiento = calado de popa − calado de proa.',
'<p class="small muted">Ejemplo: Cpr 1,5 m y Cpp 1,9 m → calado medio (1,5 + 1,9)/2 = 1,7 m; asiento 1,9 − 1,5 = +0,4 m (apopado). Asiento = calado de popa − calado de proa.')
rep('$("#asTxt",root).innerHTML=`Asiento = ',
'$("#asTxt",root).innerHTML=`Calado medio = (${a.toFixed(2)} + ${b.toFixed(2)}) / 2 = <b>${((a+b)/2).toFixed(2)} m</b><br>Asiento = ')
rep('Cero: en <b>aguas iguales</b>.','Cero: en <b>aguas iguales</b>. Conviene adaptar el asiento al estado de la mar.')

# --- Cubierta
rep('<tr><td class="es">Escotilla</td><td>Abertura en cubierta para pasar personas o carga</td></tr>\n<tr><td class="es">Lumbrera</td><td>Abertura en cubierta para dar luz y ventilación</td></tr>\n<tr><td class="es">Portillo</td><td>Ventana (normalmente redonda) en el costado o la superestructura</td></tr>\n<tr><td class="es">Imbornales</td><td>Agujeros de desagüe de la cubierta y la bañera. Se tapan al repostar para que no salga combustible al mar.</td></tr>',
'<tr><td class="es">Cubierta</td><td>Pieza horizontal que cierra el casco por arriba; se fabrica aparte y se une al casco</td></tr>\n<tr><td class="es">Escotilla</td><td>Abertura en cubierta, normalmente rectangular, que comunica los distintos departamentos del barco</td></tr>\n<tr><td class="es">Escotilla principal</td><td>La de acceso de la tripulación al interior, con escalera. Suele estar junto a la bañera.</td></tr>\n<tr><td class="es">Lumbrera</td><td>Abertura en cubierta, cerrada con cristal, solo para dar luz y ventilación a las cámaras</td></tr>\n<tr><td class="es">Portillos y tragaluces</td><td>Aberturas, normalmente redondas, en los costados para dar luz y ventilación</td></tr>\n<tr><td class="es">Manguerotes</td><td>Tubos verticales de fibra o acero para ventilar. Si puede entrar agua de lluvia o de mar, se orienta la boca <b>a sotavento</b>.</td></tr>\n<tr><td class="es">Bañera</td><td>Zona abierta desde donde se gobierna (caña o rueda) y se maneja la maniobra. Debe ser <b>autoachicable</b>.</td></tr>\n<tr><td class="es">Imbornales</td><td>Orificios de desagüe de la bañera, y a la altura del trancanil para la cubierta. Siempre limpios. Se tapan al repostar para que no salga combustible al mar.</td></tr>')
rep('<tr><td class="es">Regala / borda</td><td>Parte superior del costado, donde se une con la cubierta</td></tr>',
'<tr><td class="es">Borda / regala</td><td>Canto superior del costado (la regala es la parte de arriba de la borda). Se usan como sinónimos.</td></tr>\n<tr><td class="es">Pasamanos</td><td>Asideros de madera o inox sobre cubierta para sujetarse al moverse por ella</td></tr>')
rep('<tr><td class="es">Gateras / guías</td><td>Piezas por donde pasan los cabos para que no rocen</td></tr>',
'<tr><td class="es">Gateras / guías</td><td>Piezas por donde pasan los cabos para que no rocen. En el fondeo, la <b>gatera</b> es el orificio de cubierta por el que la cadena baja a la caja de cadenas.</td></tr>')
rep('</table></div>`],\n["timon","Timón y hélice",',
'</table></div>\n<div class="key"><b>Recuerda.</b> Portillos, escotillas y lumbreras deben cerrar <b>herméticamente</b> para que no entre agua de lluvia ni de los golpes de mar.</div>`],\n["timon","Timón y hélice",')

# --- Timón y hélice
rep('<li>Motores: <b>intraborda</b>',
'''<li><b>Pala</b> del timón: si gira sobre su borde de proa es <b>timón ordinario</b> (más sensible, pero más duro); si gira sobre un eje más o menos centrado es <b>timón compensado</b> (más suave y algo menos sensible). Con fueraborda o dentro-fueraborda no hay pala: gobierna la cola del motor.</li>
<li>La <b>mecha</b> une la pala con la caña o rueda y pasa por la <b>limera</b>. Con rueda, los cables y poleas que llevan el movimiento a la pala son los <b>guardines</b>.</li>
<li>Partes de la hélice: <b>núcleo</b> (se rosca al eje), <b>palas</b> y <b>capacete</b> (pieza cónica que cubre el núcleo, con pasador de seguridad para que la hélice no se suelte). <b>Diámetro</b>: el del círculo que describen las palas.</li>
<li><b>Hélices gemelas de giro al exterior</b>: con dos motores, la dextrógira va a <b>estribor</b> y la levógira a <b>babor</b>; sus efectos laterales se anulan.</li>
<li><b>Hélice de paso variable (reversible)</b>: orienta las palas para ir avante, atrás o quedarse sin empuje, siempre girando en el mismo sentido; el motor no lleva inversora. <b>Hélice abatible o plegable</b> («pico de pato»): en veleros, se pliega al navegar a vela y se abre por fuerza centrífuga.</li>
<li><b>Hélice de proa</b>: empuja la proa a una banda en el atraque. Habitual por encima de 15 m de eslora y cada vez más en barcos de más de 9 m.</li>
<li>Según su uso: hélice <b>de velocidad</b> (mucho paso y poco diámetro, típica de fuerabordas) o <b>de arrastre</b> (poco paso y mucho diámetro, barcos de gran desplazamiento).</li>
<li>La <b>bocina</b> recubre el orificio por donde sale el eje: hay que revisarla periódicamente, porque un golpe en la hélice o una red enganchada pueden abrir una vía de agua rápida.</li>
<li>Motores: <b>intraborda</b>''')
rep('<p>Catamarán (dos cascos) o trimarán (tres). Estabilidad de forma, poca escora.</p>',
'<p>Catamarán (dos cascos) o trimarán (uno central y dos laterales que aseguran la estabilidad). Estabilidad de forma, poca escora.</p>')

# --- Tema 2 fondeo
rep('<tr><td class="es">Molinete</td><td>Máquina para virar (subir) la cadena; eje <b>horizontal</b></td></tr>',
'<tr><td class="es">Molinete (chigre)</td><td>Máquina eléctrica para virar (subir) la cadena; eje <b>horizontal</b></td></tr>')
rep('<tr><td class="es">Barbotén</td><td>Corona del molinete con huecos donde encajan los eslabones</td></tr>',
'<tr><td class="es">Barbotén</td><td>Corona del molinete con huecos donde encajan los eslabones: la pieza clave para virar cadena</td></tr>\n<tr><td class="es">Cabirón</td><td>Tambor liso en el otro extremo del eje del molinete, para virar un cabo (fondeo o atraque)</td></tr>\n<tr><td class="es">Embrague · freno</td><td>El embrague acopla o suelta el barbotén del eje del motor; el freno bloquea el barbotén</td></tr>')
rep('<tr><td class="es">Caja de cadenas</td><td>Pañol donde se estiba la cadena</td></tr>',
'<tr><td class="es">Caja de cadenas («pozo de anclas»)</td><td>Compartimento bajo cubierta, normalmente a proa, donde se estiba la línea de fondeo y se hace firme su chicote</td></tr>\n<tr><td class="es">Gatera</td><td>Orificio de cubierta por el que pasa la cadena o el cabo hacia la caja</td></tr>')
rep('<tr><td class="es">Grillete</td><td>Pieza en U con perno que une ancla y cadena. También es una medida de cadena (27,5 m)</td></tr>',
'<tr><td class="es">Grillete</td><td>Pieza en U con perno que une ancla y cadena. También es una medida de cadena (27,5 m)</td></tr>\n<tr><td class="es">Grillete de unión (giratorio)</td><td>Une cadena y ancla dejando girar el ancla sin retorcer la cadena; ayuda a que el ancla entre bien en la puntera</td></tr>\n<tr><td class="es">Puntera</td><td>Pieza de proa por la que corren la cadena y la caña del ancla al empezar y acabar el fondeo</td></tr>')
rep('<div class="widget"><div class="eyebrow">Interactivo · cuánta cadena filar</div>',
'''<h3>Partes y tipos de ancla</h3>
<p>Partes: <b>caña</b> (barra principal), <b>arganeo</b> (argolla de arriba, donde se hace firme el cabo o el grillete), <b>cruz</b> (unión de caña y brazos), <b>brazos</b> terminados en <b>uñas</b> que se clavan, y <b>mapa</b> (la cara plana de la uña). El <b>cepo</b>, barra transversal de las anclas clásicas, mejoraba el agarre; las anclas modernas no lo llevan y agarran gracias a los brazos móviles.</p>
<ul>
<li><b>Arado</b>: brazos y uñas forman una sola pieza. Según el manual, apropiada para fondos de <b>fango</b>.</li>
<li><b>Danforth</b>: barra bajo la cruz y dos uñas planas. Muy usada en recreo por su gran agarre.</li>
<li><b>Rezón</b>: sin cepo, cuatro brazos; caiga como caiga, siempre quedan dos en posición de clavar. Para neumáticas y auxiliares hay rezones plegables con un capuchón (caperuzón) que cierra las uñas.</li>
</ul>
<div class="key"><b>Línea de fondeo (norma).</b> Longitud total de al menos <b>5 veces la eslora</b>. El tramo de cadena, como mínimo <b>igual a la eslora</b>, salvo en barcos de menos de 6 m, que pueden llevar solo estacha (cabo). La tabla de pesos y diámetros por eslora es orientativa y no entra en el examen.</div>
<div class="widget"><div class="eyebrow">Interactivo · cuánta cadena filar</div>''')
rep('<li><span class="es">Levar</span>: subir el ancla. Se avanza despacio hacia ella mientras se vira la cadena, hasta que esté «a pique» (vertical) y se desclave.</li>\n<li><span class="es">Ancla a la pendura</span>: colgando del escobén lista para largar. <span class="es">Ancla al pelo</span>: justo despegada del fondo.</li>',
'''<li><span class="es">Virar</span>: cobrar (recoger) cabo o cadena. <span class="es">Filar</span>: largar o arriar cabo o cadena.</li>
<li><span class="es">Levar</span>: virar la cadena para recoger el ancla. Se avanza despacio hacia ella mientras se vira, hasta que esté «a pique» y se desclave.</li>
<li><span class="es">A la pendura</span>: ancla destrincada, bajada y colgando, lista para darle fondo cuando se decida. <span class="es">Ancla al pelo</span>: justo despegada del fondo.</li>
<li><span class="es">A pique</span>: al fondear, el momento en que el ancla toca fondo; al levar, cuando la cadena está vertical con el ancla aún en el fondo, justo antes de despegarse.</li>
<li><span class="es">Zarpar</span>: momento en que el ancla se despega del fondo, justo después de estar a pique.</li>
<li><span class="es">¡Clara! / ¡Libre!</span>: voz que indica que el ancla ha zarpado y viene limpia (sin fango, algas ni cabos enredados).</li>''')

# --- New questions
QS=r'''PER.Q.push(
/* ---- 1 Nomenclatura (manual propio, tema 1) ---- */
["nom","¿Qué parte del barco NO forma parte del casco?",["La quilla","Las cuadernas","La arboladura","El forro"],2,"El casco es el cuerpo del barco sin arboladura, máquinas ni superestructuras."],
["nom","Un trimarán es una embarcación con…",["Un casco y dos orzas","Tres cascos: uno central y dos laterales","Tres palos","Tres motores"],1,"Los cascos laterales le dan estabilidad."],
["nom","Las aberturas de cubierta que solo sirven para dar luz y ventilación se llaman…",["Escotillas","Lumbreras","Imbornales","Gateras"],1,"Si una abertura no da paso sino solo luz y aire, es una lumbrera (con cristal)."],
["nom","Las aberturas circulares en los costados para luz y ventilación son…",["Lumbreras","Escotillas","Portillos","Manguerotes"],2,"Portillos (o tragaluces), en los costados."],
["nom","Si hay riesgo de que entre agua de lluvia o de mar, la boca de un manguerote se orienta…",["A barlovento","A sotavento","Hacia proa","Hacia arriba"],1,"A sotavento, de espaldas al viento y al rocío."],
["nom","La bañera debe ser autoachicable mediante…",["Grifos de fondo","Imbornales","Pasacascos","Manguerotes"],1,"Los imbornales son los desagües; siempre despejados."],
["nom","Las válvulas situadas bajo la flotación para tomar agua de mar del motor o los aseos son…",["Imbornales","Grifos de fondo","Lumbreras","Bombas de achique"],1,"Solo se abren cuando hace falta y se mantienen limpias."],
["nom","Las piezas que atraviesan el casco y en las que se roscan los grifos de fondo se llaman…",["Bocinas","Pasacascos","Limeras","Gateras"],1,"Pasacascos."],
["nom","Además de las bombas de achique eléctricas, es muy aconsejable llevar…",["Un segundo molinete","Una bomba manual","Un manguerote extra","Una hélice de proa"],1,"La manual funciona aunque falle la electricidad."],
["nom","El «suelo» interior más bajo del casco es…",["La cubierta","El plan","El pantoque","La regala"],1,"Plan: superficie horizontal, interior e inferior del casco."],
["nom","El cable que corre de proa a popa por cada banda, sostenido por los candeleros, es el…",["Pasamanos","Guardamancebos","Guardín","Púlpito"],1,"Guardamancebos: seguridad de la tripulación."],
["nom","Un timón cuya pala gira sobre su borde de proa es un timón…",["Compensado","Ordinario","Semicompensado","De rueda"],1,"El ordinario es más sensible pero exige más fuerza."],
["nom","Frente al timón ordinario, el timón compensado…",["Es más sensible y más duro","Pierde algo de sensibilidad pero requiere menos fuerza","No necesita mecha","Solo se usa con fueraborda"],1,"El eje centrado reparte la presión del agua."],
["nom","En un barco de rueda, los cables y poleas que llevan el movimiento a la pala son los…",["Guardamancebos","Guardines","Grilletes","Candeleros"],1,"Guardines."],
["nom","La pieza cónica que cubre el núcleo de la hélice y lleva pasador de seguridad es el…",["Capacete","Casquillo","Arganeo","Barbotén"],0,"El capacete evita que la hélice se suelte del eje."],
["nom","En unas hélices gemelas de giro al exterior, la dextrógira va…",["A babor","A estribor","A proa","Indistintamente"],1,"Dextrógira a estribor, levógira a babor: sus efectos se anulan."],
["nom","Una hélice de paso variable permite ir avante y atrás…",["Invirtiendo el giro del motor","Orientando las palas sin cambiar el sentido de giro","Plegando las palas","Solo con hélice de proa"],1,"Por eso el motor no necesita inversora."],
["nom","Las hélices plegables o de «pico de pato» se usan sobre todo en…",["Lanchas de planeo","Veleros","Remolcadores","Neumáticas"],1,"Se pliegan navegando a vela y se abren por fuerza centrífuga."],
["nom","Una hélice de velocidad se caracteriza por…",["Poco paso y mucho diámetro","Mucho paso y poco diámetro","Palas plegables","Paso variable"],1,"La de arrastre es al revés: poco paso y mucho diámetro."],
["nom","Al medir la eslora máxima…",["Se incluye el púlpito de proa","Se excluye el púlpito de proa","Se mide en la flotación","Se incluyen las piezas desmontables"],1,"Se mide desde donde la cubierta corta la roda; también se excluyen las piezas desmontables."],
["nom","Para el amarre en un muelle, se entiende por eslora máxima…",["La de flotación","La de la documentación","La mayor longitud ocupacional","La eslora entre perpendiculares"],2,"Cuenta todo lo que ocupa el barco en el atraque."],
["nom","El puntal se mide…",["De la flotación a la quilla","A media eslora, de la línea de cubierta al canto superior de la quilla","De la flotación a la cubierta","De proa a popa"],1,"Puntal: dimensión vertical máxima del casco."],
["nom","Calado a proa 1,5 m y calado a popa 1,9 m. El calado medio es…",["0,4 m","1,7 m","1,9 m","3,4 m"],1,"(1,5 + 1,9) / 2 = 1,7 m. El asiento sería +0,4 m (apopado)."],
["nom","El francobordo equivale genéricamente a la altura de…",["La obra viva","La obra muerta","El puntal","La arboladura"],1,"De la flotación (a máxima carga) a la cubierta estanca más alta."],
["nom","El desplazamiento máximo se expresa en…",["Metros cúbicos","Toneladas de arqueo (GT)","Toneladas métricas","Litros"],2,"Es un peso: barco con la máxima carga segura."],
["nom","La zona resguardada a la que no llega el viento se llama…",["Sotavento","Socaire","Barlovento","Aleta"],1,"No confundir socaire con sotavento."],
["nom","Recuperar la posición derecha de un barco escorado es…",["Arrizar","Adrizar","Achicar","Zarpar"],1,"Adrizar."],
["nom","El movimiento de vaivén del barco de una banda a otra es el…",["Cabeceo","Balanceo","Asiento","Garreo"],1,"Balanceo: babor ↔ estribor. El cabeceo es proa-popa."],
["nom","El tramo del costado entre el través y la proa es la…",["Aleta","Amura","Regala","Roda"],1,"Amura a proa, aleta a popa."]
);
PER.Q.push(
/* ---- 2 Amarre y fondeo (manual propio, tema 1.3) ---- */
["amarre","La longitud mínima de la línea de fondeo es…",["3 veces la eslora","5 veces la eslora","3 veces la sonda","Igual a la eslora"],1,"Al menos cinco veces la eslora del barco."],
["amarre","El tramo de cadena de la línea de fondeo debe ser, como mínimo…",["La mitad de la eslora","Igual a la eslora","El doble de la eslora","5 m"],1,"Salvo en barcos de menos de 6 m, que pueden llevar solo estacha."],
["amarre","Un molinete cuyo eje es vertical se llama…",["Chigre","Cabrestante","Cabirón","Barbotén"],1,"Molinete (chigre): eje horizontal. Cabrestante: eje vertical."],
["amarre","La rueda lisa del molinete para virar un cabo es el…",["Barbotén","Cabirón","Estopor","Arganeo"],1,"El barbotén es para la cadena; el cabirón, para cabos."],
["amarre","El mecanismo que bloquea el barbotén es el…",["Embrague","Freno","Estopor","Grillete"],1,"El embrague lo acopla al motor; el freno lo bloquea."],
["amarre","El orificio de cubierta por el que la cadena baja a la caja de cadenas es la…",["Gatera","Puntera","Limera","Bocina"],0,"Gatera."],
["amarre","La pieza de proa por la que corren la cadena y la caña del ancla es la…",["Gatera","Puntera","Roda","Bita"],1,"Puntera."],
["amarre","La argolla del extremo superior de la caña del ancla es el…",["Cepo","Arganeo","Mapa","Grillete"],1,"En el arganeo se hace firme el cabo o el grillete."],
["amarre","El ancla con cuatro brazos que siempre clava dos, sea cual sea su caída, es el…",["Danforth","Arado","Rezón","Almirantazgo"],2,"Típica de neumáticas y auxiliares; los hay plegables."],
["amarre","El ancla con una barra bajo la cruz y dos uñas planas es la…",["Arado","Danforth","Rezón","De cepo"],1,"Danforth: muy usada en recreo por su gran agarre."],
["amarre","«Filar» cadena significa…",["Recogerla","Largarla o arriarla","Trincarla","Limpiarla"],1,"Virar es cobrar; filar es largar."],
["amarre","Al levar, el momento en que el ancla se despega del fondo se llama…",["A pique","Zarpar","A la pendura","Garrear"],1,"Primero está a pique (cadena vertical) y después zarpa."],
["amarre","El ancla destrincada, colgando y lista para fondear está…",["A pique","A la pendura","Clara","Al pelo"],1,"A la pendura."],
["amarre","La voz «¡Clara!» indica que el ancla…",["Ha tocado fondo","Ha zarpado y viene limpia","Está garreando","Está a la pendura"],1,"Sin fango, algas ni cabos que impidan subirla."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor)
j=s.rindex('(function(){',0,i)
s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s)
print("edits",n)
