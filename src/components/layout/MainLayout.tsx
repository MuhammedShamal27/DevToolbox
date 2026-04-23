"use client";

import { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useToolStore } from '@/store/useToolStore';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useToolStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden relative isolate">
        {/* Removed standard padding so Children can handle edge-to-edge gradient logic */}
        <div className="flex-1 overflow-auto h-full w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
