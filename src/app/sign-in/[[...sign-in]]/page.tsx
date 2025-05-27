"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useSignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isLoaded } = useSignIn();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-md">
        <SignIn.Root>
          <SignIn.Step name="start">
            <h1 className="text-2xl font-semibold text-white mb-6 text-center">
              Sign in to <span className="text-indigo-500">Easeforms</span>
            </h1>

            <Clerk.Connection
              name="google"
              className="w-full mb-6 flex items-center justify-center gap-2 rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
            >
              <Clerk.Icon className="w-4 h-4" />
              Continue with Google
            </Clerk.Connection>

            <div className="space-y-5">
              <Clerk.Field name="identifier">
                <Clerk.Label className="text-sm text-zinc-300">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  type="email"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Clerk.FieldError className="mt-1 text-sm text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="password">
                <Clerk.Label className="text-sm text-zinc-300">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  type="password"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Clerk.FieldError className="mt-1 text-sm text-red-500" />
              </Clerk.Field>
            </div>

            <SignIn.Action submit className="w-full mt-6" disabled={!isLoaded}>
              <button
                type="submit"
                disabled={!isLoaded}
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {isLoaded ? "Sign In" : "Signing in..."}
              </button>
            </SignIn.Action>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="email_code">
              <h2 className="mb-4 text-lg font-medium text-white">
                Check your email
              </h2>
              <Clerk.Field name="code">
                <Clerk.Label className="text-sm text-zinc-300">
                  Email Code
                </Clerk.Label>
                <Clerk.Input className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <Clerk.FieldError className="mt-1 text-sm text-red-500" />
              </Clerk.Field>
              <SignIn.Action submit className="w-full mt-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                >
                  Verify
                </button>
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
