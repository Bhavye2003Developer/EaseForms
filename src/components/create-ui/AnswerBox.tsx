import { AnswerDataType, Scene } from "@/utils/types";
import { AnsType } from "../../../generated/prisma";

import MultiChoice from "./create/MultiChoice";
import MultiSelect from "./create/MultiSelect";
import ShortText from "./create/ShortText";
import LongText from "./create/LongText";

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
    return <MultiChoice questionId={questionId} scene={scene} data={data} />;
  }

  if (option === AnsType.MultiSelect && Array.isArray(data)) {
    return <MultiSelect questionId={questionId} scene={scene} data={data} />;
  }

  return null;
}
