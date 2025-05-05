"use client";

import { AnswerDataType, choice } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";

export default function MultiOption({
  questionId,
  isInteractive,
  data,
  isMultiSelect,
}: {
  questionId: number;
  isInteractive: boolean;
  data: choice[];
  isMultiSelect: boolean;
}) {
  const updateAnswerData = useFormStore((state) => state.updateAnswerData);

  const handleAddOption = () => {
    const updatedData: AnswerDataType = [
      ...data,
      { id: Date.now(), desc: "", isMarked: false },
    ];
    updateAnswerData(questionId, updatedData);
  };

  const handleDescChange = (id: number | null, value: string) => {
    const updatedOptions = data.map((option) =>
      option.id === id ? { ...option, desc: value } : option
    );
    updateAnswerData(questionId, updatedOptions);
  };

  return (
    <div className="p-4 space-y-4">
      {data.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input
            disabled={!isInteractive}
            type={isMultiSelect ? "checkbox" : "radio"}
          />

          {isInteractive ? (
            <p>{option.desc}</p>
          ) : (
            <input
              autoFocus
              type="text"
              placeholder="Option description"
              value={option.desc}
              onChange={(e) => handleDescChange(option.id, e.target.value)}
              className="border rounded p-2 flex-1"
            />
          )}
        </div>
      ))}
      {!isInteractive ? (
        <button
          onClick={handleAddOption}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Option
        </button>
      ) : null}
    </div>
  );
}
