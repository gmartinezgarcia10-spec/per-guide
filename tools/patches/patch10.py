import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

rep('FIRE={A:["Sólidos: madera, tela, papel","Agua, espuma, polvo ABC"],B:["Líquidos inflamables: gasolina, gasoil, aceite","Polvo, CO₂, espuma. ¡Nunca agua a chorro!"],C:["Gases: butano, propano","Cortar el gas. Polvo"],D:["Metales","Polvo especial"]',
    'FIRE={A:["Alfa · sólidos que hacen llama y brasa (madera, papel, lona, cabos), salvo metales","Enfriamiento con chorro de agua; también espuma o polvo ABC"],B:["Bravo · líquidos que arden en superficie: gasolina, gasoil, aceites, pinturas, alcohol","Sofocación: espuma o gas inerte; niebla de agua para enfriar. ¡Nunca agua a chorro!"],C:["Charlie · gases a presión: butano, propano, metano, hidrógeno","Cortar el gas; sofocación con gas inerte (o polvo)"],D:["Delta · metales ligeros: aluminio, magnesio (no alcalinos como sodio o potasio)","Polvos especiales (cloruro sódico, polvo de cobre para litio)"]')
rep('E:["Equipos eléctricos con tensión","Cortar la corriente. CO₂ o polvo. Nunca agua"]}',
    'E:["Echo · equipos eléctricos con tensión (o un A–D en presencia de ellos)","Cortar la corriente. CO₂ o polvo seco. Nunca agua ni otro conductor"]}')
rep('<p class="small muted">Clases UNE-EN 2: A, B, C, D y F. La «E» (eléctrico) no es una clase oficial pero se pregunta igual.</p></div>',
    '<p class="small muted">Clases UNE-EN 2: A, B, C, D y F. La «E» (eléctrico) no es una clase oficial pero el manual y el examen la usan. Clase F (Foxtrot): aceites y grasas de cocina; agente químico húmedo (espuma AFF de pH bajo) que enfría y forma una capa que impide que se reactive.</p></div>')
rep('<p><b>Dónde empieza</b>: cocina, cámara de motores,',
'''<h3>Tetraedro del fuego y métodos de extinción</h3>
<p>Además del triángulo, el examen pregunta por el <b>tetraedro</b>: <b>combustible, comburente (oxígeno), calor (temperatura de ignición) y reacción en cadena</b>. Basta eliminar uno.</p>
<div class="tablewrap"><table>
<tr><th>Método</th><th>Elimina</th><th>Con qué</th></tr>
<tr><td>Enfriamiento</td><td>Temperatura</td><td>Agua o niebla de agua</td></tr>
<tr><td>Sofocación</td><td>Oxígeno</td><td>CO₂ u otro gas inerte, espuma, mantas mojadas o arena, cierre hermético del compartimento y cortar la ventilación</td></tr>
<tr><td>Eliminación del combustible</td><td>Combustible</td><td>Cerrar llaves y válvulas, reducir la fuga, retirar el sólido que arde</td></tr>
<tr><td>Supresión de la reacción en cadena</td><td>Reacción</td><td>Polvo seco (bicarbonato sódico o potásico)</td></tr>
</table></div>
<p><b>El agua</b> absorbe mucho calor y, al evaporarse, aumenta unas <b>1.700 veces</b> su volumen y desplaza el aire (también sofoca). Pero reacciona con aluminio y magnesio liberando gases inflamables, conduce la electricidad y, más densa, no sirve en combustibles más ligeros. Ideal para clase <b>A</b>; ineficaz en <b>C</b>; peligrosa en <b>D</b> y <b>E</b>; en <b>B</b>, solo pulverizada (niebla) para refrigerar.</p>
<p><b>Extintores</b>: 21B ≈ 2 kg de polvo o 3,5 kg de CO₂; 34B ≈ 3 kg de polvo o 5 kg de CO₂; 55B ≈ 4 kg de polvo o 6,5 kg de CO₂. Siempre <b>en vertical</b> (inclinado, su rendimiento es parcial; nunca boca abajo).</p>
<h3>Al declararse un incendio</h3>
<ol>
<li><b>Localización</b>: dónde está, qué arde, qué extensión tiene, qué combustibles hay cerca y por dónde puede propagarse (comunicaciones, viento, corrientes).</li>
<li><b>Confinamiento</b>: el calor pasa por radiación, conducción (sólidos, líquidos, gases) y convección. Taponar conductos, cerrar puertas y portillos, parar ventiladores, refrescar y humedecer las zonas próximas.</li>
<li><b>Extinción</b>: quitar uno de los elementos del tetraedro.</li>
</ol>
<ul>
<li>No abrir de golpe un compartimento incendiado: con <b>monóxido de carbono</b> dentro, el aire puede provocar una explosión. No entrar en espacios cerrados sin máscara antigás (tipo OBA).</li>
<li>Impedir que el fuego llegue a combustibles cercanos y que se acerquen más; evitar que los vapores pasen a otras zonas.</li>
<li>Si es imposible sofocarlo, y sobre todo si hay riesgo de explosión, <b>abandonar el barco sin dilación</b>.</li>
</ul>
<h3>Socairear el fuego: rumbo para que el viento aparente sea cero</h3>
<ul>
<li>El foco principal debe quedar <b>a sotavento</b> del resto del barco.</li>
<li>Viento igual o más flojo que tu velocidad: <b>popa al viento</b>, igualando velocidades hasta tener viento aparente cero.</li>
<li>Viento más fuerte que el barco y fuego <b>a proa</b>: popa al viento a toda máquina. Fuego <b>a popa</b>: proa al viento con la mínima máquina para gobernar.</li>
<li>Si no se puede apagar y hay un fondo aplacerado y poco profundo cerca, se puede <b>hundir el barco</b> abriendo los grifos de fondo para reflotarlo después.</li>
</ul>
<p><b>Lugares de riesgo</b>: cocina (apagar cerrando la llave de paso para vaciar los conductos y dejarla cerrada), cámara de motores (bien ventilada: muchos gases pesan más que el aire y van a la sentina), tomas de combustible (sin derrames, tapas cerradas), baterías (gases explosivos y venenosos al cargar: ventilación), instalación eléctrica (sin chispas) y pañol de pinturas (ventilado, botes cerrados, brochas limpias y envueltas, sin calor cerca).</p>
<p><b>Dónde empieza</b>: cocina, cámara de motores,''')

rep('''<ul><li><b>Localizar</b> la entrada (escuchar, palpar, ver de dónde sube el agua) y comprobar si es agua salada o dulce (puede ser un depósito).</li>''',
'''<p>Además de varadas y abordajes, el agua suele entrar por los orificios de la obra viva: <b>bocina, limera, grifos de fondo</b> de servicios y fregaderos, <b>manguitos, abrazaderas, escapes</b> e <b>imbornales</b> de la bañera. Hay que revisarlos periódicamente.</p>
<div class="key"><b>Primeras medidas</b>: localizar la vía de agua y <b>achicar</b> (el examen lo resume en «achicar e intentar taponar»).</div>
<ul><li><b>Localizar</b> la entrada (escuchar, palpar, ver de dónde sube el agua) y comprobar si es agua salada o dulce (puede ser un depósito).</li>''')
rep('''<li>Escorar el barco para sacar la brecha del agua, si se puede, y dirigirse a puerto.</li></ul>`],''',
'''<li>Escorar el barco a la banda contraria para sacar la brecha del agua, si está cerca de la flotación y la mar es muy buena.</li>
<li><b>Bombas</b>: las manuales, de al menos <b>medio litro por embolada</b>; las eléctricas, unos <b>1.800 L/h</b>. Llevar <b>rotores de repuesto</b>: las palas se calientan y rompen al trabajar en vacío. Muy útiles las automáticas con sensor de nivel.</li>
<li><b>Otras medidas de fortuna</b>: <span class="es">turafallas</span> (disco de fieltro, goma o lona con un eje roscado y un brazo articulado que forman una «T»); sobre la flotación, con la zona seca, un tablero de <b>contrachapado marino</b> sellado con sicaflex o silicona; vías grandes, mantas, colchonetas o almohadas apuntaladas con puntales de madera. Las <b>encajonadas de cemento</b> (cajones apuntalados y rellenos de cemento rápido) no se usan en recreo.</li>
<li>Toda vía de agua implica <b>rumbo al puerto más cercano</b> o al más fácil de recalar.</li></ul>`],''')

rep('''<div class="panel"><h4>Varada involuntaria</h4><ol class="small"><li>Parar máquina. No dar atrás a lo loco: puedes abrir una vía de agua o aspirar arena.</li><li>Comprobar averías y vías de agua.</li><li>Sondar alrededor para ver por dónde hay más agua.</li><li>Esperar a que suba la marea, mover o desembarcar pesos, espiarse con el ancla (llevarla en el auxiliar y cobrar) o pedir remolque.</li></ol></div>
<div class="panel"><h4>Abordaje</h4><ol class="small"><li>Lo primero: <b>valorar las averías</b> y si hay heridos.</li><li><b>No separarse</b> enseguida: la proa del otro puede estar taponando la brecha.</li><li>Prestar auxilio al otro buque.</li><li>Intercambiar datos (nombres, matrículas, seguros) y dar parte.</li></ol></div>
</div>`],''',
'''<div class="panel"><h4>Varada involuntaria</h4><ol class="small"><li>Parar máquina y valorar daños en la obra viva: ¿hay vías de agua?</li><li>Sondar alrededor para ver por dónde hay más agua.</li><li>Valorar la resistencia del casco y la estabilidad según los puntos de apoyo (si baja la marea, un velero con orza puede acostarse y sufrir daños graves).</li><li>Reflotar: esperar a que suba la marea, trasladar pesos para cambiar el asiento o escorar hacia el lado de más fondo, aligerar carga, espiarse con el ancla o pedir remolque. Para avisar a Salvamento, canal 16.</li></ol></div>
<div class="panel"><h4>Abordaje</h4><ol class="small"><li>Investigar la gravedad de las averías y <b>detener el barco</b>. Comprobar si hay heridos.</li><li>Prestar ayuda al barco dañado.</li><li><b>No separarse</b> sin evaluar juntos la situación: la proa empotrada puede estar taponando la vía de agua y el abordado se hundiría.</li><li>Tomar los datos del otro (barco, seguro, titulación del patrón) y comunicarlo a la aseguradora; en tierra, pedir la <b>peritación</b>.</li><li>Si estás seguro de no ser culpable, formular una <b>protesta de mar</b> ante el juzgado más próximo.</li></ol></div>
</div>
<div class="tablewrap"><table>
<tr><th>Tipo de varada</th><th>Qué hacer</th></tr>
<tr><td>En seco (ha bajado la marea)</td><td>Apuntalar el barco, reparar averías y reflotar en pleamar con remolque y escora.</td></tr>
<tr><td>Fondo fangoso</td><td>No suele haber daños, pero el barco se incrusta, la hélice queda atrapada y las tomas de refrigeración pueden obturarse. Trasladar pesos para cambiar el asiento, anular el efecto ventosa «rabeando» (moviendo lateralmente a un lado y a otro), esperar la marea y, en el peor caso, aligerar carga.</td></tr>
<tr><td>Fondo rocoso</td><td>Si <b>no hay vías de agua</b>, <b>dar atrás rápidamente</b> o desplazar pesos para aliviar la zona varada.</td></tr>
<tr><td>Velero</td><td>Provocar escora para que pierda calado: izar todo el aparejo o templar una driza desde la perilla del palo (otra embarcación tira de ella desde su popa y da avante), controlando las tensiones del mástil. En el Mediterráneo, sin mareas, casi siempre hará falta otra embarcación.</td></tr>
</table></div>`],''')

rep('''<tr><td>Hemorragia</td><td>Presión directa con gasa limpia y elevar el miembro</td><td>Torniquete salvo último recurso</td></tr>''',
'''<tr><td>Hemorragia</td><td>Presión directa con gasa limpia (unos 15 min) y elevar el miembro</td><td>Torniquete salvo último recurso</td></tr>
<tr><td>Hemorragia nasal</td><td>Sentarle y que se apriete suavemente las fosas nasales</td><td>Echar la cabeza hacia atrás</td></tr>''')

rep('''<p>Botiquín: el que corresponde a la zona de navegación. Consultas médicas por radio: <b>Centro Radio-Médico Español</b>, a través de Salvamento Marítimo.</p>`],''',
'''<h3>Lo que dice el manual</h3>
<p>Los accidentes más frecuentes a bordo son <b>contusiones, heridas, fracturas y esguinces</b> (cubierta mojada, movimientos imprevistos, golpes de mar). Primera asistencia: alejar al herido del peligro o cortar la causa; observarle; controlar respiración y pulso (RCP si hace falta); localizar y detener hemorragias; no intentar reducir fracturas ni luxaciones, inmovilizar; <b>no dar nunca por muerto</b> a un accidentado; y después, consulta radiomédica y evacuación (Salvamento, Cruz Roja del Mar o arribar al puerto más próximo).</p>
<ul>
<li><b>Heridas</b>: traumatismos abiertos; riesgos inmediatos, pérdida de sangre e infección. Desinfectar y cubrir con un apósito estéril.</li>
<li><b>Contusiones</b>: traumatismos cerrados, graves en cabeza o abdomen por posibles hemorragias internas. En la cabeza, vigilar pérdida de conocimiento y vómitos; en el tórax, dolor fuerte al toser o moverse puede indicar costillas rotas (reposo total); en el abdomen, riesgo para vejiga, hígado, riñones. Reposo, observación y consulta radiomédica.</li>
<li><b>Hemorragias</b>: <b>arterial</b>, rojo vivo, a borbotones con el pulso (reducir cuanto antes); <b>venosa</b>, rojo oscuro y continua; <b>capilar</b>, intermedia y poco importante. Riesgo: shock. Medio litro se tolera; 1,5 L es grave; 3 L, mortal. El torniquete, como <b>última medida</b>, se pone <b>entre la herida y el corazón</b>, un poco por encima; temporal (el manual dice máximo 3 h aflojándolo cada cuarto de hora). Evacuar con los pies más altos que el cuerpo. En la venosa, vendaje compresivo por debajo de la herida.</li>
<li><b>Quemaduras</b>: su gravedad depende sobre todo de la <b>extensión</b> (la palma de la mano ≈ 1 % del cuerpo): más del 33 % es grave; menos del 10 %, leve. Zonas más graves: cara y cuello, manos y pies, genitales, pliegues y orificios. <b>1.er grado</b>: enrojecimiento y dolor. <b>2.º</b>: ampollas de líquido transparente, dolor intenso. <b>3.er</b>: costras, nervios destruidos, menos dolor pero más riesgo (shock, infección); no quitar la costra y prevenir el tétanos. Ampollas: cubrir con apósitos grasos, <b>no romper nunca</b>.</li>
<li><b>Quemaduras solares</b>: el viento reduce la sensación de calor y aumenta el riesgo. Filtro alto unos <b>30 min antes</b> (cara, nariz, orejas, hombros), bálsamo labial, exposición moderada, evitar el mediodía, gorra, gafas y manga larga. Pueden tardar 24 h en manifestarse. Tratamiento: analgésico (ibuprofeno; <b>nunca aspirina a los niños</b>), cremas de cortisona o aloe vera, bañarse en el mar, compresas frías, no reventar ampollas, ropa holgada de algodón.</li>
<li><b>Insolación</b>: cara roja y caliente, dolor de cabeza en la frente, náuseas y vómitos, fatiga y calambres, sed intensa y sudor. Sombra, lugar fresco y ventilado, posición <b>semisentado</b>, compresas frías en frente y nuca, sorbos de agua fresca.</li>
<li><b>Mareo</b>: boca pastosa, somnolencia, náuseas, dolor de cabeza, sudor frío; vómitos repetidos pueden deshidratar. Se supera navegando con continuidad. Prevención con dimenhidrinato (Biodramina) una hora antes de embarcar, siguiendo el prospecto. Ya mareado: quieto, reclinado, mirando un punto fijo lejano o cerrando los ojos, en el centro del barco; comer algo seco (galletas, pan tostado), no en ayunas. El primer vómito suele marcar el inicio de la mejoría; si se repite, sales de rehidratación oral.</li>
</ul>
<div class="note"><b>Ojo: consejos anticuados.</b> El manual propone para las quemaduras sumergirlas o aplicar alcohol, y para el inconsciente el lado derecho; también cita mercromina, morfina y pomadas antiguas. Las pautas actuales de primeros auxilios dicen otra cosa: <b>agua fría 10–20 min</b> para la quemadura (nunca alcohol) y <b>posición lateral de seguridad</b>, sin importar el lado. En el examen de la GVA, lo que se ha preguntado es «apósitos grasos y venda», «compresión directa» y «torniquete entre la herida y el corazón».</div>
<h3>Servicio Radiomédico y Guía sanitaria</h3>
<ul>
<li>El <b>Centro Radio-Médico Español (CRME)</b> depende del <b>Instituto Social de la Marina (ISM)</b>. Se contacta por una estación costera pidiendo «consulta médica», por teléfono al <b>913 103 475</b> (24 h, los 365 días) o, con Inmarsat o móvil, marcando ese número directamente. Fax 913 083 302; télex 43340.</li>
<li>El ISM recomienda las consultas no urgentes o de control <b>entre las 09:00 y las 15:00</b> (hora peninsular); fuera de ese horario solo hay un médico de guardia.</li>
<li>La <b>Guía sanitaria a bordo</b> (Guía médica sanitaria), del ISM, es gratuita; se reparte en mercantes y pesqueros y se puede descargar. Sirve para las consultas a distancia, para usar bien el botiquín y como guía de prevención.</li>
</ul>
<p>Botiquín: el que corresponde a la zona de navegación.</p>`],''')

rep('''<li><b>Abandonar el barco es el último recurso</b>: es más seguro que la balsa mientras flote. Antes: MAYDAY, radiobaliza, chalecos y ropa de abrigo, beber agua, coger el bolso de supervivencia.</li>''',
'''<li><b>Abandonar el barco es el último recurso</b>: solo con peligro inminente de hundimiento o un incendio declarado con gran riesgo de explosión. Se está más seguro encima del barco, aunque esté escorado, semihundido o con la quilla al aire.</li>
<li>Antes: instruir a quien embarca sobre los medios de salvamento y dónde están; decidido el abandono, alerta de socorro por <b>LSD canal 70</b> o voz por el <b>16</b> indicando la naturaleza («abandono»), activar el <b>respondedor de radar</b> y la <b>radiobaliza</b>; coger agua (lo primero para sobrevivir), comida energética y la pirotecnia.</li>
<li><b>Saltar al agua</b> por <b>sotavento</b> (por barlovento si hay incendio o combustible derramado a sotavento), con el chaleco puesto, de pie y los brazos cruzados sujetándolo. El chaleco hinchable no se dispara hasta estar en el agua. Traje de agua puesto y bien cerrado en muñecas, tobillos y cuello: aísla. Alejarse unos metros, siempre hacia la balsa.</li>
<li><b>En el agua</b>: los peligros son asfixia, hipotermia, sed, hambre y estrés por miedo. Posición <b>fetal</b> (HELP: rodillas a la barbilla, brazos cruzados al pecho, pies cruzados). En grupo, <b>agruparse</b> o formar un <b>círculo</b> cogidos de los brazos: conserva calor, ayuda a los más débiles y se ve mejor. Si se ve un buque, encender una bengala o bote de humo en el centro del círculo.</li>
<li><b>Pirotecnia</b>: solo cuando haya certeza de que alguien la puede ver, siempre por sotavento; leer antes las instrucciones.</li>''')

QS=r'''PER.Q.push(
/* ---- 8 Emergencias (manual propio, tema 8) ---- */
["emerg","Los accidentes más frecuentes a bordo son…",["Quemaduras e intoxicaciones","Contusiones, heridas, fracturas y esguinces","Insolaciones","Ahogamientos"],1,"Por cubiertas mojadas, movimientos del barco y golpes de mar."],
["emerg","Ante un accidentado que parece muerto…",["Se le da por muerto si no respira","Nunca se le da por muerto ni se abandona su cuidado","Se espera a puerto","Se le deja en cubierta"],1,"Y se consulta al servicio radiomédico."],
["emerg","Ante una fractura o luxación…",["Se intenta reducir","No se intenta reducir: se inmoviliza","Se masajea","Se aplica calor"],1,"Y se calma el dolor."],
["emerg","Una sangre rojo vivo que sale a borbotones indica una hemorragia…",["Venosa","Arterial","Capilar","Interna"],1,"Hay que reducirla lo antes posible."],
["emerg","Una sangre rojo oscuro que sale de forma continua indica una hemorragia…",["Arterial","Venosa","Capilar","Nasal"],1,"Pregunta real (abril 2026)."],
["emerg","La primera medida ante una hemorragia externa en un brazo es…",["Un torniquete","La compresión directa","Agua fría","Elevar las piernas"],1,"Con gasas o vendajes, unos 15 minutos."],
["emerg","El torniquete, como último recurso, se coloca…",["Por debajo de la herida","Entre la herida y el corazón, un poco por encima de la herida","En el cuello","Sobre la herida"],1,"Temporal y vigilado."],
["emerg","¿Qué pérdida de sangre se considera mortal según el manual?",["0,5 L","1 L","1,5 L","3 L"],3,"Medio litro se tolera; 1,5 L es grave."],
["emerg","Ante una hemorragia nasal…",["Echar la cabeza hacia atrás","Sentarle y que apriete suavemente las fosas nasales","Tumbarle boca arriba","Poner un torniquete"],1,"Pregunta real (2019)."],
["emerg","Una contusión en el tórax con dolor fuerte al toser puede indicar…",["Una insolación","Rotura de costillas","Mareo","Una hemorragia nasal"],1,"Reposo total."],
["emerg","La gravedad de una quemadura depende sobre todo de…",["El color","La extensión de piel quemada","La hora","La temperatura del agua"],1,"Más del 33 %, grave; menos del 10 %, leve."],
["emerg","La palma de la mano representa aproximadamente…",["El 1 % de la superficie corporal","El 5 %","El 9 %","El 10 %"],0,"Sirve para estimar la extensión de una quemadura."],
["emerg","Las quemaduras de segundo grado se caracterizan por…",["Solo enrojecimiento","Ampollas llenas de líquido transparente","Costras y poco dolor","No duelen"],1,"El dolor es intenso."],
["emerg","Las ampollas de una quemadura…",["Se revientan para que sequen","No se rompen y se cubren con apósitos grasos","Se cubren con hielo","Se frotan con alcohol"],1,"En el examen: «apósitos grasos y venda»."],
["emerg","¿Qué quemaduras duelen menos aunque son más graves?",["Primer grado","Segundo grado","Tercer grado","Solares"],2,"Han destruido las terminaciones nerviosas."],
["emerg","El protector solar debe aplicarse unos…",["5 minutos antes","30 minutos antes","2 horas antes","Después de exponerse"],1,"Con atención a cara, nariz, orejas y hombros."],
["emerg","A un niño con quemaduras solares no se le debe dar nunca…",["Agua","Aspirina","Aloe vera","Compresas frías"],1,"Como analgésico, ibuprofeno."],
["emerg","A una persona con insolación se la coloca…",["Al sol para que sude","A la sombra, en un lugar fresco y ventilado, semisentada","Tumbada boca abajo","En la sentina"],1,"Con compresas frías en frente y nuca y sorbos de agua."],
["emerg","Un tripulante mareado debe…",["Estar en ayunas","Comer pequeñas cantidades de alimentos secos","Bajar a la proa a leer","Beber alcohol"],1,"Galletas, pan o tostadas para asentar el estómago."],
["emerg","Para el mareo, la mejor posición a bordo es…",["La proa","El centro del barco, a la altura de la flotación","El tope del palo","La popa"],1,"Donde menos se mueve."],
["emerg","El Centro Radio-Médico Español depende del…",["SASEMAR","Instituto Social de la Marina","Ministerio de Defensa","Cruz Roja"],1,"ISM."],
["emerg","El teléfono del Centro Radio-Médico Español es…",["900 202 202","913 103 475","112","913 083 302"],1,"Disponible 24 h; el 913 083 302 es el fax."],
["emerg","El ISM recomienda hacer las consultas radiomédicas no urgentes…",["De noche","Entre las 09:00 y las 15:00","Solo los festivos","A cualquier hora"],1,"Fuera de ese horario solo hay un médico de guardia."],
["emerg","La Guía sanitaria a bordo la edita…",["La DGMM","El ISM","La OMI","El fabricante del botiquín"],1,"Es gratuita y se puede descargar."],
["emerg","En una varada involuntaria en fondo rocoso y sin vías de agua…",["Se espera a la bajamar","Se da atrás rápidamente o se desplazan pesos","Se abren los grifos de fondo","Se abandona el barco"],1,"Pregunta real (2023 y 2025)."],
["emerg","En una varada involuntaria, ¿qué medida NO es correcta?",["Trasladar pesos","Esperar a la bajamar","Aligerar carga","Pedir remolque"],1,"Hay que esperar a la pleamar."],
["emerg","En una varada en fondo fangoso, el principal problema es…",["Las vías de agua","El efecto ventosa y que la hélice y las tomas de refrigeración queden atrapadas","Los incendios","La corriente"],1,"Se rabea el barco para abrir la cama."],
["emerg","Para reflotar un velero varado se le provoca…",["Asiento apopado","Escora, para que pierda calado","Que pierda el palo","Más carga"],1,"Por ejemplo tirando de una driza desde otra embarcación."],
["emerg","Tras un abordaje, separar inmediatamente los barcos…",["Es lo primero","No se debe hacer sin evaluar antes la situación","Es obligatorio","Lo decide el seguro"],1,"La proa empotrada puede estar taponando la vía de agua."],
["emerg","Si estás seguro de no ser culpable de un abordaje, conviene formular…",["Una denuncia en Capitanía","Una protesta de mar ante el juzgado más próximo","Un MAYDAY","Un parte de varada"],1,"Muestra fehaciente de los hechos."],
["emerg","Tras detectar una vía de agua, lo primero es…",["Abandonar el barco","Localizarla y achicar, intentando taponarla","Avisar al seguro","Fondear"],1,"Pregunta real (2021)."],
["emerg","Las colchonetas y los espiches se usan sobre todo para…",["Incendios","Taponar y reducir vías de agua","Varadas","Abandono"],1,"Pregunta real (2022)."],
["emerg","Las cuñas cónicas de madera para taponar orificios se llaman…",["Turafallas","Espiches","Palletes","Puntales"],1,"Envueltas en trapos untados de una sustancia impermeable."],
["emerg","El disco de fieltro o goma con un eje roscado y un brazo articulado en forma de «T» es…",["Un espiche","Una turafalla","Un pallete de colisión","Una encajonada"],1,"Medida de fortuna para vías de agua."],
["emerg","El pallete de colisión es…",["Una cuña de madera","Un paño de lona que se adosa al casco por fuera con cabos","Un cajón de cemento","Una bomba"],1,"La presión del agua lo aprieta contra el casco."],
["emerg","La capacidad de una bomba de achique manual debe ser de al menos…",["0,1 L por embolada","0,5 L por embolada","2 L por embolada","10 L por embolada"],1,"Las eléctricas, unos 1.800 L/h."],
["emerg","Conviene llevar rotores de repuesto para las bombas eléctricas porque…",["Se oxidan","Sus palas se calientan y rompen al trabajar en vacío","Pesan poco","Son obligatorios"],1,"Ocurre a menudo al achicar sentinas."],
["emerg","Los elementos del tetraedro del fuego son…",["Combustible, oxígeno y calor","Combustible, comburente, calor y reacción en cadena","Agua, aire, fuego y tierra","Llama, humo, calor y brasas"],1,"Pregunta real (2019 y 2023)."],
["emerg","El agua como agente extintor actúa principalmente por…",["Sofocación","Enfriamiento","Eliminación del combustible","Inhibición"],1,"Al evaporarse también desplaza el aire."],
["emerg","Al evaporarse, el agua aumenta su volumen unas…",["17 veces","170 veces","1.700 veces","17.000 veces"],2,"Por eso también sofoca."],
["emerg","El agua es peligrosa como agente extintor en fuegos de clase…",["A","B pulverizada","D y E","Ninguna"],2,"Reacciona con metales y conduce la electricidad."],
["emerg","Los fuegos de gases a presión son de clase…",["A","B","C","F"],2,"Se apagan por sofocación con gas inerte, cortando el gas."],
["emerg","Los fuegos de aceites y grasas de cocina son de clase…",["B","D","E","F"],3,"Agente químico húmedo."],
["emerg","Para un fuego de clase B, el agente más indicado es…",["Agua a chorro","Espuma","Arena seca solamente","Nada"],1,"Pregunta real (2021)."],
["emerg","Un extintor de CO₂ usado en un equipo electrónico actúa por…",["Enfriamiento","Sofocación","Eliminación del combustible","Reacción en cadena"],1,"Pregunta real (2023)."],
["emerg","El polvo seco a base de bicarbonato actúa sobre todo…",["Enfriando","Suprimiendo la reacción en cadena","Eliminando el combustible","Mojando"],1,"Método de inhibición."],
["emerg","¿Qué no debe hacerse al usar un extintor de polvo seco?",["Apuntar a la base","Usarlo boca abajo","Quitar el seguro al llegar","Dosificarlo"],1,"Debe estar vertical."],
["emerg","Un extintor 34B lleva aproximadamente…",["2 kg de polvo","3 kg de polvo o 5 kg de CO₂","6,5 kg de CO₂","1 kg de polvo"],1,"21B: 2 kg de polvo; 55B: 4 kg de polvo."],
["emerg","Los tres pasos básicos al declararse un incendio son…",["Alarma, huida y abandono","Localización, confinamiento y extinción","Enfriar, sofocar y apagar","MAYDAY, chalecos y balsa"],1,"Modo de proceder del manual."],
["emerg","Al apagar la cocina de gas, conviene cerrar primero…",["Los fuegos","La llave de paso, para vaciar los conductos","La escotilla","La ventilación"],1,"Y dejar la llave de paso cerrada."],
["emerg","Un compartimento incendiado no se abre de golpe porque…",["Se escapa el humo","El monóxido de carbono puede explotar al contacto con el aire","Hace frío","Se pierde el extintor"],1,"Y no se entra sin máscara antigás."],
["emerg","En caso de incendio, se maniobra para que la parte incendiada quede…",["A barlovento","A sotavento","De través a la mar","Hacia la costa"],1,"Pregunta real (octubre 2026)."],
["emerg","Si el viento es más flojo que la velocidad del barco, para socairear el fuego se navega…",["Proa al viento a toda máquina","Popa al viento igualando velocidades (viento aparente cero)","De través","Parado"],1,"Así el viento no aviva el fuego."],
["emerg","Con viento más fuerte que el barco y fuego a popa, se pone…",["Popa al viento a toda máquina","Proa al viento con la mínima máquina para gobernar","Mar de través","El barco parado"],1,"Con fuego a proa, popa al viento a toda máquina."],
["emerg","Si un incendio es imposible de sofocar y hay un fondo aplacerado y poco profundo cerca, se puede…",["Seguir navegando","Hundir el barco abriendo los grifos de fondo para reflotarlo después","Varar en roca","Dar atrás"],1,"Medida extrema del manual."],
["emerg","El barco se abandona solo cuando…",["Hay mala mar","Hay peligro inminente de hundimiento o incendio con gran riesgo de explosión","Se va el motor","Se pierde el GPS"],1,"Mientras flote, es más seguro que el agua."],
["emerg","Para saltar al agua al abandonar el barco se hace normalmente por…",["Barlovento","Sotavento, con el chaleco puesto, de pie y brazos cruzados","La proa","Cualquier banda"],1,"Por barlovento si hay incendio o combustible a sotavento."],
["emerg","Un chaleco hinchable se dispara…",["Antes de saltar","Ya en el agua","En la balsa","Nunca"],1,"Al saltar, se sujeta con fuerza."],
["emerg","La posición fetal en el agua sirve sobre todo para…",["Nadar más rápido","Conservar el calor corporal","Ser vista","Evitar la sed"],1,"Rodillas a la barbilla, brazos cruzados y pies cruzados."],
["emerg","Varios náufragos en el agua deben…",["Separarse","Formar un círculo cogidos de los brazos","Nadar hacia la costa","Quitarse el chaleco"],1,"Conservan calor, ayudan a los débiles y se ven mejor."],
["emerg","Los peligros más importantes para un náufrago son…",["El sol y la lluvia","Asfixia, hipotermia, sed, hambre y estrés por miedo","Los tiburones","La corriente"],1,"Según el manual."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
