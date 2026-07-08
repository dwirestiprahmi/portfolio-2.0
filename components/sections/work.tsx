import { projects } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";

export function Work() {
  return (
    <section id="work" className="scroll-mt-8 border-border py-8 lg:py-12">
      <SectionLabel count={projects.length}>Selected Project</SectionLabel>
      <ul className="mt-4">
        {projects.map((p) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-border py-2 my-5 transition-colors hover:bg-foreground/5 hover:text-foreground px-3"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display text-2xl font-normal tracking-tight transition-colors group-hover:text-primary lg:text-3xl">
                  {p.title}
                </h3>
                {/* <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {p.year}
                </span> */}
              </div>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                {p.summary}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                {/* <span className="text-foreground/70">{p.role}</span> */}
                <span aria-hidden>&middot;</span>
                <span>{p.stack.join(" / ")}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
