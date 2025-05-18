import { getEmailLogoText } from "@/utils/helpers";
import useAppStore from "@/utils/useAppStore";
import Link from "next/link";
import React from "react";

export default function Header({
  setShowAuth,
}: {
  setShowAuth: (stat: boolean) => void;
}) {
  const { email } = useAppStore();

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-white">
      <h1 className="text-2xl font-bold text-indigo-600">Easeforms</h1>

      <div className="flex items-center space-x-4">
        {email ? (
          <>
            <Link href={"/create"}>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold transition">
                + New Form
              </button>
            </Link>
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
              title={email}
            >
              {getEmailLogoText(email)}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowAuth(true)}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowAuth(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold transition"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </header>
  );
}
