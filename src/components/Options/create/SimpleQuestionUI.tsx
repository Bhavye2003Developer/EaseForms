import { QuestionType, Scene } from "@/utils/types";
import AnswerBox from "../../create-ui/AnswerBox";

export default function SimpleQuestionUI({
  scene,
  questions,
}: {
  questions: QuestionType[];
  scene: Scene;
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      {questions.map((question, idx) => (
        <div
          key={question.id}
          className="p-6 rounded-2xl shadow-md border border-gray-200 transition-all hover:shadow-lg"
        >
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
        </div>
      ))}
    </div>
  );
}
