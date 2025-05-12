export enum AnsType {
  "ShortText" = "ShortText",
  "LongText" = "LongText",
  "multiChoice" = "multiChoice",
  "multiSelect" = "multiSelect",
}

export type choice = {
  id: number;
  desc: string;
  isMarked: boolean;
};

export type AnswerDataType = string | choice[] | number;

export const AnsOption: { [key in AnsType]: AnswerDataType } = {
  ShortText: "",
  LongText: "",
  multiChoice: [{ id: Date.now(), desc: "", isMarked: false }],
  multiSelect: [{ id: Date.now(), desc: "", isMarked: false }],
};

export type QuestionType = {
  id: number;
  title: string;
  ans: {
    type: AnsType;
    data: AnswerDataType;
  };
};

export type multiChoice = {
  choices: {
    id: number;
    desc: string;
    isMarked: boolean;
  }[];
};

export type FormHeaderType = {
  title: string;
  // desc: string;
};

export enum QuestionsUIMode {
  "Simple" = "Simple",
  "Single" = "Single",
}

export type FormType = {
  formData: {
    formHeader: FormHeaderType;
    questions: QuestionType[];
  };
  settings: {
    isTimerEnabled: boolean;
    timer: string;
    UIMode: QuestionsUIMode;
  };
};

export enum Scene {
  Editor,
  Preview,
  Live,
}
