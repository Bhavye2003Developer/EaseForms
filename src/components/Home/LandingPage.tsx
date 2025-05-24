"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";
import AuthModal from "./AuthModal";
import { useAuth, useUser } from "@clerk/nextjs";
import { resetFormUserData, setFormUserId } from "@/utils/helpers";
import LoadingOverlay from "../LoadingOverlay";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const { userId } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("user signin using clerk", userId);
    if (userId) setFormUserId(userId);
    else resetFormUserData();
  }, [isSignedIn]);

  return (
    <div className="flex flex-col items-center justify-between bg-white text-gray-800">
      <Header setIsLoading={(bool) => setIsLoading(bool)} />
      <Hero />
      UserId: {userId}
      <Features />
      <Footer />
      {isLoading && (
        <LoadingOverlay
          message={"Just a moment, we are creating a new form just for you..."}
        />
      )}
    </div>
  );
}
