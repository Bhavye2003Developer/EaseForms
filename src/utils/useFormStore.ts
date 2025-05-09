import { create } from "zustand";
import {
  AnsOption,
  AnsType,
  AnswerDataType,
  FormHeaderType,
  FormType,
  QuestionsUIMode,
  QuestionType,
  VersionType,
} from "./types";
interface FormState {
  form: FormType;
  questionIdToBeImplemented: number;
  versions: VersionType[];
  createNewQuestion: (prevQuestionId: number) => void;
  deleteQuestion: (questionIdToBeImplemented: number) => void;
  updateQuestion: (questionId: number, updatedQuestion: QuestionType) => void;
  duplicateQuestion: (questionId: number) => void;
  updatedQuestionArray: (questionsArray: QuestionType[]) => void;
  updateFormHeader: (formHeaderState: FormHeaderType) => void;
  updateAnswerData: (questionId: number, updatedData: AnswerDataType) => void;
  updateTimer: (updatedTimer: string) => void;
  updateUIMode: (selectedUIMode: QuestionsUIMode) => void;
  toggleTimerEnabled: () => void;
}

const useFormStore = create<FormState>()((set, get) => ({
  form: {
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
  },
  questionIdToBeImplemented: 1,
  versions: [],
  createNewQuestion: (prevQuestionId: number) => {
    const [updatedQuestions, questionIdToBeImplemented] = [
      [...get().form.formData.questions],
      get().questionIdToBeImplemented,
    ];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === prevQuestionId
    );
    updatedQuestions.splice(questionIndex + 1, 0, {
      id: questionIdToBeImplemented,
      title: "",
      ans: {
        type: AnsType.ShortText,
        data: AnsOption.ShortText,
      },
    });
    set((state) => ({
      ...state,
      questionIdToBeImplemented: state.questionIdToBeImplemented + 1,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          questions: updatedQuestions,
        },
      },
    }));
  },

  deleteQuestion: (questionIdToBeImplemented: number) => {
    const updatedQuestions = [...get().form.formData.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionIdToBeImplemented
    );
    updatedQuestions.splice(questionIndex, 1);
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          questions: updatedQuestions,
        },
      },
    }));
  },
  updatedQuestionArray: (questionsArray: QuestionType[]) => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          questions: questionsArray,
        },
      },
    }));
  },
  duplicateQuestion: (questionId: number) => {
    const updatedQuestions = [...get().form.formData.questions];

    console.log("before updating deletion: ", updatedQuestions);

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );

    const duplicatedQuestion = { ...updatedQuestions[questionIndex] };
    console.log("Question to be duplicated: ", duplicatedQuestion);
    duplicatedQuestion.id = get().questionIdToBeImplemented * 1e4;

    updatedQuestions.splice(questionIndex + 1, 0, duplicatedQuestion);
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          questions: updatedQuestions,
        },
      },
      questionIdToBeImplemented: state.questionIdToBeImplemented + 1,
    }));
  },
  updateQuestion: (questionId: number, updatedQuestion: QuestionType) => {
    const updatedQuestions = [...get().form.formData.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );
    updatedQuestions[questionIndex] = updatedQuestion;
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          questions: updatedQuestions,
        },
      },
    }));
  },
  updateFormHeader: (formHeaderState: FormHeaderType) => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          formHeader: formHeaderState,
        },
      },
    }));
  },
  updateAnswerData: (questionId: number, updatedData: AnswerDataType) => {
    const updatedQuestions = [...get().form.formData.questions];

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );
    const question = updatedQuestions[questionIndex];
    question.ans.data = updatedData;
    updatedQuestions[questionIndex] = question;
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        formData: {
          ...state.form.formData,
          questions: updatedQuestions,
        },
      },
    }));
  },
  updateTimer: (updatedTimer: string) => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        settings: {
          ...state.form.settings,
          timer: updatedTimer,
        },
      },
    }));
  },
  updateUIMode: (selectedUIMode: QuestionsUIMode) => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        settings: {
          ...state.form.settings,
          UIMode: selectedUIMode,
        },
      },
    }));
  },
  toggleTimerEnabled: () => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        settings: {
          ...state.form.settings,
          isTimerEnabled: !state.form.settings.isTimerEnabled,
        },
      },
    }));
  },
}));

export default useFormStore;
