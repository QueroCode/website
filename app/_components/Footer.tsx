import { Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Image from "next/image";

type SocialLink = {
  label: string;
  href: string;
  icon?: IconSvgElement;
  src?: string;
};

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/102541107",
    icon: Linkedin01Icon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/querocode.oficial/",
    src: "/social/Instagram.svg",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5511955588899",
    src: "/social/WhatsApp.svg",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Image
            className="site-footer-logo"
            src="/images/qc_long_logo.svg"
            alt="QueroCode"
            width={160}
            height={24}
            unoptimized
          />
          <p>O time de tecnologia da sua empresa.</p>
        </div>

        <nav className="site-footer-social" aria-label="Redes sociais">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="site-footer-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon ? (
                <HugeiconsIcon
                  icon={social.icon}
                  size={22}
                  color="currentColor"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              ) : social.src ? (
                <Image
                  src={social.src}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  aria-hidden="true"
                />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="site-footer-meta">
          <div className="site-footer-links">
            <a href="#">Termos e Serviços</a>
            <a href="#">Privacidade</a>
          </div>
          <p>© {year} Querocode</p>
        </div>
      </div>
    </footer>
  );
}
