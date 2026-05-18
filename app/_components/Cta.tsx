import Image from "next/image";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

const meetingUrl = "https://meetings.hubspot.com/quero-code";

export function Cta() {
  return (
    <section className="cta-section" id="contato">
      <Image
        className="cta-bracket cta-bracket-left"
        src="/images/bracket_left.svg"
        alt=""
        width={75}
        height={270}
        unoptimized
        aria-hidden="true"
      />

      <div className="cta-content">
        <h2 className="cta-title">Tecnologia que transforma!</h2>
        <p className="cta-text">
          Em uma conversa inicial, entendemos seus desafios e avaliamos quais
          soluções fazem mais sentido para o seu negócio.
        </p>
        <a
          href={meetingUrl}
          className="hero-button cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Marcar Reunião</span>
          <ArrowIcon />
        </a>
      </div>

      <Image
        className="cta-bracket cta-bracket-right"
        src="/images/bracket_right.svg"
        alt=""
        width={80}
        height={269}
        unoptimized
        aria-hidden="true"
      />
    </section>
  );
}
