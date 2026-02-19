import { Race, AthleteResult, GmailRace } from './types';

export const POPULAR_RACES: Race[] = [
{
  id: 'tmm-2023',
  name: 'Tata Mumbai Marathon',
  year: 2023,
  date: '2023-01-15',
  location: 'Mumbai, India',
  distance: 'Full Marathon'
},
{
  id: 'tmm-2024',
  name: 'Tata Mumbai Marathon',
  year: 2024,
  date: '2024-01-21',
  location: 'Mumbai, India',
  distance: 'Full Marathon'
},
{
  id: 'adhm-2023',
  name: 'Vedanta Delhi Half Marathon',
  year: 2023,
  date: '2023-10-15',
  location: 'New Delhi, India',
  distance: 'Half Marathon'
},
{
  id: 'tcs-blr-2023',
  name: 'TCS World 10K Bengaluru',
  year: 2023,
  date: '2023-05-21',
  location: 'Bengaluru, India',
  distance: '10K'
},
{
  id: 'nmdc-hyd-2023',
  name: 'NMDC Hyderabad Marathon',
  year: 2023,
  date: '2023-08-27',
  location: 'Hyderabad, India',
  distance: 'Full Marathon'
}];


export const MOCK_STRAVA_ACTIVITIES = [
{
  id: 'strava-1',
  name: 'Morning Run',
  date: '2023-01-15',
  distance: 42200,
  location: 'Mumbai'
},
{
  id: 'strava-2',
  name: 'Sunday Long Run',
  date: '2023-10-15',
  distance: 21100,
  location: 'New Delhi'
}];


export const SUGGESTED_CHIPS = [
'Tata Mumbai Marathon 2023',
'Delhi Half Marathon',
'TCS World 10K',
'Hyderabad Marathon'];


export const MOCK_GMAIL_RACES: GmailRace[] = [
{
  id: 'gmail-1',
  raceName: 'Tata Mumbai Marathon',
  year: 2024,
  distance: 'Full Marathon',
  location: 'Mumbai',
  emailDate: 'Dec 15, 2023',
  emailSubject: 'Your TMM 2024 Registration Confirmed!',
  bib: '1847',
  status: 'pending'
},
{
  id: 'gmail-2',
  raceName: 'Chennai Marathon',
  year: 2024,
  distance: 'Half Marathon',
  location: 'Chennai',
  emailDate: 'Nov 28, 2023',
  emailSubject: 'Chennai Marathon 2024 - Registration Successful',
  status: 'pending'
},
{
  id: 'gmail-3',
  raceName: 'TCS World 10K Bengaluru',
  year: 2023,
  distance: '10K',
  location: 'Bengaluru',
  emailDate: 'Apr 10, 2023',
  emailSubject: "TCS World 10K - You're In!",
  bib: '3201',
  status: 'pending'
},
{
  id: 'gmail-4',
  raceName: 'Vedanta Delhi Half Marathon',
  year: 2023,
  distance: 'Half Marathon',
  location: 'New Delhi',
  emailDate: 'Sep 5, 2023',
  emailSubject: 'VDHM 2023 Registration Confirmation',
  status: 'pending'
},
{
  id: 'gmail-5',
  raceName: 'NMDC Hyderabad Marathon',
  year: 2022,
  distance: 'Full Marathon',
  location: 'Hyderabad',
  emailDate: 'Jul 20, 2022',
  emailSubject: 'Hyderabad Marathon 2022 - Welcome Runner!',
  status: 'pending'
},
{
  id: 'gmail-6',
  raceName: 'Tata Mumbai Marathon',
  year: 2022,
  distance: 'Full Marathon',
  location: 'Mumbai',
  emailDate: 'Dec 10, 2021',
  emailSubject: 'TMM 2022 - Registration Complete',
  bib: '1523',
  status: 'pending'
},
{
  id: 'gmail-7',
  raceName: 'Kaveri Trail Marathon',
  year: 2021,
  distance: 'Full Marathon',
  location: 'Coorg',
  emailDate: 'Aug 15, 2021',
  emailSubject: 'KTM 2021 - See You at the Start Line!',
  status: 'pending'
}];


// Results that will be "fetched" for races marked as 'ran'
export const MOCK_FETCHED_RESULTS: Record<
  string,
  Omit<AthleteResult, 'id' | 'status'>> =
{
  'gmail-1': {
    raceId: 'tmm-2024',
    raceName: 'Tata Mumbai Marathon',
    raceDate: '2024-01-21',
    year: 2024,
    time: '4:12:33',
    bib: '1847',
    category: 'Full Marathon',
    confidence: 'verified',
    source: 'gmail'
  },
  'gmail-2': {
    raceId: 'chennai-2024',
    raceName: 'Chennai Marathon',
    raceDate: '2024-01-07',
    year: 2024,
    time: '2:05:30',
    bib: '2341',
    category: 'Half Marathon',
    confidence: 'verified',
    source: 'gmail'
  },
  'gmail-3': {
    raceId: 'tcs-blr-2023',
    raceName: 'TCS World 10K Bengaluru',
    raceDate: '2023-05-21',
    year: 2023,
    time: '0:52:18',
    bib: '3201',
    category: '10K',
    confidence: 'verified',
    source: 'gmail'
  },
  'gmail-4': {
    raceId: 'adhm-2023',
    raceName: 'Vedanta Delhi Half Marathon',
    raceDate: '2023-10-15',
    year: 2023,
    time: '1:58:45',
    bib: '892',
    category: 'Half Marathon',
    confidence: 'verified',
    source: 'gmail'
  },
  'gmail-5': {
    raceId: 'nmdc-hyd-2022',
    raceName: 'NMDC Hyderabad Marathon',
    raceDate: '2022-08-28',
    year: 2022,
    time: '4:35:12',
    bib: '2104',
    category: 'Full Marathon',
    confidence: 'verified',
    source: 'gmail'
  },
  'gmail-6': {
    raceId: 'tmm-2022',
    raceName: 'Tata Mumbai Marathon',
    raceDate: '2022-01-16',
    year: 2022,
    time: '4:28:45',
    bib: '1523',
    category: 'Full Marathon',
    confidence: 'verified',
    source: 'gmail'
  },
  'gmail-7': {
    raceId: 'ktm-2021',
    raceName: 'Kaveri Trail Marathon',
    raceDate: '2021-09-26',
    year: 2021,
    time: '5:15:22',
    bib: '456',
    category: 'Full Marathon',
    confidence: 'verified',
    source: 'gmail'
  }
};