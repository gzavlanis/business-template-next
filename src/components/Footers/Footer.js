'use client';
import React from "react";

// --- Footer Component (NEW) ---
function Footer({ theme }) {
  const currentYear = new Date().getFullYear();
  const footerBgClass = theme === "dark" ? "bg-gray-800" : "bg-gray-200";
  const textColorClass = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <footer className={`w-full py-4 mt-8 text-center text-sm ${footerBgClass} ${textColorClass} rounded-lg shadow-inner`}>
      &copy; {currentYear} My Awesome Company. All rights reserved.
    </footer>
  );
}

export default Footer;
