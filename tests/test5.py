import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
  for vw in [(390,844),(1280,900)]:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":vw[0],"height":vw[1]})
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e))); pg.on("console",lambda m: m.type=="error" and errs.append(m.text))
    pg.goto("file://"+f+"#tema/5"); pg.wait_for_timeout(1200)
    t=pg.inner_text("body").lower()
    for k in ["seis tipos","sincronizadas","pares las rojas","agujas del reloj","nw-ne","5 o 10 s","sotavento","mejor paso bajo un puente","acuicultura","0,5 s","racón «d»","duplica","simulacro"]:
      if k not in t: print("MISSING",k)
    pg.click("#markGrid .mark[data-i=\"9\"]"); print(pg.inner_text("#selTxt"))
    print(pg.locator("nav.toc a").all_inner_texts())
    print("overflow",pg.evaluate("document.documentElement.scrollWidth"),vw[0])
    print("leg guide", pg.evaluate("PER.Q.filter(q=>q[0]==='baliz'&&!q[5]).length"),"total",pg.evaluate("PER.Q.length"),"bad",pg.evaluate("PER.Q.filter(q=>!(q[3]>=0&&q[3]<q[2].length)).length"),"dups",pg.evaluate("(()=>{const s=new Set(),d=[];PER.Q.forEach(q=>{const k=q[5]?'r'+q[5].i:q[0]+q[1].slice(0,70);if(s.has(k))d.push(q[1]);s.add(k)});return d})()"))
    for v in ["plan","test","progreso","practicas","tema/1","tema/2","tema/3","tema/4/preguntas","tema/5"]:
      pg.goto("file://"+f+"#"+v); pg.wait_for_timeout(350)
    print("errors",errs[:5]); b.close()
