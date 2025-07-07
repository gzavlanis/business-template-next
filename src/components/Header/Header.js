// components/Header/Header.js
'use client';
import React, { useState, useCallback } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react'; // Import Menu and X icons for mobile toggle
import Link from 'next/link'; // Import Link for Next.js navigation
import { useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation

// --- Header Component ---
function Header({ theme, onThemeChange }) {
  const router = useRouter(); // Initialize router for navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile dropdown

  const headerBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const textColorClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const linkColorClass = theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900';
  const mobileMenuBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-white'; // Background for mobile dropdown

  const navLinks = [
    { text: 'Home', href: '/dashboard' }, // Changed 'link' to 'href' and updated to /dashboard
    { text: 'About Us', href: '#' },
    { text: 'Services', href: '#' },
    { text: 'Portfolio', href: '#' },
    { text: 'Blog', href: '#' },
    { text: 'Contact', href: '#' },
  ];

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleNavLinkClick = useCallback((href) => {
    router.push(href);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  }, [router]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-8 shadow-md transition-colors duration-300 ease-in-out ${headerBgClass} ${textColorClass}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Company Name / Logo (Link to Dashboard) */}
        <Link href="/dashboard" className="text-2xl font-bold whitespace-nowrap">
          My Company
        </Link>

        {/* Desktop Navigation Links (visible on medium and large screens) */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((item, index) => (
            <Link key={index} href={item.href} className={`text-lg font-medium ${linkColorClass} transition-colors duration-200`}>
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button (visible on small screens) */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 rounded-md focus:outline-none transition-colors duration-200
              ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Theme Toggle (always visible, but moved for mobile layout consistency) */}
        <button
          onClick={onThemeChange}
          className={`hidden md:block p-2 rounded-md focus:outline-none transition-colors duration-200
            ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className={`md:hidden fixed inset-x-0 top-16 pb-4 shadow-lg transition-all duration-300 ease-in-out ${mobileMenuBgClass} ${textColorClass}`}
             style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}> {/* Adjust top based on header height */}
          <nav className="flex flex-col items-center space-y-4 px-4">
            {navLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavLinkClick(item.href)}
                className={`w-full text-center py-2 rounded-md text-lg font-medium ${linkColorClass} transition-colors duration-200`}
              >
                {item.text}
              </button>
            ))}
            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={onThemeChange}
              className={`w-full py-2 rounded-md focus:outline-none transition-colors duration-200 flex items-center justify-center space-x-2
                ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              <span>Toggle Theme</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
