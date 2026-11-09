import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { SiteBackground } from "@/components/SiteBackground";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-svh text-foreground">
      <SiteBackground theme={theme} />
      <div className="relative z-10">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero />
          <About />
          <Experience />
          <Work />
          <Skills />
          <Process />
        </main>
        <Footer />
      </div>
    </div>
  );
}

