"use client";

import useFormStore from "@/utils/useFormStore";
import { QuestionsUIMode } from "../../../generated/prisma";
import { Card } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SettingsDialog() {
  const {
    form: { settings },
    updateTimer,
    updateUIMode,
    toggleTimerEnabled,
    toggleDeadlineEnabled,
    updateDeadline,
  } = useFormStore();

  return (
    <Card
      className="w-[420px] h-[480px] p-5 bg-white shadow-lg rounded-xl text-sm border border-zinc-200 overflow-hidden"
      style={{ transition: "all 0.3s ease" }}
    >
      <h2 className="text-lg font-semibold text-zinc-800 mb-4">
        ⚙️ Form Settings
      </h2>

      <div className="space-y-5">
        {/* Timer Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-zinc-700">⏱ Enable Timer</Label>
          <Switch
            checked={settings.isTimerEnabled}
            onCheckedChange={toggleTimerEnabled}
          />
        </div>

        {/* Timer Field */}
        <div
          className={`transition-all duration-300 ${
            settings.isTimerEnabled
              ? "opacity-100"
              : "opacity-0 pointer-events-none h-0"
          }`}
        >
          <div className="space-y-1">
            <Label className="text-zinc-700">⏱ Form Timer</Label>
            <Input
              type="time"
              step="1"
              value={settings.timer}
              onChange={(e) => updateTimer(e.target.value)}
            />
            <p className="text-xs text-zinc-500">
              Format: <strong>hh:mm:ss</strong> (24-hour clock).
            </p>
          </div>
        </div>

        {/* Deadline Toggle */}
        <div className="flex items-center justify-between">
          <Label className="text-zinc-700">📅 Enable Deadline</Label>
          <Switch
            checked={settings.hasDeadline}
            onCheckedChange={toggleDeadlineEnabled}
          />
        </div>

        {/* Deadline Field */}
        <div
          className={`transition-all duration-300 ${
            settings.hasDeadline
              ? "opacity-100"
              : "opacity-0 pointer-events-none h-0"
          }`}
        >
          <div className="space-y-1">
            <Label className="text-zinc-700">🕒 Deadline</Label>
            <Input
              type="datetime-local"
              value={settings.deadline}
              onChange={(e) => updateDeadline(e.target.value)}
            />
            <p className="text-xs text-zinc-500">
              After this time, users won’t be able to submit the form.
            </p>
          </div>
        </div>

        {/* UI Mode */}
        <div className="space-y-1">
          <Label className="text-zinc-700">🧭 UI Mode</Label>
          <Select
            value={settings.UIMode}
            onValueChange={(value) => updateUIMode(value as QuestionsUIMode)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={QuestionsUIMode.Simple}>
                Simple (All Questions)
              </SelectItem>
              <SelectItem value={QuestionsUIMode.Single}>
                Single (One-at-a-Time)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-zinc-500">
            Determines how users navigate questions.
          </p>
        </div>
      </div>
    </Card>
  );
}
