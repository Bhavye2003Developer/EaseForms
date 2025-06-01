"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link href="/" className="relative group inline-block">
      {/* Stronger radiating glow */}
      <motion.div
        className="absolute -inset-2 rounded-xl bg-indigo-500 opacity-30 blur-[60px] group-hover:opacity-50 transition"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Shine sweep effect (subtle) */}
      <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
        <motion.span
          className="absolute left-0 top-0 h-full w-full bg-white/10 blur-lg"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
          }}
        />
      </span>

      {/* Logo Text */}
      <motion.h1
        className="relative z-10 text-2xl font-extrabold tracking-tight text-indigo-500 group-hover:text-indigo-400 transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        Easeforms
      </motion.h1>
    </Link>
  );
}
