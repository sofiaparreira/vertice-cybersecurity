import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { ArrowRightIcon } from "../../public/icons/ArrowRightIcon";
import GridBackground from "../components/GridBackground";
import PrimaryButton from "../components/PrimaryButton";
import ServiceContainer from "../components/ServiceContainer";
import TimelineSection from "../components/TimelineSection";
import Footer from "../components/Footer";


function AnimatedStatValue({ end, prefix = "", suffix = "", decimals = 0, duration = 1.8 }) {
  const valueRef = useRef(null);
  const isInView = useInView(valueRef, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(motionValue, end, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCurrentValue(latest);
      },
    });

    return () => controls.stop();
  }, [duration, end, isInView, motionValue]);

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(currentValue);

  return (
    <span ref={valueRef} className="text-3xl font-bold text-white">
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

function CyberSecurityGraphic() {
  return (
    <div className="relative h-[280px] lg:h-[300px] w-full">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 26%, rgba(34, 211, 238, 0.26), transparent 44%), radial-gradient(circle at 78% 72%, rgba(59, 130, 246, 0.24), transparent 42%), radial-gradient(circle at 50% 50%, rgba(16, 24, 53, 0.6), transparent 72%), repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.08) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(59, 130, 246, 0.08) 0 1px, transparent 1px 26px)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 72% at 50% 50%, black 42%, rgba(0,0,0,0.9) 62%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 80% 72% at 50% 50%, black 42%, rgba(0,0,0,0.9) 62%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(125,211,252,0.12), transparent 58%)", filter: "blur(12px)" }} />

      <div className="relative h-full w-full">
        <svg viewBox="0 0 400 280" className="absolute inset-0 h-full w-full" role="img" aria-label="Ilustracao animada de ciberseguranca">
          <motion.circle
            cx="200"
            cy="140"
            r="95"
            fill="none"
            stroke="rgba(148,163,184,0.22)"
            strokeWidth="1.6"
            strokeDasharray="6 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 140px" }}
          />

          <motion.circle
            cx="200"
            cy="140"
            r="68"
            fill="none"
            stroke="rgba(56,189,248,0.42)"
            strokeWidth="1.4"
            animate={{ opacity: [0.25, 0.75, 0.25], scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "200px 140px" }}
          />

          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M200 72c-23 13-40 15-56 18v47c0 42 29 68 56 82 27-14 56-40 56-82V90c-16-3-33-5-56-18Z"
              fill="rgba(10,18,40,0.7)"
              stroke="rgba(125,211,252,0.85)"
              strokeWidth="2"
            />
            <rect x="180" y="118" width="40" height="30" rx="7" fill="rgba(56,189,248,0.2)" stroke="rgba(125,211,252,0.65)" strokeWidth="1.4" />
            <path d="M188 118v-8a12 12 0 0 1 24 0v8" fill="none" stroke="rgba(125,211,252,0.75)" strokeWidth="1.4" />
            <motion.circle
              cx="200"
              cy="133"
              r="3"
              fill="#7dd3fc"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          <motion.path
            d="M73 214c22-17 47-28 75-31m179 31c-22-17-47-28-75-31"
            fill="none"
            stroke="rgba(148,163,184,0.36)"
            strokeWidth="1.6"
            strokeLinecap="round"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.g
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="92" cy="86" r="3" fill="#38bdf8" />
            <circle cx="304" cy="70" r="2.5" fill="#22d3ee" />
            <circle cx="328" cy="168" r="2.5" fill="#93c5fd" />
            <circle cx="84" cy="176" r="2" fill="#67e8f9" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}



export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFeedback("Configure as variáveis VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID e VITE_EMAILJS_PUBLIC_KEY.");
      return;
    }

    setIsSending(true);
    setFeedback("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          site_name: "vertice",
          message: formData.message,
          to_email: "sofiapparreira@gmail.com",
          reply_to: formData.email,
        },
        { publicKey }
      );

      setFeedback("Mensagem enviada com sucesso. Retornaremos em breve.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setFeedback("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setIsSending(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", sectionId);
  };

  return (
    <>

      <main className="transition-opacity duration-700">
        <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6">
          <GridBackground />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full opacity-10 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-2 sm:px-6 max-w-5xl mx-auto space-y-6 sm:space-y-7 pt-20 md:pt-0">

            <div className="flex gap-2 items-center border border-white/15 rounded-full px-4 py-1.5 bg-white/8 backdrop-blur-md text-xs sm:text-sm text-white/70 tracking-[0.16em] uppercase">
              <span>VÉRTICE DIGITAL</span>
              <span className="text-white/30">·</span>
              <span>CyberSegurança</span>
            </div>

            <h1 className="text-[clamp(2.2rem,6vw,5rem)] font-bold text-[var(--primary)] leading-[1.04] tracking-tight max-w-4xl">
              Segurança Digital
              <br />
              <span className="text-white bg-clip-text">
                que Vê o Invisível
              </span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              Protegemos sua empresa contra ameaças que outros não conseguem detectar — com inteligência, precisão e resposta em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center pt-4 w-full sm:w-auto">
              <Link to='#quem-somos' className="bg-[var(--primary)] py-2.5 rounded-lg px-6 text-white font-medium hover:opacity-90 transition-opacity cursor-pointer">
                Saiba mais
              </Link>
              <PrimaryButton
                text={"Fazer orçamento"}
                icon={<ArrowRightIcon />}
                onClick={() => scrollToSection("#contato")}
              />
            </div>


          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase animate-bounce">
            <span>Scroll</span>
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
              <path d="M6 0v14M1 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </section>


        <div className="
          relative z-10
          bg-[#080713]
          rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px]
          py-8
          h-full
          shadow-[0_-50px_100px_rgba(5,4,7,0.85)]
        ">
          <section className="w-full px-4 sm:px-6">
            <div className="max-w-5xl mx-auto flex flex-wrap gap-4 sm:gap-6 py-12 sm:py-16 w-full justify-center border-b border-white/10">
              {[
                { end: 99.9, suffix: "%", decimals: 1, label: "Uptime garantido", animated: true },
                { end: 500, prefix: "+", label: "Empresas protegidas", animated: true },
                { value: "24/7", label: "Monitoramento ativo", animated: false },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2 min-w-[210px] rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-sm">
                  {stat.animated ? (
                    <AnimatedStatValue
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">{stat.value}</span>
                  )}
                  <span className="text-xs sm:text-sm text-white/45 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>


          <section id="service-container">
            <ServiceContainer />
          </section>

          <section id="quem-somos" className="min-h-screen flex items-center  mt-20 sm:mt-28 px-4 sm:px-6">
            <div className="w-full max-w-5xl mx-auto py-12 sm:py-20">
              <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-10 border-b border-gray-200/20 pb-12 mb-12">
                <div className="flex-1 flex flex-col gap-0">
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white uppercase"
                    style={{ lineHeight: 1.25 }}
                  >
                    Confiança no mundo digital
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-zinc-300/90 max-w-xl">
                    Segurança cibernética com estratégia, clareza e resposta rápida.
                  </p>
                </div>


                {/* Image */}
                <div className="w-full lg:w-[420px] shrink-0">
                  <CyberSecurityGraphic />
                </div>
              </div>


              {/* Bottom area: Description + Stats */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* Description */}
                <div className="flex-1 max-w-2xl lg:border-r border-gray-200/20 lg:pr-10">
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    A Vértice Cybersegurança nasceu da convicção de que segurança digital não é um diferencial — é sobrevivência estratégica. Em um cenário onde ataques evoluem todos os dias, nós operamos no ponto mais crítico da tecnologia: o vértice entre proteção, inteligência e resposta.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Somos especialistas em proteger dados, infraestruturas e reputações. Atuamos com uma abordagem ofensiva e defensiva, combinando análise técnica profunda, monitoramento contínuo e estratégias de mitigação orientadas por risco.
                  </p>
                  <PrimaryButton
                    text={'Fazer orçamento'}
                    icon={<ArrowRightIcon />}
                    onClick={() => scrollToSection("#contato")}
                  />
                </div>

                {/* Stats */}

                {/* Mission / Vision / Values */}
                <div className="flex flex-col gap-6 w-full lg:w-1/3">

                  {/* Missão */}
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20">
                    <span className="font-semibold uppercase tracking-widest text-muted-foreground">
                      Missão
                    </span>

                    <p className="text-sm text-muted-foreground leading-relaxed text-zinc-100/90">
                      Antecipar ameaças antes que elas se tornem crises.
                      Proteger ativos digitais com inteligência estratégica.
                    </p>
                  </div>

                  {/* Visão */}
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20">
                    <span className="font-semibold uppercase tracking-widest text-muted-foreground">
                      Visão
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed text-zinc-100/90">
                      Ser referência em ingeligência de cibersegurança,
                      reconhecida pela excelência técnica, ética
                      e capacidade de evoluir.
                    </p>
                  </div>

                  {/* Valores */}
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20">
                    <span className="font-semibold uppercase tracking-widest text-muted-foreground">
                      Valores
                    </span>
                    <ul className="text-sm text-muted-foreground mt-3 space-y-1 text-zinc-100/90">
                      <li>• Precisão técnica</li>
                      <li>• Transparência com clientes</li>
                      <li>• Confidencialidade absoluta</li>
                      <li>• Evolução contínua</li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          </section>

        </div>

        <section id="nossa-jornada">
          <TimelineSection />
        </section>
        <section id="contato" className="py-12 sm:py-20 bg-[#111024] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-10 justify-between items-start">
    <div className="px-0 sm:px-2 lg:px-8 w-full lg:w-1/2">
      <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase">Entre em contato</h2>
      <p className="max-w-lg mt-2 text-gray-100/75 leading-relaxed">
        Preencha as informações do formulário para fazer um orçamento ou tirar suas dúvidas e em breve faremos retorno.
      </p>
      <img className="w-full max-w-[14rem] sm:max-w-xs mt-10 sm:mt-16" src="./contact-ilustration.svg" alt="Ilustração de contato" />
    </div>

    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-1/2 min-h-[420px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="flex flex-col gap-4">
        {/* Name */}
        <input
          id="name"
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/60"
        />

        {/* Email */}
        <input
          id="email"
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/60"
        />

        <input
          id="phone"
          type="tel"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/60"
        />

        {/* Message */}
        <textarea
          id="message"
          placeholder="Mensagem"
          rows={8}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/60 resize-none"
        />

        {feedback && (
          <p className="text-sm text-white/80">{feedback}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-lg bg-[var(--primary)] text-white font-semibold py-3 text-sm hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSending ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  </div>
</section>

      </main>
      <Footer />
    </>
  );
}

