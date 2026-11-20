import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

NEW='''["balsauso","Balsa: estiba, lanzamiento y adrizado",`
<ul>
<li><b>Accesorios</b>: guirnaldas salvavidas (asideros) por dentro y por fuera; una <b>boza</b> de longitud al menos el doble de la distancia de la estiba a la flotación, para lanzarla sin que se dispare la apertura; lámpara exterior en el toldo (blanca, fija o de 50–70 destellos/min, ≥12 h, se enciende sola al montarse la balsa, pila activada por agua de mar o seca); lámpara interior (≥12 h, para leer las instrucciones).</li>
<li><b>Envoltorio</b>: <b>contenedor rígido</b> (más protección, se trinca en un soporte, con asas para botarlo) o <b>saco</b> plastificado anti-UV. El saco, en un sitio protegido y accesible donde nadie se siente ni lo pise; nunca se arrastra.</li>
<li><b>Estiba del contenedor</b>: en cubierta, en su varadero o sobre calzos, bien trincado pero fácil de lanzar, con una cincha o llanta y un tensor de gancho a un disparador fijo.</li>
<li><span class="es">Zafa hidrostática</span>: libera sola el contenedor si el barco se hunde, al llegar a unos <b>4 m</b> de profundidad (entre 1,5 y 4 m); la balsa sube a la superficie y se puede hinchar desde el barco. Caduca a los <b>dos años</b>.</li>
</ul>
<h3>Cómo lanzarla</h3>
<ol>
<li>Soltar las trincas y buscar una zona de cubierta con la vertical exterior despejada.</li>
<li>Hacer firme a bordo la <b>tira de disparo</b> (que es también la tira de unión con el barco) y lanzar el contenedor al agua.</li>
<li>Cobrar de la tira de disparo dando un <b>tirón fuerte</b> para abrir la válvula de inflado. Hinchada, acercarla al costado y embarcar.</li>
<li>Cortar la tira de unión con el <b>cuchillo</b> antes de que el barco se hunda, recoger a quien esté en el agua y alejarse.</li>
</ol>
<p><span class="es">Adrizado</span>: si se abre invertida, una sola persona puede darle la vuelta. Se sube por <b>sotavento</b> con los pies sobre la <b>botella de inflado</b> (el punto más pesado), agarrada a las cinchas de adrizado, de cara al viento, y se deja caer hacia atrás; el resto ayuda desde barlovento.</p>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Balsa (100 % de las personas)</th><th>Paquete de emergencia</th></tr>
<tr><td>1</td><td>SOLAS o equivalente</td><td><b>SOLAS A</b>: más de 60 mn, socorro en más de 24 h. Con comida (10.000 kJ por persona), agua (1,5 L por persona) y kit de pesca.</td></tr>
<tr><td>2–3</td><td>SOLAS, equivalente o ISO 9650</td><td><b>SOLAS B</b>: menos de 60 mn, socorro en menos de 24 h. <b>Sin agua, comida ni kit de pesca.</b></td></tr>
<tr><td>4–6</td><td>No obligatoria</td><td>—</td></tr>
</table></div>
<p class="small">El kit incluye, entre otras cosas: manual, tabla de señales de salvamento, botiquín, pastillas y bolsas para el mareo, bote de humo, bengalas, cohetes, ayuda térmica, reflector de radar, linterna estanca, remos flotantes, espejo de señales, kit de reparación, achicador, cuchillo, esponja, silbato, inflador, ancla de capa y anilla de rescate con cabo.</p>`],
["equipo","Pirotecnia, material náutico, extintores y achique",`
<h3>Señales pirotécnicas</h3>
<ul>
<li>Solo en emergencia. Siempre hacia <b>sotavento</b>, con el brazo por fuera del barco y nunca hacia una persona. Caducadas no sirven. Estiba en lugar seco, accesible y lejos del calor. Homologadas según el <b>RD 809/1999</b>. Conviene haber simulado su uso.</li>
<li>No dispararlas precipitadamente: primero asegúrate de que te pueden ver y decide entre cohete y bengala según distancia y condiciones.</li>
<li><b>Cohete con paracaídas</b>: de noche se ve a 8–16 mn, sube unos 300 m y dura unos 40 s. <b>Bengala de mano</b>: unas 8 mn de noche y 4 de día, dura 60 s. <b>Fumígena flotante</b>: solo de día; se lanza al agua, humo naranja al menos <b>3 minutos</b>, sin llama, y sigue humeando tras 10 s sumergida a 10 cm.</li>
</ul>
<p><b>Luces</b>: en zonas 4–7 y navegando solo de día, con eslora total &lt;12 m se admiten luces no homologadas visibles a 1 mn; con eslora &lt;7 m se puede llevar en su lugar una linterna de luz blanca.</p>
<h3>Material náutico por zonas</h3>
<div class="tablewrap"><table>
<tr><th>Material</th><th>Zonas</th><th>Notas</th></tr>
<tr><td class="es">Compás</td><td>1–4</td><td>Sin interferencias eléctricas; tablilla de desvíos en zonas 1–2, revisada cada 5 años</td></tr>
<tr><td class="es">Compás de marcaciones</td><td>1–2</td><td></td></tr>
<tr><td class="es">Sextante, cronómetro, diario de navegación</td><td>1</td><td></td></tr>
<tr><td class="es">Cartas y accesorios</td><td>1–4</td><td>Cartas y portulanos, regla, compás de puntas; derrotero, libro de faros y anuario de mareas (en aguas atlánticas)</td></tr>
<tr><td class="es">Manuales náuticos</td><td>1</td><td>Manual SMM, nomenclátor de costeras, Código internacional de señales, libro de radioseñales</td></tr>
<tr><td class="es">Tabla de señales de salvamento</td><td>1–7</td><td></td></tr>
<tr><td class="es">Bocina de niebla</td><td>1–7</td><td>Manual o de gas (con recambio); ≥20 m de eslora, también campana de ≥200 mm</td></tr>
<tr><td class="es">Prismáticos</td><td>1–4</td><td></td></tr>
<tr><td class="es">Barómetro · pabellón nacional · linterna estanca</td><td>1–2</td><td></td></tr>
<tr><td class="es">Código de banderas</td><td>1–7</td><td></td></tr>
<tr><td class="es">Reflector de radar</td><td>1–7</td><td>En cascos no metálicos</td></tr>
<tr><td class="es">Baldes contra incendios</td><td>2 en zonas 1–3 · 1 en 4–6</td><td>3 en zonas 1–2 si eslora &gt;20 m</td></tr>
</table></div>
<p><b>Material de armamento</b> (todas las zonas): <b>caña de emergencia</b> (veleros y barcos con intraborda), al menos <b>dos estachas</b> de amarre, <b>bichero</b>, remo con dispositivo de boga o un par de zaguales si mide menos de 8 m (no obligatorio pero muy recomendable), inflador y kit de pinchazos en neumáticas y semirrígidas. <b>Botiquín</b> tipo «balsas de salvamento» en zonas 1–4 (RD 258/1999), con su <b>Guía sanitaria</b>.</p>
<h3>Combustibles</h3>
<div class="tablewrap"><table>
<tr><th>Grupo</th><th>Qué es</th></tr>
<tr><td>1</td><td>Líquido con punto de inflamación <b>&lt;55 °C</b>: gasolina (motores de chispa)</td></tr>
<tr><td>2</td><td>Líquido con punto de inflamación <b>≥55 °C</b>: gasoil (motores de compresión)</td></tr>
<tr><td>3</td><td><b>GLP</b>: propano, butano…</td></tr>
</table></div>
<h3>Extintores</h3>
<ul>
<li>Al alcance de la mano, lejos de posibles focos, y toda la tripulación sabe dónde están y cómo se usan. Los de <b>polvo seco</b> son polivalentes (todo menos metales). Con instalación eléctrica de más de 50 V, uno apto para fuego eléctrico (CO₂ o polvo). Con motores de GLP, uno apto para gases.</li>
<li>Homologados por la DGMM o con la <b>marca del timón</b> (RD 809/1999). Al menos 2 kg de agente. <b>Revisión anual</b> por empresa autorizada (con tarjeta), <b>retimbrado a los 5, 10 y 15 años</b> y vida útil de <b>20 años</b>.</li>
<li>No obligatorio en fuerabordas de menos de 20 kW (27,2 CV) en zonas 6 y 7.</li>
<li><b>Uso</b>: quitar el seguro al llegar al fuego; extintor <b>vertical</b>; apuntar a la <b>base de las llamas</b>, de abajo arriba, sin acercarse a menos de unos 3 m. Dura alrededor de <b>1 minuto</b>: dosificarlo.</li>
</ul>
<div class="grid2">
<div class="panel"><h4>Según eslora</h4><ul><li>Cabina cerrada y &lt;10 m: 1 de 34B</li><li>10–15 m: 1 de 34B</li><li>15–20 m: 2 de 34B</li><li>20–24 m: 3 de 34B</li></ul></div>
<div class="panel"><h4>Según potencia</h4><ul><li>≤25 kW (36 CV): 1 de 34B (no en fueraborda)</li><li>25–220 kW: 1 de 34B</li><li>&gt;220 kW: capacidad total B = 0,3 × kW (250 kW → 75B → 3 de 34B)</li><li>1 kW = 1,36 CV. 21B ≈ 2 kg de polvo; 34B ≈ 3 kg de polvo o 5 kg de CO₂; 55B ≈ 4 kg de polvo</li></ul></div>
</div>
<p class="small">Barcos con marcado CE: lo que diga el manual del fabricante (que pueden pedirte). Sin marcado CE o con uso comercial: como mínimo las tablas. Sin CE y con motores de gasolina o GLP: <b>sistema fijo</b> de extinción en el compartimento del motor. Con instalación de gas en el interior: <b>detector de gases</b> con alarma luminosa y sonora. Compartimentos de gasolina sin CE: ventilación según norma; si el arranque es eléctrico, <b>forzada</b>, con una placa junto al arranque que recuerde <b>ventilar 4 minutos</b>. Los depósitos de gasolina no forman parte del casco y van protegidos del fuego.</p>
<h3>Achique</h3>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Bomba del motor u otra fuente</th><th>Bomba manual o eléctrica</th><th>Baldes</th></tr>
<tr><td>1, 2, 3</td><td>1</td><td>1</td><td>2 (&gt;5 L)</td></tr>
<tr><td>4, 5, 6</td><td>—</td><td>1</td><td>1 (&gt;5 L)</td></tr>
<tr><td>7</td><td>—</td><td>1</td><td>— (≤6 m con cámaras: un achicador de 2 L)</td></tr>
</table></div>
<p class="small">Veleros en zonas 1–6: al menos una bomba <b>manual y fija</b>, manejable desde la bañera con todo cerrado. Capacidad mínima (a ≥10 kPa): ≤6 m, 10 L/min; 6–12 m, 15 L/min; ≥12 m, 30 L/min; las manuales, con 45 emboladas por minuto. <b>Sanciones</b> (RD 339/2021): según eslora (hasta 7,5 m, 7,5–12 m, más de 12 m), desde 100 € por cada chaleco sin luz hasta 3.000 € por no llevar sistema fijo de extinción, detección de gases o ventilación.</p>`],
'''
rep('["maltiempo","Mal tiempo y tormentas",`',NEW+'["maltiempo","Mal tiempo y tormentas",`')

# MOB
rep('''<ol>
<li><b>Dar la voz</b> «¡hombre al agua por estribor/babor!»''','''<p>Prevenir es la clave: en 20 segundos un náufrago es casi invisible desde la bañera, y de noche desaparece al instante. La cabeza puede no verse ni a 100 m.</p>
<div class="panel"><h4>Prevención</h4><ul><li>Moverse lo mínimo fuera de la bañera y nunca solo.</li><li>Dos líneas de vida, una por banda, de proa a popa.</li><li>Arneses para al menos el <b>50 %</b> de la tripulación; obligatorios con tiempo fresco, de noche y en maniobras en cubierta.</li><li>Cubierta iluminada de noche al maniobrar; antideslizante y candeleros fuertes.</li><li>«Una mano para el barco y otra para ti».</li></ul></div>
<ol>
<li><b>Dar la voz</b> «¡hombre al agua por estribor/babor!»''')
rep('''<li>Si no se le encuentra: búsqueda en <b>espiral cuadrada</b> desde el punto de referencia (datum) o por sectores, y aviso a Salvamento.</li>
<li>Recogida: muy despacio, motor en <b>punto muerto</b> al llegar, con el náufrago por <b>sotavento</b> (le das socaire). Ojo con la hélice.</li>
</ol>
<div class="sea"><b>A bordo.</b> Tratar la hipotermia: quitarle la ropa mojada, abrigarlo, calentar el tronco poco a poco y darle bebidas calientes sin alcohol. No frotar las extremidades.</div>`],''',
'''<li>Si le ves, <b>para el barco</b> enseguida (un barco de recreo maniobra bien) y acércate con poca arrancada, recibiendo el viento por la amura y quedando <b>a barlovento</b> del náufrago: el barco no se aleja y le protege con el casco. Luego te dejas caer hasta él. Valora si con mucha mar la aproximación por barlovento es peligrosa.</li>
<li>Si no se puede maniobrar enseguida, anota <b>posición y hora</b>. Si no se le recupera casi sobre la marcha: <b>alerta LSD en el canal 70</b> con el código <b>110 «Man over board»</b> o llamada de urgencia <b>PAN PAN</b>.</li>
<li>La tecla <b>MOB</b> del GNSS memoriza posición, fecha y hora; volviendo a pulsarla da rumbo y distancia a ese punto. El <b>respondedor de radar</b> lanzado en los primeros segundos es de los apoyos más fiables.</li>
<li>Si no se le ve, a partir de la posición inicial: <b>espiral cuadrada</b> (cuadrados concéntricos desde el datum; precisa, para áreas pequeñas) o <b>exploración por sectores</b> (tramos iguales de ≈1 mn, giros de <b>120° a estribor</b>; al acabar, se gira el primer sector <b>30°</b> a estribor y se repite; cuando se sabe más o menos dónde está).</li>
<li><b>Recogida</b>: con mucha mar, largar cabos para que se agarre; escala en la banda o la de baño. Si está inconsciente, se tira otro tripulante bien equipado. En un velero, un aparejo de poleas en una driza es lo mejor para izarlo.</li>
</ol>
<h3>Hipotermia y reanimación</h3>
<div class="tablewrap"><table>
<tr><th>Agua</th><th>Supervivencia</th></tr>
<tr><td>&lt;2 °C</td><td>&lt;45 min</td></tr><tr><td>2–5 °C</td><td>≈1 h</td></tr><tr><td>5–10 °C</td><td>&lt;3 h</td></tr><tr><td>10–15 °C</td><td>&lt;7 h</td></tr><tr><td>15–20 °C</td><td>&lt;16 h</td></tr><tr><td>&gt;20 °C</td><td>indefinida</td></tr>
</table></div>
<ul>
<li>Influyen la temperatura del agua, el viento, la corpulencia, la edad y la obesidad. <b>Moverse en el agua hace perder calor.</b></li>
<li>Hipotermia por debajo de <b>35 °C</b>: cansancio, falta de coordinación, aturdimiento, habla torpe, desorientación. Bajo <b>31 °C</b>, pérdida de conocimiento, pupilas dilatadas, pulso débil e irregular. Bajo <b>30 °C</b>, difícil saber si está vivo.</li>
<li>Con ≤34 °C y síntomas: comprobar pulso y pupilas, respiración artificial y, sin pulso, masaje cardíaco.</li>
<li><b>Si respira</b>: abrigarlo, ponerlo a resguardo y en <b>posición lateral</b>, calor (botellas de agua, toallas calientes) en <b>cuello, ingles y axilas</b>, bebidas calientes sin alcohol, y vigilarlo.</li>
<li><b>Si no respira</b> ni da signos de vida: avisar al <b>Radiomédico</b> (913 103 475), a Salvamento (900 202 202) o al 112, e iniciar <b>RCP</b>: <b>30 compresiones y 2 insuflaciones</b>, a <b>100 compresiones por minuto</b>, manos entrelazadas en el centro del pecho y brazos rectos. Si eres el único o dudas, solo masaje. Para el boca a boca: cabeza hacia atrás, tapar la nariz, sujetar la mandíbula. Hasta que llegue ayuda o haya signos de vida, unos 30–40 min (más si hay hipotermia).</li>
</ul>
<div class="note"><b>Ojo.</b> El manual habla de calentar al náufrago «friccionándole». Las pautas actuales de primeros auxilios desaconsejan frotar las extremidades de una persona con hipotermia: mejor quitarle la ropa mojada y calentar el tronco poco a poco.</div>`],''')

# Remolque
rep('''<ul>
<li>Acercarse por <b>sotavento</b> o en paralelo, pasar primero una <b>guía</b> (cabo fino) y con ella el cabo de remolque.</li>
<li>Hacerlo firme en <b>puntos fuertes</b> (bitas, cornamusas de proa repartiendo la carga con una brida).</li>
<li>Cabo largo y con <b>catenaria</b>, de longitud tal que los dos barcos estén <b>a la vez en la cresta o en el seno</b> de la ola: así no da tirones.</li>
<li>Arrancar muy despacio. El remolcado gobierna siguiendo la estela del remolcador. Abarloado (costado con costado) solo en aguas tranquilas o dentro de puerto.</li>
</ul>
<div class="key"><b>Salvamento Marítimo.</b> VHF canal 16, LSD canal 70, teléfono <span class="mono">900 202 202</span> o <span class="mono">112</span>.</div>`]''',
'''<p><span class="es">Remolque</span>: la línea de cabo que une remolcador y remolcado. Se pide por cualquier avería de gobierno o máquina que impida seguir el rumbo.</p>
<ul>
<li><b>Cabo</b>: fibra sintética; las amarras van bien por su elasticidad, que absorbe los <b>estrechonazos</b> (tirones), el principal problema. También ayudan un ramal de cadena bajo el agua, un remolque muy largo o un ancla en el centro del remolque. Mena y puntos de fijación, con resistencia adecuada.</li>
<li><b>Longitud</b>: según la mar, para que los dos barcos estén <b>a la vez en la cresta o en el seno</b> de la ola.</li>
<li><b>Aproximación</b>: el que da la guía, sea remolcador o remolcado, se pone <b>a barlovento</b> para que el viento acerque el cabo. Si cuesta, se ata una boya al extremo y se describe un semicírculo a barlovento del remolcado largando cabo.</li>
<li><b>Fijación</b>: en puntos muy fuertes de <b>proa del remolcado</b> (cornamusas), guiado por los guía-cabos para que tire desde la crujía. El remolcador lo fija a <b>popa</b>, con un aparejo que salve las hélices si son exteriores, tirando por su eje longitudinal.</li>
<li><b>Inicio y fin</b>: templar a muy baja velocidad y subir revoluciones poco a poco; al parar, igual de progresivo, para que no quede seno flojo que se enrede en la hélice ni se aborde al remolcado.</li>
<li><b>Gobierno</b>: el remolcado intenta que el cabo llame lo más de popa posible, en línea con la crujía, metiendo timón a la banda <b>contraria</b> a la que cae el remolcador cuando éste cambia de rumbo, y <b>sigue sus aguas</b>. El remolcador decide la derrota, lejos de la costa, con cambios de rumbo suaves (±10°), velocidad constante y <b>nunca más de 10 nudos</b>. Si el remolcado tiene hélices, deben poder girar libres. Vigilar los roces. Con mar de proa fuerte puede haber que suspenderlo.</li>
<li><b>Abarloado</b>: solo con mar perfecta. Defensas en las dos bandas de contacto y aproximación por <b>sotavento</b>. Sin largos, los <b>esprines</b> son determinantes y los <b>traveses</b> impiden que se separen.</li>
</ul>
<h3>Salvamento Marítimo (SASEMAR)</h3>
<p>Organismo público creado en <b>1992</b> por la Ley de Puertos del Estado y de la Marina Mercante. Se encarga de búsqueda, rescate y salvamento; control y ayuda al tráfico; lucha contra la contaminación; remolques; y servicios complementarios (meteorología, avisos a los navegantes). Alerta 24 h, 365 días.</p>
<div class="key"><b>Cómo contactar.</b> Voz por el <b>canal 16</b> (socorro o urgencia), alerta LSD por el <b>canal 70</b>, móvil <span class="mono">900 202 202</span> o <span class="mono">112</span>.</div>`]''')

QS=r'''PER.Q.push(
/* ---- 3 Seguridad (manual propio, tema 3, 2.ª parte) ---- */
["seg","La boza de la balsa salvavidas debe medir al menos…",["La eslora del barco","El doble de la distancia de la estiba a la flotación","10 m","La mitad de la eslora"],1,"Así se puede lanzar sin que se dispare la apertura."],
["seg","La lámpara exterior del toldo de la balsa debe funcionar al menos…",["1 hora","6 horas","12 horas","24 horas"],2,"Luz blanca fija o de 50–70 destellos por minuto."],
["seg","La zafa hidrostática libera el contenedor de la balsa cuando…",["Se tira de la boza","El barco se hunde a unos 4 m de profundidad","Hay mala mar","Se inclina más de 45°"],1,"La balsa sube sola a la superficie."],
["seg","La zafa hidrostática caduca a los…",["6 meses","2 años","5 años","10 años"],1,"Hay que renovarla."],
["seg","Para hinchar la balsa tras lanzarla al agua hay que…",["Abrir el contenedor a mano","Dar un tirón fuerte a la tira de disparo, hecha firme a bordo","Cortar la boza","Esperar a que se hinche sola"],1,"El tirón abre la válvula de inflado."],
["seg","Una vez en la balsa, la tira de unión con el barco se…",["Deja firme siempre","Corta con el cuchillo antes de que el barco se hunda","Suelta del grillete","Usa de ancla"],1,"Para no ser arrastrado."],
["seg","Para adrizar una balsa invertida, el tripulante apoya los pies en…",["El toldo","La botella de inflado","La rampa","El ancla flotante"],1,"Es el punto más pesado; se sube por sotavento."],
["seg","El paquete de emergencia SOLAS B se distingue del SOLAS A en que no lleva…",["Bengalas","Agua, comida ni kit de pesca","Botiquín","Cuchillo"],1,"SOLAS B: menos de 60 mn, ayuda en menos de 24 h."],
["seg","El paquete SOLAS A es obligatorio en la zona…",["1","2","3","4"],0,"Más de 60 mn: socorro en más de 24 h."],
["seg","Las señales pirotécnicas se disparan…",["Hacia barlovento","Hacia sotavento, con el brazo por fuera del barco","Hacia arriba dentro de la bañera","Hacia otro barco"],1,"Nunca hacia una persona."],
["seg","La homologación de las señales pirotécnicas se rige por el…",["RD 339/2021","RD 809/1999","RD 875/2014","RD 258/1999"],1,"Real Decreto 809/1999, de 14 de mayo."],
["seg","La bengala de mano dura…",["10 s","40 s","60 s","3 min"],2,"El cohete con paracaídas, unos 40 s."],
["seg","De noche, un cohete con paracaídas se ve en condiciones normales a…",["1–2 mn","8–16 mn","30 mn","4 mn"],1,"Sube unos 300 m."],
["seg","La señal fumígena flotante debe emitir humo durante al menos…",["30 s","1 min","3 min","10 min"],2,"Sigue humeando tras 10 s sumergida a 10 cm."],
["seg","En zona 4, ¿qué pirotecnia es obligatoria?",["6 bengalas, 6 cohetes y 1 fumígena","3 bengalas y 3 cohetes","3 bengalas","Ninguna"],1,"Zonas 5–6: 3 bengalas. Zonas 2–3: 6, 6 y 1."],
["seg","Navegando solo de día en zona 5, un barco de menos de 7 m puede sustituir las luces de navegación por…",["Nada","Una linterna eléctrica de luz blanca","Una bengala","Un reflector de radar"],1,"Con menos de 12 m se admiten luces no homologadas visibles a 1 mn."],
["seg","En zonas 1 y 2, la tablilla de desvíos del compás se revisa cada…",["Año","2 años","5 años","10 años"],2,"Cada cinco años."],
["seg","La bocina de niebla es obligatoria en…",["Solo zonas 1 y 2","Todas las zonas, 1 a 7","Zonas 1 a 4","Solo de noche"],1,"Con ≥20 m de eslora, además campana."],
["seg","En zona 4, el número de baldes contra incendios es…",["0","1","2","3"],1,"Zonas 1–3: 2; zonas 4–6: 1."],
["seg","¿Qué material de armamento NO es obligatorio en todas las zonas?",["Bichero","Dos estachas de amarre","Caña de emergencia en un velero","Sextante"],3,"El sextante solo en zona 1."],
["seg","Las embarcaciones de recreo que naveguen en zonas 1 a 4 llevarán un botiquín del tipo…",["A","Balsas de salvamento","C","De primeros auxilios básico"],1,"RD 258/1999, con su Guía sanitaria."],
["seg","La gasolina es un combustible del grupo…",["1","2","3","4"],0,"Punto de inflamación inferior a 55 °C."],
["seg","El gasoil pertenece al grupo…",["1","2","3","Ninguno"],1,"Punto de inflamación ≥55 °C; motores de compresión."],
["seg","Los extintores de polvo seco sirven para…",["Solo fuegos eléctricos","Casi todos los fuegos, salvo los de metales","Solo combustibles","Solo gases"],1,"Son polivalentes."],
["seg","Los extintores portátiles se revisan…",["Cada mes","Cada año, por una empresa autorizada","Cada 5 años","Nunca"],1,"Y se retimbran a los 5, 10 y 15 años."],
["seg","La vida útil de un extintor termina a los…",["5 años","10 años","15 años","20 años"],3,"Desde su fabricación."],
["seg","Para usar un extintor, hay que dirigir el chorro…",["A la parte alta de las llamas","A la base de las llamas, de abajo arriba","Al humo","En círculos sobre el fuego"],1,"Extintor vertical, sin acercarse a menos de unos 3 m."],
["seg","Un extintor portátil funciona aproximadamente…",["10 segundos","1 minuto","5 minutos","15 minutos"],1,"Hay que dosificarlo."],
["seg","Un barco de 16 m de eslora necesita, según la eslora…",["1 extintor 21B","1 extintor 34B","2 extintores 34B","3 extintores 34B"],2,"15–20 m: 2 de 34B."],
["seg","Con un motor fueraborda de 250 kW, la capacidad de extinción requerida es…",["25B","34B","75B","250B"],2,"0,3 × 250 = 75B → 3 extintores 34B."],
["seg","1 kW equivale a…",["0,74 CV","1,36 CV","10 CV","1 CV"],1,"Por eso 20 kW ≈ 27,2 CV."],
["seg","Una embarcación sin marcado CE con motor de gasolina debe tener en el compartimento del motor…",["Un balde","Un sistema fijo de extinción","Un detector de humos","Un extintor de agua"],1,"Para no tener que abrir el compartimento en caso de incendio."],
["seg","Un barco con instalación de gas en el interior del casco debe llevar…",["Ventilación natural solamente","Detección de gases con alarma luminosa y sonora","Un extintor de agua","Un balde extra"],1,"Sistemas de detección de gases."],
["seg","La placa junto al arranque de un motor de gasolina recuerda ventilar el compartimento durante…",["30 segundos","1 minuto","4 minutos","10 minutos"],2,"Con arranque eléctrico, la ventilación debe ser forzada."],
["seg","En zona 4, los medios de achique mínimos son…",["Bomba del motor, bomba manual y 2 baldes","Una bomba manual o eléctrica y 1 balde","Solo un balde","Nada"],1,"Zonas 1–3: bomba del motor + manual/eléctrica + 2 baldes."],
["seg","En un velero en zonas 1 a 6, al menos una bomba de achique debe ser…",["Eléctrica","Manual y fija, manejable desde la bañera con todo cerrado","Portátil","Acoplada al motor"],1,"Para achicar sin abrir escotillas."],
["seg","La capacidad mínima de la bomba de achique de un barco de 10 m es…",["10 L/min","15 L/min","30 L/min","45 L/min"],1,"≤6 m: 10; 6–12 m: 15; ≥12 m: 30 L/min."],
["seg","Las sanciones del RD 339/2021 van desde 100 € por cada…",["Bengala caducada","Chaleco sin luz","Extintor sin revisar","Ancla de menos"],1,"Hasta 3.000 € por faltar sistemas fijos, detección o ventilación."],
["seg","En la prevención de caídas al agua, el número mínimo recomendado de arneses es…",["Uno por barco","El 50 % de la tripulación","Uno por persona","Dos"],1,"Y dos líneas de vida, una por banda."],
["seg","Si un tripulante cae al agua y no puede recuperarse casi sobre la marcha, se hace una alerta LSD por el canal 70 con el código…",["16","110 «Man over board»","Mayday","70"],1,"O una llamada de urgencia PAN PAN."],
["seg","Pulsar la tecla MOB del GNSS…",["Llama a Salvamento","Memoriza posición, fecha y hora y luego da rumbo y distancia a ese punto","Activa la radiobaliza","Para el motor"],1,"Muy útil si dejas de verle."],
["seg","Al acercarse a un náufrago que se ve, según el manual conviene situarse…",["A sotavento de él","A barlovento de él, recibiendo el viento por la amura","Por la popa","Con la mar de través"],1,"El barco no se aleja y le protege; luego se deja caer hacia él."],
["seg","En la maniobra de Boutakow, se mete todo el timón a la banda del náufrago hasta que la proa cae…",["30°","70°","120°","270°"],1,"Después todo a la otra banda hasta el rumbo opuesto."],
["seg","En la exploración por sectores, los giros son de…",["90° a babor","120° a estribor","30° a estribor","180°"],1,"Al terminar, se gira el primer sector 30° a estribor."],
["seg","La búsqueda en espiral cuadrada está especialmente indicada para…",["Áreas grandes","Áreas de búsqueda reducidas","Navegar de noche sin GPS","Remolques"],1,"Cuadrados concéntricos desde el datum."],
["seg","Para izar a un náufrago a bordo de un velero lo mejor es…",["Tirar de los brazos","Un aparejo de poleas en una driza","La escala de baño siempre","El bichero"],1,"Si está inconsciente, otro tripulante bien equipado se tira al agua."],
["seg","Con el agua entre 10 y 15 °C, el tiempo de supervivencia es de…",["Menos de 45 min","Menos de 3 h","Menos de 7 h","Indefinido"],2,"Moverse en el agua hace perder calor."],
["seg","Se considera hipotermia una temperatura corporal por debajo de…",["37 °C","35 °C","31 °C","28 °C"],1,"Bajo 31 °C se pierde el conocimiento."],
["seg","A un náufrago con hipotermia que respira se le pone…",["Boca arriba con las piernas en alto","En posición lateral, con calor en cuello, ingles y axilas","Bajo una ducha fría","Sentado y bebiendo alcohol"],1,"Abrigado, a resguardo y vigilado."],
["seg","La RCP se hace con una secuencia de…",["15 compresiones y 2 insuflaciones","30 compresiones y 2 insuflaciones","5 compresiones y 1 insuflación","Solo insuflaciones"],1,"A un ritmo de 100 compresiones por minuto."],
["seg","El teléfono del Servicio Radiomédico Español es el…",["900 202 202","913 103 475","112","016"],1,"Salvamento: 900 202 202."],
["seg","En un remolque, se pone a barlovento…",["Siempre el remolcado","El que da la guía, sea remolcador o remolcado","Siempre el remolcador","Ninguno"],1,"Así el viento acerca el cabo."],
["seg","Los tirones bruscos del cabo de remolque se llaman…",["Guiñadas","Estrechonazos","Pantocazos","Cabezadas"],1,"Se amortiguan con elasticidad, cadena, más longitud o un ancla en el centro."],
["seg","El cabo de remolque se hace firme en el remolcado…",["En la popa","En la proa, guiado para que tire desde la crujía","En el palo","En un candelero"],1,"El remolcador, en popa."],
["seg","La velocidad del remolcador no debe superar…",["5 nudos","10 nudos","15 nudos","20 nudos"],1,"Lo más constante posible."],
["seg","Los cambios de rumbo del remolcador deben ser de…",["±10°","±45°","±90°","Sin límite"],0,"Suaves y de acuerdo con la longitud del remolque."],
["seg","Cuando el remolcador cae a una banda, el remolcado mete timón…",["A la misma banda","A la banda contraria","A la vía","No toca el timón"],1,"Para seguir sus aguas."],
["seg","En el remolque abarloado, la aproximación se hace por…",["Barlovento","Sotavento","La proa","La popa"],1,"Con defensas; esprines y traveses son determinantes."],
["seg","Salvamento Marítimo fue creado en…",["1975","1992","2001","2010"],1,"Por la Ley de Puertos del Estado y de la Marina Mercante."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
