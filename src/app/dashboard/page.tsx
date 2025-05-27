"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { getUserData } from "@/utils/helpers";
import { FetchedResponse, FormsMetaData, Response } from "@/utils/types";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Page() {
  const { userId } = useAuth();
  const [formsMetaData, setFormsMetaData] = useState<FormsMetaData | null>(
    null
  );

  const fetchAllFormsInfo = async () => {
    const userId = getUserData().userId;
    const req = await fetch(`/api/user-forms?userId=${userId}`);
    const res: FetchedResponse = await req.json();
    console.log("FormsMetaData: ", res.data);
    if (!res.error) setFormsMetaData(res.data);
  };

  useEffect(() => {
    fetchAllFormsInfo();
  }, []);

  return (
    <div>
      {!formsMetaData ? (
        <LoadingOverlay message="All your forms data is being fetched..." />
      ) : (
        <div>
          You have created: {formsMetaData.length} forms.
          {formsMetaData.map((formMetaData) => (
            <h1>Form Id: {formMetaData.id}</h1>
          ))}
        </div>
      )}
    </div>
  );
}
