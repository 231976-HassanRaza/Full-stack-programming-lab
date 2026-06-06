'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import Chatbot from '@/components/Chatbot';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
        <span style={{ marginLeft: 12, color: 'var(--text-muted)' }}>Loading...</span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
