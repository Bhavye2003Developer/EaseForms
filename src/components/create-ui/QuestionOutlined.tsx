"use client";

import useFormStore from "@/utils/useFormStore";
import QuestionCreator from "./QuestionCreator";
import { QuestionType, SectionType } from "@/utils/types";

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
    <div className="w-full border border-gray-200 rounded-md p-4 shadow-sm bg-white mb-6">
      {isQuestion ? (
        <QuestionCreator index={index} questionData={questionData} />
      ) : (
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Section: {questionData.id}
        </h2>
      )}

      <div className="flex flex-wrap justify-end gap-3 mt-6">
        <button
          onClick={() => createNewQuestion(questionData.id)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
        >
          ➕ Add Question
        </button>

        <button
          onClick={() => deleteQuestion(questionData.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          {isQuestion ? "🗑️ Delete Question" : "🗑️ Delete Section"}
        </button>

        {isQuestion && (
          <>
            <button
              onClick={() => duplicateQuestion(questionData.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
            >
              🔁 Duplicate Question
            </button>

            <button
              onClick={() => addSection(questionData.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              ➕ Add Section
            </button>
          </>
        )}
      </div>
    </div>
  );
}
