"use client";

import { education } from "@/data/portfolio";
import { SectionLabel } from "@/components/section-label";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function EducationItem({ e, i }: { e: any; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const isOffset = i % 2 !== 0;

  const hasDetail = Boolean(e.detail);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay: i * 0.06,
      }}
      viewport={{ once: true, margin: "-40px" }}
      className={`
        relative
        max-w-3xl
        ${isOffset ? "ml-auto pl-6 sm:pl-10" : "pr-6 sm:pr-10"}
      `}
    >
      <div
        className={`
          absolute top-5 h-px bg-border
          ${isOffset ? "left-0 w-6 sm:w-10" : "right-0 w-6 sm:w-10"}
        `}
      />

      <div
        onClick={() => hasDetail && setExpanded(!expanded)}
        className={`
          relative group rounded-lg border border-border bg-muted/20 p-5
          transition-all duration-200
          hover:bg-muted/40 hover:-translate-y-0.5
          ${hasDetail ? "cursor-pointer" : ""}
        `}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl tracking-tight sm:text-2xl">
              {e.degree}
              <span className="text-muted-foreground"> · {e.school}</span>
            </h3>

            {e.type && (
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {e.type}
              </p>
            )}
          </div>

          <div className="flex flex-col items-end justify-between gap-2">
            <span className="whitespace-nowrap font-mono text-sm text-muted-foreground">
              {e.period}
            </span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {expanded && hasDetail && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-muted-foreground mb-3">{e.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {hasDetail && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="
              absolute bottom-3 right-3
              p-2 border border-border rounded-xl
              text-muted-foreground
              transition-all duration-200
              hover:bg-muted hover:scale-105
            "
          >
            <div className="text-xs font-mono opacity-70">
              {expanded ? "↑" : "↓"}
            </div>
          </button>
        )}
      </div>
    </motion.li>
  );
}

export function Education() {
  return (
    <section id="education" className="scroll-mt-8 py-8 lg:py-10">
      <SectionLabel count={education.length}>Education</SectionLabel>

      <ol className="mt-6 space-y-6">
        {education.map((e, i) => (
          <EducationItem key={i} e={e} i={i} />
        ))}
      </ol>
    </section>
  );
}
