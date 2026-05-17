"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    function handleAnchorClick(event: MouseEvent) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      );
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      event.preventDefault();

      if (href === "#") {
        lenis.scrollTo(0);
        return;
      }

      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        lenis.scrollTo(element, { offset: -80 });
        history.replaceState(null, "", href);
      }
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
