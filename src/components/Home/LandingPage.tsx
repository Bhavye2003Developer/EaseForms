"use client";

import React, { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import AuthModal from "./AuthModal";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white text-gray-800">
      <Header setShowAuth={setShowAuth} />
      <Hero setShowAuth={setShowAuth} />
      <Features />
      {showAuth && <AuthModal setShowAuth={setShowAuth} />}
      <Footer />
    </div>
  );
}
