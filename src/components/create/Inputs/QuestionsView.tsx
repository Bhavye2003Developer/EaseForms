
import { DivStructType, Scene } from "@/utils/types";
import { QuestionsUIMode } from "../../../../generated/prisma";
import SimpleQuestionUI from "../FormUI/ui/SimpleQuestionUI";
import SingleQuestionUI from "../FormUI/ui/SingleQuestionUI";

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
    <div className="space-y-3 sm:space-y-4">
      {UIMode === QuestionsUIMode.Simple ? (
        <SimpleQuestionUI questions={questions} scene={scene} />
      ) : (
        <SingleQuestionUI questions={questions} scene={scene} />
      )}
    </div>
  );
}
