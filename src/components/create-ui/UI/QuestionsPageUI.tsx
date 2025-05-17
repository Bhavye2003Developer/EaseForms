import { DivStructType, Scene } from "@/utils/types";
import AnswerBox from "../AnswerBox";
import SubmitBtn from "../SubmitBtn";
import QuestionCasing from "@/components/QuestionCasing";

export default function QuestionsPageUI({
  scene,
  questions,
}: {
  questions: DivStructType;
  scene: Scene;
}) {
  return (
    <>
      {questions.map((question, idx) =>
        "title" in question ? (
          <QuestionCasing
            key={question.id}
            questionId={question.id}
            isAnswerFilled={question.ans.isAnswerFilled}
          >
            <div className="p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
              <div className="mb-4 flex justify-between items-start">
                <h2 className="text-lg font-semibold text-white">
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
          </QuestionCasing>
        ) : null
      )}
      <SubmitBtn scene={scene} />
    </>
  );
}
