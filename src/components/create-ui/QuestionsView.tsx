import SingleQuestionUI from "./SingleQuestionUI";
import { QuestionsUIMode, QuestionType, Scene } from "@/utils/types";
import SimpleQuestionUI from "../Options/create/SimpleQuestionUI";

export default function QuestionsView({
  UIMode,
  questions,
  scene,
}: {
  UIMode: QuestionsUIMode;
  questions: QuestionType[];
  scene: Scene;
}) {
  return (
    <div className="space-y-4">
      {UIMode === QuestionsUIMode.Simple ? (
        <SimpleQuestionUI questions={questions} scene={scene} />
      ) : (
        <SingleQuestionUI questions={questions} scene={scene} />
      )}
    </div>
  );
}
