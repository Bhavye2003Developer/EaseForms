import FormEditor from "@/components/create-ui/FormEditor";
import ErrorPage from "@/components/ErrorPage";
import { formIdSchema } from "@/utils/zod_schemas";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  const isFormIdValid = formIdSchema.safeParse(formId);

  return (
    <div>
      {isFormIdValid.success ? (
        <FormEditor formId={formId} />
      ) : (
        <ErrorPage msg={"Form Id is invalid"} />
      )}
    </div>
  );
}
