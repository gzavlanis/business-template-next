// app/profile/page.js
'use client';
import UserPage from '../../components/User/UserPage';
// HomeFooter is now handled by the layout's conditional rendering based on pathname
import { useTheme } from '../../components/ThemeProvider';

export default function ProfilePage() {
  const { theme } = useTheme();
  const handleUpdateProfile = (profileData) => {
    console.log("Profile updated:", profileData);
    // Implement actual update logic (API call etc.)
  };

  return (
    <UserPage theme={theme} onUpdateProfile={handleUpdateProfile} />
  );
}