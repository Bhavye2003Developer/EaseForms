import { Answer, FetchedResponse, FormattedAnswerType } from "@/utils/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { utils, writeFile } from "xlsx";
import { toast } from "sonner";

export default function ExportToExcelModal({
  showModal,
  setShowModal,
  selectedFormId,
}: {
  showModal: boolean;
  setShowModal: (flag: boolean) => void;
  selectedFormId: string | null;
}) {
  const confirmExport = async () => {
    if (selectedFormId) {
      const url = `/api/export-responses?formId=${selectedFormId}`;

      const resp = await fetch(url);
      const formAnswers: FetchedResponse = await resp.json();

      if (!formAnswers.error) {
        const answerData = formAnswers.data.answers;
        console.log("Form Answers: ", answerData);

        const worksheet = utils.json_to_sheet(answerData);
        console.log("Worksheet: ", worksheet);

        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Form Answers");
        writeFile(workbook, "Form_Answers.xlsx");
        toast.success("Responses fetched to excel successfully.");
      }
    }
    setShowModal(false);
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Responses</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-zinc-600">
            Do you want to export all responses for this form to Excel?
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={confirmExport}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
