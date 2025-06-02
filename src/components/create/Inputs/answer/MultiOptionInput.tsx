"use client";

import { AnswerDataType, choice } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function MultiOptionInput({
  questionId,
  data,
  isMultiSelect,
}: {
  questionId: number;
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

  const handleDescChange = (id: number, value: string) => {
    const updatedOptions = data.map((option) =>
      option.id === id ? { ...option, desc: value } : option
    );
    updateAnswerData(questionId, updatedOptions);
  };

  return (
    <div className="p-2 space-y-3">
      {data.map((option) => (
        <div key={option.id} className="flex items-center space-x-3">
          {isMultiSelect ? (
            <Checkbox disabled checked={option.isMarked} />
          ) : (
            <RadioGroup
              disabled
              value={option.isMarked ? String(option.id) : undefined}
            >
              <RadioGroupItem value={String(option.id)} disabled />
            </RadioGroup>
          )}

          <Input
            autoFocus
            type="text"
            placeholder="Option description"
            value={option.desc}
            onChange={(e) => handleDescChange(option.id, e.target.value)}
            className="flex-1 rounded-md"
          />
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={handleAddOption}
      >
        Add Option
      </Button>
    </div>
  );
}
