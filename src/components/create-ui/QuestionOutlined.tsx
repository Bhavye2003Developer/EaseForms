"use client";

import useFormStore from "@/utils/useFormStore";
import QuestionCreator from "./QuestionCreator";
import { QuestionType, SectionType } from "@/utils/types";

// Lucide icons
import { Plus, Trash2, Copy, LayoutList } from "lucide-react";

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
    <div className="w-full border rounded-lg p-6 bg-muted mb-6 shadow-sm">
      {isQuestion ? (
        <QuestionCreator index={index} questionData={questionData} />
      ) : (
        <h2 className="text-lg font-medium text-foreground mb-2">
          Section Break
        </h2>
      )}

      <div className="flex flex-wrap justify-end gap-2 mt-4">
        <button
          onClick={() => createNewQuestion(questionData.id)}
          className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent"
        >
          <Plus className="w-4 h-4" />
          Add Question
        </button>

        <button
          onClick={() => deleteQuestion(questionData.id)}
          className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent"
        >
          <Trash2 className="w-4 h-4" />
          {isQuestion ? "Delete Question" : "Delete Section"}
        </button>

        {isQuestion && (
          <>
            <button
              onClick={() => duplicateQuestion(questionData.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent"
            >
              <Copy className="w-4 h-4" />
              Duplicate
            </button>

            <button
              onClick={() => addSection(questionData.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-accent"
            >
              <LayoutList className="w-4 h-4" />
              Add Section
            </button>
          </>
        )}
      </div>
    </div>
  );
}
