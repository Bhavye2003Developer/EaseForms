"use client";

import useFormStore from "@/utils/useFormStore";

export default function Header() {
  const { form } = useFormStore();

  return (
    <div className="w-screen flex items-center justify-between px-6 py-1 border-b border-gray-200 shadow-sm">
      <h1 className="text-2xl font-semibold text-gray-800">Create Your Form</h1>
      <button
        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
        onClick={() => {
          // handle form isempty
          console.log("Sending to backend...", form);
        }}
      >
        Publish
      </button>
    </div>
  );
}
