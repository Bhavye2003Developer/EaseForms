"use client";

import React, { useState, FC, FormEvent } from "react";
import { toast } from "sonner";

interface AuthModalProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  setShowAuth: (value: boolean) => void;
}

const AuthModal: FC<AuthModalProps> = ({
  isLogin,
  setIsLogin,
  setShowAuth,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/user/signin" : "/api/user/signup";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        if (isLogin) {
          localStorage.setItem("easeforms_email", email); // can be used to display in logo or navbar
          toast.success(data.msg || "Logged in successfully!");
        } else {
          toast.success(data.msg || "Signed up successfully!");
        }
        setShowAuth(false);
      } else {
        toast.error(data.msg || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md transition-opacity duration-300 ease-in-out">
      <div className="bg-white w-full max-w-xl mx-4 sm:mx-auto p-8 rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] relative transform scale-95 animate-fade-in transition-all duration-300">
        <button
          onClick={() => setShowAuth(false)}
          className="absolute top-3 right-4 text-gray-500 text-2xl hover:text-red-600 transition duration-200 cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>

        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 transition-colors duration-200">
          {isLogin ? "Login to Easeforms" : "Sign up for Easeforms"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            autoFocus
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${
              isLoading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {isLoading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="text-indigo-600 hover:underline text-sm transition duration-150 cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeInScale 0.3s ease-out;
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;
