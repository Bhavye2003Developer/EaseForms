import { choice, Scene } from "@/utils/types";
import MultiOptionInput from "./MultiOptionInput";
import MultiOptionView from "./MultiOptionView";

export default function MultiOptional(props: {
  questionId: number;
  scene: Scene;
  data: choice[];
  isMultiSelect: boolean;
}) {
  return (
    <div className="w-full space-y-2">
      {props.scene === Scene.Editor ? (
        <MultiOptionInput {...props} isMultiSelect={props.isMultiSelect} />
      ) : (
        <MultiOptionView {...props} isMultiSelect={props.isMultiSelect} />
      )}
    </div>
  );
}
