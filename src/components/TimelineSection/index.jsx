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
    <section className="py-24 bg-[#080713]">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Nossa Jornada</h2>

        <div className="relative">
          {/* Linha vertical central */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />

          <div className="space-y-12">
            {events.map((ev, idx) => {
              const side = idx % 2 === 0 ? "left" : "right";
              return (
                <motion.div
                  key={ev.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className={`relative w-full flex ${side === "left" ? "justify-start" : "justify-end"}`}
                >
                  <div className="w-full lg:w-1/2">
                    <div className={`flex ${side === "left" ? "pl-6 lg:pl-12" : "pr-6 lg:pr-12"} items-start`}>
                      {/* Content card */}
                      <div className={`bg-white/4 border border-white/6 rounded-xl p-5 shadow-sm ${side === "left" ? "text-left" : "text-right"} w-full`}>
                        <div className="flex items-center gap-3 mb-2 justify-between">
                          <span className="text-sm uppercase text-white/60 tracking-widest">{ev.year}</span>
                          <span className="text-xs text-white/40 hidden lg:inline">{idx + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{ev.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed">{ev.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Marker */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      className="w-4 h-4 rounded-full bg-[var(--primary)] border-2 border-white/20"
                    />
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