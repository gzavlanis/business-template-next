// app/login/page.js
'use client'; // This is a Client Component

import { useRouter } from 'next/navigation'; // Use next/navigation for client-side navigation
import SignIn from '../../components/Authentication/SignIn';
import { useTheme } from '../../components/ThemeProvider'; // Import your theme context

export default function LoginPage() {
  const router = useRouter();
  const { theme, handleThemeToggle } = useTheme();

  const handleLoginSuccess = () => {
    router.push('/dashboard'); // Navigate to the dashboard after successful login
  };

  const handleNavigateToSignup = (e) => {
    e.preventDefault();
    router.push('/signup');
  };

  return (
    <div className={`flex h-screen font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <SignIn
        theme={theme}
        onThemeChange={handleThemeToggle}
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignup={handleNavigateToSignup}
      />
    </div>
  );
}