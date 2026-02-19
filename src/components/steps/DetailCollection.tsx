import React, { useState } from 'react';
import { Race, AthleteResult } from '../../lib/types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Search, Link as LinkIcon, HelpCircle } from 'lucide-react';
interface DetailCollectionProps {
  race: Race;
  onComplete: (result: AthleteResult) => void;
}
type DetailMode = 'initial' | 'manual' | 'auto' | 'unknown';
export function DetailCollection({ race, onComplete }: DetailCollectionProps) {
  const [mode, setMode] = useState<DetailMode>('initial');
  const [formData, setFormData] = useState({
    time: '',
    bib: '',
    link: ''
  });
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      id: Math.random().toString(36).substr(2, 9),
      raceId: race.id,
      raceName: race.name,
      raceDate: race.date || `${race.year}-01-01`,
      year: race.year,
      time: formData.time,
      bib: formData.bib,
      timingLink: formData.link,
      confidence: formData.link ? 'link-backed' : 'self-reported',
      status: 'confirmed',
      source: 'manual'
    });
  };
  const handleUnknownSubmit = () => {
    onComplete({
      id: Math.random().toString(36).substr(2, 9),
      raceId: race.id,
      raceName: race.name,
      raceDate: race.date || `${race.year}-01-01`,
      year: race.year,
      confidence: 'self-reported',
      status: 'confirmed',
      source: 'manual'
    });
  };
  if (mode === 'initial') {
    return (
      <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {[
        {
          key: 'manual',
          icon: Search,
          title: 'I have my details',
          desc: 'Enter your bib number, finish time, or timing link manually.',
          color: 'text-brand-500 bg-brand-50'
        },
        {
          key: 'auto',
          icon: LinkIcon,
          title: 'Find it for me',
          desc: 'Search by name, upload a screenshot, or connect Strava.',
          color: 'text-blue-500 bg-blue-50'
        },
        {
          key: 'unknown',
          icon: HelpCircle,
          title: "I don't remember",
          desc: 'Just add the race for now. We can fill in the details later.',
          color: 'text-gray-500 bg-gray-100'
        }].
        map(({ key, icon: Icon, title, desc, color }) =>
        <div
          key={key}
          onClick={() => setMode(key as DetailMode)}
          className="bg-white border border-border rounded-2xl p-5 flex items-start gap-4 cursor-pointer hover:border-brand-300 hover:shadow-card-md transition-all duration-200 group">

            <div className={`p-3 rounded-xl ${color} shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-400">{desc}</p>
            </div>
          </div>
        )}
      </div>);

  }
  if (mode === 'manual') {
    return (
      <form
        onSubmit={handleManualSubmit}
        className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Bib Number"
            placeholder="e.g. 1042"
            value={formData.bib}
            onChange={(e) =>
            setFormData({
              ...formData,
              bib: e.target.value
            })
            } />

          <Input
            label="Finish Time"
            placeholder="HH:MM:SS"
            value={formData.time}
            onChange={(e) =>
            setFormData({
              ...formData,
              time: e.target.value
            })
            } />

        </div>
        <Input
          label="Timing Link (Optional)"
          placeholder="https://sportstimingsolutions.in/..."
          icon={<LinkIcon className="w-4 h-4" />}
          value={formData.link}
          onChange={(e) =>
          setFormData({
            ...formData,
            link: e.target.value
          })
          } />

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setMode('initial')}>

            Back
          </Button>
          <Button type="submit" className="flex-1">
            Save Result
          </Button>
        </div>
      </form>);

  }
  if (mode === 'unknown') {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
          <HelpCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">No problem!</h3>
          <p className="text-sm text-gray-500 mb-5">
            We'll add{' '}
            <span className="font-semibold text-gray-800">{race.name}</span> as
            a self-reported entry. You can add proof later to increase your
            credibility score.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={() => setMode('initial')}>
              Back
            </Button>
            <Button onClick={handleUnknownSubmit}>Add to History</Button>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="text-center py-12">
      <p className="text-gray-400 text-sm">Auto-find features coming soon...</p>
      <Button
        variant="ghost"
        onClick={() => setMode('initial')}
        className="mt-4">

        Back
      </Button>
    </div>);

}