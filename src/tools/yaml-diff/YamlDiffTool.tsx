"use client";

import { useState } from 'react';
import * as Diff from 'diff';
import { ArrowRightLeft } from 'lucide-react';

export function YamlDiffTool() {
  const [yaml1, setYaml1] = useState('');
  const [yaml2, setYaml2] = useState('');

  const getDiff = () => {
    if (!yaml1 && !yaml2) return null;
    return Diff.diffLines(yaml1, yaml2);
  };

  const diffResult = getDiff();

  return (
    <div className="flex flex-col h-full gap-4 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 mt-4 max-h-[50%] min-h-[300px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium px-1">Original YAML</label>
          <textarea
             className="tool-input flex-1 font-mono text-sm resize-none"
             placeholder="Paste original YAML here..."
             value={yaml1}
             onChange={(e) => setYaml1(e.target.value)}
             spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium px-1">Modified YAML</label>
          <textarea
             className="tool-input flex-1 font-mono text-sm resize-none border-primary/20 focus:ring-primary/50"
             placeholder="Paste modified YAML here..."
             value={yaml2}
             onChange={(e) => setYaml2(e.target.value)}
             spellCheck={false}
          />
        </div>
      </div>

      <div className="flex items-center justify-center py-2">
         <ArrowRightLeft className="w-5 h-5 text-foreground/30 rotate-90 md:rotate-0" />
      </div>

      <div className="tool-card flex-1 overflow-auto flex flex-col pt-4 min-h-[300px]">
          <h3 className="text-sm font-medium mb-4 sticky top-0 bg-sidebar pb-2 z-10 border-b border-border">Diff Result</h3>
          <div className="font-mono text-sm whitespace-pre-wrap flex-1">
            {!diffResult && <span className="text-foreground/40 italic">Waiting for input...</span>}
            {diffResult?.map((part, index) => {
              const colorClass = part.added 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : part.removed 
                  ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                  : 'text-foreground/80';
                  
              const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';

              return (
                <span key={index} className={`block ${colorClass} py-[1px] px-2 rounded-sm`}>
                  {part.value.split('\n').filter((l, i, a) => l !== '' || i !== a.length - 1).map((line, i) => (
                      <div key={i}><span className="opacity-50 select-none mr-2">{prefix}</span>{line}</div>
                  ))}
                </span>
              );
            })}
          </div>
      </div>
    </div>
  );
}
