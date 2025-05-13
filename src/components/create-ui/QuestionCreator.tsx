"use client";

import { AnsOption, AnsType, QuestionType, Scene } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";
import { useEffect, useState } from "react";
import AnswerBox from "./AnswerBox";

export default function QuestionCreator({
  questionData,
  index,
}: {
  questionData: QuestionType;
  index: number;
}) {
  const [question, setQuestion] = useState(questionData);

  const {
    createNewQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    addSection,
  } = useFormStore((state) => state);

  useEffect(() => {
    updateQuestion(question.id, question);
  }, [question]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-2xl w-full mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {index + 1}. <span className="text-gray-500">New Question</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          autoFocus
          type="text"
          value={question.title}
          placeholder="Type your question here..."
          onChange={(e) => {
            setQuestion({
              ...question,
              title: e.target.value,
            });
          }}
          className="flex-1 p-3 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={question.ans.type}
          onChange={(e) => {
            const ansType = AnsType[e.target.value as keyof typeof AnsType];
            console.log("Selected: ", ansType);
            setQuestion({
              ...question,
              ans: {
                ...question.ans,
                type: ansType,
                data: AnsOption[ansType],
              },
            });
          }}
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
        option={question.ans.type}
        scene={Scene.Editor}
        questionId={question.id}
        data={question.ans.data}
      />

      {/* <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
        <button
          onClick={() => createNewQuestion(question.id)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
        >
          ➕ Add Question
        </button>

        <button
          onClick={() => deleteQuestion(question.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          🗑️ Delete Question
        </button>

        <button
          onClick={() => duplicateQuestion(question.id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
        >
          🔁 Duplicate Question
        </button>

        <button
          onClick={() => addSection(questionData.id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
        >
          Add Section
        </button>
      </div> */}
    </div>
  );
}
