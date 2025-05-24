"use client";

import LandingPage from "@/components/Home/LandingPage";
import useAppStore from "@/utils/useAppStore";
import { useEffect } from "react";

export default function Home() {
  // const { init } = useAppStore();
  // useEffect(() => {
  //   init();
  // }, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
}
