import React from 'react';
import { Button } from '../ui/Button';
import { CheckCircle2, Share2 } from 'lucide-react';
export function FinalReview() {
  return (
    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500 py-12">
      <div className="w-24 h-24 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-brand-500/20">
        <CheckCircle2 className="w-12 h-12 text-white" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 font-display mb-3">
          Legacy Reconstructed
        </h2>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
          You've successfully built your running resume. Your history is now
          being verified against official records.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button size="lg">Go to Dashboard</Button>
        <Button
          size="lg"
          variant="secondary"
          leftIcon={<Share2 className="w-4 h-4" />}>

          Share Profile
        </Button>
      </div>
    </div>);

}