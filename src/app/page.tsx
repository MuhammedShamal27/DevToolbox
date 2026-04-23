"use client";

import { useToolStore } from '@/store/useToolStore';
import { tools } from '@/tools';
import { Search, Sparkles, ArrowRight, Video, FileText, Image as ImageIcon, Layout, Box, Globe, BarChart2 } from 'lucide-react';
import { useState } from 'react';

// Canva UI specific mock arrays to match the image style
const creationTypes = [
  { icon: Layout, label: 'Base64 Formatter', color: 'from-purple-500 to-indigo-600', toolId: 'base64' },
  { icon: Sparkles, label: 'Pass Generator', color: 'from-rose-400 to-pink-600', toolId: 'password-generator' },
  { icon: FileText, label: 'YAML Diff', color: 'from-fuchsia-400 to-purple-600', toolId: 'yaml-diff' },
  { icon: Globe, label: 'Website', color: 'from-blue-500 to-cyan-500', toolId: null },
  { icon: BarChart2, label: 'Metrics', color: 'from-emerald-400 to-teal-500', toolId: null },
];



export default function Home() {
  const activeToolId = useToolStore((state) => state.activeToolId);
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const [searchQuery, setSearchQuery] = useState('');

  const activeTool = tools.find((t) => t.id === activeToolId);

  // If a tool is active, render it in a nicely padded container
  if (activeTool) {
    const ToolComponent = activeTool.component;
    return (
      <div className="flex flex-col h-full animate-in fade-in duration-300 bg-background">
        <div className="flex-1 overflow-auto p-8 max-w-6xl mx-auto w-full">
          <ToolComponent />
        </div>
      </div>
    );
  }

  // DEFAULT HOME DASHBOARD (Canva Style)
  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar bg-background text-foreground pb-20">
      
      {/* MASSIVE HERO GRADIENT BANNER */}
      <div className="bg-hero-mesh relative overflow-hidden pt-16 pb-12 px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight mb-8 text-foreground/90">
            What will you <span className="text-gradient">build</span> today?
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground/40" />
            </div>
            <input 
              type="text" 
              className="w-full pl-12 pr-4 py-4 rounded-full bg-sidebar/90 backdrop-blur-sm border-2 border-transparent focus:border-primary/50 shadow-lg text-lg focus:outline-none transition-all placeholder:text-foreground/40 font-medium"
              placeholder="Search tools, formats and configurations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* HORIZONTAL CREATION TOOLS */}
      <div className="max-w-[1400px] mx-auto w-full px-8 -mt-6 relative z-20">
        <div className="flex overflow-x-auto hide-scrollbar gap-6 py-6 snap-x justify-center md:justify-start">
          {creationTypes.map((type, i) => (
            <button 
              key={i} 
              onClick={() => type.toolId && setActiveTool(type.toolId)}
              className="flex flex-col items-center gap-3 min-w-[80px] snap-center group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${type.color} text-white flex items-center justify-center shadow-md shadow-black/5 group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-300 relative overflow-hidden`}>
                {i === 0 && (
                   <span className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[9px] font-extrabold px-1.5 rounded-bl-lg font-sans">NEW</span>
                )}
                <type.icon className="w-7 h-7 stroke-2" />
              </div>
              <span className="text-[13px] font-semibold text-foreground/80 group-hover:text-foreground">
                {type.label}
              </span>
            </button>
          ))}
          <button className="flex flex-col items-center gap-3 min-w-[80px] snap-center group">
              <div className="w-16 h-16 rounded-2xl bg-sidebar border border-border text-foreground flex items-center justify-center shadow-sm group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300">
                <span className="text-xl leading-none tracking-[2px] font-bold pb-1">...</span>
              </div>
              <span className="text-[13px] font-semibold text-foreground/80 group-hover:text-foreground">
                More
              </span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-8 mt-6">

        {/* RECENTS GRID */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[22px] font-bold">Recents</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {tools.map((tool, i) => (
                 <div key={i} onClick={() => setActiveTool(tool.id)} className="tool-card group cursor-pointer p-0 overflow-hidden flex flex-col">
                    <div className="h-32 bg-sidebar-hover border-b border-border flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <tool.icon className="w-12 h-12 text-foreground/20 group-hover:text-primary transition-colors group-hover:scale-110 duration-300" />
                    </div>
                    <div className="p-3">
                        <h4 className="font-semibold text-sm truncate">{tool.name}</h4>
                        <p className="text-xs text-foreground/50 mt-1 truncate">{tool.category}</p>
                    </div>
                 </div>
              ))}
          </div>
        </div>

      </div>
    
    </div>
  );
}
