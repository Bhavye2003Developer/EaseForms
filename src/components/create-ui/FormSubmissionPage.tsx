export default function FormSubmissionPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 text-center">
        Thanks for filling out the form!
      </h2>
      <p className="text-gray-600 text-sm text-center max-w-md">
        Your responses have been successfully submitted. You may now close this
        tab.
      </p>
    </div>
  );
}
