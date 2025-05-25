"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import CreateNewFormBtn from "./CreateNewFormBtn";
import PublishBtn from "../PublishBtn";
import { parseEndPoint } from "@/utils/helpers";
import { usePathname } from "next/navigation";

export default function Header({
  setIsLoading,
}: {
  setIsLoading?: (val: boolean) => void;
}) {
  const { userId: clerkUserId } = useAuth();
  const endPoint = usePathname();

  useEffect(() => {
    console.log("Path name changed: ", endPoint, parseEndPoint(endPoint));
  }, [endPoint]);

  return (
    <header className="w-full h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 backdrop-blur-sm shadow-sm">
      <Link href="/" className="select-none">
        <h1 className="text-indigo-500 font-extrabold text-2xl tracking-tight hover:text-indigo-400 transition cursor-pointer">
          Easeforms
        </h1>
      </Link>

      <div className="flex items-center space-x-3">
        {clerkUserId &&
          (parseEndPoint(endPoint) === "/create/:formId" ? (
            <PublishBtn />
          ) : parseEndPoint(endPoint) === "/form/:formId" ? null : (
            <CreateNewFormBtn />
          ))}

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "ring-2 ring-indigo-600 ring-offset-1",
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-sm px-4 py-2 rounded-lg font-semibold transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}
