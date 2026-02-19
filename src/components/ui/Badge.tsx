import React from 'react';
import {
  CheckCircle2,
  Link as LinkIcon,
  Activity,
  User,
  AlertCircle } from
'lucide-react';
import { ConfidenceLevel } from '../../lib/types';
interface BadgeProps {
  level: ConfidenceLevel;
  showIcon?: boolean;
  className?: string;
}
export function Badge({ level, showIcon = true, className = '' }: BadgeProps) {
  const config = {
    verified: {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      label: 'Verified'
    },
    'link-backed': {
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: LinkIcon,
      label: 'Link-backed'
    },
    'activity-backed': {
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: Activity,
      label: 'Activity Match'
    },
    'self-reported': {
      color: 'bg-gray-100 text-gray-600 border-gray-200',
      icon: User,
      label: 'Self-reported'
    },
    pending: {
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertCircle,
      label: 'Pending'
    }
  };
  const style = config[level];
  const Icon = style.icon;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.color} ${className}`}>

      {showIcon && <Icon className="w-3 h-3 mr-1.5" />}
      {style.label}
    </span>);

}