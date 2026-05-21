"use client";

import { useToolStore } from '@/store/useToolStore';
import { Moon, Sun, Home, User } from 'lucide-react';
import { useState } from 'react';

export function Sidebar() {
  const { isDarkMode, toggleDarkMode, setActiveTool, activeToolId } = useToolStore();
  
  const navItems: { icon: any; label: string; id: string | null; premium?: boolean }[] = [
    { icon: Home, label: 'Home', id: null },
  ];

  return (
    <nav className="w-[88px] h-full flex flex-col items-center py-4 bg-sidebar border-r border-border shadow-[2px_0_8px_rgba(0,0,0,0.02)] z-50 flex-shrink-0 hide-scrollbar overflow-y-auto">
      {/* Main Nav Items */}
      <div className="flex flex-col gap-2 w-full px-2 mt-2">
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveTool(null)} // Route to home for UI demo
            className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-colors group relative ${
              activeToolId === item.id 
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground/70 hover:bg-sidebar-hover hover:text-foreground'
            }`}
          >
            <div className="relative">
              <item.icon className={`w-6 h-6 stroke-[1.5px] ${activeToolId === item.id ? 'fill-primary/20' : ''}`} />
              {item.premium && (
                <div className="absolute -top-1 -right-2 text-yellow-500">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2L15 9l8 1-6 5 2 9-7-4-7 4 2-9-6-5 8-1z"/></svg>
                </div>
              )}
            </div>
            <span className="text-[10px] font-medium text-center leading-tight group-hover:font-semibold">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 w-full px-2 flex flex-col gap-2">
        {/* Toggle Theme inline */}
        <button
          onClick={toggleDarkMode}
          className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl text-foreground/70 hover:bg-sidebar-hover hover:text-foreground transition-colors"
        >
          {isDarkMode ? <Sun className="w-6 h-6 stroke-[1.5px]" /> : <Moon className="w-6 h-6 stroke-[1.5px]" />}
          <span className="text-[10px] font-medium text-center">Theme</span>
        </button>
        {/* User icon */}
        <button className="flex flex-col items-center justify-center gap-1.5 p-2 mt-2 rounded-xl text-foreground/70 hover:bg-sidebar-hover hover:text-foreground transition-colors">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[10px] font-medium text-center">User</span>
        </button>
      </div>
    </nav>
  );
}
