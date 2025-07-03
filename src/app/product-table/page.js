// app/product-table/page.js
'use client';
import DataTable from '../../components/Tables/DataTable';
import { useTheme } from '../../components/ThemeProvider';

export default function ProductTablePage() {
  const { theme } = useTheme();
  return <DataTable theme={theme} />;
}