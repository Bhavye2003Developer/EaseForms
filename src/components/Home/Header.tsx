"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAppStore from "@/utils/useAppStore";
import { parseEndPoint } from "@/utils/helpers";
import SignInBtn from "../auth/SignInBtn";
import { Session } from "next-auth";
import Profile from "../auth/Profile";

export default function Header({ session }: { session: Session | null }) {
  const endPoint = usePathname();
  const { setSession } = useAppStore();

  useEffect(() => {
    console.log("Path name changed: ", endPoint, parseEndPoint(endPoint));
  }, [endPoint]);

  useEffect(() => {
    setSession(session);
  }, []);

  return (
    <header className="w-full h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 backdrop-blur-sm shadow-sm">
      <Link href="/" className="select-none">
        <h1 className="text-indigo-500 font-extrabold text-2xl tracking-tight hover:text-indigo-400 transition-colors cursor-pointer">
          Easeforms
        </h1>
      </Link>

      {session?.user ? <Profile /> : <SignInBtn />}
    </header>
  );
}
