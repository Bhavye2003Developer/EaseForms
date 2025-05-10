import SingleQuestionUI from "./SingleQuestionUI";
import { QuestionsUIMode, QuestionType } from "@/utils/types";
import SimpleQuestionUI from "../Options/create/SimpleQuestionUI";

export default function QuestionsView({
  UIMode,
  questions,
}: {
  UIMode: QuestionsUIMode;
  questions: QuestionType[];
}) {
  return (
    <div className="space-y-4">
      {UIMode === QuestionsUIMode.Simple ? (
        <SimpleQuestionUI questions={questions} />
      ) : (
        <SingleQuestionUI questions={questions} />
      )}
    </div>
  );
}
