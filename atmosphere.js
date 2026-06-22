/* ============================================================
   atmosphere.js — Procedural Celestial Environment
   Canvas is transparent (alpha: true) so sky.mp4 video shows
   through underneath. Canvas layers: subtle sky overlay,
   impressionistic cloud forms, luminous additive particles,
   5 animated god-rays fanning from center-top.
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('atmosphere');
  if (!canvas) return;

  /* alpha: true — canvas is transparent, video beneath shows through */
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
    this.y = 0.1 + Math.random() * 0.5;
    this.radiusX = 0.08 + Math.random() * 0.18;
    this.radiusY = 0.03 + Math.random() * 0.07;
    this.opacity = 0.06 + Math.random() * 0.08;
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
    this.opacity = 0.18 + Math.random() * 0.45;
    this.baseOpacity = this.opacity;
    this.vy = -(0.15 + Math.random() * 0.5);
    this.vx = (Math.random() - 0.5) * 0.2;
    this.depth = 0.2 + Math.random() * 0.8;
    this.hue = 200 + Math.random() * 40;  /* sky blue hue range */
    this.warmth = 40 + Math.random() * 30;
    this.lightness = 80 + Math.random() * 15;
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

    ctx.fillStyle = 'hsla(' + this.hue + ', 20%, 97%, ' + Math.min(1, this.opacity * 1.5) + ')';
    ctx.beginPath();
    ctx.arc(px, py, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
  };

  var particles = [];
  var particleCount = Math.min(220, Math.max(100, Math.floor(W / 8)));
  for (var p = 0; p < particleCount; p++) {
    particles.push(new Particle());
  }

  /* ---- GOD-RAYS ---- */
  /* 5 rays fanning symmetrically from center-top */

  var RAY_ANGLES = [-0.6, -0.3, 0, 0.3, 0.6];

  function GodRay(index) {
    this.angle = RAY_ANGLES[index];
    this.width = 0.08 + Math.random() * 0.12;
    this.opacity = 0.025 + Math.random() * 0.03;
    this.speed = 0.00006 + Math.random() * 0.00012;
    this.phase = Math.random() * Math.PI * 2;
  }

  GodRay.prototype.draw = function (ctx, W, H) {
    var pulse = Math.sin(frame * this.speed + this.phase) * 0.5 + 0.5;
    var alpha = this.opacity * (0.5 + pulse * 0.5);

    /* Source: slightly above center-top of viewport */
    var cx = W * 0.5;
    var cy = -H * 0.05;
    var len = Math.sqrt(W * W + H * H) * 1.3;

    /* Gently sway each ray independently */
    var a = this.angle + Math.sin(frame * 0.0004 + this.phase) * 0.06;

    /* Width of the ray at its base */
    var hw = this.width * W * 0.5;

    /* Ray direction vector */
    var dirX = Math.sin(a);
    var dirY = Math.cos(a);

    var endX = cx + dirX * len;
    var endY = cy + dirY * len;

    /* Perpendicular to direction */
    var perpX = -dirY * hw;
    var perpY = dirX * hw;

    var grad = ctx.createLinearGradient(cx, cy, endX, endY);
    grad.addColorStop(0,   'rgba(220, 240, 255, ' + alpha + ')');
    grad.addColorStop(0.4, 'rgba(200, 230, 255, ' + (alpha * 0.5) + ')');
    grad.addColorStop(1,   'rgba(180, 220, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(cx - perpX * 0.2, cy - perpY * 0.2);
    ctx.lineTo(endX - perpX, endY - perpY);
    ctx.lineTo(endX + perpX, endY + perpY);
    ctx.lineTo(cx + perpX * 0.2, cy + perpY * 0.2);
    ctx.closePath();
    ctx.fill();
  };

  var godRays = [];
  for (var g = 0; g < 5; g++) {
    godRays.push(new GodRay(g));
  }

  /* ---- SKY OVERLAY ---- */
  /* Subtle central brightness glow only — video shows through canvas */

  function drawSkyOverlay() {
    var warmth = window.atmosphereWarmth || 0;
    var cx = W * 0.5 + (mouseX - 0.5) * 40;
    var cy = H * 0.3 + (mouseY - 0.5) * 20 - scrollY * 0.05;

    /* Subtle white centre bloom */
    var bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.55);
    bloom.addColorStop(0, 'rgba(255, 255, 255, ' + (0.12 + warmth * 0.06) + ')');
    bloom.addColorStop(0.5, 'rgba(220, 235, 255, ' + (0.05 + warmth * 0.03) + ')');
    bloom.addColorStop(1, 'rgba(200, 220, 255, 0)');
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, W, H);
  }

  /* ---- MAIN RENDER LOOP ---- */

  function render() {
    var px = (mouseX - 0.5) * 2;
    var py = (mouseY - 0.5) * 2;

    /* Clear to transparent so sky.mp4 video beneath shows through */
    ctx.clearRect(0, 0, W, H);

    drawSkyOverlay();

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
