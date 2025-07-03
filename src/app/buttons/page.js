// app/buttons/page.js
'use client';
import Buttons from '../../components/Buttons/Buttons';
import { useTheme } from '../../components/ThemeProvider';

export default function ButtonsPage() {
  const { theme } = useTheme();
  return <Buttons theme={theme} />;
}