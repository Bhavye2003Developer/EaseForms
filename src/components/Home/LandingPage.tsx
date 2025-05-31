"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import { resetFormUserData, setFormUserId } from "@/utils/helpers";
import { useUser } from "@auth0/nextjs-auth0";

export default function LandingPage() {
  const { user } = useUser();

  useEffect(() => {
    if (user) setFormUserId(user.email!);
    else resetFormUserData();
  }, [user]);

  return (
    <main className="flex flex-col items-center w-full text-white bg-zinc-950">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
