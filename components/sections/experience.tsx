"use client";

import { workExperience } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

function ExperienceItem({ job }: { job: any }) {
  const [expanded, setExpanded] = useState(false);
  const current = /present/i.test(job.period);

  const previewCount = 2;
  const isExpandable = job.highlights.length > previewCount;

  const visibleHighlights = expanded
    ? job.highlights
    : job.highlights.slice(0, previewCount);

  return (
    <li className="group relative grid grid-cols-[auto_1fr] gap-6">
      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 h-full w-px bg-border" />

        <div className="relative z-10 mt-2 h-3 w-3 rounded-full border-2 border-background bg-primary" />
      </div>

      <div className="group">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between py-3">
          <div className="group relative">
            {job.logo && (
              <img
                src={job.logo}
                alt=""
                className="
                  py-2
                  absolute
                  -left-16
                  top-1
                  w-24
                  rounded-md
                  border
                  border-border
                  object-contain
                  opacity-0
                  transition-all
                  duration-300
                  ease-out
                  group-hover:translate-x-0
                  group-hover:scale-100
                  group-hover:opacity-100
                  -translate-x-2
                  opacity-0
                  group-hover:translate-x-0
                  group-hover:opacity-100
                  z-20
                  bg-white
                "
              />
            )}

            <div
              className="
                transition-transform
                duration-300
                ease-out
                group-hover:translate-x-10
              "
            >
              <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                {job.role}
                <span className="text-muted-foreground"> · {job.company}</span>
              </h3>

              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {job.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            {current && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
            {job.period}
          </div>
        </div>

        <div className="mt-4">
          <motion.ul
            initial={false}
            animate={{ height: expanded ? "auto" : "auto" }}
            className="space-y-2 overflow-hidden"
          >
            {visibleHighlights.map((h: string, i: number) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-3 text-muted-foreground"
              >
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{h}</span>
              </motion.li>
            ))}
          </motion.ul>

          {!expanded && isExpandable && (
            <div className="pointer-events-none mt-[-2.5rem] h-10 bg-gradient-to-t from-background to-transparent" />
          )}
        </div>

        {isExpandable && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-sm font-mono text-primary transition-opacity hover:opacity-70"
          >
            {expanded ? "Show less ↑" : "Show more ↓"}
          </button>
        )}

        {job.tags && (
          <div className="mt-4 flex flex-wrap gap-2 py-3">
            {job.tags.map((t: string) => (
              <Badge
                key={t}
                variant="outline"
                className="font-mono bg-secondary"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-8 py-8 lg:py-10">
      <SectionLabel count={workExperience.length}>Experience</SectionLabel>

      <ol className="mt-10">
        {workExperience.map((job, i) => (
          <ExperienceItem key={i} job={job} />
        ))}
      </ol>
    </section>
  );
}
