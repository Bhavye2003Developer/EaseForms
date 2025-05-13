import { AnswerDataType, choice, Scene } from "@/utils/types";
import MultiOptionInput from "./MultiOptionInput";
import MultiOptionView from "./MultiOptionView";

export default function MultiChoice(props: {
  questionId: number;
  scene: Scene;
  data: choice[];
}) {
  return (
    <div className="w-full">
      {props.scene === Scene.Editor ? (
        <MultiOptionInput {...props} isMultiSelect={false} />
      ) : (
        <MultiOptionView {...props} isMultiSelect={false} />
      )}
    </div>
  );
}
