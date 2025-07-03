'use client';
import React, { useState, useCallback } from "react";
import { Sun, Moon, LogIn, User, Lock } from "lucide-react";

// --- LoginPage Component ---
function SignIn({ theme, onThemeChange, onLoginSuccess, onNavigateToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const bgColorClass = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const cardBgColorClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColorClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const inputBgColorClass = theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const inputTextColorClass = theme === "dark" ? "text-white" : "text-gray-900";
  const inputBorderColorClass = theme === "dark" ? "border-gray-600 focus:border-blue-500" : "border-gray-300 focus:border-blue-700";
  const buttonBgColorClass = theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-700 hover:bg-blue-800";
  const buttonTextColorClass = "text-white";
  const buttonShadowClass = "shadow-lg shadow-blue-500/50";

  const backgroundImageUrl =
    theme === "dark"
      ? "https://placehold.co/1920x1080/0A0A0A/E0E0E0?text=Login_Background"
      : "https://placehold.co/1920x1080/E0E0E0/0A0A0A?text=Login_Background";

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      setError("");

      if (email === "user@example.com" && password === "password123") {
        onLoginSuccess();
      } else {
        setError("Invalid email or password.");
      }
    },
    [email, password, onLoginSuccess]
  );

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen w-full font-sans transition-colors duration-300 ease-in-out ${bgColorClass}`}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`absolute inset-0 ${theme === "dark" ? "bg-black opacity-70" : "bg-white opacity-60"}`}></div>
      <div className={`relative z-10 p-8 rounded-lg shadow-2xl w-full max-w-md mx-4 transition-colors duration-300 ease-in-out ${cardBgColorClass}`}>
        <div className="absolute top-4 right-4">
          <button
            onClick={onThemeChange}
            className={`p-2 rounded-md focus:outline-none transition-colors duration-200
              ${theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        <h2 className={`text-3xl font-bold text-center mb-6 ${textColorClass}`}>Welcome Back!</h2>
        <p className={`text-center mb-8 ${textColorClass}`}>Sign in to your account</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-2 ${textColorClass}`}>
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User size={20} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
              </span>
              <input
                type="email"
                id="email"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium mb-2 ${textColorClass}`}>
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={20} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
              </span>
              <input
                type="password"
                id="password"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold transition-all duration-300 ease-in-out ${buttonBgColorClass} ${buttonTextColorClass} ${buttonShadowClass} flex items-center justify-center space-x-2`}
          >
            <LogIn size={20} />
            <span>Login</span>
          </button>
        </form>
        <div className={`mt-6 text-center text-sm ${textColorClass}`}>
          <a href="#" className={`font-medium ${theme === "dark" ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            Forgot Password?
          </a>
          <span className="mx-2">|</span>
          <a href="#" onClick={onNavigateToSignup} className={`font-medium ${theme === "dark" ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}>
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
