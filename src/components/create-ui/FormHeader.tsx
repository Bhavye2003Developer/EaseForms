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
      className="p-6 rounded-lg shadow-xl max-w-screen mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      ref={wrapperRef}
    >
      <h1 className="text-2xl font-semibold text-white mb-4">Form Header</h1>

      <input
        autoFocus
        type="text"
        value={title}
        placeholder="Type your form heading here..."
        className="w-full p-3 border-2 border-transparent rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6 shadow-md"
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-all ease-in-out"
          onClick={() => {
            console.log("creating new question...");
            createNewQuestion(0);
          }}
        >
          ➕ Add New Question
        </button>
      </div>
    </div>
  );
}
