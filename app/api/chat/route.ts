import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = (await req.json()) as { message?: string };

  const text = (message ?? "").toLowerCase();

  let reply =
    "Genial. ¿Tu negocio es clínica, servicios o alquileres (Airbnb)? ¿Qué quieres automatizar: agendamiento, respuestas, o seguimiento?";

  if (text.includes("precio") || text.includes("costo")) {
    reply =
      "Depende de integraciones y alcance. Si me dices tu tipo de negocio y qué necesitas (agendar, responder, recordatorios), te doy una propuesta.";
  }

  return NextResponse.json({ reply });
}