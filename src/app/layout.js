// app/layout.js
'use client'; // This directive is needed because ThemeProvider and its consumers use client-side hooks

import './globals.css'; // Your global Tailwind CSS imports
import { Inter } from 'next/font/google'; // Example font, adjust as needed

import ThemeProvider, { useTheme } from '../components/ThemeProvider'; // Import ThemeProvider and useTheme
import Sidebar from '../components/Sidebar/Sidebar'; // Import Sidebar
import Header from '../components/Header/Header';   // Import Header
import Footer from '../components/Footers/Footer'; // Import Footer (for general use)
import HomeFooter from '../components/Footers/HomeFooter'; // Import HomeFooter (for specific pages if still needed)
import Chat from '../components/Chat/Chat';         // Import Chat

import { useRouter, usePathname } from 'next/navigation'; // For navigation and path checks

const inter = Inter({ subsets: ['latin'] });

// REMOVED: export const metadata object from this client component file.
// If specific metadata is needed, it should be defined in individual page.js files
// that are Server Components.

// This is the RootLayout component that will wrap all pages.
// It is now a Client Component because it directly uses useTheme and other client-side logic.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ThemeProvider wraps the entire application to provide theme context */}
        <ThemeProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}

// A separate component to encapsulate the layout logic that relies on useTheme and other hooks.
// This is necessary because RootLayout itself cannot directly use 'use client' if it's meant
// to be a Server Component boundary, but in this case, the entire layout is client-side.
// We are effectively making the entire app client-side from the root layout.
function LayoutContent({ children }) {
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
  // This logic needs to be adjusted if login/signup pages should have no footer or a different one.
  const renderSpecificFooter = () => {
    // For login/signup pages, you might want no footer or a different one.
    // Assuming login/signup pages are '/' or '/login' or '/signup'
    if (pathname === '/' || pathname === '/login' || pathname === '/signup') {
      return null; // No footer for login/signup
    }
    if (['/profile', '/contact', '/components'].includes(pathname)) {
      return <HomeFooter theme={theme} />;
    }
    return <Footer theme={theme} />;
  };

  // Dynamic left margin for the content wrapper.
  // This margin pushes the main content area to the right ONLY on large screens
  // when the sidebar is expanded. On small screens, it remains 0.
  const contentAreaOffsetClass = isLargeScreen && isSidebarExpanded ? 'ml-2' : 'ml-0';

  // Add an overlay class for small screens when sidebar is expanded
  const overlayClass = !isLargeScreen && isSidebarExpanded ? 'before:content-[""] before:absolute before:inset-0 before:bg-black before:opacity-50 before:z-30' : '';

  // Conditionally render the main app layout (with sidebar, header, chat)
  // versus just the children for login/signup pages.
  // This is a crucial decision: do login/signup *really* need the sidebar?
  // If not, the previous route group approach is better.
  // If yes, then the sidebar will always be present.
  const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/signup';

  return (
    <div className={`flex min-h-screen font-sans ${appThemeClasses} overflow-x-hidden`}>
      {/* Sidebar is always present */}
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

      {/* Main content area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${contentAreaOffsetClass} ${overlayClass} ${!isLargeScreen ? 'w-full' : ''}`}>
        {/* Header is always present */}
        {/* <Header theme={theme} onThemeChange={handleThemeToggle} /> */}
        <main className={`flex-1 p-5 pt-10 overflow-y-auto flex flex-col`}>
          {children} {/* This is where the specific page content will be rendered */}
          <div className="flex-grow"></div> {/* Push footer to bottom */}
          {renderSpecificFooter()}
        </main>
        {/* Chat is always present */}
        <Chat theme={theme} />
      </div>
    </div>
  );
}
