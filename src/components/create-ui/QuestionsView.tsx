import SimpleQuestionUI from "./UI/SimpleQuestionUI";
import SingleQuestionUI from "./UI/SingleQuestionUI";
import {
  DivStructType,
  QuestionsUIMode,
  QuestionType,
  Scene,
  SectionType,
} from "@/utils/types";

export default function QuestionsView({
  UIMode,
  questions,
  scene,
}: {
  UIMode: QuestionsUIMode;
  questions: DivStructType;
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
