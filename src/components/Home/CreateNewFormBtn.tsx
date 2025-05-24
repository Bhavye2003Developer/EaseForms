import { form } from "@/utils/constants";
import { getUserData } from "@/utils/helpers";
import { FetchedResponse } from "@/utils/types";
import { redirect } from "next/navigation";

export default function CreateNewFormBtn() {
  const redirectUserToCreateForm = async () => {
    // setIsLoading!(true);
    const { userId } = getUserData();
    const req = await fetch("/api/create-form", {
      method: "POST",
      body: JSON.stringify({ userId, form }),
    });
    const response: FetchedResponse = await req.json();
    const formId = response.data.formId;
    // setIsLoading!(false);
    // redirect("/about");
    redirect(`/create/${formId}`);
  };

  return (
    <button
      onClick={redirectUserToCreateForm}
      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md transition font-medium"
    >
      + New Form
    </button>
  );
}
