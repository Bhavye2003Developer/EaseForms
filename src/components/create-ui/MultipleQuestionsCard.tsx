import { QuestionType, Scene } from "@/utils/types";
import AnswerBox from "./AnswerBox";
import SubmitBtn from "./SubmitBtn";
import QuestionCasing from "../QuestionCasing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MultipleQuestionsCard({
  scene,
  questions,
  onPrev,
  onNext,
  buttonsActivity,
}: {
  scene: Scene;
  questions: QuestionType[];
  onPrev: () => void;
  onNext: () => void;
  buttonsActivity: {
    prev: boolean;
    next: boolean;
  };
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between gap-4">
      <div className="w-full max-w-3xl mx-auto space-y-4 px-2 pt-2">
        {questions.map((question, idx) => (
          <QuestionCasing
            key={question.id}
            questionId={question.id}
            isAnswerFilled={question.ans.isAnswerFilled}
          >
            <Card className="rounded-xl shadow-sm border border-border bg-background transition hover:shadow-md">
              <CardHeader className="pb-2">
                <h2 className="text-base font-semibold text-foreground">
                  {idx + 1}. {question.title}
                </h2>
              </CardHeader>
              <CardContent className="pt-0">
                <AnswerBox
                  scene={scene}
                  data={question.ans.data}
                  questionId={question.id}
                  option={question.ans.type}
                />
              </CardContent>
            </Card>
          </QuestionCasing>
        ))}
      </div>

      <div className="w-full max-w-3xl mx-auto px-2 pb-4 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={!buttonsActivity.prev}
        >
          ← Prev
        </Button>

        {buttonsActivity.next ? (
          <Button onClick={onNext} disabled={!buttonsActivity.next}>
            Next →
          </Button>
        ) : (
          <SubmitBtn scene={scene} />
        )}
      </div>
    </div>
  );
}
