'use client';
import React from 'react';
import { Moon, Sun } from 'lucide-react';

// --- Header Component (NEW) ---
function Header({ theme, onThemeChange }) {
  const headerBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const linkColorClass = theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900';

  const navLinks = [
    { text: 'Home', link: '#' },
    { text: 'About Us', link: '#' },
    { text: 'Services', link: '#' },
    { text: 'Portfolio', link: '#' },
    { text: 'Blog', link: '#' },
    { text: 'Contact', link: '#' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-8 shadow-md transition-colors duration-300 ease-in-out ${headerBgClass} ${textColorClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Company Name */}
        <h1 className="text-2xl font-bold whitespace-nowrap">My Company</h1>

        {/* Navigation Links (visible on medium and large screens) */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((item, index) => (
            <a key={index} href={item.link} className={`text-lg font-medium ${linkColorClass} transition-colors duration-200`}>
              {item.text}
            </a>
          ))}
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={onThemeChange}
          className={`p-2 rounded-md focus:outline-none transition-colors duration-200
            ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;