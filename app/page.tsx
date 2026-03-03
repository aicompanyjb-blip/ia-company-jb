"use client";

import { useState } from "react";

type BillingPeriod = "mensual" | "semestral" | "anual";
type PlanName = "Starter" | "Pro" | "Elite";

export default function Home() {
  const phoneE164 = "593992954635"; 
  const waText = encodeURIComponent(
    "Hola, vi tu página y quiero información sobre automatizaciones con IA para mi negocio."
  );
  const waLink = `https://wa.me/${phoneE164}?text=${waText}`;

  // ====== Switch Mensual / Semestral / Anual ======
  const [period, setPeriod] = useState<BillingPeriod>("mensual");

  // ✅ AQUÍ EDITAS LOS PRECIOS MANUALMENTE (uno por cada periodo)
  const prices: Record<BillingPeriod, Record<PlanName, number>> = {
    mensual: {
      Starter: 149,
      Pro: 359,
      Elite: 599,
    },
    semestral: {
      Starter: 789,
      Pro: 1199,
      Elite: 1899,
    },
    anual: {
      Starter: 1499,
      Pro: 2299,
      Elite: 3199,
    },
  };

  const months: Record<BillingPeriod, number> = {
    mensual: 1,
    semestral: 6,
    anual: 12,
  };

  const label: Record<BillingPeriod, string> = {
    mensual: "mes",
    semestral: "6 meses",
    anual: "año",
  };

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

  const plans = [
    {
      name: "Starter" as const,
      highlight: false,
      items: [
        "ChatBot WhatsApp admision",
        "FAQ servicios/precios",
        "Registro en Google Sheets/CRM",
        "Soporte 24/7"
      ],
    },
    {
      name: "Pro" as const,
      highlight: true,
      items: [
        "Todo Starter",
        "Clasificación automática",
        "Agendamiento inteligente",
        "Recordatorios, seguimiento y confirmacion",
        "Reportes mensuales",
        "Soporte 24/7"
      ],
    },
    {
      name: "Elite" as const,
      highlight: false,
      items: [
        "Todo Pro",
        "Integraciones avanzadas (n8n)",
        "Rutas por servicio/sucursal",
        "Seguimiento post-consulta",
        "Soporte prioritario",
      ],
    },
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
            <a href="#servicios" className="hover:text-white">
              Servicios
            </a>
            <a href="#planes" className="hover:text-white">
              Planes
            </a>
            <a href="#proceso" className="hover:text-white">
              Proceso
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
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
              ⚡ Responde y agenda automaticamente 24/7
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Bots automatizados con IA para WhatsApp que{" "}
              <span className="text-emerald-300">agendan más citas</span> y{" "}
              <span className="text-emerald-300">no pierden clientes</span>.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
              Diseño e implemento automatizaciones con IA que convierten WhatsApp
              en tu mejor vendedor: atención 24/7, calificación de leads,
              agendamiento y seguimiento con recordatorios. Integración completa
              con Google Calendar, Sheets y tus flujos de trabajo.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
              >
                Escribeme por WhatsApp
              </a>
              <a
                href="#planes"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver planes
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Atención 24/7</p>
                <p className="mt-1">Respuestas instantáneas y automaticas.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Agendamiento</p>
                <p className="mt-1">Agenda en Google Calendar + recordatorios.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Reportes</p>
                <p className="mt-1">Leads y métricas en Sheets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Servicios</h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Planes diseñados para que tu WhatsApp responda rápido, capture clientes
          y cierre citas sin perder tiempo.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Bot para WhatsApp con IA",
              desc: "Responde mediante FAQs, califica al cliente y agenda datos sin perder ventas.",
            },
            {
              title: "Agendamiento + Recordatorios",
              desc: "Citas automáticas y confirmación para reducir ausencias (no-shows).",
            },
            {
              title: "Integraciones",
              desc: "Google Calendar, Google Sheets y flujos según tu operación.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-lg font-semibold">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Cómo trabajamos</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            [
              "1) Diagnóstico",
              "Entiendo tu negocio y el flujo ideal para tu negocio.",
            ],
            ["2) Propuesta", "Te presento el bot y las integraciones."],
            ["3) Implementación", "Configuro, pruebo y dejo listo para operar."],
            ["4) Soporte", "Ajustes y mejoras según necesidad y resultados."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
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
            <p className="mt-2 max-w-2xl text-white/70">
              Estos precios son referenciales, se ajustan mediante las
              integraciones y necesidades de tu negocio.
            </p>

            {/* Botones Mensual / Semestral / Anual */}
            <div className="mt-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-1">
              {(["mensual", "semestral", "anual"] as BillingPeriod[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={[
                    "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                    period === p
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white",
                  ].join(" ")}
                  type="button"
                >
                  {p === "mensual"
                    ? "Mensual"
                    : p === "semestral"
                    ? "Semestral"
                    : "Anual"}
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
          {plans.map((p) => (
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

              {/* Precio dinámico (manual por periodo) */}
              <p className="mt-2 text-3xl font-bold">
                {money.format(price(p.name))}{" "}
                <span className="text-base font-semibold text-white/70">
                  / {label[period]}
                </span>
              </p>

              {/* Equivalente mensual (solo semestral/anual) */}
              {period !== "mensual" && (
                <p className="mt-2 text-sm text-white/60">
                  Equivale a{" "}
                  <span className="font-semibold text-white/80">
                    {money.format(perMonth(p.name))}
                  </span>{" "}
                  / mes
                </p>
              )}

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-[3px] h-2 w-2 rounded-full bg-emerald-400/70" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
              >
                Elegir {p.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Preguntas frecuentes</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            [
              "¿Funciona con mi WhatsApp?",
              "Sí. Se conecta con tu flujo actual y se adapta al negocio. Definimos el mejor método según tu operación.",
            ],
            [
              "¿Cuánto tarda?",
              "Un MVP suele estar listo en 3-7 dias, dependiendo de la intergraciones y alcance",
            ],
            [
              "¿Que necesito para integrar?",
              "Suele depender de que tipo de ingraciones requiera, implementamos esto a cualquier aplicativo o web",
            ],
            [
              "¿Qué pasa si quiero cambios?",
              "Se contacta al WhatsApp o escribe a la IA de nuestra web"
            ],
          ].map(([q, a]) => (
            <div
              key={q}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
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
            © {new Date().getFullYear()} IA COMPANY JB, todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}