import { QuestionType, Scene } from "@/utils/types";
import AnswerBox from "./AnswerBox";
import { useEffect } from "react";

export enum BtnCss {
  enabled = "px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200",
  disabled = "px-5 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed",
}

export default function SingleQuestionCard({
  scene,
  question,
  onPrev,
  onNext,
  buttonsActivity,
}: {
  scene: Scene;
  question: QuestionType;
  onPrev: () => void;
  onNext: () => void;
  buttonsActivity: {
    prev: boolean;
    next: boolean;
  };
}) {
  useEffect(() => {
    console.log("btn activity updated: ", buttonsActivity);
  }, [buttonsActivity]);

  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        {question.title}
      </h2>

      <div className="flex-1 flex items-center justify-center w-full mb-8">
        <AnswerBox
          scene={scene}
          data={question.ans.data}
          questionId={question.id}
          option={question.ans.type}
        />
      </div>

      <div className="w-full flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={!buttonsActivity.prev}
          className={buttonsActivity.prev ? BtnCss.enabled : BtnCss.disabled}
        >
          ← Prev
        </button>
        <button
          onClick={onNext}
          disabled={!buttonsActivity.next}
          className={buttonsActivity.next ? BtnCss.enabled : BtnCss.disabled}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
