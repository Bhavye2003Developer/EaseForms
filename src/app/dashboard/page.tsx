"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { getUserData } from "@/utils/helpers";
import { FetchedResponse, FormsMetaData } from "@/utils/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Page() {
  const [formsMetaData, setFormsMetaData] = useState<FormsMetaData | null>(
    null
  );

  const fetchAllFormsInfo = async () => {
    const userId = getUserData().userId;
    const req = await fetch(`/api/user-forms?userId=${userId}`);
    const res: FetchedResponse = await req.json();
    if (!res.error) setFormsMetaData(res.data);
  };

  useEffect(() => {
    fetchAllFormsInfo();
  }, []);

  if (!formsMetaData) {
    return <LoadingOverlay message="All your forms data is being fetched..." />;
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl md:text-2xl font-semibold mb-4"
        >
          You’ve created{" "}
          <span className="text-blue-600 font-bold">
            {formsMetaData.length}
          </span>{" "}
          form{formsMetaData.length !== 1 && "s"}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {formsMetaData.map((formMetaData, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Link href={`/create/${formMetaData.id}`} target="_blank">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-pointer h-full flex flex-col justify-between">
                  <div className="flex items-start gap-2">
                    <FileText className="text-blue-500 w-5 h-5 mt-1" />
                    <div>
                      <h2 className="text-base font-medium text-gray-800 line-clamp-2">
                        {formMetaData.FormStruct.formData.formHeader.title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Published:{" "}
                        {new Date(
                          formMetaData.publishedDate
                        ).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
