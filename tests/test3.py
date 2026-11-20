import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
  for vw in [(390,844),(1280,900)]:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":vw[0],"height":vw[1]})
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e))); pg.on("console",lambda m: m.type=="error" and errs.append(m.text))
    pg.goto("file://"+f+"#tema/3"); pg.wait_for_timeout(1200)
    t=pg.inner_text("body").lower()
    for k in ["par de estabilidad","pantocazo","sincronismo longitudinal","caña de emergencia","filtro decantador","canal 9","3 litros","categoría de diseño","residen en españa","5–10 segundos","líneas de vida","sart","lista 6.ª","bolsas estabilizadoras","mayor de capa","ancla de capa","arranchar","censurados","costa a sotavento","pararrayos","veril de seguridad","mitad de la longitud de la ola","reflector de radar","separación de tráfico"]:
      if k not in t: print("MISSING",k)
    pg.click("[data-z='1']"); print("z1:",pg.inner_text("#zoneInfo").replace("\n"," | "))
    pg.click("[data-z='4']"); print("z4:",pg.inner_text("#zoneInfo").replace("\n"," | "))
    toc=pg.locator("nav.toc a").all_inner_texts(); print(toc)
    print("overflow",pg.evaluate("document.documentElement.scrollWidth"),vw[0])
    print("seg guide q", pg.evaluate("PER.Q.filter(q=>q[0]==='seg'&&!q[5]).length"), "total", pg.evaluate("PER.Q.length"), "bad", pg.evaluate("PER.Q.filter(q=>!(q[3]>=0&&q[3]<q[2].length)).length"), "dups", pg.evaluate("(()=>{const s=new Set(),d=[];PER.Q.forEach(q=>{const k=q[5]?'r'+q[5].i:q[0]+q[1].slice(0,70);if(s.has(k))d.push(q[1]);s.add(k)});return d})()"))
    pg.click("#mobA"); pg.wait_for_timeout(300)
    for v in ["plan","test","progreso","practicas","tema/1","tema/2","tema/3/preguntas"]:
      pg.goto("file://"+f+"#"+v); pg.wait_for_timeout(400)
    print("errors",errs[:5]); b.close()
