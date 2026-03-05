"use client";

import { motion } from "framer-motion";

export default function PentestGraphicEnhanced() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center ">
      <motion.svg
        viewBox="0 0 300 300"
        className="w-88 h-88"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="img"
        aria-label="Ilustração de teste de invasão"
      >
        <defs>
          {/* background glow */}
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.36" />
            <stop offset="60%" stopColor="#6d28d9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* scan gradient */}
          <linearGradient id="scanLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>

          {/* breach color */}
          <radialGradient id="breachGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ff6b6b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* subtle blur filter for glow */}
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feBlend in="SourceGraphic" in2="blur" />
          </filter>

          {/* dashed path stroke style */}
          <style>
            {`.dash { stroke-dasharray: 6 6; stroke-linecap: round; } 
               .thin { stroke-width: 1; } 
               .bold { stroke-width: 2; }`}
          </style>
        </defs>

        {/* background glow */}
        <circle cx="150" cy="150" r="115" fill="url(#bgGlow)" />

        {/* concentric rings - soft */}
        {[90, 66, 44].map((r, i) => (
          <motion.circle
            key={r}
            cx="150"
            cy="150"
            r={r}
            stroke="#8b5cf6"
            strokeOpacity={0.12 + i * 0.06}
            strokeWidth={1}
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0.12] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* network connections (subtle) */}
        <g stroke="#c4b5fd" strokeOpacity="0.12" strokeWidth="1" fill="none">
          <line x1="150" y1="150" x2="210" y2="110" />
          <line x1="150" y1="150" x2="90" y2="110" />
          <line x1="150" y1="150" x2="210" y2="190" />
          <line x1="150" y1="150" x2="90" y2="190" />
        </g>

        {/* nodes */}
        {[
          { x: 210, y: 110 },
          { x: 90, y: 110 },
          { x: 210, y: 190 },
          { x: 90, y: 190 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#c4b5fd"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* central "core" - shield-ish geometry */}
        <g transform="translate(150,150)">
          {/* outer tech hex (rotating) */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <path
              d="M -36 -8 L -12 -28 L 12 -28 L 36 -8 L 12 12 L -12 12 Z"
              fill="none"
              stroke="#9f7aea"
              strokeOpacity="0.12"
              strokeWidth="1.5"
            />
          </motion.g>

          {/* internal wireframe shield */}
          <path
            d="M -18 -2 L 0 -26 L 18 -2 L 0 18 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.06"
            strokeWidth="1.2"
          />

          {/* core pulse */}
          <motion.circle
            cx="0"
            cy="0"
            r="10"
            fill="#7c3aed"
            animate={{ scale: [1, 1.35, 1], opacity: [1, 0.85, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* breach point + glow (animated pulse & ripple) */}
        <g>
          <defs>
            <radialGradient id="breachPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#ff6b6b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <motion.circle
            cx="210"
            cy="110"
            r="12"
            fill="url(#breachPulse)"
            animate={{ scale: [1, 1.4, 1], opacity: [0.9, 0.45, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.circle
            cx="210"
            cy="110"
            r="4"
            fill="#ff6b6b"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* animated attack vector path (dash moves along path) */}
        <g>
          <motion.path
            d="M 90 190 C 120 160, 140 150, 150 150"
            fill="none"
            stroke="#f0abfc"
            className="dash thin"
            strokeOpacity="0.7"
            initial={{ strokeDashoffset: 30 }}
            animate={{ strokeDashoffset: [30, 0, -30] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
          />

          <motion.path
            d="M 150 150 C 160 150, 180 140, 210 110"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.6"
            strokeOpacity="0.9"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </g>

        {/* tiny terminal / console box (left) */}
        <g transform="translate(60,60)">
          <rect x="0" y="0" width="48" height="26" rx="4" fill="#000000" fillOpacity="0.25" />
          <rect x="4" y="4" width="40" height="6" rx="2" fill="#0f172a" />
          <motion.rect
            x="6"
            y="6"
            width="6"
            height="2"
            rx="1"
            fill="#10b981"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <text x="4" y="22" fontSize="6" fill="#c4b5fd" opacity="0.6">root@scan:~</text>
        </g>

        {/* rotating scan arm (center) */}
        <motion.line
          x1="150"
          y1="150"
          x2="150"
          y2="60"
          stroke="url(#scanLine)"
          strokeWidth="1.8"
          strokeLinecap="round"
          transformBox="fill-box"
          transformOrigin="50% 50%"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          style={{ transformOrigin: "50% 50%" }}
        />

        {/* decorative outer dashed ring */}
        <motion.circle
          cx="150"
          cy="150"
          r="100"
          fill="none"
          stroke="#8b5cf6"
          className="dash"
          strokeOpacity="0.06"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      
      </motion.svg>
    </div>
  );
}
