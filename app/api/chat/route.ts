import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant" | "system"; content: string };

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: Msg[] };
    const messages = body.messages ?? [];

    const last = messages[messages.length - 1];
    if (!last || last.role !== "user" || !last.content?.trim()) {
      return NextResponse.json({ error: "Missing user message" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const system: Msg = {
      role: "system",
      content:
        "Eres el asistente de AI COMPANY JB. Tu objetivo: entender el negocio del usuario y recomendar automatizaciones con IA en WhatsApp (atención, agendamiento, recordatorios e integraciones). Haz preguntas cortas y claras. Si preguntan por precios, explica que depende de integraciones y propone cotizar por WhatsApp.",
    };

    const trimmed = messages.slice(-12);

    const response = await client.responses.create({
      model: "gpt-5",
      input: [system, ...trimmed],
    });

    return NextResponse.json({ reply: response.output_text });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}