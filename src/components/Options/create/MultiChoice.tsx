import { choice } from "@/utils/types";
import MultiOption from "./MultiOption";

export default function MultiChoice(props: {
  questionId: number;
  isInteractive: boolean;
  data: choice[];
}) {
  return <MultiOption {...props} isMultiSelect={false} />;
}
