import FormEditor from "@/components/base/FormEditor";
import ErrorPage from "@/components/utils/ErrorPage";
import { formIdSchema } from "@/utils/zod_schemas";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const isFormIdValid = formIdSchema.safeParse(formId);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isFormIdValid.success ? (
        <FormEditor formId={formId} />
      ) : (
        <ErrorPage msg={"Form Id is invalid"} />
      )}
    </div>
  );
}
