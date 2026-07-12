import { projects } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";

export function Work() {
  return (
    <section id="work" className="scroll-mt-8 py-8 lg:py-10">
      <SectionLabel count={projects.length}>Selected Projects</SectionLabel>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl tracking-tight transition-colors group-hover:text-primary">
                  {p.title}
                </h3>

                {/* {p.year && (
                  <span className="shrink-0 rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground">
                    {p.year}
                  </span>
                )} */}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.summary}
              </p>

              <div className="mt-auto pt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
