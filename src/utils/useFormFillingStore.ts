import { create } from "zustand";
import { AnswerDataType, FormType } from "./types";

interface FormFillingState {
  form: FormType | null;
  isFormSubmitted: boolean;
  setForm: (form: FormType) => void;
  updateAnswer: (
    questionId: number,
    answer: AnswerDataType,
    isAnswerFilled: boolean
  ) => void;
  setFormSubmitted: () => void;
}

const useFormFillingStore = create<FormFillingState>((set, get) => ({
  form: null,
  isFormSubmitted: false,
  setForm(form) {
    set((state) => ({ ...state, form }));
  },
  updateAnswer(
    questionId: number,
    answer: AnswerDataType,
    isAnswerFilled: boolean
  ) {
    const form = get().form;
    if (form) {
      console.log("Answer changed inside updateAnswer: ", answer);
      const questions = form.formData.questions;
      const questionIndex = questions?.findIndex(
        (question) => question.id === questionId
      );
      const question = questions[questionIndex];
      if ("ans" in question) {
        question.ans.data = answer;
        question.ans.isAnswerFilled = isAnswerFilled;
        questions[questionIndex] = question;
        set((state) => ({
          form: {
            ...state.form!,
            formData: {
              ...state.form!.formData,
              questions: questions,
            },
          },
        }));
      }
    }
  },
  setFormSubmitted: () => {
    set((state) => ({ ...state, isFormSubmitted: true }));
  },
}));

export default useFormFillingStore;
