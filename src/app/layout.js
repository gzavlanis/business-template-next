// app/layout.js
'use client'; // This directive is needed because ThemeProvider uses client-side hooks

import './globals.css'; // Your global Tailwind CSS imports
import { Inter } from 'next/font/google'; // Example font, adjust as needed

import ThemeProvider from '../components/ThemeProvider'; // Import ThemeProvider

const inter = Inter({ subsets: ['latin'] });

// IMPORTANT: No metadata export here.
// Metadata should only be exported from Server Components (e.g., individual page.js files
// that are not marked with 'use client', or server-only layouts).
// Since this root layout directly uses a client component (ThemeProvider),
// it becomes a client boundary, disallowing metadata export from this file.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ThemeProvider wraps the entire application to provide theme context */}
        <ThemeProvider>
          {/* Children will be either:
              1. Standalone pages like login/signup (which will *not* have the sidebar).
              2. The layout from app/(main)/layout.js, which then wraps its own children (your main app pages with the sidebar). */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
