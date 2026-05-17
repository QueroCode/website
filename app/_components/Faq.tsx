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
    question: "What do I need to start?",
    answer:
      "Tell us about your problem and goals. We'll align on scope, timeline and the right team to move forward in days, not weeks.",
  },
  {
    question: "What is the minimum amount to withdraw?",
    answer:
      "There is no minimum amount to withdraw. You have no limitations on how much you want to buy or sell inside the platform. You have no limitations on how much you want to buy or sell inside the platform.",
  },
  {
    question: "How can I open my account?",
    answer:
      "Reach out through the contact button and we'll set everything up with you in a quick onboarding call.",
  },
  {
    question: "What is the value of the KX token?",
    answer:
      "Pricing depends on scope and engagement model. Share your context and we'll send a tailored proposal.",
  },
  {
    question: "What payment methods are accepted on the platform?",
    answer:
      "We accept bank transfer, PIX and major credit cards. Invoicing is issued for every contract.",
  },
  {
    question: "What is the minimum amount to withdraw?",
    answer:
      "There is no minimum. You decide the cadence and volume that fits your operation.",
  },
  {
    question: "What do I need to start?",
    answer:
      "A clear problem to solve. We handle the rest — diagnosis, prioritization, development and rollout.",
  },
  {
    question: "What is the value of the KX token?",
    answer:
      "Each engagement is scoped individually. Get in touch and we'll walk you through pricing.",
  },
];

const faqFade = {
  type: "spring",
  bounce: 0.25,
  duration: 0.4,
} as const;

export function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

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
