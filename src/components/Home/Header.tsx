import React from "react";

export default function Header({
  setShowAuth,
}: {
  setShowAuth: (stat: boolean) => void;
}) {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-white">
      <h1 className="text-2xl font-bold text-indigo-600">Easeforms</h1>
      <div className="space-x-4">
        <button
          onClick={() => setShowAuth(true)}
          className="text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          Login
        </button>
        <button
          onClick={() => setShowAuth(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
