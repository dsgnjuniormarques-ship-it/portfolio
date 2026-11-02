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
    var f = '<figure class="fig ' + (cls || '') + (img && img.scroll ? ' scrollfig' : '') + '">' + frame(kind || 'bold') + media(img, true) + '</figure>';
    if (img && img.caption) return '<div class="capfig ' + (cls || '') + '">' + f + '<p class="car-cap">' + esc(img.caption) + '</p></div>';
    return f;
  }
  function prevNext(page, list, idx) {
    var pv = list[(idx - 1 + list.length) % list.length], nx = list[(idx + 1) % list.length];
    return '<nav class="pn" aria-label="More projects">' +
      '<a class="next prev" href="' + page + '?p=' + pv.slug + '"><small>Previous project</small><span>' + ARROW_L + ' ' + esc(pv.name) + '</span></a>' +
      '<a class="next" href="' + page + '?p=' + nx.slug + '"><small>Next project</small><span>' + esc(nx.name) + ' ' + ARROW_R + '</span></a></nav>';
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
  /* ---------- depth doodles: some float over the content, some blur in the back ---------- */
  var DOODLES = [
    '<path d="M4 4 L4 60 L18 46 L28 68 L36 64 L26 43 L46 42 Z"/>',
    '<path d="M4 70 C64 -20 174 140 244 40"/><path d="M4 70 L34 0 M244 40 L209 110" stroke-dasharray="3 6"/><circle cx="34" cy="0" r="4"/><circle cx="209" cy="110" r="4"/>',
    '<rect x="2" y="2" width="200" height="132" rx="10"/><path d="M2 30 H202"/><circle cx="18" cy="16" r="3.5"/><circle cx="31" cy="16" r="3.5"/><circle cx="44" cy="16" r="3.5"/><path d="M22 60 H110 M22 76 H150 M22 92 H120"/>',
    '<path d="M34 2 C38 24 44 30 66 34 C44 38 38 44 34 66 C30 44 24 38 2 34 C24 30 30 24 34 2 Z"/>',
    '<circle cx="62" cy="62" r="44"/><path d="M62 2 V122 M2 62 H122"/>',
    '<path d="M2 82 L42 2 L82 82 L42 172 Z"/><path d="M42 2 V92"/><circle cx="42" cy="100" r="5"/>',
    '<path d="M2 62 L62 30 L122 62 L122 132 L62 164 L2 132 Z M2 62 L62 94 L122 62 M62 94 V164"/>',
    '<path d="M2 32 C22 2 42 62 62 32 C82 2 102 62 122 32"/>',
    '<path d="M2 122 V2 M2 122 H182"/><path d="M14 102 L54 62 L92 82 L142 22 L174 32"/>',
    '<path d="M2 82 L32 2 L62 82 M14 52 H50"/><path d="M82 82 V2 M82 42 C102 22 122 32 122 62 C122 82 102 87 82 72"/>',
    '<circle cx="18" cy="18" r="16"/><circle cx="46" cy="18" r="16"/><circle cx="74" cy="18" r="16"/>',
    '<path d="M26 2 l8 16 18 3 -13 12 3 18 -16 -8 -16 8 3 -18 -13 -12 18 -3z"/>'
  ];
  function doodles() {
    var layer = document.createElement('div');
    layer.className = 'doodles'; layer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(layer);
    var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var items = [], built = 0;
    function build() {
      var h = document.documentElement.scrollHeight, w = window.innerWidth;
      layer.style.height = h + 'px';
      var want = Math.ceil(h / 300);
      while (built < want) {
        var front = built % 4 === 3, svg = DOODLES[Math.floor(rnd() * DOODLES.length)];
        var el = document.createElement('div');
        el.className = 'dd ' + (front ? 'front' : 'back');
        var size = front ? 70 + rnd() * 70 : 140 + rnd() * 160;
        var left = rnd() < .5 ? rnd() * 22 : 74 + rnd() * 22;
        if (front) left = 6 + rnd() * 88;
        el.style.cssText = 'top:' + (built * 300 + rnd() * 260) + 'px;left:' + left + '%;width:' + size + 'px;transform:rotate(' + ((rnd() - .5) * 30).toFixed(1) + 'deg)';
        el.innerHTML = '<svg viewBox="-6 -6 270 190" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + svg + '</svg>';
        el._speed = front ? -0.22 - rnd() * .12 : 0.18 + rnd() * .14;
        el._rot = el.style.transform;
        layer.appendChild(el); items.push(el); built++;
      }
    }
    function move() {}
    build(); move();
    window.addEventListener('resize', build);
    if (window.ResizeObserver) new ResizeObserver(function () { build(); move(); }).observe(document.body);
  }

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
      '<button class="lnk marker" type="button" data-copy aria-label="Copy email">' + I.copy + '<span class="only-d" data-copy-label></span><span class="only-m" data-copy-done></span></button></div>' +
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
          f.querySelector('[data-copy-label]').textContent = '';
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
      '</div>';
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

  /* ---------- feed: sticky text on the left, images scrolling on the right ---------- */
  function feedImgs(list) {
    var out = [], buf = [], kind = '';
    function flush() {
      if (!buf.length) return;
      out.push(buf.length > 1 ? '<div class="' + kind + '">' + buf.join('') + '</div>' : buf[0]);
      buf = []; kind = '';
    }
    list.forEach(function (im) {
      var k = im.trio ? 'trio' : im.pair ? 'pair' : '';
      if (k !== kind) flush();
      var r = (im.ratio || '4/3').split('/'), tall = k !== 'trio' && (+r[1] / +r[0]) > (k ? 1.6 : 1.2);
      var f = '<figure class="fig' + (tall ? ' peek' : '') + (im.narrow ? ' narrow' : '') + '" data-par>' + media(im, true) + '</figure>';
      if (k) { kind = k; buf.push(f); } else out.push(f);
    });
    flush();
    return out.join('');
  }
  function feedText(p) {
    return '<h3>' + esc(p.name) + '</h3><p class="meta">' + esc(p.company) + (p.year ? ' · ' + esc(p.year) : '') + '</p>' +
      '<p class="p">' + esc(p.description) + '</p>' +
      (p.quote ? '<p class="fq">“' + esc(p.quote) + '”<span>' + esc(p.quoteBy || '') + '</span></p>' : '') +
      (p.stats && p.stats.length ? '<div class="fstats">' + p.stats.map(function (st) { return '<div><b>' + esc(st.n) + '</b><span>' + esc(st.label) + '</span></div>'; }).join('') + '</div>' : '') +
      tags(p.tags);
  }
  function feed(list, title, alt, intro, id) {
    return '<section class="feed" id="' + id + '"' + (alt ? ' data-alt="' + esc(alt) + '"' : '') + ' data-title="' + esc(title) + '">' +
      '<aside class="feed-side"><div class="feed-sticky">' + (title ? '<h2 class="feed-title">' + esc(title) + '</h2>' : '') + (intro ? '<p class="feed-intro">' + esc(intro) + '</p>' : '') +
        '<div class="feed-texts">' + list.map(function (p, k) { return '<div class="ft' + (k ? '' : ' on') + '" aria-hidden="' + (k ? 'true' : 'false') + '">' + feedText(p) + '</div>'; }).join('') + '</div></div></aside>' +
      '<div class="feed-main">' + list.map(function (p, k) {
        return '<article class="fp" id="' + esc(p.slug) + '" data-k="' + k + '"><div class="fp-text">' + feedText(p) + '</div><div class="fp-imgs">' + feedImgs(p.images) + '</div></article>';
      }).join('') + '</div></section>';
  }
  /* ---------- projects: category filters + list / grid ---------- */
  var ALL = S.projects.concat((S.sideQuests || []).map(function (q) {
    var o = {}; for (var k in q) o[k] = q[k];
    o.category = o.category || 'Side quests';
    o.thumb = { src: q.thumb || q.images[0].src, label: q.name };
    return o;
  }));
  var VIEW_ICONS = {
    list: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="7" height="7" rx="1.5"/><path d="M13 6h8M13 9h5"/><rect x="3" y="13" width="7" height="7" rx="1.5"/><path d="M13 15h8M13 18h5"/></svg>',
    grid: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>'
  };
  function projectsSection(H) {
    var cats = [];
    ALL.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });
    var bar = '<div class="pbar" id="projects"><h2 class="pbar-title">' + esc(H.otherTitle) + '</h2>' +
      '<div class="pills" role="group" aria-label="Filter projects by category">' + cats.map(function (c) {
        return '<button class="pill" type="button" aria-pressed="false" data-cat="' + esc(c) + '"><span>' + esc(c) + '</span><span class="x" aria-hidden="true">' + I.x + '</span></button>';
      }).join('') + '</div>' +
      '<div class="views" role="group" aria-label="View">' +
        '<button class="vbtn" type="button" data-view="list" aria-pressed="true" aria-label="List view">' + VIEW_ICONS.list + '</button>' +
        '<button class="vbtn" type="button" data-view="grid" aria-pressed="false" aria-label="Grid view">' + VIEW_ICONS.grid + '</button></div></div>';
    var grid = '<div class="pgrid" hidden>' + ALL.map(function (p) {
      return '<a class="pcard" href="project.html?p=' + p.slug + '" data-cat="' + esc(p.category || '') + '">' + media(p.thumb) +
        '<span class="pc-info"><span class="pc-cat">' + esc(p.category || '') + '</span><b>' + esc(p.name) + '</b><span class="pc-meta">' + esc(p.company) + (p.year ? ' · ' + esc(p.year) : '') + '</span></span></a>';
    }).join('') + '</div>';
    var list = feed(ALL, '', '', '', 'projects-list');
    return '<section class="projects">' + bar + grid + list + '</section>';
  }
  function initProjects(main) {
    var sec = main.querySelector('.projects'); if (!sec) return;
    var on = [], view = 'list';
    try { view = localStorage.getItem('pf-view') === 'grid' ? 'grid' : 'list'; } catch (e) {}
    function apply() {
      sec.querySelectorAll('.pill').forEach(function (b) { b.setAttribute('aria-pressed', String(on.indexOf(b.getAttribute('data-cat')) > -1)); });
      var ok = function (cat) { return !on.length || on.indexOf(cat) > -1; };
      sec.querySelectorAll('.pcard').forEach(function (c) { c.hidden = !ok(c.getAttribute('data-cat')); });
      sec.querySelectorAll('.fp').forEach(function (a) { a.hidden = !ok(ALL[+a.getAttribute('data-k')].category); });
      sec.querySelector('.pgrid').hidden = view !== 'grid';
      sec.querySelector('.feed').hidden = view !== 'list';
      sec.querySelectorAll('.vbtn').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
      var f = sec.querySelector('.feed'); f._cur = -1;
      window.dispatchEvent(new Event('scroll'));
    }
    sec.querySelectorAll('.pill').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.getAttribute('data-cat'), i = on.indexOf(c);
        if (i > -1) on.splice(i, 1); else on.push(c);
        apply();
      });
    });
    sec.querySelectorAll('.vbtn').forEach(function (b) {
      b.addEventListener('click', function () {
        view = b.getAttribute('data-view');
        try { localStorage.setItem('pf-view', view); } catch (e) {}
        apply();
      });
    });
    apply();
  }

  function initFeeds(root) {
    var feeds = root.querySelectorAll('.feed');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pars = root.querySelectorAll('[data-par]');
    function tick() {
      var mid = window.innerHeight * 0.6;
      feeds.forEach(function (f) {
        var arts = f.querySelectorAll('.fp:not([hidden])'), cur = arts.length ? +arts[0].getAttribute('data-k') : 0;
        arts.forEach(function (a) { if (a.getBoundingClientRect().top < mid) cur = +a.getAttribute('data-k'); });
        if (f._cur !== cur) {
          f._cur = cur;
          f.querySelectorAll('.ft').forEach(function (t, k) { t.classList.toggle('on', k === cur); t.classList.toggle('past', k < cur); t.setAttribute('aria-hidden', String(k !== cur)); });
          var alt = f.getAttribute('data-alt');
          if (alt) {
            var h = f.querySelector('.feed-title'), want = cur > 0 ? alt : f.getAttribute('data-title');
            if (h.textContent !== want) { h.classList.add('swap'); setTimeout(function () { h.textContent = want; h.classList.remove('swap'); }, 220); }
          }
        }
      });
    }
    var raf = 0;
    window.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; tick(); }); }, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }

  /* ---------- testimonials (About) ---------- */
  function people(H) {
    return '<section class="people" aria-label="Testimonials"><div class="t">' +
        (H.peopleArt ? '<h2><img src="' + esc(H.peopleArt) + '" alt="' + esc(H.peopleTitle) + '"></h2>' : '<h2>' + esc(H.peopleTitle) + '</h2>') +
      '</div><div class="q"><figure class="bubble">' + frame('bubble', 'draw thin') +
        '<span class="open" aria-hidden="true">“</span><div class="qstack" data-qstack></div></figure>' +
        '<div class="qctl"><button class="ibtn" type="button" data-prev aria-label="Previous quote">' + I.prev + '</button><span data-dots style="display:flex"></span><button class="ibtn" type="button" data-next aria-label="Next quote">' + I.next + '</button></div>' +
      '</div></section>';
  }
  function initPeople(main) {
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
        '<h3><a href="case-study.html?p=' + c.slug + '">' + esc(c.line) + '</a></h3>' + tags(c.tags) +
        '<a class="btn marker" href="case-study.html?p=' + c.slug + '">Check it out ' + I.arrow + '</a></article>';
    }).join('');

    main.innerHTML =
      '<section class="hero">' +
        '<div class="hero-art">' + hero + '</div>' +
        '<p class="intro">' + H.intro + '</p>' +
        '<a class="down" href="#work" aria-label="Scroll to featured work"><svg viewBox="0 0 34 52" aria-hidden="true"><path d="M17 3 C15.5 15 18.5 28 16.5 47"/><path d="M5 35 C9 39 13 44 16.5 48 C20 43 24.5 38 29 34"/><path d="M18.5 6 C17 20 19.5 30 17.5 44" style="stroke-width:1.6;opacity:.7"/></svg></a>' +
      '</section>' +
      '<section class="band" id="work">' + sectionTitle(H.featuredTitle, H.featuredArt) +
        '<div class="cards">' + cards + '</div></section>' +
      projectsSection(H);

    heroLettering(main.querySelector('[data-letter]'), main.querySelector('[data-hero-text]'), main.querySelector('[data-eraser]'), arts, (H.heroHoldSeconds || 6) * 1000);
    initFeeds(main);
    initProjects(main);
  }

  function caseStudy(main) {
    var list = S.caseStudies;
    var idx = Math.max(0, list.findIndex(function (c) { return c.slug === param('p'); }));
    var c = list[idx], nx = list[(idx + 1) % list.length];
    document.title = c.name + ' · ' + S.name;
    function render() {
      main.className = 'wrap clean';
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
        (c.layout !== 'classic' ?
        '<div class="row top split">' +
          '<div class="col-text" style="gap:28px">' + tags(c.context) + '<h1 class="cs-title">' + esc(c.title) + '<small>' + esc(c.subtitle) + '</small></h1></div>' +
          '<div class="col-text" style="gap:28px">' +
            '<div style="display:flex;flex-direction:column;gap:10px"><span class="lbl">Summary</span>' + [].concat(c.summary).map(function (x) { return '<p class="p">' + esc(x) + '</p>'; }).join('') + '</div>' +
            '<div style="display:flex;flex-direction:column;gap:12px"><span class="lbl">Outcomes</span><ul class="ol">' + c.outcomes.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('') + '</ul></div>' +
          '</div>' +
        '</div></div>' +
        c.heroImages.map(function (im) { return '<div class="car' + (im.narrow ? ' car-narrow' : '') + '">' + fig(im, 'wide') + '<div class="car-bar"><p class="car-cap">' + esc(im.label || '') + '</p></div></div>'; }).join('') :
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
        prevNext('case-study.html', list, idx);
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
    var list = ALL;
    var idx = Math.max(0, list.findIndex(function (p) { return p.slug === param('p'); }));
    var p = list[idx], nx = list[(idx + 1) % list.length];
    document.title = p.name + ' · ' + S.name;
    main.className = 'sp clean';
    var imgs = [], pairs = [];
    p.images.forEach(function (im) {
      if (im.pair || im.trio) { pairs.push(im); var want = im.trio ? 3 : 2; if (pairs.length === want) { imgs.push('<div class="' + (im.trio ? 'pair trio' : 'pair') + '">' + pairs.map(function (x) { return fig(x); }).join('') + '</div>'); pairs = []; } return; }
      if (pairs.length) { imgs.push(fig(pairs[0])); pairs = []; }
      imgs.push(fig(im, im.ratio && im.ratio.indexOf('21/') === 0 ? 'wide' : 'bold', im.narrow ? 'narrow' : ''));
    });
    if (pairs.length) imgs.push(fig(pairs[0]));
    main.innerHTML =
      '<aside><a class="lnk marker back" href="index.html#projects">' + ARROW_L + 'Back to projects</a>' +
        '<div><h1>' + esc(p.name) + '</h1><p class="meta">' + esc(p.company) + (p.year ? ' · ' + esc(p.year) : '') + '</p></div>' +
        '<p class="p" style="font-size:16px">' + esc(p.description) + '</p>' +
        (p.quote ? '<p class="hand" style="margin:0;font-size:22px;line-height:1.3">“' + esc(p.quote) + '”<br><span style="font-size:15px;color:var(--ink-3)">' + esc(p.quoteBy || '') + '</span></p>' : '') +
        (p.stats && p.stats.length ? '<div class="mini">' + p.stats.map(function (s) { return '<div><span class="lbl">' + esc(s.n) + '</span><span style="font-size:15px;line-height:1.4">' + esc(s.label) + '</span></div>'; }).join('') + '</div>' : '') +
        tags(p.tags) +
      '</aside>' +
      '<div class="gallery">' + imgs.join('') +
        prevNext('project.html', list, idx) + '</div>';
  }

  function about(main) {
    var A = S.about;
    main.innerHTML =
      '<div class="about-top">' +

        '<figure class="fig portrait">' + frame('bold') +
          (A.photo && !A.video ? '<img class="media" src="' + esc(A.photo) + '" alt="Evaldo Marques">' : A.video ? '<video class="media" src="' + esc(A.video) + '"' + (A.videoPoster ? ' poster="' + esc(A.videoPoster) + '"' : '') + ' autoplay muted loop playsinline></video>' : '<div class="ph">Video · me, looking at the camera</div>') +
        '</figure>' +
        '<section class="why"><span class="lbl">Why I design</span><p class="body">' + esc(A.why) + '</p>' + tags(A.facts) +
          '<span class="lbl" style="margin-top:22px">' + esc(A.howTitle) + '</span>' + A.how.map(function (t) { return '<p class="body">' + esc(t) + '</p>'; }).join('') + '</section>' +
      '</div>' +
      people(S.home);
    initPeople(main);
  }

  /* ---------- boot ---------- */
  chrome();
  var main = document.getElementById('main');
  ({ home: home, case: caseStudy, project: project, about: about }[page] || home)(main);
  drawOnScroll();
  lightbox();
  doodles();
})();
