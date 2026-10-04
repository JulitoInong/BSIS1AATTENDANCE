(() => {
  const standalone = window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
  const sameAppReferrer = document.referrer
    && new URL(document.referrer).origin === window.location.origin;
  if (!standalone || sameAppReferrer) return;

  const startedAt = performance.now();
  const style = document.createElement("style");
  style.textContent = `
    .app-splash{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:24px;background:radial-gradient(ellipse at 50% 34%,rgba(64,131,208,.34),transparent 42%),linear-gradient(145deg,#0b1830,#142d52 58%,#0d5268);color:#f8fbff;opacity:1;visibility:visible;transition:opacity .3s ease,visibility .3s ease}
    .app-splash.is-leaving{opacity:0;visibility:hidden;pointer-events:none}
    .app-splash-card{display:grid;justify-items:center;text-align:center;animation:splash-arrive .55s cubic-bezier(.2,.75,.25,1) both}
    .app-splash-logo{width:104px;height:104px;object-fit:cover;border:3px solid rgba(255,255,255,.92);border-radius:50%;box-shadow:0 12px 36px rgba(0,0,0,.3),0 0 0 8px rgba(255,255,255,.1)}
    .app-splash-title{margin:23px 0 0;font:800 22px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:.01em}
    .app-splash-subtitle{margin:7px 0 0;color:#cbd9eb;font:500 13px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
    .app-splash-loader{position:relative;width:150px;height:4px;margin-top:27px;overflow:hidden;border-radius:9px;background:rgba(255,255,255,.2)}
    .app-splash-loader::after{position:absolute;inset:0;width:42%;border-radius:inherit;background:linear-gradient(90deg,#58c4ff,#fff);content:"";animation:splash-loading 1.05s ease-in-out infinite}
    .app-splash[hidden]{display:none}
    @keyframes splash-arrive{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes splash-loading{from{transform:translateX(-110%)}to{transform:translateX(250%)}}
    @media(prefers-reduced-motion:reduce){.app-splash,.app-splash-card{animation:none!important;transition:none!important}.app-splash-loader::after{animation:none!important;width:100%;opacity:.7}}
  `;
  document.head.append(style);

  const splash = document.createElement("div");
  splash.className = "app-splash";
  splash.setAttribute("role", "status");
  splash.setAttribute("aria-live", "polite");
  splash.innerHTML = '<div class="app-splash-card"><img class="app-splash-logo" src="./ChatGPT%20Image%20Aug%209,%202026,%2004_55_02%20PM.png" alt="BSIS 1-A class logo"><p class="app-splash-title">BSIS 1-A</p><p class="app-splash-subtitle">Preparing your attendance</p><div class="app-splash-loader" aria-hidden="true"></div></div>';
  document.documentElement.append(splash);

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    const remaining = Math.max(0, 650 - (performance.now() - startedAt));
    setTimeout(() => {
      splash.classList.add("is-leaving");
      setTimeout(() => splash.remove(), 350);
    }, remaining);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", dismiss, { once: true });
  } else {
    dismiss();
  }
  window.addEventListener("load", dismiss, { once: true });
  setTimeout(dismiss, 2200);
})();
