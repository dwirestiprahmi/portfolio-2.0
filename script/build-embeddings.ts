// One-time (re-run when CV changes): embeds every chunk and writes the
// vectors to data/embeddings.json, which the hybrid retriever reads at runtime.
//
//   EMBEDDINGS_API_KEY=... npm run embeddings
//
import { writeFileSync } from "fs";
import path from "path";
import { buildChunks } from "../lib/knowledge";
import { embed } from "../lib/embeddings";

async function main() {
  const chunks = buildChunks();
  console.log(`Embedding ${chunks.length} chunks…`);

  const vectors = await embed(chunks.map((c) => c.text));
  const items = chunks.map((c, i) => ({ id: c.id, vector: vectors[i] }));

  const out = {
    model: process.env.EMBEDDINGS_MODEL ?? "text-embedding-3-small",
    dim: vectors[0]?.length ?? 0,
    items,
  };

  const file = path.join(process.cwd(), "data", "embeddings.json");
  writeFileSync(file, JSON.stringify(out));
  console.log(`Wrote ${items.length} vectors (dim ${out.dim}) → data/embeddings.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
