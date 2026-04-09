/* ═══════════════════════════════════════════
   PORTFOLIO — Interactions
   Nav scroll, reveal animations
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Scroll-driven background frame sequence ───
  const canvas = document.getElementById('scroll-bg');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    const FRAME_COUNT = 42;
    const frames = [];
    let loadedCount = 0;
    let currentFrame = -1;
    let ticking = false;

    // Size canvas to window
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrame < 0 ? 0 : currentFrame);
    }

    // Draw a frame to canvas, covering viewport (object-fit: cover)
    function drawFrame(index) {
      const img = frames[index];
      if (!img || !img.complete) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Map scroll position to frame index
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        var progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
        var frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frameIndex !== currentFrame) {
          currentFrame = frameIndex;
          drawFrame(frameIndex);
        }
        ticking = false;
      });
    }

    // Preload all frames
    for (var i = 0; i < FRAME_COUNT; i++) {
      var img = new Image();
      img.src = 'images/frame_ultra_sequence_42/frame_ultra_' + String(i).padStart(2, '0') + '.webp';
      frames.push(img);
    }

    // When first frame loads, draw it and start listening
    frames[0].onload = function () {
      resizeCanvas();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', resizeCanvas);
      onScroll();
    };
  }

  // ─── Nav background on scroll ───
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  if (nav && hero) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle('scrolled', !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    navObserver.observe(hero);
  }

  // ─── Scroll reveal ───
  const reveals = document.querySelectorAll('[data-reveal]');

  if (reveals.length > 0) {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Show everything immediately
      reveals.forEach((el) => el.classList.add('revealed'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      reveals.forEach((el) => revealObserver.observe(el));
    }
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── YouTube Reel — auto-play on scroll ───
  const reelEmbed = document.getElementById('reel-embed');

  if (reelEmbed) {
    let ytPlayer = null;
    let ytReady = false;

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
      ytPlayer = new YT.Player('yt-player', {
        videoId: 'Ynp98CHBKMY',
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: function () {
            ytReady = true;
          },
        },
      });
    };

    // Observe reel section for auto-play / pause
    const reelSection = document.getElementById('reel');
    if (reelSection) {
      const reelObserver = new IntersectionObserver(
        ([entry]) => {
          if (!ytReady || !ytPlayer) return;
          if (entry.isIntersecting) {
            ytPlayer.playVideo();
          } else {
            ytPlayer.pauseVideo();
          }
        },
        { threshold: 0.3 }
      );
      reelObserver.observe(reelSection);
    }
  }
})();
