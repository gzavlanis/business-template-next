// components/ThemeProvider.js
'use client'; // This is a Client Component

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

// Create the context
const ThemeContext = createContext(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false); // Initialize as false
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    const handleResize = () => {
      const currentIsLargeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(currentIsLargeScreen);
      if (currentIsLargeScreen) {
        setIsSidebarExpanded(true);
      } else {
        setIsSidebarExpanded(false);
      }
    };
    // Call once on mount to set initial state
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded((prev) => !prev);
  }, []);

  const handleThemeToggle = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }, []);

  const toggleSubmenu = useCallback((itemText) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [itemText]: !prevState[itemText],
    }));
  }, []);

  const value = {
    theme,
    setTheme,
    handleThemeToggle,
    isSidebarExpanded,
    setIsSidebarExpanded,
    isLargeScreen,
    setIsLargeScreen,
    toggleSidebar,
    openSubmenus,
    setOpenSubmenus,
    toggleSubmenu
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}