import { getFormattedHHMMSS } from "@/utils/helpers";

export default function TimeBasedIntroPage({
  hhmmss,
  startForm,
}: {
  hhmmss: string;
  startForm: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          This form is time-based.
        </h2>
        <p className="mb-6 text-white">
          You have
          <span className="font-bold">{getFormattedHHMMSS(hhmmss)}</span>
          to complete it.
        </p>
        <button
          onClick={startForm}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}
