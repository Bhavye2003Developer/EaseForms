import FormEditor from "@/components/create-ui/FormEditor";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;

  return (
    <div>
      <FormEditor formId={formId} />
    </div>
  );
}
