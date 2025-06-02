"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ErrorPage({ msg }: { msg: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full max-w-2xl bg-white border border-red-200 rounded-xl shadow-lg overflow-hidden"
      >
        {/* Icon Section */}
        <div className="flex items-center justify-center bg-red-50 px-6 py-8 border-r border-red-100">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Content Section */}
        <div className="flex-1 px-6 py-8">
          <h2 className="text-lg font-semibold text-zinc-800 mb-2">
            Oops! An Error Occurred
          </h2>
          <p className="text-sm text-zinc-600 mb-4">{msg}</p>

          <Link href="/" passHref>
            <Button className="w-full">Back to Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
