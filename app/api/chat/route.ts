import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant" | "system"; content: string };

function fallbackReply() {
  return (
    "Ahora mismo el asistente IA está en mantenimiento (límite de uso). " +
    "Para una cotización rápida, escríbeme por WhatsApp desde el botón de la página y te atiendo enseguida."
  );
}

function isQuotaOrBillingError(e: any) {
  const status = e?.status;
  const code = e?.code;
  const msg = String(e?.message ?? "").toLowerCase();

  return (
    status === 429 ||
    code === "insufficient_quota" ||
    msg.includes("exceeded your current quota") ||
    msg.includes("insufficient_quota") ||
    msg.includes("billing") ||
    msg.includes("quota")
  );
}

function isMissingKeyError(e: any) {
  const msg = String(e?.message ?? "").toLowerCase();
  return msg.includes("missing credentials") || msg.includes("api_key");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: Msg[] };
    const messages = body.messages ?? [];

    const last = messages[messages.length - 1];
    if (!last || last.role !== "user" || !last.content?.trim()) {
      // Devolvemos un reply amigable (sin error feo)
      return NextResponse.json({
        reply:
          "No alcancé a leer tu mensaje. ¿Puedes escribirlo otra vez? 🙂",
      });
    }

    // Si no hay API key, responde bonito
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: fallbackReply() });
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
    // ✅ Si es 429 / sin cuota / billing, respondemos bonito (sin error técnico)
    if (isQuotaOrBillingError(e) || isMissingKeyError(e)) {
      return NextResponse.json({ reply: fallbackReply() });
    }

    // Cualquier otro error: también lo maquillamos para el usuario
    return NextResponse.json({
      reply:
        "Me encuentro en mantenimiento. Escríbeme por WhatsApp y te atiendo enseguida.",
    });
  }
}