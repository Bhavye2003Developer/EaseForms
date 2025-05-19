import FormFillingView from "@/components/FormFillingView";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  return <FormFillingView formId={formId} />;
}
