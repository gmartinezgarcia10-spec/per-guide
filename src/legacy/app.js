// @ts-nocheck
/* App: progress state and sync, quiz engine, chapter rendering, mock exams, views and router.
   Moved verbatim from index.html in F4; reads shared helpers from window.PER (src/core/per.ts).
   To be rewritten as typed modules in phase 2 (learning core). */
(function(){
"use strict";
const {$,$$,store,T,TBY,CH,Q,shuffle,esc,PAPERS,RQ}=PER;
const qid=q=>q[5]?"r:"+q[5].i:q[0]+":"+q[1].slice(0,70);
const PNAME=Object.fromEntries(PAPERS.map(p=>[p[0],p[1]]));
let SRC=store.get("src","all");
const inSrc=q=>SRC==="all"||(SRC==="real")===!!q[5];
const QQ=()=>Q.filter(inSrc);
const NREAL=Q.filter(q=>q[5]).length,NGUIA=Q.length-NREAL;
const qHTML=q=>esc(q[1])+(q[5]&&q[5].img?`<img class="qimg" src="${q[5].img}" alt="Figura de la pregunta original">`:"");
const qMeta=(q,full)=>{if(!q[5])return full?`<div class="qmeta"><span class="chip">Banco de la guía</span></div>`:"";const m=q[5],n=m.p.length;
  return `<div class="qmeta"><span class="chip real" title="${esc(m.p.map(p=>PNAME[p]).join(", "))}">Examen real · ${n>1?`salió ${n} veces`:esc(PNAME[m.p[0]])}</span>${q[0]==="carta"&&!m.img?'<span class="chip">necesitas la carta 25-C</span>':""}${m.d?'<span class="chip warn">⚠ clave revisada</span>':""}</div>`};
function srcBar(el,onChange){const draw=()=>{el.innerHTML=`<span class="small muted">Preguntas:</span> <span class="seg" role="group" aria-label="Origen de las preguntas">${[["all",`Todas (${Q.length})`],["real",`Exámenes reales (${NREAL})`],["guia",`Banco de la guía (${NGUIA})`]].map(b=>`<button type="button" data-src="${b[0]}" aria-pressed="${SRC===b[0]}">${b[1]}</button>`).join("")}</span>`;
  $$("[data-src]",el).forEach(b=>b.addEventListener("click",()=>{SRC=b.dataset.src;store.set("src",SRC);$$("[data-srcbar]").forEach(x=>x._draw&&x._draw());onChange&&onChange()}))};el.setAttribute("data-srcbar","");el._draw=draw;draw()}
const L="ABCD";

/* ================= progress state (local + account) ================= */
const blank=()=>({v:2,stats:{},best:{},hist:[],checks:{},papers:{},log:[],cur:null,lastTema:null,upd:0});
let S=Object.assign(blank(),store.get("state",null)||{});
/* migrate earlier per2:* keys once */
if(!S.upd){const st=store.get("stats",null),b=store.get("best",null),h=store.get("hist",null),c=store.get("checks",null);
  if(st)Object.keys(st).forEach(k=>S.stats[k]=[st[k][0],st[k][1],st[k][1]>0]);if(b)S.best=b;if(h)S.hist=h;if(c)S.checks=c;}
let sync={mode:"local",msg:"Guardado solo en este navegador."};
let dbDoc=null,writing=false,dirty=false,tmr=null;
function merge(a,b){const o=blank();o.stats={...a.stats};
  Object.entries(b.stats||{}).forEach(([k,v])=>{const x=o.stats[k];if(!x||v[0]>x[0])o.stats[k]=v});
  o.best={...a.best};Object.entries(b.best||{}).forEach(([k,v])=>o.best[k]=Math.max(o.best[k]||0,v));
  const seen=new Set();o.hist=[...(a.hist||[]),...(b.hist||[])].filter(h=>{if(seen.has(h.d))return false;seen.add(h.d);return true}).sort((x,y)=>x.d-y.d).slice(-60);
  o.checks={...(a.checks||{}),...(b.checks||{})};const lg=new Set();o.log=[...(a.log||[]),...(b.log||[])].filter(x=>{const k=x[0]+x[1];if(lg.has(k))return false;lg.add(k);return true}).sort((x,y)=>x[0]-y[0]).slice(-300);
  o.cur=[a.cur,b.cur].filter(Boolean).sort((x,y)=>y.ts-x.ts)[0]||null;o.lastTema=(b.upd||0)>(a.upd||0)?(b.lastTema||a.lastTema):(a.lastTema||b.lastTema);
  o.papers={...(a.papers||{})};Object.entries(b.papers||{}).forEach(([k,v])=>{const x=o.papers[k];if(!x||v.best>x.best)o.papers[k]=v});o.upd=Math.max(a.upd||0,b.upd||0);return o}
async function flush(){if(!dbDoc||writing)return;writing=true;dirty=false;
  try{await dbDoc.set({state:JSON.stringify(S)});sync={mode:"cloud",msg:"Guardado en tu cuenta de Claude: lo verás en cualquier dispositivo con la misma cuenta."}}
  catch(e){sync={mode:"local",msg:"No se ha podido guardar en tu cuenta; queda guardado en este navegador."};dbDoc=null}
  writing=false;renderSync();if(dirty)flush()}
function save(){S.upd=Date.now();store.set("state",S);dirty=true;clearTimeout(tmr);tmr=setTimeout(flush,1500)}
async function connect(){
  try{const cl=window.claude;if(!cl||!cl.use){renderSync();return}
    const [user,db]=await Promise.all([cl.use("user"),cl.use("db")]);
    if(!user||!db){sync={mode:"local",msg:"Guardado solo en este navegador. Inicia sesión en claude.ai y abre la guía desde allí para guardarlo en tu cuenta."};renderSync();return}
    const id=await user.id();if(!id){sync={mode:"local",msg:"Guardado solo en este navegador. Inicia sesión en claude.ai para guardarlo en tu cuenta."};renderSync();return}
    const ref=db.doc("progreso/"+id);
    const timeout=new Promise((_,rej)=>setTimeout(()=>rej(new Error("timeout")),10000));
    const snap=await Promise.race([ref.get(),timeout]);
    if(snap.exists){try{S=merge(S,JSON.parse(snap.data().state||"{}"))}catch(e){}}
    dbDoc=ref;sync={mode:"cloud",msg:"Guardado en tu cuenta de Claude: lo verás en cualquier dispositivo con la misma cuenta."};
    store.set("state",S);if(snap.exists)refreshViews();else{dirty=true;flush()}renderSync();
  }catch(e){sync={mode:"local",msg:"Guardado solo en este navegador (no se ha podido conectar con tu cuenta)."};renderSync()}
}
function renderSync(){const cloud=sync.mode==="cloud";const t=(cloud?"☁︎ ":"⚠︎ ")+sync.msg;
  const a=$("#syncLine");if(a){a.textContent=t;a.className="small "+(cloud?"pass":"")}const b=$("#saveState");if(b)b.textContent=t}
const IV=[1,3,7,14,30];
const record=(q,ok)=>{const k=qid(q);const s=S.stats[k]||[0,0,false];s[0]++;if(ok)s[1]++;s[2]=ok;const now=Date.now();s[3]=now;const box=ok?Math.min((s[4]||0)+1,IV.length):0;s[4]=box;s[5]=ok?now+IV[box-1]*864e5:now;S.stats[k]=s;
  S.log=S.log||[];S.log.push([now,k,ok?1:0]);if(S.log.length>300)S.log.splice(0,S.log.length-300);save()};
const QMAP={};Q.forEach(q=>QMAP[qid(q)]=q);
const dueQs=()=>{const now=Date.now();return Q.filter(q=>{const s=S.stats[qid(q)];return s&&(s[5]!=null?s[5]<=now:!s[2])})};
const ago=ts=>{const m=Math.round((Date.now()-ts)/6e4);if(m<1)return "ahora mismo";if(m<60)return `hace ${m} min`;const h=Math.round(m/60);if(h<24)return `hace ${h} h`;const d=Math.round(h/24);return d===1?"ayer":`hace ${d} días`};
const nextReview=s=>{if(!s||s[5]==null)return "";const d=Math.ceil((s[5]-Date.now())/864e5);return d<=0?"toca repasarla hoy":d===1?"vuelve mañana":`vuelve en ${d} días`};
const st=q=>S.stats[qid(q)];
const topicInfo=t=>{const qs=Q.filter(q=>q[0]===t);let seen=0,dom=0,a=0,b=0;qs.forEach(q=>{const s=st(q);if(s){seen++;a+=s[1];b+=s[0];if(s[2])dom++}});return {n:qs.length,seen,dom,acc:b?a/b:null}};
const prep=q=>{const order=q[5]?[0,1,2,3].slice(0,q[2].length):shuffle([0,1,2,3].slice(0,q[2].length));return {q,ord:order,opts:order.map(i=>q[2][i]),ans:order.indexOf(q[3])}};

/* ================= instant quiz ================= */
function instantQuiz(el,pool,title,onDone,n=10){
  const items=shuffle(pool).slice(0,Math.min(n,pool.length)).map(prep);let i=0,score=0,answered=0;
  if(!items.length){el.innerHTML=`<p class="pass">No hay preguntas en este grupo. ¡Buen trabajo!</p>`;return}
  const render=()=>{
    if(i>=items.length){const pc=Math.round(score/items.length*100);onDone&&onDone(pc,items.length);
      el.innerHTML=`<div class="result"><div class="eyebrow">${esc(title)}</div><p style="font-size:24px;font-family:var(--display);font-weight:700;margin:4px 0">${score} / ${items.length} · ${pc} %</p><p class="${pc>=70?"pass":"fail"}">${pc>=90?"Dominado.":pc>=70?"Bien: estás en nivel de aprobado.":"Repasa el tema y vuelve a intentarlo."}</p><div class="row"><button class="btn" data-again>Otra tanda</button><a class="btn ghost" href="#progreso">Ver mi progreso</a></div></div>`;
      $("[data-again]",el).addEventListener("click",()=>instantQuiz(el,pool,title,onDone,n));return}
    const it=items[i];const s=st(it.q);
    el.innerHTML=`<div class="q"><div class="row" style="justify-content:space-between"><span class="eyebrow">Pregunta ${i+1} de ${items.length}${s?` · vista ${s[0]}×${s[3]?`, la última ${ago(s[3])}`:""}`:" · nueva"}</span><span class="small muted">${score} aciertos</span></div>
      <div class="bar" style="width:${Math.round(i/items.length*100)}%;margin:6px 0 10px;opacity:.5"></div>
      ${qMeta(it.q)}<p class="qt">${qHTML(it.q)}</p><div class="opts">${it.opts.map((o,k)=>`<button class="opt" data-k="${k}"><span class="k">${L[k]}</span><span>${esc(o)}</span></button>`).join("")}</div><div class="expl" hidden></div>
      <div class="row" style="margin-top:10px"><button class="btn" data-next hidden>${i+1<items.length?"Siguiente":"Ver resultado"}</button><button class="btn ghost sm" data-stop>Terminar aquí</button></div></div>`;
    $$(".opt",el).forEach(b=>b.addEventListener("click",()=>{const k=+b.dataset.k,ok=k===it.ans;if(ok)score++;answered++;record(it.q,ok);
      $$(".opt",el).forEach(x=>{x.disabled=true;if(+x.dataset.k===it.ans)x.classList.add("right")});if(!ok)b.classList.add("wrong");
      const ex=$(".expl",el);ex.hidden=false;ex.innerHTML=(ok?'<span class="pass">✓ Correcto.</span> ':'<span class="fail">✗ No.</span> ')+esc(it.q[4]||"")+`<br><span class="small muted">↻ ${nextReview(st(it.q))}</span>`;const nx=$("[data-next]",el);nx.hidden=false;nx.focus()},{once:true}));
    $("[data-next]",el).addEventListener("click",()=>{i++;render()});
    $("[data-stop]",el).addEventListener("click",()=>{if(!answered){el.innerHTML="";return}items.length=answered;i=answered;render()});
  };render();
}
/* quiz launcher with modes */
function quizLauncher(el,topicId,title,onDone){
  const pool=()=>QQ().filter(q=>!topicId||q[0]===topicId);
  const rep2=()=>pool().filter(q=>q[5]&&q[5].p.length>1);
  const wrong=()=>pool().filter(q=>{const s=st(q);return s&&!s[2]});
  const fresh=()=>pool().filter(q=>!st(q));
  el.innerHTML=`<div class="row" data-sb style="margin-bottom:8px"></div><div class="row" data-btns style="margin-bottom:10px"></div><div data-q></div>`;
  const bar=$("[data-btns]",el),box=$("[data-q]",el);let active="";
  srcBar($("[data-sb]",el),()=>start("10"));
  const draw=()=>{const P=pool(),W=wrong(),N=fresh(),RP=rep2();
    bar.innerHTML=[["10","10 preguntas",P.length],["25","25 preguntas",P.length],["all",`Todas (${P.length})`,P.length],["new",`No vistas (${N.length})`,N.length],["wrong",`Mis fallos (${W.length})`,W.length],["rep",`Repetidas en exámenes (${RP.length})`,RP.length]].map(b=>`<button class="btn ${active===b[0]?"":"ghost"}" data-m="${b[0]}" ${b[2]?"":"disabled"}>${b[1]}</button>`).join("");
    $$("[data-m]",bar).forEach(b=>b.addEventListener("click",()=>start(b.dataset.m)))};
  const start=m=>{active=m;draw();const set=m==="new"?fresh():m==="wrong"?wrong():m==="rep"?rep2():pool();const n=m==="10"?10:m==="25"?25:set.length;
    instantQuiz(box,set,title,(pc,cnt)=>{onDone&&onDone(pc,cnt);draw()},n)};
  draw();start("10");
}
/* ================= chapters ================= */
let cur=null;
function renderStepper(n){
  $("#stepper").innerHTML=T.map(t=>{const b=S.best[t.id];const ti=topicInfo(t.id);return `<a href="#tema/${t.n}" ${t.n===n?'aria-current="page"':""} class="${b>=70?"done":""} ${t.min?"min":""}" title="${esc(t.name)}"><b>${t.n}</b><span>${ti.seen?Math.round(ti.dom/ti.n*100)+" %":t.q+" preg."}</span></a>`}).join("");
  const a=$("#stepper [aria-current]");if(a)a.scrollIntoView({block:"nearest",inline:"center"});
}
function renderChapter(n){
  if(cur&&cur._cleanup){try{cur._cleanup()}catch(e){}}
  const t=T[n-1],ch=CH[n];cur=ch;renderStepper(n);
  const art=$("#chapter");const nq=Q.filter(q=>q[0]===t.id).length;
  art.innerHTML=`<header class="stack" style="gap:6px"><div class="eyebrow">Tema ${n} de 11 · ${t.q} preguntas en el examen${t.min?` · <span style="background:var(--accent);color:#fff;padding:1px 6px;border-radius:4px">mínimo ${t.min}/${t.q}</span>`:""}</div><h1>${t.name}</h1><p class="lede">${ch.intro}</p>
    <nav class="toc" aria-label="Apartados">${ch.sections.map(s=>`<a href="#tema/${n}/${s[0]}">${s[1]}</a>`).join("")}<a href="#tema/${n}/preguntas" style="background:var(--accent-soft);color:var(--accent)">Preguntas de examen (${nq})</a></nav></header>
    ${ch.sections.map((s,i)=>`<section class="panel" id="s-${s[0]}"><div class="eyebrow">${n}.${i+1}</div><h2>${s[1]}</h2>${s[2]}</section>`).join("")}
    <section class="panel" id="s-preguntas"><div class="eyebrow">Para fijar conocimientos</div><h2>Preguntas de examen del tema</h2><p class="lede">${nq} preguntas en el banco de este tema. Elige cuántas hacer; las que no has visto y las que fallaste se pueden repasar aparte.</p><p class="small" id="chProg"></p><div id="chQuiz"></div></section>
    <nav class="chnav">${n>1?`<a class="btn ghost" href="#tema/${n-1}">← ${T[n-2].n}. ${T[n-2].name}</a>`:"<span></span>"}${n<11?`<a class="btn" href="#tema/${n+1}">${T[n].n}. ${T[n].name} →</a>`:`<a class="btn" href="#test">Hacer un simulacro completo →</a>`}</nav>`;
  try{ch.init.call(ch,art)}catch(e){console.error(e)}
  const upP=()=>{const ti=topicInfo(t.id);$("#chProg").innerHTML=`Tu progreso en este tema: <b>${ti.seen}/${ti.n}</b> vistas · <b>${ti.dom}</b> dominadas${ti.acc!=null?` · ${Math.round(ti.acc*100)} % de aciertos`:""}.`};upP();
  quizLauncher($("#chQuiz"),t.id,`Tema ${n} · ${t.name}`,(pc,cnt)=>{if(cnt>=10)S.best[t.id]=Math.max(S.best[t.id]||0,pc);save();renderStepper(n);upP()});
}

/* ================= mock exam ================= */
let timer=null;
function startMock(){
  const weak=$("#mockWeak").checked;
  let qs=[];T.forEach(t=>{let pool=shuffle(QQ().filter(q=>q[0]===t.id));
    if(weak){pool.sort((a,b)=>{const sa=st(a),sb=st(b);const fa=sa?(sa[2]?1:0)+sa[1]/sa[0]:0.6,fb=sb?(sb[2]?1:0)+sb[1]/sb[0]:0.6;return fa-fb})}
    qs=qs.concat(pool.slice(0,t.q))});
  runExam(qs,{title:"Simulacro",timed:$("#mockTimer").checked});
}
function startPaper(pid){
  const p=PAPERS.find(x=>x[0]===pid);if(!p)return;
  const qs=p[2].filter(i=>i!=null).map(i=>RQ[i]);
  runExam(qs,{title:"Examen real · "+p[1],paper:pid,timed:$("#mockTimer").checked,voided:45-qs.length});
}
function runExam(qs,o){const rb=$("#resumeBox");if(rb)rb.hidden=true;
  const R0=o.resume;const items=R0?qs.map((q,k)=>{const ord=R0.ord[k];return {q,ord,opts:ord.map(x=>q[2][x]),ans:ord.indexOf(q[3])}}):qs.map(prep),N=items.length,ans=R0?R0.ans.slice():new Array(N).fill(null);let i=R0?R0.i:0,left=R0?R0.left:90*60;const area=$("#mockArea");const timed=o.timed;
  const persist=()=>{S.cur={title:o.title,paper:o.paper||null,timed,voided:o.voided||0,ids:items.map(it=>qid(it.q)),ord:items.map(it=>it.ord),ans:ans.slice(),i,left,ts:Date.now()};save()};persist();
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  clearInterval(timer);if(timed)timer=setInterval(()=>{left--;if(left%15===0&&S.cur)persist();const e=$("#mkT");if(e)e.textContent=fmt(left);if(left<=0){clearInterval(timer);finish()}},1000);
  const render=()=>{const it=items[i];const t=TBY[it.q[0]];
    area.innerHTML=`<div class="panel stack" style="gap:10px"><div class="row" style="justify-content:space-between"><span class="eyebrow">${esc(o.title)} · Pregunta ${i+1} de ${N} · Tema ${t.n}, ${esc(t.name)}</span>${timed?`<span class="timer" id="mkT">${fmt(left)}</span>`:""}</div>
      <div class="qnav">${items.map((_,k)=>`<button data-go="${k}" class="${ans[k]!=null?"ans":""} ${k===i?"cur":""}" aria-label="Pregunta ${k+1}">${k+1}</button>`).join("")}</div></div>
      <div class="q">${qMeta(it.q)}<p class="qt">${qHTML(it.q)}</p><div class="opts">${it.opts.map((o2,k)=>`<button class="opt ${ans[i]===k?"sel":""}" data-k="${k}"><span class="k">${L[k]}</span><span>${esc(o2)}</span></button>`).join("")}</div>
      <div class="row" style="margin-top:12px;justify-content:space-between"><div class="row"><button class="btn ghost" data-prev ${i?"":"disabled"}>← Anterior</button><button class="btn ghost" data-nx ${i<N-1?"":"disabled"}>Siguiente →</button></div><button class="btn" data-end>Entregar examen (${ans.filter(a=>a!=null).length}/${N})</button></div></div>`;
    $$(".opt",area).forEach(b=>b.addEventListener("click",()=>{ans[i]=+b.dataset.k;if(i<N-1){i++;}persist();render()}));
    $$("[data-go]",area).forEach(b=>b.addEventListener("click",()=>{i=+b.dataset.go;persist();render()}));
    const p=$("[data-prev]",area),nx=$("[data-nx]",area);p&&p.addEventListener("click",()=>{i--;render()});nx&&nx.addEventListener("click",()=>{i++;render()});
    $("[data-end]",area).addEventListener("click",()=>{const blank=ans.filter(a=>a==null).length;if(blank&&!area.querySelector("[data-confirm]")){const c=document.createElement("p");c.className="note";c.setAttribute("data-confirm","");c.innerHTML=`<b>Te quedan ${blank} sin responder.</b> No restan, pero tampoco suman. <button class="btn sm" id="reallyEnd">Entregar igualmente</button>`;area.appendChild(c);$("#reallyEnd").addEventListener("click",finish);return}finish()});
  };
  const finish=()=>{clearInterval(timer);S.cur=null;let total=0;const per={};T.forEach(t=>per[t.id]=[0,0]);
    items.forEach((it,k)=>{const ok=ans[k]===it.ans;per[it.q[0]][1]++;if(ok){total++;per[it.q[0]][0]++}if(ans[k]!=null)record(it.q,ok)});
    const fails=T.filter(t=>t.min&&per[t.id][0]<t.min);const pass=total>=32&&!fails.length;
    S.hist.push({d:Date.now(),total,pass,p:o.paper||null,per:Object.fromEntries(T.map(t=>[t.id,per[t.id][0]]))});if(S.hist.length>60)S.hist.shift();
    if(o.paper){S.papers=S.papers||{};const x=S.papers[o.paper];if(!x||total>x.best)S.papers[o.paper]={best:total,pass,d:Date.now()};else{x.d=Date.now()}}
    save();if(o.paper)renderPapers();
    area.innerHTML=`<div class="result stack" style="gap:10px"><div class="eyebrow">Resultado · ${esc(o.title)}</div><p style="font-size:30px;font-family:var(--display);font-weight:700;margin:0">${total} / ${N} · <span class="${pass?"pass":"fail"}">${pass?"APTO":"NO APTO"}</span></p>
      <p>${pass?"Has superado los 32 aciertos y los tres mínimos.":total<32?`Necesitas 32 aciertos; te faltan ${32-total}.`:""} ${fails.length?"No llegas al mínimo en: "+fails.map(t=>`<b>${t.name}</b>`).join(", ")+".":""}${o.voided?` <span class="small muted">(${o.voided} pregunta${o.voided>1?"s":""} sin respuesta en la plantilla, anulada${o.voided>1?"s":""}.)</span>`:""}</p>
      <div class="blk">${T.map(t=>{const [a,b]=per[t.id];const bad=t.min&&a<t.min;return `<span>${t.n}. ${t.name}${t.min?` <span class="chip min">mín ${t.min}</span>`:""}</span><span class="${bad?"fail":a===b?"pass":""}">${a}/${b}</span><span class="bar" style="width:${b?Math.round(a/b*80):0}px;align-self:center;${bad?"background:var(--bad)":""}"></span>`}).join("")}</div>
      <div class="row"><button class="btn" id="again">${o.paper?"Repetir este examen":"Otro simulacro"}</button><button class="btn ghost" id="rev">Revisar mis fallos</button><a class="btn ghost" href="#progreso">Ver mi progreso</a></div><div id="review" class="stack"></div></div>`;
    $("#again").addEventListener("click",()=>o.paper?startPaper(o.paper):startMock());
    $("#rev").addEventListener("click",()=>{$("#review").innerHTML=items.map((it,k)=>ans[k]===it.ans?"":`<div class="q"><div class="eyebrow">Pregunta ${k+1} · ${esc(TBY[it.q[0]].name)}</div>${qMeta(it.q)}<p class="qt">${qHTML(it.q)}</p><p class="small">${ans[k]==null?"Sin responder":`Tu respuesta: <span class="fail">${esc(it.opts[ans[k]])}</span>`}<br>Correcta: <span class="pass">${esc(it.opts[it.ans])}</span></p><p class="expl">${esc(it.q[4]||"")}</p><a class="small" href="#tema/${TBY[it.q[0]].n}">Repasar el tema ${TBY[it.q[0]].n} →</a></div>`).join("")||"<p class='pass'>Ningún fallo.</p>"});
    area.scrollIntoView({block:"start",behavior:"smooth"})};
  render();area.scrollIntoView({block:"start"});
}
function renderPapers(){
  const el=$("#papers");if(!el)return;const P=S.papers||{};
  el.innerHTML=PAPERS.slice().reverse().map(p=>{const x=P[p[0]];return `<button class="paper" data-paper="${p[0]}"><b>${esc(p[1])}</b><span class="sc">${x?`Mejor: ${x.best}/${p[2].filter(i=>i!=null).length} · <span class="${x.pass?"pass":"fail"}">${x.pass?"apto":"no apto"}</span>`:'<span class="muted">Sin hacer</span>'}</span></button>`}).join("");
  $$("[data-paper]",el).forEach(b=>b.addEventListener("click",()=>startPaper(b.dataset.paper)));
  const done=PAPERS.filter(p=>P[p[0]]).length,ok=PAPERS.filter(p=>P[p[0]]&&P[p[0]].pass).length;
  $("#papersSum").textContent=done?`${done} de ${PAPERS.length} hechos · ${ok} aptos`:`${PAPERS.length} convocatorias, de 2019 a octubre de 2026`;
}
$("#startMock").addEventListener("click",startMock);
$("#topicSel").innerHTML=T.map(t=>`<option value="${t.id}">${t.n}. ${t.name}</option>`).join("");
srcBar($("#mockSrc"));renderPapers();
$("#startTopic").addEventListener("click",()=>{clearInterval(timer);const id=$("#topicSel").value;instantQuiz($("#mockArea"),QQ().filter(q=>q[0]===id),`Práctica · ${TBY[id].name}`,(pc,c)=>{if(c>=10)S.best[id]=Math.max(S.best[id]||0,pc);save()})});


function resumeExam(){const c=S.cur;if(!c)return;const qs=c.ids.map(k=>QMAP[k]);if(qs.some(q=>!q)){S.cur=null;save();renderResume();return}
  runExam(qs,{title:c.title,paper:c.paper,timed:c.timed,voided:c.voided,resume:c})}
function curInfo(){const c=S.cur;if(!c)return "";const a=c.ans.filter(x=>x!=null).length;return `<b>${esc(c.title)}</b> a medias: ${a}/${c.ans.length} respondidas${c.timed?` · ${Math.max(0,Math.floor(c.left/60))} min de reloj`:""} · ${ago(c.ts)}`}
function renderResume(){const el=$("#resumeBox");if(!el)return;if(!S.cur||$("#mockArea .qnav")){el.hidden=true;return}el.hidden=false;
  el.innerHTML=`<span>⏸ ${curInfo()}</span><span class="row"><button class="btn" data-res>Continuar</button><button class="btn ghost sm" data-dis>Descartar</button></span>`;
  $("[data-res]",el).addEventListener("click",()=>{el.hidden=true;resumeExam()});$("[data-dis]",el).addEventListener("click",()=>{S.cur=null;save();renderResume()})}
function lastSession(){const L=S.log||[];if(!L.length)return null;let j=L.length-1;while(j>0&&L[j][0]-L[j-1][0]<36e5)j--;const ses=L.slice(j);const ok=ses.filter(x=>x[2]).length;
  const cnt={};ses.forEach(x=>{const q=QMAP[x[1]];if(q)cnt[q[0]]=(cnt[q[0]]||0)+1});const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0];return {n:ses.length,ok,ts:L[L.length-1][0],topic:top?TBY[top[0]]:null}}
function renderContinue(){const el=$("#continueBox");if(!el)return;const D=dueQs();const ls=lastSession();const lt=S.lastTema||store.get("lastTema",null);
  const rows=[];
  if(S.cur)rows.push(`<div class="row" style="justify-content:space-between"><span>⏸ ${curInfo()}</span><span class="row"><button class="btn" data-cres>Continuar el examen</button><button class="btn ghost sm" data-cdis>Descartar</button></span></div>`);
  rows.push(`<div class="row" style="justify-content:space-between"><span>↻ <b>Toca repasar hoy: ${D.length}</b> <span class="small muted">las que fallaste y las que vuelven tras 1, 3, 7, 14 o 30 días</span></span><button class="btn ${S.cur?"ghost":""}" data-due ${D.length?"":"disabled"}>${D.length?"Repasar ahora":"Nada pendiente"}</button></div>`);
  if(ls)rows.push(`<div class="small">Tu última sesión fue ${ago(ls.ts)}: ${ls.n} respuestas, ${ls.ok} bien${ls.topic?`, sobre todo de <a href="#tema/${ls.topic.n}">${ls.topic.n}. ${esc(ls.topic.name)}</a>`:""}.${lt?` <a href="#tema/${lt}">Volver al tema ${lt} →</a>`:""}</div>`);
  else rows.push(`<div class="small muted">Aún no has respondido ninguna pregunta. Empieza por el <a href="#tema/1">tema 1</a>.</div>`);
  el.innerHTML=`<div class="eyebrow">Seguir donde lo dejaste</div>${rows.join("")}<div id="continueQuiz"></div>`;
  const c=$("[data-cres]",el);c&&c.addEventListener("click",()=>{location.hash="#test";setTimeout(resumeExam,60)});
  const d=$("[data-cdis]",el);d&&d.addEventListener("click",()=>{S.cur=null;save();renderContinue()});
  const r=$("[data-due]",el);r&&r.addEventListener("click",()=>instantQuiz($("#continueQuiz"),dueQs(),"Repaso de hoy",()=>{renderPlan()},20));
}
function renderActivity(){const el=$("#activity");if(!el)return;const L=(S.log||[]).slice(-25).reverse();
  if(!L.length){el.innerHTML='<p class="muted">Aquí aparecerán tus últimas respuestas.</p>';return}
  el.innerHTML=`<div class="tablewrap"><table><tr><th></th><th>Pregunta</th><th>Tema</th><th>Cuándo</th><th>Vuelve</th></tr>${L.map(x=>{const q=QMAP[x[1]];if(!q)return "";const t=TBY[q[0]];
    return `<tr><td class="${x[2]?"pass":"fail"}">${x[2]?"✓":"✗"}</td><td class="small">${esc(q[1].length>90?q[1].slice(0,88)+"…":q[1])}</td><td class="small"><a href="#tema/${t.n}">${t.n}</a></td><td class="small muted" style="white-space:nowrap">${ago(x[0])}</td><td class="small muted" style="white-space:nowrap">${nextReview(S.stats[x[1]])}</td></tr>`}).join("")}</table></div>`;
}
/* ================= plan ================= */
function renderPlan(){renderContinue();
  $("#blueprint tbody").innerHTML=T.map(t=>{const ti=topicInfo(t.id);return `<tr><td><a href="#tema/${t.n}">${t.n}. ${t.name}</a></td><td style="text-align:center">${t.q}</td><td style="text-align:center">${t.min?`<span class="chip min">${t.min}</span>`:"—"}</td><td><div class="bar" style="width:${t.q*10}%"></div></td><td class="small">${ti.seen?`${ti.dom}/${ti.n} dominadas`:"—"}</td></tr>`}).join("");
  const tot=Q.length,dom=Object.values(S.stats).filter(s=>s[2]).length;const last=S.hist[S.hist.length-1];
  $("#progressSummary").innerHTML=`<b>${dom}</b> de ${tot} preguntas dominadas. `+(last?`Último simulacro: <b>${last.total}/45</b> (${last.pass?'<span class="pass">apto</span>':'<span class="fail">no apto</span>'}). `:"Aún no has hecho ningún simulacro. ")+`<br>${(()=>{const f=forecast();return f.answered>=40?`Probabilidad de aprobar hoy: <b>${Math.round(f.base.p*100)} %</b>. `:""})()}<a href="#progreso">Ver mi progreso completo →</a>`;
}


/* ================= pass forecast (Monte Carlo) ================= */
function rgamma(k){if(k<1){return rgamma(k+1)*Math.pow(Math.random(),1/k)}const d=k-1/3,c=1/Math.sqrt(9*d);for(;;){let x,v;do{const u1=Math.random(),u2=Math.random();x=Math.sqrt(-2*Math.log(u1||1e-12))*Math.cos(2*Math.PI*u2);v=1+c*x}while(v<=0);v=v*v*v;const u=Math.random();if(u<1-.0331*x*x*x*x)return d*v;if(Math.log(u)<.5*x*x+d*(1-v+Math.log(v)))return d*v}}
const rbeta=(a,b)=>{const x=rgamma(a);return x/(x+rgamma(b))};
function topicAcc(t){let a=0,b=0;Q.forEach(q=>{if(q[0]!==t)return;const s=st(q);if(s){a+=s[1];b+=s[0]}});return [a,b]}
function simulate(P,n){let pass=0,sum=0;const mins={baliz:0,ripa:0,carta:0};
  for(let k=0;k<n;k++){let tot=0,ok=true;for(const t of T){const p=P[t.id]();let c=0;for(let j=0;j<t.q;j++)if(Math.random()<p)c++;tot+=c;if(t.min){if(c>=t.min)mins[t.id]++;else ok=false}}sum+=tot;if(ok&&tot>=32)pass++}
  return {p:pass/n,exp:sum/n,mins:Object.fromEntries(Object.entries(mins).map(([k,v])=>[k,v/n]))}}
function forecast(){
  const A={};let answered=0;T.forEach(t=>{const [a,b]=topicAcc(t.id);A[t.id]=[a,b];answered+=b});
  const mk=(boost)=>Object.fromEntries(T.map(t=>{const [a,b]=A[t.id];const al=3+a,be=2+(b-a);return [t.id,()=>{const p=rbeta(al,be);return t.id===boost?Math.min(.99,p+.1):p}]}));
  const base=simulate(mk(null),4000);
  const lev=T.map(t=>({t,gain:simulate(mk(t.id),1500).p-base.p})).sort((x,y)=>y.gain-x.gain);
  return {base,lev,answered,A};
}
function renderForecast(){
  const el=$("#forecast");if(!el)return;const f=forecast();const pc=Math.round(f.base.p*100);
  if(f.answered<40){el.innerHTML=`<p class="muted">Responde al menos 40 preguntas (llevas ${f.answered}) y aquí verás tu probabilidad de aprobar, calculada simulando miles de exámenes con tu acierto real por tema.</p>`;return f}
  const lost=T.map(t=>{const [a,b]=f.A[t.id];const p=(3+a)/(5+b);return {t,pts:t.q*(1-p)}}).sort((x,y)=>y.pts-x.pts);
  const ci=f.answered<150?'<p class="small muted" style="margin:6px 0 0">Con menos de 150 respuestas la estimación es orientativa: parte de un supuesto de 60 % de acierto en los temas que aún no has practicado.</p>':"";
  const top=f.lev[0];
  el.innerHTML=`<div class="fc"><div class="gauge ${pc>=80?"pass":pc<50?"fail":""}">${pc} %</div><div><b>Probabilidad de aprobar si el examen fuera hoy</b><br><span class="small muted">Nota esperada ${f.base.exp.toFixed(1).replace(".",",")}/45 · 4.000 exámenes simulados con tu acierto por tema (${f.answered} respuestas)</span></div></div>
   <div class="blk" style="margin-top:12px">${T.filter(t=>t.min).map(t=>{const v=Math.round(f.base.mins[t.id]*100);return `<span>Mínimo de ${esc(t.name)} (${t.min}/${t.q})</span><span class="${v<80?"fail":"pass"}">${v} %</span><span class="mbar" style="width:90px;align-self:center"><i class="${v<80?"bad":""}" style="width:${v}%"></i></span>`}).join("")}</div>
   <p class="small" style="margin:10px 0 0">Donde más puntos pierdes: ${lost.slice(0,3).map(x=>`<a href="#tema/${x.t.n}/preguntas">${esc(x.t.name)}</a> (≈${x.pts.toFixed(1).replace(".",",")} de ${x.t.q})`).join(" · ")}.</p>
   ${top&&top.gain>0.005?`<div class="note"><b>Dónde rinde más estudiar:</b> subir 10 puntos de acierto en <a href="#tema/${top.t.n}/preguntas">${top.t.n}. ${esc(top.t.name)}</a> añade unos <b>${Math.round(top.gain*100)} puntos</b> a tu probabilidad de aprobar.${f.lev[1]&&f.lev[1].gain>0.005?` Después: ${f.lev[1].t.n}. ${esc(f.lev[1].t.name)} (+${Math.round(f.lev[1].gain*100)}).`:""}</div>`:""}${ci}`;
  return f;
}
/* ================= progress page ================= */
function mockChart(){
  const H=S.hist.slice(-20);const el=$("#mockChart");
  if(!H.length){el.innerHTML=`<p class="muted">Aún no has hecho ningún simulacro. <a href="#test">Haz el primero →</a></p>`;return}
  const W=640,Ht=220,pl=34,pr=10,pt=12,pb=28,iw=W-pl-pr,ih=Ht-pt-pb;const bw=Math.min(28,iw/H.length-4);const y=v=>pt+ih-(v/45)*ih;
  let s=`<svg viewBox="0 0 ${W} ${Ht}" role="img" aria-label="Aciertos en los últimos simulacros" style="width:100%;height:auto;max-height:260px">`;
  [0,15,32,45].forEach(v=>s+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="${v===32?"var(--accent)":"var(--line)"}" ${v===32?'stroke-dasharray="5 4" stroke-width="1.5"':""}/><text x="${pl-6}" y="${y(v)+4}" text-anchor="end" font-size="10" fill="var(--muted)">${v}</text>`);
  s+=`<text x="${W-pr}" y="${y(32)-5}" text-anchor="end" font-size="10" fill="var(--accent)">aprobado: 32</text>`;
  H.forEach((h,i)=>{const cx=pl+(i+.5)*(iw/H.length);const x=cx-bw/2,top=y(h.total),hgt=y(0)-top;const d=new Date(h.d);const lab=`${d.getDate()}/${d.getMonth()+1}`;
    s+=`<g><title>${lab}: ${h.total}/45 · ${h.pass?"APTO":"NO APTO"}</title><path d="M${x} ${y(0)} V${top+4} Q${x} ${top} ${x+4} ${top} H${x+bw-4} Q${x+bw} ${top} ${x+bw} ${top+4} V${y(0)} Z" fill="var(--sea)"/><text x="${cx}" y="${top-4}" text-anchor="middle" font-size="10" fill="var(--ink)">${h.total}${h.pass?"✓":""}</text>${H.length<=12||i%2===0?`<text x="${cx}" y="${Ht-10}" text-anchor="middle" font-size="9" fill="var(--muted)">${lab}</text>`:""}<rect x="${cx-iw/H.length/2}" y="${pt}" width="${iw/H.length}" height="${ih}" fill="transparent"/></g>`});
  s+=`</svg>`;const ok=S.hist.filter(h=>h.pass).length;
  el.innerHTML=s+`<p class="small muted">${S.hist.length} simulacros · ${ok} aptos (✓). Los aptos necesitan 32 aciertos y los tres mínimos.</p>`;
}
function renderProgress(){
  const tot=Q.length;const vals=Object.values(S.stats);const seen=vals.length,dom=vals.filter(s=>s[2]).length;const a=vals.reduce((x,s)=>x+s[1],0),b=vals.reduce((x,s)=>x+s[0],0);
  const ok=S.hist.filter(h=>h.pass).length;const exam=new Date(2026,11,12),today=new Date();today.setHours(0,0,0,0);const days=Math.round((exam-today)/864e5);
  $("#kpis").innerHTML=[["Dominadas",`${dom}<span class="small muted"> / ${tot}</span>`,`${Math.round(dom/tot*100)} % del banco`],["Vistas",`${seen}<span class="small muted"> / ${tot}</span>`,`${tot-seen} sin ver todavía`],["Aciertos",b?Math.round(a/b*100)+" %":"—",`${b} respuestas en total`],["Simulacros",`${S.hist.length}`,`${ok} aptos`],["Días al examen",days>0?days:"—","12 de diciembre"]].map(k=>`<div class="panel"><div class="eyebrow">${k[0]}</div><div class="count" style="font-size:40px">${k[1]}</div><div class="small muted">${k[2]}</div></div>`).join("");
  mockChart();renderForecast();renderActivity();
  const Dn=dueQs().length;$("#reviewDue").textContent=`Toca repasar hoy (${Dn})`;$("#reviewDue").disabled=!Dn;
  $("#progTable tbody").innerHTML=T.map(t=>{const ti=topicInfo(t.id);const pc=Math.round(ti.dom/ti.n*100);const weak=ti.acc!=null&&ti.acc<.7;return `<tr><td><a href="#tema/${t.n}">${t.n}. ${t.name}</a>${t.min?` <span class="chip min">mín ${t.min}</span>`:""}</td><td>${ti.seen}/${ti.n}</td><td><div style="display:flex;align-items:center;gap:8px"><div style="flex:1;min-width:60px;height:8px;border-radius:4px;background:var(--shoal)"><div style="width:${pc}%;height:8px;border-radius:4px;background:var(--ok)"></div></div><span class="small">${ti.dom}</span></div></td><td class="${weak?"fail":""}">${ti.acc!=null?Math.round(ti.acc*100)+" %":"—"}${weak?" ⚠︎":""}</td><td><a class="small" href="#tema/${t.n}/preguntas">Practicar →</a></td></tr>`}).join("");
  const W=Q.filter(q=>{const s=st(q);return s&&!s[2]}),N=Q.filter(q=>!st(q));
  $("#reviewWrong").textContent=`Repasar mis fallos (${W.length})`;$("#reviewWrong").disabled=!W.length;
  $("#reviewNew").textContent=`Preguntas que no he visto (${N.length})`;$("#reviewNew").disabled=!N.length;
  renderSync();
}
$("#reviewDue").addEventListener("click",()=>instantQuiz($("#reviewArea"),dueQs(),"Repaso de hoy",()=>renderProgress(),20));
$("#reviewWrong").addEventListener("click",()=>instantQuiz($("#reviewArea"),Q.filter(q=>{const s=st(q);return s&&!s[2]}),"Repaso de fallos",()=>renderProgress(),25));
$("#reviewNew").addEventListener("click",()=>instantQuiz($("#reviewArea"),Q.filter(q=>!st(q)),"Preguntas nuevas",()=>renderProgress(),25));
$("#expBtn").addEventListener("click",async()=>{const data=JSON.stringify(S);const name=`progreso-PER-${new Date().toISOString().slice(0,10)}.json`;
  let dl=null;try{dl=await window.claude?.use?.("downloads")}catch(e){}
  try{if(dl){await dl.save({filename:name,data});$("#bkMsg").textContent="Archivo guardado."}else{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"application/json"}));a.download=name;a.click();$("#bkMsg").textContent="Descarga iniciada."}}catch(e){$("#bkMsg").textContent="No se ha guardado el archivo."}});
$("#impIn").addEventListener("change",async e=>{const f=e.target.files[0];if(!f)return;try{const o=JSON.parse(await f.text());if(!o.stats)throw 0;S=merge(S,o);save();refreshViews();$("#bkMsg").textContent="Progreso importado y combinado con el actual."}catch(x){$("#bkMsg").textContent="Ese archivo no es un progreso válido."}e.target.value=""});
$("#resetBtn").addEventListener("click",e=>{const b=e.target;if(b.dataset.c!=="1"){b.dataset.c="1";b.textContent="Pulsa otra vez para confirmar";setTimeout(()=>{b.dataset.c="";b.textContent="Borrar todo mi progreso"},4000);return}S=blank();S.upd=Date.now();save();b.dataset.c="";b.textContent="Borrar todo mi progreso";refreshViews();$("#bkMsg").textContent="Progreso borrado."});

/* ================= save dialog ================= */
const dlg=$("#saveDlg");
$("#saveBtn").addEventListener("click",()=>{renderSync();try{dlg.showModal()}catch(e){dlg.setAttribute("open","")}});
$("#saveClose").addEventListener("click",()=>dlg.close?dlg.close():dlg.removeAttribute("open"));
$("#copyLink").addEventListener("click",async()=>{const i=$("#linkIn");try{await navigator.clipboard.writeText(i.value);$("#copyLink").textContent="✓ Copiado"}catch(e){i.select();try{document.execCommand("copy");$("#copyLink").textContent="✓ Copiado"}catch(x){$("#copyLink").textContent="Selecciónalo y copia"}}});

/* ================= practicals ================= */
const CHECKS=[["Parte meteorológico","Previsión de AEMET o por VHF para toda la salida, y su tendencia."],["Combustible por tercios","⅓ para ir, ⅓ para volver, ⅓ de reserva. Revisa el filtro decantador de agua."],["Nivel de aceite","Varilla entre las marcas, con el motor frío y nivelado."],["Refrigeración","Grifo de fondo abierto. Tras arrancar, comprueba que sale agua por el escape."],["Correas y baterías","Tensión de las correas. Desconectador de baterías encendido y tensión de unos 12,5 V o más."],["Sentina","Seca y sin olor a combustible. Bomba funcionando."],["Ventilación (gasolina)","Extractor encendido 4–5 min antes de arrancar."],["Material de seguridad","Chalecos para todos, bengalas en vigor, manómetro del extintor en verde, aro salvavidas, bocina."],["Luces y VHF","Luces de navegación funcionando. Prueba de radio en el canal de trabajo."],["Amarras y defensas","Decidir qué amarra se suelta la última y quién se encarga de cada defensa."]];
const drawChecks=()=>{$("#preCheck").innerHTML=CHECKS.map((c,i)=>`<label><input type="checkbox" id="chk-${i}" ${S.checks[i]?"checked":""}><span><b>${c[0]}</b>: ${c[1]}</span></label>`).join("")};drawChecks();
$("#preCheck").addEventListener("change",e=>{const i=e.target.id.split("-")[1];S.checks[i]=e.target.checked;save()});
const MAN=[["Arranque y parada","Palanca en punto muerto, baterías conectadas, ventilar, arrancar y comprobar la salida de agua de refrigeración. Para parar: punto muerto, un momento al ralentí y apagar."],["Desatraque","Lo primero es ver de dónde viene el viento. Usa un esprín para abrir la proa o la popa. Recoge las defensas solo cuando estés libre."],["Atraque de costado","Aproximación a unos 30° muy despacio. Una palada breve atrás para el barco y, con hélice dextrógira, acerca la popa si atracas por babor. Primero el largo de proa, después el esprín."],["Atraque en punta (de popa)","El amarre habitual en el Mediterráneo. Coger el muerto o largar el ancla bien separado, entrar atrás en línea recta y dar las amarras de popa."],["Fondeo","Fondo de arena lejos de la posidonia. Aproarse al viento y parar. Largar el ancla cuando el barco empiece a ir atrás, filar 3 veces la sonda o más, clavarla con una palada atrás y comprobar con enfilaciones."],["Hombre al agua","Con una defensa como náufrago: dar la voz, vigía, botón MOB, timón a la banda de caída, maniobra de Anderson y recogida por sotavento con el motor en punto muerto."],["Navegación y situación","Mantener un rumbo de aguja, tomar demoras con la aguja de marcar, situarse en la carta y compararlo con el GPS."],["Ciaboga","Girar sobre el propio eje: con dos motores, uno avante y otro atrás. Con uno solo, paladas cortas avante y atrás con el timón todo a una banda."]];
$("#manoeuvres").innerHTML=MAN.map(m=>`<h3>${m[0]}</h3><p>${m[1]}</p>`).join("");

/* ================= routing ================= */
const views=["plan","tema","test","progreso","practicas"];let curView=null;
function refreshViews(){drawChecks();if(curView==="test")renderResume();if(curView==="plan")renderPlan();if(curView==="progreso")renderProgress();if(curView==="tema"&&cur){const n=T.findIndex(t=>CH[t.n]===cur)+1;if(n)renderStepper(n)}}
function route(){
  const h=(location.hash||"#plan").slice(1).split("/");let v=h[0]||"plan";if(!views.includes(v))v="plan";curView=v;
  $$("[data-view]").forEach(s=>s.hidden=s.dataset.view!==v);
  $$("nav.tabs a").forEach(a=>{const t=a.getAttribute("href").slice(1).split("/")[0];if(t===v)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  if(v==="tema"){const n=Math.min(11,Math.max(1,parseInt(h[1])||1));if(!cur||cur!==CH[n])renderChapter(n);
    if(h[2]){const el=document.getElementById("s-"+h[2]);if(el)setTimeout(()=>el.scrollIntoView({behavior:"smooth"}),30)}else window.scrollTo({top:0});
    store.set("lastTema",n);if(S.lastTema!==n){S.lastTema=n;save()}const tb=$('nav.tabs a[href^="#tema"]');if(tb)tb.setAttribute("href","#tema/"+n)}
  else{if(cur&&cur._cleanup){try{cur._cleanup()}catch(e){}}cur=null;window.scrollTo({top:0})}
  if(v==="plan")renderPlan();if(v==="progreso")renderProgress();if(v==="test")renderResume();
}
window.addEventListener("hashchange",route);
const exam=new Date(2026,11,12);const today=new Date();today.setHours(0,0,0,0);const days=Math.round((exam-today)/864e5);
$("#countdown").textContent=days>0?days:days===0?"¡Hoy!":"—";
const lt=store.get("lastTema",null);const tabT=$('nav.tabs a[href="#tema/1"]');if(lt&&tabT)tabT.setAttribute("href","#tema/"+lt);
route();renderSync();connect();
})();
