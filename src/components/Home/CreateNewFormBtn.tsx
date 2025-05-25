import { form } from "@/utils/constants";
import { getUserData } from "@/utils/helpers";
import { FetchedResponse } from "@/utils/types";
import useAppStore from "@/utils/useAppStore";
import { redirect } from "next/navigation";

export default function CreateNewFormBtn() {
  const { isLoading, toggleLoading } = useAppStore();

  const redirectUserToCreateForm = async () => {
    toggleLoading();
    const { userId } = getUserData();
    const req = await fetch("/api/create-form", {
      method: "POST",
      body: JSON.stringify({ userId, form }),
    });
    const response: FetchedResponse = await req.json();
    const formId = response.data.formId;
    toggleLoading();
    redirect(`/create/${formId}`);
  };

  return (
    <button
      onClick={redirectUserToCreateForm}
      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition font-medium flex items-center gap-2"
      disabled={isLoading}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      + New Form
    </button>
  );
}
