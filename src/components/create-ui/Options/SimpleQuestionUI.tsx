import { QuestionType } from "@/utils/types";
import AnswerBox from "../AnswerBox";

export default function SimpleQuestionUI({
  questions,
}: {
  questions: QuestionType[];
}) {
  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className="p-4 border border-gray-300 rounded-md bg-white shadow-sm"
        >
          <h2 className="text-lg font-medium text-gray-800">
            {question.title}
          </h2>
          <AnswerBox
            isInteractive={true}
            data={question.ans.data}
            questionId={question.id}
            option={question.ans.type}
          />
        </div>
      ))}
    </div>
  );
}
