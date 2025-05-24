import { QuestionsUIMode } from "../../generated/prisma";
import { FormType } from "./types";

export const form: FormType = {
  settings: {
    isTimerEnabled: false,
    timer: "00:00:00",
    UIMode: QuestionsUIMode.Simple,
    hasDeadline: false,
    deadline: "2026-22-05T18:30",
  },
  formData: {
    formHeader: {
      title: "",
    },
    questions: [],
  },
};

export const ROUTES = ["/", "/create/:formId", "/form/:formId"];
