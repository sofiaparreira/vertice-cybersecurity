"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef, useState, useEffect, useLayoutEffect } from "react"
import ServiceCard from "../Card/ServiceCard"
import PreventiveAttackGraphic from "../ServicesGraphic/PreventiveAttackGraphic"
import SecurityStrategyDashboardGraphic from "../ServicesGraphic/SecurityStrategyGraphic"
import RedTeamAdvancedGraphic from "../ServicesGraphic/RedTeamAdvancedGraphic"
import VulnerabilityAnalysisGraphic from "../ServicesGraphic/VulnerabilityAnalysisGraphic"

export default function ServiceContainer() {
  const containerRef = useRef(null)
  const galleryRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // MEDIÇÕES DINÂMICAS
  const [itemWidth, setItemWidth] = useState(400)
  const [gap, setGap] = useState(30)
  const [isMobile, setIsMobile] = useState(false)

  // recalcula isMobile ao redimensionar
  useEffect(() => {
    const onResize = () => setIsMobile(window.matchMedia("(max-width: 640px)").matches)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Measure item width + gap usando ResizeObserver
  useLayoutEffect(() => {
    if (!galleryRef.current) return
    const gallery = galleryRef.current
    const firstItem = gallery.querySelector(".gallery-item")
    if (!firstItem) return

    const ro = new ResizeObserver(() => {
      const w = Math.round(firstItem.getBoundingClientRect().width)
      setItemWidth(w)

      // pega gap a partir de computedStyle (gap between flex items)
      const cs = getComputedStyle(gallery)
      const parsedGap = parseFloat(cs.gap || cs.columnGap || 0) || 0
      setGap(parsedGap)
    })
    ro.observe(firstItem)
    ro.observe(gallery)
    return () => ro.disconnect()
  }, [galleryRef, isMobile, items.length])

  // distância total que a gallery precisa percorrer
  const totalDistance = Math.max(0, (items.length - 1) * (itemWidth + gap))

  // cria o motion value para desktop; no mobile não aplicamos transform (usa scroll nativo)
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

  return (
    <div className="mt-20 sm:mt-24 lg:mt-32" id="service-container">
      <section className="services-title-wrapper">
        <h2 className="text-left text-4xl font-bold">SERVIÇOS</h2>
      </section>

      <div ref={containerRef} className={`scroll-container ${isMobile ? "mobile-mode" : "desktop-mode"}`}>
        {isMobile ? (
          // MODO MOBILE: scroll horizontal nativo com scroll-snap
          <div className="sticky-wrapper mobile-sticky">
            <div ref={galleryRef} className="gallery mobile-gallery">
              {items.map((item) => (
                <div key={item.id} className="gallery-item">
                  <ServiceCard
                    title={item.label}
                    description={item.description}
                    graphic={item.graphic}
                    className="card-inner"
                    style={{
                      "--item-image": `url(${item.image})`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          // MODO DESKTOP: sticky + scroll-linked animation
          <div className="sticky-wrapper">
            <motion.div ref={galleryRef} className="gallery" style={{ x }}>
              {items.map((item) => (
                <ServiceCard
                  key={item.id}
                  title={item.label}
                  description={item.description}
                  graphic={item.graphic}
                  className="gallery-item"
                  translatePosition={item.position}
                  style={{
                    "--item-image": `url(${item.image})`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>

      <StyleSheet />
    </div>
  )
}

/* ---------- Styles (substitua pelo seu CSS/TSX) ---------- */
function StyleSheet() {
  return (
    <style>{`
      /* preferir colocar body overflow-x no global.css (aqui só para demo) */
      body { overflow-x: hidden; }

      #service-container { height: auto; overflow: visible; }

      .services-title-wrapper {
        width: min(100%, 400px);
        margin: 0 auto;
        padding: 0 16px;
      }

      .scroll-container { height: 300vh; position: relative; }
      .scroll-container.mobile-mode { height: auto; }

      /* Sticky wrapper - desktop */
      .sticky-wrapper {
        position: sticky;
        top: 0;
        height: 78vh;
        width: min(92vw, 400px);
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: visible;
      }

      /* Gallery - desktop */
      .gallery {
        display: flex;
        gap: 30px;
        will-change: transform;
      }

      /* Gallery item (desktop) - ServiceCard wrapper */
      .gallery-item {
        flex-shrink: 0;
        width: min(92vw, 400px);
        height: clamp(360px, 65vh, 500px);
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        background-image: var(--item-image);
        background-size: cover;
        background-position: center;
      }

      .gallery-item::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 60%, var(--item-color));
        mix-blend-mode: multiply;
      }

      .gallery-item h3 { font-size: 21px; font-weight: 200; color: #f5f5f5; margin: 0; z-index: 1; font-family: "Krona One", sans-serif; }
      .gallery-item p { font-size: 15px; color: #f5f5f5cc; margin: 0; z-index: 1; margin-top: 16px; }

      /* -------------------
         MOBILE-LIKE STYLING (native horizontal scroll, better UX)
         ------------------- */
      .mobile-mode .sticky-wrapper { position: relative; height: auto; top: auto; width: 100%; padding: 24px 0; }
      .mobile-gallery {
        display: flex;
        gap: 22px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding: 0 16px 4px;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }

      .mobile-gallery::-webkit-scrollbar {
        display: none;
      }

      .mobile-gallery .gallery-item {
        width: min(calc(100vw - 46px), 382px);
        height: auto;
        min-height: 500px;
        scroll-snap-align: start;
        flex: 0 0 auto;
        border-radius: 12px;
      }

      /* keeps the card internals consistent (if ServiceCard wraps content) */
      .card-inner { height: 100%; display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; }

      /* reduce gaps and heights at very small widths */
      @media (max-width: 600px) {
        .services-title-wrapper { width: min(100%, 280px); }
        .scroll-container { height: 210vh; }
        .scroll-container.mobile-mode { height: auto; }
        .sticky-wrapper { width: min(92vw, 280px); }
        .gallery { gap: 15px; }
        .gallery-item { width: 280px; height: 350px; }
        .mobile-gallery { gap: 18px; }
        .mobile-gallery .gallery-item { width: min(calc(100vw - 30px), 340px); min-height: 470px; }
      }

      /* respects reduced motion */
      @media (prefers-reduced-motion: reduce) {
        .gallery { transform: none !important; }
        .scroll-container { height: auto; }
        .sticky-wrapper { position: relative; height: auto; width: 100%; overflow-x: auto; padding: 50px 0; }
      }
    `}</style>
  )
}

/* ---------- Data (mantive seu array; revisei labels duplicados) ---------- */
const items = [
  {
    id: 1,
    color: "#ff0088",
    label: "Teste de Intrusão (Pentest)",
    description:
      "Simulamos ataques reais para revelar vulnerabilidades ocultas. Executamos testes controlados em aplicações, sites e sistemas para identificar falhas exploráveis antes que criminosos as encontrem.",
    image: "/photos/tokyo-shinjuku-2/image-1.jpg",
    position: 8,
    graphic: <PreventiveAttackGraphic />,
  },
  {
    id: 2,
    color: "#dd00ee",
    label: "Red Team (Ataques Controlados Avançados)",
    description:
      "Testamos não apenas sistemas - testamos pessoas e processos. Simulações avançadas de invasão que avaliam sua capacidade real de detectar, responder e conter ataques sofisticados.",
    image: "/photos/tokyo-shinjuku-2/image-2.jpg",
    position: 16,
    graphic: <RedTeamAdvancedGraphic />,
  },
  {
    id: 3,
    color: "#9911ff",
    label: "Análise de Vulnerabilidades",
    description:
      "Mapeamento completo de riscos técnicos. Identificamos falhas conhecidas, configurações inseguras e exposição críticas em sua infraestrutura antes que se tornem portas de entrada.",
    image: "/photos/tokyo-shinjuku-2/image-3.jpg",
    position: 8,
    graphic: <VulnerabilityAnalysisGraphic />,
  },
  {
    id: 4,
    color: "#0d63f8",
    label: "Consultoria Estratégica de Segurança",
    description:
      "Desenvolvemos políticas, processos e arquitetura alinhados ao seu negócio, transformando proteção em diferencial estratégico.",
    image: "/photos/tokyo-shinjuku-2/image-4.jpg",
    position: 24,
    graphic: <SecurityStrategyDashboardGraphic />,
  },
]