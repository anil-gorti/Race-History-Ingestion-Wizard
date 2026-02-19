import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { MOCK_STRAVA_ACTIVITIES } from '../../lib/mockData';
import { Activity, CheckCircle2 } from 'lucide-react';
import { AthleteResult } from '../../lib/types';
interface StravaSyncProps {
  onComplete: (results: AthleteResult[]) => void;
  onSkip: () => void;
}
export function StravaSync({ onComplete, onSkip }: StravaSyncProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [foundRaces, setFoundRaces] = useState<typeof MOCK_STRAVA_ACTIVITIES>(
    []
  );
  const handleConnect = () => {
    setIsScanning(true);
    setTimeout(() => {
      setFoundRaces(MOCK_STRAVA_ACTIVITIES);
      setIsScanning(false);
    }, 2000);
  };
  const handleConfirm = () => {
    const results: AthleteResult[] = foundRaces.map((activity) => ({
      id: activity.id,
      raceId: activity.id,
      raceName: activity.name,
      raceDate: activity.date,
      year: new Date(activity.date).getFullYear(),
      confidence: 'activity-backed',
      status: 'confirmed',
      source: 'strava'
    }));
    onComplete(results);
  };
  if (foundRaces.length > 0) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="text-emerald-700 font-medium text-sm">
            Found {foundRaces.length} potential races from your history
          </span>
        </div>
        <div className="space-y-3">
          {foundRaces.map((race) =>
          <div
            key={race.id}
            className="bg-white border border-border rounded-xl p-4 flex items-center justify-between shadow-card">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FC4C02] flex items-center justify-center text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {race.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {race.location} • {race.date}
                  </p>
                </div>
              </div>
              <span className="text-emerald-600 text-xs font-medium">
                Match found
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          <Button variant="ghost" onClick={onSkip}>
            Skip
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Import {foundRaces.length} Races
          </Button>
        </div>
      </div>);

  }
  return (
    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
        <Activity className="w-10 h-10 text-[#FC4C02]" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 font-display mb-2">
          Connect Strava to auto-fill
        </h3>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          We'll scan your past activities for long runs that match known race
          dates and locations.
        </p>
      </div>
      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <Button
          onClick={handleConnect}
          isLoading={isScanning}
          className="bg-[#FC4C02] hover:bg-[#E34402] border-none">

          {isScanning ? 'Scanning History...' : 'Connect Strava'}
        </Button>
        <Button variant="ghost" onClick={onSkip}>
          I'll add manually
        </Button>
      </div>
    </div>);

}