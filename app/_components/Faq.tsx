"use client";

import { MinusSignIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "O que a QueroCode faz?",
    answer:
      "A QueroCode cria soluções sob medida em software, IA, automação, dados, BI e produto digital para empresas que precisam transformar desafios de negócio em soluções práticas e escaláveis.",
  },
  {
    question: "A QueroCode é uma software house?",
    answer:
      "Sim. Somos uma software house formada por engenheiros da Poli-USP, com foco em desenvolver soluções digitais sob medida para empresas que precisam de profundidade técnica, velocidade e visão de negócio.",
  },
  {
    question: "Que tipo de solução vocês desenvolvem?",
    answer:
      "Atuamos em diferentes frentes, como sistemas internos, plataformas web, APIs, integrações, automações com IA, agentes inteligentes, dashboards, relatórios automatizados, MVPs, protótipos e experiências digitais.",
  },
  {
    question: "Vocês trabalham com inteligência artificial?",
    answer:
      "Sim. Ajudamos empresas a identificar e implementar aplicações reais de IA na operação, como automação de processos, agentes internos, chatbots, OCR, relatórios automáticos e fluxos inteligentes de apoio à decisão.",
  },
  {
    question: "Vocês trabalham com empresas de quais segmentos?",
    answer:
      "Atendemos empresas de diferentes segmentos que tenham desafios ligados a operação, processos, dados, tecnologia, automação, produto digital ou crescimento. Nosso modelo é sob medida, então começamos entendendo o contexto de cada negócio.",
  },
  {
    question: "Como funciona o processo de trabalho?",
    answer:
      "Nosso processo começa por um diagnóstico inicial da operação e dos principais gargalos. Depois, priorizamos as oportunidades com maior impacto, montamos o time ideal, executamos em ciclos curtos e evoluímos a solução com base no uso real.",
  },
  {
    question:
      "A QueroCode faz apenas projetos fechados ou também parcerias contínuas?",
    answer:
      "Podemos atuar em projetos específicos, mas nosso modelo é especialmente forte para empresas que buscam uma central tech parceira, capaz de diagnosticar, construir e evoluir soluções continuamente.",
  },
  {
    question: "O que diferencia a QueroCode de outras empresas de tecnologia?",
    answer:
      "Unimos excelência técnica, visão de negócio e execução prática. Nossa equipe tem base em engenharia pela Poli-USP, experiência em produtos digitais e reconhecimento internacional por uma solução acelerada na Suíça pela START Global.",
  },
  {
    question: "Vocês também cuidam de design e experiência do usuário?",
    answer:
      "Sim. Além do desenvolvimento técnico, também atuamos com produto digital, UX/UI, prototipação, MVPs e jornada do usuário, para criar soluções que não apenas funcionem, mas sejam realmente usadas.",
  },
  {
    question: "Vocês integram sistemas como CRM, ERP e ferramentas internas?",
    answer:
      "Sim. Desenvolvemos integrações entre sistemas, APIs, CRMs, ERPs, bancos de dados e ferramentas internas para reduzir retrabalho, automatizar processos e melhorar o fluxo de informações da empresa.",
  },
  {
    question: "Vocês trabalham com dados e dashboards?",
    answer:
      "Sim. Organizamos dados, criamos dashboards gerenciais, relatórios automatizados, indicadores e análises para ajudar empresas a tomarem decisões mais rápidas e confiáveis.",
  },
  {
    question: "Como sei se minha empresa precisa de uma solução sob medida?",
    answer:
      "Se sua empresa depende de planilhas manuais, sistemas desconectados, processos repetitivos, relatórios difíceis de montar ou decisões baseadas em dados dispersos, provavelmente existe espaço para uma solução sob medida gerar impacto.",
  },
  {
    question: "Qual é o primeiro passo para trabalhar com a QueroCode?",
    answer:
      "O primeiro passo é uma conversa inicial para entender os desafios da empresa, mapear oportunidades de software, IA e automação, e avaliar quais soluções fazem mais sentido para o momento atual do negócio.",
  },
];

const faqFade = {
  type: "spring",
  bounce: 0.25,
  duration: 0.4,
} as const;

export function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq">
      <h2 className="faq-heading">FAQ</h2>

      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isActive = index === activeIndex;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <motion.div
              whileTap={{ scale: 0.995 }}
              key={`${item.question}-${index}`}
              className={`faq-item${isActive ? " is-active" : ""}`}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.2,
              }}
            >
              <button
                type="button"
                id={buttonId}
                className="faq-question"
                aria-expanded={isActive}
                aria-controls={panelId}
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-question-icon" aria-hidden="true">
                  <HugeiconsIcon
                    icon={isActive ? MinusSignIcon : PlusSignIcon}
                    size={18}
                    color="currentColor"
                    strokeWidth={1.8}
                  />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="faq-answer"
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={faqFade}
                  >
                    <p>{item.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
