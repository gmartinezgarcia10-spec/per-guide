import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

rep('''<ul><li><b>Abatimiento (Abt)</b>: ángulo entre la proa (Rv) y la derrota en el agua (rumbo de superficie, Rs) por efecto del viento. Viento por <b>babor</b> → te desplaza a estribor → Abt <b>+</b>. Viento por <b>estribor</b> → Abt <b>−</b>. <span class="formula">Rs = Rv + Abt</span>.</li>
<li><b>Corriente</b>: se da por su rumbo (Rc, <b>hacia dónde va</b>) y su intensidad horaria (Ihc, en nudos). Rumbo efectivo y velocidad efectiva salen de sumar vectores.</li></ul>''',
'''<ul><li><b>Viento</b>: aire en movimiento. Su dirección se da siempre <b>de dónde viene</b>, no hacia dónde va: un viento NE nos «entra» del 045°.</li>
<li><span class="es">Rumbo de superficie (Rs)</span>: el viento hace que el barco se deslice de lado hacia sotavento <b>sin cambiar la dirección de la proa</b>. El rumbo que traza de verdad sobre el agua ya no es el Rv: es el Rs.</li>
<li><b>Abatimiento (Abt, en el manual «ab»)</b>: ángulo entre la proa (Rv) y el rumbo de superficie (Rs) por efecto del viento. Viento por <b>babor</b> → te desplaza a estribor → Abt <b>+</b>. Viento por <b>estribor</b> → Abt <b>−</b>. <span class="formula">Rs = Rv + Abt</span>.</li>
<li>Con viento por la <b>proa (0°)</b> o por la <b>popa (180°)</b> no hay abatimiento: el viento solo frena o empuja.</li>
<li>Con el mismo viento, cada barco abate distinto según su obra viva y su obra muerta. Las <b>lanchas de motor</b> de fondo plano, sin apéndices y con mucho francobordo abaten mucho con viento de través o por la amura, y cuesta atracarlas y desatracarlas (de ahí las hélices de proa). Los <b>veleros</b>, con quilla y pala de timón y menos obra muerta, lo aguantan mucho mejor.</li>
<li><b>Contrarrestar el abatimiento</b>: cae hacia barlovento (la banda contraria a la que abates) los mismos grados que abates. El rumbo a seguir: <span class="formula">Rv = Rs − Abt</span>. Ejemplo del manual: quieres un Rs de 225° con viento del NW (315°) que te abate 5°. El viento entra por estribor → Abt −5° → Rv = 225° − (−5°) = <b>230°</b>.</li>
<li><b>Corriente</b>: movimiento del agua en una dirección. Se da por su rumbo (Rc, <b>hacia dónde va</b>, al revés que el viento) y su intensidad horaria (Ihc o Ic, en nudos). Afecta sobre todo a la velocidad y a la derrota.</li>
<li>Causas: temperatura y densidad del agua (<b>oceánicas</b>), viento constante (<b>de impulsión</b> o superficie), diferencia de nivel (<b>de descarga</b>, como la general del Estrecho) y las <b>mareas</b> (las más frecuentes y complicadas). En el Estrecho, el Mediterráneo evapora más de lo que recibe y el agua atlántica entra hacia el <b>E</b>, con intensidad variable que en verano llega a <b>4 nudos</b>.</li>
<li><span class="es">Deriva (D)</span>: ángulo entre el Rv y el <b>rumbo efectivo (Ref)</b>, la derrota real sobre el fondo. A diferencia del abatimiento, que depende de cada barco, la deriva afecta <b>igual a todos</b>.</li>
<li><b>Triángulo de vectores</b>: <b>Rv con Vm</b> (velocidad de máquinas o del barco, Vb: la que marca la corredera sobre el agua) + <b>Rc con Ihc</b> = <b>Ref con Vef</b> (rumbo y velocidad efectivos o sobre el fondo, la única referencia inmóvil).</li>
<li><b>Casos especiales</b>: si Rv y Rc son <b>iguales</b>, Ref = Rv y <span class="formula">Vef = Vm + Ihc</span>. Si son <b>opuestos</b> (con Vm &gt; Ihc), Ref = Rv y <span class="formula">Vef = Vm − Ihc</span>. Si Vm = Ihc, el barco no avanza nada sobre el fondo; si Ihc &gt; Vm, retrocede.</li></ul>''')

rep('''<li><b>Regla de los doceavos</b>: en las 6 horas entre bajamar y pleamar, sube 1/12, 2/12, 3/12, 3/12, 2/12 y 1/12 de la amplitud. Lo más rápido, en las horas centrales.</li>
</ul>`]
],''',
'''<li><b>Regla de los doceavos</b>: en las 6 horas entre bajamar y pleamar, sube 1/12, 2/12, 3/12, 3/12, 2/12 y 1/12 de la amplitud. Lo más rápido, en las horas centrales.</li>
</ul>`],
["formulas","Abreviaturas y fórmulas",`
<div class="tablewrap"><table>
<tr><th>Abrev.</th><th>Significado</th><th>Abrev.</th><th>Significado</th></tr>
<tr><td>Abt (ab)</td><td>Abatimiento</td><td>Ic · Ihc</td><td>Intensidad (horaria) de la corriente</td></tr>
<tr><td>Br · Er</td><td>Babor · Estribor</td><td>K</td><td>Coeficiente de corredera</td></tr>
<tr><td>D</td><td>Deriva</td><td>l · le · lv</td><td>Latitud · estimada · verdadera</td></tr>
<tr><td>Da · Dm · Dv</td><td>Demora de aguja · magnética · verdadera</td><td>L · Le · Lv</td><td>Longitud · estimada · verdadera</td></tr>
<tr><td>dm</td><td>Declinación magnética</td><td>M</td><td>Marcación</td></tr>
<tr><td>Δ</td><td>Desvío</td><td>Ra · Rm · Rv</td><td>Rumbo de aguja · magnético · verdadero</td></tr>
<tr><td>GMT · T.U.</td><td>Hora del meridiano de Greenwich · Tiempo universal</td><td>Rc · Ref · Rs</td><td>Rumbo de la corriente · efectivo · de superficie</td></tr>
<tr><td>HCL</td><td>Hora civil del lugar</td><td>Sc</td><td>Sonda de la carta</td></tr>
<tr><td>HRB</td><td>Hora del reloj de bitácora</td><td>Se · Sv</td><td>Situación estimada · verdadera</td></tr>
<tr><td>Vb · Vm</td><td>Velocidad del barco · de máquinas</td><td>Vef</td><td>Velocidad efectiva</td></tr>
</table></div>
<div class="tablewrap"><table>
<tr><th>Fórmula</th><th>En palabras</th></tr>
<tr><td><span class="formula">Ct = dm + Δ</span></td><td>declinación con su signo más desvío con su signo</td></tr>
<tr><td><span class="formula">Rv = Ra + Ct</span></td><td>de aguja a verdadero se suma la Ct</td></tr>
<tr><td><span class="formula">Ra = Rv − Ct</span></td><td>de verdadero a aguja se resta</td></tr>
<tr><td><span class="formula">Dv = Da + Ct</span></td><td>igual con las demoras</td></tr>
<tr><td><span class="formula">Ct = Dv − Da</span></td><td>Ct con una enfilación u oposición</td></tr>
<tr><td><span class="formula">Rs = Rv + Abt</span></td><td>rumbo de superficie con el abatimiento</td></tr>
<tr><td><span class="formula">Rv = Rs − Abt</span></td><td>qué proa llevar para compensar el abatimiento</td></tr>
<tr><td><span class="formula">Dv = Rv + M</span></td><td>de marcación a demora verdadera</td></tr>
<tr><td><span class="formula">D = V · t</span></td><td>distancia, velocidad y tiempo</td></tr>
<tr><td><span class="formula">Sonda = Sc + altura de marea</span></td><td>con la corrección por presión</td></tr>
</table></div>
<p class="small muted">Todas las cantidades van con su signo: dm y Δ, + al E y − al W; M y Abt, + por estribor y − por babor (el Abt + cuando el viento entra por babor).</p>`]
],''')

QS=r'''PER.Q.push(
["teoria","Un viento NE es el que…",["Va hacia el NE","Viene del NE, del 045°","Viene del 225°","Gira al NE"],1,"El viento se nombra por de dónde viene."],
["teoria","La dirección de una corriente indica…",["De dónde viene","Hacia dónde va","Su intensidad","Su temperatura"],1,"Al revés que el viento."],
["teoria","El rumbo de superficie es…",["El rumbo de aguja","El que sigue el barco sobre el agua por efecto del viento","El rumbo sobre el fondo","El de la corriente"],1,"Rs = Rv + Abt."],
["teoria","El abatimiento cambia la dirección de la proa…",["Sí, siempre","No: el barco se desliza de lado sin cambiar la proa","Solo en veleros","Solo con corriente"],1,""],
["teoria","Con el viento justo por la proa o por la popa, el abatimiento es…",["Máximo","Nulo; el viento solo frena o empuja","Positivo","Negativo"],1,""],
["teoria","Abaten más con viento de través…",["Los veleros con quilla","Las lanchas de motor planas con mucha obra muerta","Los barcos de calado profundo","Todos igual"],1,"Los veleros resisten mejor gracias a quilla y timón."],
["teoria","Para contrarrestar el abatimiento hay que caer…",["Hacia sotavento","Hacia barlovento los mismos grados que se abate","Hacia el viento el doble","A la vía"],1,""],
["teoria","El Rv a seguir para compensar el abatimiento es…",["Rv = Rs + Abt","Rv = Rs − Abt","Rv = Ra + Abt","Rv = Rs"],1,""],
["teoria","Quieres un Rs de 225° con viento del NW que te abate 5°. Debes navegar a Rv…",["220°","230°","225°","235°"],1,"El viento entra por estribor: Abt −5°; Rv = 225° + 5°."],
["teoria","La corriente general del Estrecho de Gibraltar es de tipo…",["Oceánica","De descarga, hacia el E","De marea, hacia el W","De impulsión, hacia el N"],1,"Puede llegar a 4 nudos en verano."],
["teoria","Las corrientes más frecuentes y complicadas para la navegación son las…",["Oceánicas","De marea","De descarga","De impulsión"],1,""],
["teoria","Las corrientes provocadas por un viento constante se llaman…",["De descarga","De impulsión o de superficie","De marea","Oceánicas"],1,""],
["teoria","La deriva es el ángulo entre…",["Rv y Rs","Rv y el rumbo efectivo","Ra y Rv","Rc y Rs"],1,"Afecta igual a todas las embarcaciones."],
["teoria","A diferencia del abatimiento, la deriva…",["Depende de cada barco","Afecta por igual a todos los barcos","Es siempre nula","Solo afecta a veleros"],1,""],
["teoria","El rumbo efectivo también se llama…",["Rumbo de superficie","Rumbo sobre el fondo","Rumbo de aguja","Rumbo magnético"],1,"El fondo es la única referencia inmóvil."],
["teoria","La velocidad de máquinas (Vm) es la que…",["Da el GPS sobre el fondo","El barco hace sobre el agua y marca la corredera","Lleva la corriente","Resulta del triángulo"],1,""],
["teoria","Rv 090° a 6 nudos con corriente de Rc 090° e Ihc 2 nudos. La Vef es…",["4 nudos","8 nudos","6 nudos","2 nudos"],1,"Mismo sentido: se suman."],
["teoria","Rv 090° a 6 nudos con corriente de Rc 270° e Ihc 2 nudos. La Vef es…",["8 nudos","4 nudos","6 nudos","3 nudos"],1,"Sentidos opuestos: se restan."],
["teoria","Si la corriente va justo en contra del barco con la misma intensidad que su Vm…",["Avanza al doble","No avanza sobre el fondo","Retrocede al doble","Cambia de rumbo"],1,"Vef = 0; si Ihc > Vm, retrocede."],
["teoria","«Ihc» significa…",["Intensidad horaria de la corriente","Índice de hora civil","Inclinación del casco","Intensidad del viento"],0,""],
["teoria","«Sc» en los ejercicios de carta es…",["Situación corregida","Sonda de la carta","Superficie","Sector"],1,""],
["teoria","«HCL» significa…",["Hora del reloj de bitácora","Hora civil del lugar","Hora de Greenwich","Hora de llegada"],1,""],
["teoria","«Se» y «Sv» son…",["Sur estimado y sur verdadero","Situación estimada y situación verdadera","Sonda estimada y verdadera","Sector y sonda"],1,""],
["teoria","El rumbo de superficie se calcula con…",["Rs = Rv − Abt","Rs = Rv + Abt","Rs = Ra + Ct","Rs = Rv + M"],1,""]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
