import { create } from "zustand";

type AppState = {
  formId: string;
  setFormId: (formId: string) => void;
};

const useAppStore = create<AppState>()((set, get) => ({
  formId: "",
  setFormId: (formId: string) => {
    set(() => ({ formId }));
  },
}));

export default useAppStore;
