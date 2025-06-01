import useAppStore from "@/utils/useAppStore";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOutAction } from "@/utils/auth-action";
import { parseEndPoint } from "@/utils/helpers";
import { usePathname } from "next/navigation";
import PublishBtn from "../PublishBtn";
import CreateNewFormBtn from "../Home/CreateNewFormBtn";
import Link from "next/link";
import { User } from "lucide-react";

export default function Profile() {
  const { session, isPublishBtnHidden } = useAppStore();
  const endPoint = usePathname();
  const path = parseEndPoint(endPoint);

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      {/* Conditional Buttons */}
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

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 rounded-full w-9 h-9 overflow-hidden"
          >
            {session.user.image ? (
              <img
                src={session.user.image || ""}
                alt="User avatar"
                className="w-full h-full object-cover rounded-full"
              />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
