import { Scene } from "@/utils/types";

export default function LongText({ scene }: { scene: Scene }) {
  return (
    <div className="w-full">
      {scene === Scene.Editor || scene === Scene.Preview     ? (
        <textarea
          disabled={scene === Scene.Editor}
          placeholder="Long Answer"
          rows={4}
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all resize-none"
        />
      ) : (
        <textarea
          placeholder="Long Answer"
          rows={4}
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all resize-none"
        />
      )}
    </div>
  );
}
