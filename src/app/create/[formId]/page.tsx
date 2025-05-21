import FormEditor from "@/components/create-ui/FormEditor";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  // useEffect(() => {
  //   console.log("Updated form quetions", formData.questions);
  // }, [formData.questions]);

  const { formId } = await params;

  return (
    <div>
      <FormEditor formId={formId} />
    </div>
  );
}
