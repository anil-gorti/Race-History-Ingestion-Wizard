import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      }
      <div className="relative">
        {icon &&
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        }
        <input
          className={`
            w-full bg-white border border-border rounded-xl
            py-2.5 ${icon ? 'pl-10' : 'pl-4'} pr-4
            text-gray-900 placeholder-gray-400
            focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20
            transition-all duration-200
            ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props} />

      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>);

}