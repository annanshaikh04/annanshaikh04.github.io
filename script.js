/* ============================================
   ANNANAHMED SHAIKH — Portfolio Interactivity
   Includes: Neural Network Playground & Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initNavbar();
  initScrollReveal();
  initPlayground();
  initSmoothScroll();
});

/* ---------- Subtle Particle Canvas ---------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null, radius: 100 };

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.05;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= dx * force * 0.015;
          this.y -= dy * force * 0.015;
        }
      }

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function createParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const opacity = ((100 - dist) / 100) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animate);
  }

  createParticles();
  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createParticles, 250);
  });
}

/* ---------- Typing Effect ---------- */
function initTypingEffect() {
  const element = document.getElementById('typed-text');
  if (!element) return;

  const phrases = [
    'Solutions Engineer & Pre-Sales Consultant',
    'AI & Machine Learning Specialist',
    'MS Data Science (4.0 GPA) · Interspeech Author',
    'Full Stack Data Science & POC Architecture',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 50;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 25;
    } else {
      element.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 50;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 800);
}

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================
   NEURAL NETWORK PLAYGROUND
   A tiny 2-layer neural network that learns
   a 2D decision boundary in real-time.
   ============================================ */
function initPlayground() {
  const canvas = document.getElementById('playground-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const epochDisplay = document.getElementById('epochDisplay');
  const lossDisplay = document.getElementById('lossDisplay');
  const trainBtn = document.getElementById('trainBtn');
  const resetBtn = document.getElementById('resetBtn');
  const classABtn = document.getElementById('classABtn');
  const classBBtn = document.getElementById('classBBtn');

  let selectedClass = 'A';
  let dataPoints = [];
  let network = null;
  let training = false;
  let epoch = 0;
  let animFrameId = null;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 400;
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
    const y = (e.clientY - rect.top) / canvas.height;
    dataPoints.push({ x, y, label: selectedClass === 'A' ? 0 : 1 });
    drawScene();
  });

  trainBtn.addEventListener('click', () => {
    if (dataPoints.length < 2) return;
    if (training) {
      training = false;
      trainBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Train';
      if (animFrameId) cancelAnimationFrame(animFrameId);
      return;
    }

    const hasA = dataPoints.some(p => p.label === 0);
    const hasB = dataPoints.some(p => p.label === 1);
    if (!hasA || !hasB) return;

    training = true;
    epoch = 0;
    network = createNetwork();
    trainBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause';
    trainLoop();
  });

  resetBtn.addEventListener('click', () => {
    training = false;
    dataPoints = [];
    network = null;
    epoch = 0;
    epochDisplay.textContent = 'Epoch: 0';
    lossDisplay.textContent = 'Loss: —';
    trainBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Train';
    if (animFrameId) cancelAnimationFrame(animFrameId);
    drawScene();
  });

  function createNetwork() {
    const rand = (fan_in, fan_out) => (Math.random() * 2 - 1) * Math.sqrt(6 / (fan_in + fan_out));
    const h1 = 8, h2 = 8;
    return {
      w1: Array.from({ length: h1 }, () => [rand(2, h1), rand(2, h1)]),
      b1: new Array(h1).fill(0),
      w2: Array.from({ length: h2 }, () => Array.from({ length: h1 }, () => rand(h1, h2))),
      b2: new Array(h2).fill(0),
      w3: Array.from({ length: h2 }, () => rand(h2, 1)),
      b3: 0,
    };
  }

  const sigmoid = x => 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, x))));
  const relu = x => Math.max(0, x);
  const reluDeriv = x => x > 0 ? 1 : 0;

  function forward(net, x, y) {
    const h1 = net.w1.map((w, i) => relu(w[0] * x + w[1] * y + net.b1[i]));
    const h2 = net.w2.map((w, i) => {
      let sum = net.b2[i];
      for (let j = 0; j < h1.length; j++) sum += w[j] * h1[j];
      return relu(sum);
    });
    let out = net.b3;
    for (let i = 0; i < h2.length; i++) out += net.w3[i] * h2[i];
    return { h1, h2, out: sigmoid(out), raw: out };
  }

  function trainStep(net, lr) {
    let totalLoss = 0;
    const indices = dataPoints.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    for (const idx of indices) {
      const p = dataPoints[idx];
      const { h1, h2, out } = forward(net, p.x, p.y);
      const target = p.label;
      const clippedOut = Math.max(1e-7, Math.min(1 - 1e-7, out));
      totalLoss += -(target * Math.log(clippedOut) + (1 - target) * Math.log(1 - clippedOut));

      const dOut = out - target;
      const dw3 = h2.map(h => dOut * h);
      const db3 = dOut;
      const dh2 = net.w3.map(w => dOut * w);

      const dw2 = net.w2.map((w, i) => {
        const pre = net.b2[i] + w.reduce((s, wj, j) => s + wj * h1[j], 0);
        const dr = reluDeriv(pre) * dh2[i];
        return h1.map(h => dr * h);
      });
      const db2 = net.w2.map((w, i) => {
        const pre = net.b2[i] + w.reduce((s, wj, j) => s + wj * h1[j], 0);
        return reluDeriv(pre) * dh2[i];
      });

      const dh1 = h1.map((_, j) => {
        let grad = 0;
        for (let i = 0; i < net.w2.length; i++) {
          const pre = net.b2[i] + net.w2[i].reduce((s, wk, k) => s + wk * h1[k], 0);
          grad += reluDeriv(pre) * dh2[i] * net.w2[i][j];
        }
        return grad;
      });

      const dw1 = net.w1.map((w, i) => {
        const pre = w[0] * p.x + w[1] * p.y + net.b1[i];
        const dr = reluDeriv(pre) * dh1[i];
        return [dr * p.x, dr * p.y];
      });
      const db1 = net.w1.map((w, i) => {
        const pre = w[0] * p.x + w[1] * p.y + net.b1[i];
        return reluDeriv(pre) * dh1[i];
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
        net.b1[i] -= lr * db1[i];
      }
    }
    return totalLoss / dataPoints.length;
  }

  function trainLoop() {
    if (!training) return;
    let loss = 0;
    for (let i = 0; i < 10; i++) {
      loss = trainStep(network, 0.5);
      epoch++;
    }
    epochDisplay.textContent = `Epoch: ${epoch}`;
    lossDisplay.textContent = `Loss: ${loss.toFixed(4)}`;
    drawScene();
    animFrameId = requestAnimationFrame(trainLoop);
  }

  function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (network) {
      const resolution = 4;
      const imgData = ctx.createImageData(canvas.width, canvas.height);

      for (let py = 0; py < canvas.height; py += resolution) {
        for (let px = 0; px < canvas.width; px += resolution) {
          const nx = px / canvas.width;
          const ny = py / canvas.height;
          const { out } = forward(network, nx, ny);

          const r = Math.round(59 + (249 - 59) * out);
          const g = Math.round(130 + (115 - 130) * out);
          const b = Math.round(246 + (22 - 246) * out);
          const alpha = 40;

          for (let dy = 0; dy < resolution && py + dy < canvas.height; dy++) {
            for (let dx = 0; dx < resolution && px + dx < canvas.width; dx++) {
              const idx = ((py + dy) * canvas.width + (px + dx)) * 4;
              imgData.data[idx] = r;
              imgData.data[idx + 1] = g;
              imgData.data[idx + 2] = b;
              imgData.data[idx + 3] = alpha;
            }
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
      drawContour(0.5);
    }

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // Data points
    dataPoints.forEach(p => {
      const px = p.x * canvas.width;
      const py = p.y * canvas.height;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 0 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(249, 115, 22, 0.15)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 0 ? '#3b82f6' : '#f97316';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    if (dataPoints.length === 0 && !network) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.font = '14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Click to add data points', canvas.width / 2, canvas.height / 2 - 10);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.font = '12px "Inter", sans-serif';
      ctx.fillText('Select Class A or B, then click anywhere', canvas.width / 2, canvas.height / 2 + 14);
    }
  }

  function drawContour(threshold) {
    const step = 6;
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.lineWidth = 1.5;

    for (let py = 0; py < canvas.height - step; py += step) {
      for (let px = 0; px < canvas.width - step; px += step) {
        const v00 = forward(network, px / canvas.width, py / canvas.height).out;
        const v10 = forward(network, (px + step) / canvas.width, py / canvas.height).out;
        const v01 = forward(network, px / canvas.width, (py + step) / canvas.height).out;
        const v11 = forward(network, (px + step) / canvas.width, (py + step) / canvas.height).out;

        const lines = marchingSquare(px, py, step, v00, v10, v01, v11, threshold);
        lines.forEach(([x1, y1, x2, y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }
    }
  }

  function marchingSquare(x, y, s, v00, v10, v01, v11, t) {
    const lines = [];
    const code =
      (v00 >= t ? 8 : 0) |
      (v10 >= t ? 4 : 0) |
      (v11 >= t ? 2 : 0) |
      (v01 >= t ? 1 : 0);

    const lerp = (a, b, va, vb) => a + (t - va) / (vb - va) * (b - a);

    const top = [lerp(x, x + s, v00, v10), y];
    const bottom = [lerp(x, x + s, v01, v11), y + s];
    const left = [x, lerp(y, y + s, v00, v01)];
    const right = [x + s, lerp(y, y + s, v10, v11)];

    switch (code) {
      case 1: case 14: lines.push([left[0], left[1], bottom[0], bottom[1]]); break;
      case 2: case 13: lines.push([bottom[0], bottom[1], right[0], right[1]]); break;
      case 3: case 12: lines.push([left[0], left[1], right[0], right[1]]); break;
      case 4: case 11: lines.push([top[0], top[1], right[0], right[1]]); break;
      case 5:
        lines.push([left[0], left[1], top[0], top[1]]);
        lines.push([bottom[0], bottom[1], right[0], right[1]]);
        break;
      case 6: case 9: lines.push([top[0], top[1], bottom[0], bottom[1]]); break;
      case 7: case 8: lines.push([left[0], left[1], top[0], top[1]]); break;
      case 10:
        lines.push([left[0], left[1], bottom[0], bottom[1]]);
        lines.push([top[0], top[1], right[0], right[1]]);
        break;
    }
    return lines;
  }

  drawScene();
}
