"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0";

import CreateNewFormBtn from "./CreateNewFormBtn";
import PublishBtn from "../PublishBtn";
import useAppStore from "@/utils/useAppStore";
import { parseEndPoint } from "@/utils/helpers";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, isLoading } = useUser();

  console.log("From header: ", user);

  const endPoint = usePathname();
  const { isPublishBtnHidden } = useAppStore();

  useEffect(() => {
    console.log("Path name changed: ", endPoint, parseEndPoint(endPoint));
  }, [endPoint]);

  return (
    <header className="w-full h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-6 backdrop-blur-sm shadow-sm">
      <Link href="/" className="select-none">
        <h1 className="text-indigo-500 font-extrabold text-2xl tracking-tight hover:text-indigo-400 transition-colors cursor-pointer">
          Easeforms
        </h1>
      </Link>
      {!isLoading ? (
        <>
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Auth Button */}
            {!user && (
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a href="/auth/login">Sign Up/ Login</a>
              </Button>
            )}

            {/* Conditionally Show Create/Publish Button */}
            {user &&
              (parseEndPoint(endPoint) === "/create/:formId" &&
              !isPublishBtnHidden ? (
                <PublishBtn />
              ) : parseEndPoint(endPoint) === "/form/:formId" ? null : (
                <CreateNewFormBtn />
              ))}

            {/* Dashboard Link */}
            {user && parseEndPoint(endPoint) !== "/dashboard" && (
              <Button
                asChild
                variant="outline"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}

            {/* Avatar Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 rounded-full w-9 h-9">
                    <img
                      src={user.picture}
                      alt="User avatar"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-zinc-900 border-zinc-700"
                >
                  <DropdownMenuItem>
                    <a href="/auth/logout" className="w-full text-left">
                      Sign out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </header>
  );
}
