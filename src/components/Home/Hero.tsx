import React from "react";

export default function Hero({
  setShowAuth,
}: {
  setShowAuth: (stat: boolean) => void;
}) {
  return (
    <section className="w-full text-center px-4 py-20 bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Build Smarter Forms with Easeforms
      </h2>
      <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-2xl mx-auto">
        Create, preview, and manage beautiful forms with advanced features like
        timed forms, live preview, drag-and-drop, and more.
      </p>
      <button
        onClick={() => setShowAuth(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition"
      >
        Start Building Now
      </button>
    </section>
  );
}
