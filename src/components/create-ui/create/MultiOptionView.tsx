"use client";

import { cn } from "@/utils/helpers";
import { choice, Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";

export default function MultiOptionView({
  questionId,
  data,
  isMultiSelect,
  scene,
}: {
  isMultiSelect: boolean;
  questionId: number;
  data: choice[];
  scene: Scene;
}) {
  const { updateAnswer } = useFormFillingStore();

  // dropdown, multiple select from dropdown.

  const inputType = isMultiSelect ? "checkbox" : "radio";

  return (
    <div className="space-y-2 mt-2">
      {data.map((option, index) => {
        const inputId = `q-${questionId}-option-${index}`;
        const isChecked = option.isMarked;

        return (
          <div key={index} className="flex items-center gap-3">
            <input
              id={inputId}
              type={inputType}
              name={`question-${questionId}`}
              checked={scene !== Scene.Preview ? isChecked : undefined}
              disabled={scene === Scene.Preview}
              onChange={(e) => {
                if (scene === Scene.Preview) return;

                let updated = [...data];

                if (!isMultiSelect) {
                  updated = updated.map((opt) => ({
                    ...opt,
                    isMarked: false,
                  }));
                }

                updated[index].isMarked = e.target.checked;
                updateAnswer(questionId, updated);
              }}
              className="w-4 h-4 accent-blue-600"
            />
            <label
              htmlFor={inputId}
              className={cn(
                "text-gray-800 cursor-pointer transition",
                scene === Scene.Preview && "cursor-default"
              )}
            >
              {option.desc}
            </label>
          </div>
        );
      })}
    </div>
  );
}
