// app/contact/page.js
'use client';
import Contact from '../../components/Contact/Contact';
// HomeFooter is now handled by the layout's conditional rendering based on pathname
import { useTheme } from '../../components/ThemeProvider';

export default function ContactPage() {
  const { theme } = useTheme();
  return <Contact theme={theme} />;
}