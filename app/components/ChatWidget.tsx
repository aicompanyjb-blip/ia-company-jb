"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };
type Mode = "ai" | "lead";

export default function ChatWidget() {
  const waPhoneE164 = "593992954635";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const [mode, setMode] = useState<Mode>("ai");
  const [leadStep, setLeadStep] = useState(0);
  const [lead, setLead] = useState({ negocio: "", objetivo: "", ciudad: "" });

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de AI COMPANY JB. ¿Qué tipo de negocio tienes y qué te gustaría automatizar (respuestas, citas, seguimiento)?",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages]);

  const waLink = useMemo(() => {
    const text = encodeURIComponent(
      `Hola, quiero una cotización.\n\nNegocio: ${lead.negocio || "(sin indicar)"}\nObjetivo: ${
        lead.objetivo || "(sin indicar)"
      }\nCiudad: ${lead.ciudad || "(sin indicar)"}\n\nVengo desde la web.`
    );
    return `https://wa.me/${waPhoneE164}?text=${text}`;
  }, [lead, waPhoneE164]);

  function startLeadFlow() {
    setMode("lead");
    setLeadStep(0);
    setLead({ negocio: "", objetivo: "", ciudad: "" });

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Ahora mismo el chat IA está en modo cotización. Te hago 3 preguntas y te dejo listo el mensaje para WhatsApp.\n\n1) ¿Qué tipo de negocio tienes?",
      },
    ]);
  }

  function handleLead(text: string) {
    if (leadStep === 0) {
      setLead((p) => ({ ...p, negocio: text }));
      setLeadStep(1);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "2) ¿Cuál es tu objetivo principal? (citas / ventas / soporte / info)" },
      ]);
      return;
    }
    if (leadStep === 1) {
      setLead((p) => ({ ...p, objetivo: text }));
      setLeadStep(2);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "3) ¿En qué ciudad estás y cuál es tu horario de atención?" },
      ]);
      return;
    }
    if (leadStep === 2) {
      setLead((p) => ({ ...p, ciudad: text }));
      setLeadStep(3);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Listo ✅ Ya tengo la info. Dale clic a “Abrir WhatsApp” y te envío una propuesta rápida.",
        },
      ]);
      return;
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    // Si estamos en modo cotización, no llamamos al endpoint
    if (mode === "lead") {
      handleLead(text);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: text }] }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };
      const reply =
        data.reply ??
        data.error ??
        "Hubo un problema. Intenta de nuevo en unos segundos.";

      // Detecta si el server está en fallback (sin créditos)
      const lower = reply.toLowerCase();
      const looksLikeFallback =
        lower.includes("mantenimiento") ||
        lower.includes("límite de uso") ||
        lower.includes("modo cotización") ||
        lower.includes("escríbeme por whatsapp");

      if (looksLikeFallback) {
        setLoading(false);
        startLeadFlow();
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      // Si falla la conexión, pasamos a lead flow (mejor que quedarse muerto)
      startLeadFlow();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-[9999] w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/30" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">
                  {mode === "lead" ? "Cotización rápida" : "Asistente IA"}
                </p>
                <p className="text-xs text-white/60">AI COMPANY JB</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-sm text-white/70 hover:bg-white/10 hover:text-white"
              type="button"
            >
              ✕
            </button>
          </div>

          <div
            ref={listRef}
            className="max-h-[55vh] space-y-3 overflow-y-auto px-4 py-4 text-sm"
          >
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed",
                    m.role === "user" ? "bg-emerald-500 text-zinc-950" : "bg-white/10 text-white",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && <div className="text-xs text-white/60">Escribiendo...</div>}

            {mode === "lead" && leadStep >= 3 && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
              >
                Abrir WhatsApp
              </a>
            )}
          </div>

          <div className="border-t border-white/10 bg-white/5 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Escribe tu mensaje..."
                className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-2 text-sm outline-none placeholder:text-white/40 focus:border-emerald-400/50"
              />
              <button
                onClick={send}
                disabled={loading}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 disabled:opacity-60"
                type="button"
              >
                Enviar
              </button>
            </div>

            {mode !== "lead" && (
              <button
                onClick={startLeadFlow}
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
                type="button"
              >
                Cotización rápida (sin IA)
              </button>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[9999] inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 shadow-xl hover:bg-emerald-400"
        type="button"
        aria-label="Abrir chat"
        title="Abrir chat"
      >
        💬
      </button>
    </>
  );
}