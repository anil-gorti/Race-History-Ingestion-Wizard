import React, { useEffect, useState } from 'react';
import { GmailRace } from '../../lib/types';
import { Search } from 'lucide-react';
interface FetchingResultsProps {
  gmailRaces: GmailRace[];
  onComplete: () => void;
}
const MESSAGES = [
'Scanning timing databases...',
'Matching your bib numbers...',
'Cross-referencing race records...',
'Verifying finish times...',
'Almost there...'];

export function FetchingResults({
  gmailRaces,
  onComplete
}: FetchingResultsProps) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const ranRaces = gmailRaces.filter((r) => r.status === 'ran');
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 30);
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 900);
    const done = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => {
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      clearTimeout(done);
    };
  }, [onComplete]);
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in duration-500">
      {/* Animated Icon */}
      <div className="relative mb-8">
        <div
          className="absolute inset-0 rounded-full border-2 border-brand-200 animate-ping"
          style={{
            animationDuration: '2s'
          }} />

        <div className="relative w-20 h-20 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
          <Search className="w-9 h-9 text-brand-500" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">
        Fetching your results...
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        Looking up {ranRaces.length} race{ranRaces.length !== 1 ? 's' : ''} from
        timing databases
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mb-4">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-500 rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`
            }} />

        </div>
      </div>

      <p
        key={msgIndex}
        className="text-sm text-gray-400 animate-in fade-in duration-300 mb-8">

        {MESSAGES[msgIndex]}
      </p>

      {/* Race Pills */}
      <div className="flex flex-wrap gap-2 justify-center max-w-sm">
        {ranRaces.map((race) =>
        <span
          key={race.id}
          className="bg-white border border-border text-gray-500 text-xs px-3 py-1 rounded-full shadow-card">

            {race.raceName}
          </span>
        )}
      </div>
    </div>);

}