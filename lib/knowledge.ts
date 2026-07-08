import {
  site,
  about,
  skills,
  workExperience,
  education,
  projects,
  social,
} from "../data/portfolio";

export type Chunk = { id: string; section: string; text: string };

// Turn the CV data into retrieval chunks. Each chunk is prefixed with section
// synonyms ("work experience / employment", "skills / technologies", …) so a
// lexical retriever matches natural questions even when the exact word isn't
// in the underlying fact.
export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "identity",
    section: "identity",
    text: `About / who is ${site.name}: ${site.name} is a ${site.role} based in ${site.location}. ${site.tagline} Availability: ${site.availability}.`,
  });

  about.forEach((p, i) =>
    chunks.push({ id: `about-${i}`, section: "about", text: `About / bio / summary: ${p}` })
  );

  skills.forEach((g, i) =>
    chunks.push({
      id: `skills-${i}`,
      section: "skills",
      text: `Skills / technologies / programming languages / frameworks / tools — ${g.category}: ${g.items.join(", ")}.`,
    })
  );

  workExperience.forEach((j, i) =>
    chunks.push({
      id: `experience-${i}`,
      section: "experience",
      text: `Work experience / employment history / job / role: ${j.role} at ${j.company} (${j.location}), ${j.period}. ${j.highlights.join(" ")}`,
    })
  );

  projects.forEach((p, i) =>
    chunks.push({
      id: `project-${i}`,
      section: "projects",
      text: `Project / portfolio work: ${p.title} (${p.year}, ${p.role}) — ${p.summary} Stack: ${p.stack.join(", ")}.`,
    })
  );

  education.forEach((e, i) =>
    chunks.push({
      id: `education-${i}`,
      section: "education",
      text: `Education / studies / degree / university: ${e.degree}, ${e.school}, ${e.period}.${e.detail ? " " + e.detail : ""}`,
    })
  );

  chunks.push({
    id: "contact",
    section: "contact",
    text: `Contact / email / reach / hire / get in touch: email ${site.email}. ${social
      .map((s) => `${s.label}: ${s.href}`)
      .join(". ")}.`,
  });

  return chunks;
}
