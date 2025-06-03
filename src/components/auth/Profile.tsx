import { useState } from "react";
import useAppStore from "@/utils/useAppStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOutAction } from "@/utils/auth-action";
import { parseEndPoint } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import CreateNewFormBtn from "../Home/CreateNewFormBtn";
import Link from "next/link";
import { User } from "lucide-react";
import PublishBtn from "../create/FormUI/PublishBtn";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Profile() {
  const { session, isPublishBtnHidden } = useAppStore();
  const endPoint = usePathname();
  const path = parseEndPoint(endPoint);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {path === "/create/:formId" && !isPublishBtnHidden ? (
        <PublishBtn />
      ) : path === "/form/:formId" ? null : (
        <CreateNewFormBtn />
      )}

      {path !== "/dashboard" && (
        <Button
          asChild
          variant="outline"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 rounded-full w-9 h-9 overflow-hidden"
          >
            {session.user.image ? (
              <div className="w-full h-full relative">
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <User className="w-5 h-5 text-zinc-400 animate-pulse" />
                  </div>
                )}
                <Image
                  src={session.user.image}
                  alt="User avatar"
                  onLoad={() => setImgLoaded(true)}
                  className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${
                    imgLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 rounded-full">
                <User className="w-5 h-5 text-zinc-400" />
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-zinc-900 border border-zinc-700"
        >
          <DropdownMenuItem>
            <form action={signOutAction} className="w-full">
              <button className="w-full text-left">Sign out</button>
            </form>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/dashboard"}>Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
