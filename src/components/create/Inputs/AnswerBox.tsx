import { AnswerDataType, Scene } from "@/utils/types";
import { AnsType } from "../../../../generated/prisma";
import ShortText from "./answer/ShortText";
import LongText from "./answer/LongText";
import MultiOptional from "./answer/MultiOptional";

export default function AnswerBox({
  questionId,
  option,
  scene,
  data,
}: {
  questionId: number;
  option: AnsType;
  scene: Scene;
  data: AnswerDataType;
}) {
  if (option === AnsType.ShortText) {
    return (
      <ShortText questionId={questionId} scene={scene} answerData={data} />
    );
  }

  if (option === AnsType.LongText) {
    return <LongText questionId={questionId} scene={scene} answerData={data} />;
  }

  if (option === AnsType.MultiChoice && Array.isArray(data)) {
    return (
      <MultiOptional
        questionId={questionId}
        scene={scene}
        data={data}
        isMultiSelect={false}
      />
    );
  }

  if (option === AnsType.MultiSelect && Array.isArray(data)) {
    return (
      <MultiOptional
        questionId={questionId}
        scene={scene}
        data={data}
        isMultiSelect={true}
      />
    );
  }

  return null;
}
