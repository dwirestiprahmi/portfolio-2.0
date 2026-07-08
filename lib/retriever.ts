import { buildChunks, type Chunk } from "./knowledge";
import { embeddingsConfigured, embed, cosine } from "./embeddings";
import embeddingsData from "../data/embeddings.json";

const EMB = embeddingsData as {
  model: string;
  dim: number;
  items: { id: string; vector: number[] }[];
};

// Keep tokens like "c++", "c#", "node.js"; split on everything else.
function tokenize(s: string): string[] {
  return s.toLowerCase().match(/[a-z0-9+#.]+/g) ?? [];
}

type Doc = { chunk: Chunk; len: number; tf: Map<string, number> };

let CHUNKS: Chunk[] | null = null;
let BY_ID: Map<string, Chunk> | null = null;
let LEX: { docs: Doc[]; idf: Map<string, number>; avgLen: number } | null = null;

function ensure() {
  if (CHUNKS) return;
  CHUNKS = buildChunks();
  BY_ID = new Map(CHUNKS.map((c) => [c.id, c]));

  const docs: Doc[] = CHUNKS.map((chunk) => {
    const tokens = tokenize(chunk.text);
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { chunk, len: tokens.length, tf };
  });

  const df = new Map<string, number>();
  for (const d of docs) for (const t of Array.from(d.tf.keys())) df.set(t, (df.get(t) ?? 0) + 1);

  const N = docs.length;
  const idf = new Map<string, number>();
  for (const [t, f] of Array.from(df)) idf.set(t, Math.log(1 + (N - f + 0.5) / (f + 0.5)));

  const avgLen = docs.reduce((s, d) => s + d.len, 0) / N;
  LEX = { docs, idf, avgLen };
}

export type Retrieved = { chunk: Chunk; score: number };
type Scored = { id: string; score: number };

// BM25 (lexical)
function lexicalScores(query: string): Scored[] {
  ensure();
  const { docs, idf, avgLen } = LEX!;
  const terms = tokenize(query);
  const k1 = 1.5;
  const b = 0.75;
  return docs.map((d) => {
    let score = 0;
    for (const term of terms) {
      const f = d.tf.get(term);
      if (!f) continue;
      score +=
        (idf.get(term) ?? 0) *
        ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
    }
    return { id: d.chunk.id, score };
  });
}

function toRetrieved(scored: Scored[], k: number): Retrieved[] {
  ensure();
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => ({ chunk: BY_ID!.get(s.id)!, score: s.score }))
    .filter((r) => r.chunk);
}

// Lexical-only retrieval (kept as the fallback and for back-compat).
export function retrieve(query: string, k = 4): Retrieved[] {
  return toRetrieved(lexicalScores(query), k);
}

// Reciprocal Rank Fusion
function rrf(a: Scored[], b: Scored[], k: number, c = 60): Retrieved[] {
  ensure();
  const rankMap = (arr: Scored[]) => {
    const m = new Map<string, number>();
    [...arr]
      .filter((s) => s.score > 0)
      .sort((x, y) => y.score - x.score)
      .forEach((s, i) => m.set(s.id, i + 1));
    return m;
  };
  const ra = rankMap(a);
  const rb = rankMap(b);
  const ids = new Set<string>([...Array.from(ra.keys()), ...Array.from(rb.keys())]);

  const fused: Scored[] = Array.from(ids).map((id) => {
    let score = 0;
    const x = ra.get(id);
    if (x) score += 1 / (c + x);
    const y = rb.get(id);
    if (y) score += 1 / (c + y);
    return { id, score };
  });

  return fused
    .sort((x, y) => y.score - x.score)
    .slice(0, k)
    .map((s) => ({ chunk: BY_ID!.get(s.id)!, score: s.score }))
    .filter((r) => r.chunk);
}

// Hybrid: BM25 + semantic (cosine over precomputed embeddings), fused.
// Falls back to lexical when embeddings aren't configured or the index is empty
// or the query embedding fails, so retrieval always returns something.
export async function retrieveHybrid(query: string, k = 4): Promise<Retrieved[]> {
  const lexical = lexicalScores(query);

  if (!embeddingsConfigured() || EMB.items.length === 0) {
    return toRetrieved(lexical, k);
  }

  try {
    const [qvec] = await embed([query]);
    const semantic: Scored[] = EMB.items.map((it) => ({
      id: it.id,
      score: cosine(qvec, it.vector),
    }));
    console.log("retrieved semantically")
    return rrf(lexical, semantic, k);
  } catch {
    return toRetrieved(lexical, k);
  }
}
