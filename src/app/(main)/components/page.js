// app/components/page.js
'use client';
import Components from '../../../components/Cards/Components';
// HomeFooter is now handled by the layout's conditional rendering based on pathname
import { useTheme } from '../../../components/ThemeProvider';

export default function ComponentsPage() {
  const { theme } = useTheme();
  return <Components theme={theme} />;
}