import { create } from "zustand";
import {
  AnsOption,
  AnswerDataType,
  DivStructType,
  FormHeaderType,
  FormType,
  QuestionType,
  SectionType,
} from "./types";
import { AnsType, QuestionsUIMode } from "../../generated/prisma";
import { form } from "./constants";
interface FormState {
  form: FormType;
  questionIdToBeImplemented: number;
  setForm: (fetchedForm: FormType) => void;
  createNewQuestion: (prevQuestionId: number) => void;
  deleteQuestion: (questionIdToBeImplemented: number) => void;
  updateQuestion: (questionId: number, updatedQuestion: QuestionType) => void;
  duplicateQuestion: (questionId: number) => void;
  updatedQuestionArray: (questionsArray: DivStructType) => void;
  updateFormHeader: (formHeaderState: FormHeaderType) => void;
  updateAnswerData: (questionId: number, updatedData: AnswerDataType) => void;
  updateTimer: (updatedTimer: string) => void;
  updateUIMode: (selectedUIMode: QuestionsUIMode) => void;
  toggleTimerEnabled: () => void;
  addSection: (questionId: number) => void;
  toggleDeadlineEnabled: () => void;
  updateDeadline: (deadlineString: string) => void;
}

const useFormStore = create<FormState>()((set, get) => ({
  form: form,
  questionIdToBeImplemented: 1,
  setForm: (fetchedForm: FormType) => {
    let maxQuestionId = 1;
    if (fetchedForm.formData.questions.length > 0)
      maxQuestionId =
        Math.max(...fetchedForm.formData.questions.map((q) => q.id)) + 1;
    console.log("new questionToBeImplenetdId: ", maxQuestionId);
    set(() => ({
      questionIdToBeImplemented: maxQuestionId,
      form: fetchedForm,
    }));
  },
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
        isAnswerFilled: false,
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
  updatedQuestionArray: (questionsArray: DivStructType) => {
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
    if ("ans" in question) {
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
    }
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
  addSection: (questionId: number) => {
    const updatedQuestions = [...get().form.formData.questions];

    console.log("before updating deletion: ", updatedQuestions);

    const questionIndex = updatedQuestions.findIndex(
      (question) => question.id === questionId
    );

    const section: SectionType = { id: get().questionIdToBeImplemented };

    updatedQuestions.splice(questionIndex + 1, 0, section);
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
  toggleDeadlineEnabled: () => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        settings: {
          ...state.form.settings,
          hasDeadline: !state.form.settings.hasDeadline,
        },
      },
    }));
  },
  updateDeadline: (deadlineString: string) => {
    set((state) => ({
      ...state,
      form: {
        ...state.form,
        settings: {
          ...state.form.settings,
          deadline: deadlineString,
        },
      },
    }));
  },
}));

export default useFormStore;
