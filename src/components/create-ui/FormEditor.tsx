import FormCreator from "./FormCreator";
import FormPreviewer from "./FormPreviewer";

export default function FormEditor() {
  return (
    <div className="h-screen flex flex-col items-center overflow-hidden">
      <div className="flex w-full flex-1 overflow-hidden">
        <div className="flex-1 p-2 overflow-auto rounded-lg shadow-md">
          <FormCreator />
        </div>
        <div className="flex-1 p-2 overflow-auto rounded-lg shadow-md">
          <FormPreviewer />
        </div>
      </div>
    </div>
  );
}
