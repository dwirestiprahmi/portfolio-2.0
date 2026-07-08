import { education } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-8 border-border py-8 lg:py-12"
    >
      <SectionLabel count={education.length}>Education</SectionLabel>
      <ol className="mt-4">
        {education.map((e, i) => (
          <li
            key={i}
            className="grid grid-cols-1 gap-2 border-b border-border py-7 sm:grid-cols-[1fr_10rem] sm:gap-8"
          >
            <div className="max-w-2xl">
              <h3 className="font-display text-xl font-normal tracking-tight sm:text-2xl">
                {e.degree}
                <span className="text-muted-foreground">, {e.school}</span>
              </h3>
              {/* {e.detail && (
                <p className="mt-3 text-muted-foreground">{e.detail}</p>
              )} */}
            </div>
            <div className="font-mono text-sm text-muted-foreground sm:pt-1">
              {e.period}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
