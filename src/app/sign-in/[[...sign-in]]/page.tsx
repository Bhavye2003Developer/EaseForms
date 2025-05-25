"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useSignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isLoaded } = useSignIn();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-sm">
        <SignIn.Root>
          <SignIn.Step name="start">
            <h1 className="text-center text-2xl font-semibold text-white mb-6">
              Sign in to <span className="text-indigo-500">Easeforms</span>
            </h1>

            <Clerk.Connection
              name="google"
              className="w-full mb-5 rounded-md bg-red-500 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Continue with Google
            </Clerk.Connection>

            <div className="space-y-4">
              <Clerk.Field name="identifier">
                <Clerk.Label className="text-sm text-zinc-300">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  type="email"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Clerk.FieldError className="text-sm text-red-500 mt-1" />
              </Clerk.Field>

              <Clerk.Field name="password">
                <Clerk.Label className="text-sm text-zinc-300">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  type="password"
                  className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Clerk.FieldError className="text-sm text-red-500 mt-1" />
              </Clerk.Field>
            </div>

            <SignIn.Action submit className="w-full mt-6" disabled={!isLoaded}>
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
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
                <Clerk.FieldError className="text-sm text-red-500 mt-1" />
              </Clerk.Field>
              <SignIn.Action submit className="w-full mt-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
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
