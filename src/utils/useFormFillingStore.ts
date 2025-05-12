import { create } from "zustand";
import { FormType } from "./types";

interface FormFillingState {
  form: FormType | null;
  setForm: (form: FormType) => void;
  
}

const useFormFillingStore = create<FormFillingState>((set, get) => ({
  form: null,
  setForm(form) {
    set((state) => ({ ...state, form }));
  },
}));

export default useFormFillingStore;
