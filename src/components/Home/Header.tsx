"use client";

import { form } from "@/utils/constants";
import { FetchedResponse } from "@/utils/types";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default function Header() {
  const { userId } = useAuth();

  const redirectUserToCreateForm = async () => {
    const userId = localStorage.getItem("easeforms_userId");

    const req = await fetch("/api/create-form", {
      method: "POST",
      body: JSON.stringify({ userId, form }),
    });
    const response: FetchedResponse = await req.json();
    const formId = response.data.formId;
    redirect(`/create/${formId}`);
  };

  return (
    <header className="w-full h-16 shadow-sm border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl md:text-2xl font-semibold text-indigo-600 tracking-tight">
        Easeforms
      </h1>

      <div className="flex items-center space-x-4">
        {userId ? (
          <>
            <button
              onClick={redirectUserToCreateForm}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition font-medium"
            >
              + New Form
            </button>
            <UserButton />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}
