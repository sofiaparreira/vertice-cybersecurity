"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const activeHash = location.hash || "#home"

  const scrollToSection = (hash) => {
    const section = document.querySelector(hash)
    if (!section) return

    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", hash)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="w-full px-4 sm:px-6 lg:px-8 pt-4 xl:pt-6 relative z-50">

        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between">
          <img
            src="./logo-vertice.png"
            alt="Logo Vértice"
            className="w-20 sm:w-24 xl:w-28"
          />

          {/* Hamburger (até lg) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="xl:hidden h-10 w-10 rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center"
            aria-label="Abrir menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
        </div>

        {/* NAV CENTRAL (xl+) */}
        <nav className="hidden xl:flex fixed left-1/2 -translate-x-1/2 top-6 items-center gap-3 rounded-xl bg-[var(--button-primary)]/80 backdrop-blur-md border border-white/10 p-2 z-40">
          {tabs.map((tab) => {
            const isActive = activeHash === tab.link

            return (
              <Link
                key={tab.name}
                to={tab.link}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(tab.link)
                }}
                className="relative rounded-md px-5 py-2 text-sm font-medium whitespace-nowrap transition-colors"
                style={{ color: isActive ? "#fff" : "#aaa" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-md bg-[var(--primary)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* BOTÃO FIXO À DIREITA (xl+) */}
        <div className="hidden xl:block fixed right-8 top-6 z-40">
          <PrimaryButton
            text="Faça um orçamento"
            icon={<ArrowRightIcon className="text-white" />}
            onClick={() => scrollToSection("#contato")}
          />
        </div>

      </header>

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {isMenuOpen && (
    <>
  {/* Overlay */}
  <motion.div
    className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 xl:hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setIsMenuOpen(false)}
  />

  {/* Sidebar */}
  <motion.div
    className="fixed top-0 right-0 h-full w-80 z-50 xl:hidden flex flex-col overflow-hidden"
    style={{ background: "var(--button-primary)" }}
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {/* Glow decorativo top */}
    <motion.div
      className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.2 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    />

    {/* Glow decorativo bottom */}
    <motion.div
      className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full opacity-10 pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.1 }}
      transition={{ delay: 0.35, duration: 0.8 }}
    />

    {/* Linhas decorativas */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-0 left-8 w-px h-full bg-white/5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        style={{ transformOrigin: "top" }}
      />
      <motion.div
        className="absolute top-0 left-16 w-px h-full bg-white/[0.03]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        style={{ transformOrigin: "top" }}
      />
    </div>

    {/* Header */}
    <div className="relative flex items-center justify-between px-6 pt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium"
      >
        Menu
      </motion.div>
      <motion.button
        className="relative w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
        onClick={() => setIsMenuOpen(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
      </motion.button>
    </div>

    {/* Divider animado */}
    <motion.div
      className="mx-6 h-px bg-white/10"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.25, duration: 0.5 }}
      style={{ transformOrigin: "left" }}
    />

    {/* Links */}
    <div className="flex flex-col px-4 pt-6 gap-1 flex-1">
      {tabs.map((tab, i) => (
        <motion.button
          key={tab.name}
          onClick={() => scrollToSection(tab.link)}
          className="group relative text-left px-4 py-3 rounded-xl text-white/60 hover:text-white transition-all duration-200 overflow-hidden"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 280, damping: 24 }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Hover bg */}
          <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-200" />

          {/* Linha lateral no hover */}
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-6 bg-white/40 rounded-full transition-all duration-200" />

          <span className="relative flex items-center gap-3">
            <span className="text-white/20 text-xs font-mono group-hover:text-white/40 transition-colors">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-base font-medium">{tab.name}</span>
          </span>
        </motion.button>
      ))}
    </div>

    {/* Divider */}
    <motion.div
      className="mx-6 h-px bg-white/10"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      style={{ transformOrigin: "left" }}
    />

    {/* CTA bottom */}
    <motion.div
      className="px-6 py-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, type: "spring", stiffness: 260, damping: 22 }}
    >
      <PrimaryButton
        text="Faça um orçamento"
        icon={<ArrowRightIcon className="text-white" />}
        onClick={() => scrollToSection("#contato")}
      />
    </motion.div>
  </motion.div>
</>
        )}
      </AnimatePresence>
    </>
  )
}