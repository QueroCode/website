"use client";

import Image from "next/image";
import { type PointerEvent, useRef } from "react";

function HeroRevealBackground() {
  return <div className="hero-reveal-background" aria-hidden="true" />;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

const meetingUrl = "https://meetings.hubspot.com/quero-code";

function PagesIllustration() {
  return (
    <Image
      className="hero-pages-illustration"
      src="/images/pages_illustration_light.png"
      alt=""
      width={3796}
      height={1488}
      preload
      aria-hidden="true"
    />
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const bounds = hero.getBoundingClientRect();
    hero.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    hero.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    hero.dataset.pointerActive = "true";
  }

  function handlePointerLeave() {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    hero.dataset.pointerActive = "false";
  }

  return (
    <section
      ref={heroRef}
      id="apresentacao"
      className="hero-section"
      data-pointer-active="false"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <HeroRevealBackground />

      <div className="hero-content">
        <p className="font-light">CRIAMOS SOLUÇÕES SOB MEDIDA PARA VOCÊ</p>
        <h1>
          A central <em>tech</em> da
          <br />
          sua <em>empresa.</em>
        </h1>
        <a
          href={meetingUrl}
          className="hero-button hero-button-main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Marcar Reunião</span>
          <ArrowIcon />
        </a>
      </div>

      <PagesIllustration />
    </section>
  );
}
