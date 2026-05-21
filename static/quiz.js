/**
 * HopeLine Quiz Engine  (quiz.js)
 * Config-driven, strictly single-language — no mixing after lang is chosen.
 */

/* ── State ─────────────────────────────────────────────────────────── */
let lang      = "ta";
let answers   = {};
let history   = [];
let currentId = null;
let patient   = {};

/* ── Helpers ───────────────────────────────────────────────────────── */
const t       = (obj) => (obj && obj[lang]) ? obj[lang] : (obj && obj.en) ? obj.en : "";
const qById   = (id)  => CONFIG.questions.find(q => q.id === id);
const showScreen = (name) => {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById("screen-" + name);
  if (el) el.classList.add("active");
};

/* ── UI strings — one object per language, zero mixing ─────────────── */
const UI = {
  ta: {
    badgeReady:  "நம்பிக்கை வழி திட்டம்",
    titleReady:  "தயாரா?",
    subReady:    "உங்கள் மனசுல இருக்கிறதை பயமின்றி சுதந்திரமாகப் வெளிப்படுத்த உதவும் சில கேள்விகளுக்கு பதில் அளிக்க நீங்கள் தயாரா?",
    btnYes:      "✓ தயாராக இருக்கேன்",
    btnNo:       "இல்லை",
    notReady:    "பரவாயில்லை. நீங்கள் தயாரானதும் திரும்பவும். 🙏",
    badgeIntake: "தகவல் பதிவு",
    titleIntake: "உங்கள் தகவல்",
    subIntake:   "இந்த தகவல் முற்றிலும் ரகசியமானது.",
    lName:       "பெயர் *",
    lPid:        "PID எண் *",
    lAge:        "வயது",
    lDate:       "தேதி",
    phName:      "பெயர்",
    phAge:       "வயது",
    errForm:     "⚠ பெயர் மற்றும் PID கட்டாயம்.",
    btnStart:    "Quiz தொடங்குக →",
    prev:        "முன்பு",
    next:        "அடுத்து",
    seeResult:   "முடிவு காண",
    shScores:    "மதிப்பெண்கள்",
    shAnswers:   "பதில்கள்",
    btnRestart:  "↩ மீண்டும்",
    saving:      "⏳ சேமிக்கப்படுகிறது…",
    saved:       "✅ பதில்கள் சேமிக்கப்பட்டன.",
    saveErr:     "⚠ சேமிக்க முடியவில்லை.",
    serverErr:   "⚠ Server தொடர்பில்லை.",
    question:    "கேள்வி",
    printTitle:  "மனநல மதிப்பீடு அறிக்கை",
    pName:       "பெயர்",   pAge: "வயது",  pDate: "தேதி",
    pLang:       "மொழி",    pLangVal: "தமிழ்",
    pScore:      "மொத்த மதிப்பெண்",
    pScores:     "மதிப்பெண்கள்",
    pAnswers:    "விரிவான பதில்கள்",
  },
  en: {
    badgeReady:  "Project HopeLine",
    titleReady:  "Ready?",
    subReady:    "Are you ready to answer some questions to help you freely express yourself?",
    btnYes:      "✓ Yes, I'm Ready",
    btnNo:       "Not Ready",
    notReady:    "That's okay. Come back when you feel ready. 🙏",
    badgeIntake: "Registration",
    titleIntake: "Your Information",
    subIntake:   "This information is completely confidential.",
    lName:       "Name *",
    lPid:        "PID Number *",
    lAge:        "Age",
    lDate:       "Date",
    phName:      "Full name",
    phAge:       "Age",
    errForm:     "⚠ Name & PID are required.",
    btnStart:    "Start Quiz →",
    prev:        "Previous",
    next:        "Next",
    seeResult:   "See Result",
    shScores:    "Domain Scores",
    shAnswers:   "Answers",
    btnRestart:  "↩ Restart",
    saving:      "⏳ Saving…",
    saved:       "✅ Saved.",
    saveErr:     "⚠ Could not save.",
    serverErr:   "⚠ Server error.",
    question:    "Question",
    printTitle:  "Mental Health Assessment Report",
    pName:       "Name",    pAge: "Age",  pDate: "Date",
    pLang:       "Language",pLangVal: "English",
    pScore:      "Total Score",
    pScores:     "Domain Scores",
    pAnswers:    "Detailed Answers",
  }
};

/* ── Push all UI strings into DOM after lang chosen ─────────────────── */
function applyLangUI() {
  const u = UI[lang];
  const s = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  const p = (id, v) => { const e = document.getElementById(id); if (e) e.placeholder  = v; };
  s("r-badge",   u.badgeReady);  s("r-title",  u.titleReady); s("r-sub",    u.subReady);
  s("r-btn-yes", u.btnYes);      s("r-btn-no", u.btnNo);
  s("i-badge",   u.badgeIntake); s("i-title",  u.titleIntake); s("i-sub",   u.subIntake);
  s("l-name",    u.lName);       s("l-pid",    u.lPid);
  s("l-age",     u.lAge);        s("l-date",   u.lDate);
  s("btn-start", u.btnStart);
  s("sh-scores", u.shScores);    s("sh-answers", u.shAnswers);
  s("btn-restart", u.btnRestart);
  p("fn", u.phName); p("fa", u.phAge);
}

/* ── Language selection ─────────────────────────────────────────────── */
function setLang(l) {
  lang = l;
  applyLangUI();
  showScreen("ready");
}

/* ── Ready / Intake ─────────────────────────────────────────────────── */
function goIntake() { showScreen("intake"); }

function notReady() {
  const box = document.getElementById("nrbox");
  box.textContent   = UI[lang].notReady;
  box.style.display = "block";
}

/* ── Intake form ─────────────────────────────────────────────────────── */
function beginQuiz() {
  const name = document.getElementById("fn").value.trim();
  const pid  = document.getElementById("fp").value.trim();
  const err  = document.getElementById("ferr");
  err.textContent = UI[lang].errForm;
  if (!name || !pid) { err.style.display = "block"; return; }
  err.style.display = "none";
  patient = {
    name, pid,
    age:  document.getElementById("fa").value,
    date: document.getElementById("fd").value || new Date().toISOString().split("T")[0],
    lang
  };
  answers = {}; history = []; currentId = null;
  showScreen("q");
  showQuestion(CONFIG.questions[0].id);
}

/* ── Progress ────────────────────────────────────────────────────────── */
function updateProgress() {
  const pos = history.indexOf(currentId) + 1;
  const pct = history.length > 0 ? Math.round((Object.keys(answers).length / history.length) * 100) : 0;
  document.getElementById("ptxt").textContent = UI[lang].question + " " + pos + " / " + history.length;
  document.getElementById("ppct").textContent  = pct + "%";
  document.getElementById("pfill").style.width = pct + "%";
}

function buildDots() {
  const wrap = document.getElementById("dwrap");
  wrap.innerHTML = "";
  history.forEach((qid, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (answers[qid] !== undefined ? " answered" : "") + (qid === currentId ? " current" : "");
    d.textContent = i + 1;
    d.onclick = () => jumpTo(qid, i);
    wrap.appendChild(d);
  });
}

/* ── Show question — active language only, no mixing ────────────────── */
function showQuestion(qid) {
  const q = qById(qid);
  if (!q) return;
  currentId = qid;
  if (!history.includes(qid)) history.push(qid);

  const btag = document.getElementById("btag");
  btag.textContent = t(CONFIG.branchLabels[q.branch] || {});
  btag.className   = "btag " + (q.branch || "normal");

  document.getElementById("qsec").textContent  = t(q.section);
  document.getElementById("qmain").textContent = t(q.text);
  document.getElementById("qsub").textContent  = t(q.sub) || "";
  document.getElementById("qsec2").textContent = ""; // always empty — no other language shown

  updateProgress();
  buildDots();

  // Options — single language, no subtitle
  const optsEl = document.getElementById("qopts");
  optsEl.innerHTML = "";
  q.opts.forEach((o, i) => {
    const n = i + 1;
    let cls = "opt-btn";
    if (o.dng)       cls += " dng";
    else if (o.warn) cls += " warn";
    if (answers[qid] === n) cls += " sel";
    const btn = document.createElement("button");
    btn.className = cls;
    btn.innerHTML = `<span class="opt-n">${n}</span><span class="om">${t(o)}</span>`;
    btn.onclick = () => pick(qid, n);
    optsEl.appendChild(btn);
  });

  const hi = history.indexOf(qid);
  document.getElementById("bprev").disabled = (hi <= 0);
  const isLast = q.opts.some((_, i) => CONFIG.flow[`${qid}-${i+1}`] === "END");
  document.getElementById("lnext").textContent = isLast ? UI[lang].seeResult : UI[lang].next;
  document.getElementById("lprev").textContent = UI[lang].prev;
  document.getElementById("bnext").disabled = (answers[qid] === undefined);
}

/* ── Pick option ─────────────────────────────────────────────────────── */
function pick(qid, n) {
  answers[qid] = n;
  document.querySelectorAll(".opt-btn").forEach((b, i) => b.classList.toggle("sel", i + 1 === n));
  document.getElementById("bnext").disabled = false;
}

/* ── Navigation ──────────────────────────────────────────────────────── */
function goNext() {
  if (answers[currentId] === undefined) return;
  const nxt = CONFIG.flow[`${currentId}-${answers[currentId]}`];
  if (!nxt) { console.warn("No flow for", currentId, answers[currentId]); return; }
  if (nxt === "END") { showResult(); return; }
  const idx = history.indexOf(nxt);
  if (idx !== -1) history = history.slice(0, idx);
  showQuestion(nxt);
}

function goPrev() {
  const i = history.indexOf(currentId);
  if (i > 0) showQuestion(history[i - 1]);
}

function jumpTo(qid, idx) {
  history = history.slice(0, idx + 1);
  currentId = qid;
  showQuestion(qid);
}

/* ── Scoring ─────────────────────────────────────────────────────────── */
function compute() {
  const raw = {};
  const inS = history.some(qid => [28,29,30,31].includes(qid));
  let total = 0, redCt = 0, warnCt = 0;
  history.forEach(qid => {
    const n = answers[qid]; if (n === undefined) return;
    const o = qById(qid).opts[n - 1];
    if (o.dng) redCt++; if (o.warn) warnCt++;
    Object.entries(o.sc).forEach(([k,v]) => { raw[k] = (raw[k]||0)+v; total+=v; });
  });
  const cage = raw.cage||0, risk = raw.risk||0;
  const tk = (inS && risk>0) ? "s" : (redCt>=2||total>=20) ? 3 : (warnCt>=3||total>=10||cage>=2) ? 2 : 1;
  const ds = {};
  Object.entries(CONFIG.domains).forEach(([key,cfg]) => {
    if (raw[key] !== undefined) ds[key] = { value: raw[key], label: t(cfg), color: cfg.color };
  });
  return { tk, tier: CONFIG.tiers[tk], ds, raw, total, redCt };
}

/* ── Result ──────────────────────────────────────────────────────────── */
async function showResult() {
  const r = compute(), u = UI[lang];
  document.getElementById("eicon").textContent      = r.tier.icon;
  document.getElementById("eicon").style.background = r.tier.bg;
  document.getElementById("etitle").textContent     = t(r.tier.title);
  const pp = document.getElementById("tpill");
  pp.textContent = t(r.tier.pill); pp.className = "tier-pill " + r.tier.cls;
  document.getElementById("edesc").textContent = t(r.tier.desc);
  document.getElementById("awrap").innerHTML = `<div class="alert-box ${r.tier.alertCls}">${t(r.tier.msg)}</div>`;

  // Domain bars
  const g = document.getElementById("sgrid"); g.innerHTML = "";
  const mx = Math.max(...Object.values(r.ds).map(d=>d.value), 1);
  Object.entries(r.ds).forEach(([,d]) => {
    g.innerHTML += `<div class="sc"><div class="sn">${d.label}</div>`+
      `<div class="sbw"><div class="sbf" style="width:${Math.round(d.value/mx*100)}%;background:${d.color}"></div></div>`+
      `<div class="sv">${d.value} pts</div></div>`;
  });

  // Answers — active language only
  const al = document.getElementById("alist"); al.innerHTML = "";
  history.forEach(qid => {
    if (answers[qid] === undefined) return;
    const o = qById(qid).opts[answers[qid]-1];
    al.innerHTML += `<div class="ar-row"><div class="ar-qn">Q${qid}</div><div class="ar-m">${t(o)}</div></div>`;
  });

  showScreen("end");

  // Save
  const smsg = document.getElementById("smsg");
  smsg.textContent = u.saving;
  try {
    const payload = {};
    history.forEach(qid => {
      if (answers[qid] === undefined) return;
      const o = qById(qid).opts[answers[qid]-1];
      payload[qid] = { optNum: answers[qid], en: o.en, ta: o.ta };
    });
    const res = await fetch("/api/submit", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ ...patient, answers:payload, scores:r.raw,
        tier: typeof r.tk==="number"?r.tk:3, totalScore:r.total, redFlags:r.redCt })
    });
    smsg.textContent = res.ok ? u.saved : u.saveErr;
  } catch { smsg.textContent = u.serverErr; }
}

/* ── Print ───────────────────────────────────────────────────────────── */
function printRpt() {
  const r = compute(), u = UI[lang];
  const pa = document.getElementById("parea");
  const arows = history.filter(qid=>answers[qid]!==undefined).map(qid => {
    const q=qById(qid), o=q.opts[answers[qid]-1];
    return `<div class="par"><div class="pqn">Q${qid}</div><div class="pq">${t(q.text)}</div><div class="pa">${t(o)}</div></div>`;
  }).join("");
  const srows = Object.entries(r.ds).map(([,d])=>`<div class="psr"><span>${d.label}</span><b>${d.value} pts</b></div>`).join("");
  const tbg = r.tk===1?"background:#d1fae5;color:#065f46":r.tk===2?"background:#fef3c7;color:#78350f":"background:#fee2e2;color:#7f1d1d";
  pa.innerHTML = `
    <div class="ph"><div class="pt">🌿 ${t(CONFIG.name)} – ${u.printTitle}</div>
    <div class="pd">${t(CONFIG.department)}</div>
    <div class="pm">
      <div class="pmi">${u.pName}: <b>${patient.name}</b></div>
      <div class="pmi">PID: <b>${patient.pid}</b></div>
      <div class="pmi">${u.pAge}: <b>${patient.age||"—"}</b></div>
      <div class="pmi">${u.pDate}: <b>${patient.date}</b></div>
      <div class="pmi">${u.pLang}: <b>${u.pLangVal}</b></div>
      <div class="pmi">${u.pScore}: <b>${r.total}</b></div>
    </div></div>
    <div><div class="ptier" style="${tbg}">${t(r.tier.pill)}</div><br>
    <b style="font-size:14px">${t(r.tier.title)}</b><br>
    <span style="font-size:12px;color:#3d5066">${t(r.tier.desc)}</span><br>
    <div style="margin-top:6px;padding:6px 10px;border-radius:6px;font-size:11px;font-weight:600;${tbg}">${t(r.tier.msg)}</div></div>
    <div class="pst">${u.pScores}</div>${srows}
    <div class="pst">${u.pAnswers}</div>${arows}
    <div class="pdisc">"${t(CONFIG.disclaimer)}"</div>`;
  window.print();
}

/* ── Restart ─────────────────────────────────────────────────────────── */
function restartFull() {
  answers={}; history=[]; currentId=null;
  ["fn","fp","fa"].forEach(id=>{const e=document.getElementById(id);if(e)e.value="";});
  showScreen("lang");
}

/* ── Init ────────────────────────────────────────────────────────────── */
(function(){ const fd=document.getElementById("fd"); if(fd) fd.value=new Date().toISOString().split("T")[0]; })();
