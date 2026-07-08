import { NextRequest } from "next/server";
import { site } from "@/data/portfolio";
import { buildChunks, type Chunk } from "@/lib/knowledge";
import { retrieveHybrid } from "@/lib/retriever";

export const runtime = "nodejs";

// RAG: the prompt is built from the chunks retrieved for THIS question, not the whole CV.).
function systemPrompt(context: Chunk[]): string {
  const ctx = context.map((c) => `- ${c.text}`).join("\n");
  return `You are a friendly assistant embedded in ${site.name}'s portfolio website.
Answer questions about ${site.name} in a warm, concise, first-person voice (as if you are ${site.name}).
Rules:
- Use ONLY the CONTEXT below (retrieved from ${site.name}'s CV). If the answer isn't there, say you don't have that detail and suggest emailing ${site.email}.
- Keep answers short (1-4 sentences) unless asked for more.
- Never invent employers, dates, numbers, or technologies.

CONTEXT:
${ctx}`;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.LLM_API_KEY;
  const baseUrl = process.env.LLM_BASE_URL ?? "https://api.groq.com/openai/v1";
  const model = process.env.LLM_MODEL ?? "llama-3.1-8b-instant";

  if (!apiKey) {
    return Response.json({ error: "not_configured" }, { status: 501 });
  }

  let messages: ChatMessage[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const trimmed = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-8);

  // Retrieve
  // Use the latest user turn as the retrieval query.
  const query =
    [...trimmed].reverse().find((m) => m.role === "user")?.content ?? "";
  const retrieved = (await retrieveHybrid(query, 4)).map((r) => r.chunk);
  // Fallback: if nothing matched, use the whole (small) CV so we never answer blind.
  const context = retrieved.length ? retrieved : buildChunks();

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 400,
        messages: [{ role: "system", content: systemPrompt(context) }, ...trimmed],
      }),
    });

    if (!res.ok) {
      return Response.json(
        { error: "upstream", status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? "";
    return Response.json({ reply, sources: context.map((c) => c.section) });
  } catch {
    return Response.json({ error: "network" }, { status: 502 });
  }
}
