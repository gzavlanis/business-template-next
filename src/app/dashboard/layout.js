// app/dashboard/layout.js
'use client'; // This is a Client Component because it uses client-side hooks/context

import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../../components/ThemeProvider';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footers/Footer';
import HomeFooter from '../../components/Footers/HomeFooter';
import Chat from '../../components/Chat/Chat';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    theme,
    handleThemeToggle,
    isSidebarExpanded, // We'll use this directly for margin calculation
    toggleSidebar,
    isLargeScreen,
    openSubmenus,
    toggleSubmenu
  } = useTheme();

  // Navigation handlers using Next.js router
  const handleNavigateToDashboard = () => router.push('/dashboard');
  const handleNavigateToProfile = () => router.push('/profile');
  const handleLogout = () => {
    // In a real app: Clear auth token/session here
    router.push('/login');
  };
  const handleNavigateToCalendar = () => router.push('/calendar');
  const handleNavigateToDataTables = () => router.push('/data-tables');
  const handleNavigateToProductTable = () => router.push('/product-table');
  const handleNavigateToComponents = () => router.push('/components');
  const handleNavigateToButtons = () => router.push('/buttons');
  const handleNavigateToContact = () => router.push('/contact');

  const appThemeClasses = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";

  // REVISED: Calculate dynamic left margin for the content wrapper.
  // This margin pushes the main content area to the right ONLY on large screens
  // when the sidebar is expanded. On small screens, it will overlay.
  const contentAreaMarginClass = isLargeScreen && isSidebarExpanded ? 'ml-64' : 'ml-15';

  // Add an overlay class for small screens when sidebar is expanded
  // This creates a semi-transparent background behind the main content area.
  const overlayClass = !isLargeScreen && isSidebarExpanded ? 'before:content-[""] before:absolute before:inset-0 before:bg-black before:opacity-50 before:z-30' : '';

  return (
    <div className={`flex min-h-screen font-sans ${appThemeClasses} overflow-x-hidden`}>
      {/* This div contains the Header, main content, and Chat. */}
      {/* We apply the dynamic margin-left here to account for the sidebar's width. */}
      {/* The overlayClass is also applied here for mobile drawer effect. */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${contentAreaMarginClass} ${overlayClass} ${!isLargeScreen ? 'w-full' : ''}`}>
        {/* <Header theme={theme} onThemeChange={handleThemeToggle} /> */}
        <main className={`flex-1 p-2 pt-2 overflow-y-auto flex flex-col`}>
          {children} {/* This is where the specific page content will be rendered */}
          <div className="flex-grow"></div> {/* Push footer to bottom */}
        </main>
        <Chat theme={theme} />
      </div>
    </div>
  );
}
