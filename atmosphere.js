/* ============================================================
   atmosphere.js — The White Room
   An overexposed, blinding-white environment. Depth comes from
   light behavior, not color: a breathing overexposure bloom,
   dust motes suspended in intense light, wide slow light sheets,
   and two barely-visible iridescent washes that give the glass
   panels' backdrop-filter something real to refract.
   Canvas is transparent (alpha: true); sky.mp4 sits above it
   on the homepage and fades out on scroll.
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
  /* Two huge, ultra-faint color fields drifting very slowly.
     Nearly invisible on the white field directly, but the glass
     panels' backdrop-filter (blur + saturate) amplifies them —
     this is what makes the glass read as glass. */

  function Wash(hue, phase) {
    this.hue = hue;          /* drifts slowly over time */
    this.phase = phase;
    this.alpha = 0.12;
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
    new Wash(190, 0),              /* cyan drifting toward blue */
    new Wash(280, Math.PI * 0.9)   /* violet drifting toward rose */
  ];

  /* ---- DUST MOTES ---- */
  /* Tiny specks suspended in blinding light. Sub-pixel to 1.4px,
     very low opacity, slow drift with gentle twinkle. Replaces
     the old "bubble" particles entirely. */

  function Mote() {
    this.reset(true);
  }

  Mote.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : H + 4;
    this.r = 0.4 + Math.random() * 1.0;
    this.baseA = 0.05 + Math.random() * 0.10;
    this.vy = -(0.04 + Math.random() * 0.12);
    this.vx = (Math.random() - 0.5) * 0.06;
    this.depth = 0.2 + Math.random() * 0.8;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = 0.008 + Math.random() * 0.02;
  };

  Mote.prototype.update = function () {
    this.y += this.vy;
    this.x += this.vx + Math.sin(frame * 0.0015 + this.twinklePhase) * 0.04;
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

    ctx.fillStyle = 'rgba(140, 160, 190, ' + a + ')';
    ctx.beginPath();
    ctx.arc(px, py, this.r, 0, Math.PI * 2);
    ctx.fill();
  };

  var motes = [];
  var moteCount = Math.min(90, Math.max(40, Math.floor(W / 22)));
  for (var m = 0; m < moteCount; m++) {
    motes.push(new Mote());
  }

  /* ---- LIGHT SHEETS ---- */
  /* Three wide, slow sheets of brighter white pouring from above.
     Drawn with 'lighter' so they read as overexposure, not haze. */

  var SHEET_ANGLES = [-0.42, 0, 0.42];

  function Sheet(index) {
    this.angle = SHEET_ANGLES[index];
    this.width = 0.2 + Math.random() * 0.15;
    this.opacity = 0.035 + Math.random() * 0.025;
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

  /* ---- THE WHITE FIELD ---- */
  /* Pure white base with a breathing overexposure bloom at
     top-center and the faintest cool recession at the far
     corners — the "walls dissolving into light" depth cue. */

  function drawField() {
    var warmth = window.atmosphereWarmth || 0;

    /* Base: pure white. The canvas owns the background now. */
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    /* Corner recession — cool grade toward the edges, so the field
       reads as a lit space with depth, not a flat void. The center
       stays blinding; the periphery recedes. */
    var corner = ctx.createRadialGradient(
      W * 0.5, H * 0.32, Math.min(W, H) * 0.22,
      W * 0.5, H * 0.5, Math.max(W, H) * 0.95
    );
    corner.addColorStop(0, 'rgba(233, 240, 249, 0)');
    corner.addColorStop(0.65, 'rgba(228, 236, 247, ' + (0.4 - warmth * 0.15) + ')');
    corner.addColorStop(1, 'rgba(216, 227, 242, ' + (0.85 - warmth * 0.25) + ')');
    ctx.fillStyle = corner;
    ctx.fillRect(0, 0, W, H);

    /* Overexposure bloom — breathes slowly, follows the mouse a little */
    var breathe = Math.sin(frame * 0.004) * 0.5 + 0.5;
    var cx = W * 0.5 + (mouseX - 0.5) * 30;
    var cy = H * 0.22 + (mouseY - 0.5) * 16 - scrollY * 0.04;
    var bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
    bloom.addColorStop(0, 'rgba(255, 255, 255, ' + (0.5 + breathe * 0.2) + ')');
    bloom.addColorStop(0.55, 'rgba(255, 255, 255, ' + (0.18 + breathe * 0.08) + ')');
    bloom.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, W, H);

    /* Warmth shift (driven by scroll position via script.js):
       an amber whisper, used near the door section */
    if (warmth > 0.01) {
      var warm = ctx.createRadialGradient(W * 0.5, H * 0.8, 0, W * 0.5, H * 0.8, Math.max(W, H) * 0.8);
      warm.addColorStop(0, 'rgba(255, 244, 228, ' + (warmth * 0.1) + ')');
      warm.addColorStop(1, 'rgba(255, 244, 228, 0)');
      ctx.fillStyle = warm;
      ctx.fillRect(0, 0, W, H);
    }
  }

  /* ---- MAIN RENDER LOOP ---- */

  function render() {
    var px = (mouseX - 0.5) * 2;
    var py = (mouseY - 0.5) * 2;

    drawField();

    /* Iridescent washes — beneath everything else, for the glass to refract */
    for (var w = 0; w < washes.length; w++) {
      washes[w].draw(ctx, W, H);
    }

    /* Light sheets — additive, overexposure */
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < sheets.length; i++) {
      sheets[i].draw(ctx, W, H);
    }
    ctx.restore();

    /* Dust motes in the light */
    for (var j = 0; j < motes.length; j++) {
      motes[j].update();
      motes[j].draw(ctx, px, py);
    }

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
