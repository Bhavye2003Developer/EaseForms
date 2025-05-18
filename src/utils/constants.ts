import { QuestionsUIMode } from "../../generated/prisma";
import { FormType } from "./types";

export const form: FormType = {
  settings: {
    isTimerEnabled: false,
    timer: "00:00:00",
    UIMode: QuestionsUIMode.Simple,
  },
  formData: {
    formHeader: {
      title: "",
    },
    questions: [],
  },
};
