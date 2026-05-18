"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Apresentação", id: "apresentacao" },
  { label: "Soluções", id: "solucoes" },
  { label: "Roadmap", id: "roadmap" },
  { label: "FAQ", id: "faq" },
  { label: "Contato", id: "contato" },
];

const meetingUrl = "https://meetings.hubspot.com/quero-code";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

export function Header() {
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="hero-header">
      <a
        href="#apresentacao"
        className="hero-logo-link"
        aria-label="QueroCode inicio"
      >
        <Image
          className="hero-logo"
          src="/images/qc_short_logo.svg"
          alt=""
          width={48}
          height={48}
          unoptimized
        />
      </a>

      <nav className="hero-nav" aria-label="Principal">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={item.id === activeId ? "is-active" : undefined}
            aria-current={item.id === activeId ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href={meetingUrl}
        className="hero-button hero-button-top"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Marcar Reunião</span>
        <ArrowIcon />
      </a>
    </header>
  );
}
