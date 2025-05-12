"use client";

import { QuestionsUIMode } from "@/utils/types";
import useFormStore from "@/utils/useFormStore";

export default function SettingsDialog() {
  const {
    form: { settings },
    updateTimer,
    updateUIMode,
    toggleTimerEnabled,
  } = useFormStore();

  return (
    <div className="max-w-md mx-auto p-6 bg-blue-100 rounded-xl shadow-lg text-sm text-gray-900">
      <h2 className="text-lg font-semibold mb-6 text-purple-800">
        ⚙️ Form Settings
      </h2>

      <div className="space-y-6">
        {/* Toggle Timer */}
        <div className="flex items-center justify-between">
          <label className="font-medium text-gray-800">⏱ Enable Timer</label>
          <button
            onClick={toggleTimerEnabled}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
              settings.isTimerEnabled ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                settings.isTimerEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {settings.isTimerEnabled && (
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              ⏱ Form Timer
            </label>
            <input
              type="time"
              step="1"
              value={settings.timer}
              onChange={(e) => updateTimer(e.target.value)}
              className="w-full p-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-gray-700 mt-1">
              Set timer in <strong>hh:mm:ss</strong> format (24-hour clock).
            </p>
          </div>
        )}
        <div>
          <label className="block mb-1 font-medium text-gray-800">
            🧭 UI Mode
          </label>
          <select
            value={settings.UIMode}
            onChange={(e) => updateUIMode(e.target.value as QuestionsUIMode)}
            className="w-full p-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={QuestionsUIMode.Simple}>
              Simple (All Questions)
            </option>
            <option value={QuestionsUIMode.Single}>
              Single (One-at-a-Time)
            </option>
          </select>
          <p className="text-xs text-gray-700 mt-1">
            Choose how questions are displayed in the form.
          </p>
        </div>
      </div>
    </div>
  );
}
