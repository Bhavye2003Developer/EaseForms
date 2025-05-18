"use client";

import React, { useState, FormEvent, FC } from "react";
import { toast } from "sonner";

interface SignupProps {
  setShowAuth: (value: boolean) => void;
  switchToLogin: () => void;
}

const Signup: FC<SignupProps> = ({ setShowAuth, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("Signup data: ", data);
      if (!data.error) {
        toast.success(data.msg || "Signed up successfully!");
        setShowAuth(false);
      } else {
        toast.error(data.msg || "Signup failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={() => setShowAuth(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        disabled={isLoading}
      >
        &times;
      </button>

      <h2 className="text-2xl font-semibold text-center mb-6">
        Sign up for Easeforms
      </h2>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
          {isLoading ? "Please wait..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          onClick={switchToLogin}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
