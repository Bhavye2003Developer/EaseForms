"use client";

import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

interface AuthModalProps {
  setShowAuth: (value: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ setShowAuth }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-full max-w-sm mx-4 p-6 sm:p-8 rounded-3xl shadow-2xl relative animate-fade-in">
        {isLogin ? (
          <Login
            setShowAuth={setShowAuth}
            switchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <Signup
            setShowAuth={setShowAuth}
            switchToLogin={() => setIsLogin(true)}
          />
        )}
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
