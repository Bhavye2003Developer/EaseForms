import { DivStructType, Scene } from "@/utils/types";
import SectionedQuestionsUI from "./SectionedQuestionsUI";
import QuestionsPageUI from "./QuestionsPageUI";

export default function SimpleQuestionUI({
  scene,
  questions,
}: {
  questions: DivStructType;
  scene: Scene;
}) {
  const hasSections = questions.some((q) => !("title" in q));

  return (
    <div className="max-w-3xl mx-auto px-3 py-4 space-y-4 sm:space-y-5">
      {hasSections ? (
        <SectionedQuestionsUI questions={questions} scene={scene} />
      ) : questions.length > 0 ? (
        <QuestionsPageUI questions={questions} scene={scene} />
      ) : (
        <div className="text-center text-sm text-muted-foreground">
          No questions available.
        </div>
      )}
    </div>
  );
}
