"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import useAppStore from "@/utils/useAppStore";
import { parseEndPoint } from "@/utils/helpers";
import SignInBtn from "../auth/SignInBtn";
import { Session } from "next-auth";
import Profile from "../auth/Profile";
import { resetFormUserData, setFormUserId } from "@/utils/helpers";
import { toast } from "sonner";
import Logo from "./Logo";

export default function Header({ session }: { session: Session | null }) {
  const endPoint = usePathname();
  const { setSession } = useAppStore();

  useEffect(() => {
    console.log("Path name changed: ", endPoint, parseEndPoint(endPoint));
  }, [endPoint]);

  useEffect(() => {
    setSession(session);
  }, []);

  useEffect(() => {
    console.log("updated session from header: ", session);
    if (session?.user) setFormUserId(session.user.email!);
    else {
      resetFormUserData();
      setSession(null);
    }
  }, [session?.user]);

  return (
    <header className="w-full h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 backdrop-blur-sm shadow-sm">
      <Logo />
      {session?.user ? <Profile /> : <SignInBtn />}
    </header>
  );
}
