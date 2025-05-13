import { DivStructType, Scene } from "@/utils/types";
import SectionedQuestionsUI from "./SectionedQuestionsUI";
import useFormFillingStore from "@/utils/useFormFillingStore";
import QuestionsPageUI from "./QuestionsPageUI";
import FormSubmissionPage from "../FormSubmissionPage";

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
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {sectionCnt > 0 ? (
        <SectionedQuestionsUI questions={questions} scene={scene} />
      ) : (
        <>
          {questions.length > 0 ? (
            <QuestionsPageUI questions={questions} scene={scene} />
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No questions available.
            </div>
          )}
        </>
      )}
    </div>
  );
}
