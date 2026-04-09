/* ═══════════════════════════════════════════
   PORTFOLIO — Interactions
   Nav scroll, reveal animations
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

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
