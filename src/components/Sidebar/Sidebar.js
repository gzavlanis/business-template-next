// components/Sidebar/Sidebar.js
'use client'; // This directive makes this a Client Component

import React from "react";
import Link from 'next/link'; // Import Link for navigation
import { usePathname } from 'next/navigation'; // Hook to get the current path for active link styling

import {
  Sun,
  Moon,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Home,
  Settings,
  Users,
  BarChart,
  ShoppingCart,
  Briefcase,
  FileText,
  Bell,
  Mail,
  Calendar,
  Table,
  Columns,
  LayoutGrid,
  MousePointer2, // Changed from MousePointer for Lucide compatibility
  MapPin
} from "lucide-react";

import { useTheme } from '../ThemeProvider'; // Import your custom theme context hook

function Sidebar({
  // Removed 'theme' and 'onThemeChange' props, as they will be accessed via useTheme context
  isSidebarExpanded,
  onToggleSidebar,
  isLargeScreen,
  openSubmenus,
  onToggleSubmenu,
  // Removed all 'onNavigateToX' props, as navigation will be handled by next/link
}) {
  // Access theme state and toggle function from the global ThemeContext
  const { theme, handleThemeToggle } = useTheme();
  // Get the current pathname to highlight the active link
  const pathname = usePathname();

  // Dynamic Tailwind CSS Classes (based on the 'theme' from context)
  const sidebarThemeClasses = theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-900";

  // Function to determine link styling based on active path
  const getLinkClasses = (href) => {
    const isActive = pathname === href;
    return `
      flex items-center p-2 my-1 rounded-lg text-sm font-medium
      transition-colors duration-200 group
      ${isActive
        ? (theme === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-700 text-white shadow-md')
        : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300')}
    `;
  };

  // Function to determine submenu link styling based on active path
  const getSubmenuLinkClasses = (href) => {
    const isActive = pathname === href;
    return `
      flex items-center p-2 my-1 rounded-lg text-xs font-medium
      transition-colors duration-200 group
      ${isActive
        ? (theme === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-700 text-white shadow-md')
        : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-300')}
    `;
  };

  const iconColorClasses = theme === "dark" ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-gray-900";

  const sidebarWidthClass = isLargeScreen ? "w-64" : isSidebarExpanded ? "w-64" : "w-16";
  const textVisibilityClass = isLargeScreen || isSidebarExpanded ? "block" : "hidden";

  // Define sidebar menu items with Next.js 'href'
  // Note: For items with subItems, the main item itself is a button to toggle the submenu.
  // The actual navigation happens via Link components inside the submenu.
  const sidebarMenuItems = [
    { icon: Home, text: "Dashboard", href: "/dashboard" },
    { icon: Users, text: "Profile", href: "/profile" }, // Changed 'Users' to 'Profile' based on App.js usage
    { icon: Settings, text: "Settings", href: "/settings" },
    {
      icon: Users, // Reusing Users icon for demo, you might want a different one for 'Users' section
      text: "Users",
      subItems: [
        { text: "All Users", href: "/users" },
        { text: "Add New User", href: "/users/add" },
        { text: "User Groups", href: "/users/groups" },
      ],
    },
    {
      icon: Briefcase,
      text: "Projects",
      subItems: [
        { text: "All Projects", href: "/projects" },
        { text: "My Projects", href: "/projects/my" },
        { text: "New Project", href: "/projects/new" },
      ],
    },
    { icon: BarChart, text: "Analytics", href: "/analytics" },
    { icon: ShoppingCart, text: "Products", href: "/products" },
    {
      icon: FileText,
      text: "Reports",
      subItems: [
        { text: "Sales Report", href: "/reports/sales" },
        { text: "Activity Log", href: "/reports/activity" },
        { text: "Custom Reports", href: "/reports/custom" },
      ],
    },
    { icon: Bell, text: "Notifications", href: "/notifications" },
    { icon: Mail, text: "Messages", href: "/messages" },
    { icon: Calendar, text: "Calendar", href: "/calendar" },
    { icon: Table, text: 'Data Tables', href: "/data-tables" },
    { icon: Columns, text: 'Products Table', href: "/product-table" },
    { icon: LayoutGrid, text: 'Components', href: "/components" },
    { icon: MousePointer2, text: 'Buttons', href: "/buttons" },
    { icon: MapPin, text: 'Contact Us', href: "/contact" },
  ];

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ease-in-out
        ${sidebarWidthClass} p-4 rounded-r-lg shadow-lg flex-shrink-0 ${sidebarThemeClasses}
        fixed top-0 left-0 z-40`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          {isLargeScreen || isSidebarExpanded ? (
            <h2 className={`text-2xl font-bold ${textVisibilityClass} whitespace-nowrap overflow-hidden`}>My App</h2>
          ) : null}

          {/* Theme Toggle Button:
              - Calls the `handleThemeToggle` from useTheme context.
              - The icon dynamically changes based on the `theme` from context. */}
          {(isLargeScreen || isSidebarExpanded) && (
            <button
              onClick={handleThemeToggle} // Use the function from context
              className={`p-1 rounded-md focus:outline-none transition-colors duration-200
                ${theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          )}
        </div>

        {/* Sidebar Collapse/Expand Button */}
        {!isLargeScreen && (
          <button
            onClick={onToggleSidebar} // Still uses the prop for sidebar expansion
            className={`p-2 rounded-md focus:outline-none ${
              theme === "dark" ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
            }`}
            aria-label="Toggle sidebar"
          >
            {isSidebarExpanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul>
          {sidebarMenuItems.map((item, index) => (
            <li key={index} className="mb-2">
              {item.subItems ? (
                // If item has sub-items, it's a button to toggle the submenu
                <>
                  <button
                    onClick={() => onToggleSubmenu(item.text)} // Still uses the prop for submenu toggle
                    className={`flex items-center justify-between w-full space-x-3 p-2 rounded-lg transition-colors duration-200 group focus:outline-none
                      ${getLinkClasses(item.href)}`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} className={`${iconColorClasses} min-w-[20px]`} />
                      <span className={`text-lg font-medium whitespace-nowrap ${textVisibilityClass} overflow-hidden`}>{item.text}</span>
                    </div>
                    <div className={`${textVisibilityClass}`}>
                      {openSubmenus[item.text] ? (
                        <ChevronUp size={16} className={`${iconColorClasses}`} />
                      ) : (
                        <ChevronDown size={16} className={`${iconColorClasses}`} />
                      )}
                    </div>
                  </button>
                  {openSubmenus[item.text] && (
                    <ul className={`ml-4 mt-2 border-l-2 ${theme === "dark" ? "border-gray-600" : "border-gray-400"} pl-3`}>
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-1">
                          {/* Use Link component for submenu items */}
                          <Link
                            href={subItem.href} // Use href for Next.js navigation
                            className={getSubmenuLinkClasses(subItem.href)} // Use getSubmenuLinkClasses for styling
                          >
                            <span className={`whitespace-nowrap ${textVisibilityClass} overflow-hidden`}>{subItem.text}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // If no sub-items, it's a direct navigation link
                <Link
                  href={item.href} // Use href for Next.js navigation
                  className={getLinkClasses(item.href)} // Use getLinkClasses for styling
                >
                  <item.icon size={20} className={`${iconColorClasses} min-w-[20px]`} />
                  <span className={`text-lg font-medium whitespace-nowrap ${textVisibilityClass} overflow-hidden`}>{item.text}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
