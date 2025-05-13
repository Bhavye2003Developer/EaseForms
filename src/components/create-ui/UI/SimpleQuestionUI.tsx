import { DivStructType, QuestionType, Scene } from "@/utils/types";
import AnswerBox from "../../create-ui/AnswerBox";
import useFormStore from "@/utils/useFormStore";
import SectionedQuestionsUI from "./SectionedQuestionsUI";

export default function SimpleQuestionUI({
  scene,
  questions,
}: {
  questions: DivStructType;
  scene: Scene;
}) {
  const sectionCnt = questions.filter(
    (question) => !("title" in question)
  ).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 px-4 py-6">
      {sectionCnt > 0 ? (
        <SectionedQuestionsUI questions={questions} scene={scene} />
      ) : (
        questions.map((question, idx) => (
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
        ))
      )}
    </div>
  );
}
