"use client";

import { FetchedResponse, User } from "@/utils/types";
import { UserSchema } from "@/utils/zod_schemas";
import React, { useState, FormEvent, FC } from "react";
import { toast } from "sonner";

interface SignupProps {
  setShowAuth: (value: boolean) => void;
  switchToLogin: () => void;
}

const Signup: FC<SignupProps> = ({ setShowAuth, switchToLogin }) => {
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Email and password are required.");
      return;
    }

    if (UserSchema.safeParse(user).error) {
      toast.error("Either email or password has problem");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data: FetchedResponse = await res.json();

      if (!data.error) {
        toast.success("Signed up successfully!");
        setShowAuth(false);
      } else {
        toast.error("Signup failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 shadow-md text-white w-full max-w-md">
      <button
        onClick={() => setShowAuth(false)}
        className="absolute top-3 right-4 text-zinc-400 hover:text-white text-2xl"
        disabled={isLoading}
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">
        Sign up for <span className="text-indigo-500">Easeforms</span>
      </h2>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled={isLoading}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            disabled={isLoading}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Please wait..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-zinc-400">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-indigo-500 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
