/* ============================================================
   KAIQUE FONTINY — Portfólio · motor de interação (vanilla JS)
   + Lenis (inércia de scroll, desktop) via CDN — opcional/failsafe
   ============================================================ */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* Trava o scroll JÁ (o preloader cobre a tela; sem isso a página rola
     por trás da cortina e as entradas queimam fora de tela). O unlock
     acontece em startHero() — com failsafes redundantes. */
  document.body.classList.add('is-locked');

  /* ---------- Lenis: inércia de scroll (desktop, sem reduced-motion) ---------- */
  let lenis = null;
  if (!reduce && finePointer && typeof window.Lenis === 'function') {
    try { lenis = new window.Lenis({ autoRaf: true, anchors: true }); } catch (_) { lenis = null; }
  }
  const lockScroll = (on) => {
    document.body.classList.toggle('is-locked', on);
    if (lenis) { if (on) lenis.stop(); else lenis.start(); }
  };
  lockScroll(true);

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
        }
      });
    };
    walk(el);
    // stagger delays + marca o fim da varredura (usado p/ acender o <em> por último)
    const spans = $$('.word > span', el);
    spans.forEach((s, i) => { s.style.transitionDelay = (i * 0.045) + 's'; });
    el.style.setProperty('--em-delay', (0.35 + spans.length * 0.045).toFixed(2) + 's');
  }
  $$('[data-split]').forEach(splitWords);

  /* ============================================================
     ROLLING LABELS — texto que rola p/ cima no hover (links)
     ============================================================ */
  $$('.nav__link:not(.nav__cta), .footer__col a, .work__link').forEach((el) => {
    if (el.children.length) return; // só links de texto puro
    const t = el.textContent.trim();
    el.classList.add('roll');
    el.textContent = '';
    const mk = (hidden) => {
      const s = document.createElement('span');
      s.className = 'roll__t'; s.textContent = t;
      if (hidden) s.setAttribute('aria-hidden', 'true');
      return s;
    };
    el.append(mk(false), mk(true));
  });

  /* ============================================================
     HERO title lines
     ============================================================ */
  const heroLines = $$('[data-split-line]');
  // reveals do hero são gateados: só entram DEPOIS que a cortina sobe
  const heroReveals = $$('.hero .reveal, .hero .reveal-soft');

  /* ============================================================
     PRELOADER — progresso real (retrato + fontes), relay p/ o hero
     ============================================================ */
  const pre = $('#preloader');
  const veil = $('.preloader-veil');
  const preCount = $('#preCount');
  const preBar = $('.preloader__bar i');
  const preName = $('.preloader__name span');
  const preMeta = $('.preloader__meta');
  const heroImg = $('.hero__portrait img');

  let seen = false;
  try { seen = sessionStorage.getItem('kf-seen') === '1'; sessionStorage.setItem('kf-seen', '1'); } catch (_) {}

  let preRan = false, preEnded = false;

  function startHero() {
    // relay: cortina sobe (t=0) → nome sobe das máscaras → retrato → textos
    heroLines.forEach((l, i) => {
      setTimeout(() => {
        l.style.transition = 'transform 1.1s cubic-bezier(0.16,1,0.3,1)';
        l.style.transform = 'none';
      }, 350 + i * 130);
    });
    const hp = $('.hero__portrait');
    if (hp) setTimeout(() => hp.classList.add('in'), 600);
    setTimeout(() => { lockScroll(false); }, 650);
    setTimeout(() => { heroReveals.forEach((el) => el.classList.add('in')); }, 750);
  }

  // Idempotent exit — always unlocks the page and hides the overlay,
  // even if requestAnimationFrame is throttled (e.g. background tab).
  function endPreloader() {
    if (preEnded) return;
    preEnded = true;
    pre?.classList.add('done');
    veil?.classList.add('done');
    startHero();
    // failsafe extra de unlock, mesmo se algum timeout do relay falhar
    setTimeout(() => lockScroll(false), 1400);
    setTimeout(() => { if (pre) pre.style.display = 'none'; if (veil) veil.style.display = 'none'; }, 1600);
  }

  function runPreloader() {
    if (preRan) return;
    preRan = true;
    if (reduce || !pre) {
      if (pre) pre.style.display = 'none';
      if (veil) veil.style.display = 'none';
      lockScroll(false);
      // sem motion: tudo já está visível via CSS; só garante o retrato
      $('.hero__portrait')?.classList.add('in');
      heroReveals.forEach((el) => el.classList.add('in'));
      heroLines.forEach((l) => { l.style.transform = 'none'; });
      return;
    }
    requestAnimationFrame(() => {
      preName.style.transition = 'transform 1s cubic-bezier(0.16,1,0.3,1)';
      preName.style.transform = 'translateY(0)';
      preMeta.style.transition = 'opacity 1s ease 0.3s';
      preMeta.style.opacity = '1';
    });

    /* progresso dirigido pelo carregamento REAL: o contador só fecha quando
       o retrato do hero decodificou — a cortina nunca revela caixa cinza.
       Revisita na mesma sessão: versão rápida. */
    let target = seen ? 60 : 8;
    const bump = (v) => { target = Math.min(100, target + v); };
    if (heroImg && heroImg.decode) heroImg.decode().then(() => bump(52), () => bump(52));
    else bump(52);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => bump(25));
    setTimeout(() => bump(15), seen ? 120 : 700); // ritmo mínimo

    let shown = 0;
    const tick = () => {
      shown += (target - shown) * (seen ? 0.22 : 0.09);
      const v = Math.min(100, Math.round(shown));
      preCount.textContent = v;
      preBar.style.transform = 'scaleX(' + (v / 100) + ')';
      if (v >= 100) { setTimeout(endPreloader, 180); return; }
      requestAnimationFrame(tick);
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
     · hero fica de fora: entra pelo relay do startHero()
     ============================================================ */
  const revealEls = $$('.reveal, .reveal-soft, .line-mask, .wipe, .split, .pf__item, .vids__item, .contact')
    .filter((el) => !heroReveals.includes(el));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach((el) => io.observe(el));

  // Backstop: never leave an in-view element hidden if the observer misses it
  // (fast scroll, tall elements taller than the viewport, etc.).
  let backstopTick = false;
  function revealInView() {
    if (backstopTick) return;
    backstopTick = true;
    requestAnimationFrame(() => {
      backstopTick = false;
      for (const el of revealEls) {
        if (el.classList.contains('in')) continue;
        const r = el.getBoundingClientRect();
        // alinhado ao rootMargin de -5% do IO
        if (r.top < window.innerHeight * 0.95 && r.bottom > 0) { el.classList.add('in'); io.unobserve(el); }
      }
    });
  }
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView);
  setTimeout(revealInView, 300);

  /* ============================================================
     CUSTOM CURSOR — contextual (blend difference no CSS)
     · escala por lerp no rAF (nunca width/height)
     · label vem de [data-cursor-label] e pode mudar ao vivo (vídeos)
     ============================================================ */
  let cursorSync = null; // exposto p/ os vídeos atualizarem o label ao vivo
  if (finePointer && !reduce) {
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    const clabel = $('.clabel', ring);
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let cs = 0.55, csT = 0.55; // escala atual/alvo do anel
    let hoverEl = null;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      cs += (csT - cs) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%) scale(${cs.toFixed(3)})`;
      requestAnimationFrame(loop);
    };
    loop();

    const setState = (el) => {
      hoverEl = el;
      const label = el ? el.getAttribute('data-cursor-label') : null;
      if (label) {
        clabel.textContent = label;
        ring.classList.add('grow', 'media');
        csT = 1.75;
      } else if (el) {
        ring.classList.add('grow');
        ring.classList.remove('media');
        csT = 1.05;
      } else {
        ring.classList.remove('grow', 'media');
        csT = 0.55;
      }
    };
    $$('a, button, [data-cursor], [data-magnetic]').forEach((el) => {
      el.addEventListener('mouseenter', () => setState(el));
      el.addEventListener('mouseleave', () => setState(null));
    });
    cursorSync = {
      refresh(el) { if (hoverEl === el) setState(el); },
    };
  } else {
    $('.cursor-dot')?.style.setProperty('display', 'none');
    $('.cursor-ring')?.style.setProperty('display', 'none');
  }

  /* ============================================================
     MAGNETIC elements — retorno elástico (nada de teleporte)
     ============================================================ */
  if (finePointer && !reduce) {
    $$('[data-magnetic]').forEach((el) => {
      const strength = 0.34;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transition = 'transform .18s cubic-bezier(.3,1,.7,1)';
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => {
        // volta com overshoot sutil — material com peso
        el.style.transition = 'transform .55s cubic-bezier(.22,1.4,.36,1)';
        el.style.transform = 'translate(0px, 0px)';
      });
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
    lockScroll(open);
  });
  $$('.nav__menu a').forEach((a) => a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    nav.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    lockScroll(false);
  }));

  /* ============================================================
     PARALLAX (transform only, rAF-throttled)
     · [data-parallax] — elementos soltos (retrato do hero)
     · [data-pfpar]   — parallax INTERNO das imagens dos projetos
     ============================================================ */
  const pxEls = $$('[data-parallax]');
  const pfPars = $$('[data-pfpar]');
  if (!reduce && (pxEls.length || pfPars.length)) {
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
      pfPars.forEach((par) => {
        const media = par.parentElement;
        const r = media.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) return; // culling: fora de tela
        const center = r.top + r.height / 2;
        let rel = (center - vh / 2) / ((vh + r.height) / 2); // -1..1 na travessia
        rel = Math.max(-1, Math.min(1, rel));
        par.style.transform = `translate3d(0, ${(rel * 4).toFixed(3)}%, 0)`; // headroom de 5.5% no CSS
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
     MARQUEE — motor rAF com inércia de gesto
     · rolou rápido → a fita acelera junto e assenta (~1s de decay)
     · hover → desacelera suave (não pausa seca)
     ============================================================ */
  $$('[data-marquee]').forEach((track) => {
    const baseHTML = track.innerHTML;
    let copies = 1;
    const oneSet = track.scrollWidth;
    // duplica até cobrir viewport + 1 set (ultrawide incluído)
    while (oneSet > 0 && track.scrollWidth < window.innerWidth + oneSet && copies < 12) {
      track.innerHTML += baseHTML; copies++;
    }
    if (copies < 2) { track.innerHTML += baseHTML; copies++; }
    if (reduce) return; // fica com a animação CSS (globalmente desligada pelo media query)

    track.classList.add('marquee--js');
    let setW = track.scrollWidth / copies;
    let x = 0, speed = 0.9, boost = 0, hover = false, lastScrollY = window.scrollY;
    const marquee = track.closest('.marquee');
    marquee?.addEventListener('mouseenter', () => { hover = true; });
    marquee?.addEventListener('mouseleave', () => { hover = false; });
    window.addEventListener('scroll', () => {
      const d = window.scrollY - lastScrollY; lastScrollY = window.scrollY;
      boost = Math.min(boost + Math.abs(d) * 0.03, 9);
    }, { passive: true });
    window.addEventListener('resize', () => { setW = track.scrollWidth / copies; });
    const step = () => {
      const target = hover ? 0.18 : 0.9;
      speed += (target - speed) * 0.06;
      boost *= 0.93;
      x -= (speed + boost);
      if (setW > 0) { while (x <= -setW) x += setW; }
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  /* ============================================================
     FEATURED VIDEOS — empilhados, autoplay em tela, som no clique
     · acessível: role=button, Enter/Espaço, aria-pressed
     · respeita economia de dados (sem autoplay com saveData)
     · label do cursor e chip equalizer refletem o estado
     ============================================================ */
  const videos = $$('[data-video]');
  if (videos.length) {
    const saveData = !!(navigator.connection && navigator.connection.saveData);

    const setSound = (v, frame, on) => {
      v.muted = !on;
      frame.classList.toggle('snd', on);
      frame.setAttribute('aria-pressed', on ? 'true' : 'false');
      frame.setAttribute('data-cursor-label', on ? 'mudo' : 'som');
      if (cursorSync) cursorSync.refresh(frame);
    };

    if (!reduce && !saveData) {
      const vObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.play().catch(() => {}); }
          else { e.target.pause(); }
        });
      }, { threshold: 0.4 });
      videos.forEach((v) => vObs.observe(v));
    }

    videos.forEach((v) => {
      const frame = v.closest('.vids__frame');
      if (!frame) return;
      const progress = $('.vids__progress', frame);

      const toggle = () => {
        const willUnmute = v.muted;
        if (willUnmute) {
          // só um vídeo com som por vez — muta os demais sem mexer no playback deles
          videos.forEach((o) => {
            if (o === v) return;
            const of = o.closest('.vids__frame');
            if (of) setSound(o, of, false);
          });
        }
        setSound(v, frame, willUnmute);
        v.play().catch(() => {});
      };
      frame.addEventListener('click', toggle);
      frame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });

      if (progress) {
        v.addEventListener('timeupdate', () => {
          const p = v.duration ? v.currentTime / v.duration : 0;
          progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
        });
      }
    });
  }

  /* ============================================================
     THEME-COLOR — a moldura do navegador escurece junto com o
     contato/rodapé (sensação de app no fechamento)
     ============================================================ */
  const themeMeta = $('#themeColor');
  if (themeMeta) {
    const darkSections = $$('.contact, .footer');
    const visible = new Set();
    const tObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
      themeMeta.setAttribute('content', visible.size ? '#0E0D0A' : '#FFFEFE');
    }, { threshold: 0.2 });
    darkSections.forEach((el) => tObs.observe(el));
  }

  /* ============================================================
     Smooth anchor + back to top
     (âncoras: o Lenis intercepta sozinho com { anchors: true })
     ============================================================ */
  $('#toTop')?.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

})();
