"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import { useAuth, useUser } from "@clerk/nextjs";
import { resetFormUserData, setFormUserId } from "@/utils/helpers";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const { userId } = useAuth();

  useEffect(() => {
    if (userId) setFormUserId(userId);
    else resetFormUserData();
  }, [isSignedIn]);

  return (
    <main className="flex flex-col items-center w-full text-white bg-zinc-950">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
