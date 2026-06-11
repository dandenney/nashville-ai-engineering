// Page motion: one orchestrated hero entrance, then quiet scroll reveals.
// Everything is skipped under prefers-reduced-motion.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce) {
  document.fonts.ready.then(() => {
    // ── Hero entrance ──────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    const masthead = document.querySelector('[data-masthead]');
    if (masthead) {
      const split = SplitText.create(masthead, { type: 'lines', mask: 'lines' });
      // The mask wrappers clip to the tight line-height, amputating
      // descenders; extend their clip box below the baseline, then remove
      // the split entirely once the entrance is done.
      split.lines.forEach((line) => {
        const mask = line.parentElement;
        if (mask) {
          mask.style.paddingBottom = '0.22em';
          mask.style.marginBottom = '-0.22em';
        }
      });
      tl.from(
        split.lines,
        {
          yPercent: 130,
          duration: 1.3,
          stagger: 0.12,
          onComplete: () => split.revert(),
        },
        0.1,
      );
    }

    tl.from(
      '[data-hero-fade]',
      { y: 26, autoAlpha: 0, duration: 1.1, stagger: 0.1 },
      0.45,
    );

    gsap.from('[data-rule-draw]', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.6,
      ease: 'expo.out',
      delay: 0.2,
      stagger: 0.12,
    });

    // ── Scroll reveals ─────────────────────────────────────
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 32,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 86%' },
      });
    });

    gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
      gsap.from(group.children, {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'top 84%' },
      });
    });

    // Slow parallax drift inside full-bleed figures
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((frame) => {
      const img = frame.querySelector('img');
      if (!img) return;
      gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    // Engraved rules that draw themselves in on scroll
    gsap.utils.toArray<HTMLElement>('[data-rule-scroll]').forEach((el) => {
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
      });
    });
  });
}
