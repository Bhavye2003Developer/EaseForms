import { DivStructType, Scene } from "@/utils/types";
import AnswerBox from "../AnswerBox";
import SubmitBtn from "../SubmitBtn";

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
          <div
            key={question.id}
            className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
          >
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
          </div>
        ) : null
      )}
      <SubmitBtn scene={scene} />
    </>
  );
}
