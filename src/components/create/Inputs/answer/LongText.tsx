"use client";

import { AnswerDataType, Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { Textarea } from "@/components/ui/textarea";

export default function LongText({
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
    <Textarea
      placeholder="Long Answer"
      rows={4}
      disabled={scene === Scene.Editor}
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
      className="text-base px-2 py-1 min-h-[6rem] rounded-md resize-none"
    />
  );
}
