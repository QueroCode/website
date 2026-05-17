import { Cta } from "./_components/Cta";
import { Faq } from "./_components/Faq";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Roadmap } from "./_components/Roadmap";
import { Solutions } from "./_components/Solutions";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Solutions />
        <Roadmap />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
