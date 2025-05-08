"use client";

import useFormStore from "@/utils/useFormStore";
import { useEffect, useRef, useState } from "react";

export default function FormHeader() {
  const createNewQuestion = useFormStore((state) => state.createNewQuestion);
  const setFormHeaderState = useFormStore((state) => state.updateFormHeader);
  const [title, setTitle] = useState(
    useFormStore((state) => state.form.formData.formHeader.title)
  );
  const wrapperRef = useRef(null);

  useEffect(() => {
    setFormHeaderState({
      title: title,
    });
  }, [title]);

  return (
    <div
      className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white max-w-screen mx-auto"
      ref={wrapperRef}
    >
      <h1 className="text-lg font-semibold text-gray-800 mb-2">Form Header</h1>

      {
        <input
          autoFocus
          type="text"
          value={title}
          placeholder="Type your form heading here..."
          className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          onChange={(e) => setTitle(e.target.value)}
        />
      }

      {
        <div className="flex">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
            onClick={() => {
              console.log("creating new question...");
              createNewQuestion(0);
            }}
          >
            ➕ Add New Question
          </button>
        </div>
      }
    </div>
  );
}
