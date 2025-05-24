// import { create } from "zustand";

// type AppSettings = {
//   email: string | null;
//   userId: string | null;
//   init: () => void;
//   setEmailAndId: (email: string, id: string) => void;
//   isLoggedIn: boolean;
// };

// const useAppStore = create<AppSettings>()((set, get) => ({
//   email: null,
//   userId: null,
//   isLoggedIn: false,
//   init: () => {
//     if (typeof window !== "undefined") {
//       const storedEmail = localStorage.getItem("easeforms_email");
//       const storedUserId = localStorage.getItem("easeforms_userId");
//       set({
//         email: storedEmail,
//         userId: storedUserId,
//         isLoggedIn: storedEmail !== null,
//       });
//     }
//   },
//   setEmailAndId: (email: string, id: string) => {
//     localStorage.setItem("easeforms_email", email);
//     localStorage.setItem("easeforms_userId", id);
//     set({ email: email, userId: id, isLoggedIn: true });
//   },
// }));

// export default useAppStore;

export default function useAppStore() {}
