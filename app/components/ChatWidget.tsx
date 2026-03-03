"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy la IA de AI COMPANY JB. ¿Qué tipo de negocio tienes y qué te gustaría automatizar (respuestas, citas, seguimiento)?",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMsgs: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMsgs);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMsgs }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Hubo un problema. Intenta de nuevo en unos segundos.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "No pude conectarme. Revisa tu internet e inténtalo otra vez.",
        },
      ]);
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
                <p className="text-sm font-semibold">Asistente IA</p>
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
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={[
                    "max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed",
                    m.role === "user"
                      ? "bg-emerald-500 text-zinc-950"
                      : "bg-white/10 text-white",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && <div className="text-xs text-white/60">Escribiendo...</div>}
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