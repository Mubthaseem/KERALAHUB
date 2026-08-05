import React, { useState } from 'react';
import { CloudRain, Waves, AlertTriangle, Droplets, MapPin, Search, ShieldAlert, Activity, CheckCircle, RefreshCw, BarChart2, Globe } from 'lucide-react';

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
  { id: '1', district: 'Wayanad', location: 'Meppadi / Chooralmala', intensity: 'Heavy Rain', time: '5 mins ago', reporter: 'Vythiri Desk' },
  { id: '2', district: 'Kottayam', location: 'Meenachil River Basin', intensity: 'Torrential', time: '12 mins ago', reporter: 'Pampady Cell' },
  { id: '3', district: 'Alappuzha', location: 'Kuttanad Canal Zone', intensity: 'Moderate', time: '18 mins ago', reporter: 'Champakulam' },
  { id: '4', district: 'Ernakulam', location: 'Aluva Periyar Bank', intensity: 'Light Rain', time: '25 mins ago', reporter: 'Kakkanad' },
  { id: '5', district: 'Idukki', location: 'Munnar Gap Road', intensity: 'Heavy Rain', time: '30 mins ago', reporter: 'Devikulam' }
];

const ALL_KERALA_DAMS: DamData[] = [
  { name: 'Idukki Arch Dam (Cheruthoni)', district: 'Idukki', waterLevelPct: 84.5, status: 'Orange Alert', capacity: '2,398.0 MCM', gatesOpenedCount: 2, river: 'Periyar River' },
  { name: 'Mullaperiyar Dam', district: 'Idukki', waterLevelPct: 91.2, status: 'Red Alert', capacity: '142.0 FT', gatesOpenedCount: 4, river: 'Periyar River' },
  { name: 'Banasura Sagar Dam', district: 'Wayanad', waterLevelPct: 88.0, status: 'Orange Alert', capacity: '209.25 MCM', gatesOpenedCount: 1, river: 'Kabini River' },
  { name: 'Malampuzha Dam', district: 'Palakkad', waterLevelPct: 76.8, status: 'Yellow Alert', capacity: '226.0 MCM', river: 'Bharathappuzha' },
  { name: 'Idamalayar Dam', district: 'Ernakulam', waterLevelPct: 79.4, status: 'Yellow Alert', capacity: '1,017.8 MCM', river: 'Periyar River' },
  { name: 'Kakki - Anathode Dam', district: 'Pathanamthitta', waterLevelPct: 82.1, status: 'Yellow Alert', capacity: '447.0 MCM', river: 'Pamba River' },
  { name: 'Pamba Dam', district: 'Pathanamthitta', waterLevelPct: 86.4, status: 'Orange Alert', capacity: '31.1 MCM', river: 'Pamba River' },
  { name: 'Thenmala (Kallada) Dam', district: 'Kollam', waterLevelPct: 72.0, status: 'Normal', capacity: '505.0 MCM', river: 'Kallada River' },
  { name: 'Mattupetty Dam', district: 'Idukki', waterLevelPct: 89.5, status: 'Orange Alert', capacity: '55.2 MCM', river: 'Muthirapuzha' }
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
      reporter: 'You (Verified Citizen)'
    };
    setReports([newReport, ...reports]);
    setCustomLocation('');
  };

  return (
    <div className="min-h-screen bg-[#031716] text-[#e0f2fe] font-sans selection:bg-cyan-500 selection:text-black pb-12">
      
      {/* Top Emerald-Cyan Header */}
      <header className="bg-[#0a2e2b]/90 backdrop-blur-md border-b border-emerald-800/40 sticky top-0 z-50 p-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500 flex items-center justify-center text-[#031716] font-black text-lg shadow-lg shadow-cyan-500/30">
              🌧️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl text-white tracking-tight">
                  Kerala<span className="text-cyan-400">Hub</span> <span className="text-emerald-400">RainLive</span>
                </h1>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-400/30 uppercase">
                  Mazha 2026
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80">
                {language === 'en' ? 'Live Kerala Rain Tracker & Dam Storage Portal' : 'കേരള തത്സമയ മഴ & ഡാം സംഭരണ വിവരം'}
              </p>
            </div>
          </div>

          {/* District Selector & Language Toggle */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center bg-[#031716] border border-emerald-800/60 rounded-xl px-3 py-1.5 text-xs text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1.5 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value as DistrictName)}
                className="bg-transparent font-semibold text-white focus:outline-none cursor-pointer pr-1"
              >
                {DISTRICT_LIST.map((dist) => (
                  <option key={dist} value={dist} className="bg-[#031716] text-white">
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-[#031716] border border-emerald-800/60 rounded-xl p-0.5 text-xs font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  language === 'en' ? 'bg-cyan-500 text-[#031716]' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  language === 'ml' ? 'bg-cyan-500 text-[#031716]' : 'text-slate-400 hover:text-white'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-6">
        
        {/* Hero Live Summary Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#0a2e2b]/80 border border-emerald-800/40 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-emerald-400 text-xs font-bold mb-1">
              <span>Active Reports</span>
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{filteredReports.length}</p>
            <p className="text-[10px] text-emerald-300/70 mt-0.5">Live Ground Logs</p>
          </div>

          <div className="bg-[#0a2e2b]/80 border border-emerald-800/40 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-cyan-400 text-xs font-bold mb-1">
              <span>Major Dams</span>
              <Waves className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{filteredDams.length}</p>
            <p className="text-[10px] text-emerald-300/70 mt-0.5">Storage Monitored</p>
          </div>

          <div className="bg-[#0a2e2b]/80 border border-emerald-800/40 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-amber-400 text-xs font-bold mb-1">
              <span>Gates Opened</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-300">
              {filteredDams.reduce((acc, d) => acc + (d.gatesOpenedCount || 0), 0)}
            </p>
            <p className="text-[10px] text-emerald-300/70 mt-0.5">Spillway Discharges</p>
          </div>

          <div className="bg-[#0a2e2b]/80 border border-emerald-800/40 rounded-2xl p-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center justify-between text-red-400 text-xs font-bold mb-1">
              <span>District Alerts</span>
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-red-300">2 Red • 4 Orange</p>
            <p className="text-[10px] text-emerald-300/70 mt-0.5">IMD / KSDMA Status</p>
          </div>
        </div>

        {/* 1-Tap Community Rain Reporter (Mazha.live Feature) */}
        <div className="bg-[#0a2e2b]/90 border border-cyan-500/30 rounded-3xl p-5 shadow-2xl space-y-4 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-emerald-800/40 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-cyan-400" />
                <span>{language === 'en' ? 'Report Live Rain Intensity at Your Location' : 'ഇപ്പോഴത്തെ മഴ വിവരം അറിയിക്കുക'}</span>
              </h3>
              <p className="text-xs text-emerald-300/80">
                {language === 'en' ? 'Click your current rain level to share instant weather updates with all Keralites' : 'നിങ്ങളുടെ സ്ഥലത്തെ മഴയുടെ അളവ് താഴെ തിരഞ്ഞെടുക്കുക'}
              </p>
            </div>

            <input
              type="text"
              placeholder="e.g. Aluva Shiva Temple Road"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full sm:w-64 bg-[#031716] border border-emerald-800/60 rounded-xl px-3 py-1.5 text-xs text-white placeholder-emerald-500/60 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
            {[
              { label: '☀️ No Rain', val: 'No Rain' as const, bg: 'bg-[#031716] hover:bg-[#072422] text-slate-300 border border-emerald-800/50' },
              { label: '🌦️ Light Rain', val: 'Light Rain' as const, bg: 'bg-cyan-950 hover:bg-cyan-900 text-cyan-200 border border-cyan-800' },
              { label: '🌧️ Moderate', val: 'Moderate' as const, bg: 'bg-cyan-600 hover:bg-cyan-500 text-black font-extrabold shadow-lg shadow-cyan-600/30' },
              { label: '⛈️ Heavy Rain', val: 'Heavy Rain' as const, bg: 'bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-lg shadow-amber-600/30' },
              { label: '🌩️ Torrential', val: 'Torrential' as const, bg: 'bg-red-600 hover:bg-red-500 text-white font-black animate-pulse shadow-lg shadow-red-600/40' }
            ].map((btn) => (
              <button
                key={btn.val}
                onClick={() => handleAddUserReport(btn.val)}
                className={`py-3 px-3 rounded-2xl transition text-center font-bold flex flex-col items-center justify-center gap-1 ${btn.bg} ${
                  userSelectedIntensity === btn.val ? 'ring-2 ring-cyan-300 scale-95' : ''
                }`}
              >
                <span>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Ground Reports Feed & Dam Storage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Live Ground Rain Feed */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                <span>Live Ground Rain Reports Feed</span>
              </h3>
              <span className="text-[11px] text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {selectedDistrict}
              </span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
              {filteredReports.map((item) => (
                <div key={item.id} className="bg-[#0a2e2b]/60 border border-emerald-800/40 hover:border-emerald-700/60 rounded-2xl p-3.5 shadow transition flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                        item.intensity === 'Torrential' ? 'bg-red-600 text-white' :
                        item.intensity === 'Heavy Rain' ? 'bg-amber-600 text-white' :
                        item.intensity === 'Moderate' ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {item.intensity}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">{item.time}</span>
                    </div>

                    <h4 className="font-bold text-white text-xs sm:text-sm">{item.location}</h4>
                    <p className="text-[11px] text-emerald-300/70">📍 {item.district} District • By {item.reporter}</p>
                  </div>

                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Major Dam Water Levels & Spillway Gates */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Waves className="w-4 h-4 text-blue-400" />
                <span>Kerala Dam Storage & River Alerts</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium">KSEB Desk</span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
              {filteredDams.map((dam, idx) => (
                <div key={idx} className="bg-[#0a2e2b]/60 border border-emerald-800/40 rounded-2xl p-4 shadow space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                        dam.status.includes('Red') ? 'bg-red-950 text-red-300 border-red-800' :
                        dam.status.includes('Orange') ? 'bg-amber-950 text-amber-300 border-amber-800' :
                        'bg-cyan-950 text-cyan-300 border-cyan-800'
                      }`}>
                        {dam.status}
                      </span>
                      <h4 className="font-bold text-white text-xs sm:text-sm mt-1">{dam.name}</h4>
                      <p className="text-[11px] text-emerald-300/70">📍 {dam.district} • {dam.river} • Cap: {dam.capacity}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-cyan-400">{dam.waterLevelPct}%</span>
                      <p className="text-[10px] text-emerald-400/60">Full Level</p>
                    </div>
                  </div>

                  {/* Storage Bar */}
                  <div className="w-full bg-[#031716] h-2 rounded-full overflow-hidden border border-emerald-900">
                    <div
                      className={`h-full transition-all duration-500 ${
                        dam.waterLevelPct > 90 ? 'bg-red-500' : dam.waterLevelPct > 80 ? 'bg-amber-500' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${dam.waterLevelPct}%` }}
                    ></div>
                  </div>

                  {dam.gatesOpenedCount && (
                    <div className="bg-red-950/40 border border-red-800/50 text-red-300 text-[11px] p-2 rounded-xl flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-400 animate-bounce" />
                      <span>{dam.gatesOpenedCount} Spillway Gate(s) Raised • River Warning</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#0a2e2b]/90 border-t border-emerald-800/40 py-4 px-4 text-center text-xs text-emerald-400/80 font-sans mt-8">
        <p>© 2026 <strong>KeralaHub RainLive</strong> • Full Live Rain & Dam Storage Tracker for Kerala</p>
      </footer>

    </div>
  );
};
