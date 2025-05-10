"use client";

import { choice } from "@/utils/types";

export default function MultiOption({
  data,
  isMultiSelect,
}: {
  data: choice[];
  isMultiSelect: boolean;
}) {
  return (
    <div className="p-4 space-y-4">
      {data.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input type={isMultiSelect ? "checkbox" : "radio"} />

          <p>{option.desc}</p>
        </div>
      ))}
    </div>
  );
}
