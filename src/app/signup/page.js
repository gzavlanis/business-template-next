// app/signup/page.js
'use client';

import { useRouter } from 'next/navigation';
import SignUp from '../../components/Authentication/SignUp';
import { useTheme } from '../../components/ThemeProvider';

export default function SignUpPage() {
  const router = useRouter();
  const { theme, handleThemeToggle } = useTheme();

  const handleNavigateToLogin = (e) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <div className={`flex h-screen font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <SignUp
        theme={theme}
        onThemeChange={handleThemeToggle}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </div>
  );
}