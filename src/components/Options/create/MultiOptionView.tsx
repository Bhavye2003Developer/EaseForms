import { choice, Scene } from "@/utils/types";

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
  return (
    <div>
      {data.map((option) => (
        <div>
          {scene === Scene.Preview ? (
            <input type={isMultiSelect ? "checkbox" : "radio"} />
          ) : (
            <input type={isMultiSelect ? "checkbox" : "radio"} />
          )}
          <span>{option.desc}</span>
        </div>
      ))}
    </div>
  );
}
