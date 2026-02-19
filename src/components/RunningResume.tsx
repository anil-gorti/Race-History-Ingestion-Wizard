import React from 'react';
import { Trophy, Calendar, Timer, TrendingUp } from 'lucide-react';
import { AthleteResult } from '../lib/types';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
interface RunningResumeProps {
  results: AthleteResult[];
  credibilityScore: number;
}
export function RunningResume({
  results,
  credibilityScore
}: RunningResumeProps) {
  const sortedResults = [...results].sort((a, b) => b.year - a.year);
  const confirmedResults = results.filter((r) => r.status === 'confirmed');
  return (
    <div className="h-full flex flex-col bg-white border-l border-border">
      {/* Header */}
      <div className="p-6 border-b border-border-light">
        <h2 className="text-lg font-bold text-gray-900 font-display flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-brand-500" />
          Running Resume
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Your athletic legacy, verified.
        </p>
        <ProgressBar value={credibilityScore} label="Credibility Score" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 border-b border-border-light">
        <div className="p-4 border-r border-border-light">
          <div className="text-2xl font-bold text-gray-900">
            {confirmedResults.length}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
            Races
          </div>
        </div>
        <div className="p-4">
          <div className="text-2xl font-bold text-gray-900">
            {confirmedResults.filter((r) => r.confidence === 'verified').length}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
            Verified
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-6">
        {confirmedResults.length === 0 ?
        <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-40">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 max-w-[180px]">
              Add your first race to start building your resume.
            </p>
          </div> :

        <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-0 before:w-px before:bg-gray-100">
            {sortedResults.
          filter((r) => r.status === 'confirmed').
          map((result) =>
          <div key={result.id} className="relative pl-10 group">
                  <div className="absolute left-1.5 top-2 w-4 h-4 rounded-full bg-white border-2 border-brand-400 z-10" />
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                          {result.raceName}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {result.year}
                          </span>
                          {result.time &&
                    <span className="flex items-center gap-1">
                              <Timer className="w-3 h-3" /> {result.time}
                            </span>
                    }
                        </div>
                      </div>
                      <Badge level={result.confidence} showIcon={false} />
                    </div>
                    {(result.bib || result.category) &&
              <div className="flex gap-3 text-xs text-gray-400 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-border-light">
                        {result.bib && <span>Bib #{result.bib}</span>}
                        {result.category && <span>{result.category}</span>}
                      </div>
              }
                  </div>
                </div>
          )}
          </div>
        }
      </div>

      <div className="p-4 border-t border-border-light">
        <div className="text-xs text-center text-gray-400">
          PRFM Athlete Profile • Last updated just now
        </div>
      </div>
    </div>);

}