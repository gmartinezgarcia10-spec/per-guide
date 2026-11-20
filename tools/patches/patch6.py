import sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding="utf-8").read()
def rep(old,new,count=1):
    global s
    c=s.count(old); assert c==count,(c,old[:90]); s=s.replace(old,new)

rep('"Al Bu Y":{c:"#4aa3ff",alt:"#ffd60a",seq:[[1000,0],[1000,0]],txt:"Alternativa azul/amarilla: peligro nuevo"}',
    '"Al Bu Y":{c:"#4aa3ff",alt:"#ffd60a",seq:[[1000,500],[1000,500]],txt:"Azul 1 s y amarilla 1 s, con 0,5 s de oscuridad entre ambas: peligro nuevo"}')
rep('"Fl(2) 5s","No te acerques: pásala a buena distancia por cualquier lado."]',
    '"Fl(2) 5s","Pásala a distancia prudente, mejor por su sotavento si hace mal tiempo."]')

NEW='''["iala","Sistema IALA/AISM: qué balizan y cómo se distinguen",`
<p>La <b>AISM</b> (Asociación Internacional de Señalización Marítima; en inglés <b>IALA</b>) define <b>seis tipos de marcas</b>, combinables entre sí: laterales, cardinales, peligro aislado, aguas navegables, especiales y peligro nuevo.</p>
<p><b>Qué balizan</b>: límites laterales de los canales, peligros naturales y obstáculos (naufragios), recalada y rumbo a seguir, otras zonas de interés y peligros nuevos. <b>No</b> se incluyen faros, luces de sector, enfilaciones, buques faro ni grandes boyas de navegación.</p>
<div class="grid2">
<div class="panel"><h4>De día</h4><ul><li><b>Forma</b>: castillete, espeque, cónica, cilíndrica o esférica.</li><li><b>Color</b>: rojo, verde, negro, amarillo, blanco, y combinaciones negro-rojo, amarillo-negro, blanco-rojo y amarillo-azul.</li><li><b>Tope</b>: cilindro, cono, esfera, aspa o cruz; rojo, verde, negro o amarillo.</li></ul></div>
<div class="panel"><h4>De noche</h4><ul><li><b>Color</b> de la luz: blanco, amarillo, rojo o verde (y azul en el peligro nuevo).</li><li><b>Ritmo</b>: destellos, ocultaciones, centelleos o isofase.</li></ul><p class="small">También pueden señalizarse con símbolos electrónicos, como complemento de una marca física o de forma exclusiva (marcas virtuales).</p></div>
</div>
<h3>Marcas laterales en detalle</h3>
<ul>
<li>Balizan canales en ríos, rías, aguas someras y bocanas. El <b>sentido convencional</b> es el de quien viene de alta mar hacia un puerto, estuario o río; o el que fije la autoridad, y en principio siguiendo las costas en el <b>sentido de las agujas del reloj</b>.</li>
<li><b>Babor</b>: roja, castillete, espeque o <b>cilíndrica</b>, tope cilindro rojo. <b>Estribor</b>: verde, castillete, espeque o <b>cónica</b>, tope cono verde. Luz de su color con <b>cualquier ritmo excepto el 2+1</b>, reservado a la bifurcación.</li>
<li><b>Numeración</b>: desde la mar; <b>pares las rojas</b> e <b>impares las verdes</b>.</li>
<li>Las luces pueden ser <b>sincronizadas</b> (destellan a la vez) o <b>secuenciales</b> (una tras otra).</li>
<li><b>Bifurcación</b>: el color dominante y el tope dicen por dónde se deja; la franja central de otro color avisa de que hay bifurcación; de noche, la luz <b>2+1</b>. Canal principal a <b>estribor</b> → marca roja con franja verde, cilíndrica, tope cilindro rojo, luz roja Fl(2+1), se deja por <b>babor</b>. Canal principal a <b>babor</b> → verde con franja roja, cónica, tope cono verde, luz verde Fl(2+1), se deja por <b>estribor</b>.</li>
</ul>
<h3>Cardinales: uso y periodos</h3>
<ul>
<li>Los cuadrantes se limitan por las demoras verdaderas <b>NW-NE, NE-SE, SE-SW y SW-NW</b> tomadas desde el punto a balizar. La marca se llama como el cuadrante donde está y <b>se pasa por ese lado</b>: la Norte se pasa por el norte y deja el peligro al sur.</li>
<li>Sirven para indicar dónde están las aguas más profundas, el lado por el que salvar un peligro, o una configuración especial del canal (recodo, confluencia, bifurcación, extremo de un bajo). Son iguales en las regiones A y B. No conviene abusar de ellas: sus luces blancas pueden confundirse.</li>
<li>Castillete o espeque, con <b>bandas horizontales amarillas y negras</b>. El tope de dos conos es su característica diurna más importante, lo más grande posible y bien separados.</li>
<li>Luz blanca Q o VQ. <b>N</b>: continua. <b>E</b>: 3 centelleos, periodo 5 o 10 s. <b>S</b>: 6 centelleos + 1 destello largo, periodo 10 o 15 s. <b>W</b>: 9 centelleos, periodo 10 o 15 s.</li>
</ul>
<h3>Peligro aislado, aguas navegables, especiales y peligro nuevo</h3>
<ul>
<li><b>Peligro aislado</b>: sobre un peligro con aguas navegables alrededor; a menudo un espeque clavado en el propio bajo. Negra con franjas horizontales rojas, forma libre (mejor castillete o espeque, que no se confunda con las laterales), tope de <b>dos esferas negras</b>, luz blanca en grupos de <b>2 destellos</b>. Se pasa a distancia prudente, preferiblemente por <b>sotavento</b> con mal tiempo.</li>
<li><b>Aguas navegables</b>: no señalan peligro; marcan eje o centro de canal, recalada, entrada de un puerto o estuario, o el mejor paso bajo un puente. Esférica, castillete o espeque, <b>franjas verticales rojas y blancas</b>, tope <b>una esfera roja</b>. Luz blanca isofase, ocultaciones, un destello largo cada 10 s o Morse «A».</li>
<li><b>Especiales</b>: zonas que se entienden mirando la carta. Ejemplos: boyas oceanográficas (SADO), separación de tráfico donde el balizamiento normal confunda, vertederos, ejercicios militares, cables o conductos submarinos, zonas reservadas al recreo, límites de fondeaderos, parques de energía renovable en el mar y acuicultura. Amarillas, forma libre, tope <b>aspa amarilla</b> y luz amarilla de cualquier ritmo que no se confunda.</li>
<li><b>Peligro nuevo</b>: peligro recién descubierto que aún no figura en las publicaciones (bancos, escollos, naufragios). Se puede balizar con laterales, cardinales, peligro aislado o con la boya de emergencia: castillete o espeque, <b>franjas verticales azules y amarillas</b> en igual número, tope <b>cruz amarilla</b> vertical, y luz <b>azul 1 s y amarilla 1 s con 0,5 s de oscuridad</b> entre ambas. Si el riesgo es alto se <b>duplica</b> alguna marca (idéntica a su pareja). Si se usa una lateral luminosa, su luz será <b>Q o VQ</b>. Puede llevar <b>racón «D»</b> («manténgase separado de mí») o AIS (incluso solo marcas virtuales). Se retira cuando el peligro ya se ha difundido o ha desaparecido.</li>
</ul>
<h3>Simulacro: entrando en un estuario</h3>
<ol>
<li>Por estribor, cuatro marcas especiales amarillas rodean una piscifactoría: no pasar entre ellas.</li>
<li>Por la amura de estribor, una marca de peligro nuevo azul y amarilla sobre un barco hundido: darle resguardo.</li>
<li>En el eje del canal, una marca de aguas navegables señala la entrada al estuario.</li>
<li>Ya en el canal: rojas por babor y verdes por estribor.</li>
<li>Un peligro aislado: darle resguardo (aquí se deja por babor).</li>
<li>Una bifurcación con el canal principal a babor (verde con franja roja): se deja por estribor.</li>
<li>Una bifurcación con el canal principal a estribor (roja con franja verde): se deja por babor.</li>
<li>Un barco que sale hacia el mar ve todo al revés: rojas por estribor y verdes por babor.</li>
<li>Al salir, una cardinal Sur por la amura de babor le dice que las aguas profundas están entre el SW y el SE de la marca.</li>
</ol>`],
'''
rep('["marcas","Las marcas: forma, color, tope y luz",`',NEW+'["marcas","Las marcas: forma, color, tope y luz",`')

QS=r'''PER.Q.push(
/* ---- 5 Balizamiento (manual propio, tema 5) ---- */
["baliz","¿Cuántos tipos de marcas establece el sistema IALA/AISM?",["4","5","6","8"],2,"Laterales, cardinales, peligro aislado, aguas navegables, especiales y peligro nuevo."],
["baliz","¿Cuál de estos NO forma parte del sistema de balizamiento IALA?",["Una marca cardinal","Un faro","Una marca especial","Una boya de peligro nuevo"],1,"Quedan fuera faros, luces de sector, enfilaciones, buques faro y grandes boyas."],
["baliz","De noche, una marca se identifica por…",["Su forma","El color y el ritmo de su luz","Su tope","Su número"],1,"De día, por la forma y el color de la marca y del tope."],
["baliz","La forma de una marca lateral de babor, si no es castillete o espeque, es…",["Cónica","Cilíndrica","Esférica","En aspa"],1,"La de estribor, cónica."],
["baliz","El ritmo que NO puede usar una marca lateral normal es…",["Fl","Oc","Fl(2+1)","Q"],2,"El 2+1 está reservado para la bifurcación."],
["baliz","Las marcas laterales de un canal se numeran…",["Desde tierra","Desde la mar: pares las rojas e impares las verdes","Pares las verdes e impares las rojas","Al azar"],1,"Siguiendo el sentido convencional del balizamiento."],
["baliz","Las luces laterales que destellan todas a la vez son…",["Secuenciales","Sincronizadas","Alternativas","Isofase"],1,"Las que destellan una tras otra son secuenciales."],
["baliz","Si no hay otra indicación, el sentido convencional del balizamiento sigue las costas…",["En sentido contrario a las agujas del reloj","En el sentido de las agujas del reloj","De norte a sur","De este a oeste"],1,"Y en general, el del barco que viene de alta mar hacia puerto."],
["baliz","Una marca roja con una franja verde horizontal indica…",["Canal principal a babor","Canal principal a estribor","Peligro aislado","Aguas navegables"],1,"Se deja por babor (entrando) y su luz es roja Fl(2+1)."],
["baliz","Entrando, una marca verde con franja roja y tope cónico verde se deja…",["Por babor","Por estribor","Por cualquier banda","No se pasa"],1,"Canal principal a babor; luz verde Fl(2+1)."],
["baliz","El color de la franja central de una marca de bifurcación indica…",["La profundidad","Por dónde está el canal principal","La distancia al puerto","El tipo de fondo"],1,"El color dominante y el tope dicen por dónde se deja."],
["baliz","Los cuadrantes de las marcas cardinales se limitan por las demoras verdaderas…",["N, E, S y W","NW-NE, NE-SE, SE-SW y SW-NW","NNE, ESE, SSW y WNW","Las magnéticas"],1,"Tomadas desde el punto que interesa balizar."],
["baliz","La marca cardinal Oeste está en el cuadrante…",["NE-SE","SE-SW","SW-NW","NW-NE"],2,"Y se pasa por el oeste."],
["baliz","Una marca cardinal Sur se pasa…",["Por su norte","Por su sur","Por su este","Por cualquier lado"],1,"Las aguas profundas están en el cuadrante SE-SW."],
["baliz","Las marcas cardinales…",["Solo existen en la región A","Son iguales en las regiones A y B","Cambian de color en la región B","No llevan luz"],1,"Solo las laterales cambian entre regiones."],
["baliz","Las marcas cardinales están pintadas con…",["Franjas verticales negras y amarillas","Bandas horizontales amarillas y negras","Franjas rojas y blancas","Amarillo y azul"],1,"Y suelen ser de castillete o espeque."],
["baliz","La característica diurna más importante de una marca cardinal es…",["Su color","Su marca de tope de dos conos","Su forma","Su número"],1,"Lo más grande posible y con los conos bien separados."],
["baliz","El periodo de la luz de una cardinal Este es de…",["5 o 10 s","10 o 15 s","15 s siempre","2 s"],0,"La Sur y la Oeste, 10 o 15 s."],
["baliz","La regla para recordar las luces cardinales se asocia a…",["Los puntos cardinales al revés","La esfera de un reloj","Las letras Morse","Los días de la semana"],1,"N las 12 (continua), E las 3, S las 6, W las 9."],
["baliz","Una marca de peligro aislado se pasa preferiblemente…",["Por barlovento","Por sotavento, a distancia prudente","Pegado a ella","Por el norte"],1,"Sobre todo con mal tiempo."],
["baliz","La luz de una marca de peligro aislado es…",["Roja","Blanca en grupos de 2 destellos","Amarilla","Blanca isofase"],1,"Tope: dos esferas negras."],
["baliz","La marca de aguas navegables tiene…",["Franjas horizontales negras y rojas","Franjas verticales rojas y blancas y una esfera roja","Bandas amarillas y negras","Una cruz amarilla"],1,"Puede ser esférica, castillete o espeque."],
["baliz","¿Cuál de estas luces NO corresponde a una marca de aguas navegables?",["Isofase","Ocultaciones","Morse «A»","Grupos de 2 destellos"],3,"Los grupos de 2 destellos son de peligro aislado."],
["baliz","Una marca de aguas navegables puede indicar…",["Un peligro aislado","El mejor paso bajo un puente","Un naufragio nuevo","Un cable submarino"],1,"También eje de canal o recalada."],
["baliz","¿Cuál de estas zonas se señala con marcas especiales?",["Un bajo aislado","Una instalación de acuicultura","El eje de un canal","Un peligro nuevo"],1,"También vertederos, cables, zonas militares, de recreo o renovables."],
["baliz","La marca de tope de una marca especial es…",["Una cruz amarilla","Un aspa amarilla en forma de X","Dos esferas","Un cono"],1,"La cruz es del peligro nuevo."],
["baliz","La luz de una marca de peligro nuevo es…",["Amarilla fija","Azul 1 s y amarilla 1 s con 0,5 s de oscuridad entre ambas","Blanca Q","Roja 2+1"],1,"Alternativa azul y amarilla."],
["baliz","El tope de la marca de peligro nuevo es…",["Un aspa amarilla","Una cruz amarilla vertical","Una esfera roja","Dos conos"],1,"Franjas verticales azules y amarillas en igual número."],
["baliz","Si un peligro nuevo se balizara con una marca lateral luminosa, su luz sería…",["Fl(2+1)","Q o VQ","LFl 10 s","Iso"],1,"Centelleante o centelleante rápida."],
["baliz","Si el riesgo de un peligro nuevo es especialmente alto, la autoridad…",["Lo deja sin balizar","Duplica al menos una de las marcas","Pone una marca especial","Apaga las luces"],1,"La marca duplicada es idéntica a su pareja."],
["baliz","El racón de un peligro nuevo emite la letra Morse…",["A","D","U","SOS"],1,"«Manténgase separado de mí»."],
["baliz","Un peligro nuevo puede señalizarse…",["Solo con boyas físicas","También con ayudas virtuales (AIS), solas o combinadas con boyas","Solo con racón","Con banderas"],1,"Se retira cuando la información se ha difundido o el peligro ha desaparecido."],
["baliz","Saliendo de un estuario, un barco ve una cardinal Sur por la amura de babor. Las aguas profundas están…",["Al norte de la marca","Entre el SW y el SE de la marca","Al este","Al oeste"],1,"Cuadrante SE-SW: pasará por el sur de la marca."]
);
'''
anchor='const R=[["nom","¿Cómo se llama a la estructura'
i=s.index(anchor); j=s.rindex('(function(){',0,i); s=s[:j]+QS+s[j:]
open(dst,"w",encoding="utf-8").write(s); print("ok")
