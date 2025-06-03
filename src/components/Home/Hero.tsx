"use client";

import { Button } from "@/components/ui/moving-border";
import { Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";
import useAppStore from "@/utils/useAppStore";
import { motion } from "framer-motion";

const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;

export default function Hero() {
  const { session } = useAppStore();

  return (
    <section className="relative w-full bg-zinc-950 pt-28 pb-14 px-6 md:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex flex-wrap justify-center items-center gap-2 mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-800/60 text-sm font-medium text-zinc-300 backdrop-blur-md border border-zinc-700/50">
            No fluff. Just form magic.
          </span>
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-1.5 rounded-full bg-zinc-900/70 text-sm font-medium text-green-400 border border-green-700 hover:bg-zinc-800 transition"
            >
              Open Sourced on GitHub
            </Link>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
        >
          {session?.user ? (
            <>
              Welcome back,{" "}
              <span className="text-indigo-400">{session.user.name}</span>.
            </>
          ) : (
            <>
              Welcome to{" "}
              <Highlight className="text-indigo-500">Easeforms</Highlight>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Build forms like a pro — with real-time preview, drag-and-drop layout,
          smart answer control, and built-in timer logic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/dashboard">
            <Button
              borderRadius="1.5rem"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-base px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Start Building Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
