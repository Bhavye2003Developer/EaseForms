import { DivStructType, Scene } from "@/utils/types";
import AnswerBox from "../AnswerBox";
import SubmitBtn from "../SubmitBtn";
import QuestionCasing from "@/components/QuestionCasing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuestionsPageUI({
  scene,
  questions,
}: {
  questions: DivStructType;
  scene: Scene;
}) {
  return (
    <div className="space-y-6">
      {questions.map((question, idx) =>
        "title" in question ? (
          <QuestionCasing
            key={question.id}
            questionId={question.id}
            isAnswerFilled={question.ans.isAnswerFilled}
          >
            <Card className="border border-gray-200 shadow hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-base text-indigo-800 font-semibold">
                  {idx + 1}. {question.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-4 pb-4">
                <AnswerBox
                  scene={scene}
                  data={question.ans.data}
                  questionId={question.id}
                  option={question.ans.type}
                />
              </CardContent>
            </Card>
          </QuestionCasing>
        ) : null
      )}
      <div className="pt-6 text-center">
        <SubmitBtn scene={scene} />
      </div>
    </div>
  );
}
