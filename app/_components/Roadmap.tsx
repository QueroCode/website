"use client";

import {
  Chart03Icon,
  LeftToRightListNumberIcon,
  Setup01Icon,
  Stethoscope02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type RoadmapStep = {
  title: string;
  description: string;
  icon: IconSvgElement;
  illustration: {
    src: string;
    width: number;
    height: number;
  };
};

const roadmapSteps: RoadmapStep[] = [
  {
    title: "Diagnóstico",
    description:
      "Imersão técnica e estratégica para entender o gargalo real do negócio. Analisamos processos, operações e oportunidades de automação com foco em eficiência e crescimento.",
    icon: Stethoscope02Icon,
    illustration: {
      src: "/images/diagnoses_roadmap.svg",
      width: 617,
      height: 617,
    },
  },
  {
    title: "Priorização",
    description:
      "Organizamos iniciativas por impacto, urgência e esforço para transformar ideias em um plano claro de execução.",
    icon: LeftToRightListNumberIcon,
    illustration: {
      src: "/images/priority_roadmap.svg",
      width: 700,
      height: 700,
    },
  },
  {
    title: "Desenvolvedores",
    description:
      "Alocamos o time certo para construir as soluções, validar fluxos e preparar integrações com qualidade técnica.",
    icon: UserGroupIcon,
    illustration: {
      src: "/images/development_roadmap.svg",
      width: 700,
      height: 700,
    },
  },
  {
    title: "Execução",
    description:
      "Implementamos, testamos e ajustamos a solução em ciclos curtos para gerar valor rápido e mensurável.",
    icon: Setup01Icon,
    illustration: {
      src: "/images/execution_roadmap.svg",
      width: 650,
      height: 650,
    },
  },
  {
    title: "Evolução",
    description:
      "Acompanhamos resultados, refinamos automações e evoluímos o produto conforme novos dados aparecem.",
    icon: Chart03Icon,
    illustration: {
      src: "/images/evolution_roadmap.svg",
      width: 670,
      height: 670,
    },
  },
];

const roadmapSpring = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.8,
} as const;

const roadmapFade = {
  duration: 0.24,
  ease: [0.22, 1, 0.36, 1],
} as const;

export function Roadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = roadmapSteps[activeIndex];

  return (
    <section className="roadmap-section" id="roadmap">
      <Image
        className="roadmap-splash-illustration"
        src="/images/splash_illustration.png"
        alt=""
        width={254}
        height={231}
        unoptimized
        aria-hidden="true"
      />

      <div className="roadmap-heading">
        <p className="roadmap-eyebrow">
          <span aria-hidden="true" />
          ROADMAP RÁPIDO
        </p>
        <h2>
          Entram problemas,
          <br />
          saem soluções
        </h2>
      </div>

      <div className="roadmap-shell">
        <div className="roadmap-visual" aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              className="roadmap-visual-image"
              key={activeStep.illustration.src}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={roadmapFade}
            >
              <Image
                src={activeStep.illustration.src}
                alt=""
                width={activeStep.illustration.width}
                height={activeStep.illustration.height}
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="roadmap-panel">
          <div className="roadmap-step-list" aria-label="Etapas do roadmap">
            {roadmapSteps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  type="button"
                  className={`roadmap-step-button${isActive ? " is-active" : ""}`}
                  key={step.title}
                  animate={{ flexGrow: isActive ? 1 : 0 }}
                  onClick={() => setActiveIndex(index)}
                  aria-current={isActive ? "step" : undefined}
                  whileHover={isActive ? undefined : { x: 2 }}
                  transition={roadmapSpring}
                >
                  <span
                    className={`roadmap-step-icon${isActive ? " is-active" : ""}`}
                    aria-hidden="true"
                  >
                    <HugeiconsIcon
                      icon={step.icon}
                      size={22}
                      color="currentColor"
                      strokeWidth={1.7}
                    />
                  </span>
                  <span className="roadmap-step-copy">
                    <span className="roadmap-step-title">{step.title}</span>
                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.span
                          className="roadmap-step-description"
                          key="description"
                          initial={{ opacity: 0, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -2 }}
                          transition={roadmapFade}
                        >
                          {step.description}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
