"use client";

import { AnswerDataType, Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { Input } from "@/components/ui/input";

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
    <Input
      type="text"
      disabled={scene === Scene.Editor}
      placeholder="Short Answer"
      value={
        scene !== Scene.Editor && typeof answerData === "string"
          ? answerData
          : ""
      }
      onChange={
        scene !== Scene.Editor
          ? (e) =>
              updateAnswer(questionId, e.target.value, e.target.value !== "")
          : undefined
      }
      className="text-base px-2 py-1 min-h-[2.25rem] rounded-md"
    />
  );
}
