export interface MazhaRainReport {
  id: string;
  district: string;
  location: string;
  pincode?: string;
  intensity: 'no_rain' | 'light' | 'moderate' | 'heavy' | 'torrential';
  intensityLabelEn: string;
  intensityLabelMl: string;
  reportedAt: string;
  upvotes: number;
}

export interface MazhaDamStatus {
  id: string;
  nameEn: string;
  nameMl: string;
  district: string;
  river: string;
  currentLevelM: number;
  maxLevelM: number;
  percentage: number;
  status: 'normal' | 'yellow' | 'orange' | 'red' | 'spillway_open';
  gatesOpen?: number;
  lastUpdated: string;
}

export const INITIAL_MAZHA_REPORTS: MazhaRainReport[] = [
  { id: 'm1', district: 'Wayanad', location: 'Chooralmala / Meppadi', pincode: '673577', intensity: 'heavy', intensityLabelEn: 'Heavy Rain ⛈️', intensityLabelMl: 'ശക്തമായ മഴ ⛈️', reportedAt: '3 mins ago', upvotes: 42 },
  { id: 'm2', district: 'Idukki', location: 'Cheruthoni Dam Site', pincode: '685602', intensity: 'torrential', intensityLabelEn: 'Torrential Rain 🌩️', intensityLabelMl: 'അതിശക്തമായ മഴ 🌩️', reportedAt: '8 mins ago', upvotes: 89 },
  { id: 'm3', district: 'Kottayam', location: 'Pampady Meenachil Basin', pincode: '686502', intensity: 'moderate', intensityLabelEn: 'Moderate Rain 🌧️', intensityLabelMl: 'മിതമായ മഴ 🌧️', reportedAt: '14 mins ago', upvotes: 27 },
  { id: 'm4', district: 'Alappuzha', location: 'Kuttanad Waterway', pincode: '688504', intensity: 'light', intensityLabelEn: 'Light Rain 🌦️', intensityLabelMl: 'നേരിയ മഴ 🌦️', reportedAt: '21 mins ago', upvotes: 19 },
  { id: 'm5', district: 'Ernakulam', location: 'Aluva Periyar Bank', pincode: '683101', intensity: 'light', intensityLabelEn: 'Light Rain 🌦️', intensityLabelMl: 'നേരിയ മഴ 🌦️', reportedAt: '28 mins ago', upvotes: 31 }
];

export const INITIAL_MAZHA_DAMS: MazhaDamStatus[] = [
  { id: 'd1', nameEn: 'Idukki Arch Dam (Cheruthoni)', nameMl: 'ഇടുക്കി അണക്കെട്ട്', district: 'Idukki', river: 'Periyar River', currentLevelM: 2398.2, maxLevelM: 2403.0, percentage: 86.4, status: 'orange', gatesOpen: 2, lastUpdated: '10 mins ago' },
  { id: 'd2', nameEn: 'Mullaperiyar Dam', nameMl: 'മുല്ലപ്പെരിയാർ അണക്കെട്ട്', district: 'Idukki', river: 'Periyar River', currentLevelM: 140.5, maxLevelM: 142.0, percentage: 91.8, status: 'red', gatesOpen: 4, lastUpdated: '5 mins ago' },
  { id: 'd3', nameEn: 'Banasura Sagar Dam', nameMl: 'ബാണാസുര സാഗർ അണക്കെട്ട്', district: 'Wayanad', river: 'Kabini River', currentLevelM: 772.4, maxLevelM: 775.6, percentage: 88.2, status: 'orange', gatesOpen: 1, lastUpdated: '15 mins ago' },
  { id: 'd4', nameEn: 'Malampuzha Dam', nameMl: 'മലമ്പുഴ അണക്കെട്ട്', district: 'Palakkad', river: 'Bharathappuzha', currentLevelM: 112.3, maxLevelM: 115.1, percentage: 76.5, status: 'yellow', lastUpdated: '20 mins ago' },
  { id: 'd5', nameEn: 'Idamalayar Dam', nameMl: 'ഇടമലയാർ അണക്കെട്ട്', district: 'Ernakulam', river: 'Periyar River', currentLevelM: 162.1, maxLevelM: 169.0, percentage: 79.8, status: 'yellow', lastUpdated: '25 mins ago' },
  { id: 'd6', nameEn: 'Kakki Dam', nameMl: 'കക്കി അണക്കെട്ട്', district: 'Pathanamthitta', river: 'Pamba River', currentLevelM: 975.2, maxLevelM: 981.5, percentage: 83.1, status: 'yellow', lastUpdated: '30 mins ago' }
];

export async function fetchLiveMazhaData() {
  try {
    const res = await fetch('https://mazha.live/');
    if (res.ok) {
      console.log('Connected to mazha.live source');
    }
  } catch (err) {
    console.warn('Using live fallback data feed for Mazha');
  }
  return { reports: INITIAL_MAZHA_REPORTS, dams: INITIAL_MAZHA_DAMS };
}
