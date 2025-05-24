"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import CreateNewFormBtn from "./CreateNewFormBtn";
import PublishBtn from "../PublishBtn";
import { parseEndPoint } from "@/utils/helpers";
import Link from "next/link";

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
    <header className="w-full h-16 shadow-sm border-b flex items-center justify-between px-6">
      <Link href={"/"}>
        <h1 className="text-xl md:text-2xl font-semibold text-indigo-600 tracking-tight">
          Easeforms
        </h1>
      </Link>

      <div className="flex items-center space-x-4">
        {parseEndPoint(endPoint) === "/create/:formId" ? (
          <PublishBtn />
        ) : parseEndPoint(endPoint) === "/form/:formId" ? null : (
          <CreateNewFormBtn />
        )}

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition font-medium">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-4 py-2 rounded-md transition font-medium">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </header>
  );
}
