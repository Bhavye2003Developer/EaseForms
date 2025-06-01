import { Session } from "next-auth";
import { create } from "zustand";

type AppState = {
  formId: string;
  setFormId: (formId: string) => void;
  isLoading: boolean;
  loadingText: string;
  toggleLoading: (text?: string) => void;
  showShareURLModal: boolean;
  sharedURL: string;
  toggleShowShareURLModal: (url?: string) => void;
  isPublishBtnHidden: boolean;
  togglePublishBtnVisibility: () => void;
  session: Session | null;
  setSession: (session: Session | null) => void;
};

const useAppStore = create<AppState>()((set, get) => ({
  formId: "",
  sharedURL: "",
  showShareURLModal: false,
  setFormId: (formId: string) => {
    set(() => ({ formId }));
  },
  isLoading: false,
  loadingText: "",
  toggleLoading: (text?: string) => {
    const loadingText = text || "";
    set((state) => ({
      ...state,
      isLoading: !state.isLoading,
      loadingText: loadingText,
    }));
  },
  toggleShowShareURLModal: (url?: string) => {
    const urlText = url || "";
    set((state) => ({
      ...state,
      sharedURL: urlText,
      showShareURLModal: !state.showShareURLModal,
    }));
  },
  isPublishBtnHidden: true,
  togglePublishBtnVisibility: () => {
    set((state) => ({
      ...state,
      isPublishBtnHidden: !state.isPublishBtnHidden,
    }));
  },
  session: null,
  setSession: (session: Session | null) => {
    console.log("Session updated: ", session);
    set((state) => ({ ...state, session: session }));
  },
}));

export default useAppStore;
