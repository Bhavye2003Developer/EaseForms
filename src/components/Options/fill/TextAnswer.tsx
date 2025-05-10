"use client";

import { useEffect, useState } from "react";

export default function TextAnswer({
  isShort,
  isInteractive,
}: {
  isShort: boolean;
  isInteractive: boolean;
}) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setInputText("");
  }, [isShort]);

  return (
    <div className="w-full">
      {isShort ? (
        <input
          type="text"
          disabled={!isInteractive}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Short Answer"
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all"
        />
      ) : (
        <textarea
          disabled={!isInteractive}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Long Answer"
          rows={4}
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all resize-none"
        />
      )}
    </div>
  );
}
