import React, { useState } from 'react';
import { CloudRain, Waves, AlertTriangle, Droplets, MapPin, Activity, CheckCircle, ShieldAlert, PhoneCall, Building2 } from 'lucide-react';

export type DistrictName = 
  | 'All Districts'
  | 'Wayanad'
  | 'Idukki'
  | 'Alappuzha'
  | 'Ernakulam'
  | 'Thrissur'
  | 'Kozhikode'
  | 'Malappuram'
  | 'Kottayam'
  | 'Pathanamthitta'
  | 'Palakkad'
  | 'Kannur'
  | 'Kasaragod'
  | 'Kollam'
  | 'Thiruvananthapuram';

interface RainReport {
  id: string;
  district: DistrictName;
  location: string;
  intensity: 'No Rain' | 'Light Rain' | 'Moderate' | 'Heavy Rain' | 'Torrential';
  time: string;
  reporter: string;
}

interface DamData {
  name: string;
  district: DistrictName;
  waterLevelPct: number;
  status: 'Normal' | 'Yellow Alert' | 'Orange Alert' | 'Red Alert' | 'Gates Opened';
  capacity: string;
  gatesOpenedCount?: number;
  river: string;
}

const DISTRICT_LIST: DistrictName[] = [
  'All Districts',
  'Wayanad',
  'Idukki',
  'Alappuzha',
  'Ernakulam',
  'Thrissur',
  'Kozhikode',
  'Malappuram',
  'Kottayam',
  'Pathanamthitta',
  'Palakkad',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Thiruvananthapuram'
];

const INITIAL_RAIN_REPORTS: RainReport[] = [
  { id: '1', district: 'Wayanad', location: 'Meppadi / Chooralmala Zone', intensity: 'Heavy Rain', time: '5 mins ago', reporter: 'DEOC Control Desk' },
  { id: '2', district: 'Kottayam', location: 'Meenachil River Basin', intensity: 'Torrential', time: '12 mins ago', reporter: 'District Cell' },
  { id: '3', district: 'Alappuzha', location: 'Kuttanad Canal Zone', intensity: 'Moderate', time: '18 mins ago', reporter: 'Champakulam Station' },
  { id: '4', district: 'Ernakulam', location: 'Aluva Periyar River Bank', intensity: 'Light Rain', time: '25 mins ago', reporter: 'Civic Volunteer' },
  { id: '5', district: 'Idukki', location: 'Munnar Hill Gap Road', intensity: 'Heavy Rain', time: '30 mins ago', reporter: 'KSDMA Observer' }
];

const ALL_KERALA_DAMS: DamData[] = [
  { name: 'Idukki Arch Dam (Cheruthoni)', district: 'Idukki', waterLevelPct: 84.5, status: 'Orange Alert', capacity: '2,398.0 MCM', gatesOpenedCount: 2, river: 'Periyar River' },
  { name: 'Mullaperiyar Dam', district: 'Idukki', waterLevelPct: 91.2, status: 'Red Alert', capacity: '142.0 FT', gatesOpenedCount: 4, river: 'Periyar River' },
  { name: 'Banasura Sagar Dam', district: 'Wayanad', waterLevelPct: 88.0, status: 'Orange Alert', capacity: '209.25 MCM', gatesOpenedCount: 1, river: 'Kabini River' },
  { name: 'Malampuzha Dam', district: 'Palakkad', waterLevelPct: 76.8, status: 'Yellow Alert', capacity: '226.0 MCM', river: 'Bharathappuzha' },
  { name: 'Idamalayar Dam', district: 'Ernakulam', waterLevelPct: 79.4, status: 'Yellow Alert', capacity: '1,017.8 MCM', river: 'Periyar River' },
  { name: 'Kakki - Anathode Dam', district: 'Pathanamthitta', waterLevelPct: 82.1, status: 'Yellow Alert', capacity: '447.0 MCM', river: 'Pamba River' },
  { name: 'Pamba Dam', district: 'Pathanamthitta', waterLevelPct: 86.4, status: 'Orange Alert', capacity: '31.1 MCM', river: 'Pamba River' },
  { name: 'Thenmala (Kallada) Dam', district: 'Kollam', waterLevelPct: 72.0, status: 'Normal', capacity: '505.0 MCM', river: 'Kallada River' }
];

export const MazhaFullTracker: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictName>('All Districts');
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [reports, setReports] = useState<RainReport[]>(INITIAL_RAIN_REPORTS);
  const [userSelectedIntensity, setUserSelectedIntensity] = useState<string | null>(null);
  const [customLocation, setCustomLocation] = useState('');

  const filteredReports = reports.filter(
    (r) => selectedDistrict === 'All Districts' || r.district === selectedDistrict
  );

  const filteredDams = ALL_KERALA_DAMS.filter(
    (d) => selectedDistrict === 'All Districts' || d.district === selectedDistrict
  );

  const handleAddUserReport = (intensity: RainReport['intensity']) => {
    setUserSelectedIntensity(intensity);
    const newReport: RainReport = {
      id: Date.now().toString(),
      district: selectedDistrict === 'All Districts' ? 'Ernakulam' : selectedDistrict,
      location: customLocation || 'Local Citizen Location',
      intensity,
      time: 'Just now',
      reporter: 'Verified Citizen'
    };
    setReports([newReport, ...reports]);
    setCustomLocation('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-700 selection:text-white pb-12">
      
      {/* Official Government Top Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              State Emergency Portal • Government of Kerala
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">State Control Room (KSDMA): 1070</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> District Helpline: 1077
            </span>
          </div>
        </div>
      </div>

      {/* Main Official Header (Navy Blue & Gold) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Brand & Crest */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-900 flex items-center justify-center text-amber-400 font-black text-xl shadow">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                  Kerala<span className="text-blue-700">Hub</span> <span className="text-emerald-700">Weather & Dam Portal</span>
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-300 uppercase">
                  OFFICIAL DATA
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'en' ? 'Live Kerala Rain Monitoring, Dam Storage & Public Alert Network' : 'കേരള തത്സമയ മഴ, ഡാം വിവരം & ദുരന്ത നിവാരണ പോർട്ടൽ'}
              </p>
            </div>
          </div>

          {/* Controls: District & Language */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-700 mr-1.5 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value as DistrictName)}
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer pr-1"
              >
                {DISTRICT_LIST.map((dist) => (
                  <option key={dist} value={dist} className="bg-white text-slate-900">
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl p-0.5 text-xs font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg transition ${
                  language === 'en' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-3 py-1 rounded-lg transition ${
                  language === 'ml' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        
        {/* Official Summary Cards (White Cards with Crisp Slate Borders) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-blue-700 text-xs font-bold mb-1">
              <span>Ground Logs</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{filteredReports.length}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Verified Citizen Reports</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-emerald-700 text-xs font-bold mb-1">
              <span>Major Dams</span>
              <Waves className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{filteredDams.length}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Reservoirs Tracked</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-amber-700 text-xs font-bold mb-1">
              <span>Spillway Gates</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-600">
              {filteredDams.reduce((acc, d) => acc + (d.gatesOpenedCount || 0), 0)}
            </p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">Active Discharges</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition">
            <div className="flex items-center justify-between text-red-700 text-xs font-bold mb-1">
              <span>IMD Weather Alerts</span>
              <ShieldAlert className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-red-600">2 Red • 4 Orange</p>
            <p className="text-[10px] text-slate-500 font-medium mt-0.5">High Severity Alert</p>
          </div>
        </div>

        {/* 1-Tap Citizen Rain Intensity Reporting Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span>{language === 'en' ? 'Report Live Rain Intensity at Your Location' : 'ഇപ്പോഴത്തെ മഴ വിവരം അറിയിക്കുക'}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'en' ? 'Select current rain condition to update public safety records' : 'നിങ്ങളുടെ സ്ഥലത്തെ മഴയുടെ അളവ് താഴെ രേഖപ്പെടുത്തുക'}
              </p>
            </div>

            <input
              type="text"
              placeholder="e.g. Aluva Municipal Ward 4"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full sm:w-64 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
            {[
              { label: '☀️ No Rain', val: 'No Rain' as const, bg: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200' },
              { label: '🌦️ Light Rain', val: 'Light Rain' as const, bg: 'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 font-semibold' },
              { label: '🌧️ Moderate', val: 'Moderate' as const, bg: 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow' },
              { label: '⛈️ Heavy Rain', val: 'Heavy Rain' as const, bg: 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow' },
              { label: '🌩️ Torrential', val: 'Torrential' as const, bg: 'bg-red-600 hover:bg-red-700 text-white font-extrabold shadow animate-pulse' }
            ].map((btn) => (
              <button
                key={btn.val}
                onClick={() => handleAddUserReport(btn.val)}
                className={`py-3 px-3 rounded-2xl transition text-center font-bold flex flex-col items-center justify-center gap-1 ${btn.bg} ${
                  userSelectedIntensity === btn.val ? 'ring-2 ring-blue-700 scale-95' : ''
                }`}
              >
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Ground Reports Feed & Dam Storage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Ground Reports */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-600" />
                <span>Live Ground Rain Reports Feed</span>
              </h3>
              <span className="text-[11px] text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {selectedDistrict}
              </span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredReports.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-3.5 shadow-sm transition flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        item.intensity === 'Torrential' ? 'bg-red-100 text-red-700 border border-red-200' :
                        item.intensity === 'Heavy Rain' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        item.intensity === 'Moderate' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.intensity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.time}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{item.location}</h4>
                    <p className="text-[11px] text-slate-500">📍 {item.district} District • By {item.reporter}</p>
                  </div>

                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Major Dam Water Levels */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <Waves className="w-4 h-4 text-emerald-600" />
                <span>Kerala Dam Storage & Spillway Releases</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">KSEB Hydro Desk</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {filteredDams.map((dam, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        dam.status.includes('Red') ? 'bg-red-50 text-red-700 border-red-200' :
                        dam.status.includes('Orange') ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {dam.status}
                      </span>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{dam.name}</h4>
                      <p className="text-[11px] text-slate-500">📍 {dam.district} • {dam.river} • Cap: {dam.capacity}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-blue-700">{dam.waterLevelPct}%</span>
                      <p className="text-[10px] text-slate-400">Full Storage</p>
                    </div>
                  </div>

                  {/* Storage Progress Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full transition-all duration-500 ${
                        dam.waterLevelPct > 90 ? 'bg-red-600' : dam.waterLevelPct > 80 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${dam.waterLevelPct}%` }}
                    ></div>
                  </div>

                  {dam.gatesOpenedCount && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-[11px] p-2 rounded-xl flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-600 animate-bounce" />
                      <span>{dam.gatesOpenedCount} Spillway Gate(s) Raised • River Warning Issued</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Official Government Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 font-sans mt-8">
        <p>© 2026 <strong>KeralaHub Weather Portal</strong> • Official Disaster Response & Rain Tracking Portal</p>
      </footer>

    </div>
  );
};
