import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
interface BulkAddProps {
  onFinish: () => void;
}
export function BulkAdd({ onFinish }: BulkAddProps) {
  const [rows, setRows] = useState([
  {
    id: 1,
    race: '',
    year: '',
    time: '',
    bib: ''
  },
  {
    id: 2,
    race: '',
    year: '',
    time: '',
    bib: ''
  },
  {
    id: 3,
    race: '',
    year: '',
    time: '',
    bib: ''
  }]
  );
  const addRow = () =>
  setRows((prev) => [
  ...prev,
  {
    id: Date.now(),
    race: '',
    year: '',
    time: '',
    bib: ''
  }]
  );
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-card">
        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-border-light bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="col-span-2">Race Name</div>
          <div>Year</div>
          <div>Time</div>
          <div>Bib</div>
        </div>
        {rows.map((row, i) =>
        <div
          key={row.id}
          className={`grid grid-cols-5 gap-4 px-5 py-3.5 items-center ${i < rows.length - 1 ? 'border-b border-border-light' : ''}`}>

            <div className="col-span-2">
              <input
              type="text"
              placeholder="Race Name"
              className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-300 text-sm p-0 focus:outline-none" />

            </div>
            <input
            type="text"
            placeholder="2023"
            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-300 text-sm p-0 focus:outline-none" />

            <input
            type="text"
            placeholder="HH:MM:SS"
            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-300 text-sm p-0 focus:outline-none" />

            <input
            type="text"
            placeholder="Optional"
            className="w-full bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-300 text-sm p-0 focus:outline-none" />

          </div>
        )}
        <div className="px-5 py-3 border-t border-border-light">
          <button
            onClick={addRow}
            className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-600 font-medium transition-colors">

            <Plus className="w-4 h-4" /> Add Row
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={onFinish}>Save & Continue</Button>
      </div>
    </div>);

}