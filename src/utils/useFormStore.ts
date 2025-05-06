import { create } from "zustand";
import {
  AnsOption,
  AnsType,
  AnswerDataType,
  FormHeaderType,
  FormType,
  QuestionType,
  VersionType,
} from "./types";
interface FormState {
  settings: {
    timer: string;
  };
  form: FormType;
  currentVersionId: number;
  currentQuestionId: number;
  versions: VersionType[];
  createNewQuestion: (prevQuestionId: number) => void;
  deleteQuestion: (currentQuestionId: number) => void;
  updateQuestion: (questionId: number, title: string) => void;
  // duplicateQuestion: (questionId: number) => void;
  updatedQuestionArray: (questionsArray: QuestionType[]) => void;
  updateFormHeader: (formHeaderState: FormHeaderType) => void;
  updateAnswerType: (questionId: number, type: AnsType) => void;
  updateAnswerData: (questionId: number, updatedData: AnswerDataType) => void;
  updateTimer: (updatedTimer: string) => void;
}

const useFormStore = create<FormState>()((set, get) => ({
  settings: {
    timer: "00:00:00",
  },
  form: {
    formHeader: {
      title: "",
    },
    questions: [],
  },
  currentQuestionId: 1,
  currentVersionId: 1,
  versions: [],
  createNewQuestion: (prevQuestionId: number) => {
    const [updatedQuestions, currentQuestionId] = [
      [...get().form.questions],
      get().currentQuestionId,
    ];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === prevQuestionId
    );
    updatedQuestions.splice(questionIndex + 1, 0, {
      id: currentQuestionId,
      title: "",
      ans: {
        type: AnsType.ShortText,
        data: AnsOption.ShortText,
      },
    });
    set((state) => ({
      form: { ...state.form, questions: updatedQuestions },
      currentQuestionId: state.currentQuestionId + 1,
    }));
  },

  deleteQuestion: (currentQuestionId: number) => {
    const updatedQuestions = [...get().form.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === currentQuestionId
    );
    updatedQuestions.splice(questionIndex, 1);
    set((state) => ({
      form: { ...state.form, questions: updatedQuestions },
    }));
  },
  updatedQuestionArray: (questionsArray: QuestionType[]) => {
    set((state) => ({
      form: { ...state.form, questions: questionsArray },
    }));
  },
  // duplicateQuestion: (questionId: number) => {
  //   const updatedQuestions = [...get().form.questions];

  //   const questionIndex = updatedQuestions.findIndex(
  //     (question) => question.id === questionId
  //   );

  //   const duplicatedQuestion = { ...updatedQuestions[questionIndex] };
  //   duplicatedQuestion.id = get().currentQuestionId;

  //   updatedQuestions.splice(questionIndex, 0, duplicatedQuestion);
  //   set((state) => ({
  //     form: { ...state.form, questions: updatedQuestions },
  //     currentQuestionId: state.currentQuestionId + 1,
  //   }));
  // }
  updateQuestion: (questionId: number, title: string) => {
    const updatedQuestions = [...get().form.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );
    const question = updatedQuestions[questionIndex];
    question.title = title;
    updatedQuestions[questionIndex] = question;
    set((state) => ({
      form: { ...state.form, questions: updatedQuestions },
    }));
  },
  updateFormHeader: (formHeaderState: FormHeaderType) => {
    set((state) => ({
      form: { ...state.form, formHeader: formHeaderState },
    }));
  },
  updateAnswerType: (questionId: number, type: AnsType) => {
    const updatedQuestions = [...get().form.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );
    const question = updatedQuestions[questionIndex];
    question.ans.type = type;
    question.ans.data = AnsOption[type];
    updatedQuestions[questionIndex] = question;
    set((state) => ({
      form: { ...state.form, questions: updatedQuestions },
    }));
  },
  updateAnswerData: (questionId: number, updatedData: AnswerDataType) => {
    const updatedQuestions = [...get().form.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );
    const question = updatedQuestions[questionIndex];
    question.ans.data = updatedData;
    updatedQuestions[questionIndex] = question;
    set((state) => ({
      form: { ...state.form, questions: updatedQuestions },
    }));
  },
  updateTimer: (updatedTimer: string) => {
    set((state) => ({
      ...state,
      settings: {
        ...state.settings,
        timer: updatedTimer,
      },
    }));
  },
}));

export default useFormStore;
