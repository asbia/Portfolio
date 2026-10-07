(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || params.has('reduce');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const EMAIL = 'sbia.aya@gmail.com';
  const COLORS = { blue: '#1F4FCB', orange: '#F2480E', ink: '#18201D' };

  gsap.registerPlugin(ScrollTrigger);

  // smooth scroll
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollToEl = (target, immediate = false) => {
    const y = target === 0 ? 0 : target;
    if (lenis) lenis.scrollTo(y, { immediate, force: true, duration: 1.2 });
    else if (y === 0) window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  };

  // toast
  const toastEl = $('#toast');
  let toastTimer;
  const toast = msg => {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
  };

  // helpers
  const splitWords = el => {
    const words = el.textContent.trim().split(/ +/);
    el.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');
    return $$('.w', el);
  };

  // intro
  const intro = () => {
    const tl = gsap.timeline();
    tl.from('.hero__title .line > span', { yPercent: 140, duration: 1.1, stagger: 0.12, ease: 'expo.out' })
      .from('.hero .reveal-up', { y: 30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, '-=0.8')
      .from('.win', { scale: 0.85, opacity: 0, transformOrigin: '50% 100%', duration: 1.1, ease: 'expo.out' }, 0)
      .from('.win__bars path', { opacity: 0, duration: 0.6, stagger: 0.06 }, 0.3)
      .fromTo('.stems path', { strokeDasharray: 700, strokeDashoffset: 700 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0.4)
      .from('.leaves use', { scale: 0, transformOrigin: '0% 50%', duration: 0.6, stagger: 0.03, ease: 'back.out(2)' }, 0.8)
      .from('.fruit', { scale: 0, transformOrigin: '50% 50%', duration: 0.7, stagger: 0.07, ease: 'back.out(2.4)' }, 1.0)
      .from('.vase', { y: 260, duration: 1, ease: 'expo.out' }, 0.3)
      .from('.cat', { y: 300, duration: 1.2, ease: 'expo.out' }, 0.6)
      .from('.scroll-hint', { opacity: 0, duration: 0.6 }, 1.2)
      .add(() => { startIdle(); ScrollTrigger.refresh(); });
    return tl;
  };

  const finishLoading = () => {
    document.body.classList.remove('is-loading');
    if (lenis) lenis.start();
  };

  const runLoader = () => {
    const loader = $('.loader');
    if (reduce || params.has('nointro')) {
      loader.remove();
      finishLoading();
      if (!reduce) intro(); else startIdle();
      return;
    }
    const count = $('.loader__count span');
    const n = { v: 0 };
    const tl = gsap.timeline();
    tl.from('.loader .logo__sq', { scaleY: 0, transformOrigin: '50% 100%', duration: 0.7, ease: 'expo.out' })
      .from('.loader .logo__dot', { scale: 0, duration: 0.6, ease: 'back.out(3)' }, '-=0.3')
      .from('.loader .logo__a', { y: 80, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.4')
      .to(n, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(n.v)) }, 0)
      .to('.loader__inner', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.15')
      .to('.loader__panes span', {
        yPercent: -100, duration: 0.9, ease: 'expo.inOut',
        stagger: { each: 0.06, from: 'center' }
      }, '-=0.15')
      .add(() => { finishLoading(); intro(); }, '-=0.55')
      .add(() => loader.remove());
  };

  // cursor + magnetic
  const cursor = $('.cursor');
  const label = $('.cursor__label');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  if (finePointer) {
    const cx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const cy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; cx(e.clientX); cy(e.clientY); });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, input, label');
      cursor.classList.toggle('is-big', !!t);
      cursor.classList.toggle('is-link', !t && !!link);
      label.textContent = t ? t.dataset.cursor : '';
    });
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('pointerenter', () => cursor.classList.remove('is-hidden'));

    $$('.magnetic').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  } else {
    cursor.remove();
  }

  // hero
  const hero = $('.hero');
  const scene = $('#scene');
  let heroProgress = 0;

  // cat eyes follow the cursor
  const pupils = $$('.pupil').map(p => ({ el: p, svg: p.ownerSVGElement, cx: +p.getAttribute('cx'), cy: +p.getAttribute('cy') }));
  const followEyes = () => {
    pupils.forEach(p => {
      const m = p.svg.getScreenCTM();
      if (!m) return;
      const ex = m.a * p.cx + m.e, ey = m.d * p.cy + m.f;
      const a = Math.atan2(mouse.y - ey, mouse.x - ex);
      const d = Math.min(1, Math.hypot(mouse.x - ex, mouse.y - ey) / 300);
      gsap.to(p.el, { x: Math.cos(a) * 4.5 * d, y: Math.sin(a) * 2.5 * d, duration: 0.3, overwrite: 'auto' });
    });
  };

  const startIdle = () => {
    if (reduce) return;
    gsap.to('.tree', { rotation: 1.4, svgOrigin: '160 596', duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    $$('.fruit').forEach((f, i) => {
      f._bob = gsap.to(f, { y: -6, duration: 1.6 + i * 0.17, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.2 });
    });
    // blink
    const blink = () => {
      gsap.timeline({ onComplete: () => gsap.delayedCall(2 + Math.random() * 3, blink) })
        .to('.cat__head path:not(:first-child), .cat__head .pupil', { scaleY: 0.1, transformOrigin: '50% 50%', duration: 0.08 })
        .to('.cat__head path:not(:first-child), .cat__head .pupil', { scaleY: 1, duration: 0.12 });
    };
    gsap.delayedCall(2, blink);

    if (finePointer) {
      const layers = $$('.px', scene).map(el => ({
        el, d: +el.dataset.depth,
        x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' })
      }));
      addEventListener('pointermove', () => {
        followEyes();
        if (heroProgress > 0.02) return;
        const nx = mouse.x / innerWidth - 0.5, ny = mouse.y / innerHeight - 0.5;
        layers.forEach(l => { l.x(nx * l.d); l.y(ny * l.d * 0.5); });
      });
    }
  };

  // click an orange / the cat
  $$('.fruit').forEach(f => {
    f.addEventListener('click', () => {
      if (f._busy || reduce) return;
      f._busy = true;
      f._bob && f._bob.pause();
      const fall = 780 - +f.getAttribute('y');
      gsap.timeline({ onComplete: () => { f._busy = false; f._bob && f._bob.restart(true); } })
        .to(f, { y: fall, duration: 0.9, ease: 'bounce.out' })
        .to(f, { x: () => gsap.utils.random(-120, 120), rotation: () => gsap.utils.random(-360, 360), duration: 0.8, ease: 'power2.out' }, '-=0.3')
        .to(f, { opacity: 0, scale: 0.4, duration: 0.3, transformOrigin: '50% 50%' }, '+=0.6')
        .set(f, { x: 0, y: 0, rotation: 0 })
        .to(f, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(3)' });
    });
  });
  const meows = ['Meow.', 'Purr…', 'The cat approves of your taste in portfolios.', 'Mrrp?'];
  let meowI = 0;
  $('.cat').addEventListener('click', () => {
    toast(meows[meowI++ % meows.length]);
    if (!reduce) gsap.fromTo('.cat__head', { rotation: 0 }, { rotation: 8, svgOrigin: '465 560', duration: 0.18, yoyo: true, repeat: 3, ease: 'sine.inOut' });
  });

  // greeting
  const greetWords = $$('.greet__word');
  let gi = 0;
  setInterval(() => {
    if (document.hidden) return;
    const cur = greetWords[gi];
    gi = (gi + 1) % greetWords.length;
    const next = greetWords[gi];
    cur.classList.remove('is-active'); cur.classList.add('is-leaving');
    next.classList.remove('is-leaving'); next.classList.add('is-active');
    setTimeout(() => cur.classList.remove('is-leaving'), 850);
  }, 2600);

  // scroll (pins first so the other triggers get the right offsets)
  const header = $('.header');
  const darkZones = new Set();
  let heroLight = false;
  const paintHeader = () => header.classList.toggle('header--light', darkZones.size > 0 || heroLight);
  const mm = gsap.matchMedia();

  // desktop only
  mm.add('(min-width: 901px)', () => {
    if (reduce) return;

    // hero -> about: window grows to fill the screen
    const portal = $('.portal');
    const winShape = $('#winShape');
    const archClip = () => {
      const h = hero.getBoundingClientRect();
      const r = winShape.getBoundingClientRect();
      const R = r.width / 2;
      return `inset(${r.top - h.top}px ${h.right - r.right}px ${h.bottom - r.bottom}px ${r.left - h.left}px round ${R}px ${R}px 0px 0px)`;
    };
    const portalTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero, start: 'top top', end: '+=130%', pin: true, scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: self => { heroProgress = self.progress; heroLight = self.isActive && self.progress > 0.55; paintHeader(); },
        onToggle: self => { heroLight = self.isActive && self.progress > 0.55; paintHeader(); }
      }
    });
    portalTl
      .to('.hero__copy', { y: -120, opacity: 0, ease: 'power2.in', duration: 0.4 }, 0)
      .to('.hero__caption, .hero__more, .scroll-hint', { opacity: 0, duration: 0.15 }, 0)
      .to('.cat', { x: 260, y: 40, rotation: 8, svgOrigin: '470 820', duration: 0.45, ease: 'power2.in' }, 0)
      .to('.vase', { x: -260, rotation: -12, svgOrigin: '160 820', duration: 0.45, ease: 'power2.in' }, 0)
      .to('.fruits', { y: -500, duration: 0.45, ease: 'power2.in' }, 0)
      .to('.stems, .leaves', { opacity: 0, y: -120, duration: 0.4 }, 0)
      .to('.win__bars', { opacity: 0, duration: 0.2 }, 0.25)
      .set(portal, { visibility: 'visible' }, 0.42)
      .fromTo(portal, { clipPath: archClip }, { clipPath: 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)', ease: 'power2.inOut', duration: 0.58 }, 0.42);

    // experience: horizontal scroll + dog
    const track = $('.exp__track');
    const dog = $('.walk__dog');
    const walk = $('.walk');
    const legs = { b1: $('.leg--b1'), b2: $('.leg--b2'), f1: $('.leg--f1'), f2: $('.leg--f2') };
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    let lastP = 0;
    const hTween = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        trigger: '.exp__pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const p = self.progress;
          const maxX = walk.clientWidth - dog.clientWidth;
          const dir = p >= lastP ? 1 : -1;
          lastP = p;
          gsap.set(dog, { x: p * maxX, scaleX: dir });
          const phase = p * 70;
          const swing = 17 * Math.sin(phase);
          gsap.set(legs.b1, { rotation: swing }); gsap.set(legs.f2, { rotation: swing });
          gsap.set(legs.b2, { rotation: -swing }); gsap.set(legs.f1, { rotation: -swing });
          gsap.set('.dog', { y: Math.abs(Math.sin(phase)) * -3 });
        }
      }
    });
    $$('.job', track).forEach(job => {
      gsap.from(job, {
        y: 120, rotation: 5, opacity: 0.3, transformOrigin: '0% 100%', ease: 'power2.out',
        scrollTrigger: { trigger: job, containerAnimation: hTween, start: 'left 100%', end: 'left 65%', scrub: true }
      });
    });
    gsap.to('.dog__tail', { rotation: 18, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.dog__ear', { rotation: 6, duration: 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });

    return () => gsap.set(portal, { clearProps: 'all' });
  });

  if (!reduce) {
    $$('.h2').forEach(h => {
      gsap.from(h, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
    });
    $$('.label').forEach(l => {
      gsap.from(l, { x: -30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: l, start: 'top 90%' } });
    });

    // about
    const words = splitWords($('.about__statement'));
    gsap.to(words, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 40%', scrub: true }
    });
    gsap.from('.about__now li', { x: -40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.about__now', start: 'top 80%' } });
    gsap.from('.stat', {
      y: 80, rotation: i => (i % 2 ? 4 : -4), opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out',
      scrollTrigger: { trigger: '.stats', start: 'top 85%' }
    });

    // falling oranges
    $$('.tumble svg').forEach((o, i) => {
      gsap.fromTo(o, { y: -200 - i * 40, rotation: -240, x: (i - 1) * -60 }, {
        y: 0, x: 0, rotation: 0, ease: 'bounce.out',
        scrollTrigger: { trigger: '.about', start: 'bottom 88%', end: 'bottom 50%', scrub: 0.5 }
      });
    });

    gsap.from('.row', { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.rows', start: 'top 80%' } });

    // education
    $$('.school').forEach((s, i) => {
      const arch = $('.school__arch', s);
      gsap.fromTo(arch, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut', delay: i * 0.12,
        scrollTrigger: { trigger: s, start: 'top 85%' }
      });
      gsap.from($('svg', arch), { yPercent: 30, scale: 1.2, duration: 1.6, ease: 'expo.out', delay: 0.2 + i * 0.12, scrollTrigger: { trigger: s, start: 'top 85%' } });
      gsap.from($$('h3, p', s), { y: 20, opacity: 0, stagger: 0.05, duration: 0.7, delay: 0.4 + i * 0.12, scrollTrigger: { trigger: s, start: 'top 85%' } });
    });

    gsap.from('.lang__lvl i', { scaleX: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.langs', start: 'top 80%' } });
    gsap.from('.skill-group', { y: 30, opacity: 0, stagger: 0.07, duration: 0.8, scrollTrigger: { trigger: '.skills__grid', start: 'top 80%' } });

    // contact
    gsap.to('.contact__sun', {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top 85%', end: 'top 10%', scrub: true }
    });
    gsap.to('.badge svg', {
      rotation: 360, ease: 'none',
      scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
    gsap.from('.badge', { scale: 0, rotation: -90, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.contact', start: 'top 30%' } });
    gsap.from('.contact__title .line > span', {
      yPercent: 140, stagger: 0.12, duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: '.contact__title', start: 'top 80%' }
    });
  }

  // header
  $$('.about, .beyond').forEach(sec => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 50px', end: 'bottom 50px',
      onToggle: self => { self.isActive ? darkZones.add(sec) : darkZones.delete(sec); paintHeader(); }
    });
  });
  if (lenis) {
    lenis.on('scroll', ({ scroll, direction }) => {
      header.classList.toggle('is-hidden', scroll > 400 && direction > 0);
    });
  }
  ScrollTrigger.create({
    trigger: '.contact', start: 'top 60px', end: 'bottom top',
    onToggle: self => header.classList.toggle('header--orange', self.isActive)
  });
  // active nav link
  $$('.nav a').forEach(a => {
    const sec = $(a.getAttribute('href'));
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec, start: 'top 45%', end: 'bottom 45%',
      onToggle: self => a.classList.toggle('is-active', self.isActive)
    });
  });

  // stat counters
  $$('.stat__num').forEach(el => {
    const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    const fmt = v => pre + Math.round(v).toLocaleString('en-US') + suf;
    if (reduce) { el.textContent = fmt(end); return; }
    const o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v)) })
    });
  });

  ScrollTrigger.create({ trigger: '.contact', start: 'top 40%', onEnter: () => $('.contact').classList.add('is-in') });

  // marquees
  const marquees = $$('.marquee').map(m => {
    const inner = $('.marquee__inner', m);
    inner.innerHTML += inner.innerHTML; // loop
    const dir = +m.dataset.dir;
    const tw = gsap.fromTo(inner, { xPercent: dir > 0 ? 0 : -50 }, { xPercent: dir > 0 ? -50 : 0, duration: 38, ease: 'none', repeat: -1 });
    if (reduce) tw.pause();
    return tw;
  });
  if (lenis) {
    lenis.on('scroll', ({ velocity }) => {
      const s = 1 + Math.min(6, Math.abs(velocity) * 0.25);
      marquees.forEach(t => gsap.to(t, { timeScale: s, duration: 0.3, overwrite: true }));
    });
  }

  // work viewer
  const projects = window.PROJECTS || [];
  const frame = $('#viewerFrame');
  const fields = {
    idx: $('#vIdx'), total: $('#vTotal'), kicker: $('#vKicker'), title: $('#vTitle'),
    meta: $('#vMeta'), desc: $('#vDesc'), points: $('#vPoints'), links: $('#vLinks')
  };
  const index = $('#workIndex');
  const pad = n => String(n).padStart(2, '0');
  let visible = projects.map((_, i) => i);
  let current = 0;
  let busy = false;

  // use a screenshot if there is one
  projects.forEach((p, i) => {
    const tryExt = exts => {
      if (!exts.length) return;
      const img = new Image();
      img.onload = () => { p.image = img.src; if (current === i) paintMedia(p); };
      img.onerror = () => tryExt(exts.slice(1));
      img.src = `assets/projects/${p.id}.${exts[0]}`;
    };
    tryExt(['jpg', 'png', 'webp']);
  });

  const paintMedia = p => {
    frame.innerHTML = p.image
      ? `<img src="${p.image}" alt="Screenshot of ${p.title}">`
      : `<div class="art" style="background:${p.bg}">${p.art}</div>`;
    frame.insertAdjacentHTML('beforeend', '<div class="shutter"></div>');
    const draw = $('.draw', frame);
    if (draw && !reduce) {
      const len = draw.getTotalLength();
      gsap.fromTo(draw, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', delay: 0.2 });
    }
  };
  const paintInfo = p => {
    fields.kicker.textContent = p.kicker;
    fields.title.textContent = p.title;
    fields.meta.innerHTML = p.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
    fields.desc.textContent = p.desc;
    fields.points.innerHTML = p.points.map(t => `<li>${t}</li>`).join('');
    fields.links.innerHTML = p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`).join('');
    fields.idx.textContent = pad(visible.indexOf(current) + 1);
    fields.total.textContent = pad(visible.length);
    $$('button', index).forEach(b => b.classList.toggle('is-active', +b.dataset.i === current));
  };

  index.innerHTML = projects.map((p, i) => `<li><button data-i="${i}" data-cursor="View"><b>${pad(i + 1)}</b>${p.title}</button></li>`).join('');

  const show = (i, animate = true) => {
    if (busy || i === current && animate) return;
    const p = projects[i];
    if (!animate || reduce) { current = i; paintMedia(p); paintInfo(p); return; }
    busy = true;
    const infoEls = [fields.kicker, fields.title, fields.meta, fields.desc, fields.points, fields.links];
    const shutter = $('.shutter', frame);
    gsap.timeline({ onComplete: () => (busy = false) })
      .to(shutter, { scaleY: 1, transformOrigin: '50% 100%', duration: 0.5, ease: 'expo.in' }, 0)
      .to(infoEls, { y: -24, opacity: 0, stagger: 0.03, duration: 0.3, ease: 'power2.in' }, 0)
      .to('#nextProject', { rotation: '+=360', duration: 0.8, ease: 'expo.inOut' }, 0)
      .add(() => {
        current = i;
        paintMedia(p); paintInfo(p);
        gsap.timeline()
          .fromTo($('.shutter', frame), { scaleY: 1 }, { scaleY: 0, transformOrigin: '50% 0%', duration: 0.6, ease: 'expo.out' })
          .fromTo($('.art svg, img', frame), { scale: 1.15 }, { scale: 1, duration: 1, ease: 'expo.out' }, 0)
          .fromTo(infoEls, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'power3.out' }, 0.05);
      })
      .to({}, { duration: 0.7 });
  };
  const step = d => {
    if (!visible.length) return;
    const pos = visible.indexOf(current);
    const next = visible[(pos + d + visible.length) % visible.length];
    if (visible.length === 1 && next === current) return;
    show(next);
  };
  $('#nextProject').addEventListener('click', () => step(1));
  index.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
  $('.viewer').addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });

  // filter
  const search = $('#projectSearch');
  const chipsBox = $('#chips');
  const allTags = [...new Set(projects.flatMap(p => p.tags))];
  const activeTags = new Set();
  chipsBox.innerHTML = allTags.map(t => `<button class="chip" data-tag="${t}">${t}</button>`).join('');
  const applyFilter = () => {
    const q = search.value.trim().toLowerCase();
    visible = projects.map((p, i) => i).filter(i => {
      const p = projects[i];
      const hay = [p.title, p.kicker, p.desc, ...p.tags, ...p.points, ...p.meta.flat()].join(' ').toLowerCase();
      const okQ = !q || hay.includes(q);
      const okT = !activeTags.size || p.tags.some(t => activeTags.has(t));
      return okQ && okT;
    });
    $$('li', index).forEach((li, i) => li.classList.toggle('is-out', !visible.includes(i)));
    $('#workEmpty').hidden = visible.length > 0;
    $('.viewer').style.opacity = visible.length ? '' : '.3';
    if (visible.length && !visible.includes(current)) show(visible[0]);
    else if (visible.length) paintInfo(projects[current]);
  };
  search.addEventListener('input', applyFilter);
  chipsBox.addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    const t = c.dataset.tag;
    activeTags.has(t) ? activeTags.delete(t) : activeTags.add(t);
    c.classList.toggle('is-on');
    applyFilter();
  });
  const filterBtn = $('#filterToggle');
  filterBtn.addEventListener('click', () => {
    const open = chipsBox.hidden;
    chipsBox.hidden = !open;
    filterBtn.setAttribute('aria-expanded', open);
    if (open && !reduce) gsap.from('.chip', { y: 16, opacity: 0, stagger: 0.025, duration: 0.4, ease: 'power3.out' });
    ScrollTrigger.refresh();
  });

  show(0, false);
  if (!reduce) {
    gsap.from('.viewer__frame', {
      clipPath: 'circle(0% at 50% 50%)', duration: 1.4, ease: 'expo.inOut',
      scrollTrigger: { trigger: '.viewer', start: 'top 75%' }
    });
    gsap.from('.viewer__info > *', { y: 30, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.viewer', start: 'top 70%' } });
  }

  // nav
  const wipe = $('.wipe');
  const wipeColors = [COLORS.orange, COLORS.blue, COLORS.ink];
  let wipeN = 0;
  const go = (hash, x = innerWidth / 2, y = innerHeight / 2) => {
    const target = hash === '#top' ? 0 : $(hash);
    if (target === null) return;
    if (reduce) { scrollToEl(target, true); return; }
    wipe.style.background = wipeColors[wipeN++ % wipeColors.length];
    gsap.timeline()
      .set(wipe, { clipPath: `circle(0% at ${x}px ${y}px)` })
      .to(wipe, { clipPath: `circle(150% at ${x}px ${y}px)`, duration: 0.7, ease: 'expo.in' })
      .add(() => { scrollToEl(target, true); ScrollTrigger.update(); })
      .set(wipe, { clipPath: 'circle(150% at 50% 100%)' }, '+=0.08')
      .to(wipe, { clipPath: 'circle(0% at 50% 100%)', duration: 0.8, ease: 'expo.out' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-nav]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;
    e.preventDefault();
    go(hash, e.clientX || innerWidth / 2, e.clientY || innerHeight / 2);
  });

  // command palette
  const palette = $('#palette');
  const pInput = $('#paletteInput');
  const pList = $('#paletteList');
  const actions = [
    { t: 'About', s: 'Section', run: () => go('#about') },
    { t: 'Experience', s: 'Section', run: () => go('#experience') },
    { t: 'Selected work', s: 'Section', run: () => go('#work') },
    { t: 'Leadership', s: 'Section', run: () => go('#beyond') },
    { t: 'Education', s: 'Section', run: () => go('#education') },
    { t: 'Skills & languages', s: 'Section', run: () => go('#skills') },
    { t: 'Contact', s: 'Section', run: () => go('#contact') },
    ...projects.map((p, i) => ({ t: p.title, s: 'Project', run: () => { go('#work'); setTimeout(() => show(i), 900); } })),
    { t: 'Copy email address', s: 'Action', run: () => copyEmail() },
    { t: 'Open LinkedIn', s: 'Link', run: () => open('https://www.linkedin.com/in/aya-sbia-68a526230', '_blank', 'noopener') },
    { t: 'Open GitHub', s: 'Link', run: () => open('https://github.com/asbia', '_blank', 'noopener') },
    { t: 'Leave a like', s: 'Action', run: () => like() },
    { t: 'Back to top', s: 'Section', run: () => go('#top') }
  ];
  let pItems = [], sel = 0;
  const renderPalette = () => {
    const q = pInput.value.trim().toLowerCase();
    pItems = actions.filter(a => !q || (a.t + ' ' + a.s).toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(0, pItems.length - 1));
    pList.innerHTML = pItems.length
      ? pItems.map((a, i) => `<li><button role="option" class="${i === sel ? 'is-sel' : ''}" data-i="${i}">${a.t}<small>${a.s}</small></button></li>`).join('')
      : '<li class="none">Nothing here yet. Try “work”.</li>';
  };
  const openPalette = () => {
    palette.hidden = false;
    lenis && lenis.stop();
    pInput.value = ''; sel = 0; renderPalette();
    pInput.focus();
    if (!reduce) {
      gsap.fromTo('.palette__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo('.palette__box', { y: -30, scale: 0.96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
    }
  };
  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    lenis && lenis.start();
    $('#openPalette').focus({ preventScroll: true });
  };
  const runSel = i => { const a = pItems[i]; if (!a) return; closePalette(); a.run(); };
  $('#openPalette').addEventListener('click', openPalette);
  pInput.addEventListener('input', () => { sel = 0; renderPalette(); });
  pList.addEventListener('click', e => { const b = e.target.closest('button'); if (b) runSel(+b.dataset.i); });
  pList.addEventListener('pointermove', e => {
    const b = e.target.closest('button'); if (!b || +b.dataset.i === sel) return;
    sel = +b.dataset.i; renderPalette();
  });
  palette.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) closePalette(); });
  addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.hidden ? openPalette() : closePalette(); return; }
    if (palette.hidden) {
      if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
      return;
    }
    if (e.key === 'Escape') closePalette();
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(1, pItems.length); renderPalette(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + pItems.length) % Math.max(1, pItems.length); renderPalette(); }
    else if (e.key === 'Enter') { e.preventDefault(); runSel(sel); }
  });

  // likes + email
  const heartBtn = $('#heartBtn');
  const heartCount = $('.heart-count');
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} }
  };
  let likes = +store.get('aya-likes') || 0;
  heartCount.textContent = likes || '';
  const likeLines = ['Thank you! ♥', 'Two hearts. Bold.', 'Okay, now you’re just being nice.', 'The cat says thanks too.', 'Infinite love detected.'];
  const like = () => {
    likes++;
    store.set('aya-likes', likes);
    heartCount.textContent = likes;
    toast(likeLines[Math.min(likes - 1, likeLines.length - 1)]);
    if (reduce) return;
    gsap.fromTo(heartBtn, { scale: 0.8 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    const r = heartBtn.getBoundingClientRect();
    for (let i = 0; i < 10; i++) {
      const h = document.createElement('div');
      h.className = 'heart-pop';
      h.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.2 0 3.6 1.2 5.2 3 1.6-1.8 3-3 5.2-3 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z" fill="currentColor"/></svg>';
      h.style.left = r.left + r.width / 2 - 9 + 'px';
      h.style.top = r.top + r.height / 2 - 9 + 'px';
      h.style.color = [COLORS.orange, COLORS.blue, COLORS.ink][i % 3];
      document.body.appendChild(h);
      const a = Math.PI * (0.55 + Math.random() * 0.9);
      gsap.to(h, {
        x: Math.cos(a) * gsap.utils.random(60, 140), y: -Math.sin(a) * -gsap.utils.random(60, 160),
        rotation: gsap.utils.random(-90, 90), scale: gsap.utils.random(0.6, 1.4), opacity: 0,
        duration: gsap.utils.random(0.8, 1.3), ease: 'power3.out', onComplete: () => h.remove()
      });
    }
  };
  heartBtn.addEventListener('click', like);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); toast('Email copied: ' + EMAIL); }
    catch { toast(EMAIL); }
  };
  $('#copyEmail').addEventListener('click', copyEmail);

  // init
  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  runLoader();
})();
