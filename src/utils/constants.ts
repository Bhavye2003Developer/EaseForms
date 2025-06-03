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

export const ROUTES = ["/", "/create/:formId", "/form/:formId", "/dashboard"];

export const features = [
  {
    title: "Create Forms Easily",
    description: "Build forms quickly with an intuitive UI.",
  },
  {
    title: "Answer Types",
    description: "Supports short/long text, multi-select, and MCQs.",
  },
  {
    title: "Timed Forms",
    description: "Set response timers for better control.",
  },
  { title: "Drag & Drop", description: "Reorder questions effortlessly." },
  {
    title: "Live Preview",
    description: "Instant feedback while editing your form.",
  },
];
