import { create } from "zustand";

type AppState = {
  formId: string;
  setFormId: (formId: string) => void;
  isLoading: boolean;
  loadingText: string;
  toggleLoading: (text?: string) => void;
};

const useAppStore = create<AppState>()((set, get) => ({
  formId: "",
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
}));

export default useAppStore;
