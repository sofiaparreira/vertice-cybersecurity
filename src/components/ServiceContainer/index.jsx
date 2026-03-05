"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import ServiceCard from "../Card/ServiceCard"
import PreventiveAttackGraphic from "../ServicesGraphic/PreventiveAttackGraphic"
import SecurityStrategyDashboardGraphic from "../ServicesGraphic/SecurityStrategyGraphic"
import RedTeamAdvancedGraphic from "../ServicesGraphic/RedTeamAdvancedGraphic"
import VulnerabilityAnalysisGraphic from "../ServicesGraphic/VulnerabilityAnalysisGraphic"

export default function ServiceContainer() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Move from first item centered to last item centered
    const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP)
    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    return (
        <div className="mt-32" id="service-container">
            <section className="services-title-wrapper">
                <h2 className="text-left text-4xl font-bold">SERVIÇOS</h2>
            </section>

            <div ref={containerRef} className="scroll-container">
                <div className="sticky-wrapper">
                    <motion.div className="gallery" style={{ x }}>
                        {items.map((item) => (
                            <ServiceCard
                                key={item.id}
                                title={item.label}
                                description={item.description}
                                graphic={item.graphic}
                                className="gallery-item"
                                translatePosition={item.position}
                                style={
                                    {
                                        "--item-image": `url(${item.image})`,
                                    }
                                }
                            />
                        ))}
                    </motion.div>
                </div>
            </div>

  
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
            body {
                overflow-x: hidden;
            }

            #service-container {
                height: auto;
                overflow: visible;
            }

            .services-title-wrapper {
                width: 400px;
                margin: 0 auto;
            }

            .intro-section {
                height: 50vh;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                text-align: center;
                padding-bottom: 40px;
            }

            .intro-section h1 {
                font-size: clamp(36px, 8vw, 72px);
                color: #f5f5f5;
                margin: 0;
                text-transform: uppercase;
            }

            .scroll-container {
                height: 300vh;
                position: relative;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                height: 78vh;
                width: 400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                overflow: visible;
            }

            .gallery {
                display: flex;
                gap: 30px;
                will-change: transform;
            }

            .gallery-item {
                flex-shrink: 0;
                width: 400px;
                height: 500px;
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
                background: linear-gradient(
                    to bottom,
                    transparent 60%,
                    var(--item-color)
                );
                mix-blend-mode: multiply;
            }

            .gallery-item h3 {
                font-size: 21px;
                font-weight: 200;
                color: #f5f5f5;
                margin: 0;
                z-index: 1;
                    font-family: "Krona One", sans-serif;

            }

            .gallery-item p {
                font-size: 15px;
                color: #f5f5f5/80;
                margin: 0;
                z-index: 1;
                margin-top: 16px;
            }

            .outro-section {
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            @media (max-width: 600px) {
                .services-title-wrapper {
                    width: 280px;
                }

                .sticky-wrapper {
                    width: 280px;
                }

                .gallery {
                    gap: 15px;
                }

                .gallery-item {
                    width: 280px;
                    height: 350px;
                }
            }

            @media (prefers-reduced-motion: reduce) {
                .gallery {
                    transform: none !important;
                }
                .scroll-container {
                    height: auto;
                }
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                }
            }
        `}</style>
    )
}

/**
 * ==============   Data   ================
 */

const items = [
    { 
        id: 1, 
        color: "#ff0088", 
        label: "Teste de Intrusão (Pentest)", 
        description: "Simulamos ataques reais para revelar vulnerabilidades ocultas. Executamos testes controlados em aplicações, sites e sistemas para identificar falhas exploráveis antes que criminosos as encontrem. ", 
        image: "/photos/tokyo-shinjuku-2/image-1.jpg", 
        position: 8, 
        graphic: <PreventiveAttackGraphic />
    },

    { 
        id: 2, 
        color: "#dd00ee", label: "Red Tean (Ataques Controlados Avançados)", 
        description: "Testamos não apenas sistemas - testamos pessoas e processos. Simulações avançadas de invasão que avaliam sua capacidade real de detectar, responder e conter ataques sofisticados.",
        label: "Read Tean (Ataques Controlados Avançados)", 
        image: "/photos/tokyo-shinjuku-2/image-2.jpg", 
        position: 16,
        graphic: <RedTeamAdvancedGraphic />
    },
    { 
        id: 3, 
        color: "#9911ff", 
        label: "Análise de Vulnerabilidades", 
        description: "Mapeamento completo de riscos técnicos. Identificamos falhas conhecidas, configurações inseguras e exposição críticas em sua infraestrutura antes que se tornem portas de entrada.",
        image: "/photos/tokyo-shinjuku-2/image-3.jpg", 
        position: 8,
        graphic: <VulnerabilityAnalysisGraphic />
    },
    {   id: 4, 
        color: "#0d63f8", 
        label: "Consultoria Estratégica de Segurança", 
        description: "Desenvolvemos políticas, processos e arquitetura alinhados ao seu negóciom transformando proteção em diferencial estratégico.",
        image: "/photos/tokyo-shinjuku-2/image-4.jpg", 
        position: 24,
        graphic: <SecurityStrategyDashboardGraphic />
    },
]

const ITEM_WIDTH = 400
const GAP = 30
