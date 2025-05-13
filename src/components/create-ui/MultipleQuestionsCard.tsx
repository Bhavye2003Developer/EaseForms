import { QuestionType, Scene } from "@/utils/types";
import AnswerBox from "./AnswerBox";
import { BtnCss } from "./SingleQuestionCard";
import { toast } from "sonner";
import SubmitBtn from "./SubmitBtn";

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
    <div className="w-full h-full flex flex-col justify-between">
      <div className="max-w-3xl w-full mx-auto space-y-6 px-4 py-6">
        {questions.map((question, idx) => (
          <div
            key={question.id}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
          >
            {"title" in question && (
              <>
                <div className="mb-4 flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-800">
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
            )}
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl mx-auto px-4 pb-6 flex justify-between items-center">
        <button
          onClick={onPrev}
          disabled={!buttonsActivity.prev}
          className={
            buttonsActivity.prev
              ? BtnCss.enabled
              : `${BtnCss.disabled} opacity-60 cursor-not-allowed`
          }
        >
          ← Prev
        </button>

        {buttonsActivity.next ? (
          <button
            onClick={onNext}
            disabled={!buttonsActivity.next}
            className={
              buttonsActivity.next
                ? BtnCss.enabled
                : `${BtnCss.disabled} opacity-60 cursor-not-allowed`
            }
          >
            Next →
          </button>
        ) : (
          <SubmitBtn scene={scene} />
        )}
      </div>
    </div>
  );
}
