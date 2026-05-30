/* ══════════════════════════════════════════════════════
   ENIAJ — SILENT POWER ARCHIVE
   app.js — Cinema-Grade Animations
   GSAP + ScrollTrigger
══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── REGISTER GSAP PLUGINS ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ═══════════════════════════════════════
     1. LOADER
  ═══════════════════════════════════════ */
  const loader       = document.getElementById('loader');
  const loaderFill   = document.querySelector('.loader-fill');
  const loaderLogo   = document.querySelector('.loader-logo');

  function initLoader() {
    // Animate logo letters
    gsap.from(loaderLogo, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2
    });

    // Fill progress bar
    gsap.to(loaderFill, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            loader.classList.add('hidden');
            initHeroAnimation();
          }
        });
      }
    });
  }

  /* ═══════════════════════════════════════
     2. CUSTOM CURSOR
  ═══════════════════════════════════════ */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    gsap.to(cursor, { x: mx, y: my, duration: 0.05, ease: 'none' });
  });

  // Smooth ring follow
  function animateCursorRing() {
    rx += (mx - rx) * 0.10;
    ry += (my - ry) * 0.10;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  // Hover effects
  const hoverEls = document.querySelectorAll(
    'a, button, li, .piece-image, .grid-piece, .grid-piece-wide, .shop-card, .icon-set-cta, .shop-btn'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* ═══════════════════════════════════════
     3. NAV — scroll behavior + progress
  ═══════════════════════════════════════ */
  const nav          = document.getElementById('nav');
  const progressFill = document.querySelector('.nav-progress-fill');

  function updateNav() {
    const scrollY   = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress  = (scrollY / docHeight) * 100;

    progressFill.style.width = progress + '%';
    nav.classList.toggle('scrolled', scrollY > 80);
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  // Nav smooth scroll links
  document.querySelectorAll('#nav ul li[data-section]').forEach(li => {
    li.addEventListener('click', () => {
      const target = document.getElementById(li.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ═══════════════════════════════════════
     4. HERO ANIMATIONS
  ═══════════════════════════════════════ */
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .to('.hero-title',   { opacity: 1, y: 0, duration: 1.4, ease: 'power4.out' }, '-=0.6')
      .to('.hero-sub',     { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .to('.hero-scroll',  { opacity: 1, duration: 0.8 }, '-=0.4')
      .to('.hero-counter', { opacity: 1, duration: 0.8 }, '-=0.6');
  }

  /* ═══════════════════════════════════════
     5. MANIFESTO — SCROLL REVEAL
  ═══════════════════════════════════════ */
  gsap.to('.manifesto-inner', {
    scrollTrigger: {
      trigger: '.manifesto',
      start: 'top 70%',
      end: 'top 30%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power2.out'
  });

  // Individual manifesto text lines stagger
  gsap.from('.manifesto-body p', {
    scrollTrigger: {
      trigger: '.manifesto-body',
      start: 'top 75%'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out'
  });

  // Background text parallax
  gsap.to('.manifesto-bg-text', {
    scrollTrigger: {
      trigger: '.manifesto',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    },
    x: '-8%',
    ease: 'none'
  });

  /* ═══════════════════════════════════════
     6. CHAPTER DIVIDERS
  ═══════════════════════════════════════ */
  document.querySelectorAll('.chapter-divider').forEach(div => {
    const h2 = div.querySelector('h2');
    const p  = div.querySelector('p');

    gsap.from(h2, {
      scrollTrigger: { trigger: div, start: 'top 70%' },
      opacity: 0,
      x: -40,
      duration: 1,
      ease: 'power2.out'
    });
    gsap.from(p, {
      scrollTrigger: { trigger: div, start: 'top 70%' },
      opacity: 0,
      x: -20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });
  });

  /* ═══════════════════════════════════════
     7. PIECE SECTIONS — CINEMA REVEAL
  ═══════════════════════════════════════ */
  document.querySelectorAll('.piece').forEach((piece, i) => {
    const layout = piece.querySelector('.piece-layout');
    const img    = piece.querySelector('.piece-image img');
    const text   = piece.querySelector('.piece-text');
    const story  = piece.querySelector('.piece-story');

    // Main layout reveal
    if (layout) {
      gsap.to(layout, {
        scrollTrigger: {
          trigger: layout,
          start: 'top 75%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    }

    // Image parallax
    if (img) {
      gsap.fromTo(img, { y: '-8%' }, {
        scrollTrigger: {
          trigger: piece,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: '8%',
        ease: 'none'
      });
    }

    // Text elements stagger
    if (text) {
      const children = text.querySelectorAll('h4, .piece-identity, .piece-details, .piece-occasions, .piece-price');
      gsap.from(children, {
        scrollTrigger: { trigger: text, start: 'top 80%' },
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Story reveal
    if (story) {
      gsap.from(story.querySelector('blockquote'), {
        scrollTrigger: { trigger: story, start: 'top 80%' },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out'
      });
    }

    // Detail images
    piece.querySelectorAll('.detail-img').forEach((img, idx) => {
      gsap.from(img, {
        scrollTrigger: { trigger: img, start: 'top 85%' },
        opacity: 0,
        scale: 1.05,
        duration: 1,
        delay: idx * 0.15,
        ease: 'power2.out'
      });
    });
  });

  /* ═══════════════════════════════════════
     8. GRID SECTIONS — STAGGER
  ═══════════════════════════════════════ */
  document.querySelectorAll('.grid-piece, .grid-piece-wide').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: (i % 5) * 0.1,
      ease: 'power2.out'
    });
  });

  /* ═══════════════════════════════════════
     9. ICON SET — DRAMATIC REVEAL
  ═══════════════════════════════════════ */
  const iconContent = document.querySelectorAll('.icon-set-content > *');
  gsap.from(iconContent, {
    scrollTrigger: {
      trigger: '.icon-set',
      start: 'top 60%'
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out'
  });

  // Background geo animation
  gsap.to('.icon-set-bg::after', {
    scrollTrigger: {
      trigger: '.icon-set',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2
    },
    y: '-20%',
    ease: 'none'
  });

  /* ═══════════════════════════════════════
     10. SHOP CARDS
  ═══════════════════════════════════════ */
  gsap.from('.shop-card', {
    scrollTrigger: {
      trigger: '.shop-grid',
      start: 'top 80%'
    },
    opacity: 0,
    y: 60,
    stagger: 0.12,
    duration: 0.9,
    ease: 'power2.out'
  });

  /* ═══════════════════════════════════════
     11. CLOSING — CINEMATIC
  ═══════════════════════════════════════ */
  gsap.from('.closing-line', {
    scrollTrigger: { trigger: '.closing', start: 'top 65%' },
    opacity: 0,
    y: 30,
    stagger: 0.3,
    duration: 1.2,
    ease: 'power3.out'
  });
  gsap.from('.closing-sub', {
    scrollTrigger: { trigger: '.closing', start: 'top 60%' },
    opacity: 0,
    duration: 1,
    delay: 0.8
  });

  /* ═══════════════════════════════════════
     12. MARQUEE — PAUSE ON HOVER
  ═══════════════════════════════════════ */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ═══════════════════════════════════════
     13. PIECE CHAPTER — NUMBER REVEAL
  ═══════════════════════════════════════ */
  document.querySelectorAll('.piece-chapter').forEach(ch => {
    const num  = ch.querySelector('.piece-num');
    const name = ch.querySelector('.piece-name');
    gsap.from([num, name], {
      scrollTrigger: { trigger: ch, start: 'top 80%' },
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  /* ═══════════════════════════════════════
     14. SHOP BUTTON INTERACTIONS
  ═══════════════════════════════════════ */
  document.querySelectorAll('.shop-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const original = this.textContent;
      this.textContent = 'Added ✓';
      this.style.color = 'var(--gold)';
      this.style.borderColor = 'var(--gold-dim)';
      setTimeout(() => {
        this.textContent = original;
        this.style.color = '';
        this.style.borderColor = '';
      }, 2000);
    });
  });

  /* ═══════════════════════════════════════
     15. GSAP HORIZONTAL SCROLL HINT
         (subtle left-right on detail grids)
  ═══════════════════════════════════════ */
  document.querySelectorAll('.piece-details-grid').forEach(grid => {
    const imgs = grid.querySelectorAll('.detail-img');
    if (imgs.length < 2) return;
    gsap.from(imgs[0], {
      scrollTrigger: { trigger: grid, start: 'top 85%' },
      x: -30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
    gsap.from(imgs[1], {
      scrollTrigger: { trigger: grid, start: 'top 85%' },
      x: 30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });

  /* ═══════════════════════════════════════
     16. FOOTER STAGGER
  ═══════════════════════════════════════ */
  gsap.from('.footer-col', {
    scrollTrigger: { trigger: 'footer', start: 'top 85%' },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power2.out'
  });

  /* ═══════════════════════════════════════
     INIT
  ═══════════════════════════════════════ */
  window.addEventListener('DOMContentLoaded', initLoader);

  // Refresh ScrollTrigger on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });

})();
