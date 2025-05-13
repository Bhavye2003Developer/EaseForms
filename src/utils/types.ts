export enum AnsType {
  "ShortText" = "ShortText",
  "LongText" = "LongText",
  "multiChoice" = "multiChoice",
  "multiSelect" = "multiSelect",
}

export interface choice {
  id: number;
  desc: string;
  isMarked: boolean;
}

export type SectionType = {
  id: number;
};

export type AnswerDataType = string | choice[] | number;

export const AnsOption: { [key in AnsType]: AnswerDataType } = {
  ShortText: "",
  LongText: "",
  multiChoice: [{ id: Date.now(), desc: "", isMarked: false }],
  multiSelect: [{ id: Date.now(), desc: "", isMarked: false }],
};

export interface QuestionType {
  id: number;
  title: string;
  ans: {
    type: AnsType;
    data: AnswerDataType;
  };
}

export interface multiChoice {
  choices: {
    id: number;
    desc: string;
    isMarked: boolean;
  }[];
}

export interface FormHeaderType {
  title: string;
  // desc: string;
}

export enum QuestionsUIMode {
  "Simple" = "Simple",
  "Single" = "Single",
}

export type DivStructType = (QuestionType | SectionType)[];

export interface FormType {
  formData: {
    formHeader: FormHeaderType;
    questions: DivStructType;
  };
  settings: {
    isTimerEnabled: boolean;
    timer: string;
    UIMode: QuestionsUIMode;
  };
}

export enum Scene {
  Editor,
  Preview,
  Live,
}
