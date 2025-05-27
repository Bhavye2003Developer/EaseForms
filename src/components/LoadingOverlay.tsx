import React from "react";

export default function LoadingOverlay({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 z-50 bg-white/40 backdrop-blur-[5px] flex flex-col items-center justify-center space-y-4">
      <svg
        className="h-6 w-6 text-indigo-600 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {message && (
        <p className="text-lg font-medium text-gray-800">{message}</p>
      )}
    </div>
  );
}
