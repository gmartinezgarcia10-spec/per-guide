import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    for vw in [(390,844),(1280,900)]:
        b=p.chromium.launch(); pg=b.new_page(viewport={"width":vw[0],"height":vw[1]})
        errs=[]; pg.on("pageerror",lambda e:errs.append(str(e))); pg.on("console",lambda m: m.type=="error" and errs.append(m.text))
        pg.goto("file://"+f+"#tema/1"); pg.wait_for_timeout(1200)
        txt=pg.inner_text("body")
        for t in ["Socaire","Grifos de fondo","Escotilla principal","Manguerotes","timón compensado","Guardines".lower(),"capacete","Calado medio","mayor longitud ocupacional","Desplazamiento máximo"]:
            print(t, t.lower() in txt.lower())
        # asiento widget
        pg.fill("#cpr","150") if False else None
        print("asTxt:",pg.inner_text("#asTxt"))
        print("overflow", pg.evaluate("document.documentElement.scrollWidth"), vw[0])
        pg.goto("file://"+f+"#tema/2"); pg.wait_for_timeout(800)
        txt=pg.inner_text("body")
        for t in ["Cabirón","Puntera","5 veces la eslora","Zarpar","¡Clara!","Rezón","Gatera"]:
            print(t, t.lower() in txt.lower())
        n=pg.evaluate("PER.Q.filter(q=>q[0]==='nom'&&!q[5]).length"), pg.evaluate("PER.Q.filter(q=>q[0]==='amarre'&&!q[5]).length"), pg.evaluate("PER.Q.length")
        print("counts nom/amarre guide, total", n)
        bad=pg.evaluate("PER.Q.filter(q=>!(q[2]&&q[3]>=0&&q[3]<q[2].length)).length"); print("bad q",bad)
        # quiz flow chapter 1: click preguntas
        pg.goto("file://"+f+"#tema/1/preguntas"); pg.wait_for_timeout(800)
        btns=pg.locator("button").all_inner_texts(); print([x for x in btns if x][:15])
        for v in ["plan","test","progreso","practicas"]:
            pg.goto("file://"+f+"#"+v); pg.wait_for_timeout(500)
        print("errors",errs[:5]); b.close()
