"use client";

import { motion } from "framer-motion";

export default function RedTeamTerminalGraphic() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 320 240"
        className="w-88 h-88"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <linearGradient id="terminalBg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0f" />
            <stop offset="100%" stopColor="#111018" />
          </linearGradient>

          <linearGradient id="scanGlow" x1="0" x2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {/* Terminal window */}
        <rect
          x="30"
          y="30"
          width="260"
          height="160"
          rx="10"
          fill="url(#terminalBg)"
          stroke="#ef4444"
          strokeOpacity="0.2"
        />

        {/* Top bar */}
        <circle cx="50" cy="45" r="4" fill="#ef4444" />
        <circle cx="65" cy="45" r="4" fill="#f59e0b" />
        <circle cx="80" cy="45" r="4" fill="#22c55e" />

        {/* Terminal text lines */}
        {[
          "nmap -sS 192.168.0.1",
          "Scanning ports...",
          "22/tcp  open  ssh",
          "80/tcp  open  http",
          "443/tcp open  https",
          "Exploit attempt initiated...",
        ].map((text, i) => (
          <motion.text
            key={i}
            x="45"
            y={70 + i * 15}
            fontSize="9"
            fill={i < 2 ? "#22c55e" : "#c4b5fd"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: i * 0.4,
              duration: 0.3,
            }}
          >
            {text}
          </motion.text>
        ))}

        {/* Blinking cursor */}
        <motion.rect
          x="45"
          y="155"
          width="6"
          height="10"
          fill="#22c55e"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Red scan overlay */}
        <motion.rect
          x="30"
          y="30"
          width="260"
          height="160"
          fill="url(#scanGlow)"
          opacity="0.08"
          animate={{ y: [30, 190, 30] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Alert indicator */}
        <motion.text
          x="160"
          y="210"
          textAnchor="middle"
          fontSize="11"
          fill="#ef4444"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ACCESS GAINED
        </motion.text>
      </motion.svg>
    </div>
  );
}
