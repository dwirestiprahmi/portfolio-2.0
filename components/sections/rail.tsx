"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site, social } from "@/data/portfolio";
import { ThemeToggle } from "@/components/theme-toggle";
import { PixelIcon, type PixelIconName } from "@/components/pixel-icons";

const socialIcon: Record<string, PixelIconName> = {
  GitHub: "github",
  LinkedIn: "linkedin",
};

const index = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Selected Project", id: "work" },
  { label: "Contact", id: "contact" },
];

export function Rail() {
  const [active, setActive] = React.useState<string>("about");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of index) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="masthead border-b-2 border-border px-6 py-9 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-y-auto lg:border-b-0 lg:border-r-2 lg:px-10 lg:py-12">
      <div>
        <Link
          href="#top"
          className="font-display text-3xl font-semibold leading-none tracking-tight"
        >
          {site.name}
        </Link>
        <p className="mt-3 font-mono text-base uppercase tracking-[0.12em] text-muted-foreground">
          {site.role}
        </p>
        <p className="mt-3 font-mono text-base uppercase tracking-[0.12em] text-muted-foreground">
          {site.location}
        </p>
        <p className="mt-6 flex items-center gap-2.5 font-mono text-base text-muted-foreground">
          <span className="inline-block h-2.5 w-2.5 bg-primary" aria-hidden />
          {site.availability}
        </p>
      </div>

      <nav className="mt-8 lg:mt-0" aria-label="Sections">
        <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:block lg:space-y-2">
          {index.map((i) => {
            const isActive = active === i.id;
            return (
              <li key={i.id}>
                <Link
                  href={`#${i.id}`}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-sm px-3 py-2 font-display text-base uppercase tracking-wide transition-colors",
                    isActive
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-block h-2 w-2 shrink-0 transition-colors",
                      isActive
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-foreground/40",
                    )}
                  />
                  {i.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-10 lg:mt-0">
        <a
          href={`mailto:${site.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex max-w-fit items-center gap-2.5 rounded-sm px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <PixelIcon name="mail" className="h-3.5 w-3.5 shrink-0" />
          {site.email}
        </a>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-sm px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <PixelIcon
                name={socialIcon[s.label]}
                className="h-3.5 w-3.5 shrink-0"
              />
              {s.label}
            </a>
          ))}
        </div>

        <div className="mt-6">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
