import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { SUGGESTED_CHIPS } from '../../lib/mockData';
interface MemoryCaptureProps {
  onNext: (input: string) => void;
  initialValue?: string;
}
export function MemoryCapture({
  onNext,
  initialValue = ''
}: MemoryCaptureProps) {
  const [input, setInput] = useState(initialValue);
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) onNext(input);
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Tata Mumbai Marathon 2023, Delhi Half Marathon..."
          className="w-full bg-white text-gray-900 text-base placeholder:text-gray-400 rounded-2xl py-5 pl-12 pr-32 border border-border shadow-card focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all"
          autoFocus />

        <div className="absolute right-3 top-3 bottom-3">
          <Button type="submit" disabled={!input.trim()} className="h-full">
            Continue
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Quick Add Popular Races
        </p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_CHIPS.map((chip) =>
          <button
            key={chip}
            onClick={() => setInput(chip)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-full border border-border hover:border-brand-300 transition-all text-sm shadow-card">

              <Plus className="w-3 h-3 text-gray-400" />
              {chip}
            </button>
          )}
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <h4 className="text-amber-800 font-medium text-sm mb-1">
              Don't worry about details yet
            </h4>
            <p className="text-xs text-amber-700/70">
              Just type what you remember. We'll help you find the exact dates,
              times, and official records in the next step.
            </p>
          </div>
        </div>
      </div>
    </div>);

}