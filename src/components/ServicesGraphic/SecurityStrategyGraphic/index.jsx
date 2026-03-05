"use client";

import { motion } from "framer-motion";

export default function SecurityStrategyDashboardGraphic() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <motion.svg
        viewBox="0 0 320 260"
        className="w-88 h-88"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="panelGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1e1b2e" />
            <stop offset="100%" stopColor="#0f0d1a" />
          </linearGradient>

          <linearGradient id="chartLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>

          <radialGradient id="glowSoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Background Glow */}
        <circle cx="160" cy="130" r="120" fill="url(#glowSoft)" />

        {/* Dashboard Panel */}
        <rect
          x="40"
          y="40"
          width="240"
          height="160"
          rx="14"
          fill="url(#panelGradient)"
          stroke="#8b5cf6"
          strokeOpacity="0.15"
        />

        {/* Top status indicators */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={65 + i * 18}
            cy="60"
            r="4"
            fill={i === 0 ? "#22c55e" : "#8b5cf6"}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Line chart */}
        <motion.path
          d="M70 160 L100 140 L130 150 L160 120 L190 130 L220 110"
          fill="none"
          stroke="url(#chartLine)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Bar indicators */}
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={90 + i * 30}
            y={170 - i * 10}
            width="10"
            height={20 + i * 10}
            rx="2"
            fill="#7c3aed"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Radar circle (risk assessment idea) */}
        <g transform="translate(250,85)">
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="none"
            stroke="#8b5cf6"
            strokeOpacity="0.2"
          />

          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="-20"
            stroke="#c4b5fd"
            strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: 0.5, originY: 0.5 }}
          />
        </g>

        {/* KPI numbers */}
        <text
          x="70"
          y="100"
          fontSize="12"
          fill="#ffffff"
          opacity="0.8"
        >
          Risk: 24%
        </text>

        <text
          x="70"
          y="120"
          fontSize="12"
          fill="#ffffff"
          opacity="0.6"
        >
          Compliance: 92%
        </text>

        {/* Subtle grid lines */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1="60"
            y1={110 + i * 20}
            x2="260"
            y2={110 + i * 20}
            stroke="#ffffff"
            strokeOpacity="0.05"
          />
        ))}
      </motion.svg>
    </div>
  );
}
