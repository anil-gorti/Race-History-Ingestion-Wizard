import React, { useState } from 'react';
import { AthleteResult, ConfidenceLevel } from '../../lib/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Link as LinkIcon, Hash, Clock, ChevronUp } from 'lucide-react';
interface VerifyResultsProps {
  results: AthleteResult[];
  onUpdateResult: (id: string, updates: Partial<AthleteResult>) => void;
  onContinue: () => void;
}
function getConfidence(
bib: string,
link: string)
: {
  level: ConfidenceLevel;
  score: number;
  label: string;
} {
  if (link.trim())
  return {
    level: 'verified',
    score: 100,
    label: 'Timing link verified'
  };
  if (bib.trim())
  return {
    level: 'link-backed',
    score: 80,
    label: 'Bib number provided'
  };
  return {
    level: 'self-reported',
    score: 50,
    label: 'No proof added yet'
  };
}
export function VerifyResults({
  results,
  onUpdateResult,
  onContinue
}: VerifyResultsProps) {
  const confirmedResults = results.filter((r) => r.status === 'confirmed');
  const [fields, setFields] = useState<
    Record<
      string,
      {
        bib: string;
        link: string;
      }>>(

    () =>
    Object.fromEntries(
      confirmedResults.map((r) => [
      r.id,
      {
        bib: r.bib ?? '',
        link: r.timingLink ?? ''
      }]
      )
    )
  );
  const handleChange = (id: string, field: 'bib' | 'link', value: string) => {
    const updated = {
      ...fields[id],
      [field]: value
    };
    setFields((prev) => ({
      ...prev,
      [id]: updated
    }));
    const { level } = getConfidence(updated.bib, updated.link);
    onUpdateResult(id, {
      bib: updated.bib || undefined,
      timingLink: updated.link || undefined,
      confidence: level
    });
  };
  const handleContinue = () => {
    onContinue();
  };
  if (confirmedResults.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">No confirmed results to verify.</p>
        <Button onClick={onContinue} className="mt-4">
          Continue
        </Button>
      </div>);

  }
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Confidence explanation */}
      <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">
          How confidence scoring works
        </h3>
        <div className="space-y-2">
          {[
          {
            label: 'Timing link',
            score: '100%',
            color: 'bg-emerald-500',
            width: 'w-full',
            desc: 'Official results page or timing certificate'
          },
          {
            label: 'Bib number only',
            score: '80%',
            color: 'bg-blue-400',
            width: 'w-4/5',
            desc: 'We can look up your result from the bib'
          },
          {
            label: 'No proof',
            score: '50%',
            color: 'bg-gray-300',
            width: 'w-1/2',
            desc: 'Self-reported, pending verification'
          }].
          map(({ label, score, color, width, desc }) =>
          <div key={label} className="flex items-center gap-3">
              <div className="w-28 shrink-0">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} ${width} rounded-full`} />
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-700 w-8">
                {score}
              </span>
              <span className="text-xs text-gray-400">
                {label} — {desc}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Race cards */}
      <div className="space-y-3">
        {confirmedResults.map((result) => {
          const f = fields[result.id] ?? {
            bib: '',
            link: ''
          };
          const { level, score, label } = getConfidence(f.bib, f.link);
          return (
            <div
              key={result.id}
              className="bg-white border border-border rounded-2xl overflow-hidden shadow-card">

              {/* Card header */}
              <div className="px-5 py-4 flex items-start justify-between border-b border-border-light">
                <div>
                  <p className="font-semibold text-gray-900">
                    {result.raceName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {result.year} · {result.category}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge level={level} />
                  <span className="text-sm font-bold text-gray-700">
                    {score}%
                  </span>
                </div>
              </div>

              {/* Live confidence bar */}
              <div className="px-5 pt-3 pb-1">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${level === 'verified' ? 'bg-emerald-500' : level === 'link-backed' ? 'bg-blue-400' : 'bg-gray-300'}`}
                    style={{
                      width: `${score}%`
                    }} />

                </div>
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  {level !== 'verified' &&
                  <ChevronUp className="w-3 h-3 text-brand-500" />
                  }
                  {label}
                  {level !== 'verified' &&
                  <span className="text-brand-500 font-medium">
                      {level === 'self-reported' ?
                    ' — add bib or link to boost' :
                    ' — add timing link to reach 100%'}
                    </span>
                  }
                </p>
              </div>

              {/* Inputs */}
              <div className="px-5 pb-5 pt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Bib Number
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                    <input
                      type="text"
                      placeholder="e.g. 1847"
                      value={f.bib}
                      onChange={(e) =>
                      handleChange(result.id, 'bib', e.target.value)
                      }
                      className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white" />

                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Official Timing Link
                    <span className="ml-1.5 text-brand-500 font-semibold">
                      → 100%
                    </span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                    <input
                      type="url"
                      placeholder="https://results.example.com/..."
                      value={f.link}
                      onChange={(e) =>
                      handleChange(result.id, 'link', e.target.value)
                      }
                      className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all bg-white" />

                  </div>
                </div>
              </div>
            </div>);

        })}
      </div>

      {/* 24-48h notice */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800">
            Results take 24–48 hours to populate
          </p>
          <p className="text-xs text-amber-700/70 mt-0.5">
            Once you submit, we'll verify your results against official timing
            databases. Adding a bib number or timing link speeds this up
            significantly.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-gray-400">
          You can always add proof later from your profile.
        </p>
        <Button onClick={handleContinue} size="lg">
          Save & Continue
        </Button>
      </div>
    </div>);

}