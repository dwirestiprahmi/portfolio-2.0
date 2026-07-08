import { Rail } from "@/components/sections/rail";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { site } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen max-w-fill lg:grid lg:grid-cols-[18rem_1fr]">
      <Rail />
      <main id="top" className="px-6 lg:px-16">
        <Hero />
        <Experience />
        <Education />
        <Work />
        <About />
        <Contact />
        <footer className="flex flex-col justify-end gap-2 border-t border-border py-10 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </footer>
      </main>
    </div>
  );
}
