import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Easeforms. All rights reserved.
    </footer>
  );
}
