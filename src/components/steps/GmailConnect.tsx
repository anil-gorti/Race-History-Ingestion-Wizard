import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Shield, Search, ChevronRight } from 'lucide-react';
interface GmailConnectProps {
  onConnect: () => void;
  onSkip: () => void;
}
export function GmailConnect({ onConnect, onSkip }: GmailConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      onConnect();
    }, 1500);
  };
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Card */}
      <div className="bg-white border border-border rounded-2xl p-8 text-center shadow-card">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg width="32" height="32" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 5C13.5 5 5 13.5 5 24s8.5 19 19 19 19-8.5 19-19S34.5 5 24 5zm0 8l8 6-8 6-8-6 8-6z" />

            <path
              fill="#4285F4"
              d="M43 24c0 10.5-8.5 19-19 19V5c10.5 0 19 8.5 19 19z"
              opacity=".3" />

          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
          Connect your Gmail
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-7 leading-relaxed">
          We'll scan your inbox for race registration emails to automatically
          discover races you've signed up for.
        </p>

        {/* Google OAuth Button */}
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-300 rounded-xl px-6 py-3 transition-all duration-200 shadow-sm disabled:opacity-60 mx-auto">

          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              fill="#4285F4"
              d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" />

            <path
              fill="#34A853"
              d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" />

            <path
              fill="#FBBC05"
              d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" />

            <path
              fill="#EA4335"
              d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.31z" />

          </svg>
          {isConnecting ? 'Connecting...' : 'Continue with Google'}
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-3">
        {[
        {
          icon: Shield,
          color: 'text-emerald-500 bg-emerald-50',
          title: 'Secure & Private',
          desc: 'We only read race-related emails. Personal messages stay private.'
        },
        {
          icon: Search,
          color: 'text-blue-500 bg-blue-50',
          title: 'Smart Detection',
          desc: 'We look for registration confirmations and bib number emails.'
        },
        {
          icon: ChevronRight,
          color: 'text-brand-500 bg-brand-50',
          title: "You're in Control",
          desc: 'Review every race we find before adding to your profile.'
        }].
        map(({ icon: Icon, color, title, desc }) =>
        <div
          key={title}
          className="bg-white border border-border rounded-xl p-4 shadow-card">

            <div
            className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center mb-3`}>

              <Icon className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              {title}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
          </div>
        )}
      </div>

      <div className="text-center pt-2">
        <button
          onClick={onSkip}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors">

          Skip — I'll add my races manually
        </button>
      </div>
    </div>);

}