'use client';
import { useState, useCallback } from "react";
import { Sun, Moon, User, Lock, MailIcon, PlusCircle } from "lucide-react";

// --- SignupPage Component (NEW) ---
function SignUp({ theme, onThemeChange, onNavigateToLogin }) {
  // Added onNavigateToLogin
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Define dynamic colors based on the current theme
  const bgColorClass = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const cardBgColorClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColorClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const inputBgColorClass = theme === "dark" ? "bg-gray-700" : "bg-gray-50";
  const inputTextColorClass = theme === "dark" ? "text-white" : "text-gray-900";
  const inputBorderColorClass = theme === "dark" ? "border-gray-600 focus:border-blue-500" : "border-gray-300 focus:border-blue-700";
  const buttonBgColorClass = theme === "dark" ? "bg-green-600 hover:bg-green-700" : "bg-green-700 hover:bg-green-800"; // Green button for signup
  const buttonTextColorClass = "text-white";
  const buttonShadowClass = "shadow-lg shadow-green-500/50";

  // Placeholder background image URLs based on theme (can be different from login)
  const backgroundImageUrl =
    theme === "dark"
      ? "https://placehold.co/1920x1080/1A202C/A0AEC0?text=Signup_Background" // Darker bg for signup
      : "https://placehold.co/1920x1080/CBD5E0/2D3748?text=Signup_Background"; // Lighter bg for signup

  const handleSignup = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      setSuccess("");

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      // Simulate signup success
      setSuccess("Account created successfully! Redirecting to login...");
      console.log("Signup details:", { name, email, password });
      // In a real app, you'd send this to a backend.
      // After successful signup, navigate back to login after a short delay
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
    },
    [name, email, password, confirmPassword, onNavigateToLogin]
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
        <h2 className={`text-3xl font-bold text-center mb-6 ${textColorClass}`}>Create Account</h2>
        <p className={`text-center mb-8 ${textColorClass}`}>Join us today!</p>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${textColorClass}`}>
              Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User size={20} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
              </span>
              <input
                type="text"
                id="name"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Email Input */}
          <div>
            <label htmlFor="signup-email" className={`block text-sm font-medium mb-2 ${textColorClass}`}>
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon size={20} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
              </span>
              <input
                type="email"
                id="signup-email"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="signup-password" className={`block text-sm font-medium mb-2 ${textColorClass}`}>
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={20} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
              </span>
              <input
                type="password"
                id="signup-password"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm-password" className={`block text-sm font-medium mb-2 ${textColorClass}`}>
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={20} className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
              </span>
              <input
                type="password"
                id="confirm-password"
                className={`w-full pl-10 pr-3 py-2 rounded-md border ${inputBorderColorClass} ${inputBgColorClass} ${inputTextColorClass} focus:ring-2 focus:outline-none`}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Success Message */}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          {/* Signup Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold transition-all duration-300 ease-in-out ${buttonBgColorClass} ${buttonTextColorClass} ${buttonShadowClass} flex items-center justify-center space-x-2`}
          >
            <PlusCircle size={20} />
            <span>Sign Up</span>
          </button>
        </form>

        {/* Already have an account link */}
        <div className={`mt-6 text-center text-sm ${textColorClass}`}>
          Already have an account?{" "}
          <a
            href="#"
            onClick={onNavigateToLogin}
            className={`font-medium ${theme === "dark" ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline"}`}
          >
            Login here
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
