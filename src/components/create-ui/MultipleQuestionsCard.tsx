import { QuestionType, Scene } from "@/utils/types";
import AnswerBox from "./AnswerBox";
import { BtnCss } from "./SingleQuestionCard";

export default function MultipleQuestionsCard({
  scene,
  questions,
  onPrev,
  onNext,
  buttonsActivity,
}: {
  scene: Scene;
  questions: QuestionType[];
  onPrev: () => void;
  onNext: () => void;
  buttonsActivity: {
    prev: boolean;
    next: boolean;
  };
}) {
  return (
    <div className="">
      <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
        {questions.map((question, idx) => (
          <div
            key={question.id}
            className="p-6 rounded-2xl shadow-md border border-gray-200 transition-all hover:shadow-lg"
          >
            {"title" in question ? (
              <>
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-base sm:text-lg font-semibold text-white leading-snug">
                    {idx + 1}. {question.title}
                  </h2>
                </div>
                <div className="pl-1">
                  <AnswerBox
                    scene={scene}
                    data={question.ans.data}
                    questionId={question.id}
                    option={question.ans.type}
                  />
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-between items-center mt-4">
        <button
          onClick={onPrev}
          disabled={!buttonsActivity.prev}
          className={
            buttonsActivity.prev
              ? BtnCss.enabled
              : BtnCss.disabled + " opacity-60 cursor-not-allowed"
          }
        >
          ← Prev
        </button>

        <button
          onClick={onNext}
          disabled={!buttonsActivity.next}
          className={
            buttonsActivity.next
              ? BtnCss.enabled
              : BtnCss.disabled + " opacity-60 cursor-not-allowed"
          }
        >
          Next →
        </button>
      </div>
    </div>
  );
}
