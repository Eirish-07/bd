/**
 * Happy Birthday Prizma - Interactive Logic
 * Clean, lightweight, and crafted with love.
 */

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initFloatingPetals();
  setupMusicPlayer();
  setupCakeRitual();
});

// ==========================================================================
// FLOATING ROSE PETALS CANVAS ANIMATION
// ==========================================================================

function initFloatingPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petals = [];
  const petalCount = width > 768 ? 28 : 14;

  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: Math.random() * 0.8 + 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.4 ? '#ff6b8b' : '#ffa3b7'
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
    ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 107, 139, 0.4)';
    ctx.fill();
    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) p.y = -20;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;

      drawPetal(p);
    });

    requestAnimationFrame(render);
  }

  render();
}

// ==========================================================================
// BACKGROUND MUSIC SYNTHESIZER (WARM ROMANTIC BIRTHDAY MELODY)
// ==========================================================================

let audioCtx = null;
let isMusicPlaying = false;
let synthTimer = null;
let melodyIndex = 0;

// Romantic Acoustic Birthday & Melodic Chord Progression
const birthdayMelody = [
  { note: 261.63, duration: 0.35, chord: [261.63, 329.63, 392.00] }, // C
  { note: 261.63, duration: 0.35, chord: [261.63, 329.63, 392.00] },
  { note: 293.66, duration: 0.70, chord: [293.66, 369.99, 440.00] }, // D
  { note: 261.63, duration: 0.70, chord: [261.63, 329.63, 392.00] }, // C
  { note: 349.23, duration: 0.70, chord: [349.23, 440.00, 523.25] }, // F
  { note: 329.63, duration: 1.20, chord: [329.63, 392.00, 493.88] }, // E
  
  { note: 261.63, duration: 0.35, chord: [261.63, 329.63, 392.00] },
  { note: 261.63, duration: 0.35, chord: [261.63, 329.63, 392.00] },
  { note: 293.66, duration: 0.70, chord: [293.66, 369.99, 440.00] },
  { note: 261.63, duration: 0.70, chord: [261.63, 329.63, 392.00] },
  { note: 392.00, duration: 0.70, chord: [392.00, 493.88, 587.33] }, // G
  { note: 349.23, duration: 1.20, chord: [349.23, 440.00, 523.25] }, // F
  
  { note: 261.63, duration: 0.35, chord: [261.63, 329.63, 392.00] },
  { note: 261.63, duration: 0.35, chord: [261.63, 329.63, 392.00] },
  { note: 523.25, duration: 0.70, chord: [523.25, 659.25, 783.99] }, // High C
  { note: 440.00, duration: 0.70, chord: [440.00, 554.37, 659.25] }, // A
  { note: 349.23, duration: 0.70, chord: [349.23, 440.00, 523.25] }, // F
  { note: 329.63, duration: 0.70, chord: [329.63, 392.00, 493.88] }, // E
  { note: 293.66, duration: 1.20, chord: [293.66, 369.99, 440.00] }, // D
  
  { note: 466.16, duration: 0.35, chord: [466.16, 587.33, 698.46] }, // Bb
  { note: 466.16, duration: 0.35, chord: [466.16, 587.33, 698.46] },
  { note: 440.00, duration: 0.70, chord: [440.00, 554.37, 659.25] },
  { note: 349.23, duration: 0.70, chord: [349.23, 440.00, 523.25] },
  { note: 392.00, duration: 0.70, chord: [392.00, 493.88, 587.33] },
  { note: 349.23, duration: 1.60, chord: [349.23, 440.00, 523.25] }
];

function playMelodyStep() {
  if (!isMusicPlaying || !audioCtx) return;

  const current = birthdayMelody[melodyIndex];
  const now = audioCtx.currentTime;

  // Warm chime note
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(current.note, now);

  gain.gain.setValueAtTime(0.24, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + current.duration * 0.95);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + current.duration);

  // Soft warm chord pad underneath
  if (current.chord) {
    current.chord.forEach(freq => {
      const padOsc = audioCtx.createOscillator();
      const padGain = audioCtx.createGain();
      padOsc.type = "triangle";
      padOsc.frequency.setValueAtTime(freq / 2, now); // Octave down for warmth

      padGain.gain.setValueAtTime(0.035, now);
      padGain.gain.exponentialRampToValueAtTime(0.001, now + current.duration * 1.3);

      padOsc.connect(padGain);
      padGain.connect(audioCtx.destination);
      padOsc.start(now);
      padOsc.stop(now + current.duration * 1.3);
    });
  }

  melodyIndex = (melodyIndex + 1) % birthdayMelody.length;
  synthTimer = setTimeout(playMelodyStep, current.duration * 1000);
}

function setupMusicPlayer() {
  const pill = document.getElementById("music-pill");
  const vinyl = document.getElementById("vinyl-disc");
  const status = document.getElementById("music-status");
  const btn = document.getElementById("music-toggle-btn");

  pill?.addEventListener("click", () => {
    if (!isMusicPlaying) {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      isMusicPlaying = true;
      melodyIndex = 0;
      playMelodyStep();

      vinyl?.classList.add("spinning");
      if (status) status.textContent = "Playing Romantic Melody 🎶";
      if (btn) btn.innerHTML = '<i data-lucide="pause"></i>';
      if (window.lucide) window.lucide.createIcons();
    } else {
      if (synthTimer) clearTimeout(synthTimer);
      isMusicPlaying = false;
      vinyl?.classList.remove("spinning");
      if (status) status.textContent = "Paused";
      if (btn) btn.innerHTML = '<i data-lucide="play"></i>';
      if (window.lucide) window.lucide.createIcons();
    }
  });
}

// ==========================================================================
// CAKE CANDLES RITUAL
// ==========================================================================

function setupCakeRitual() {
  const blowBtn = document.getElementById("blow-candles-btn");
  const relightBtn = document.getElementById("relight-btn");
  const statusText = document.getElementById("cake-status-text");
  const wishCard = document.getElementById("wish-card");
  const flames = document.querySelectorAll(".candle-flame");
  const smokes = document.querySelectorAll(".candle-smoke");

  blowBtn?.addEventListener("click", () => {
    flames.forEach((flame, i) => {
      setTimeout(() => flame.classList.add("extinguished"), i * 140);
    });

    smokes.forEach((smoke, i) => {
      setTimeout(() => smoke.classList.add("active"), i * 140 + 80);
    });

    if (statusText) {
      statusText.innerHTML = "✨ <strong>Wish captured! Candles blown with love! 💖</strong>";
    }

    if (blowBtn) blowBtn.style.display = "none";
    if (relightBtn) relightBtn.style.display = "inline-flex";
    if (wishCard) wishCard.style.display = "block";

    triggerConfettiShower();
  });

  relightBtn?.addEventListener("click", () => {
    flames.forEach(f => f.classList.remove("extinguished"));
    smokes.forEach(s => s.classList.remove("active"));

    if (statusText) {
      statusText.textContent = "✨ The candles are burning bright. Make your wish...";
    }

    if (blowBtn) blowBtn.style.display = "inline-flex";
    if (relightBtn) relightBtn.style.display = "none";
    if (wishCard) wishCard.style.display = "none";
  });
}

// ==========================================================================
// SECRET GIFT: BLOOMING FLOWER BOUQUET
// ==========================================================================

window.openSurpriseGift = function() {
  const box = document.getElementById("gift-box");
  const prompt = document.getElementById("gift-prompt");
  const bouquetStage = document.getElementById("bouquet-stage");

  box?.classList.add("opened");
  if (prompt) prompt.style.display = "none";
  if (bouquetStage) bouquetStage.style.display = "block";

  triggerConfettiShower();
};

// ==========================================================================
// LIGHTBOX MODAL
// ==========================================================================

window.openLightbox = function(src, title, date) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const titleEl = document.getElementById("lightbox-title");
  const dateEl = document.getElementById("lightbox-date");

  if (img) img.src = src;
  if (titleEl) titleEl.textContent = title || "Precious Memory";
  if (dateEl) dateEl.textContent = date || "Cherished Forever";

  if (modal) modal.classList.add("active");
};

window.closeLightbox = function(e) {
  const modal = document.getElementById("lightbox-modal");
  if (e.target === modal) {
    modal.classList.remove("active");
  }
};

window.closeLightboxDirect = function() {
  document.getElementById("lightbox-modal")?.classList.remove("active");
};

// ==========================================================================
// CONFETTI SHOWER
// ==========================================================================

window.triggerConfettiShower = function() {
  if (typeof confetti === "function") {
    // Left burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6, x: 0.2 },
      colors: ['#ff6b8b', '#ffa3b7', '#f7c873', '#fae0c7', '#ffffff']
    });
    // Right burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6, x: 0.8 },
      colors: ['#ff6b8b', '#ffa3b7', '#f7c873', '#fae0c7', '#ffffff']
    });
    // Center stars
    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 0.45, x: 0.5 },
      shapes: ['star'],
      colors: ['#f7c873', '#ffd700', '#ffffff', '#ff6b8b']
    });
  }
};
