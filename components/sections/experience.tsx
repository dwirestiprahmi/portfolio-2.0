import { workExperience } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-8 border-border py-8 lg:py-12"
    >
      <SectionLabel count={workExperience.length}>Experience</SectionLabel>
      <ol className="mt-4">
        {workExperience.map((job, i) => {
          const current = /present/i.test(job.period);
          return (
            <li
              key={i}
              className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:grid-cols-[1fr_10rem] sm:gap-8"
            >
              <div className="max-w-4xl">
                <h3 className="font-display text-xl font-normal tracking-tight sm:text-2xl">
                  {job.role}
                  <span className="text-muted-foreground">, {job.company}</span>
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {job.location}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-muted-foreground">
                      <span
                        className="mt-[0.62em] inline-block h-1.5 w-1.5 shrink-0 bg-primary"
                        aria-hidden
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <span>
                </span>
                {job.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <Badge key={t} variant="outline" className="font-mono bg-secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground sm:pt-1">
                {current && (
                  <span
                    className="inline-block h-1.5 w-1.5 bg-primary"
                    aria-hidden
                  />
                )}
                {job.period}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
