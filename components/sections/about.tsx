import { about, skills } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-8 border-border py-8 lg:py-12"
    >
      <SectionLabel>About</SectionLabel>

      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {about.map((para, i) => (
          <p
            key={i}
            // className={i === 0 ? "text-foreground" : "text-muted-foreground"}
          >
            {para}
          </p>
        ))}
      </div>
      <p className="mt-4 max-w-3xl font-display text-xl font-normal leading-[1.06] tracking-tight">
        <span>
          Frontends that feel right. Backends that don't break. That's the main goal.
        </span>
      </p>

      <div className="mt-14">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Skills
        </p>

        <dl className="mt-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border py-5 sm:grid-cols-[16rem_1fr] sm:items-baseline"
            >
              <dt className="flex items-center gap-2.5 font-medium">
                <span
                  aria-hidden
                  className="inline-block h-2.5 w-2.5 shrink-0"
                  style={{ backgroundColor: group.accent }}
                />
                {group.category}
              </dt>
              <dd className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="bg-secondary px-2.5 py-1 font-mono text-sm text-secondary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
