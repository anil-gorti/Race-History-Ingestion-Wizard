import React from 'react';
import { AthleteResult } from '../../lib/types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Timer,
  Hash,
  Trophy } from
'lucide-react';
interface ClaimResultsProps {
  results: AthleteResult[];
  onClaim: (id: string) => void;
  onDismiss: (id: string) => void;
  onContinue: () => void;
}
export function ClaimResults({
  results,
  onClaim,
  onDismiss,
  onContinue
}: ClaimResultsProps) {
  const draftResults = results.filter((r) => r.status === 'draft');
  const confirmedCount = results.filter((r) => r.status === 'confirmed').length;
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {draftResults.length > 0 &&
      <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <Trophy className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-700 font-medium text-sm">
            Found {draftResults.length} official result
            {draftResults.length !== 1 ? 's' : ''}!
          </span>
        </div>
      }

      {draftResults.length > 0 ?
      <div className="space-y-3">
          {draftResults.map((result, index) =>
        <div
          key={result.id}
          className="bg-white border border-border rounded-2xl p-5 shadow-card"
          style={{
            animationDelay: `${index * 80}ms`
          }}>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-xl">
                    🏅
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">
                        {result.raceName}
                      </h3>
                      <Badge level={result.confidence} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Time
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {result.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Bib
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          #{result.bib}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                          Category
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          {result.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {result.raceDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                size="sm"
                onClick={() => onClaim(result.id)}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}>

                    Claim
                  </Button>
                  <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(result.id)}
                className="text-gray-400 hover:text-red-500">

                    Not mine
                  </Button>
                </div>
              </div>
            </div>
        )}
        </div> :

      <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 mb-2">
            All results reviewed!
          </h3>
          <p className="text-sm text-gray-400">
            You've claimed all your verified results.
          </p>
        </div>
      }

      <div className="bg-white border border-border rounded-2xl px-6 py-4 shadow-card flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {confirmedCount > 0 ?
          `${confirmedCount} result${confirmedCount !== 1 ? 's' : ''} claimed` :
          'No results claimed yet'}
        </p>
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </div>);

}