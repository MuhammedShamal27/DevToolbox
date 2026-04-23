"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Copy, RefreshCw } from 'lucide-react';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState('');
  const { addToast } = useToast();

  const generatePassword = () => {
    let charset = '';
    if (options.uppercase) charset += CHAR_SETS.uppercase;
    if (options.lowercase) charset += CHAR_SETS.lowercase;
    if (options.numbers) charset += CHAR_SETS.numbers;
    if (options.symbols) charset += CHAR_SETS.symbols;

    if (!charset) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!Object.values(next).some(Boolean)) {
        return prev; // Prevent unchecking all
      }
      return next;
    });
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    addToast('Password copied to clipboard', 'success');
  };

  // Basic entropy calc
  const getEntropy = () => {
    let pool = 0;
    if (options.uppercase) pool += 26;
    if (options.lowercase) pool += 26;
    if (options.numbers) pool += 10;
    if (options.symbols) pool += CHAR_SETS.symbols.length;
    
    if (pool === 0) return 0;
    return length * Math.log2(pool);
  };

  const entropy = getEntropy();
  let strengthLabel = 'Very Weak';
  let strengthColor = 'bg-red-500';
  
  if (entropy > 100) {
    strengthLabel = 'Very Strong';
    strengthColor = 'bg-emerald-500';
  } else if (entropy > 80) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-green-500';
  } else if (entropy > 60) {
    strengthLabel = 'Good';
    strengthColor = 'bg-blue-500';
  } else if (entropy > 40) {
    strengthLabel = 'Fair';
    strengthColor = 'bg-yellow-500';
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="tool-card space-y-8">
        
        {/* Output & Copy */}
        <div className="relative">
          <div className="bg-background border border-border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
             <span className="text-3xl tracking-wider font-mono break-all max-w-full text-primary font-medium">
               {password || 'Select options to generate'}
             </span>
             <div className="absolute top-4 right-4 flex gap-2">
                 <button onClick={generatePassword} className="p-2 bg-sidebar rounded-md hover:bg-sidebar-hover border border-border shadow-sm text-foreground/70 hover:text-foreground transition-colors" title="Regenerate">
                     <RefreshCw className="w-5 h-5" />
                 </button>
                 <button onClick={handleCopy} className="p-2 bg-primary text-primary-foreground rounded-md shadow-sm hover:opacity-90 transition-opacity" title="Copy">
                     <Copy className="w-5 h-5" />
                 </button>
             </div>
          </div>
          {/* Strength Bar */}
          <div className="mt-3 flex items-center justify-between px-1">
             <div className="flex-1 mr-4 bg-sidebar rounded-full h-1.5 overflow-hidden border border-border/50">
                 <div className={`h-full ${strengthColor} transition-all duration-500`} style={{ width: `${Math.min(100, entropy)}%` }} />
             </div>
             <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60 w-24 text-right">
                 {strengthLabel}
             </span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Options */}
        <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-sm font-medium">
                <label>Password Length</label>
                <span className="text-primary">{length} characters</span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-sidebar rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { key: 'uppercase', label: 'Uppercase (A-Z)' },
                { key: 'lowercase', label: 'Lowercase (a-z)' },
                { key: 'numbers', label: 'Numbers (0-9)' },
                { key: 'symbols', label: 'Symbols (!@#$)' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={options[key as keyof typeof options]}
                      onChange={() => toggleOption(key as keyof typeof options)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      options[key as keyof typeof options] 
                        ? 'bg-primary border-primary' 
                        : 'bg-sidebar border-border group-hover:border-primary/50'
                    }`}>
                      {options[key as keyof typeof options] && (
                         <svg className="w-3.5 h-3.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                         </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
}
