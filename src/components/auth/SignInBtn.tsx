"use client";

import { Button } from "@/components/ui/button";
import { signInAction } from "@/utils/auth-action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FcGoogle } from "react-icons/fc"; // Google icon from react-icons
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
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              {hovered && <FcGoogle className="w-5 h-5" />}
              Sign in
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent className="bg-zinc-800 text-white text-sm border border-zinc-700">
          Sign in with Google
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
