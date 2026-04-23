"use client";

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';
import { Copy, Trash2, FileUp } from 'lucide-react';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const { addToast } = useToast();

  const handleProcess = (value: string, currentMode: 'encode' | 'decode') => {
    try {
      if (!value) {
        setOutput('');
        return;
      }
      
      if (currentMode === 'encode') {
        // Handle utf-8 
        const utf8Bytes = new TextEncoder().encode(value);
        let binaryString = "";
        for (let i = 0; i < utf8Bytes.length; i++) {
          binaryString += String.fromCodePoint(utf8Bytes[i]);
        }
        setOutput(btoa(binaryString));
      } else {
        const binaryString = atob(value);
        const bytes = new Uint8Array(
          binaryString.split('').map((char) => char.charCodeAt(0))
        );
        setOutput(new TextDecoder().decode(bytes));
      }
    } catch (e) {
      setOutput('Error: Invalid input for chosen operation');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);
    handleProcess(val, mode);
  };

  const toggleMode = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    handleProcess(input, newMode);
  };

  const handleCopy = () => {
    if (!output || output.startsWith('Error')) return;
    navigator.clipboard.writeText(output);
    addToast('Copied to clipboard', 'success');
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInput(result);
      handleProcess(result, mode);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-sidebar p-4 rounded-lg border border-border mt-4">
        <div className="flex bg-background rounded-md p-1 border border-border">
          <button
            onClick={() => toggleMode('encode')}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
              mode === 'encode' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => toggleMode('decode')}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-colors ${
              mode === 'decode' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
          >
            Decode
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="tool-button-secondary cursor-pointer">
            <FileUp className="w-4 h-4 mr-2" />
            Upload File
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <button onClick={clearAll} className="tool-button-secondary">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/80 flex items-center justify-between">
            Input ({mode === 'encode' ? 'Text' : 'Base64'})
          </label>
          <textarea
            className="tool-input flex-1 resize-none font-mono font-medium"
            placeholder={`Enter ${mode === 'encode' ? 'text' : 'base64'} here...`}
            value={input}
            onChange={handleInputChange}
          />
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground/80 flex items-center justify-between">
            <span>Output ({mode === 'encode' ? 'Base64' : 'Text'})</span>
            <button 
              onClick={handleCopy}
              disabled={!output || output.startsWith('Error')}
              className="text-primary hover:opacity-80 disabled:opacity-50 transition-opacity p-1"
              title="Copy output"
            >
              <Copy className="w-4 h-4" />
            </button>
          </label>
          <textarea
            className={`tool-input flex-1 resize-none font-mono ${output.startsWith('Error') ? 'text-red-500 border-red-500/50' : 'text-primary'}`}
            readOnly
            value={output}
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
