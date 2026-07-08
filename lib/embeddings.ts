// Embeddings via any OpenAI-compatible /embeddings endpoint. Used both by the
// build-embeddings script (to index chunks) and at request time (to embed the
// query). If no key is set, semantic retrieval is skipped and BM25 is used.

export function embeddingsConfigured(): boolean {
  return Boolean(process.env.EMBEDDINGS_API_KEY);
}

export async function embed(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.EMBEDDINGS_API_KEY;
  const baseUrl = process.env.EMBEDDINGS_BASE_URL ?? "https://api.openai.com/v1";
  const model = process.env.EMBEDDINGS_MODEL ?? "text-embedding-3-small";

  if (!apiKey) throw new Error("embeddings_not_configured");

  const res = await fetch(`${baseUrl}/embeddings`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, input: texts }),
  });

  if (!res.ok) throw new Error(`embeddings_upstream_${res.status}`);

  const data = await res.json();
  // OpenAI-compatible: { data: [{ embedding: number[] }, ...] } in input order
  return (data?.data ?? []).map((d: { embedding: number[] }) => d.embedding);
}

export function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}
