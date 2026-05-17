"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  LaptopProgrammingIcon,
  Layers01Icon,
  RoboticIcon,
  StrategyIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import { useRef } from "react";

type Solution = {
  title: string;
  description: string;
  tags: string[];
  icon: IconSvgElement;
  illustration: {
    src: string;
    width: number;
    height: number;
    className: string;
  };
};

const solutions: Solution[] = [
  {
    title: "IA e Automação",
    description:
      "Implementação de agentes inteligentes e atendimento automatizado de alta performance.",
    tags: ["IA", "RPA", "Chatbot", "OCR"],
    icon: RoboticIcon,
    illustration: {
      src: "/images/ai_illustration.svg",
      width: 506,
      height: 230,
      className: "solutions-art-ai",
    },
  },
  {
    title: "Software",
    description:
      "Desenvolvimentos de sistemas robustos, APIs escaláveis e aplicações de alto impacto.",
    tags: ["Web", "SaaS", "Apps", "Scripts"],
    icon: LaptopProgrammingIcon,
    illustration: {
      src: "/images/software_illustration.svg",
      width: 410,
      height: 197,
      className: "solutions-art-software",
    },
  },
  {
    title: "Produto e Experiência",
    description:
      "Design de interface (UI), experiência do usuário (UX) e validação técnica de MVPs.",
    tags: ["UI", "UX", "MVP", "Design"],
    icon: Layers01Icon,
    illustration: {
      src: "/images/design_illustration.svg",
      width: 469,
      height: 299,
      className: "solutions-art-design",
    },
  },
  {
    title: "Dados e BI",
    description:
      "Criação de dashboards, engenharia de dados e relatórios automatizados para tomada de decisão.",
    tags: ["IA", "Power BI", "Analytics", "ERP"],
    icon: StrategyIcon,
    illustration: {
      src: "/images/dados_illustration.svg",
      width: 240,
      height: 298,
      className: "solutions-art-data",
    },
  },
];

export function Solutions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollSolutions(direction: -1 | 1) {
    const scroller = scrollRef.current;

    if (!scroller) {
      return;
    }

    const card = scroller.querySelector<HTMLElement>(".solutions-card");
    const track = scroller.querySelector<HTMLElement>(".solutions-track");
    const gap = track
      ? Number.parseFloat(window.getComputedStyle(track).columnGap)
      : 0;
    const distance = card ? card.getBoundingClientRect().width + gap : 520;

    scroller.scrollBy({
      left: direction * distance,
      behavior: "smooth",
    });
  }

  return (
    <section className="solutions-section" id="solucoes">
      <div className="solutions-header">
        <div className="solutions-heading">
          <p className="solutions-eyebrow">
            <span aria-hidden="true" />
            NOSSAS SOLUÇÕES
          </p>
          <h2>
            Soluções para
            <br />
            todos os desafios
          </h2>
        </div>

        <div className="solutions-controls" aria-label="Navegação de soluções">
          <button
            type="button"
            aria-label="Solução anterior"
            onClick={() => scrollSolutions(-1)}
          >
            <ChevronLeftIcon aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Próxima solução"
            onClick={() => scrollSolutions(1)}
          >
            <ChevronRightIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="solutions-scroll" aria-label="Soluções">
        <div className="solutions-track">
          {solutions.map((solution) => (
            <article className="solutions-card" key={solution.title}>
              <div className="solutions-card-top">
                <div className="solutions-card-icon" aria-hidden="true">
                  <HugeiconsIcon
                    icon={solution.icon}
                    size={36}
                    color="currentColor"
                    strokeWidth={1.7}
                  />
                </div>
                <div className="solutions-tags" aria-label="Categorias">
                  {solution.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="solutions-card-copy">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
              </div>

              <div className="solutions-card-art" aria-hidden="true">
                <Image
                  className={solution.illustration.className}
                  src={solution.illustration.src}
                  alt=""
                  width={solution.illustration.width}
                  height={solution.illustration.height}
                  unoptimized
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
