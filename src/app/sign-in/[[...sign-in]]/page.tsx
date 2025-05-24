"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useSignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const { isLoaded } = useSignIn();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <SignIn.Root>
          <SignIn.Step name="start">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">
              Sign in to <span className="text-blue-600">Easeforms</span>
            </h1>

            <Clerk.Connection
              name="google"
              className="mb-6 w-full rounded-lg bg-red-500 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-red-600"
            >
              Continue with Google
            </Clerk.Connection>

            <div className="space-y-5">
              <Clerk.Field name="identifier">
                <Clerk.Label className="block text-sm font-medium text-gray-700">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  type="email"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Clerk.FieldError className="mt-1 text-sm text-red-500" />
              </Clerk.Field>

              <Clerk.Field name="password">
                <Clerk.Label className="block text-sm font-medium text-gray-700">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  type="password"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Clerk.FieldError className="mt-1 text-sm text-red-500" />
              </Clerk.Field>
            </div>

            <SignIn.Action
              submit
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
              disabled={!isLoaded}
            >
              {!isLoaded && (
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              )}
              {!isLoaded ? "Signing in..." : "Sign In"}
            </SignIn.Action>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="email_code">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Check your email
              </h2>
              <Clerk.Field name="code">
                <Clerk.Label>Email Code</Clerk.Label>
                <Clerk.Input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <Clerk.FieldError className="text-sm text-red-500" />
              </Clerk.Field>
              <SignIn.Action
                submit
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Verify
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
