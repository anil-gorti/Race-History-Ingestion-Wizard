import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  dashed?: boolean;
}
export function Card({
  children,
  className = '',
  onClick,
  hover = false,
  dashed = false
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl overflow-hidden
        ${dashed ? 'border-2 border-dashed border-gray-300' : 'border border-border shadow-card'}
        ${hover ? 'hover:border-brand-300 hover:shadow-card-md cursor-pointer transition-all duration-200' : ''}
        ${className}
      `}>

      {children}
    </div>);

}