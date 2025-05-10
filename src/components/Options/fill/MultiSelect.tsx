import { choice } from "@/utils/types";
import MultiOption from "./MultiOption";

export default function MultiSelect(props: {
  questionId: number;
  data: choice[];
}) {
  return <MultiOption {...props} isMultiSelect={true} />;
}
