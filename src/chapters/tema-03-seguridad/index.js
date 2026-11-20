// @ts-nocheck
/* Tema 3: CH[3] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
const {$,$$,CH,boatTop}=PER;

/* ================= TEMA 3 · SEGURIDAD ================= */
const ZONES=[
 {z:1,lim:"Navegación ilimitada",bm:6,co:6,fu:2,ch:"275 N",balsa:true,aro:true},
 {z:2,lim:"Hasta 60 mn de la costa",bm:6,co:6,fu:1,ch:"150 N",balsa:true,aro:true},
 {z:3,lim:"Hasta 25 mn de la costa",bm:6,co:6,fu:1,ch:"150 N",balsa:true,aro:true},
 {z:4,lim:"Hasta 12 mn de la costa",bm:3,co:3,fu:0,ch:"150 N",balsa:false,aro:true},
 {z:5,lim:"Hasta 5 mn de un abrigo",bm:3,co:0,fu:0,ch:"100 N",balsa:false,aro:false},
 {z:6,lim:"Hasta 2 mn de un abrigo",bm:3,co:0,fu:0,ch:"100 N",balsa:false,aro:false},
 {z:7,lim:"Aguas protegidas (puertos, rías, bahías)",bm:0,co:0,fu:0,ch:"100 N",balsa:false,aro:false}
];
const pathA="M150 330 L150 250 C 150 200, 240 175, 268 220 C 296 268, 236 316, 186 300 C 160 292, 150 280, 150 262";
const pathW="M150 330 L150 245 Q 156 205 196 186 Q 240 166 236 126 Q 230 86 186 92 Q 150 100 150 150 L150 255";
CH[3]={
intro:"Cuatro preguntas que salen de pocos datos fijos: estabilidad, material obligatorio por zonas, mal tiempo y hombre al agua. Y es, con diferencia, el tema que más te servirá navegando.",
sections:[
["estabilidad","Estabilidad",`
<p><span class="es">Estabilidad</span>: propiedad del barco de recuperar su posición de equilibrio cuando la pierde por causas externas (viento, mar). Dos fuerzas mantienen el barco derecho, y juntas forman el <b>par de estabilidad</b>: el <b>peso</b>, aplicado en el <b>centro de gravedad G</b>, que tira hacia abajo, y el <b>empuje</b>, aplicado en el <b>centro de carena C</b> (el centro del volumen sumergido), que empuja hacia arriba. Al escorar, C se desplaza hacia la banda que se hunde y las dos fuerzas forman un <b>par adrizante</b>. El punto donde la vertical del empuje corta la crujía es el <b>metacentro M</b>.</p>
<div class="widget"><div class="eyebrow">Interactivo · escora y altura de G</div>
<div class="grid2"><div>
<label class="small">Escora: <b id="esV"></b></label><input type="range" id="es" min="0" max="35" value="15">
<label class="small">Altura de G (pesos altos ↑): <b id="gV"></b></label><input type="range" id="gh" min="0" max="100" value="35">
<p id="stTxt" style="font-weight:600"></p>
<p class="small muted">GZ es el brazo adrizante: GZ ≈ GM · sen(escora). Mientras M quede por encima de G, el barco vuelve a adrizarse.</p></div>
<svg viewBox="0 0 300 240" id="stSvg" role="img" aria-label="Sección del barco escorado con G, C y M"></svg></div></div>
<ul>
<li><b>Empeoran la estabilidad</b>: pesos <b>altos</b> (gente de pie en la cubierta superior, carga en el techo), <b>superficies libres</b> (tanques a medias, agua en la sentina o en cubierta, que se desplaza a la banda baja) y pesos <b>desplazados a una banda</b>.</li>
<li><b>Barco duro</b>: GM grande, muy estable; se adriza rápido y a menudo de forma brusca y violenta. Los veleros, y sobre todo los monocascos de regata con el peso en el bulbo de la quilla, son barcos duros. En un mercante es peligroso porque puede correrse la carga. <b>Barco blando</b>: GM pequeño, menos estable; cómodo porque recupera la escora despacio, pero con mar fuerte puede volcar y hundirse. El diseño busca un equilibrio entre ambos.</li>
<li><span class="es">Balance</span>: vaivén de una banda a otra. Su <b>periodo</b> es el tiempo que tarda el barco en pasar de estar inclinado a una banda a estarlo los mismos grados a la otra. <span class="es">Cabezada</span> (cabeceo): vaivén proa-popa por el oleaje. Si al cabecear el barco golpea con fuerza el agua con la parte delantera de la obra viva, ha dado un <b>pantocazo</b>.</li>
<li><span class="es">Sincronismo</span>: cuando el periodo de las olas coincide (o casi) con el del barco, la amplitud crece hasta poder volcarlo. Con el balance es <b>sincronismo transversal</b>; con la cabezada, <b>sincronismo longitudinal</b>.</li>
<li>La <b>reserva de flotabilidad</b> es el volumen estanco por encima de la flotación (depende del francobordo).</li>
</ul>
<h3>Estática y dinámica</h3>
<div class="tablewrap"><table>
<tr><th>Tipo</th><th>Qué es</th><th>Cómo se ve su pérdida</th></tr>
<tr><td class="es">Estática transversal</td><td>Recuperar el equilibrio, en aguas tranquilas, tras una fuerza lateral. Inicial (escora &lt;10°) o de grandes inclinaciones (&gt;10°).</td><td>Balance y escora. Adrizado = escora nula.</td></tr>
<tr><td class="es">Estática longitudinal</td><td>Recuperarlo en sentido proa-popa (solo se estudia la inicial, &lt;10°)</td><td>Cabeceo y cambios del asiento. En aguas iguales = asiento cero.</td></tr>
<tr><td class="es">Dinámica</td><td>Estabilidad frente a fuerzas externas como olas grandes y viento fuerte (transversal)</td><td>—</td></tr>
</table></div>
<div class="key"><b>Cómo gobernar.</b> Para cortar un <b>balance</b> excesivo, <b>cambia el rumbo</b>: la causa principal es la mar de través. Para cortar la <b>cabezada</b>, <b>cambia la velocidad</b> (más o menos), porque así cambias el periodo de cabeceo. En otros rumbos, rumbo, velocidad o las dos cosas.</div>`],
["antes","Antes de salir",`
<div class="grid3">
<div class="panel"><h4>Tiempo</h4><p>Parte de AEMET o de Salvamento por VHF para toda la salida, con su tendencia. Si hay duda, no se sale.</p></div>
<div class="panel"><h4>Combustible</h4><p>Regla de los <b>tercios</b>: ⅓ ida, ⅓ vuelta, ⅓ reserva. Filtro decantador sin agua.</p></div>
<div class="panel"><h4>Motor</h4><p>Aceite, refrigeración (grifo de fondo abierto, sale agua por el escape), correas, baterías.</p></div>
<div class="panel"><h4>Gasolina intraborda</h4><p>Ventilar la cámara del motor <b>4–5 min</b> antes de arrancar: los vapores de gasolina pesan más que el aire y se acumulan abajo.</p></div>
<div class="panel"><h4>Material</h4><p>Chalecos para todos, bengalas en vigor, extintores con el manómetro en verde, achique, luces, VHF.</p></div>
<div class="panel"><h4>Plan</h4><p>Dejar dicho en tierra a dónde vas, con quién y cuándo piensas volver.</p></div>
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
<p class="small muted">El patrón es el responsable absoluto del barco y de las personas. La seguridad tiene dos objetivos: evitar el accidente (barco y equipo en buen estado, revisar el material, meteorología antes y al menos una vez al día navegando, buena vigilancia) y, si ocurre, reducir sus consecuencias.</p>`],
["material","Material de seguridad por zonas (RD 339/2021)",`
<p>El <b>RD 339/2021</b> (en vigor desde el 1 de julio de 2021) regula el equipo de seguridad y de prevención de la contaminación según la <b>zona de navegación</b>. Se aplica a los barcos de recreo matriculados en España y también a los de cualquier bandera que naveguen por aguas españolas si sus propietarios o usuarios residen en España (para evitar abanderamientos de conveniencia). Con el PER puedes ir hasta 12 mn: zona 4 como máximo (zonas 2 y 3 con la habilitación a Baleares).</p>
<div class="tablewrap"><table>
<tr><th>Categoría de diseño (CE)</th><th>Viento máx.</th><th>Ola máx.</th><th>Zonas</th><th>Título</th></tr>
<tr><td class="es">A · oceánica</td><td>más de fuerza 8</td><td>más de 4 m</td><td>1 (sin límite)</td><td>Capitán de yate</td></tr>
<tr><td class="es">B · alta mar</td><td>hasta fuerza 8</td><td>hasta 4 m</td><td>2 (60 mn) · 3 (25 mn)</td><td>Patrón de yate (150 mn)</td></tr>
<tr><td class="es">C · aguas costeras</td><td>hasta fuerza 6</td><td>hasta 2 m</td><td>4 (12 mn) · 5 (5 mn de un abrigo) · 6 (2 mn)</td><td>PER · PNB · licencia de navegación</td></tr>
<tr><td class="es">D · aguas protegidas</td><td>hasta fuerza 3</td><td>hasta 0,3 m</td><td>7 (puertos, rías, bahías)</td><td>—</td></tr>
</table></div>
<p class="small">La categoría de diseño (Directiva 2013/53/UE) dice qué viento y ola aguanta el barco por cómo está construido; el RD la vincula a las zonas. Un barco sin marcado CE navega en la zona que le corresponda por su equipo, pero nunca con viento u ola por encima de su categoría. El propietario o patrón responde de que el barco pueda hacerse a la mar sin peligro, de no llevar más personas de las autorizadas y de que el equipo esté certificado (RD 701/2016 de equipos marinos: homologación <b>SOLAS</b> o <b>CE</b>; la norma <b>ISO</b> también sirve para homologar algunos equipos).</p>
<div class="widget"><div class="eyebrow">Interactivo · elige la zona</div>
<div class="seg" id="zoneBtns"></div>
<div class="grid2" style="margin-top:10px;align-items:center"><svg viewBox="0 0 300 180" id="zoneSvg" role="img" aria-label="Distancia de la zona a la costa"></svg><div id="zoneInfo"></div></div></div>
<div class="tablewrap"><table>
<tr><th>Zona</th><th>Límite</th><th>Bengalas de mano</th><th>Cohetes paracaídas</th><th>Fumígenas</th><th>Chaleco</th></tr>
${ZONES.map(z=>`<tr><td>${z.z}</td><td>${z.lim}</td><td>${z.bm||"—"}</td><td>${z.co||"—"}</td><td>${z.fu||"—"}</td><td>${z.ch}</td></tr>`).join("")}
</table></div>
<div class="grid3">
<div class="panel"><h4>Bengala de mano</h4><p>Luz roja ≈ 1 min. Se ve a unas 4 mn de día y 8 de noche. Se enciende <b>por sotavento</b>, con el brazo extendido y sin mirarla.</p></div>
<div class="panel"><h4>Cohete con paracaídas</h4><p>Sube ≈ 300 m y cae despacio ≈ 40 s. Visible a ≈ 16 mn de noche. Vertical, o a unos 45° si hay nubes bajas.</p></div>
<div class="panel"><h4>Señal fumígena</h4><p>Humo naranja ≈ 3 min. <b>Solo de día</b>. Se lanza al agua por sotavento.</p></div>
<div class="panel"><h4>Chalecos</h4><p>Uno por persona, con silbato y bandas reflectantes. Los automáticos se inflan al contacto con el agua: revisa la pastilla y la botella.</p></div>
<div class="panel"><h4>Aro salvavidas</h4><p>Con luz y rabiza flotante. Se lanza a barlovento del náufrago para que el viento se lo acerque.</p></div>
<div class="panel"><h4>Radiobaliza (RLS)</h4><p>Emite en 406 MHz por satélite (Cospas-Sarsat) la identidad y la posición. Las de zafa hidrostática se activan solas al hundirse.</p></div>
</div>
<div class="note"><b>Ojo en el examen.</b> Las pirotécnicas llevan fecha de caducidad: caducadas no cuentan como material válido. Los extintores deben tener eficacia mínima <b>34B</b> según el RD 339/2021 (los manuales antiguos dicen 21B). Para fuego de combustibles se usan de <b>polvo</b> o CO₂.</div>`],
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
["balsauso","Balsa: estiba, lanzamiento y adrizado",`
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
["maltiempo","Mal tiempo y tormentas",`
<figure><svg viewBox="0 0 600 190" role="img" aria-label="Capear y correr el temporal">
<defs><marker id="wv" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--sea)"/></marker></defs>
<g transform="translate(20 0)">
 <text x="130" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">CAPEAR</text>
 ${[50,90,130].map(y=>`<path d="M10 ${y} q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="var(--sea)" stroke-width="2"/>`).join("")}
 <line x1="250" y1="150" x2="250" y2="110" stroke="var(--sea)" stroke-width="3" marker-end="url(#wv)"/><text x="244" y="108" font-size="11" fill="var(--sea)" text-anchor="end">mar y viento</text>
 ${boatTop(130,120,60,200)}
 <text x="130" y="180" text-anchor="middle" font-size="11" fill="var(--muted)">proa a la mar, 1–2 cuartas abierta, poca máquina</text>
</g>
<g transform="translate(320 0)">
 <text x="130" y="20" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)">CORRER EL TEMPORAL</text>
 ${[50,90,130].map(y=>`<path d="M10 ${y} q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="var(--sea)" stroke-width="2"/>`).join("")}
 <line x1="250" y1="150" x2="250" y2="110" stroke="var(--sea)" stroke-width="3" marker-end="url(#wv)"/>
 ${boatTop(130,105,60,10)}
 <text x="130" y="180" text-anchor="middle" font-size="11" fill="var(--muted)">popa a la mar, velocidad similar a la ola</text>
</g></svg></figure>
<ul>
<li>Si el parte anuncia mal tiempo, la mejor decisión es <b>no salir</b>.</li>
<li><span class="es">Capear</span>: aguantar el temporal amurado a la mar, por la proa ligeramente abierta (1–2 cuartas). A motor, con poca pero suficiente máquina para gobernar: los pantocazos son más suaves y se embarca menos agua. A vela, con la <b>mayor de capa</b>, amurado al viento y la ola, abatiendo sin avanzar; un velero solo capea si mar y viento le impiden avanzar con seguridad hacia donde quiere.</li>
<li><span class="es">Correr el temporal</span>: cuando ya no se puede mantener la proa a la mar, navegar de <b>aleta o popa</b>, avanzando con el oleaje y el viento. Hay riesgo de que el barco <b>se atraviese</b>: evitar las <b>guiñadas</b> y, si hace falta, largar cabos por la popa para frenarlo.</li>
<li><b>Nunca atravesarse a la mar</b>: es la máxima exposición. Olas de temporal de 4 m o más rompiendo en el costado pueden volcar el barco. Para dar la vuelta y poner la popa al temporal, hacerlo lo más rápido posible y aprovechando una <b>recalmada</b>.</li>
<li><span class="es">Ancla de capa</span>: saco de lona troncocónico con un aro de refuerzo (flotador arriba y lastre abajo para que quede vertical y sumergido), cuatro <b>pernadas</b> que acaban en una gaza para el cabo y una abertura en el vértice por donde sale el agua. Frena el barco con la proa o la popa a la mar y evita que se atraviese.</li>
<li><span class="es">Estiba y trinca a son de mar</span>: <b>estiba</b> es colocar ordenadamente enseres y víveres. Con mal tiempo, buscando la máxima estabilidad transversal y longitudinal, todo bien <b>trincado</b> (atado) y sin dejar cosas «empachadas» (que haya que mover otras para sacarlas). «A son de mar» = estibar, trincar y <b>arranchar</b> (limpiar y ordenar) con criterio.</li>
<li><b>Aberturas</b>: cerrar herméticamente portillos, escotillas y lumbreras (las de la sala de máquinas, según el tiempo, porque ventilan gases). Manguerotes con la boca a sotavento o directamente tapados (<b>censurados</b>). <b>Grifos de fondo cerrados</b> salvo los que estén trabajando (refrigeración del motor): aseos, fregaderos y achiques, cerrados.</li>
<li><span class="es">Derrota</span>: ruta para ir de un lugar a otro. Trazarla antes de zarpar, analizando peligros y distancia a la costa, dándoles resguardo y teniendo en cuenta corriente y viento.</li>
<li><b>Costa a sotavento</b>: evitarla. Si una avería te deja a la deriva hacia ella, orienta el barco para abatir menos (con bichero, remos, aletas…), fondea aunque el ancla no toque fondo para aproarte y frenar el abatimiento esperando que agarre, y pide auxilio por radio antes de que sea tarde.</li>
<li>Con mal tiempo: chalecos (y arneses) puestos, escotillas y portillos cerrados, objetos trincados, imbornales libres, situación tomada y comunicar el plan.</li>
<li><b>Tormenta eléctrica</b>: si todos los equipos tienen <b>toma de masa</b>, la descarga va al mar sin daños. Aun así, desconectar la electrónica y no tocar partes metálicas. En barcos de fibra y sobre todo de madera conviene un <b>pararrayos</b> en el tope del palo, o unir un obenque a masa con un cable al agua. Al acabar, comprobar el <b>desvío de la aguja</b>.</li>
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
</ol>`],
["mob","Hombre al agua",`
<div class="widget"><div class="eyebrow">Interactivo · las dos maniobras</div>
<div class="row"><button class="btn sm" id="mobA">Ver Anderson</button><button class="btn sm ghost" id="mobW">Ver Boutakow</button><span class="small muted" id="mobT"></span></div>
<figure><svg viewBox="0 0 300 340" id="mobSvg" role="img" aria-label="Trayectoria de la maniobra de hombre al agua" style="max-height:340px">
<rect width="300" height="340" fill="var(--water)" rx="8"/>
<path id="pA" d="${pathA}" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-dasharray="6 4" opacity=".25"/>
<path id="pW" d="${pathW}" fill="none" stroke="var(--sea)" stroke-width="2.4" stroke-dasharray="6 4" opacity=".25"/>
<g><circle cx="146" cy="258" r="7" fill="var(--warn)"/><circle cx="146" cy="258" r="12" fill="none" stroke="var(--warn)" stroke-width="2"/><text x="132" y="262" font-size="11" text-anchor="end" fill="var(--ink)">náufrago</text></g>
<g id="mobBoat"><path d="M0 -12 C 7 -5, 7 4, 5 12 L -5 12 C -7 4, -7 -5, 0 -12 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5"/></g>
</svg></figure></div>
<p>Prevenir es la clave: en 20 segundos un náufrago es casi invisible desde la bañera, y de noche desaparece al instante. La cabeza puede no verse ni a 100 m.</p>
<div class="panel"><h4>Prevención</h4><ul><li>Moverse lo mínimo fuera de la bañera y nunca solo.</li><li>Dos líneas de vida, una por banda, de proa a popa.</li><li>Arneses para al menos el <b>50 %</b> de la tripulación; obligatorios con tiempo fresco, de noche y en maniobras en cubierta.</li><li>Cubierta iluminada de noche al maniobrar; antideslizante y candeleros fuertes.</li><li>«Una mano para el barco y otra para ti».</li></ul></div>
<ol>
<li><b>Dar la voz</b> «¡hombre al agua por estribor/babor!», lanzar el <b>aro</b>, poner a alguien de <b>vigía</b> señalándolo sin perderlo de vista y pulsar <b>MOB</b> en el GPS.</li>
<li>Meter el timón <b>a la banda por la que cayó</b>: así la popa y la hélice se separan del náufrago.</li>
<li><b>Anderson</b>: mantener el timón a esa banda y describir un giro de unos <b>270°</b> hasta tenerlo por la proa. Es la más rápida; se usa cuando se le ve.</li>
<li><b>Boutakow</b> (o Williamson): timón a la banda de caída hasta caer <b>unos 60–70°</b>, después todo a la banda contraria hasta llegar al <b>rumbo opuesto</b>. Se vuelve por la propia estela: sirve de noche o con mala visibilidad.</li>
<li>Si le ves, <b>para el barco</b> enseguida (un barco de recreo maniobra bien) y acércate con poca arrancada, recibiendo el viento por la amura y quedando <b>a barlovento</b> del náufrago: el barco no se aleja y le protege con el casco. Luego te dejas caer hasta él. Valora si con mucha mar la aproximación por barlovento es peligrosa.</li>
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
<div class="note"><b>Ojo.</b> El manual habla de calentar al náufrago «friccionándole». Las pautas actuales de primeros auxilios desaconsejan frotar las extremidades de una persona con hipotermia: mejor quitarle la ropa mojada y calentar el tronco poco a poco.</div>`],
["remolque","Remolque y auxilio",`
<p><span class="es">Remolque</span>: la línea de cabo que une remolcador y remolcado. Se pide por cualquier avería de gobierno o máquina que impida seguir el rumbo.</p>
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
<div class="key"><b>Cómo contactar.</b> Voz por el <b>canal 16</b> (socorro o urgencia), alerta LSD por el <b>canal 70</b>, móvil <span class="mono">900 202 202</span> o <span class="mono">112</span>.</div>`]
],
init(root){
  const es=$("#es",root),gh=$("#gh",root),sv=$("#stSvg",root);
  const up=()=>{const th=+es.value,g=+gh.value;$("#esV",root).textContent=th+"°";$("#gV",root).textContent=g<30?"baja":g<65?"media":"muy alta";
    const yM=70,yG=170-g*1.3,GM=yG-yM;const s=Math.sin(th*Math.PI/180);const GZ=(GM/40)*s;
    const cx=150,cy=140;const rot=-th;
    const sn=Math.sin(th*Math.PI/180),cs=Math.cos(th*Math.PI/180);const Cx=150-70*sn,Cy=178;const Mx=150-70*sn,My=140-70*cs;const Gx=150-(140-yG)*sn,Gy=140-(140-yG)*cs;
    const gz=GM*s;
    $("#stTxt",root).innerHTML=GM>0?`<span class="pass">Estable</span>: M por encima de G. Brazo adrizante GZ ≈ ${(GZ).toFixed(2)} (relativo)`:`<span class="fail">Inestable</span>: G por encima de M, el barco tiende a volcar.`;
    sv.innerHTML=`<rect x="0" y="120" width="300" height="120" fill="var(--water)"/><line x1="0" y1="120" x2="300" y2="120" stroke="var(--sea)" stroke-dasharray="5 4"/>
    <g transform="rotate(${rot} ${cx} ${cy})"><path d="M70 60 Q 70 190 150 205 Q 230 190 230 60 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/><line x1="150" y1="40" x2="150" y2="210" stroke="var(--muted)" stroke-dasharray="4 3"/>
    <circle cx="150" cy="${yG}" r="6" fill="var(--accent)"/><text x="158" y="${yG+4}" font-size="13" font-weight="700" fill="var(--accent)">G</text></g>
    <circle cx="${Cx}" cy="${Cy}" r="6" fill="var(--sea)"/><text x="${Cx+9}" y="${Cy+4}" font-size="13" font-weight="700" fill="var(--sea)">C</text>
    <line x1="${Cx}" y1="${Cy}" x2="${Mx}" y2="${My}" stroke="var(--sea)" stroke-width="2" stroke-dasharray="3 3"/><line x1="${Cx}" y1="${Cy}" x2="${Cx}" y2="${Cy-34}" stroke="var(--sea)" stroke-width="3"/><text x="${Cx-8}" y="${Cy-20}" font-size="11" fill="var(--sea)" text-anchor="end">empuje</text>
    <line x1="${Gx}" y1="${Gy}" x2="${Gx}" y2="${Gy+34}" stroke="var(--accent)" stroke-width="3"/><text x="${Gx+8}" y="${Gy+30}" font-size="11" fill="var(--accent)">peso</text>
    ${th>=3?`<circle cx="${Mx}" cy="${My}" r="5" fill="var(--ink)"/><text x="${Mx-10}" y="${My+4}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">M</text>`:""}
    <text x="10" y="20" font-size="12" fill="var(--muted)">Escora ${th}°</text>`};
  es.addEventListener("input",up);gh.addEventListener("input",up);up();
  const zb=$("#zoneBtns",root),zs=$("#zoneSvg",root),zi=$("#zoneInfo",root);
  const D=[999,60,25,12,5,2,0.4];
  zb.innerHTML=[1,2,3,4,5,6,7].map(z=>`<button class="btn sm ${z===4?"":"ghost"}" data-z="${z}" aria-pressed="${z===4}">Zona ${z}</button>`).join("");
  const showZ=z=>{const Z=ZONES[z-1];$$("button",zb).forEach(b=>{const on=+b.dataset.z===z;b.classList.toggle("ghost",!on);b.setAttribute("aria-pressed",on)});
    const w=z===1?280:Math.max(14,Math.min(270,Math.log(D[z-1]+1)/Math.log(61)*270));
    zs.innerHTML=`<rect width="300" height="180" fill="var(--water)" rx="8"/><rect x="0" y="0" width="22" height="180" fill="var(--land)"/><rect x="22" y="30" width="${w}" height="120" fill="var(--sea)" opacity=".22"/><line x1="${22+w}" y1="30" x2="${22+w}" y2="150" stroke="var(--sea)" stroke-width="2" ${z===1?'stroke-dasharray="6 4"':""}/><text x="${Math.min(22+w/2+10,240)}" y="96" font-size="13" font-weight="700" fill="var(--ink)" text-anchor="middle">${z===1?"sin límite":z===7?"puerto":D[z-1]+" mn"}</text><text x="6" y="20" font-size="11" fill="var(--ink)">costa / abrigo</text>${z>=5&&z<=6?'<text x="30" y="170" font-size="10" fill="var(--muted)">distancia a un puerto o abrigo</text>':""}`;
    zi.innerHTML=`<h3 style="margin-top:0">Zona ${Z.z}</h3><p class="muted">${Z.lim}</p><ul><li>Chaleco <b>${Z.ch}</b>, uno por persona, ${Z.z<=3?"con luz":"con luz (se puede prescindir de ella si solo navegas de día)"}</li><li>${Z.bm?Z.bm+" bengalas de mano":"Sin bengalas obligatorias"}</li>${Z.co?`<li>${Z.co} cohetes con paracaídas</li>`:""}${Z.fu?`<li>${Z.fu} fumígena${Z.fu>1?"s":""} flotante${Z.fu>1?"s":""}</li>`:""}${Z.balsa?"<li>Balsa salvavidas para todos</li>":""}${Z.aro?(Z.z===1?"<li>2 aros salvavidas: uno con luz y rabiza y otro sin ellas</li>":"<li>Aro salvavidas con luz y rabiza</li>"):""}</ul>${Z.z===4?'<p class="small" style="color:var(--accent)">Es el máximo con el PER (12 mn).</p>':""}`};
  zb.addEventListener("click",e=>{const b=e.target.closest("button");if(b)showZ(+b.dataset.z)});showZ(4);
  const boat=$("#mobBoat",root);let raf=0;
  const run=(id,label)=>{cancelAnimationFrame(raf);const p=$("#"+id,root);$("#pA",root).style.opacity=id==="pA"?1:.15;$("#pW",root).style.opacity=id==="pW"?1:.15;$("#mobT",root).textContent=label;
    const L=p.getTotalLength();let t0=null;const dur=5200;
    const step=ts=>{if(!t0)t0=ts;const k=Math.min(1,(ts-t0)/dur);const a=p.getPointAtLength(k*L),b=p.getPointAtLength(Math.min(L,k*L+1));const ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+90;boat.setAttribute("transform",`translate(${a.x} ${a.y}) rotate(${ang})`);if(k<1)raf=requestAnimationFrame(step)};
    raf=requestAnimationFrame(step)};
  $("#mobA",root).addEventListener("click",()=>run("pA","Anderson: un solo giro de ≈270° hacia la banda de caída."));
  $("#mobW",root).addEventListener("click",()=>run("pW","Boutakow: 60–70° a una banda, luego toda a la otra hasta el rumbo opuesto."));
  boat.setAttribute("transform","translate(150 318)");
}};
