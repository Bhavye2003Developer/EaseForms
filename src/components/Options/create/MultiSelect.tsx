import { choice, Scene } from "@/utils/types";
import MultiOptionInput from "./MultiOptionInput";
import MultiOptionView from "./MultiOptionView";

export default function MultiSelect(props: {
  questionId: number;
  scene: Scene;
  data: choice[];
}) {
  return (
    <div className="w-full">
      {props.scene === Scene.Editor ? (
        <MultiOptionInput {...props} isMultiSelect={true} />
      ) : (
        <MultiOptionView {...props} isMultiSelect={true} />
      )}
    </div>
  );
}
