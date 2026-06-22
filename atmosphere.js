/* ============================================================
   atmosphere.js — Procedural Celestial Environment
   Full-viewport Canvas: gradient sky, cloud forms, luminous
   particles with additive blending, god-rays, mouse parallax.
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('atmosphere');
  if (!canvas) return;

  var ctx = canvas.getContext('2d', { alpha: false });
  var W, H;
  var mouseX = 0.5, mouseY = 0.5;
  var scrollY = 0;
  var frame = 0;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Exposed for script.js to shift atmosphere on scroll */
  window.atmosphereWarmth = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  /* ---- MOUSE TRACKING ---- */

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX / W;
    mouseY = e.clientY / H;
  });

  window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
  }, { passive: true });

  /* ---- CLOUD FORMS ---- */

  function Cloud(depthLayer) {
    this.depth = depthLayer;
    this.reset();
  }

  Cloud.prototype.reset = function () {
    this.x = Math.random() * 1.4 - 0.2;
    this.y = 0.15 + Math.random() * 0.55;
    this.radiusX = 0.08 + Math.random() * 0.18;
    this.radiusY = 0.03 + Math.random() * 0.07;
    this.opacity = 0.04 + Math.random() * 0.06;
    this.driftSpeed = (Math.random() - 0.5) * 0.00003;
  };

  Cloud.prototype.draw = function (ctx, W, H, parallaxX, parallaxY) {
    var px = this.x * W + parallaxX * this.depth * 60;
    var py = this.y * H + parallaxY * this.depth * 30;

    py -= scrollY * 0.02 * this.depth;

    var rx = this.radiusX * W;
    var ry = this.radiusY * H;

    var grad = ctx.createRadialGradient(px, py, 0, px, py, rx);
    grad.addColorStop(0, 'rgba(255, 255, 255, ' + (this.opacity * 1.5) + ')');
    grad.addColorStop(0.4, 'rgba(240, 245, 255, ' + this.opacity + ')');
    grad.addColorStop(1, 'rgba(230, 240, 255, 0)');

    ctx.save();
    ctx.scale(1, ry / rx);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py * (rx / ry), rx, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    this.x += this.driftSpeed;
    if (this.x > 1.3 || this.x < -0.3) this.driftSpeed *= -1;
  };

  var clouds = [];
  for (var c = 0; c < 10; c++) {
    clouds.push(new Cloud(0.3 + Math.random() * 0.7));
  }

  /* ---- LUMINOUS PARTICLES ---- */

  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : H + Math.random() * 100;
    this.radius = 0.8 + Math.random() * 4.5;
    this.baseRadius = this.radius;
    this.opacity = 0.15 + Math.random() * 0.45;
    this.baseOpacity = this.opacity;
    this.vy = -(0.15 + Math.random() * 0.5);
    this.vx = (Math.random() - 0.5) * 0.2;
    this.depth = 0.2 + Math.random() * 0.8;
    this.hue = 36 + Math.random() * 16;
    this.warmth = 60 + Math.random() * 20;
    this.lightness = 85 + Math.random() * 10;
    this.flareTimer = Math.floor(Math.random() * 400);
    this.targetOpacity = this.opacity;
    this.wobbleOffset = Math.random() * Math.PI * 2;
  };

  Particle.prototype.update = function (parallaxX, parallaxY) {
    this.y += this.vy;
    this.x += this.vx + Math.sin(frame * 0.002 + this.wobbleOffset) * 0.12;

    if (this.y < -20) this.reset(false);
    if (this.x < -20) this.x = W + 10;
    if (this.x > W + 20) this.x = -10;

    this.flareTimer++;
    if (this.flareTimer > 350 && Math.random() < 0.006) {
      this.targetOpacity = Math.min(0.85, this.baseOpacity * 3);
      this.radius = this.baseRadius * 1.6;
      this.flareTimer = 0;
    }

    this.opacity += (this.targetOpacity - this.opacity) * 0.03;
    this.radius += (this.baseRadius - this.radius) * 0.02;

    if (Math.abs(this.opacity - this.targetOpacity) < 0.02) {
      this.targetOpacity = this.baseOpacity;
    }
  };

  Particle.prototype.draw = function (ctx, parallaxX, parallaxY) {
    var px = this.x + parallaxX * this.depth * 40;
    var py = this.y + parallaxY * this.depth * 20;

    py -= scrollY * 0.015 * this.depth;

    if (py < -30 || py > H + 30 || px < -30 || px > W + 30) return;

    var r = this.radius;
    var glow = ctx.createRadialGradient(px, py, 0, px, py, r * 3);
    glow.addColorStop(0, 'hsla(' + this.hue + ', ' + this.warmth + '%, ' + this.lightness + '%, ' + this.opacity + ')');
    glow.addColorStop(0.3, 'hsla(' + this.hue + ', ' + this.warmth + '%, 95%, ' + (this.opacity * 0.5) + ')');
    glow.addColorStop(1, 'hsla(' + this.hue + ', ' + this.warmth + '%, 100%, 0)');

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(px, py, r * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'hsla(' + this.hue + ', ' + this.warmth + '%, 97%, ' + Math.min(1, this.opacity * 1.5) + ')';
    ctx.beginPath();
    ctx.arc(px, py, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  };

  var particles = [];
  var particleCount = Math.min(220, Math.max(80, Math.floor(W / 8)));
  for (var p = 0; p < particleCount; p++) {
    particles.push(new Particle());
  }

  /* ---- GOD-RAYS ---- */

  function GodRay(index) {
    this.angle = -0.4 + index * 0.35;
    this.width = 0.06 + Math.random() * 0.1;
    this.opacity = 0.015 + Math.random() * 0.02;
    this.speed = 0.00008 + Math.random() * 0.0001;
    this.phase = Math.random() * Math.PI * 2;
  }

  GodRay.prototype.draw = function (ctx, W, H) {
    var pulse = Math.sin(frame * this.speed + this.phase) * 0.5 + 0.5;
    var alpha = this.opacity * (0.5 + pulse * 0.5);

    var cx = W * 0.5;
    var cy = -H * 0.1;
    var len = Math.sqrt(W * W + H * H) * 1.2;
    var a = this.angle + Math.sin(frame * 0.0003 + this.phase) * 0.05;
    var hw = this.width * W * 0.5;

    var endX = cx + Math.cos(a) * len;
    var endY = cy + Math.sin(a + Math.PI * 0.5) * len;

    var perpX = -Math.sin(a) * hw;
    var perpY = Math.cos(a) * hw;

    var grad = ctx.createLinearGradient(cx, cy, endX, endY);
    grad.addColorStop(0, 'rgba(255, 250, 235, ' + alpha + ')');
    grad.addColorStop(0.5, 'rgba(255, 250, 235, ' + (alpha * 0.4) + ')');
    grad.addColorStop(1, 'rgba(255, 250, 235, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx - perpX * 0.3, cy - perpY * 0.3);
    ctx.lineTo(endX - perpX, endY - perpY);
    ctx.lineTo(endX + perpX, endY + perpY);
    ctx.lineTo(cx + perpX * 0.3, cy + perpY * 0.3);
    ctx.closePath();
    ctx.fill();
  };

  var godRays = [];
  for (var g = 0; g < 3; g++) {
    godRays.push(new GodRay(g));
  }

  /* ---- DRAW SKY GRADIENT ---- */

  function drawSky() {
    var warmth = window.atmosphereWarmth || 0;

    var coreR = 220 + warmth * 15;
    var coreG = 235 - warmth * 5;
    var coreB = 255 - warmth * 20;

    var edgeR = 235 + warmth * 10;
    var edgeG = 230 - warmth * 5;
    var edgeB = 240 - warmth * 15;

    var cx = W * 0.5 + (mouseX - 0.5) * 40;
    var cy = H * 0.3 + (mouseY - 0.5) * 20;

    cy -= scrollY * 0.05;

    var outerR = Math.max(W, H) * 0.9;

    var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR);
    grad.addColorStop(0, 'rgb(' + Math.floor(coreR) + ',' + Math.floor(coreG) + ',' + Math.floor(coreB) + ')');
    grad.addColorStop(0.25, 'rgb(' + Math.floor(coreR * 0.97) + ',' + Math.floor(coreG * 0.97) + ',' + Math.floor(coreB * 0.98) + ')');
    grad.addColorStop(0.6, 'rgb(' + Math.floor((coreR + edgeR) / 2) + ',' + Math.floor((coreG + edgeG) / 2) + ',' + Math.floor((coreB + edgeB) / 2) + ')');
    grad.addColorStop(1, 'rgb(' + Math.floor(edgeR) + ',' + Math.floor(edgeG) + ',' + Math.floor(edgeB) + ')');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    var centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, outerR * 0.4);
    centerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    centerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = centerGlow;
    ctx.fillRect(0, 0, W, H);
  }

  /* ---- MAIN RENDER LOOP ---- */

  function render() {
    var px = (mouseX - 0.5) * 2;
    var py = (mouseY - 0.5) * 2;

    drawSky();

    for (var c = 0; c < clouds.length; c++) {
      clouds[c].draw(ctx, W, H, px, py);
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (var g = 0; g < godRays.length; g++) {
      godRays[g].draw(ctx, W, H);
    }
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (var i = 0; i < particles.length; i++) {
      particles[i].update(px, py);
      particles[i].draw(ctx, px, py);
    }
    ctx.restore();

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
