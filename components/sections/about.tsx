import { about, skills } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";

export function About() {
  return (
    <section id="about" className="scroll-mt-8 py-8 lg:py-10">
      <SectionLabel>About</SectionLabel>

      <div className="space-y-5 flex items-center justify-between">
        <div className="space-y-6">
          {about.map((para, i) => (
            <p
              key={i}
              className={`text-lg leading-relaxed ${
                i === 0 ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {para}
            </p>
          ))}

          <p className="pt-4 font-display text-2xl leading-tight tracking-tight text-foreground">
            Frontends that feel right. Backends that don't break.
          </p>
        </div>

        <div className="border-2 border-foreground font-mono text-sm uppercase tracking-widest shadow-[2px_2px_0_0_hsl(var(--foreground))]">
          <img src="78828847.jpeg" alt="Profile picture" className="w-64" />
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Skills
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="flex gap-4">
              <div
                className="mt-1 h-5 w-1 rounded-full"
                style={{ backgroundColor: group.accent }}
              />

              <div>
                <p className="font-medium">{group.category}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {group.items.join(" • ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
