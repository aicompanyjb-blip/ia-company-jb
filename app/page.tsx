"use client";

import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import ChatWidget from "./components/ChatWidget";

type PlanName = "Starter" | "Pro" | "Elite";

export default function Home() {
  const phoneE164 = "593992954635";

  const waText = encodeURIComponent(
    "Hola, vi tu página y quiero información sobre automatizaciones con IA para mi clínica odontológica."
  );
  const waLink = `https://wa.me/${phoneE164}?text=${waText}`;

  const waDemoText = encodeURIComponent(
    "Hola, vi la demo. Quiero implementar algo así en mi clínica odontológica (WhatsApp + agenda + recordatorios)."
  );
  const waDemoLink = `https://wa.me/${phoneE164}?text=${waDemoText}`;

  // ✅ Precios SOLO mensuales (NO CAMBIO)
  const monthlyPrices: Record<PlanName, number> = {
    Starter: 99,
    Pro: 179,
    Elite: 299,
  };

  // ✅ Implementación (pago único) — NO CAMBIO
  const setupFee: Record<PlanName, number> = {
    Starter: 299,
    Pro: 349,
    Elite: 599,
  };

  const money = new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  function price(plan: PlanName) {
    return monthlyPrices[plan];
  }

  // ✅ Qué incluye (orientado a clínicas odontológicas)
  const includedByPlan: Record<PlanName, { items: string[]; limits: string[] }> =
    {
      Starter: {
        items: [
          "Bot WhatsApp (admisión/consultas)",
          "FAQ de servicios/precios",
          "Captura de datos del paciente (nombre, motivo, horario)",
          "Registro en Google Sheets/CRM",
        ],
        limits: [
          "Incluye: 1 flujo principal + 1 iteración de ajustes",
          "Incluye: hasta 2 cambios menores / mes",
          "Consumo (IA/WhatsApp) puede variar por uso",
          "La implementación dura 30 días (1 mes)",
        ],
      },
      Pro: {
        items: [
          "Todo Starter",
          "Clasificación (paciente interesado / consulta general)",
          "Agendamiento inteligente",
          "Recordatorios + confirmación (reduce no-shows)",
          "Reportes mensuales básicos",
        ],
        limits: [
          "Incluye: 2 flujos + rutas por servicio",
          "Incluye: hasta 4 cambios menores / mes",
          "Consumo (IA/WhatsApp) puede variar por uso",
          "La implementación dura 30 días (1 mes)",
        ],
      },
      Elite: {
        items: [
          "Todo Pro",
          "Integraciones avanzadas (n8n)",
          "Rutas por especialidad/doctor/sucursal",
          "Seguimiento post-consulta",
          "Optimización mensual (mejora de guión y métricas)",
        ],
        limits: [
          "Incluye: multi-servicios / multi-sucursal (según alcance)",
          "Incluye: hasta 8 cambios menores / mes",
          "Consumo (IA/WhatsApp) puede variar por uso",
          "La implementación dura 30 días (1 mes)",
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
              <p className="text-xs text-white/60">Automatización para clínicas</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#solucion" className="hover:text-white">
              Solución
            </a>
            <a href="#como-funciona" className="hover:text-white">
              Cómo funciona
            </a>
            <a href="#planes" className="hover:text-white">
              Planes
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
            <a href="#demo" className="hover:text-white">
              Demo
            </a>
            <a href="#whatsapp" className="hover:text-white">
              WhatsApp
            </a>
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

      {/* Hero (NO CAMBIO el título grande + botones; afiné copy a clínicas) */}
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
              Especializado para <span className="font-semibold text-white/80">clínicas odontológicas</span>: atención
              inmediata, calificación de pacientes, agendamiento y confirmación para reducir ausencias.
              Integración con Calendar/Sheets y tu forma de trabajar.
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
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-white/70 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Atención 24/7</p>
                <p className="mt-1">Respuestas instantáneas a pacientes.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Agendamiento</p>
                <p className="mt-1">Agenda + recordatorios + confirmación.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Orden</p>
                <p className="mt-1">Registro automático de pacientes/leads.</p>
              </div>
            </div>

            {/* Necesidades que cubrimos (NO CAMBIO estructura; afiné wording a clínicas) */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold">Necesidades que cubrimos</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {[
                  ["Tiempo de respuesta", "El bot responde en segundos."],
                  ["Citas confirmadas", "Recordatorios + confirmación (menos no-shows)."],
                  ["Pacientes ordenados", "Registro automático para seguimiento."],
                ].map(([t, d]) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4"
                  >
                    <p className="text-sm font-semibold">{t}</p>
                    <p className="mt-1 text-xs text-white/60">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUCIÓN (antes Servicios) */}
      <section id="solucion" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Solución</h2>
        <p className="mt-2 max-w-2xl text-white/70">
          Un sistema para que tu clínica atienda pacientes al instante, agende citas y reduzca ausencias, sin depender de que alguien responda todo el día.
        </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
  <p className="text-sm text-white/70">
    <span className="font-semibold text-white">Especializado para odontología:</span>{" "}
    recepción de pacientes, agendamiento, confirmación y seguimiento post-consulta.
    Si tu clínica maneja varios doctores o sedes, lo configuramos por rutas.
  </p>
</div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Admisión por WhatsApp",
              desc: "Responde preguntas frecuentes (precios, servicios, horarios, ubicación) y captura datos del paciente.",
            },
            {
              title: "Citas + confirmación",
              desc: "Agenda automáticamente, envía recordatorios y confirma para reducir no-shows.",
            },
            {
              title: "Registro y seguimiento",
              desc: "Guarda todo en Sheets/CRM para seguimiento y control (por tratamiento / doctor / sede).",
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

      {/* CÓMO FUNCIONA (resumido) */}
      <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Cómo funciona</h2>
        <p className="mt-2 max-w-3xl text-white/70">
          Flujo simple, pensado para clínica: desde el primer mensaje hasta la cita confirmada y registrada.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["1) Paciente escribe", "El bot responde al instante y filtra el motivo de consulta."],
            ["2) Agenda inteligente", "Propone horarios, agenda y confirma automáticamente."],
            ["3) Registro automático", "Guarda datos y estado en Sheets/CRM para seguimiento."],
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

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/70">
            <span className="font-semibold text-white">¿Tienes varios doctores o sucursales?</span>{" "}
            También lo configuramos por especialidad, doctor o sede con rutas y reportes.
          </p>
        </div>
      </section>

      {/* PLANES (NO CAMBIO diseño ni precios, solo copy arriba) */}
      <section id="planes" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Planes</h2>
            <p className="mt-2 max-w-3xl text-white/70">
              La mensualidad y la implementación son{" "}
              <span className="font-semibold text-white/80">pagos distintos</span>:{" "}
              <span className="font-semibold text-white/80">mensualidad recurrente</span> +{" "}
              <span className="font-semibold text-white/80">implementación única</span> (una sola vez).
              Se ajusta según integraciones y alcance.
            </p>
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
                  <span className="text-base font-semibold text-white/70">/ mes</span>
                </p>

                {/* Implementación (pago único) */}
                <div className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm">
                  <span className="font-semibold text-white/80">Implementación:</span>
                  <span className="font-bold text-emerald-200">
                    {money.format(setupFee[p.name])}
                  </span>
                  <span className="text-white/60">(única vez)</span>
                </div>

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

      {/* FAQ (más directo a clínicas) */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">FAQ</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            [
              "¿Funciona para clínica odontológica?",
              "Sí. Está pensado para admisión, agendamiento, confirmación y seguimiento de pacientes.",
            ],
            [
              "¿Se puede integrar con mi agenda?",
              "Sí. Podemos trabajar con Calendar o con tu proceso actual, según tu operación.",
            ],
            [
              "¿Reduce no-shows?",
              "Sí. Con recordatorios + confirmación automática, baja bastante la tasa de ausencias.",
            ],
            [
              "¿Cuánto tarda la implementación?",
              "Depende del plan y alcance. Normalmente el primer MVP queda listo dentro del periodo de implementación.",
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

      {/* DEMO (antes Testimonio) — al final como pediste */}
      <section id="demo" className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Demo</h2>
            <p className="mt-2 max-w-3xl text-white/70">
              Video demostración de una clínica donde se implementó{" "}
              <span className="font-semibold text-white/80">agendamiento en su página web</span>.
              Este mismo flujo se puede llevar a tu{" "}
              <span className="font-semibold text-white/80">WhatsApp</span> para agendar, confirmar y registrar automáticamente.
            </p>
          </div>

          <a
            href={waDemoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
          >
            Quiero esto en mi clínica
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Video */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
              <video controls preload="metadata" className="h-full w-full">
                {/* Ajusta la ruta si tu video está en otro lado */}
                <source src="c:\Users\Jaime\Desktop\IA COMANY WEB\ia-company-jb\public\videos\testimonios.mp4" type="video/mp4" />
                Tu navegador no puede reproducir este video.
              </video>
            </div>
            <p className="mt-3 text-xs text-white/50">
              Si no se ve en celular, asegúrate que sea MP4 (H.264).
            </p>
          </div>

          {/* Beneficios del demo */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                Caso clínico
              </span>
              <span>•</span>
              <span>Flujo real</span>
            </div>

            <p className="mt-4 text-lg font-semibold leading-relaxed">
              “El paciente escribe, el bot guía, agenda y confirma. La clínica recibe todo ordenado y listo para atender.”
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/70">
              {[
                "Atención inmediata 24/7",
                "Agenda + recordatorios automáticos",
                "Confirmación para reducir no-shows",
                "Registro en Sheets/CRM para seguimiento",
              ].map((t) => (
                <div key={t} className="flex gap-2">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-emerald-400/70" />
                  <span>{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
              <p className="text-sm font-semibold">¿Quieres una demo con tu clínica?</p>
              <p className="mt-1 text-sm text-white/60">
                Escríbeme y te digo qué plan encaja según tu flujo y volumen de pacientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP (CTA final) */}
      <section id="whatsapp" className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-lg font-semibold">¿Listo para automatizar tu clínica?</p>
              <p className="mt-1 text-sm text-white/70">
                Escríbeme por WhatsApp y te respondo con una propuesta según tu clínica odontológica.
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
            © {new Date().getFullYear()} AI COMPANY JB. Todos los derechos reservados.
          </p>
        </div>
      </section>

      <ChatWidget />
      <Analytics />
    </main>
  );
}