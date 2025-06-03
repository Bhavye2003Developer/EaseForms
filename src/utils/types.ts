import { NextResponse } from "next/server";
import {
  AnsType as AnsTypePrisma,
  QuestionsUIMode,
} from "../../generated/prisma";

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
}

export type DivStructType = (QuestionType | SectionType)[];

export interface FormType {
  settings: {
    isTimerEnabled: boolean;
    timer: string;
    UIMode: QuestionsUIMode;
    hasDeadline: boolean;
    deadline: string;
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
  questionId: string;
  question: string;
  type: AnsTypePrisma;
  data: string;
};

export type FetchedResponse = {
  msg: string;
  error: string | number | null;
  data: any;
};

export type Response = Promise<NextResponse<FetchedResponse>>;

export type User = {
  email: string;
  password: string;
};

export type UserData = {
  userId: string;
  email: string;
};

export type FormsMetaData = {
  id: string;
  publishedDate: Date;
  FormStruct: { formData: { formHeader: { title: string } } };
}[];
