// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // You'd add your actual authentication check here
    // For now, it redirects to login
    router.replace('/login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <p>Redirecting...</p>
    </div>
  );
}