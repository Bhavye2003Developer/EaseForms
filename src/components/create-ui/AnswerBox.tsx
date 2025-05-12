import { AnsType, AnswerDataType, Scene } from "@/utils/types";
import MultiChoice from "../Options/create/MultiChoice";
import MultiSelect from "../Options/create/MultiSelect";
import ShortText from "../Options/create/ShortText";
import LongText from "../Options/create/LongText";

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
      ) : option === AnsType.multiChoice && Array.isArray(data) ? (
        <MultiChoice questionId={questionId} scene={scene} data={data} />
      ) : option === AnsType.multiSelect && Array.isArray(data) ? (
        <MultiSelect questionId={questionId} scene={scene} data={data} />
      ) : null}
    </div>
  );
};

export default AnswerBox;
