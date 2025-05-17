"use client";

import { AnswerDataType, Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";

export default function ShortText({
  answerData,
  questionId,
  scene,
}: {
  answerData: AnswerDataType;
  questionId: number;
  scene: Scene;
}) {
  const { updateAnswer } = useFormFillingStore();
  return (
    <div className="w-full">
      {scene === Scene.Editor ? (
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
          value={(typeof answerData === "string" && answerData) || ""}
          onChange={(e) =>
            updateAnswer(questionId, e.target.value, e.target.value !== "")
          }
          className="w-full border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:ring-0 px-2 py-1 text-gray-800 placeholder-gray-400 text-base transition-all"
        />
      )}
    </div>
  );
}
