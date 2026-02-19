import React, { useState } from 'react';
import { GmailRace } from '../../lib/types';
import { Button } from '../ui/Button';
import { Check, X, MapPin, Mail, Hash } from 'lucide-react';
interface GmailRacesProps {
  races: GmailRace[];
  onMarkRan: (id: string) => void;
  onMarkDidNotRun: (id: string) => void;
  onUpdateBib: (id: string, bib: string) => void;
  onContinue: () => void;
}
export function GmailRaces({
  races,
  onMarkRan,
  onMarkDidNotRun,
  onUpdateBib,
  onContinue
}: GmailRacesProps) {
  const [bibInputs, setBibInputs] = useState<Record<string, string>>({});
  const racesByYear = races.reduce(
    (acc, race) => {
      if (!acc[race.year]) acc[race.year] = [];
      acc[race.year].push(race);
      return acc;
    },
    {} as Record<number, GmailRace[]>
  );
  const sortedYears = Object.keys(racesByYear).
  map(Number).
  sort((a, b) => b - a);
  const answeredCount = races.filter((r) => r.status !== 'pending').length;
  const ranCount = races.filter((r) => r.status === 'ran').length;
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Progress Banner */}
      <div className="bg-white border border-border rounded-xl px-5 py-4 shadow-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center">
            <Mail className="w-4 h-4 text-brand-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Found {races.length} race registrations
            </p>
            <p className="text-xs text-gray-400">
              {answeredCount} of {races.length} reviewed
            </p>
          </div>
        </div>
        {ranCount > 0 &&
        <span className="text-sm text-emerald-600 font-medium">
            {ranCount} confirmed
          </span>
        }
      </div>

      {/* Races by Year */}
      <div className="space-y-6">
        {sortedYears.map((year) =>
        <div key={year}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-black text-gray-200 font-display">
                {year}
              </span>
              <div className="flex-1 h-px bg-border-light" />
            </div>
            <div className="space-y-2">
              {racesByYear[year].map((race, index) =>
            <div
              key={race.id}
              className={`
                    bg-white border rounded-xl px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200
                    ${race.status === 'ran' ? 'border-l-4 border-l-emerald-400 border-t-border border-r-border border-b-border' : ''}
                    ${race.status === 'did-not-run' ? 'opacity-40 border-border' : 'border-border shadow-card'}
                  `}
              style={{
                animationDelay: `${index * 50}ms`
              }}>

                  {/* Left: Race Info */}
                  <div className="flex-1 min-w-0">
                    {/* Race Name */}
                    <p className="font-semibold text-gray-900 text-base leading-tight">
                      {race.raceName}
                    </p>

                    {/* Location */}
                    <p className="flex items-center gap-1 text-sm text-gray-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {race.location}
                    </p>

                    {/* Distance | Bib */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                        {race.distance}
                      </span>
                      <span className="text-gray-300 text-xs">|</span>

                      {race.bib /* Bib found from email */ ?
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Hash className="w-3 h-3" />
                          Bib {race.bib}
                        </span> /* Bib not found — show inline input */ :

                  <div className="flex items-center gap-1.5">
                          <Hash className="w-3 h-3 text-gray-300 shrink-0" />
                          <input
                      type="text"
                      placeholder="Enter bib #"
                      value={bibInputs[race.id] ?? ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBibInputs((prev) => ({
                          ...prev,
                          [race.id]: val
                        }));
                        onUpdateBib(race.id, val);
                      }}
                      className="w-24 text-xs border border-dashed border-gray-300 rounded-md px-2 py-0.5 text-gray-600 placeholder-gray-300 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400/30 bg-transparent transition-all" />

                        </div>
                  }
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                  onClick={() => onMarkDidNotRun(race.id)}
                  className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                        ${race.status === 'did-not-run' ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-400 border-border hover:border-red-200 hover:text-red-400'}
                      `}>

                      <X className="w-3.5 h-3.5" /> Didn't run
                    </button>
                    <button
                  onClick={() => onMarkRan(race.id)}
                  className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                        ${race.status === 'ran' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-gray-400 border-border hover:border-emerald-200 hover:text-emerald-500'}
                      `}>

                      <Check className="w-3.5 h-3.5" /> I ran this
                    </button>
                  </div>
                </div>
            )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-light">
        <p className="text-sm text-gray-400">
          {ranCount > 0 ?
          `We'll fetch results for ${ranCount} race${ranCount !== 1 ? 's' : ''}` :
          'Select at least one race to continue'}
        </p>
        <Button onClick={onContinue} disabled={ranCount === 0}>
          Continue
        </Button>
      </div>
    </div>);

}