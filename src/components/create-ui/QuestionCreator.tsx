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

  const createNewQuestion = useFormStore((state) => state.createNewQuestion);
  const updateQuestion = useFormStore((state) => state.updateQuestion);
  const deleteQuestion = useFormStore((state) => state.deleteQuestion);
  const [title, setTitle] = useState(questionData.title);
  const updateAnswerType = useFormStore((state) => state.updateAnswerType);
  const wrapperRef = useRef(null);

  useEffect(() => {
    updateQuestion(questionData.id, title);
  }, [title]);

  useEffect(() => {
    updateAnswerType(questionData.id, option);
  }, [option]);

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white mx-auto mt-4 max-w-screen">
      <h1 className="text-lg font-semibold text-gray-800 mb-2">
        {index + 1} <span className="text-gray-500">→</span> New Question
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          autoFocus
          type="text"
          value={title}
          placeholder="Type your question here..."
          className="flex-[0.85] p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          onChange={(e) => {
            setOption(AnsType[e.target.value as keyof typeof AnsType]);
          }}
          className="flex-[0.15] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Object.keys(AnsType).map((option, index) => (
            <option key={index} value={option}>
              {option}
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

      <div className="flex">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
          onClick={() => {
            console.log("creating new question...");
            createNewQuestion(questionData.id);
          }}
        >
          ➕ Add New Question
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all ml-2"
          onClick={() => {
            console.log("Deleting question");
            deleteQuestion(questionData.id);
          }}
        >
          Delete question
        </button>
      </div>
    </div>
  );
}
