import {
  AnsType as AnsTypePrisma,
  QuestionsUIMode,
} from "../../generated/prisma";

// export enum AnsType {
//   "ShortText" = "ShortText",
//   "LongText" = "LongText",
//   "multiChoice" = "multiChoice",
//   "multiSelect" = "multiSelect",
// }

export interface choice {
  id: number;
  desc: string;
  isMarked: boolean;
}

export type SectionType = {
  id: number;
};

export type AnswerDataType = string | choice[] | number;

export const AnsOption: { [key in AnsTypePrisma]: AnswerDataType } = {
  ShortText: "",
  LongText: "",
  MultiChoice: [{ id: Date.now(), desc: "", isMarked: false }],
  MultiSelect: [{ id: Date.now(), desc: "", isMarked: false }],
};

export interface QuestionType {
  id: number;
  title: string;
  ans: {
    type: AnsTypePrisma;
    data: AnswerDataType;
    isAnswerFilled: boolean;
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

// export enum QuestionsUIMode {
//   "Simple" = "Simple",
//   "Single" = "Single",
// }

export type DivStructType = (QuestionType | SectionType)[];

export interface FormType {
  settings: {
    isTimerEnabled: boolean;
    timer: string;
    UIMode: QuestionsUIMode;
  };
  formData: {
    formHeader: FormHeaderType;
    questions: DivStructType;
  };
}

export enum Scene {
  Editor,
  Preview,
  Live,
}

export type FormattedAnswerType = string | number | any[];

export type Answer = {
  questionId: number;
  type: AnsTypePrisma;
  data: FormattedAnswerType;
};
