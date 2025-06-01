"use client";

import React, { useEffect } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import { resetFormUserData, setFormUserId } from "@/utils/helpers";
import useAppStore from "@/utils/useAppStore";

export default function LandingPage() {
  const { session } = useAppStore();

  useEffect(() => {
    if (session?.user) setFormUserId(session.user.email!);
    else resetFormUserData();
  }, [session?.user]);

  return (
    <main className="flex flex-col items-center w-full text-white bg-zinc-950">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
