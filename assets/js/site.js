/* Site engine. You shouldn't need to edit this: change content.js instead. */
(function () {
  'use strict';
  var S = window.SITE;
  var page = document.body.getAttribute('data-page');
  var mobile = window.matchMedia('(max-width: 760px)');
  document.documentElement.classList.add('js');

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function param(k) { return new URLSearchParams(location.search).get(k); }

  var FRAME = {
    bold: '<path pathLength="1" d="M-2,3 C30,1.5 70,3.5 102,2 M97.5,-2 C99,35 96.5,70 98,102 M103,97 C70,98.5 35,96.5 -3,98 M2.5,103 C1,65 3.5,30 1.5,-2"/><path class="p2" pathLength="1" d="M1,1 C35,3 68,0.5 99,3.5 M98.5,1 C97,40 99.5,72 96.5,99 M99,96 C62,99.5 30,97 1,99.5 M3,99 C4,60 0.5,35 3,0"/><path class="p3" pathLength="1" d="M-1,6 C20,4.5 45,6 62,5 M95.5,38 C96.5,60 95,80 96,96 M40,95.5 C60,96.5 80,95 99,96.5"/>',
    wide: '<path pathLength="1" d="M-1,2 C30,1 70,2.5 101,1.5 M99,-1 C99.5,35 98.5,70 99,101 M101,98.5 C70,99.5 35,98 -1,99 M1.5,101 C1,65 2,30 1,-1"/><path class="p2" pathLength="1" d="M0,3 C40,2 75,3.5 100,2.5 M2,99 C35,98 70,99.5 99,98"/>',
    tile: '<path d="M-1,1 C30,0 70,1.5 101,0.5 M99.5,-1 C100,35 99,70 99.5,101 M101,99.5 C65,100 30,99 -1,99.5 M0.5,101 C0,65 1,30 0.5,-1"/><path class="p2" d="M0,2 C40,1.5 75,2.5 100,1.5 M98.8,0 C99.5,45 98.5,75 99,100"/>',
    bubble: '<path pathLength="1" d="M8,4 C35,2 70,3.5 93,4.5 C97.5,6 98,12 97.5,20 C98.5,45 96.5,65 97,80 C97,86 94,88.5 88,88 C65,89.5 40,87.5 26,88.5 L14,99 L16,88 C9,88.5 4,87 3.5,80 C2,60 3.5,35 3,12 C3,7 4.5,4.5 8,4"/>'
  };
  function frame(kind, cls) {
    return '<svg class="sk frame ' + (cls || 'draw') + '" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + FRAME[kind] + '</svg>';
  }
  var ARROW_R = '<svg class="sk px" viewBox="0 0 80 30" aria-hidden="true"><path d="M4,16 C25,13 50,18 74,15 M74,15 L60,5 M74,15 L61,26"/></svg>';
  var ARROW_L = '<svg class="sk px" viewBox="0 0 60 24" aria-hidden="true"><path d="M56,12 C40,10 22,13 6,12 M6,12 L16,4 M6,12 L17,20"/></svg>';
  var I = {
    arrow: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    copy: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    lock: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    out: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="width:14px;height:14px"><path d="M7 17L17 7M8 7h9v9"/></svg>',
    dl: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>',
    prev: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
    x: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  // An image, or a labelled placeholder while src is empty.
  function media(img, zoom) {
    img = img || {};
    var ratio = img.ratio || '4/3';
    if (!img.src) return '<div class="ph" style="aspect-ratio:' + ratio + '">' + esc(img.label || 'Image') + '</div>';
    var isVid = /\.(mp4|webm|mov)$/i.test(img.src);
    var el = isVid
      ? '<video class="media" src="' + esc(img.src) + '"' + (img.poster ? ' poster="' + esc(img.poster) + '"' : '') + ' autoplay muted loop playsinline preload="metadata" aria-label="' + esc(img.label || '') + '" style="aspect-ratio:' + ratio + '"></video>'
      : '<img class="media" src="' + esc(img.src) + '" alt="' + esc(img.alt || img.label || '') + '" loading="lazy" style="aspect-ratio:' + ratio + '">';
    if (zoom && !isVid) return '<button class="zoom" type="button" data-zoom="' + esc(img.src) + '" aria-label="Open image full screen: ' + esc(img.label || '') + '">' + el + '</button>';
    return el;
  }
  function fig(img, kind, cls) {
    return '<figure class="fig ' + (cls || '') + '">' + frame(kind || 'bold') + media(img, true) + '</figure>';
  }
  function carousel(items, label) {
    var n = items.length;
    return '<div class="car" data-car>' +
      '<figure class="fig">' + frame('bold') +
        '<div class="car-vp" tabindex="0" role="region" aria-roledescription="carousel" aria-label="' + esc(label || 'Images') + '"><div class="car-track">' +
          items.map(function (im, i) { return '<div class="car-slide" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' of ' + n + ': ' + esc(im.label || '') + '" data-group="' + esc(im.group || '') + '" style="aspect-ratio:' + (items.ratio || '16/10') + '">' + media(im, true) + '</div>'; }).join('') +
        '</div></div>' +
      '</figure>' +
      '<div class="car-bar"><p class="car-cap" aria-live="polite"><span class="car-grp"' + (items[0].group ? '' : ' hidden') + '>' + esc(items[0].group || '') + '</span><span class="car-txt">' + esc(items[0].label || '') + '</span></p><span class="car-n">1 / ' + n + '</span>' +
        '<button class="ibtn" type="button" data-car-go="-1" aria-label="Previous image">' + I.prev + '</button><button class="ibtn" type="button" data-car-go="1" aria-label="Next image">' + I.next + '</button></div>' +
    '</div>';
  }
  function initCarousels(root) {
    root.querySelectorAll('[data-car]').forEach(function (c) {
      var vp = c.querySelector('.car-vp'), slides = c.querySelectorAll('.car-slide'), cap = c.querySelector('.car-cap'), num = c.querySelector('.car-n');
      var labels = Array.prototype.map.call(slides, function (s) { return s.getAttribute('aria-label').replace(/^\d+ of \d+: /, ''); });
      var cur = 0;
      function at() { return Math.round(vp.scrollLeft / vp.clientWidth); }
      var grp = c.querySelector('.car-grp'), txt = c.querySelector('.car-txt');
      function show(i) { cur = i; txt.textContent = labels[i]; var g = slides[i].getAttribute('data-group'); grp.textContent = g; grp.hidden = !g; num.textContent = (i + 1) + ' / ' + slides.length; }
      function go(i) { i = (i + slides.length) % slides.length; vp.scrollTo({ left: i * vp.clientWidth, behavior: 'smooth' }); show(i); }
      var t; vp.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(function () { var i = at(); if (i !== cur) show(i); }, 80); });
      c.querySelectorAll('[data-car-go]').forEach(function (b) { b.addEventListener('click', function () { go(at() + +b.getAttribute('data-car-go')); }); });
      vp.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(at() + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(at() - 1); } });
    });
  }
  function tags(list) {
    return '<div class="tags">' + (list || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>';
  }

  /* ---------- shared chrome ---------- */
  function chrome() {
    var defs = document.createElement('div');
    defs.innerHTML = '<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="pencil" x="-10%" y="-60%" width="120%" height="220%"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="warp"/><feDisplacementMap in="SourceGraphic" in2="warp" scale="4" xChannelSelector="R" yChannelSelector="G" result="wob"/><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="3" result="grit"/><feColorMatrix in="grit" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.55" result="mask"/><feComposite in="wob" in2="mask" operator="in"/></filter></defs></svg>';
    document.body.insertBefore(defs.firstChild, document.body.firstChild);

    var h = document.createElement('header');
    h.className = 'site-header';
    h.innerHTML = '<div class="bar"><a class="brand" href="index.html">' + esc(S.name) + '</a>' +
      '<nav class="nav" aria-label="Main"><a class="navbox marker" href="about.html"' + (page === 'about' ? ' aria-current="page"' : '') + '>About</a>' +
      '<a class="navbox marker" href="index.html#work">Work</a></nav></div>' +
      '<svg class="sk thin rule" viewBox="0 0 1000 6" preserveAspectRatio="none" aria-hidden="true"><path d="M0,3 C200,1 400,5 600,2.5 C800,1 900,4.5 1000,2"/></svg>';
    document.body.insertBefore(h, document.body.children[1]);

    var f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML = '<svg class="sk thin rule" viewBox="0 0 1000 6" preserveAspectRatio="none" aria-hidden="true"><path d="M0,3 C150,5 400,1 600,3.5 C800,5 900,1.5 1000,3"/></svg>' +
      '<div class="bar"><div class="grp"><span class="mail">' + esc(S.email) + '</span>' +
      '<button class="lnk marker" type="button" data-copy aria-label="Copy email">' + I.copy + '<span class="only-d" data-copy-label>Copy</span><span class="only-m" data-copy-done></span></button></div>' +
      '<div class="grp"><a class="lnk marker" href="' + esc(S.linkedin) + '" target="_blank" rel="noopener"><span class="only-d">LinkedIn</span><span class="only-m hand" style="font-weight:700;font-size:16px">in</span>' + '<span class="only-d">' + I.out + '</span></a>' +
      '<a class="lnk marker" href="' + esc(S.cv) + '" download>' + I.dl + '<span class="only-d">Download CV</span><span class="only-m">CV</span></a></div></div>';
    document.body.appendChild(f);

    var copyBtn = f.querySelector('[data-copy]');
    var t;
    copyBtn.addEventListener('click', function () {
      var done = function () {
        f.querySelector('[data-copy-label]').textContent = 'Copied!';
        f.querySelector('[data-copy-done]').textContent = 'Copied!';
        copyBtn.setAttribute('aria-label', 'Email copied');
        clearTimeout(t);
        t = setTimeout(function () {
          f.querySelector('[data-copy-label]').textContent = 'Copy';
          f.querySelector('[data-copy-done]').textContent = '';
          copyBtn.setAttribute('aria-label', 'Copy email');
        }, 1800);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(S.email).then(done, done); else done();
    });
  }

  /* ---------- behaviours ---------- */
  function drawOnScroll() {
    var els = document.querySelectorAll('.draw');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  function lightbox() {
    var lb = document.createElement('div');
    lb.className = 'lb';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML = '<button class="ibtn x" type="button" aria-label="Close">' + I.x + '</button><img alt="">';
    document.body.appendChild(lb);
    var img = lb.querySelector('img'), last;
    function close() { lb.classList.remove('open', 'big'); document.body.style.overflow = ''; if (last) last.focus(); }
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-zoom]');
      if (!b) return;
      last = b;
      img.src = b.getAttribute('data-zoom');
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.x').focus();
    });
    img.addEventListener('click', function () { lb.classList.toggle('big'); });
    lb.querySelector('.x').addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }

  /* ---------- password ---------- */
  function unlocked() { try { return sessionStorage.getItem('pf-unlocked') === S.passwordHash; } catch (e) { return false; } }
  function sha256(text) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    });
  }
  function gate(main, onOpen) {
    main.className = 'gate';
    main.innerHTML = '<div class="box">' + frame('bold') +
      '<svg class="sk px draw" viewBox="0 0 60 64" aria-hidden="true" style="width:52px;height:56px"><path pathLength="1" d="M10,28 C24,27 38,29 50,27.5 C51,40 49.5,50 50.5,60 C36,61 22,59.5 9.5,60.5 C9,48 10.5,38 10,28"/><path pathLength="1" d="M18,28 C17,12 23,5 30.5,5 C38,5 43,12 42,28 M30,40 C29.5,44 30.5,47 30,50"/></svg>' +
      '<h1>This part is <mark>locked</mark></h1>' +
      '<p class="p">These case studies include work in progress, so they\'re password protected.</p>' +
      '<form novalidate><label for="pw">Password</label><div class="fld"><input id="pw" class="pw" type="password" autocomplete="current-password" aria-describedby="pw-msg" required><button class="btn marker" type="submit">Enter ' + I.arrow + '</button></div><p id="pw-msg" class="msg" aria-live="polite"></p></form>' +
      '<p style="margin:0;font-size:15px;color:var(--ink-2)">Don\'t have the password? <a href="mailto:' + esc(S.email) + '?subject=Portfolio%20password" style="font-weight:600">Email me</a></p></div>';
    var form = main.querySelector('form'), input = main.querySelector('#pw'), msg = main.querySelector('#pw-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      sha256(input.value.trim().toLowerCase()).then(function (h) {
        if (h === S.passwordHash) {
          try { sessionStorage.setItem('pf-unlocked', h); } catch (er) {}
          onOpen();
        } else {
          msg.textContent = 'Not quite. Try again, or email me for it.';
          input.focus();
        }
      }).catch(function () { msg.textContent = 'This browser can\'t check the password. Please email me.'; });
    });
    setTimeout(function () { input.focus(); }, 50);
  }

  /* ---------- pages ---------- */
  function sectionTitle(text, art, id) {
    return '<div class="sec-title"' + (id ? ' id="' + id + '"' : '') + '>' +
      (art ? '<h2><img src="' + esc(art) + '" alt="' + esc(text) + '"></h2>' : '<h2>' + esc(text) + '</h2>') +
      '<svg class="sk acc draw ul" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4,12 C40,6 90,15 130,9 C160,5 185,12 196,8"/></svg></div>';
  }

  /* Hero: write the first lettering in, then wipe it and write the next one. */
  function heroLettering(box, label, eraser, arts, hold) {
    if (!box || !arts.length) return;
    var cache = {}, i = 0, visible = true, timer;
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function load(k) {
      var a = arts[k];
      if (!cache[k]) cache[k] = fetch(a.src).then(function (r) { if (!r.ok) throw 0; return r.text(); })
        .catch(function () { return '<img src="' + esc(a.src) + '" alt="">'; });
      return cache[k];
    }
    function write(k) {
      return load(k).then(function (svg) {
        box.innerHTML = svg;
        eraser.classList.remove('go');
        label.textContent = arts[k].text;
        if (calm) return;
        box.style.setProperty('--s', (arts[k].split || 100) + '%');
        box.classList.remove('write1', 'write2');
        void box.offsetWidth;
        box.classList.add(arts[k].split ? 'write2' : 'write1');
      });
    }
    function next() {
      clearTimeout(timer);
      if (!visible || document.hidden) { timer = setTimeout(next, 1500); return; }
      var k = (i + 1) % arts.length;
      load(k);
      eraser.classList.remove('go');
      void eraser.getBoundingClientRect();
      eraser.classList.add('go');
      setTimeout(function () { i = k; write(i).then(schedule); }, 1250);
    }
    function schedule() { if (!calm && arts.length > 1) timer = setTimeout(next, hold); }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(box);
    write(0).then(schedule);
  }

  function home(main) {
    var H = S.home;
    var arts = H.heroArt || [];
    var hero = '<h1><span class="sr-only" data-hero-text>' + esc(arts[0] ? arts[0].text : '') + '</span>' +
      '<span class="letter" data-letter aria-hidden="true"></span>' +
      '<svg class="eraser" data-eraser viewBox="0 0 1800 700" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M-40,690 L1840,600 L-40,520 L1840,430 L-40,350 L1840,260 L-40,180 L1840,90 L-40,10 L1840,-40"/></svg></h1>';
    var cards = S.caseStudies.map(function (c) {
      return '<article class="card"><a class="fig" href="case-study.html?p=' + c.slug + '" tabindex="-1" aria-hidden="true">' + frame('bold') + media(c.thumb) +
        '<span class="lock">' + I.lock + 'Locked</span></a>' +
        '<h3>' + esc(c.name) + '</h3><p class="meta">' + esc(c.company) + ' · ' + esc(c.year) + '</p>' +
        '<p class="line">' + esc(c.line) + '</p>' + tags(c.tags) +
        '<a class="btn marker" href="case-study.html?p=' + c.slug + '">Check it out ' + I.arrow + '</a></article>';
    }).join('');
    var n = S.projects.length;
    var tiles = S.projects.map(function (p, i) {
      var cls = (i % 7) < 4 ? '' : ' w4';
      if (i === n - 1 && n % 2 === 1) cls += ' last-odd';
      return '<a class="tile' + cls + '" href="project.html?p=' + p.slug + '" aria-label="Check out ' + esc(p.name) + ', ' + esc(p.year) + '">' + media(p.thumb) +
        frame('tile', 'thin') +
        '<span class="name"><b>' + esc(p.name) + '</b><span>' + esc(p.year) + '</span></span>' +
        '<span class="ov"><span class="btn">Check it out ' + I.arrow + '</span></span></a>';
    }).join('');

    main.innerHTML =
      '<section class="hero">' +
        '<div class="hero-art">' + hero + '</div>' +
        '<p class="intro">' + H.intro + '</p>' +
        '<a class="down" href="#work" aria-label="Scroll to featured work"><svg viewBox="0 0 34 52" aria-hidden="true"><path d="M17 3 C15.5 15 18.5 28 16.5 47"/><path d="M5 35 C9 39 13 44 16.5 48 C20 43 24.5 38 29 34"/><path d="M18.5 6 C17 20 19.5 30 17.5 44" style="stroke-width:1.6;opacity:.7"/></svg></a>' +
      '</section>' +
      sectionTitle(H.featuredTitle, H.featuredArt, 'work') +
      '<div class="cards">' + cards + '</div>' +
      '<div style="padding-top:140px">' + sectionTitle(H.otherTitle, H.otherArt) + '</div>' +
      '<div class="wall">' + tiles + '</div>' +
      '<section class="people" aria-label="Testimonials"><div class="t">' +
        (H.peopleArt ? '<h2><img src="' + esc(H.peopleArt) + '" alt="' + esc(H.peopleTitle) + '"></h2>' : '<h2>' + esc(H.peopleTitle) + '</h2>') +
      '</div><div class="q"><figure class="bubble">' + frame('bubble', 'draw thin') +
        '<span class="open" aria-hidden="true">“</span><div class="qstack" data-qstack></div></figure>' +
        '<div class="qctl"><button class="ibtn" type="button" data-prev aria-label="Previous quote">' + I.prev + '</button><span data-dots style="display:flex"></span><button class="ibtn" type="button" data-next aria-label="Next quote">' + I.next + '</button></div>' +
      '</div></section>';

    // testimonials
    var qs = S.testimonials, i = 0, timer;
    var dots = main.querySelector('[data-dots]');
    dots.innerHTML = qs.map(function (_, k) { return '<button class="dot" type="button" aria-label="Show quote ' + (k + 1) + '" data-k="' + k + '"><i></i></button>'; }).join('');
    // every quote sits in the same grid cell, so the bubble always fits the longest one
    var stack = main.querySelector('[data-qstack]');
    stack.innerHTML = qs.map(function (q) {
      return '<div class="qitem" aria-hidden="true"><blockquote>' + esc(q.text) + '</blockquote><figcaption><b>' + esc(q.name) + '</b><span>' + esc(q.role) + '</span></figcaption></div>';
    }).join('');
    var items = stack.querySelectorAll('.qitem');
    function show(k) {
      i = (k + qs.length) % qs.length;
      items.forEach(function (el, j) { el.classList.toggle('on', j === i); el.setAttribute('aria-hidden', String(j !== i)); });
      dots.querySelectorAll('.dot').forEach(function (d, j) { if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }
    // reading time: about 5 s plus 55 ms per character, never under 8 s
    function readMs(q) { return Math.max(8000, 5000 + q.text.length * 55); }
    function auto() {
      clearTimeout(timer);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setTimeout(function () { show(i + 1); auto(); }, readMs(qs[i]));
    }
    main.querySelector('[data-prev]').addEventListener('click', function () { show(i - 1); auto(); });
    main.querySelector('[data-next]').addEventListener('click', function () { show(i + 1); auto(); });
    dots.addEventListener('click', function (e) { var d = e.target.closest('.dot'); if (d) { show(+d.getAttribute('data-k')); auto(); } });
    show(0); auto();
    heroLettering(main.querySelector('[data-letter]'), main.querySelector('[data-hero-text]'), main.querySelector('[data-eraser]'), arts, (H.heroHoldSeconds || 6) * 1000);

    // wall: on touch, first tap shows the overlay, second tap opens
    main.querySelectorAll('.tile').forEach(function (t) {
      t.addEventListener('click', function (e) {
        if (window.matchMedia('(hover: hover)').matches) return;
        if (!t.classList.contains('tapped')) {
          e.preventDefault();
          main.querySelectorAll('.tile.tapped').forEach(function (o) { o.classList.remove('tapped'); });
          t.classList.add('tapped');
        }
      });
    });
  }

  function caseStudy(main) {
    var list = S.caseStudies;
    var idx = Math.max(0, list.findIndex(function (c) { return c.slug === param('p'); }));
    var c = list[idx], nx = list[(idx + 1) % list.length];
    document.title = c.name + ' · ' + S.name;
    function render() {
      main.className = 'wrap' + (c.frames === 'clean' ? ' clean' : '');
      var n = 0;
      var body = c.sections.map(function (s) {
        if (s.type === 'image') return fig(s.image, 'wide');
        function paras(t) { return t ? [].concat(t).map(function (x) { return '<p class="p">' + esc(x) + '</p>'; }).join('') : ''; }
        if (s.type === 'video') return '<figure class="fig">' + frame('wide') + '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + esc(s.youtube) + '" title="' + esc(s.label || 'Video') + '" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div></figure>';
        n++;
        var text = '<div class="col-text dec"><span class="num">' + ('0' + n).slice(-2) + '</span><h2>' + esc(s.heading) + '</h2>' + paras(s.text) +
          (s.steps ? '<ol class="steps">' + s.steps.map(function (st) { return '<li><b>' + esc(st[0]) + '</b>' + (st[1] ? ' ' + esc(st[1]) : '') + '</li>'; }).join('') + '</ol>' : '') +
          paras(s.after) + '</div>';
        if (s.prototype) {
          var pr = s.prototype;
          return '<section class="row stack">' + text +
            '<div class="proto">' +
              '<div class="proto-box" style="aspect-ratio:' + (pr.w || 1440) + '/' + (pr.h || 900) + '"><iframe src="' + esc(pr.src) + '" title="' + esc(pr.label || 'Prototype') + '" loading="lazy" width="' + (pr.w || 1440) + '" height="' + (pr.h || 900) + '"></iframe></div>' +
            '<div class="car-bar"><p class="car-cap">' + esc(pr.label || '') + '</p><a class="btn marker" href="' + esc(pr.src) + '" target="_blank" rel="noopener">Open full screen ' + I.arrow + '</a></div></div>' +
          '</section>';
        }
        if (s.carousel) {
          s.carousel.ratio = s.carouselRatio;
          return '<section class="row stack">' + text + carousel(s.carousel, s.heading) + '</section>';
        }
        if (!s.image) return '<section class="row stack">' + text + '</section>';
        var img = '<div class="col-img">' + fig(s.image) + '</div>';
        return n % 2 ? '<section class="row">' + img + text + '</section>' : '<section class="row rev">' + text + img + '</section>';
      }).join('');
      main.innerHTML =
        '<div style="display:flex;flex-direction:column;gap:32px"><a class="lnk marker back" href="index.html#work">' + ARROW_L + 'Back to work</a>' +
        (c.layout === 'split' ?
        '<div class="row top split">' +
          '<div class="col-text" style="gap:28px">' + tags(c.context) + '<h1 class="cs-title">' + esc(c.title) + '<small>' + esc(c.subtitle) + '</small></h1></div>' +
          '<div class="col-text" style="gap:28px">' +
            '<div style="display:flex;flex-direction:column;gap:10px"><span class="lbl">Summary</span>' + [].concat(c.summary).map(function (x) { return '<p class="p">' + esc(x) + '</p>'; }).join('') + '</div>' +
            '<div style="display:flex;flex-direction:column;gap:12px"><span class="lbl">Outcomes</span><ul class="ol">' + c.outcomes.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div>' +
          '</div>' +
        '</div></div>' +
        c.heroImages.map(function (im) { return '<div class="car">' + fig(im, 'wide') + '<div class="car-bar"><p class="car-cap">' + esc(im.label || '') + '</p></div></div>'; }).join('') :
        '<div class="row top">' +
          '<div class="col-text" style="gap:28px">' + tags(c.context) +
            '<h1 class="cs-title">' + esc(c.title) + '<small>' + esc(c.subtitle) + '</small></h1>' +
            '<div style="display:flex;flex-direction:column;gap:10px"><span class="lbl">Summary</span><p class="p">' + esc(c.summary) + '</p></div>' +
            '<div style="display:flex;flex-direction:column;gap:12px"><span class="lbl">Outcomes</span><ul class="ol">' + c.outcomes.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div>' +
          '</div>' +
          '<div class="col-img">' + c.heroImages.map(function (im, k) { return fig(im, 'bold', k ? 'offset' : ''); }).join('') + '</div>' +
        '</div></div>') +
        '<div class="stats">' + c.stats.map(function (s) { return '<div class="stat">' + frame('wide', 'draw thin') + '<span class="lbl">' + esc(s.n) + '</span><span>' + esc(s.label) + '</span></div>'; }).join('') + '</div>' +
        body +
        (c.quote ? '<blockquote class="pull">“' + esc(c.quote.text) + '”<cite>' + esc(c.quote.by) + '</cite></blockquote>' : '') +
        '<section class="learned"><span class="lbl">What I learned</span><p>' + esc(c.learned) + '</p></section>' +
        '<a class="next" href="case-study.html?p=' + nx.slug + '"><small>Next project</small><span>' + esc(nx.name) + ' ' + ARROW_R + '</span></a>';
      initCarousels(main);
      main.querySelectorAll('.proto-box').forEach(function (box) {
        var f = box.querySelector('iframe'), w = +f.getAttribute('width');
        function fit() { f.style.transform = 'scale(' + (box.clientWidth / w) + ')'; }
        fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(box); else window.addEventListener('resize', fit);
      });
      drawOnScroll();
    }
    if (unlocked()) render(); else gate(main, function () { render(); window.scrollTo(0, 0); });
  }

  function project(main) {
    var list = S.projects;
    var idx = Math.max(0, list.findIndex(function (p) { return p.slug === param('p'); }));
    var p = list[idx], nx = list[(idx + 1) % list.length];
    document.title = p.name + ' · ' + S.name;
    main.className = 'sp';
    var imgs = [], pairs = [];
    p.images.forEach(function (im) {
      if (im.pair) { pairs.push(im); if (pairs.length === 2) { imgs.push('<div class="pair">' + pairs.map(function (x) { return fig(x); }).join('') + '</div>'); pairs = []; } return; }
      if (pairs.length) { imgs.push(fig(pairs[0])); pairs = []; }
      imgs.push(fig(im, im.ratio && im.ratio.indexOf('21/') === 0 ? 'wide' : 'bold', im.narrow ? 'narrow' : ''));
    });
    if (pairs.length) imgs.push(fig(pairs[0]));
    main.innerHTML =
      '<aside><a class="lnk marker back" href="index.html#work">' + ARROW_L + 'Back to work</a>' +
        '<div><h1>' + esc(p.name) + '</h1><p class="meta">' + esc(p.company) + ' · ' + esc(p.year) + '</p></div>' +
        '<p class="p" style="font-size:16px">' + esc(p.description) + '</p>' +
        (p.quote ? '<p class="hand" style="margin:0;font-size:22px;line-height:1.3">“' + esc(p.quote) + '”<br><span style="font-size:15px;color:var(--ink-3)">' + esc(p.quoteBy || '') + '</span></p>' : '') +
        (p.stats && p.stats.length ? '<div class="mini">' + p.stats.map(function (s) { return '<div><span class="lbl">' + esc(s.n) + '</span><span style="font-size:15px;line-height:1.4">' + esc(s.label) + '</span></div>'; }).join('') + '</div>' : '') +
        tags(p.tags) +
      '</aside>' +
      '<div class="gallery">' + imgs.join('') +
        '<a class="next" style="margin-top:40px" href="project.html?p=' + nx.slug + '"><small>Next project</small><span>' + esc(nx.name) + ' ' + ARROW_R + '</span></a></div>';
  }

  function about(main) {
    var A = S.about;
    main.innerHTML =
      '<div class="about-top">' +
        '<section class="skills" aria-label="Skills"><div class="seg" role="group" aria-label="Skill type"><button type="button" aria-pressed="true" data-mode="hard">Hard skills</button><button type="button" aria-pressed="false" data-mode="soft">Soft skills</button></div>' +
          '<div class="radar" data-radar></div><p class="note">Rated by me, 0 to 5</p></section>' +
        '<figure class="fig portrait">' + frame('bold') +
          (A.video ? '<video class="media" src="' + esc(A.video) + '"' + (A.videoPoster ? ' poster="' + esc(A.videoPoster) + '"' : '') + ' autoplay muted loop playsinline></video>' : '<div class="ph">Video · me, looking at the camera</div>') +
        '</figure>' +
        '<section class="why"><span class="lbl">Why I design</span><p class="body">' + esc(A.why) + '</p>' + tags(A.facts) +
          '<p class="note" style="font-size:16px;margin-top:10px">Tools I reach for</p>' +
          '<div class="tags">' + A.tools.map(function (t) { return '<span class="tag" style="font-family:var(--sans);font-size:14px;font-weight:500">' + esc(t) + '</span>'; }).join('') + '</div></section>' +
      '</div>' +
      '<section class="tl" aria-label="Timeline"><div class="head"><div style="display:flex;flex-direction:column;gap:8px"><span class="lbl" style="font-size:22px">Timeline</span><h2>' + esc(A.timelineTitle) + '</h2></div>' +
        '<div class="ctl"><span class="note" style="font-size:15px">Scroll, drag or use the arrows</span><button class="ibtn" type="button" data-tl="-1" aria-label="Earlier moments">' + I.prev + '</button><button class="ibtn" type="button" data-tl="1" aria-label="Later moments">' + I.next + '</button></div></div>' +
        '<div class="track" tabindex="0" role="region" aria-label="Life and career timeline"><div class="inner">' +
          A.timeline.map(function (m) {
            return '<article class="moment"><svg class="sk px ln" viewBox="0 0 290 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0,10 C70,7 140,13 210,9 C240,8 265,11 290,10"/></svg><span class="pt" aria-hidden="true"></span>' +
              '<span class="y">' + esc(m.year) + '</span><h3>' + esc(m.title) + '</h3><p>' + esc(m.text) + '</p></article>';
          }).join('') +
        '</div></div></section>';

    // radar
    var box = main.querySelector('[data-radar]');
    function radar(list, mode) {
      var W = 440, H = 400, cx = 220, cy = 200, R = mobile.matches ? 112 : 120, n = list.length;
      function pt(i, r) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
      function poly(f) { return list.map(function (s, i) { return f(s, i).map(function (v) { return v.toFixed(1); }).join(','); }).join(' '); }
      var rings = [1, 2, 3, 4, 5].map(function (k) { return '<polygon class="ring" points="' + poly(function (s, i) { return pt(i, R * k / 5); }) + '"/>'; }).join('');
      var axes = list.map(function (s, i) { var p = pt(i, R); return 'M' + cx + ',' + cy + ' L' + p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
      var dots = list.map(function (s, i) { var p = pt(i, R * s[1] / 5); return '<circle class="vdot" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4.5"/>'; }).join('');
      var label = (mode === 'hard' ? 'Hard skills: ' : 'Soft skills: ') + list.map(function (s) { return s[0] + ' ' + s[1] + ' of 5'; }).join(', ');
      box.innerHTML = '<svg viewBox="0 0 440 400" role="img" aria-label="' + esc(label) + '">' + rings + '<path class="axis" d="' + axes + '"/><polygon class="val" points="' + poly(function (s, i) { return pt(i, R * s[1] / 5); }) + '"/>' + dots + '</svg>' +
        list.map(function (s, i) { var p = pt(i, R + (mobile.matches ? 54 : 46)); return '<div class="l" aria-hidden="true" style="left:' + (p[0] / W * 100).toFixed(2) + '%;top:' + (p[1] / H * 100).toFixed(2) + '%">' + esc(s[0]) + ' <b>' + s[1] + '</b></div>'; }).join('');
    }
    var mode = 'hard';
    function draw() { radar(mode === 'hard' ? A.hardSkills : A.softSkills, mode); }
    main.querySelectorAll('[data-mode]').forEach(function (b) {
      b.addEventListener('click', function () {
        mode = b.getAttribute('data-mode');
        main.querySelectorAll('[data-mode]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        draw();
      });
    });
    mobile.addEventListener && mobile.addEventListener('change', draw);
    draw();

    // timeline: wheel scrolls sideways first, then the page; drag; arrows
    var track = main.querySelector('.track');
    track.addEventListener('wheel', function (e) {
      if (mobile.matches || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      var max = track.scrollWidth - track.clientWidth;
      if ((e.deltaY > 0 && track.scrollLeft < max - 1) || (e.deltaY < 0 && track.scrollLeft > 0)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    }, { passive: false });
    var down = false, sx = 0, sl = 0;
    track.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || mobile.matches) return; down = true; sx = e.clientX; sl = track.scrollLeft; track.classList.add('drag'); });
    window.addEventListener('pointermove', function (e) { if (down) track.scrollLeft = sl - (e.clientX - sx); });
    window.addEventListener('pointerup', function () { down = false; track.classList.remove('drag'); });
    main.querySelectorAll('[data-tl]').forEach(function (b) {
      b.addEventListener('click', function () { track.scrollBy({ left: +b.getAttribute('data-tl') * 600, behavior: 'smooth' }); });
    });
  }

  /* ---------- boot ---------- */
  chrome();
  var main = document.getElementById('main');
  ({ home: home, case: caseStudy, project: project, about: about }[page] || home)(main);
  drawOnScroll();
  lightbox();
})();
