import { AnsType, AnswerDataType } from "@/utils/types";
import TextAnswer from "./Options/TextAnswer";
import MultiChoice from "./Options/MultiChoice";
import MultiSelect from "./Options/MultiSelect";

const AnswerBox = ({
  questionId,
  option,
  isInteractive,
  data,
}: {
  questionId: number;
  option: AnsType;
  isInteractive: boolean;
  data: AnswerDataType;
}) => {
  console.log("From Answerbox: ", data, isInteractive);

  return (
    <div>
      {option.includes("Text") ? (
        <TextAnswer
          isShort={option === AnsType.ShortText ? true : false}
          isInteractive={isInteractive}
        />
      ) : option === AnsType.multiChoice && Array.isArray(data) ? (
        <MultiChoice
          questionId={questionId}
          isInteractive={isInteractive}
          data={data}
        />
      ) : option === AnsType.multiSelect && Array.isArray(data) ? (
        <MultiSelect
          questionId={questionId}
          isInteractive={isInteractive}
          data={data}
        />
      ) : null}
    </div>
  );
};

export default AnswerBox;
