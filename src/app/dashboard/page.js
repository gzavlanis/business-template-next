// app/dashboard/page.js
'use client'; // This component uses client-side hooks/context

import React from 'react';
import { LogOut, UserIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import Dashboard from '../../components/Dashboard/Dashboard';
import { useTheme } from '../../components/ThemeProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { theme } = useTheme();

  const handleNavigateToProfile = () => router.push('/profile');
  const handleLogout = () => {
    // In a real app: Clear authentication tokens/session here
    router.push('/login');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold whitespace-nowrap mb-4 sm:mb-0">
          Welcome to Your Dashboard
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={handleNavigateToProfile}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
              ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50' : 'bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-500/50'}`}
          >
            <UserIcon size={20} />
            <span>Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold transition-colors duration-200
              ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/50' : 'bg-red-700 hover:bg-red-800 text-white shadow-lg shadow-red-500/50'}`}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <p className="text-lg mb-4">Below is your customizable dashboard. You can **drag and drop** the cards to reorder them.</p>
      <Dashboard theme={theme} />
    </>
  );
}