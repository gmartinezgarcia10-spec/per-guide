import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
  for vw in [(390,844),(1280,900)]:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":vw[0],"height":vw[1]})
    errs=[]; pg.on("pageerror",lambda e:errs.append(str(e))); pg.on("console",lambda m: m.type=="error" and errs.append(m.text))
    pg.goto("file://"+f+"#tema/2"); pg.wait_for_timeout(1200)
    t=pg.inner_text("body").lower()
    for k in ["noray","roldana","boza","guía-cabos","arriar en banda","vueltas de rezón","cote de seguridad","tenedero","ratonera","a la gira","abozarla","círculo de borneo","garreo","orinque","barbas de gato","levar el ancla","3–4 veces"]:
      if k not in t: print("MISSING",k)
    print("bTxt", pg.inner_text("#bTxt"))
    pg.fill("#bw","90"); pg.dispatch_event("#bw","input"); print("90:",pg.inner_text("#bTxt"))
    pg.click("[data-bz=lejos]"); print("lejos:",pg.inner_text("#bTxt"))
    for a in range(0,360,15):
      pg.fill("#bw",str(a)); pg.dispatch_event("#bw","input")
      if "✗" in pg.inner_text("#bTxt"): print("hit at",a)
    pg.click("[data-bz=cerca]"); pg.fill("#bw","120"); pg.dispatch_event("#bw","input")
    pg.locator("#bSvg").screenshot(path=f"/home/claude/guide/b{vw[0]}.png")
    print("overflow",pg.evaluate("document.documentElement.scrollWidth"),vw[0])
    print("amarre guide q", pg.evaluate("PER.Q.filter(q=>q[0]==='amarre'&&!q[5]).length"), "total", pg.evaluate("PER.Q.length"), "bad", pg.evaluate("PER.Q.filter(q=>!(q[3]>=0&&q[3]<q[2].length)).length"))
    for v in ["plan","test","progreso","practicas","tema/1","tema/2/preguntas"]:
      pg.goto("file://"+f+"#"+v); pg.wait_for_timeout(400)
    print("errors",errs[:5]); b.close()
