/* ============================================================
   KAIQUE FONTINY — Portfólio · motor de interação (vanilla JS)
   ============================================================ */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Year ---------- */
  const yearEl = $('#year');
  // keep static 2026 unless clearly later; harmless if left as-is

  /* ============================================================
     SPLIT TEXT — wrap words in masked spans
     ============================================================ */
  function splitWords(el) {
    const walk = (node) => {
      const kids = Array.from(node.childNodes);
      kids.forEach((n) => {
        if (n.nodeType === 3) { // text
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((tok) => {
            if (tok.trim() === '') { frag.appendChild(document.createTextNode(tok)); return; }
            const w = document.createElement('span'); w.className = 'word';
            const inner = document.createElement('span'); inner.textContent = tok;
            w.appendChild(inner); frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && !n.classList.contains('word')) {
          // wrap element content but keep element (e.g. <em>)
          walk(n);
          // also wrap the element itself so its transform staggers
        }
      });
    };
    walk(el);
    // stagger delays
    $$('.word > span', el).forEach((s, i) => { s.style.transitionDelay = (i * 0.045) + 's'; });
  }
  $$('[data-split]').forEach(splitWords);

  /* ============================================================
     HERO title lines reveal
     ============================================================ */
  const heroLines = $$('[data-split-line]');

  /* ============================================================
     PRELOADER
     ============================================================ */
  const pre = $('#preloader');
  const preCount = $('#preCount');
  const preBar = $('.preloader__bar i');
  const preName = $('.preloader__name span');
  const preMeta = $('.preloader__meta');

  let preRan = false, preEnded = false;

  function startHero() {
    document.body.classList.remove('is-locked');
    // dramatic hero photo entrance (clip-path wipe + zoom-out)
    const hp = $('.hero__portrait');
    if (hp) requestAnimationFrame(() => hp.classList.add('in'));
    // reveal hero name lines
    heroLines.forEach((l, i) => {
      setTimeout(() => { l.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1)'; l.style.transform = 'none'; }, 220 + i * 130);
    });
  }

  // Idempotent exit — always unlocks the page and hides the overlay,
  // even if requestAnimationFrame is throttled (e.g. background tab).
  function endPreloader() {
    if (preEnded) return;
    preEnded = true;
    pre.classList.add('done');
    startHero();
    setTimeout(() => { pre.style.display = 'none'; }, 1100);
  }

  function runPreloader() {
    if (preRan) return;
    preRan = true;
    if (reduce) { pre.style.display = 'none'; document.body.classList.remove('is-locked'); startHero(); return; }
    requestAnimationFrame(() => {
      preName.style.transition = 'transform 1s cubic-bezier(0.16,1,0.3,1)';
      preName.style.transform = 'translateY(0)';
      preMeta.style.transition = 'opacity 1s ease 0.3s';
      preMeta.style.opacity = '1';
    });
    const dur = 1500, t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      preCount.textContent = Math.round(eased * 100);
      preBar.style.transform = 'scaleX(' + eased + ')';
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(endPreloader, 260);
    };
    requestAnimationFrame(tick);
    // Hard safety: guarantee the page unlocks even if rAF never advances.
    setTimeout(endPreloader, 4200);
  }

  window.addEventListener('load', runPreloader);
  if (document.readyState === 'complete') runPreloader();
  // Failsafe: never leave the page hidden if the load event is missed.
  setTimeout(() => { if (!preRan) runPreloader(); }, 3000);

  /* ============================================================
     REVEAL on scroll (IntersectionObserver)
     ============================================================ */
  const revealEls = $$('.reveal, .line-mask, .wipe, .split');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach((el) => io.observe(el));

  // Backstop: never leave an in-view element hidden if the observer misses it
  // (fast scroll, tall elements taller than the viewport, etc.).
  function revealInView() {
    for (const el of revealEls) {
      if (el.classList.contains('in')) continue;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { el.classList.add('in'); io.unobserve(el); }
    }
  }
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView);
  setTimeout(revealInView, 200);

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  if (finePointer && !reduce) {
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    const grow = () => ring.classList.add('grow');
    const shrink = () => ring.classList.remove('grow');
    $$('a, button, [data-cursor], [data-magnetic]').forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });
  } else {
    $('.cursor-dot')?.style.setProperty('display', 'none');
    $('.cursor-ring')?.style.setProperty('display', 'none');
  }

  /* ============================================================
     MAGNETIC elements
     ============================================================ */
  if (finePointer && !reduce) {
    $$('[data-magnetic]').forEach((el) => {
      const strength = 0.34;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ============================================================
     NAV — hide on scroll down, burger, scrolled state
     ============================================================ */
  const nav = $('#nav');
  const burger = $('#burger');
  const navMenu = $('#navMenu');
  const heroEl = $('.hero');
  let lastY = 0;
  let heroBottom = heroEl ? heroEl.offsetHeight : window.innerHeight;
  const measureHero = () => { heroBottom = heroEl ? heroEl.offsetHeight : window.innerHeight; };
  window.addEventListener('resize', measureHero);
  const onScroll = () => {
    const y = window.scrollY;
    if (y > 60) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    // switch nav to solid (dark text over light) once past the hero photo
    if (y > heroBottom - 90) nav.classList.add('nav--solid'); else nav.classList.remove('nav--solid');
    if (!nav.classList.contains('menu-open')) {
      if (y > lastY && y > 260) nav.classList.add('hidden');
      else nav.classList.remove('hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  burger?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('is-locked', open);
  });
  $$('.nav__menu a').forEach((a) => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    nav.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }));

  /* ============================================================
     PARALLAX (transform only, rAF-throttled)
     ============================================================ */
  const pxEls = $$('[data-parallax]');
  if (!reduce && pxEls.length) {
    let ticking = false;
    const apply = () => {
      const vh = window.innerHeight;
      pxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const rel = (center - vh / 2) / vh; // -1..1
        const speed = parseFloat(el.dataset.parallax) || -6;
        el.style.transform = `translate3d(0, ${rel * speed}%, 0)`;
      });
      ticking = false;
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    apply();
  }

  /* ============================================================
     COUNTERS
     ============================================================ */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const pad = parseInt(el.dataset.pad || '0', 10);
    const fmt = (v) => (pad ? String(v).padStart(pad, '0') : String(v));
    if (reduce) { el.textContent = fmt(target); return; }
    const dur = 1600, t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target); // guarantee the exact final value
    };
    requestAnimationFrame(step);
  };
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { cObs.unobserve(e.target); runCounter(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  counters.forEach((c) => cObs.observe(c));
  // Backstop so a counter never gets stuck showing 0 when scrolled past quickly.
  function counterInView() {
    for (const el of counters) {
      if (el.dataset.done) continue;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) { cObs.unobserve(el); runCounter(el); }
    }
  }
  window.addEventListener('scroll', counterInView, { passive: true });
  setTimeout(counterInView, 200);

  /* ============================================================
     MARQUEE — duplicate track for seamless loop
     ============================================================ */
  $$('[data-marquee]').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ============================================================
     FEATURED VIDEOS — vídeos grandes empilhados (um abaixo do outro)
     · autoplay mudo quando entram em tela; clique liga/desliga o som
     · só um vídeo com som por vez
     ============================================================ */
  const videos = $$('[data-video]');
  if (videos.length) {
    const vObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (reduce) return;
        if (e.isIntersecting) { e.target.play().catch(() => {}); }
        else { e.target.pause(); }
      });
    }, { threshold: 0.4 });

    videos.forEach((v) => {
      vObs.observe(v);
      const frame = v.closest('.vids__frame');
      frame?.addEventListener('click', () => {
        const willUnmute = v.muted;
        if (willUnmute) {
          videos.forEach((o) => {
            if (o !== v) { o.muted = true; o.closest('.vids__frame')?.classList.remove('snd'); }
          });
        }
        v.muted = !willUnmute;
        frame.classList.toggle('snd', !v.muted);
        v.play().catch(() => {});
      });
    });
  }

  /* ============================================================
     Smooth anchor + back to top
     ============================================================ */
  $('#toTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

})();
