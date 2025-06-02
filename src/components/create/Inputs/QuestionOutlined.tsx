"use client";

import useFormStore from "@/utils/useFormStore";
import QuestionCreator from "./QuestionCreator";
import { QuestionType, SectionType } from "@/utils/types";
import { Plus, Trash2, Copy, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

export default function QuestionOutlined({
  questionData,
  index,
}: {
  questionData: QuestionType | SectionType;
  index: number;
}) {
  const { createNewQuestion, deleteQuestion, duplicateQuestion, addSection } =
    useFormStore((state) => state);

  const isQuestion = "title" in questionData;

  return (
    <Card className="w-full bg-background shadow-sm rounded-xl">
      <CardContent>
        {isQuestion ? (
          <QuestionCreator index={index} questionData={questionData} />
        ) : (
          <h2 className="text-lg font-medium text-foreground mb-4">
            Section Break
          </h2>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap md:flex-nowrap justify-end gap-2 md:gap-3 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            createNewQuestion(questionData.id);
            toast.success("New question added", { duration: 1000 });
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            deleteQuestion(questionData.id);
            toast.success("Question deleted", { duration: 1000 });
          }}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          {isQuestion ? "Delete Question" : "Delete Section"}
        </Button>

        {isQuestion && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                duplicateQuestion(questionData.id);
                toast.success("Question duplicated", { duration: 1000 });
              }}
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                addSection(questionData.id);
                toast.success("Section added", { duration: 1000 });
              }}
            >
              <LayoutList className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
