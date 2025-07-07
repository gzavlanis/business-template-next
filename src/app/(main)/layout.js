// app/(main)/layout.js
"use client"; // This is a Client Component because it uses client-side hooks/context

import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "../../components/ThemeProvider"; // Adjusted relative path
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footers/Footer";
import HomeFooter from "../../components/Footers/HomeFooter";
import Chat from "../../components/Chat/Chat";

export default function MainLayoutGroup({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    theme,
    handleThemeToggle,
    isSidebarExpanded,
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

  // Determine which footer to render based on the current pathname
  const renderSpecificFooter = () => {
    if (['/profile', '/contact', '/components'].includes(pathname)) {
      return <HomeFooter theme={theme} />;
    }
    return <Footer theme={theme} />;
  };

  // Check if the current page is the dashboard
  const isDashboardPage = pathname === '/dashboard';
  // Check if the current page is the components page
  const isComponentsPage = pathname === '/components';
  const isProductTable = pathname === '/product-table';
  const isCalendarPage = pathname === '/calendar';
  const isDataTablesPage = pathname === '/data-tables';

  const contentAreaOffsetClass = isLargeScreen
    ? (isSidebarExpanded ? 'ml-64' : 'ml-0') // On large screens, sidebar is always expanded, so ml-64
    : (isSidebarExpanded ? 'ml-0' : (isComponentsPage ? 'ml-0' : 'ml-8')); // On small screens: ml-0 if expanded (overlays), ml-16 if collapsed (for sidebar space), ml-0 if components page (no sidebar)

  // Add an overlay class for small screens when sidebar is expanded
  const overlayClass = !isLargeScreen && isSidebarExpanded && !isComponentsPage ? 'before:content-[""] before:absolute before:inset-0 before:bg-black before:opacity-50 before:z-30' : '';

  return (
    <div className={`flex min-h-screen font-sans ${appThemeClasses} overflow-x-hidden`}>
      {/* Conditionally render the Sidebar based on the current page */}
      {!isComponentsPage && (
        <Sidebar
          theme={theme}
          onThemeChange={handleThemeToggle}
          isSidebarExpanded={isSidebarExpanded}
          onToggleSidebar={toggleSidebar}
          isLargeScreen={isLargeScreen}
          openSubmenus={openSubmenus}
          onToggleSubmenu={toggleSubmenu}
          onNavigateToDashboard={handleNavigateToDashboard}
          onNavigateToCalendar={handleNavigateToCalendar}
          onNavigateToDataTables={handleNavigateToDataTables}
          onNavigateToProductTable={handleNavigateToProductTable}
          onNavigateToComponents={handleNavigateToComponents}
          onNavigateToButtons={handleNavigateToButtons}
          onNavigateToContact={handleNavigateToContact}
          hideThemeToggle={false}
        />
      )}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${contentAreaOffsetClass} ${overlayClass} ${!isLargeScreen ? 'w-full' : ''}`}>
        {/* Conditionally render the Header based on the current page */}
        {!isDashboardPage && !isProductTable && !isCalendarPage && !isDataTablesPage && <Header theme={theme} onThemeChange={handleThemeToggle} />}
        {/* Main content area padding remains px-4 for mobile */}
        <main className={`flex-1 px-8 py-4 sm:px-8 sm:py-8 pt-20 overflow-y-auto overflow-x-hidden flex flex-col w-full max-w-full mx-auto ${isDashboardPage ? 'pt-8' : ''}`}>
          {children}
          <div className="flex-grow"></div>
          {renderSpecificFooter()}
        </main>
        <Chat theme={theme} />
      </div>
    </div>
  );
}