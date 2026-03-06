"use client";

import Link from "next/link";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import ChatWidget from "./components/ChatWidget";

type BillingPeriod = "mensual" | "semestral" | "anual";
type PlanName = "Starter" | "Pro" | "Elite";

export default function Home() {
  const phoneE164 = "593992954635";
  const waText = encodeURIComponent(
    "Hola, vi tu página y quiero información sobre automatizaciones con IA para mi negocio."
  );
  const waLink = `https://wa.me/${phoneE164}?text=${waText}`;

  const waDemoText = encodeURIComponent(
    "Hola, quiero ver una demo rápida de cómo funciona el bot (WhatsApp + Calendar/Sheets)."
  );
  const waDemoLink = `https://wa.me/${phoneE164}?text=${waDemoText}`;

  // (Opcional) Si luego pones Calendly/Agenda, pega el link aquí.
  // Si no tienes, déjalo vacío y el botón se ocultará.
  const callLink = ""; // ejemplo: "https://calendly.com/tuusuario/15min"

  const [period, setPeriod] = useState<BillingPeriod>("mensual");

  // ✅ PRECIOS (NO TOCO NADA)
  const prices: Record<BillingPeriod, Record<PlanName, number>> = {
    mensual: { Starter: 149, Pro: 359, Elite: 599 },
    semestral: { Starter: 789, Pro: 1199, Elite: 1899 },
    anual: { Starter: 1499, Pro: 2299, Elite: 3199 },
  };

  const months: Record<BillingPeriod, number> = { mensual: 1, semestral: 6, anual: 12 };
  const label: Record<BillingPeriod, string> = { mensual: "mes", semestral: "6 meses", anual: "año" };

  const money = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  function price(plan: PlanName) {
    return prices[period][plan];
  }
  function perMonth(plan: PlanName) {
    return Math.round(prices[period][plan] / months[period]);
  }

  // ✅ “Qué incluye” (esto es lo que sube conversion y te protege de perder)
  const includedByPlan: Record<PlanName, { items: string[]; limits: string[] }> = {
    Starter: {
      items: [
        "ChatBot WhatsApp (admisión/consultas)",
        "FAQs servicios/precios",
        "Captura de datos (nombre, necesidad, horario)",
        "Registro en Google Sheets/CRM",
      ],
      limits: [
        "Incluye: 1 flujo principal + 1 iteración de ajustes",
        "Incluye: hasta 2 cambios menores / mes",
        "Consumo (IA/WhatsApp) puede variar por uso",
      ],
    },
    Pro: {
      items: [
        "Todo Starter",
        "Clasificación automática (lead calificado/no calificado)",
        "Agendamiento inteligente",
        "Recordatorios + confirmación (reduce no-shows)",
        "Reportes mensuales básicos",
      ],
      limits: [
        "Incluye: 2 flujos + rutas por servicio",
        "Incluye: hasta 4 cambios menores / mes",
        "Consumo (IA/WhatsApp) puede variar por uso",
      ],
    },
    Elite: {
      items: [
        "Todo Pro",
        "Integraciones avanzadas (n8n)",
        "Rutas por servicio/sucursal",
        "Seguimiento post-consulta",
        "Optimización mensual (mejora de guión y métricas)",
      ],
      limits: [
        "Incluye: multi-servicios / multi-sucursal (según alcance)",
        "Incluye: hasta 8 cambios menores / mes",
        "Consumo (IA/WhatsApp) puede variar por uso",
      ],
    },
  };

  const plans = [
    { name: "Starter" as const, highlight: false },
    { name: "Pro" as const, highlight: true },
    { name: "Elite" as const, highlight: false },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/30" />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide">AI COMPANY JB</p>
              <p className="text-xs text-white/60">Automatización con IA</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#servicios" className="hover:text-white">Servicios</a>
            <a href="#paraquien" className="hover:text-white">Para quién</a>
            <a href="#demo" className="hover:text-white">Demo</a>
            <a href="#planes" className="hover:text-white">Planes</a>
            <a href="#proceso" className="hover:text-white">Proceso</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
            <Link href="/web-con-ia" className="hover:text-white">
              Web con IA
            </Link>
          </nav>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
          >
            WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-24 right-[-60px] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              ⚡ Responde y agenda automáticamente 24/7
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Bots automatizados con IA para WhatsApp que{" "}
              <span className="text-emerald-300">agendan más citas</span> y{" "}
              <span className="text-emerald-300">no pierden clientes</span>.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
              Implemento automatizaciones que convierten WhatsApp en tu mejor vendedor:
              atención 24/7, calificación de leads, agendamiento y seguimiento con recordatorios.
              Integración con Google Calendar, Sheets y tu proceso actual.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
              >
                Escríbeme por WhatsApp
              </a>
              <a
                href="#demo"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver demo
              </a>

              {callLink ? (
                <a
                  href={callLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
                >
                  Agendar llamada
                </a>
              ) : null}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Atención 24/7</p>
                <p className="mt-1">Respuestas instantáneas y automáticas.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Agendamiento</p>
                <p className="mt-1">Agenda en Google Calendar + recordatorios.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Orden</p>
                <p className="mt-1">Leads, citas y métricas en Sheets/CRM.</p>
              </div>
            </div>

            {/* Indicadores que medimos (sin prometer números fake) */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold">Necesidades que cubrimos</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  ["Tiempo de respuesta", "Respuesta del bot en segundos."],
                  ["Citas confirmadas", "Recordatorios + confirmación y seguimiento."],
                  ["Leads ordenados", "Registro automático."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                    <p className="text-sm font-semibold">{t}</p>
                    <p className="mt-1 text-xs text-white/60">{d}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Servicios</h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Automatizaciones diseñadas para que WhatsApp responda rápido, capture clientes
          y cierre citas sin perder tiempo.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Bot para WhatsApp (IA + reglas)",
              desc: "Responde consultas, captura datos y guía al cliente a una acción (agendar / cotizar / comprar).",
            },
            {
              title: "Agendamiento + Recordatorios",
              desc: "Citas automáticas, confirmación y recordatorios para reducir ausencias (no-shows).",
            },
            {
              title: "Integraciones",
              desc: "Google Calendar, Google Sheets, CRM y flujos según tu operación.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-lg font-semibold">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quién es */}
<section id="para-quien-es" className="mx-auto max-w-6xl px-5 py-16">
  <h2 className="text-2xl font-bold md:text-3xl">Para quién es</h2>

  {/* ✅ Opción B (texto general) */}
  <p className="mt-2 max-w-3xl text-white/70">
    Principalmente ayudamos a <span className="font-semibold text-white/80">Clínicas</span>,{" "}
    <span className="font-semibold text-white/80">Airbnb</span> y{" "}
    <span className="font-semibold text-white/80">Ecommerce</span> a responder al instante,
    capturar leads y automatizar seguimiento. Pero si tu caso es más técnico, también lo hacemos:
    <span className="font-semibold text-white/80">
      {" "}
      integraciones a medida, automatización con n8n y extracción de datos SQL
    </span>
    .
  </p>

  <div className="mt-8 grid gap-4 md:grid-cols-3">
    {[
      {
        title: "Clínicas / Odontologías",
        desc: "Admisión, agendamiento, confirmaciones, recordatorios, seguimiento post-consulta y registro automático de pacientes/leads.",
      },
      {
        title: "Airbnb / Rentas",
        desc: "Respuestas rápidas, check-in/out, reglas de casa, preguntas frecuentes, soporte al huésped y automatización de mensajes.",
      },
      {
        title: "Ecommerce",
        desc: "Atención y ventas 24/7, estado de pedidos, catálogo, preguntas frecuentes, captación de leads y seguimiento automatizado.",
      },
    ].map((c) => (
      <div
        key={c.title}
        className="rounded-2xl border border-white/10 bg-white/5 p-6"
      >
        <p className="text-lg font-semibold">{c.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{c.desc}</p>
      </div>
    ))}
  </div>

  {/* Nota final opcional (queda pro y no rompe el diseño) */}
  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
    <p className="text-sm text-white/70">
      <span className="font-semibold text-white">¿Tu negocio es otro?</span>{" "}
      También trabajamos a nivel general: automatizaciones internas, integraciones con herramientas
      existentes (CRMs, Sheets, Calendar) y casos avanzados con SQL.
    </p>
  </div>
</section>
      {/* Demo */}
      <section id="demo" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Demo rápida</h2>
            <p className="mt-2 max-w-3xl text-white/70">
              Te muestro el flujo típico: llega el mensaje → el bot responde → agenda → queda registrado.
            </p>
          </div>

          <a
            href={waDemoLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
          >
            Pedir demo por WhatsApp
          </a>
        </div>

        {/* Placeholder para video / Loom */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="aspect-video w-full rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
            <p className="text-sm font-semibold">Aquí puedes poner un video</p>
            <p className="mt-2 text-sm text-white/70">
              Tip: graba pantalla (20–40s) mostrando WhatsApp → Calendar → Sheets y lo embebemos.
              Si luego me pasas un link (Loom/Drive/YouTube), lo dejo listo.
            </p>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Cómo trabajamos</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["1) Diagnóstico", "Entiendo tu negocio y el flujo ideal (qué preguntas, qué datos, qué acción)."],
            ["2) Propuesta", "Definimos plan, integraciones y alcance (incluye límites de consumo)."],
            ["3) Implementación", "Configuro, pruebo y dejo listo para operar con entregables claros."],
            ["4) Soporte", "Ajustes, mejoras y monitoreo según el plan elegido."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="font-semibold">{t}</p>
              <p className="mt-2 text-sm text-white/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Planes</h2>
            <p className="mt-2 max-w-3xl text-white/70">
              Los planes incluyen implementación, soporte para que el consumo (IA/WhatsApp)
              no te agarre por sorpresa. En la propuesta te dejo el detalle final según integraciones.
            </p>

            {/* Botones Mensual / Semestral / Anual */}
            <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
              {(["mensual", "semestral", "anual"] as BillingPeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={[
                    "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                    period === p ? "bg-white/15 text-white" : "text-white/70 hover:text-white",
                  ].join(" ")}
                  type="button"
                >
                  {p === "mensual" ? "Mensual" : p === "semestral" ? "Semestral" : "Anual"}
                </button>
              ))}
            </div>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-orange-400"
          >
            Cotizar por WhatsApp
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((p) => {
            const pack = includedByPlan[p.name];
            return (
              <div
                key={p.name}
                className={[
                  "rounded-2xl border bg-white/5 p-6",
                  p.highlight
                    ? "border-emerald-400/40 ring-1 ring-emerald-400/30"
                    : "border-white/10",
                ].join(" ")}
              >
                <p className="text-lg font-semibold">{p.name}</p>

                <p className="mt-2 text-3xl font-bold">
                  {money.format(price(p.name))}{" "}
                  <span className="text-base font-semibold text-white/70">/ {label[period]}</span>
                </p>

                {period !== "mensual" && (
                  <p className="mt-2 text-sm text-white/60">
                    Equivale a{" "}
                    <span className="font-semibold text-white/80">{money.format(perMonth(p.name))}</span>{" "}
                    / mes
                  </p>
                )}

                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Incluye</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {pack.items.map((it) => (
                        <li key={it} className="flex gap-2">
                          <span className="mt-[3px] h-2 w-2 rounded-full bg-emerald-400/70" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
                    <p className="text-xs font-semibold text-white/80">Notas de alcance</p>
                    <ul className="mt-2 space-y-1 text-xs text-white/60">
                      {pack.limits.map((it) => (
                        <li key={it}>• {it}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
                >
                  Cotizar {p.name}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Preguntas frecuentes</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            [
              "¿Funciona con mi WhatsApp?",
              "Sí. Se adapta a tu operación. Definimos el mejor método según tu negocio y el proveedor de WhatsApp API.",
            ],
            [
              "¿Cuánto tarda?",
              "Un MVP suele estar listo en 3–7 días (depende de integraciones y alcance).",
            ],
            [
              "¿Qué necesito para integrar?",
              "Depende: Calendar, Sheets, CRM, formularios, n8n, etc. En diagnóstico definimos lo mínimo viable.",
            ],
            [
              "¿Qué pasa si quiero cambios?",
              "Se trabaja por iteraciones según plan. Puedes escribir por WhatsApp y lo ajusto contigo.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="font-semibold">{q}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-semibold">¿Listo para automatizar?</p>
              <p className="mt-1 text-sm text-white/70">
                Escríbeme y te respondo con una propuesta en base a tu negocio.
              </p>
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
            >
              Hablar por WhatsApp
            </a>
          </div>

          <p className="mt-10 text-xs text-white/40">
            © {new Date().getFullYear()} IA COMPANY JB, todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Burbuja de chat (si no hay créditos, igual sirve como “asistente de cotización”) */}
      <ChatWidget />

      {/* Analytics */}
      <Analytics />
    </main>
  );
}