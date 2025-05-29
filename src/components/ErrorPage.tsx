"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ msg }: { msg: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <Card className="w-full max-w-sm text-center border border-zinc-200 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-center text-red-500 mb-2">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <CardTitle className="text-base font-semibold text-zinc-800">
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-zinc-600">{msg}</p>
          <Link href="/" passHref>
            <Button variant="outline" className="w-full">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
