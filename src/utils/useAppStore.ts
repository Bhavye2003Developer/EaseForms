import { create } from "zustand";

// type AppSettings = {
//   email: string | null;
//   userId: string | null;
//   init: () => void;
//   setEmailAndId: (email: string, id: string) => void;
//   isLoggedIn: boolean;
// };

const useAppStore = create((set, get) => ({
  formId: "",
  setFormId: (formId: String) => {
    set(() => ({ formId }));
  },
}));

export default useAppStore;
