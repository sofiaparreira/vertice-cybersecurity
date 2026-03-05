import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import PrimaryButton from "../PrimaryButton"
import { ArrowRightIcon } from "../../../public/icons/ArrowRightIcon"

const tabs = [
  { name: "Home", link: "#home" },
  { name: "Serviços", link: "#service-container" },
  { name: "Quem Somos", link: "#quem-somos" },
  { name: "Nossa jornada", link: "#nossa-jornada" },
  { name: "Contato", link: "#contato" },
]

export function Header() {

  const location = useLocation()
  const activeHash = location.hash || "#home"

  const handleBudgetClick = () => {
    const sectionId = "#contato"
    const section = document.querySelector(sectionId)

    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", sectionId)
  }

  return (
    <header className="w-full px-8 flex justify-between items-center">
      <div className="w-[236px]"><img src="./logo-vertice.png" alt="Logo Vértice" className="w-24" /></div>

      <nav className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 rounded-lg bg-[var(--button-primary)]/80 border border-white/8 p-1.5 w-fit">
        {tabs.map((tab) => {
          const isActive = activeHash === tab.link
          return (
            <Link
              key={tab.name}
              to={tab.link}
              className="relative z-10 cursor-pointer rounded-md px-5 py-2 text-sm font-medium transition-colors"
              style={{
                color: isActive ? "#fff" : "#888",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-md bg-[var(--primary)]" 
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    duration: 0.5,
                  }}
                />
              )}
              <span className="relative z-10">{tab.name}</span>
            </Link>
          )
        })}
      </nav>

      <PrimaryButton
        text={'Faça um orçamento'}
        icon={<ArrowRightIcon className="text-white" />}
        onClick={handleBudgetClick}
      />
    </header>
  )
}
