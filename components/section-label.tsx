import * as React from "react";

export function SectionLabel({
  children,
  count,
}: {
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 font-display text-sm font-medium uppercase tracking-[0.15em]">
          <span className="inline-block h-2 w-2 bg-primary" aria-hidden />
          {children}
        </h2>
        {count !== undefined && (
          <span className="font-mono text-base text-muted-foreground">
            [{count.toString().padStart(2, "0")}]
          </span>
        )}
      </div>
      <div className="rule-pixel mt-3" />
    </div>
  );
}
