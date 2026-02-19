import React from 'react';
import { Race } from '../../lib/types';
import { Button } from '../ui/Button';
import { Calendar, MapPin, AlertCircle } from 'lucide-react';
interface SmartMatchingProps {
  matches: Race[];
  onSelect: (race: Race) => void;
  onNoneFound: () => void;
}
export function SmartMatching({
  matches,
  onSelect,
  onNoneFound
}: SmartMatchingProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {matches.length > 0 ?
      <div className="space-y-3">
          {matches.map((race, index) =>
        <div
          key={race.id}
          onClick={() => onSelect(race)}
          className="bg-white border border-border rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:border-brand-300 hover:shadow-card-md transition-all duration-200 group relative overflow-hidden">

              {index === 0 &&
          <div className="absolute top-0 right-0 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-bl-xl border-l border-b border-emerald-200">
                  LIKELY MATCH
                </div>
          }
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-border-light flex items-center justify-center text-xl">
                  🏃
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {race.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {race.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {race.location}
                    </span>
                  </div>
                </div>
              </div>
              <Button
            size="sm"
            variant="outline"
            className="opacity-0 group-hover:opacity-100 transition-opacity">

                Select
              </Button>
            </div>
        )}
        </div> :

      <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-700 mb-2">
            No exact matches found
          </h3>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">
            We couldn't find a race matching your description in our verified
            database.
          </p>
          <Button onClick={onNoneFound} variant="secondary">
            Add Manually
          </Button>
        </div>
      }

      <div className="text-center pt-2">
        <button
          onClick={onNoneFound}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors">

          None of these? Create a custom entry
        </button>
      </div>
    </div>);

}