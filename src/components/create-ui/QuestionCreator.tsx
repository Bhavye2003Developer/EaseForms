"use client";

import { AnsType, QuestionType } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";
import { useEffect, useRef, useState } from "react";
import AnswerBox from "./AnswerBox";

export default function QuestionCreator({
  questionData,
  index,
}: {
  questionData: QuestionType;
  index: number;
}) {
  const [option, setOption] = useState<AnsType>(AnsType.ShortText);
  const [title, setTitle] = useState(questionData.title);

  const createNewQuestion = useFormStore((state) => state.createNewQuestion);
  const updateQuestion = useFormStore((state) => state.updateQuestion);
  const deleteQuestion = useFormStore((state) => state.deleteQuestion);
  const updateAnswerType = useFormStore((state) => state.updateAnswerType);

  const wrapperRef = useRef(null);

  useEffect(() => {
    updateQuestion(questionData.id, title);
  }, [title]);

  useEffect(() => {
    updateAnswerType(questionData.id, option);
  }, [option]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-2xl w-full mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {index + 1}. <span className="text-gray-500">New Question</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          autoFocus
          type="text"
          value={title}
          placeholder="Type your question here..."
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={option}
          onChange={(e) =>
            setOption(AnsType[e.target.value as keyof typeof AnsType])
          }
          className="w-full sm:w-48 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Object.keys(AnsType).map((opt, idx) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <AnswerBox
        option={option}
        isInteractive={false}
        questionId={questionData.id}
        data={questionData.ans.data}
      />

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button
          onClick={() => createNewQuestion(questionData.id)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
          ➕ Add Question
        </button>

        <button
          onClick={() => deleteQuestion(questionData.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          🗑️ Delete Question
        </button>
      </div>
    </div>
  );
}
