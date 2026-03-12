import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   KINDRED PHONE NUMBER — replace with real number when ready
───────────────────────────────────────────────────────────── */
const KINDRED_PHONE_DISPLAY = "(872) 249-1829";
const KINDRED_PHONE_TEL     = "+18722491829";
const KINDRED_PHONE_LABEL   = "Kindred AI · Live Demo Line";

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:      #05080f;
      --bg1:     #090d18;
      --bg2:     #0d1422;
      --teal:    #00d4c8;
      --teal2:   #00a89e;
      --gold:    #c9a84c;
      --gold2:   #f0cc6e;
      --goldg:   #e8b84e;
      --orange:  #e8764a;
      --green:   #2ecc88;
      --dim:     #2a3a55;
      --dim2:    #1a2840;
      --text:    #a8c0d8;
      --text2:   #4a6080;
      --white:   #e8f2ff;
      --border:  rgba(0,212,200,0.12);
      --borderG: rgba(201,168,76,0.2);
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      font-family: 'DM Sans', sans-serif;
      color: var(--text);
      overflow-x: hidden;
      min-height: 100vh;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--teal2); border-radius: 2px; }

    body::before {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.4;
    }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes pulse    { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.04)} }
    @keyframes orb-drift{ 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,30px) scale(.97)} 100%{transform:translate(0,0) scale(1)} }
    @keyframes glow-teal{ 0%,100%{box-shadow:0 0 20px rgba(0,212,200,.25)} 50%{box-shadow:0 0 42px rgba(0,212,200,.6),0 0 80px rgba(0,212,200,.15)} }
    @keyframes ring-expand  { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.4);opacity:0} }
    @keyframes ring-expand2 { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(3.0);opacity:0} }
    @keyframes phone-shake {
      0%,100%{transform:rotate(0deg)} 10%{transform:rotate(-9deg)} 20%{transform:rotate(9deg)}
      30%{transform:rotate(-6deg)} 40%{transform:rotate(6deg)} 50%{transform:rotate(-3deg)}
      60%{transform:rotate(3deg)} 70%{transform:rotate(0deg)}
    }
    @keyframes modal-in {
      from{opacity:0;transform:scale(.93) translateY(20px)}
      to{opacity:1;transform:scale(1) translateY(0)}
    }
    @keyframes backdrop-in { from{opacity:0} to{opacity:1} }
    @keyframes number-glow {
      0%,100%{text-shadow:0 0 14px rgba(0,212,200,.3)}
      50%{text-shadow:0 0 30px rgba(0,212,200,.75),0 0 56px rgba(0,212,200,.2)}
    }
    @keyframes copied-pop {
      0%{transform:scale(.8);opacity:0} 50%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1}
    }
    @keyframes dot-live {
      0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.8)}
    }

    section { position: relative; }

    /* NAV */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 0 48px; height: 68px;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(5,8,15,0.88); backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(201,168,76,0.15);
    }
    .nav-logo {
      font-family: 'Cinzel', serif; font-size: 1.15rem; font-weight: 700;
      letter-spacing: .18em;
      background: linear-gradient(135deg, var(--goldg), var(--gold2), var(--teal));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .nav-links { display: flex; gap: 36px; list-style: none; }
    .nav-links a {
      font-size: .72rem; letter-spacing: .15em; text-transform: uppercase;
      color: var(--text2); text-decoration: none; transition: color .2s;
    }
    .nav-links a:hover { color: var(--gold2); }

    /* ── BUTTONS ── */
    .btn-test-nav {
      font-size: .68rem; letter-spacing: .14em; text-transform: uppercase;
      padding: 9px 20px; border-radius: 4px; border: none;
      background: linear-gradient(135deg, var(--teal2), var(--teal));
      color: var(--bg); font-weight: 600; cursor: pointer;
      font-family: 'DM Mono', monospace;
      display: flex; align-items: center; gap: 7px;
      animation: glow-teal 3s ease-in-out infinite;
      transition: transform .15s, filter .15s;
    }
    .btn-test-nav:hover { transform: translateY(-1px); filter: brightness(1.1); }

    .btn-test-main {
      font-family: 'Cinzel', serif; font-size: .85rem;
      letter-spacing: .16em; font-weight: 700;
      padding: 16px 40px; border-radius: 5px; border: none;
      background: linear-gradient(135deg, var(--teal2), var(--teal));
      color: var(--bg); cursor: pointer;
      display: inline-flex; align-items: center; gap: 10px;
      animation: glow-teal 3s ease-in-out infinite;
      transition: transform .2s, filter .2s;
    }
    .btn-test-main:hover { transform: translateY(-2px); filter: brightness(1.12); }

    .btn-secondary {
      font-family: 'DM Mono', monospace; font-size: .72rem;
      letter-spacing: .12em; text-transform: uppercase;
      padding: 16px 36px; border-radius: 5px;
      border: 1px solid var(--border); background: transparent;
      color: var(--text); cursor: pointer; transition: border-color .2s, color .2s;
    }
    .btn-secondary:hover { border-color: var(--gold2); color: var(--gold2); }

    /* ── HERO ── */
    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 120px 48px 80px;
      position: relative; overflow: hidden;
    }
    .hero-grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(201,168,76,.033) 1px, transparent 1px),
        linear-gradient(90deg, rgba(201,168,76,.033) 1px, transparent 1px);
      background-size: 60px 60px; pointer-events: none;
    }
    .hero-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }

    .hero-eyebrow {
      font-family: 'DM Mono', monospace; font-size: .68rem;
      letter-spacing: .3em; text-transform: uppercase; color: var(--teal2);
      border: 1px solid rgba(0,212,200,.25); padding: 6px 18px; border-radius: 3px;
      margin-bottom: 28px; opacity: 0; animation: fadeUp .6s .2s ease forwards;
    }
    .hero-title {
      font-family: 'Cinzel', serif;
      font-size: clamp(3.5rem,8vw,7rem);
      font-weight: 900; line-height: .95; letter-spacing: .04em; color: var(--white);
      opacity: 0; animation: fadeUp .7s .4s ease forwards; margin-bottom: 10px;
    }
    .shimmer-text {
      background: linear-gradient(90deg, var(--gold), var(--gold2), var(--teal), var(--gold), var(--gold2));
      background-size: 300% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      animation: shimmer 4s linear infinite;
    }
    .hero-subtitle {
      font-size: clamp(1rem,2vw,1.3rem); font-weight: 300; color: var(--text);
      max-width: 660px; line-height: 1.75; margin: 24px auto 0;
      opacity: 0; animation: fadeUp .7s .6s ease forwards;
    }
    .hero-stats {
      display: flex; gap: 60px; margin-top: 52px;
      opacity: 0; animation: fadeUp .7s .9s ease forwards;
    }
    .hero-stat-num {
      font-family: 'Cinzel', serif; font-size: 2.2rem; font-weight: 700;
      background: linear-gradient(135deg, var(--gold2), var(--teal));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .hero-stat-label { font-size: .65rem; letter-spacing: .18em; text-transform: uppercase; color: var(--text2); margin-top: 4px; }
    .hero-cta-row {
      display: flex; gap: 14px; margin-top: 48px;
      opacity: 0; animation: fadeUp .7s 1.1s ease forwards;
      align-items: center; justify-content: center;
    }
    .hero-scroll {
      position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
      font-family: 'DM Mono', monospace; font-size: .6rem;
      letter-spacing: .2em; text-transform: uppercase; color: var(--text2);
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      opacity: 0; animation: fadeIn 1s 1.6s ease forwards;
    }
    .hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(180deg, var(--gold2), transparent); animation: pulse 2s ease-in-out infinite; }

    /* ── SHARED ── */
    .sec-eyebrow { font-family: 'DM Mono', monospace; font-size: .65rem; letter-spacing: .28em; text-transform: uppercase; color: var(--teal2); margin-bottom: 12px; }
    .sec-title { font-family: 'Cinzel', serif; font-size: clamp(1.8rem,3.5vw,2.8rem); font-weight: 700; color: var(--white); line-height: 1.1; letter-spacing: .04em; }
    .sec-title .gold { color: var(--goldg); }
    .sec-desc { font-size: 1rem; font-weight: 300; color: var(--text); max-width: 600px; line-height: 1.75; margin-top: 16px; }
    .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--borderG), rgba(0,212,200,.15), transparent); }
    .card {
      border: 1px solid var(--border); border-radius: 8px; background: var(--bg1);
      transition: border-color .25s, transform .25s, box-shadow .25s;
    }
    .card:hover { border-color: rgba(0,212,200,.3); transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,.4); }
    .agent-tab {
      padding: 10px 24px; font-family: 'DM Mono', monospace;
      font-size: .68rem; letter-spacing: .12em; text-transform: uppercase;
      border: 1px solid transparent; border-radius: 5px;
      cursor: pointer; transition: all .2s; background: transparent; color: var(--text2);
    }
    .agent-tab:hover:not(.active) { color: var(--text); border-color: var(--dim); }
    .arch-node {
      border: 1px solid; border-radius: 6px; padding: 9px 12px;
      font-size: .62rem; line-height: 1.55;
      font-family: 'DM Mono', monospace; transition: all .2s;
    }
    .arch-node:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.5); }
    .feature-pill {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: .62rem; letter-spacing: .1em;
      padding: 5px 11px; border-radius: 20px; border: 1px solid;
      font-family: 'DM Mono', monospace;
    }

    /* ── MODAL ── */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(2,5,12,.85);
      backdrop-filter: blur(16px);
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      animation: backdrop-in .22s ease forwards;
    }
    .modal-box {
      background: linear-gradient(160deg, #0c1220, #090d18);
      border: 1px solid rgba(0,212,200,.28);
      border-radius: 20px;
      padding: 52px 44px 44px;
      max-width: 460px; width: 100%;
      position: relative;
      animation: modal-in .32s cubic-bezier(.2,.8,.4,1) forwards;
      box-shadow:
        0 0 0 1px rgba(201,168,76,.07),
        0 40px 100px rgba(0,0,0,.8),
        0 0 80px rgba(0,212,200,.05);
    }
    .modal-close {
      position: absolute; top: 16px; right: 20px;
      background: none; border: none; cursor: pointer;
      color: var(--text2); font-size: 1.2rem; line-height: 1;
      transition: color .2s; padding: 4px;
    }
    .modal-close:hover { color: var(--white); }

    .modal-phone-ring {
      position: relative; width: 100px; height: 100px;
      margin: 0 auto 36px;
      display: flex; align-items: center; justify-content: center;
    }
    .ring-1, .ring-2 {
      position: absolute; inset: 0; border-radius: 50%;
      border: 1.5px solid var(--teal); opacity: 0;
    }
    .ring-1 { animation: ring-expand  2s ease-out infinite; }
    .ring-2 { animation: ring-expand2 2s .6s ease-out infinite; }
    .phone-icon-wrap {
      width: 68px; height: 68px; border-radius: 50%;
      background: linear-gradient(135deg, var(--teal2), var(--teal));
      display: flex; align-items: center; justify-content: center;
      font-size: 1.8rem; position: relative; z-index: 1;
      box-shadow: 0 0 36px rgba(0,212,200,.45);
    }
    .phone-icon-inner { animation: phone-shake 2.5s ease-in-out infinite; display: block; }

    .modal-number-label {
      font-family: 'DM Mono', monospace; font-size: .6rem;
      letter-spacing: .24em; text-transform: uppercase;
      color: var(--text2); text-align: center; margin-bottom: 10px;
    }
    .modal-number {
      font-family: 'Cinzel', serif; font-size: 2.15rem; font-weight: 700;
      text-align: center; color: var(--teal); letter-spacing: .06em;
      animation: number-glow 2.5s ease-in-out infinite;
      cursor: pointer; transition: color .2s; user-select: all;
      margin-bottom: 6px;
    }
    .modal-number:hover { color: var(--gold2); }
    .modal-live-badge {
      display: flex; align-items: center; justify-content: center; gap: 7px;
      font-family: 'DM Mono', monospace; font-size: .58rem;
      letter-spacing: .14em; color: var(--green);
      margin-bottom: 4px;
    }
    .live-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation: dot-live 1.4s ease-in-out infinite; }

    .modal-divider {
      width: 100%; height: 1px; margin: 28px 0;
      background: linear-gradient(90deg, transparent, rgba(0,212,200,.2), rgba(201,168,76,.12), transparent);
    }

    .btn-call {
      width: 100%; padding: 17px; border-radius: 10px; border: none;
      background: linear-gradient(135deg, var(--teal2), var(--teal));
      color: var(--bg); font-family: 'Cinzel', serif;
      font-size: .9rem; font-weight: 700; letter-spacing: .12em;
      cursor: pointer; transition: transform .15s, filter .15s;
      display: flex; align-items: center; justify-content: center; gap: 10px;
      animation: glow-teal 3s ease-in-out infinite;
      text-decoration: none;
    }
    .btn-call:hover { transform: translateY(-1px); filter: brightness(1.1); }

    .btn-copy {
      width: 100%; padding: 12px; border-radius: 10px; margin-top: 10px;
      border: 1px solid rgba(201,168,76,.28);
      background: rgba(201,168,76,.05);
      color: var(--gold2); font-family: 'DM Mono', monospace;
      font-size: .7rem; letter-spacing: .14em; text-transform: uppercase;
      cursor: pointer; transition: all .2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .btn-copy:hover { background: rgba(201,168,76,.12); border-color: rgba(201,168,76,.5); }
    .copied-msg {
      font-family: 'DM Mono', monospace; font-size: .6rem;
      color: var(--green); letter-spacing: .14em;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      margin-top: 8px; animation: copied-pop .3s ease forwards;
    }

    .modal-tip {
      font-family: 'DM Mono', monospace; font-size: .57rem;
      letter-spacing: .11em; color: var(--text2);
      text-align: center; margin-top: 22px; line-height: 1.65;
    }
    .modal-agents {
      display: flex; gap: 8px; justify-content: center;
      margin-top: 18px; flex-wrap: wrap;
    }
    .modal-agent-tag {
      font-family: 'DM Mono', monospace; font-size: .55rem;
      letter-spacing: .1em; padding: 4px 11px; border-radius: 12px;
      border: 1px solid;
    }

    /* FOOTER */
    footer {
      padding: 60px 48px; border-top: 1px solid var(--borderG);
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-logo { font-family: 'Cinzel', serif; font-size: 1rem; font-weight: 700; color: var(--gold2); letter-spacing: .2em; }
  `}</style>
);

/* ─── CALL MODAL ─────────────────────────────────────────────── */
const CallModal = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(KINDRED_PHONE_DISPLAY).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    });
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ANIMATED RINGS + PHONE */}
        <div className="modal-phone-ring">
          <div className="ring-1" />
          <div className="ring-2" />
          <div className="phone-icon-wrap">
            <span className="phone-icon-inner">📞</span>
          </div>
        </div>

        {/* NUMBER */}
        <div className="modal-number-label">{KINDRED_PHONE_LABEL}</div>
        <div className="modal-number" onClick={handleCopy} title="Click to copy">
          {KINDRED_PHONE_DISPLAY}
        </div>
        <div className="modal-live-badge">
          <span className="live-dot" />
          Agents online · available now
        </div>

        <div className="modal-divider" />

        {/* CALL BUTTON — uses tel: href so it works natively on mobile */}
        <a className="btn-call" href={`tel:${KINDRED_PHONE_TEL}`}>
          <span>📞</span> Call Kindred Now
        </a>

        {/* COPY */}
        <button className="btn-copy" onClick={handleCopy}>
          {copied ? "✓  Copied!" : "⎘  Copy Number"}
        </button>
        {copied && (
          <div className="copied-msg"><span>✓</span> Number copied to clipboard</div>
        )}

        {/* DESKTOP TIP */}
        <p className="modal-tip">
          On desktop? Dial manually or scan from your phone.<br />
          Kindred's AI answers instantly — 24 hours a day.
        </p>

        {/* AGENT TAGS */}
        <div className="modal-agents">
          {[
            { label:"📋 Receptionist", color:"#00d4c8" },
            { label:"🔧 Maintenance",  color:"#3dff85" },
            { label:"🏠 Leasing",      color:"#c9a84c" },
          ].map(a => (
            <span key={a.label} className="modal-agent-tag"
              style={{ borderColor:`${a.color}40`, color:a.color, background:`${a.color}10` }}>
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── ORBIT GRAPHIC ──────────────────────────────────────────── */
const OrbitGraphic = () => (
  <svg width="520" height="520" viewBox="0 0 520 520"
    style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
      opacity:0.15, pointerEvents:"none", animation:"rotateSlow 60s linear infinite" }}>
    <circle cx="260" cy="260" r="200" fill="none" stroke="rgba(201,168,76,.5)" strokeWidth=".5" strokeDasharray="4 8"/>
    <circle cx="260" cy="260" r="140" fill="none" stroke="rgba(0,212,200,.4)" strokeWidth=".5" strokeDasharray="2 6"/>
    <circle cx="260" cy="260" r="80"  fill="none" stroke="rgba(201,168,76,.3)" strokeWidth=".5"/>
    {[0,60,120,180,240,300].map((deg,i) => {
      const r=(deg*Math.PI)/180, x=260+200*Math.cos(r), y=260+200*Math.sin(r);
      return <circle key={i} cx={x} cy={y} r="3" fill="rgba(201,168,76,.8)"/>;
    })}
    {[30,90,150,210,270,330].map((deg,i) => {
      const r=(deg*Math.PI)/180, x=260+140*Math.cos(r), y=260+140*Math.sin(r);
      return <circle key={i} cx={x} cy={y} r="2" fill="rgba(0,212,200,.8)"/>;
    })}
  </svg>
);

/* ─── COUNTER ────────────────────────────────────────────────── */
const Counter = ({ to, suffix="" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n=0; const step=to/60;
    const id = setInterval(()=>{ n+=step; if(n>=to){setVal(to);clearInterval(id);}else setVal(Math.floor(n)); },16);
    return ()=>clearInterval(id);
  },[to]);
  return <span>{val}{suffix}</span>;
};

/* ─── NAV ────────────────────────────────────────────────────── */
const Nav = ({ onTestClick }) => (
  <nav>
    <div className="nav-logo">KINDRED PM</div>
    <ul className="nav-links">
      {["Platform","Agents","Architecture","Models"].map(l=>(
        <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
      ))}
    </ul>
    <button className="btn-test-nav" onClick={onTestClick}>
      <span>📞</span> Test Kindred
    </button>
  </nav>
);

/* ─── HERO ───────────────────────────────────────────────────── */
const Hero = ({ onTestClick }) => (
  <section className="hero" id="platform">
    <div className="hero-grid-bg"/>
    <div className="hero-orb" style={{width:600,height:600,top:"10%",left:"60%",background:"radial-gradient(ellipse,rgba(201,168,76,.1) 0%,transparent 70%)",animation:"orb-drift 18s ease-in-out infinite"}}/>
    <div className="hero-orb" style={{width:400,height:400,top:"50%",left:"5%",background:"radial-gradient(ellipse,rgba(0,212,200,.08) 0%,transparent 70%)",animation:"orb-drift 22s ease-in-out infinite reverse"}}/>
    <OrbitGraphic/>

    <div className="hero-eyebrow">KindredPM · Introducing</div>
    <h1 className="hero-title"><span className="shimmer-text">KINDRED</span></h1>

    <p style={{fontFamily:"'Cinzel',serif",fontSize:"1.05rem",letterSpacing:".25em",color:"var(--text2)",opacity:0,animation:"fadeUp .7s .55s ease forwards",marginTop:8}}>
      THE INTELLIGENT PROPERTY PLATFORM
    </p>
    <p className="hero-subtitle">
      Three purpose-built AI agents — Receptionist, Maintenance, and Leasing —
      unified into one seamless platform that handles every tenant and prospect interaction,
      across every channel, automatically.
    </p>

    <div className="hero-stats">
      {[{n:3,s:"",label:"AI Agents"},{n:3,s:" Channels",label:"Voice · SMS · Email"},{n:24,s:"/7",label:"Availability"},{n:100,s:"%",label:"Fair Housing Compliant"}].map(({n,s,label},i)=>(
        <div key={i} style={{textAlign:"center"}}>
          <div className="hero-stat-num"><Counter to={n} suffix={s}/></div>
          <div className="hero-stat-label">{label}</div>
        </div>
      ))}
    </div>

    <div className="hero-cta-row">
      <button className="btn-test-main" onClick={onTestClick}>
        <span>📞</span> Test Kindred Live
      </button>
      <button className="btn-secondary" onClick={() => document.getElementById("architecture")?.scrollIntoView({behavior:"smooth"})}>
        View Architecture
      </button>
    </div>

    {/* SUBTLE NUMBER TEASER */}
    <div style={{marginTop:22,opacity:0,animation:"fadeIn 1s 1.3s ease forwards"}}>
      <button onClick={onTestClick}
        style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",
          fontSize:".68rem",letterSpacing:".18em",color:"var(--text2)",display:"flex",
          alignItems:"center",gap:8,transition:"color .2s",padding:0}}
        onMouseEnter={e=>e.currentTarget.style.color="var(--teal)"}
        onMouseLeave={e=>e.currentTarget.style.color="var(--text2)"}>
        <span style={{width:6,height:6,borderRadius:"50%",background:"var(--teal)",display:"inline-block",animation:"dot-live 1.4s ease-in-out infinite"}}/>
        {KINDRED_PHONE_DISPLAY}
        <span style={{fontSize:".58rem",opacity:.55}}>· Live now</span>
      </button>
    </div>

    <div className="hero-scroll">
      <div className="hero-scroll-line"/>
      Scroll to explore
    </div>
  </section>
);

/* ─── AGENT DATA ─────────────────────────────────────────────── */
const AGENTS = {
  receptionist:{
    label:"Receptionist",icon:"📋",color:"#00d4c8",accent:"rgba(0,212,200,.07)",border:"rgba(0,212,200,.28)",
    tagline:"The First Voice of Kindred",
    desc:"Triage, qualify, and route every inbound contact — across voice, SMS, and email — to the right agent instantly.",
    layers:[
      {title:"Entry",     color:"#e8764a",items:["📞 Phone Call","💬 SMS Message","📧 Email"]},
      {title:"Transport", color:"#c9a84c",items:["Telnyx WebSocket","Telnyx SMS Webhook","Gmail API + Pub/Sub"]},
      {title:"Routing",   color:"#00d4c8",items:["Voice: domain='triage'","SMS: dept checks","Email: pattern match"]},
      {title:"Channel",   color:"#9b72ff",items:["AA_channel_voice","AA_channel_sms","AA_channel_email","AA_base (shared)"]},
    ],
    features:[
      {icon:"🔀",label:"Smart Routing",color:"#00d4c8"},
      {icon:"🗂️",label:"Directory Lookup",color:"#c9a84c"},
      {icon:"🔍",label:"Q&A Search",color:"#3dff85"},
      {icon:"🌐",label:"Web Fallback",color:"#9b72ff"},
      {icon:"📞",label:"Call Transfer",color:"#e8764a"},
      {icon:"⚠️",label:"Escalation",color:"#ff4458"},
    ],
    tools:["complete_receptionist_routing()","search_receptionist_questions()","tavily_search()","make_a_note_for_human()","transfer_call()","conclude_call()"],
    models:["gemini-3-flash-preview (SMS/Email)","gemini-live-2.5-flash (Voice)","gemini-2.5-flash-lite (Q&A)"],
  },
  maintenance:{
    label:"Maintenance",icon:"🔧",color:"#3dff85",accent:"rgba(61,255,133,.06)",border:"rgba(61,255,133,.28)",
    tagline:"End-to-End Work Order Intelligence",
    desc:"A 6-stage diagnostic engine that triages, assigns vendors, processes photos, and dispatches work orders automatically.",
    layers:[
      {title:"Entry",        color:"#e8764a",items:["📞 Phone Call","💬 SMS + Photos","📧 Email + Attachments"]},
      {title:"Routing",      color:"#00d4c8",items:["active_dept='maintenance'","Receptionist inline","SMS post-call followup"]},
      {title:"Channel",      color:"#9b72ff",items:["AA_channel_voice (WO_ID)","AA_channel_sms (WO_ID)","AA_channel_email (WO_ID)"]},
      {title:"Stage Machine",color:"#3dff85",items:["greeting → contact_info","work_order_type → vendor","responsibility → triage → done"]},
    ],
    features:[
      {icon:"🔬",label:"6-Stage Diagnosis",color:"#3dff85"},
      {icon:"📸",label:"Photo Analysis",color:"#00d4c8"},
      {icon:"🏢",label:"Vendor Dispatch",color:"#c9a84c"},
      {icon:"⏱️",label:"Auto-Confirm 30s",color:"#9b72ff"},
      {icon:"🔒",label:"Atomic Guard",color:"#ff4458"},
      {icon:"💾",label:"1 DB R/W per Turn",color:"#e8764a"},
    ],
    tools:["diagnose_work_order_type()","diagnose_vendor_category()","diagnose_triage()","confirm_current_issue()","_auto_confirm_ready_issues()","schedule_sms_followup()"],
    models:["gemini-3-flash-preview (SMS/Email)","gemini-live-2.5-flash (Voice)","gemini-2.5-flash (Photos + Vendors)"],
  },
  leasing:{
    label:"Leasing",icon:"🏠",color:"#c9a84c",accent:"rgba(201,168,76,.06)",border:"rgba(201,168,76,.32)",
    tagline:"Fair Housing–Compliant Prospect Conversion",
    desc:"Qualifies prospects, searches properties with LLM intelligence, schedules showings, generates lockbox codes, and follows up automatically.",
    layers:[
      {title:"Entry",       color:"#e8764a",items:["📞 Phone Call","💬 SMS Message","📧 Email"]},
      {title:"Routing",     color:"#00d4c8",items:["active_dept='leasing'","Anequim voice→SMS","Receptionist inline"]},
      {title:"Channel",     color:"#9b72ff",items:["AA_channel_voice","AA_channel_sms","AA_channel_email (crm)"]},
      {title:"Post-Process",color:"#c9a84c",items:["Spam detect + exile","24h/72h/168h followup","Prospect data extract"]},
    ],
    features:[
      {icon:"🏡",label:"LLM Property Search",color:"#c9a84c"},
      {icon:"📅",label:"Calendar Scheduling",color:"#00d4c8"},
      {icon:"🔑",label:"Self-Showing Codes",color:"#e8764a"},
      {icon:"✅",label:"ID Verification",color:"#3dff85"},
      {icon:"⚖️",label:"Fair Housing",color:"#ff4458"},
      {icon:"🔁",label:"Auto Followup",color:"#9b72ff"},
    ],
    tools:["search_entire_properties_and_policies()","calendar_service.create_event()","generate_self_showing_code()","send_verification_link_tool()","check_before_handoff_tool()","postprocess_leasing_conversation()"],
    models:["gemini-3-flash-preview (SMS/Email)","gemini-live-2.5-flash (Voice)","gemini-2.5-flash-lite (Property Search)","gemini-2.5-flash (Postprocess + Spam)"],
  },
};

/* ─── PLATFORM OVERVIEW ──────────────────────────────────────── */
const PlatformOverview = () => (
  <section id="agents" style={{padding:"100px 64px"}}>
    <div className="divider" style={{marginBottom:72}}/>
    <div style={{textAlign:"center",marginBottom:56}}>
      <div className="sec-eyebrow">The Platform</div>
      <h2 className="sec-title">Three Agents. <span className="gold">One Platform.</span></h2>
      <p className="sec-desc" style={{margin:"16px auto 0"}}>
        Kindred orchestrates a multi-channel agent system that handles every inbound contact
        from first ring to resolved work order — with zero human intervention required.
      </p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,maxWidth:1200,margin:"0 auto"}}>
      {Object.entries(AGENTS).map(([key,ag])=>(
        <div key={key} className="card" style={{padding:28,borderColor:ag.border,background:ag.accent}}>
          <div style={{fontSize:"2rem",marginBottom:16}}>{ag.icon}</div>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"1.1rem",fontWeight:700,color:ag.color,marginBottom:8,letterSpacing:".06em"}}>{ag.label} Agent</div>
          <p style={{fontSize:".78rem",lineHeight:1.7,color:"var(--text)",fontWeight:300}}>{ag.desc}</p>
          <div style={{marginTop:20,display:"flex",flexWrap:"wrap",gap:6}}>
            {ag.features.slice(0,3).map(f=>(
              <span key={f.label} className="feature-pill" style={{borderColor:`${f.color}40`,color:f.color,background:`${f.color}0d`}}>
                <span>{f.icon}</span>{f.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ─── CHANNEL SECTION ────────────────────────────────────────── */
const ChannelSection = () => {
  const channels=[
    {icon:"📞",name:"Voice",sub:"Telnyx WebSocket · Bidirectional audio · Gemini Live",color:"#e8764a",features:["Real-time TTS filler audio","SIP header routing","Call transfer & conclude","Post-call SMS followup"]},
    {icon:"💬",name:"SMS / MMS",sub:"Telnyx Webhook · Text + photo URLs · Celery queue",color:"#c9a84c",features:["Photo intake + Gemini Vision","Auto-confirm timer (30s)","Anequim voice→SMS handoff","Active department routing"]},
    {icon:"📧",name:"Email",sub:"Gmail API + Pub/Sub · Attachments · Push notifications",color:"#9b72ff",features:["Pattern match routing","Property URL delivery","Attachment processing","Thread-aware responses"]},
  ];
  return (
    <section style={{padding:"80px 64px",background:"var(--bg1)"}}>
      <div className="divider" style={{marginBottom:64}}/>
      <div style={{textAlign:"center",marginBottom:52}}>
        <div className="sec-eyebrow">Channels</div>
        <h2 className="sec-title">Every Channel. <span className="gold">One Brain.</span></h2>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,maxWidth:1100,margin:"0 auto"}}>
        {channels.map((ch,i)=>(
          <div key={ch.name} className="card" style={{padding:28,borderColor:`${ch.color}30`,opacity:0,animation:`fadeUp .6s ${.1*i}s ease forwards`}}>
            <div style={{fontSize:"2.2rem",marginBottom:14}}>{ch.icon}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:"1rem",fontWeight:700,color:ch.color,letterSpacing:".08em",marginBottom:6}}>{ch.name}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:".58rem",color:"var(--text2)",marginBottom:18,lineHeight:1.6}}>{ch.sub}</div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {ch.features.map(f=>(
                <div key={f} style={{display:"flex",alignItems:"center",gap:8,fontSize:".68rem",color:"var(--text)"}}>
                  <div style={{width:4,height:4,borderRadius:"50%",background:ch.color,flexShrink:0}}/>{f}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── ARCHITECTURE ───────────────────────────────────────────── */
const FlowArrow = ({color="var(--teal)"}) => (
  <div style={{display:"flex",justifyContent:"center",padding:"3px 0",height:26}}>
    <div style={{width:1,height:18,background:`linear-gradient(180deg,${color},transparent)`,position:"relative"}}>
      <div style={{position:"absolute",bottom:-5,left:"50%",transform:"translateX(-50%)",
        borderLeft:"4px solid transparent",borderRight:"4px solid transparent",borderTop:`6px solid ${color}`}}/>
    </div>
  </div>
);

const ArchitectureSection = () => {
  const [tab,setTab] = useState("receptionist");
  const ag = AGENTS[tab];
  return (
    <section id="architecture" style={{padding:"100px 64px"}}>
      <div className="divider" style={{marginBottom:72}}/>
      <div style={{textAlign:"center",marginBottom:48}}>
        <div className="sec-eyebrow">Architecture</div>
        <h2 className="sec-title">Built for <span className="gold">Production Scale</span></h2>
        <p className="sec-desc" style={{margin:"16px auto 0"}}>Each agent runs on Google ADK with Gemini Live, modular channel instances, and purpose-engineered tool suites.</p>
      </div>

      <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:40}}>
        {Object.entries(AGENTS).map(([key,a])=>(
          <button key={key} className={`agent-tab${tab===key?" active":""}`}
            style={tab===key?{borderColor:a.color,color:a.color,background:`${a.color}12`}:{}}
            onClick={()=>setTab(key)}>
            {a.icon} {a.label}
          </button>
        ))}
      </div>

      <div key={tab} style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:"1.35rem",fontWeight:600,color:ag.color,letterSpacing:".06em",opacity:0,animation:"fadeUp .4s ease forwards"}}>{ag.tagline}</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          {/* LAYERS */}
          <div style={{display:"flex",flexDirection:"column",gap:0}}>
            {ag.layers.map((layer,li)=>(
              <div key={layer.title}>
                <div style={{border:`1px solid ${layer.color}26`,borderRadius:8,padding:"14px 16px",background:`${layer.color}05`,opacity:0,animation:`fadeUp .5s ${.1*li}s ease forwards`}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:".55rem",letterSpacing:".18em",textTransform:"uppercase",color:layer.color,marginBottom:10,opacity:.8}}>{layer.title}</div>
                  <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(layer.items.length,3)},1fr)`,gap:6}}>
                    {layer.items.map(item=>(
                      <div key={item} className="arch-node" style={{borderColor:`${layer.color}28`,background:`${layer.color}07`,color:`${layer.color}cc`,fontSize:".59rem",padding:"7px 10px"}}>{item}</div>
                    ))}
                  </div>
                </div>
                {li<ag.layers.length-1 && <FlowArrow color={layer.color}/>}
              </div>
            ))}
          </div>

          {/* RIGHT PANEL */}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{border:`1px solid ${ag.border}`,borderRadius:8,padding:"18px 20px",background:ag.accent}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:ag.color,marginBottom:14}}>Key Capabilities</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {ag.features.map((f,i)=>(
                  <div key={f.label} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:5,border:`1px solid ${f.color}20`,background:`${f.color}07`,opacity:0,animation:`fadeUp .4s ${.06*i}s ease forwards`}}>
                    <span style={{fontSize:"1rem"}}>{f.icon}</span>
                    <span style={{fontSize:".62rem",color:f.color,fontFamily:"'DM Mono',monospace"}}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{border:"1px solid var(--border)",borderRadius:8,padding:"18px 20px",background:"var(--bg1)"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".55rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--text2)",marginBottom:12}}>Tool Suite</div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {ag.tools.map(t=>(
                  <div key={t} style={{fontFamily:"'DM Mono',monospace",fontSize:".59rem",color:"var(--text2)",padding:"5px 10px",borderRadius:4,background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)"}}>
                    <span style={{color:ag.color}}>→</span> {t}
                  </div>
                ))}
              </div>
            </div>

            <div style={{border:"1px solid var(--borderG)",borderRadius:8,padding:"18px 20px",background:"rgba(201,168,76,.03)",display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:"var(--gold)",flexShrink:0}}/>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".62rem",color:"var(--text2)"}}>Google Gemini models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── MODELS SECTION ─────────────────────────────────────────── */
const ModelsSection = () => {
  const models=[
    {name:"Gemini 2.5 Flash Live", role:"Voice Agent", desc:"Bidirectional audio stream with real-time TTS", channels:["📞 Voice"],color:"#e8764a"},
    {name:"Gemini 3 Flash",role:"Text Agent",  desc:"Main agent for SMS + Email with BuiltInPlanner and MEDIUM thinking",channels:["💬 SMS","📧 Email"],color:"#c9a84c"},
  ];
  return (
    <section id="models" style={{padding:"100px 64px"}}>
      <div className="divider" style={{marginBottom:72}}/>
      <div style={{textAlign:"center",marginBottom:56}}>
        <div className="sec-eyebrow">AI Infrastructure</div>
        <h2 className="sec-title">Powered by <span className="gold">Gemini</span></h2>
        <p className="sec-desc" style={{margin:"16px auto 0"}}>The right model for every task, with automatic fallback and retry logic built-in.</p>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",display:"flex",flexDirection:"column",gap:10}}>
        {models.map((m,i)=>(
          <div key={m.name} className="card" style={{padding:"18px 24px",display:"flex",alignItems:"center",gap:20,opacity:0,animation:`fadeUp .5s ${.08*i}s ease forwards`}}>
            <div style={{width:4,height:52,borderRadius:2,background:m.color,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".72rem",color:m.color,fontWeight:500}}>{m.name}</div>
              <div style={{fontSize:".68rem",color:"var(--text)",marginTop:3}}>{m.desc}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:".64rem",color:"var(--text2)",letterSpacing:".1em",textTransform:"uppercase"}}>{m.role}</div>
              <div style={{display:"flex",gap:5,marginTop:6,justifyContent:"flex-end"}}>
                {m.channels.map(c=>(
                  <span key={c} style={{fontFamily:"'DM Mono',monospace",fontSize:".54rem",padding:"2px 8px",borderRadius:12,border:`1px solid ${m.color}35`,color:m.color,background:`${m.color}0d`}}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── CTA SECTION ────────────────────────────────────────────── */
const CTASection = ({ onTestClick }) => (
  <section style={{padding:"100px 64px",textAlign:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(0,212,200,.055) 0%,transparent 65%)",pointerEvents:"none"}}/>
    <div className="divider" style={{marginBottom:72}}/>
    <div className="sec-eyebrow">KindredPM</div>
    <h2 className="sec-title" style={{marginBottom:20}}>Ready to Hear <span className="gold">Kindred?</span></h2>
    <p style={{fontSize:"1rem",fontWeight:300,color:"var(--text)",maxWidth:520,margin:"0 auto 48px",lineHeight:1.75}}>
      Pick up the phone and speak directly with Kindred's AI agents —
      the same system serving real property management clients, right now.
    </p>

    {/* BIG NUMBER DISPLAY */}
    <div style={{margin:"0 auto 36px",padding:"32px 40px",maxWidth:460,border:"1px solid rgba(0,212,200,.22)",borderRadius:14,background:"rgba(0,212,200,.03)",position:"relative",cursor:"pointer"}} onClick={onTestClick}>
      <div style={{position:"absolute",inset:0,borderRadius:14,background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(0,212,200,.06),transparent)",pointerEvents:"none"}}/>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",letterSpacing:".24em",textTransform:"uppercase",color:"var(--text2)",marginBottom:12}}>{KINDRED_PHONE_LABEL}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:"2.5rem",fontWeight:700,color:"var(--teal)",letterSpacing:".06em",animation:"number-glow 2.5s ease-in-out infinite",marginBottom:10}}>{KINDRED_PHONE_DISPLAY}</div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontSize:".62rem",color:"var(--green)",fontFamily:"'DM Mono',monospace",letterSpacing:".12em"}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:"var(--green)",display:"inline-block",animation:"dot-live 1.4s ease-in-out infinite"}}/>
        Agents online · 24/7
      </div>
    </div>

    <div style={{display:"flex",gap:14,justifyContent:"center"}}>
      <button className="btn-test-main" onClick={onTestClick}><span>📞</span> Call Kindred Now</button>
      <button className="btn-secondary">View Docs</button>
    </div>

    <div style={{marginTop:64,display:"flex",justifyContent:"center",gap:48,flexWrap:"wrap"}}>
      {["Fair Housing Compliant","Multi-Client Architecture","Google ADK Native","MongoDB + Celery"].map(badge=>(
        <div key={badge} style={{fontFamily:"'DM Mono',monospace",fontSize:".62rem",letterSpacing:".14em",color:"var(--text2)",display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:5,height:5,borderRadius:"50%",background:"var(--teal)"}}/>{badge}
        </div>
      ))}
    </div>
  </section>
);

/* ─── FOOTER ─────────────────────────────────────────────────── */
const Footer = ({ onTestClick }) => (
  <footer>
    <div>
      <div className="footer-logo">KINDRED PM</div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:".58rem",color:"var(--text2)",marginTop:6,letterSpacing:".12em"}}>
        Intelligent Property Management Platform
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:16}}>
      <button className="btn-test-nav" onClick={onTestClick}><span>📞</span> Test Kindred</button>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:".6rem",color:"var(--text2)",letterSpacing:".1em"}}>© 2025 KindredPM</span>
    </div>
  </footer>
);

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  const [showModal, setShowModal] = useState(false);
  const open  = useCallback(() => setShowModal(true),  []);
  const close = useCallback(() => setShowModal(false), []);

  return (
    <>
      <GlobalStyles/>
      {showModal && <CallModal onClose={close}/>}
      <Nav onTestClick={open}/>
      <main>
        <Hero onTestClick={open}/>
        <PlatformOverview/>
        <ChannelSection/>
        <ArchitectureSection/>
        <ModelsSection/>
        <CTASection onTestClick={open}/>
      </main>
      <Footer onTestClick={open}/>
    </>
  );
}