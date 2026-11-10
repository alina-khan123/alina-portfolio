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
import { NavBar } from "@/components/ui/tubelight-navbar";
import { BriefcaseBusiness, FileText, FlaskConical, House, Mail, UserRound, Wrench } from "lucide-react";

const navItems = [
  { name: "Home", url: "#top", icon: House },
  { name: "About", url: "#about", icon: UserRound },
  { name: "Experience", url: "#experience", icon: BriefcaseBusiness },
  { name: "Work", url: "#work", icon: FileText },
  { name: "Skills", url: "#skills", icon: Wrench },
  { name: "Process", url: "#process", icon: FlaskConical },
  { name: "Contact", url: "#contact", icon: Mail },
];

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-svh text-foreground">
      <SiteBackground theme={theme} />
      <div className="relative z-10">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <NavBar items={navItems} />
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

