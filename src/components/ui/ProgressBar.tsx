import React from 'react';
interface ProgressBarProps {
  value: number;
  label?: string;
}
export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="w-full">
      {label &&
      <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-500 font-medium">{label}</span>
          <span className="text-brand-600 font-bold">{value}%</span>
        </div>
      }
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-500 transition-all duration-1000 ease-out rounded-full"
          style={{
            width: `${value}%`
          }} />

      </div>
    </div>);

}