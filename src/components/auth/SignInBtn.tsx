"use client";

import { Button } from "@/components/ui/button";
import { signInAction } from "@/utils/auth-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export default function SignInBtn() {
  const [hovered, setHovered] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form action={signInAction}>
            <Button
              type="submit"
              variant="default"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-sm px-4 py-2 transition-colors"
            >
              {hovered && <FcGoogle className="w-5 h-5" />}
              Sign in
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-zinc-800 text-white text-sm border border-zinc-700"
        >
          Sign in with Google
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
