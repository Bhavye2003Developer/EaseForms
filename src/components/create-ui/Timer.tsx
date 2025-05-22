"use client";

import { getTimeInHHMMSS, getTimeInSeconds } from "@/utils/helpers";
import { Scene } from "@/utils/types";
import useFormFillingStore from "@/utils/useFormFillingStore";
import useFormStore from "@/utils/useFormStore";
import { useEffect, useState } from "react";

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
  const [localTimer, setLocalTimer] = useState(totalTime);

  const { form, formId, setFormSubmitted } = useFormFillingStore();

  async function submitForm() {
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
    const intervalId = setInterval(() => {
      console.log("inside timeout");
      setLocalTimer((tmpSec) => {
        if (tmpSec <= 1) {
          submitForm();
          setFormSubmitted();
          clearInterval(intervalId);
          return 0;
        }
        return tmpSec - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    console.log("Init");
    if (scene === Scene.Live) initiateTimer();
  }, []);

  const isDanger = localTimer <= totalTime * 0.1;

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
          ⏱ {scene === Scene.Preview ? timer : getTimeInHHMMSS(localTimer)}
        </span>
      )}
    </>
  );
}
