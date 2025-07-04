// app/calendar/page.js
'use client';
import Calendar from '../../../components/Calendars/Calendar';
import { useTheme } from '../../../components/ThemeProvider';

export default function CalendarPage() {
  const { theme } = useTheme();
  return <Calendar theme={theme} />;
}