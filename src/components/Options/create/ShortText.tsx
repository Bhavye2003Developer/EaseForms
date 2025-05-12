"use client";

import { Scene } from "@/utils/types";

export default function ShortText({ scene }: { scene: Scene }) {
  return (
    <div className="w-full">
      {scene === Scene.Editor || scene === Scene.Preview ? (
        <input
          type="text"
          disabled={scene === Scene.Editor}
          placeholder="Short Answer"
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all"
        />
      ) : (
        <input
          type="text"
          placeholder="Short Answer"
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all"
        />
      )}
    </div>
  );
}
