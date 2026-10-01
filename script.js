/* ============================================
   ANNANAHMED SHAIKH — Portfolio Logic
   Custom Cursor · Hero Canvas · Typing · Reveal · Playground
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeroCanvas();
  initTypingEffect();
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initPlayground();
});

/* ==========================================
   1. CUSTOM CURSOR
   ========================================== */
function initCustomCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect
  document.querySelectorAll('a, button, .proj-card, .jstep-card, .exp-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/* ==========================================
   2. HERO CANVAS — Constellation
   ========================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -9999, y: -9999, radius: 130 };

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  class Star {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.4 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Mouse repulsion
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= dx * force * 0.015;
        this.y -= dy * force * 0.015;
      }

      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 191, 36, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = [];
    for (let i = 0; i < count; i++) particles.push(new Star());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          const alpha = ((110 - d) / 110) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(251, 191, 36, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();
}

/* ==========================================
   3. TYPING EFFECT
   ========================================== */
const PHRASES = [
  'Machine Learning & Data Analytics Engineer',
  'Published Researcher @ Interspeech 2026',
  'State-Space Models (Mamba / S5) · PyTorch',
  'MS Data Science — 4.0 GPA · Wentworth',
  'Building AI Systems That Actually Work',
];

let phraseIdx  = 0;
let charIdx    = 0;
let deleting   = false;
let speed      = 55;

function initTypingEffect() { typeLoop(); }

function typeLoop() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrase = PHRASES[phraseIdx % PHRASES.length];

  if (deleting) {
    el.textContent = phrase.substring(0, charIdx - 1);
    charIdx--;
    speed = 22;
  } else {
    el.textContent = phrase.substring(0, charIdx + 1);
    charIdx++;
    speed = 55;
  }

  if (!deleting && charIdx === phrase.length) { speed = 2400; deleting = true; }
  else if (deleting && charIdx === 0) {
    deleting = false;
    phraseIdx = (phraseIdx + 1) % PHRASES.length;
    speed = 380;
  }
  setTimeout(typeLoop, speed);
}

/* ==========================================
   4. NAVBAR
   ========================================== */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 60);
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }
}

/* ==========================================
   5. SCROLL REVEAL
   ========================================== */
function initScrollReveal() {
  const selectors = '.reveal-up, .reveal-left, .reveal-right, .exp-card';
  const elements  = document.querySelectorAll(selectors);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -30px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================
   6. SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ==========================================
   7. NEURAL NETWORK PLAYGROUND
   ========================================== */
function initPlayground() {
  const canvas = document.getElementById('playground-canvas');
  if (!canvas) return;

  const ctx          = canvas.getContext('2d');
  const epochDisplay = document.getElementById('epochDisplay');
  const lossDisplay  = document.getElementById('lossDisplay');
  const trainBtn     = document.getElementById('trainBtn');
  const resetBtn     = document.getElementById('resetBtn');
  const classABtn    = document.getElementById('classABtn');
  const classBBtn    = document.getElementById('classBBtn');

  let selectedClass = 'A';
  let dataPoints    = [];
  let network       = null;
  let training      = false;
  let epoch         = 0;
  let animId        = null;

  function resizeCanvas() {
    const rect  = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width;
    canvas.height = 420;
    drawScene();
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  classABtn.addEventListener('click', () => {
    selectedClass = 'A';
    classABtn.classList.add('active');
    classBBtn.classList.remove('active');
  });
  classBBtn.addEventListener('click', () => {
    selectedClass = 'B';
    classBBtn.classList.add('active');
    classABtn.classList.remove('active');
  });

  canvas.addEventListener('click', (e) => {
    if (training) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / canvas.width;
    const y = (e.clientY - rect.top)  / canvas.height;
    dataPoints.push({ x, y, label: selectedClass === 'A' ? 0 : 1 });
    drawScene();
  });

  trainBtn.addEventListener('click', () => {
    if (dataPoints.length < 2) return;
    if (training) {
      training = false;
      setTrainBtnState(false);
      if (animId) cancelAnimationFrame(animId);
      return;
    }
    const hasA = dataPoints.some(p => p.label === 0);
    const hasB = dataPoints.some(p => p.label === 1);
    if (!hasA || !hasB) return;

    training = true;
    epoch    = 0;
    network  = createNetwork();
    setTrainBtnState(true);
    trainLoop();
  });

  resetBtn.addEventListener('click', () => {
    training    = false;
    dataPoints  = [];
    network     = null;
    epoch       = 0;
    epochDisplay.textContent = 'Epoch: 0';
    lossDisplay.textContent  = 'Loss: —';
    setTrainBtnState(false);
    if (animId) cancelAnimationFrame(animId);
    drawScene();
  });

  function setTrainBtnState(isTraining) {
    if (isTraining) {
      trainBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`;
    } else {
      trainBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Train Network`;
    }
  }

  // --- Network ---
  function createNetwork() {
    const r = (fi, fo) => (Math.random() * 2 - 1) * Math.sqrt(6 / (fi + fo));
    const h1 = 8, h2 = 8;
    return {
      w1: Array.from({ length: h1 }, () => [r(2, h1), r(2, h1)]),
      b1: new Array(h1).fill(0),
      w2: Array.from({ length: h2 }, () => Array.from({ length: h1 }, () => r(h1, h2))),
      b2: new Array(h2).fill(0),
      w3: Array.from({ length: h2 }, () => r(h2, 1)),
      b3: 0,
    };
  }

  const sigmoid  = x => 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, x))));
  const relu     = x => Math.max(0, x);
  const reluD    = x => x > 0 ? 1 : 0;

  function forward(net, x, y) {
    const h1 = net.w1.map((w, i) => relu(w[0] * x + w[1] * y + net.b1[i]));
    const h2 = net.w2.map((w, i) => {
      let s = net.b2[i];
      for (let j = 0; j < h1.length; j++) s += w[j] * h1[j];
      return relu(s);
    });
    let out = net.b3;
    for (let i = 0; i < h2.length; i++) out += net.w3[i] * h2[i];
    return { h1, h2, out: sigmoid(out) };
  }

  function trainStep(net, lr) {
    let totalLoss = 0;
    const idx = dataPoints.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    for (const id of idx) {
      const p = dataPoints[id];
      const { h1, h2, out } = forward(net, p.x, p.y);
      const t = p.label;
      const c = Math.max(1e-7, Math.min(1 - 1e-7, out));
      totalLoss += -(t * Math.log(c) + (1 - t) * Math.log(1 - c));

      const dOut = out - t;
      const dw3  = h2.map(h => dOut * h);
      const db3  = dOut;
      const dh2  = net.w3.map(w => dOut * w);

      const dw2 = net.w2.map((w, i) => {
        const pre = net.b2[i] + w.reduce((s, wj, j) => s + wj * h1[j], 0);
        const dr  = reluD(pre) * dh2[i];
        return h1.map(h => dr * h);
      });
      const db2 = net.w2.map((w, i) => {
        const pre = net.b2[i] + w.reduce((s, wj, j) => s + wj * h1[j], 0);
        return reluD(pre) * dh2[i];
      });

      const dh1 = h1.map((_, j) => {
        let g = 0;
        for (let i = 0; i < net.w2.length; i++) {
          const pre = net.b2[i] + net.w2[i].reduce((s, wk, k) => s + wk * h1[k], 0);
          g += reluD(pre) * dh2[i] * net.w2[i][j];
        }
        return g;
      });

      const dw1 = net.w1.map((w, i) => {
        const pre = w[0] * p.x + w[1] * p.y + net.b1[i];
        const dr  = reluD(pre) * dh1[i];
        return [dr * p.x, dr * p.y];
      });
      const db1 = net.w1.map((w, i) => {
        const pre = w[0] * p.x + w[1] * p.y + net.b1[i];
        return reluD(pre) * dh1[i];
      });

      for (let i = 0; i < net.w3.length; i++) net.w3[i] -= lr * dw3[i];
      net.b3 -= lr * db3;
      for (let i = 0; i < net.w2.length; i++) {
        for (let j = 0; j < net.w2[i].length; j++) net.w2[i][j] -= lr * dw2[i][j];
        net.b2[i] -= lr * db2[i];
      }
      for (let i = 0; i < net.w1.length; i++) {
        net.w1[i][0] -= lr * dw1[i][0];
        net.w1[i][1] -= lr * dw1[i][1];
        net.b1[i]    -= lr * db1[i];
      }
    }
    return totalLoss / dataPoints.length;
  }

  function trainLoop() {
    if (!training) return;
    let loss = 0;
    for (let i = 0; i < 12; i++) { loss = trainStep(network, 0.5); epoch++; }
    epochDisplay.textContent = `Epoch: ${epoch}`;
    lossDisplay.textContent  = `Loss: ${loss.toFixed(4)}`;
    drawScene();
    animId = requestAnimationFrame(trainLoop);
  }

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (network) {
      const res = 4;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let py = 0; py < canvas.height; py += res) {
        for (let px = 0; px < canvas.width; px += res) {
          const { out } = forward(network, px / canvas.width, py / canvas.height);
          const r = Math.round(96  + (251 - 96)  * out);
          const g = Math.round(165 + (146 - 165) * out);
          const b = Math.round(250 + (22  - 250) * out);
          for (let dy = 0; dy < res && py + dy < canvas.height; dy++) {
            for (let dx = 0; dx < res && px + dx < canvas.width; dx++) {
              const i = ((py + dy) * canvas.width + (px + dx)) * 4;
              img.data[i]     = r;
              img.data[i + 1] = g;
              img.data[i + 2] = b;
              img.data[i + 3] = 45;
            }
          }
        }
      }
      ctx.putImageData(img, 0, 0);
      drawContour(0.5);
    }

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 44) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 44) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Points
    dataPoints.forEach(p => {
      const px = p.x * canvas.width;
      const py = p.y * canvas.height;
      const isA = p.label === 0;

      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.fillStyle = isA ? 'rgba(96, 165, 250, 0.12)' : 'rgba(251, 146, 60, 0.12)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = isA ? '#60a5fa' : '#fb923c';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    if (dataPoints.length === 0 && !network) {
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click anywhere to add data points', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.font = '400 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Select Class A or B above, then click', canvas.width / 2, canvas.height / 2 + 14);
    }
  }

  function drawContour(threshold) {
    const step = 6;
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
    ctx.lineWidth = 1.5;
    for (let py = 0; py < canvas.height - step; py += step) {
      for (let px = 0; px < canvas.width - step; px += step) {
        const v00 = forward(network, px / canvas.width, py / canvas.height).out;
        const v10 = forward(network, (px + step) / canvas.width, py / canvas.height).out;
        const v01 = forward(network, px / canvas.width, (py + step) / canvas.height).out;
        const v11 = forward(network, (px + step) / canvas.width, (py + step) / canvas.height).out;
        marchingSquare(px, py, step, v00, v10, v01, v11, threshold).forEach(([x1,y1,x2,y2]) => {
          ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
        });
      }
    }
  }

  function marchingSquare(x, y, s, v00, v10, v01, v11, t) {
    const lines = [];
    const code = (v00 >= t ? 8 : 0) | (v10 >= t ? 4 : 0) | (v11 >= t ? 2 : 0) | (v01 >= t ? 1 : 0);
    const lerp = (a, b, va, vb) => a + (t - va) / (vb - va) * (b - a);
    const top    = [lerp(x, x+s, v00, v10), y];
    const bottom = [lerp(x, x+s, v01, v11), y+s];
    const left   = [x, lerp(y, y+s, v00, v01)];
    const right  = [x+s, lerp(y, y+s, v10, v11)];
    switch (code) {
      case 1: case 14: lines.push([left[0],left[1],bottom[0],bottom[1]]); break;
      case 2: case 13: lines.push([bottom[0],bottom[1],right[0],right[1]]); break;
      case 3: case 12: lines.push([left[0],left[1],right[0],right[1]]); break;
      case 4: case 11: lines.push([top[0],top[1],right[0],right[1]]); break;
      case 5:
        lines.push([left[0],left[1],top[0],top[1]]);
        lines.push([bottom[0],bottom[1],right[0],right[1]]);
        break;
      case 6: case 9:  lines.push([top[0],top[1],bottom[0],bottom[1]]); break;
      case 7: case 8:  lines.push([left[0],left[1],top[0],top[1]]); break;
      case 10:
        lines.push([left[0],left[1],bottom[0],bottom[1]]);
        lines.push([top[0],top[1],right[0],right[1]]);
        break;
    }
    return lines;
  }

  drawScene();
}
