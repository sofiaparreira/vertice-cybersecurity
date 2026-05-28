// TimelineSection.jsx (cole abaixo dos imports no seu HomePage ou crie um arquivo separado)
import { motion } from "motion/react";

export default function TimelineSection() {
  const events = [
    {
      year: "2018",
      title: "Fundação",
      desc: "Vértice nasce como um pequeno grupo de especialistas em segurança ofensiva, com foco em pentests e pesquisa de vulnerabilidades.",
    },
    {
      year: "2019",
      title: "Primeiro cliente enterprise",
      desc: "Conquistamos nosso primeiro contrato com uma empresa de médio porte e montamos processos de relatório e remediação escaláveis.",
    },
    {
      year: "2021",
      title: "Nova sede & SOC",
      desc: "Mudamos para uma sede própria e inauguramos nosso Centro de Operações de Segurança (SOC) 24/7.",
    },
    {
      year: "2023",
      title: "Equipe Forense",
      desc: "Criamos o time de análise forense digital e passamos a realizar investigações complexas e laudos técnicos.",
    },
    {
      year: "2024",
      title: "Expansão LATAM",
      desc: "Ampliamos atuação para clientes na América Latina, com treinamentos e projetos de compliance locais.",
    },
    {
      year: "2025",
      title: "Certificação ISO e Produto",
      desc: "Alcançamos certificação interna de processos e lançamos um serviço gerenciado de detecção inteligente.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#080713] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase">Nossa Jornada</h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/65 leading-relaxed">
            Evolucao construida com metodo, resposta rapida e melhoria continua em seguranca cibernetica.
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical central */}
          <div className="absolute hidden lg:block left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="absolute lg:hidden left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {events.map((ev, idx) => {
              const side = idx % 2 === 0 ? "left" : "right";
              return (
                <motion.div
                  key={ev.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: idx * 0.07, ease: "easeOut" }}
                  className={`relative w-full flex ${side === "left" ? "lg:justify-start" : "lg:justify-end"} justify-start`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className={`flex items-start ${side === "left" ? "pl-8 lg:pl-12" : "pl-8 lg:pl-0 lg:pr-12"}`}>
                      {/* Content card */}
                      <motion.div
                        whileHover={{ y: -4, scale: 1.01 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 shadow-[0_14px_36px_rgba(3,7,18,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] ${side === "left" ? "text-left" : "text-left lg:text-right"}`}
                      >
                        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/45 to-transparent" />

                        <div className={`mb-3 flex items-center gap-3 ${side === "left" ? "justify-between" : "justify-between lg:justify-end"}`}>
                          <span className="inline-flex rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-100">
                            {ev.year}
                          </span>
                          <span className="text-xs text-white/45 hidden lg:inline">
                            Marco {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{ev.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed">{ev.desc}</p>

                        <span className="mt-4 block h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Marker */}
                  <div className="absolute left-2 lg:left-1/2 lg:-translate-x-1/2 top-1/2 -translate-y-1/2">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: idx * 0.08 }}
                        className="absolute h-4 w-4 rounded-full border border-sky-300/40"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.06 }}
                        className="h-4 w-4 rounded-full bg-[var(--primary)] border-2 border-white/20 shadow-[0_0_0_5px_rgba(64,111,255,0.18)]"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}