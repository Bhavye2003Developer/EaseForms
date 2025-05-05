import { create } from "zustand";

interface FormSettingsState {
  isTimerEnabled: boolean;
  toggleTimerEnabled: () => void;
  timer: string;
  updateTimer: (updatedTime: string) => void;
}

const useFormSettingsStore = create<FormSettingsState>()((set, get) => ({
  isTimerEnabled: false,
  toggleTimerEnabled: () => {
    set((state) => ({ ...state, isTimerEnabled: !get().isTimerEnabled }));
  },
  timer: "00:00:00",
  updateTimer: (updatedTime: string) => {
    set((state) => ({ ...state, timer: updatedTime }));
  },
}));

export default useFormSettingsStore;
