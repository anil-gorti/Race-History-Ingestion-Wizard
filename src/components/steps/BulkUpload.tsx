import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Upload, Download } from 'lucide-react';
interface BulkUploadProps {
  onContinue: () => void;
  onSkip: () => void;
}
export function BulkUpload({ onContinue, onSkip }: BulkUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Info Card */}
      <div className="bg-white border border-border rounded-2xl p-8 text-center shadow-card">
        <h3 className="text-xl font-bold text-gray-900 font-display mb-3">
          Import Your Race History
        </h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
          Upload your Excel file to automatically find and claim your race
          results. We'll match your races and help you build your profile.
        </p>
        <Button
          variant="outline-primary"
          leftIcon={<Download className="w-4 h-4" />}>

          Download Template
        </Button>
      </div>

      {/* Upload Zone */}
      <div
        className={`
          border-2 border-dashed rounded-2xl p-14 text-center transition-all duration-200 cursor-pointer
          ${isDragging ? 'border-brand-400 bg-brand-50' : 'border-gray-300 bg-white hover:border-gray-400'}
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}>

        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Upload className="w-7 h-7 text-gray-400" />
        </div>
        <p className="font-semibold text-gray-800 mb-1.5">
          Click or drag Excel file here
        </p>
        <p className="text-sm text-gray-400">Accepted formats: .xlsx, .xls</p>
      </div>

      {/* Footer Card */}
      <div className="bg-white border border-border rounded-2xl px-6 py-5 shadow-card flex items-center justify-between">
        <Button variant="outline" onClick={onSkip}>
          Skip for now
        </Button>
        <Button variant="primary" onClick={onContinue}>
          Proceed
        </Button>
      </div>
    </div>);

}