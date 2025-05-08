"use client";

import { QuestionsUIMode } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";

export default function SettingsDialog() {
  const {
    form: { settings },
    updateTimer,
    updateUIMode,
  } = useFormStore();

  return (
    <div className="p-4 text-sm text-gray-800">
      <h2 className="text-base font-semibold mb-4">⚙️ Form Settings</h2>

      <div className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            ⏱ Form Timer
          </label>
          <input
            type="time"
            step="1"
            value={settings.timer}
            onChange={(e) => updateTimer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Set timer in <strong>hh:mm:ss</strong> format (24-hour clock).
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            🧭 UI Mode
          </label>
          <select
            value={settings.UIMode}
            onChange={(e) => updateUIMode(e.target.value as QuestionsUIMode)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={QuestionsUIMode.Simple}>
              Simple (All Questions)
            </option>
            <option value={QuestionsUIMode.Single}>
              Single (One-at-a-Time)
            </option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose how questions are displayed in the form.
          </p>
        </div>
      </div>
    </div>
  );
}
