import { choice } from "@/utils/types";
import MultiOption from "./MultiOption";

export default function MultiSelect(props: {
  questionId: number;
  isInteractive: boolean;
  data: choice[];
}) {
  return <MultiOption {...props} isMultiSelect={true} />;
}
