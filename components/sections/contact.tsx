import { site } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-8 border-border py-8 lg:py-12">
      <SectionLabel>Contact</SectionLabel>
      <p className="mt-8 font-mono text-2xl font-normal leading-[1.1] tracking-tight">
        <span className="text-muted-foreground">Have something worth building? </span>
        Let&apos;s talk.
      </p>
      <div className="mt-10">
        <Button asChild size="lg">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </Button>
      </div>
    </section>
  );
}
