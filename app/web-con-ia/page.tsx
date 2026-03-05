import Link from "next/link";

export const metadata = {
  title: "Creación de páginas web con IA",
  description:
    "Guía práctica para crear páginas web con IA: prompts, herramientas y proceso recomendado.",
};

export default function WebConIA() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide">AI COMPANY JB</p>
            <p className="text-xs text-white/60">Guía: Web con IA</p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            ← Volver
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h1 className="text-3xl font-bold md:text-5xl">
          Creación de páginas web con IA
        </h1>
        <p className="mt-4 max-w-3xl text-white/70 md:text-lg">
          Aquí tienes un proceso claro para crear una web rápido usando IA: desde
          el copy hasta el diseño y la publicación.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1) Define el objetivo",
              desc: "¿Vender? ¿Agendar? ¿Capturar leads? Si no hay objetivo ayudamos a buscar en base a la necesidad de la empresa.",
            },
            {
              title: "2) Copy con IA",
              desc: "Titular, propuesta de valor, bullets, planes, FAQs y CTA (WhatsApp).",
            },
            {
              title: "3) Diseño + publicación",
              desc: "Plantilla + ajustes. Publicas en Vercel/Framer/Webflow según tu caso.",
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

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Herramientas recomendadas</h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• IA para copy: ChatGPT / Claude</li>
              <li>• IA para UI: Framer, Webflow, plantillas + edición</li>
              <li>• Desarrollo rápido: Next.js + Tailwind</li>
              <li>• Publicación: Vercel</li>
              <li>• Formularios: Webhook (n8n) o email</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Prompt listo (copy landing)</h2>
            <p className="mt-3 text-sm text-white/70">
              Copia y pega en tu IA:
            </p>
            <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-white/10 bg-zinc-950 p-4 text-xs text-white/80">
{`Actúa como experto en marketing. Crea el copy de una landing para [TIPO DE NEGOCIO].
Objetivo: [agendar / vender / captar leads]. 
Secciones: Hero (titular potente + subtítulo), 3 bullets de beneficios, Servicios (3 cards),
Proceso (4 pasos), Planes (3 niveles), FAQs (8), CTA final.
Tono: profesional, directo, sin humo. Lenguaje: español.`}
            </pre>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Checklist antes de publicar</h2>
          <ul className="mt-4 grid gap-2 text-sm text-white/70 md:grid-cols-2">
            <li>✅ Botón WhatsApp visible (navbar y final)</li>
            <li>✅ Planes claros + CTA</li>
            <li>✅ Responsive móvil</li>
            <li>✅ Velocidad (imágenes optimizadas)</li>
            <li>✅ SEO básico (title/description)</li>
            <li>✅ Formulario (opcional) + confirmación</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#planes"
            className="rounded-2xl bg-emerald-500 px-6 py-3 text-center text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
          >
            Ver planes
          </Link>
          <Link
            href="/"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold hover:bg-white/10"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}