import Link from "next/link";
import { site } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/sections/terminal";

export function Hero() {
  return (
    <section className="py-8 lg:py-16">
      <Terminal />
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button asChild>
          <Link href="#experience">View My Journey</Link>
        </Button>
        <Link
          href="#contact"
          className="font-mono text-base underline-offset-4 hover:underline"
        >
          $ contact &rarr;
        </Link>
      </div>
    </section>
  );
}
