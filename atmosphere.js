/* ============================================================
   atmosphere.js — Living Light Layer
   A transparent canvas riding ABOVE the persistent sky video
   (video z-index 0, canvas z-index 1, content z-index 2+).
   It adds what raw video can't: dust motes suspended in light,
   wide additive light sheets pouring from above, and two
   ultra-faint iridescent washes that the glass panels'
   backdrop-filter picks up and bends.
   The video is the environment. This layer is the life in it.
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('atmosphere');
  if (!canvas) return;

  var ctx = canvas.getContext('2d', { alpha: true });
  var W, H;
  var mouseX = 0.5, mouseY = 0.5;
  var scrollY = 0;
  var frame = 0;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.atmosphereWarmth = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX / W;
    mouseY = e.clientY / H;
  });

  window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
  }, { passive: true });

  /* ---- IRIDESCENT WASHES ---- */
  /* Two huge, very faint color fields drifting slowly across the
     view. Nearly invisible directly, but the glass panels'
     saturate() amplifies them into visible refraction. */

  function Wash(hue, phase) {
    this.hue = hue;
    this.phase = phase;
    this.alpha = 0.07;
  }

  Wash.prototype.draw = function (ctx, W, H) {
    var t = frame * 0.00012 + this.phase;
    var cx = W * (0.5 + Math.sin(t) * 0.38);
    var cy = H * (0.45 + Math.cos(t * 0.7) * 0.3) - scrollY * 0.04;
    var r = Math.max(W, H) * 0.5;
    var hue = this.hue + Math.sin(frame * 0.00008 + this.phase) * 30;

    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, 'hsla(' + hue + ', 70%, 82%, ' + this.alpha + ')');
    g.addColorStop(0.6, 'hsla(' + (hue + 20) + ', 60%, 88%, ' + (this.alpha * 0.5) + ')');
    g.addColorStop(1, 'hsla(' + (hue + 40) + ', 50%, 92%, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  };

  var washes = [
    new Wash(190, 0),
    new Wash(280, Math.PI * 0.9)
  ];

  /* ---- DUST MOTES ---- */
  /* Tiny bright specks drifting up through the light — visible
     against the video as catching sunlight. */

  function Mote() {
    this.reset(true);
  }

  Mote.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : H + 4;
    this.r = 0.5 + Math.random() * 1.3;
    this.baseA = 0.10 + Math.random() * 0.22;
    this.vy = -(0.05 + Math.random() * 0.14);
    this.vx = (Math.random() - 0.5) * 0.08;
    this.depth = 0.2 + Math.random() * 0.8;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = 0.008 + Math.random() * 0.02;
  };

  Mote.prototype.update = function () {
    this.y += this.vy;
    this.x += this.vx + Math.sin(frame * 0.0015 + this.twinklePhase) * 0.05;
    if (this.y < -6) this.reset(false);
    if (this.x < -6) this.x = W + 4;
    if (this.x > W + 6) this.x = -4;
  };

  Mote.prototype.draw = function (ctx, parallaxX, parallaxY) {
    var px = this.x + parallaxX * this.depth * 24;
    var py = this.y + parallaxY * this.depth * 12 - scrollY * 0.012 * this.depth;
    if (py < -8 || py > H + 8) return;

    var tw = 0.6 + 0.4 * Math.sin(frame * this.twinkleSpeed + this.twinklePhase);
    var a = this.baseA * tw;

    /* bright core + tiny glow — reads as sunlit dust over video */
    var glow = ctx.createRadialGradient(px, py, 0, px, py, this.r * 3);
    glow.addColorStop(0, 'rgba(255, 255, 255, ' + a + ')');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(px, py, this.r * 3, 0, Math.PI * 2);
    ctx.fill();
  };

  var motes = [];
  var moteCount = Math.min(90, Math.max(40, Math.floor(W / 22)));
  for (var m = 0; m < moteCount; m++) {
    motes.push(new Mote());
  }

  /* ---- LIGHT SHEETS ---- */
  /* Wide, slow sheets of light pouring from above — additive,
     so they read as sun breaking through, moving independently
     of the video's own clouds. */

  var SHEET_ANGLES = [-0.42, 0, 0.42];

  function Sheet(index) {
    this.angle = SHEET_ANGLES[index];
    this.width = 0.2 + Math.random() * 0.15;
    this.opacity = 0.05 + Math.random() * 0.035;
    this.speed = 0.00004 + Math.random() * 0.00008;
    this.phase = Math.random() * Math.PI * 2;
  }

  Sheet.prototype.draw = function (ctx, W, H) {
    var pulse = Math.sin(frame * this.speed * 8 + this.phase) * 0.5 + 0.5;
    var alpha = this.opacity * (0.4 + pulse * 0.6);

    var cx = W * 0.5;
    var cy = -H * 0.08;
    var len = Math.sqrt(W * W + H * H) * 1.3;
    var a = this.angle + Math.sin(frame * 0.0003 + this.phase) * 0.04;
    var hw = this.width * W * 0.5;

    var dirX = Math.sin(a);
    var dirY = Math.cos(a);
    var endX = cx + dirX * len;
    var endY = cy + dirY * len;
    var perpX = -dirY * hw;
    var perpY = dirX * hw;

    var grad = ctx.createLinearGradient(cx, cy, endX, endY);
    grad.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, ' + (alpha * 0.4) + ')');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx - perpX * 0.25, cy - perpY * 0.25);
    ctx.lineTo(endX - perpX, endY - perpY);
    ctx.lineTo(endX + perpX, endY + perpY);
    ctx.lineTo(cx + perpX * 0.25, cy + perpY * 0.25);
    ctx.closePath();
    ctx.fill();
  };

  var sheets = [];
  for (var s = 0; s < SHEET_ANGLES.length; s++) {
    sheets.push(new Sheet(s));
  }

  /* ---- WARMTH (scroll-driven, set by script.js) ---- */

  function drawWarmth() {
    var warmth = window.atmosphereWarmth || 0;
    if (warmth > 0.01) {
      var warm = ctx.createRadialGradient(W * 0.5, H * 0.8, 0, W * 0.5, H * 0.8, Math.max(W, H) * 0.8);
      warm.addColorStop(0, 'rgba(255, 244, 228, ' + (warmth * 0.12) + ')');
      warm.addColorStop(1, 'rgba(255, 244, 228, 0)');
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, W, H);
    }
  }

  /* ---- MAIN RENDER LOOP ---- */

  function render() {
    var px = (mouseX - 0.5) * 2;
    var py = (mouseY - 0.5) * 2;

    /* Transparent clear — the video beneath is the environment */
    ctx.clearRect(0, 0, W, H);

    for (var w = 0; w < washes.length; w++) {
      washes[w].draw(ctx, W, H);
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < sheets.length; i++) {
      sheets[i].draw(ctx, W, H);
    }
    ctx.restore();

    for (var j = 0; j < motes.length; j++) {
      motes[j].update();
      motes[j].draw(ctx, px, py);
    }

    drawWarmth();

    frame++;

    if (!prefersReduced) {
      requestAnimationFrame(render);
    }
  }

  if (prefersReduced) {
    render();
  } else {
    requestAnimationFrame(render);
  }

})();
