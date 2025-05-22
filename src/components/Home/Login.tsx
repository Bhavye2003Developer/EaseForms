"use client";

import { FetchedResponse } from "@/utils/types";
import useAppStore from "@/utils/useAppStore";
import React, { useState, FormEvent, FC } from "react";
import { toast } from "sonner";

interface LoginProps {
  setShowAuth: (value: boolean) => void;
  switchToSignup: () => void;
}

const Login: FC<LoginProps> = ({ setShowAuth, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setEmailAndId } = useAppStore();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Email and password are required.");
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data: FetchedResponse = await res.json();
      console.log("Logged in data: ", data);
      if (!data.error) {
        const id: string = data.data.id;
        setEmailAndId(email, id);
        toast.success("Logged in successfully!");
        setShowAuth(false);
      } else {
        toast.error("Login failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowAuth(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        disabled={isLoading}
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">
        Login to Easeforms
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg transition hover:bg-blue-700 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Don&apos;t have an account?{" "}
        <span
          onClick={switchToSignup}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
