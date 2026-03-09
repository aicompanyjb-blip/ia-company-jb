export default function TestimonialSection({ waLink }: { waLink: string }) {
  return (
    <section id="testimonios" className="mx-auto max-w-6xl px-5 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Testimonio</h2>
          <p className="mt-2 max-w-2xl text-white/70">
            Una muestra real de cómo se ve el servicio en la práctica: atención más
            rápida, mejor seguimiento y más orden.
          </p>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          Quiero algo así para mi negocio
        </a>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Video */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            <video
              controls
              preload="metadata"
              className="h-full w-full"
              poster="/videos/Testimonio-poster.jpg"
            >
              {/* ✅ recomendado */}
              <source src="/videos/Testimonios.mp4" type="video/mp4" />

              {/* opcional si subes webm */}
              {/* <source src="/videos/testimonio.webm" type="video/webm" /> */}

              Tu navegador no puede reproducir este video.
            </video>
          </div>

          <p className="mt-3 text-xs text-white/50">
            Tip: si no se ve en celular, conviértelo a MP4 (H.264).
          </p>
        </div>

        {/* Copy testimonial + highlights */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-200">
              Cliente real
            </span>
            <span>•</span>
            <span>Resultados medibles</span>
          </div>

          <p className="mt-4 text-lg font-semibold leading-relaxed">
            “Pasamos de responder tarde a atender al instante. Ahora el WhatsApp
            agenda, confirma y nos deja todo registrado. Es otro nivel.”
          </p>

          <div className="mt-5 space-y-3 text-sm text-white/70">
            {[
              "Respuesta inmediata 24/7",
              "Agenda y recordatorios automáticos",
              "Registro en Sheets / CRM",
              "Menos no-shows y más orden",
            ].map((t) => (
              <div key={t} className="flex gap-2">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-emerald-400/70" />
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/50 p-4">
            <p className="text-sm font-semibold">¿Quieres un demo con tu negocio?</p>
            <p className="mt-1 text-sm text-white/60">
              Te hago una propuesta rápida según tu flujo y tus integraciones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}