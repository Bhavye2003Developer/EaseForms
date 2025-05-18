import { AnswerDataType, Scene } from "@/utils/types";

import { AnsType } from "../../../generated/prisma";
import MultiChoice from "./create/MultiChoice";
import MultiSelect from "./create/MultiSelect";
import ShortText from "./create/ShortText";
import LongText from "./create/LongText";

const AnswerBox = ({
  questionId,
  option,
  scene,
  data,
}: {
  questionId: number;
  option: AnsType;
  scene: Scene;
  data: AnswerDataType;
}) => {
  // console.log("From Answerbox: ", data, isInteractive);

  return (
    <div>
      {option === AnsType.ShortText ? (
        <ShortText questionId={questionId} scene={scene} answerData={data} />
      ) : option === AnsType.LongText ? (
        <LongText questionId={questionId} scene={scene} answerData={data} />
      ) : option === AnsType.MultiChoice && Array.isArray(data) ? (
        <MultiChoice questionId={questionId} scene={scene} data={data} />
      ) : option === AnsType.MultiSelect && Array.isArray(data) ? (
        <MultiSelect questionId={questionId} scene={scene} data={data} />
      ) : null}
    </div>
  );
};

export default AnswerBox;
