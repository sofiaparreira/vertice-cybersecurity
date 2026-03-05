import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { animate, useInView, useMotionValue } from "framer-motion";
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

      <main
        className={`transition-opacity duration-700 `}
      >
        <section id="home" className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
          <GridBackground />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-6">

            <div className="flex gap-2 items-center border border-white/15 rounded-full px-4 py-1 bg-white/8 backdrop-blur-sm text-sm text-white/70 tracking-widest uppercase">
              <span>VÉRTICE DIGITAL</span>
              <span className="text-white/30">·</span>
              <span>CyberSegurança</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold  text-[var(--primary)] leading-tight tracking-tight">
              Segurança Digital
              <br />
              <span className="text-white bg-clip-text" >
                que Vê o Invisível
              </span>
            </h1>

            <p className="text-white/50 text-lg max-w-xl leading-relaxed">
              Protegemos sua empresa contra ameaças que outros não conseguem detectar — com inteligência, precisão e resposta em tempo real.
            </p>

            <div className="flex gap-4 items-center justify-center pt-4">
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
          rounded-t-[80px]
          py-8
          h-full
          shadow-[0_-50px_100px_rgba(5,4,7,0.85)]
        ">
          <section className="flex gap-32 py-16 w-full justify-center border-b border-white/10">
            {[
              { end: 99.9, suffix: "%", decimals: 1, label: "Uptime garantido", animated: true },
              { end: 500, prefix: "+", label: "Empresas protegidas", animated: true },
              { value: "24/7", label: "Monitoramento ativo", animated: false },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
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
                <span className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </section>


          <section id="service-container">
            <ServiceContainer />
          </section>

          <section id="quem-somos" className="min-h-screen flex items-center bg-[#111024] mt-28">
            <div className="w-full max-w-[1400px] mx-auto py-20">
              <div className="flex flex-col lg:flex-row items-end gap-6 lg:gap-10 border-b border-gray-200/20 pb-12 mb-12">
                <div className="flex-1 flex flex-col gap-0">
                  <h2
                    className="block font-bold uppercase tracking-tighter text-foreground text-right lg:pr-0"
                    style={{ fontSize: "clamp(3.5rem, 8vw, 6.8rem)", lineHeight: 1.05 }}
                  >
                    Criando
                  </h2>
                  <div className="flex flex-col mt-2">
                    <h2
                      className="block font-bold uppercase tracking-tighter text-muted-foreground text-left"
                      style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.15 }}
                    >
                      {"Confian\u00e7a no"}
                    </h2>
                    <h2
                      className="block font-bold uppercase tracking-tighter text-muted-foreground text-left"
                      style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.15 }}
                    >
                      Mundo Digital
                    </h2>
                  </div>
                </div>


                {/* Image */}
                <div className="w-full lg:w-[420px] shrink-0">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 p-1">
                    <img src="/aboutus-preview.jpg"
                      alt="" className="w-full h-[280px] lg:h-[300px] object-cover" />

                  </div>
                </div>
              </div>


              {/* Bottom area: Description + Stats */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* Description */}
                <div className="flex-1 max-w-2xl border-r border-gray-200/20 pr-10">
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
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                    <span className="font-semibold uppercase tracking-widest text-muted-foreground">
                      Missão
                    </span>

                    <p className="text-sm text-muted-foreground leading-relaxed text-zinc-100/90">
                      Antecipar ameaças antes que elas se tornem crises.
                      Proteger ativos digitais com inteligência estratégica.
                    </p>
                  </div>

                  {/* Visão */}
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
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
                  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
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
       <section id="contato" className="py-20 bg-[#111024]">
  <div className="max-w-[1400px] mx-auto flex gap-8 justify-between items-center">
    <div className="px-8 w-1/2">
      <h2 className="text-4xl font-bold text-white">ENTRE EM CONTATO</h2>
      <p className="max-w-lg mt-1 text-gray-100/90">
        Preencha as informações do formulário para fazer um orçamento ou tirar suas dúvidas e em breve faremos retorno.
      </p>
      <img className="w-88 mt-16" src="./contact-ilustration.svg" alt="Ilustração de contato" />
    </div>

    <form
      onSubmit={handleSubmit}
      className="w-1/2 min-h-[420px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="flex flex-col gap-4">
        {/* Name */}
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* Email */}
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        <input
          id="phone"
          type="tel"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-white/20"
        />

        {/* Message */}
        <textarea
          id="message"
          placeholder="Message"
          rows={8}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 resize-none"
        />

        {feedback && (
          <p className="text-sm text-white/80">{feedback}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSending}
          className="w-full rounded-lg bg-white text-black font-semibold py-3 text-sm hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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

