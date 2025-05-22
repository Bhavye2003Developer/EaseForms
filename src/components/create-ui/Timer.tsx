"use client";

import { getTimeInHHMMSS, getTimeInSeconds } from "@/utils/helpers";
import { Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";
import { useEffect, useRef, useState } from "react";

export default function Timer({
  scene,
  isTimerEnabled,
  timer,
}: {
  scene: Scene;
  isTimerEnabled: boolean;
  timer: string;
}) {
  const totalTime = getTimeInSeconds(timer);
  const [displayTime, setDisplayTime] = useState(totalTime);
  const timerRef = useRef(totalTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { form, formId, setFormSubmitted } = useFormFillingStore();

  async function submitForm() {
    console.log("Submitting form: ", form);
    const req = await fetch("/api/submit-answers", {
      method: "POST",
      body: JSON.stringify({
        formId,
        form,
      }),
    });
    const res = await req.json();
    return res;
  }

  const initiateTimer = () => {
    intervalRef.current = setInterval(() => {
      timerRef.current -= 1;
      setDisplayTime(timerRef.current);

      if (timerRef.current <= 0) {
        clearInterval(intervalRef.current!);
        submitForm();
        setFormSubmitted();
      }
    }, 1000);
  };

  useEffect(() => {
    if (scene === Scene.Live && isTimerEnabled) {
      initiateTimer();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isDanger = displayTime <= totalTime * 0.1;

  return (
    <>
      {isTimerEnabled && (
        <span
          className={`absolute right-0 top-2 text-xs font-medium px-3 py-1 rounded-full shadow-md border
            ${
              isDanger && scene === Scene.Live
                ? "bg-red-100 text-red-800 border-red-400 animate-pulse shadow-red-500 shadow-md"
                : "bg-white text-indigo-700 border-indigo-300"
            }`}
        >
          ⏱ {scene === Scene.Preview ? timer : getTimeInHHMMSS(displayTime)}
        </span>
      )}
    </>
  );
}
