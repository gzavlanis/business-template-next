// app/data-tables/page.js
'use client';
import SimpleTables from '../../components/Tables/SimpleTables';
import { useTheme } from '../../components/ThemeProvider';

export default function DataTablesPage() {
  const { theme } = useTheme();
  return <SimpleTables theme={theme} />;
}