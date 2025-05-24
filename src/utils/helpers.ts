import { useAuth } from "@clerk/nextjs";
import {
  Answer,
  AnswerDataType,
  FetchedResponse,
  FormattedAnswerType,
  FormType,
  UserData,
} from "./types";
import { ROUTES } from "./constants";
import { match } from "path-to-regexp";

export const getFormattedTime = (dt: Date): string => {
  return `${dt.getHours()}:${dt.getMinutes()} ${
    dt.getHours() >= 12 ? "PM" : "AM"
  }`;
};

export const cn = (
  ...classes: (string | false | null | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const getEmailLogoText = (email: string): string => {
  const splits = email.split("@")[0].split(".");
  const emailLogo =
    "" +
    splits
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  return emailLogo;
};

export const getTimeInSeconds = (hhmmss: string): number => {
  if (hhmmss === "") return 0;
  const [hh, mm, ss] = hhmmss.split(":");
  const totalSeconds = +hh * 60 + +mm * 60 + +ss;
  return totalSeconds;
};

const formatTimeSec = (xx: number): string => {
  const tt = "" + Math.floor(xx);
  return tt.length > 1 ? tt : "0" + tt;
};

export const getTimeInHHMMSS = (seconds: number): string => {
  if (seconds === 0) return "00:00:00";
  const hh = formatTimeSec(seconds / 3600);
  const mmss = seconds % 3600;
  const mm = formatTimeSec(mmss / 60);
  const ss = formatTimeSec(mmss % 60);
  return `${hh}:${mm}:${ss}`;
};

export const getFormattedHHMMSS = (hhmmss: string): string => {
  const [hh, mm, ss] = hhmmss.split(":").map(Number);
  const parts = [];
  if (hh > 0) parts.push(`${hh} hour${hh > 1 ? "s" : ""}`);
  if (mm > 0) parts.push(`${mm} minute${mm > 1 ? "s" : ""}`);
  if (ss > 0 || parts.length === 0)
    parts.push(`${ss} second${ss > 1 ? "s " : " "}`);
  return " " + parts.join(" ");
};

const extractAnswer = (answerData: AnswerDataType): FormattedAnswerType => {
  if (!Array.isArray(answerData)) return answerData;
  const answer: any[] = [];
  answerData.forEach((tmpAnswer) => {
    if (tmpAnswer.isMarked) answer.push(tmpAnswer.desc);
  });
  return answer;
};

export const FetchAnswersFromForm = (form: FormType): Answer[] => {
  const questions = form.formData.questions;
  const answers: Answer[] = [];
  questions.forEach((question) => {
    if ("ans" in question) {
      const answer: Answer = {
        questionId: question.id,
        type: question.ans.type,
        data: extractAnswer(question.ans.data),
      };
      answers.push(answer);
    }
  });
  return answers;
};

export const setFormUserId = async (clerk_userId: string) => {
  console.log("Fetching userId");

  const userData = localStorage.getItem("easeforms_data");
  if (userData) {
    const parsedUserData: UserData = JSON.parse(userData);
    if (clerk_userId === parsedUserData.clerkId && parsedUserData.userId)
      return;
  }

  console.log("User to be created with clerkId: ", clerk_userId);

  const req = await fetch(`/api/user?clerkUserId=${clerk_userId}`);
  const resp: FetchedResponse = await req.json();

  const userDataToStore: UserData = {
    userId: resp.data.userId,
    clerkId: clerk_userId,
  };

  localStorage.setItem("easeforms_data", JSON.stringify(userDataToStore));
  return;
};

export const getUserData = () => {
  const userDataString = localStorage.getItem("easeforms_data")!;
  const userData: UserData = JSON.parse(userDataString);
  return userData;
};

export const resetFormUserData = () => {
  localStorage.removeItem("easeforms_data");
};

export const parseEndPoint = (endPoint: string) => {
  const foundedPath = ROUTES.find((route) => {
    const matcher = match(route);
    return matcher(endPoint);
  });
  return foundedPath;
};
