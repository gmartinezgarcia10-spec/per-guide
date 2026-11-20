// @ts-nocheck
/* Tema 8: CH[8] = {intro, sections, init}. Moved verbatim from src/legacy/chapters.js in F5.
   Shared helpers come from window.PER (src/core/per.ts). */
const {$,$$,CH,boatTop}=PER;

/* ================= TEMA 8 · EMERGENCIAS ================= */
const FIRE={A:["Alfa · sólidos que hacen llama y brasa (madera, papel, lona, cabos), salvo metales","Enfriamiento con chorro de agua; también espuma o polvo ABC"],B:["Bravo · líquidos que arden en superficie: gasolina, gasoil, aceites, pinturas, alcohol","Sofocación: espuma o gas inerte; niebla de agua para enfriar. ¡Nunca agua a chorro!"],C:["Charlie · gases a presión: butano, propano, metano, hidrógeno","Cortar el gas; sofocación con gas inerte (o polvo)"],D:["Delta · metales ligeros: aluminio, magnesio (no alcalinos como sodio o potasio)","Polvos especiales (cloruro sódico, polvo de cobre para litio)"],F:["Aceites de cocina","Tapar (manta ignífuga) o extintor clase F. Nunca agua"],E:["Echo · equipos eléctricos con tensión (o un A–D en presencia de ellos)","Cortar la corriente. CO₂ o polvo seco. Nunca agua ni otro conductor"]};
CH[8]={
intro:"Tres preguntas: fuego, vías de agua, varada, abordaje, primeros auxilios y abandono. La idea que repite el examen es siempre la misma: primero valorar la situación y mantener la calma.",
sections:[
["fuego","Incendios",`
<div class="widget"><div class="eyebrow">Interactivo · el triángulo del fuego</div>
<div class="grid2" style="align-items:center"><svg viewBox="0 0 300 260" id="ftSvg" role="img" aria-label="Triángulo del fuego"></svg>
<div><p class="small">Quita un lado del triángulo y el fuego se apaga. Cada forma de extinción ataca uno:</p>
<div class="seg"><button class="btn sm ghost ft" data-k="comb">Quitar combustible</button><button class="btn sm ghost ft" data-k="ox">Quitar oxígeno</button><button class="btn sm ghost ft" data-k="cal">Quitar calor</button><button class="btn sm ghost ft" data-k="">Restaurar</button></div>
<p id="ftTxt" style="font-weight:600"></p></div></div></div>
<div class="widget"><div class="eyebrow">Interactivo · qué extintor uso</div>
<div class="seg" id="fcBtns">${Object.keys(FIRE).map(k=>`<button class="btn sm ghost" data-c="${k}">Clase ${k}</button>`).join("")}</div><div class="info" id="fcInfo" style="margin-top:8px">Elige una clase de fuego.</div>
<p class="small muted">Clases UNE-EN 2: A, B, C, D y F. La «E» (eléctrico) no es una clase oficial pero el manual y el examen la usan. Clase F (Foxtrot): aceites y grasas de cocina; agente químico húmedo (espuma AFF de pH bajo) que enfría y forma una capa que impide que se reactive.</p></div>
<ol>
<li>Dar la <b>alarma</b> y pedir ayuda si no se controla en segundos.</li>
<li><b>Parar motores</b>, cortar el <b>combustible</b> y la <b>electricidad</b>.</li>
<li>Cerrar escotillas y puertas para quitar aire, y orientar el barco para que el fuego quede <b>a sotavento</b> del resto del barco y de las personas.</li>
<li>Atacar con el extintor a la <b>base de las llamas</b>, desde barlovento, en ráfagas cortas.</li>
</ol>
<h3>Tetraedro del fuego y métodos de extinción</h3>
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
<p><b>Dónde empieza</b>: cocina, cámara de motores, baterías (desprenden hidrógeno al cargar), instalación eléctrica, pañol de pinturas. <b>Al repostar</b>: motores y fogones apagados, no fumar, escotillas cerradas, imbornales tapados y ventilar después.</p>`],
["agua","Vías de agua",`
<figure><svg viewBox="0 0 600 200" role="img" aria-label="Puntos débiles del casco"><rect width="600" height="200" fill="none"/>
<rect x="0" y="100" width="600" height="100" fill="var(--water)"/>
<path d="M60 70 L540 60 C 528 100, 505 140, 462 160 L 122 164 L 82 138 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
${[[112,150,"limera (timón)"],[195,163,"bocina (eje)"],[300,163,"grifos de fondo"],[380,160,"tomas de mar / sonda"],[470,100,"manguitos y abrazaderas"]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="8" fill="var(--bad)" opacity=".8"/><text x="${p[0]}" y="${i%2?40:24}" text-anchor="middle" font-size="12" fill="var(--ink)">${p[2]}</text><line x1="${p[0]}" y1="${(i%2?40:24)+4}" x2="${p[0]}" y2="${p[1]-9}" stroke="var(--muted)"/>`).join("")}
</svg></figure>
<p>Además de varadas y abordajes, el agua suele entrar por los orificios de la obra viva: <b>bocina, limera, grifos de fondo</b> de servicios y fregaderos, <b>manguitos, abrazaderas, escapes</b> e <b>imbornales</b> de la bañera. Hay que revisarlos periódicamente.</p>
<div class="key"><b>Primeras medidas</b>: localizar la vía de agua y <b>achicar</b> (el examen lo resume en «achicar e intentar taponar»).</div>
<ul><li><b>Localizar</b> la entrada (escuchar, palpar, ver de dónde sube el agua) y comprobar si es agua salada o dulce (puede ser un depósito).</li>
<li><b>Achicar</b> con las bombas eléctricas y manuales, y con baldes si hace falta.</li>
<li><b>Taponar</b>: <span class="es">espiches</span> (tapones cónicos de madera; conviene tener uno atado junto a cada grifo de fondo), trapos, cuñas o un <span class="es">pallete de colisión</span> (lona por fuera del casco, que la presión del agua aprieta).</li>
<li>Escorar el barco a la banda contraria para sacar la brecha del agua, si está cerca de la flotación y la mar es muy buena.</li>
<li><b>Bombas</b>: las manuales, de al menos <b>medio litro por embolada</b>; las eléctricas, unos <b>1.800 L/h</b>. Llevar <b>rotores de repuesto</b>: las palas se calientan y rompen al trabajar en vacío. Muy útiles las automáticas con sensor de nivel.</li>
<li><b>Otras medidas de fortuna</b>: <span class="es">turafallas</span> (disco de fieltro, goma o lona con un eje roscado y un brazo articulado que forman una «T»); sobre la flotación, con la zona seca, un tablero de <b>contrachapado marino</b> sellado con sicaflex o silicona; vías grandes, mantas, colchonetas o almohadas apuntaladas con puntales de madera. Las <b>encajonadas de cemento</b> (cajones apuntalados y rellenos de cemento rápido) no se usan en recreo.</li>
<li>Toda vía de agua implica <b>rumbo al puerto más cercano</b> o al más fácil de recalar.</li></ul>`],
["varada","Varada y abordaje",`
<div class="grid2">
<div class="panel"><h4>Varada involuntaria</h4><ol class="small"><li>Parar máquina y valorar daños en la obra viva: ¿hay vías de agua?</li><li>Sondar alrededor para ver por dónde hay más agua.</li><li>Valorar la resistencia del casco y la estabilidad según los puntos de apoyo (si baja la marea, un velero con orza puede acostarse y sufrir daños graves).</li><li>Reflotar: esperar a que suba la marea, trasladar pesos para cambiar el asiento o escorar hacia el lado de más fondo, aligerar carga, espiarse con el ancla o pedir remolque. Para avisar a Salvamento, canal 16.</li></ol></div>
<div class="panel"><h4>Abordaje</h4><ol class="small"><li>Investigar la gravedad de las averías y <b>detener el barco</b>. Comprobar si hay heridos.</li><li>Prestar ayuda al barco dañado.</li><li><b>No separarse</b> sin evaluar juntos la situación: la proa empotrada puede estar taponando la vía de agua y el abordado se hundiría.</li><li>Tomar los datos del otro (barco, seguro, titulación del patrón) y comunicarlo a la aseguradora; en tierra, pedir la <b>peritación</b>.</li><li>Si estás seguro de no ser culpable, formular una <b>protesta de mar</b> ante el juzgado más próximo.</li></ol></div>
</div>
<div class="tablewrap"><table>
<tr><th>Tipo de varada</th><th>Qué hacer</th></tr>
<tr><td>En seco (ha bajado la marea)</td><td>Apuntalar el barco, reparar averías y reflotar en pleamar con remolque y escora.</td></tr>
<tr><td>Fondo fangoso</td><td>No suele haber daños, pero el barco se incrusta, la hélice queda atrapada y las tomas de refrigeración pueden obturarse. Trasladar pesos para cambiar el asiento, anular el efecto ventosa «rabeando» (moviendo lateralmente a un lado y a otro), esperar la marea y, en el peor caso, aligerar carga.</td></tr>
<tr><td>Fondo rocoso</td><td>Si <b>no hay vías de agua</b>, <b>dar atrás rápidamente</b> o desplazar pesos para aliviar la zona varada.</td></tr>
<tr><td>Velero</td><td>Provocar escora para que pierda calado: izar todo el aparejo o templar una driza desde la perilla del palo (otra embarcación tira de ella desde su popa y da avante), controlando las tensiones del mástil. En el Mediterráneo, sin mareas, casi siempre hará falta otra embarcación.</td></tr>
</table></div>`],
["auxilios","Primeros auxilios",`
<div class="tablewrap"><table>
<tr><th>Situación</th><th>Qué hacer</th><th>Qué no hacer</th></tr>
<tr><td>Hemorragia</td><td>Presión directa con gasa limpia (unos 15 min) y elevar el miembro</td><td>Torniquete salvo último recurso</td></tr>
<tr><td>Hemorragia nasal</td><td>Sentarle y que se apriete suavemente las fosas nasales</td><td>Echar la cabeza hacia atrás</td></tr>
<tr><td>Quemadura</td><td>Agua fría 10–20 min, cubrir con apósito limpio (graso)</td><td>Reventar las ampollas, poner hielo</td></tr>
<tr><td>Golpe de calor / insolación</td><td>Sombra, enfriar, agua a sorbos si está consciente</td><td></td></tr>
<tr><td>Hipotermia</td><td>Quitar la ropa mojada, abrigar, calentar el tronco poco a poco, bebidas calientes</td><td>Alcohol, frotar las extremidades</td></tr>
<tr><td>Mareo</td><td>Aire fresco, mirar el horizonte, centro del barco, llevar el timón, comer algo ligero</td><td>Bajar al interior, leer</td></tr>
<tr><td>Ahogado inconsciente que no respira</td><td>RCP: 30 compresiones y 2 insuflaciones. Abrir la vía aérea con la maniobra frente-mentón</td><td>Perder tiempo intentando sacar el agua de los pulmones</td></tr>
<tr><td>Fractura</td><td>Inmovilizar en la postura en que esté</td><td>Intentar recolocarla</td></tr>
</table></div>
<div class="widget"><div class="eyebrow">Interactivo · ritmo de compresiones</div>
<div class="row"><button class="btn sm" id="rcpB">Iniciar metrónomo 110/min</button><span class="count" style="font-size:40px" id="rcpN">0</span><span class="muted small">de 30, luego 2 insuflaciones</span></div>
<p class="small muted">Comprime el centro del pecho 5–6 cm, a 100–120 por minuto, dejando que el pecho vuelva entero.</p></div>
<h3>Lo que dice el manual</h3>
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
<p>Botiquín: el que corresponde a la zona de navegación.</p>`],
["abandono","Abandono, helicóptero y comunicaciones",`
<ul>
<li><b>Abandonar el barco es el último recurso</b>: solo con peligro inminente de hundimiento o un incendio declarado con gran riesgo de explosión. Se está más seguro encima del barco, aunque esté escorado, semihundido o con la quilla al aire.</li>
<li>Antes: instruir a quien embarca sobre los medios de salvamento y dónde están; decidido el abandono, alerta de socorro por <b>LSD canal 70</b> o voz por el <b>16</b> indicando la naturaleza («abandono»), activar el <b>respondedor de radar</b> y la <b>radiobaliza</b>; coger agua (lo primero para sobrevivir), comida energética y la pirotecnia.</li>
<li><b>Saltar al agua</b> por <b>sotavento</b> (por barlovento si hay incendio o combustible derramado a sotavento), con el chaleco puesto, de pie y los brazos cruzados sujetándolo. El chaleco hinchable no se dispara hasta estar en el agua. Traje de agua puesto y bien cerrado en muñecas, tobillos y cuello: aísla. Alejarse unos metros, siempre hacia la balsa.</li>
<li><b>En el agua</b>: los peligros son asfixia, hipotermia, sed, hambre y estrés por miedo. Posición <b>fetal</b> (HELP: rodillas a la barbilla, brazos cruzados al pecho, pies cruzados). En grupo, <b>agruparse</b> o formar un <b>círculo</b> cogidos de los brazos: conserva calor, ayuda a los más débiles y se ve mejor. Si se ve un buque, encender una bengala o bote de humo en el centro del círculo.</li>
<li><b>Pirotecnia</b>: solo cuando haya certeza de que alguien la puede ver, siempre por sotavento; leer antes las instrucciones.</li>
<li>La <b>balsa</b> se lanza por sotavento, sujeta por su boza (al tirar de ella se infla). Se sube sin mojarse si se puede; si hay que saltar al agua, con los brazos cruzados sobre el chaleco y las piernas juntas.</li>
<li><b>Evacuación en helicóptero</b>: despejar la cubierta, navegar a rumbo constante con el viento entrando por la <b>amura de babor</b> (unos 30°), no tocar el cable ni el gancho hasta que toquen el agua o el barco (descarga electrostática) y nunca hacerlo firme al barco.</li>
<li><b>Prioridad de las llamadas</b>: MAYDAY (socorro, peligro grave e inminente) &gt; PAN PAN (urgencia) &gt; SÉCURITÉ (seguridad, avisos). Canal 16 VHF, LSD por el 70.</li>
</ul>
<div class="script">MAYDAY MAYDAY MAYDAY
AQUÍ  [nombre ×3]  [indicativo]  MMSI [nº]
MAYDAY  [nombre]
POSICIÓN  [lat/long o demora y distancia]
NATURALEZA  [vía de agua / incendio / hombre al agua…]
AYUDA REQUERIDA · [nº] PERSONAS A BORDO · otra info
CAMBIO</div>`]
],
init(root){
  const sv=$("#ftSvg",root);
  const draw=k=>{const f=!k;const side=(p,q,lab,key,tx,ty)=>`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="${key===k?"var(--line)":"var(--accent)"}" stroke-width="10" stroke-linecap="round" ${key===k?'stroke-dasharray="2 14"':""}/><text x="${tx}" y="${ty}" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">${lab}</text>`;
    sv.innerHTML=`${side([150,30],[40,220],"COMBUSTIBLE","comb",55,110)}${side([150,30],[260,220],"OXÍGENO","ox",250,110)}${side([40,220],[260,220],"CALOR","cal",150,250)}
    ${f?`<path d="M150 190 C 120 170, 128 130, 150 100 C 152 125, 168 130, 162 150 C 175 140, 178 120, 172 110 C 195 135, 190 180, 150 190 Z" fill="#ff7a1a"/><path d="M150 188 C 136 176, 140 156, 150 140 C 156 158, 166 166, 150 188Z" fill="#ffd60a"/>`:`<text x="150" y="160" text-anchor="middle" font-size="14" fill="var(--muted)">apagado</text>`}`;
    $("#ftTxt",root).innerHTML={comb:"Cortar el combustible o retirar lo que arde.",ox:"Sofocar: cerrar escotillas, manta, espuma, CO₂.",cal:"Enfriar: agua (solo clase A).","":"Con los tres lados (y la reacción en cadena) hay fuego."}[k]};
  $$(".ft",root).forEach(b=>b.addEventListener("click",()=>draw(b.dataset.k)));draw("");
  $$("#fcBtns button",root).forEach(b=>b.addEventListener("click",()=>{$$("#fcBtns button",root).forEach(x=>x.classList.toggle("ghost",x!==b));const f=FIRE[b.dataset.c];$("#fcInfo",root).innerHTML=`<b>Clase ${b.dataset.c}</b>: ${f[0]}. → ${f[1]}.`}));
  let t=null,n=0;const b=$("#rcpB",root);
  b.addEventListener("click",()=>{if(t){clearInterval(t);t=null;b.textContent="Iniciar metrónomo 110/min";return}n=0;b.textContent="Parar";t=setInterval(()=>{n=n%30+1;$("#rcpN",root).textContent=n;PER.horn(".",0.25)},545)});
  this._cleanup=()=>{if(t)clearInterval(t)};
}};
