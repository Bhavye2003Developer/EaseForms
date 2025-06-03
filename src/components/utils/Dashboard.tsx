"use client";

import { getUserData, redirectToLogin } from "@/utils/helpers";
import { FetchedResponse, FormsMetaData } from "@/utils/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import useAppStore from "@/utils/useAppStore";
import LoadingOverlay from "./LoadingOverlay";
import ExportToExcelModal from "./ExportToExcelModal";

export default function Dashboard() {
  const [formsMetaData, setFormsMetaData] = useState<FormsMetaData | null>(
    null
  );
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { session } = useAppStore();

  const fetchAllFormsInfo = async () => {
    const userId = getUserData().userId;
    const req = await fetch(`/api/forms-metadata?userId=${userId}`);
    const res: FetchedResponse = await req.json();
    if (!res.error) setFormsMetaData(res.data);
  };

  const handleDelete = async (formId: string) => {
    const res = await fetch(`/api/delete-form?formId=${formId}`, {
      method: "DELETE",
    });
    const json: FetchedResponse = await res.json();
    if (json.error) {
      toast.error("Failed to delete form");
    } else {
      toast.success(json.msg);
      fetchAllFormsInfo();
    }
  };

  const exportToExcel = (formId: string) => {
    setSelectedFormId(formId);
    setShowModal(true);
  };

  useEffect(() => {
    if (!session?.user) redirectToLogin("Please login to access the dashboard");
    else fetchAllFormsInfo();
  }, []);

  if (!session?.user) return null;

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
              className="relative"
            >
              <div className="absolute top-2 right-2 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 rounded-md hover:bg-zinc-100 focus:outline-none">
                      <MoreVertical className="w-5 h-5 text-zinc-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem
                      onClick={() =>
                        window.open(`/create/${formMetaData.id}`, "_blank")
                      }
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        navigator.clipboard
                          .writeText(
                            `${window.location.origin}/form/${formMetaData.id}`
                          )
                          .then(() => toast.success("Link copied!"))
                      }
                    >
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => exportToExcel(formMetaData.id)}
                    >
                      Responses to Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(formMetaData.id)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-400 transition-all cursor-default h-full flex flex-col justify-between">
                <div className="flex items-start gap-2">
                  <FileText className="text-blue-500 w-5 h-5 mt-1" />
                  <div>
                    <h2 className="text-base font-medium text-gray-800 line-clamp-2">
                      {formMetaData.FormStruct.formData.formHeader.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Published:{" "}
                      {new Date(formMetaData.publishedDate).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ExportToExcelModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedFormId={selectedFormId}
      />
    </div>
  );
}
