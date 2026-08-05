import React, { useState, useEffect } from 'react';
import { CloudRain, Waves, AlertTriangle, Droplets, MapPin, RefreshCw, ThumbsUp, CheckCircle, ShieldAlert, Globe } from 'lucide-react';
import { fetchLiveMazhaData, MazhaRainReport, MazhaDamStatus } from '../services/mazhaDataService';

export const MazhaExactTracker: React.FC = () => {
  const [reports, setReports] = useState<MazhaRainReport[]>([]);
  const [dams, setDams] = useState<MazhaDamStatus[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Districts');
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    setIsRefreshing(true);
    const data = await fetchLiveMazhaData();
    setReports(data.reports);
    setDams(data.dams);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUserReport = (intensity: MazhaRainReport['intensity'], labelEn: string, labelMl: string) => {
    setSelectedIntensity(intensity);
    const newReport: MazhaRainReport = {
      id: Date.now().toString(),
      district: selectedDistrict === 'All Districts' ? 'Ernakulam' : selectedDistrict,
      location: userLocation || 'My Current Location',
      intensity,
      intensityLabelEn: labelEn,
      intensityLabelMl: labelMl,
      reportedAt: 'Just now',
      upvotes: 1
    };
    setReports([newReport, ...reports]);
    setUserLocation('');
  };

  const filteredReports = reports.filter(
    (r) => selectedDistrict === 'All Districts' || r.district === selectedDistrict
  );

  const filteredDams = dams.filter(
    (d) => selectedDistrict === 'All Districts' || d.district === selectedDistrict
  );

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-5 text-slate-900">
      
      {/* Mazha.live Header Branding Card */}
      <div className="bg-[#070e1a] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 font-black text-2xl flex items-center justify-center shrink-0">
              🌧️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  mazha<span className="text-cyan-400">.live</span> <span className="text-slate-400 text-sm font-normal">| Live Kerala Rain Map</span>
                </h2>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                  REAL-TIME SYNC
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'en'
                  ? 'Real-time crowdsourced rain intensity reports & Kerala dam water storage alerts across all 14 districts'
                  : 'കേരളത്തിലെ 14 ജില്ലകളിലെയും തത്സമയ മഴ വിവരങ്ങളും ഡാം സംഭരണ നിലയും'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Refresh Button */}
            <button
              onClick={loadData}
              disabled={isRefreshing}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 hover:text-white transition border border-slate-700 flex items-center gap-1.5 text-xs font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync Live</span>
            </button>

            {/* Language Switch */}
            <div className="flex items-center bg-slate-800 rounded-xl p-0.5 text-xs font-bold border border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg transition ${
                  language === 'en' ? 'bg-cyan-500 text-black font-extrabold' : 'text-slate-400'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-3 py-1 rounded-lg transition ${
                  language === 'ml' ? 'bg-cyan-500 text-black font-extrabold' : 'text-slate-400'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1-Tap Community Rain Intensity Reporter Grid (Exact Mazha.live Replica) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-cyan-600" />
              <span>{language === 'en' ? 'Report Rain Intensity at Your Location' : 'ഇപ്പോഴത്തെ മഴ വിവരം രേഖപ്പെടുത്തുക'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'en' ? 'Help everyone track live monsoon intensity' : 'നിങ്ങളുടെ സ്ഥലത്തെ തത്സമയ മഴയുടെ ശക്തി താഴെ തിരെഞ്ഞെടുക്കുക'}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-cyan-600 cursor-pointer"
            >
              {[
                'All Districts', 'Wayanad', 'Idukki', 'Alappuzha', 'Ernakulam', 'Thrissur', 
                'Kozhikode', 'Malappuram', 'Kottayam', 'Pathanamthitta', 'Palakkad', 'Kannur', 
                'Kasaragod', 'Kollam', 'Thiruvananthapuram'
              ].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Location e.g. Aluva / Munnar"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 w-full sm:w-48"
            />
          </div>
        </div>

        {/* 5 Rain Intensity Buttons matching Mazha.live */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
          {[
            { key: 'no_rain' as const, en: '☀️ No Rain', ml: '☀️ മഴയില്ല', bg: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' },
            { key: 'light' as const, en: '🌦️ Light Rain', ml: '🌦️ നേരിയ മഴ', bg: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100' },
            { key: 'moderate' as const, en: '🌧️ Moderate', ml: '🌧️ മിതമായ മഴ', bg: 'bg-cyan-600 text-white font-extrabold shadow hover:bg-cyan-700' },
            { key: 'heavy' as const, en: '⛈️ Heavy Rain', ml: '⛈️ ശക്തമായ മഴ', bg: 'bg-amber-600 text-white font-extrabold shadow hover:bg-amber-700' },
            { key: 'torrential' as const, en: '🌩️ Torrential', ml: '🌩️ അതിശക്തം', bg: 'bg-red-600 text-white font-black shadow animate-pulse hover:bg-red-700' }
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => handleUserReport(btn.key, btn.en, btn.ml)}
              className={`py-3.5 px-3 rounded-2xl transition text-center font-bold border flex flex-col items-center justify-center ${btn.bg} ${
                selectedIntensity === btn.key ? 'ring-2 ring-cyan-500 scale-95' : ''
              }`}
            >
              <span className="text-xs sm:text-sm">{language === 'en' ? btn.en : btn.ml}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Live Community Ground Reports & Dam Water Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Live Ground Reports Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-cyan-600" />
              <span>{language === 'en' ? 'Live Community Rain Reports' : 'തത്സമയ മഴ റിപ്പോർട്ടുകൾ'}</span>
            </h3>
            <span className="text-[11px] text-cyan-700 font-bold bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
              {filteredReports.length} Active Logs
            </span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredReports.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                      r.intensity === 'torrential' ? 'bg-red-100 text-red-700 border border-red-200' :
                      r.intensity === 'heavy' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      r.intensity === 'moderate' ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {language === 'en' ? r.intensityLabelEn : r.intensityLabelMl}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{r.reportedAt}</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{r.location}</h4>
                  <p className="text-[11px] text-slate-500">📍 {r.district} District • PIN: {r.pincode || '682001'}</p>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-bold bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl">
                  <ThumbsUp className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{r.upvotes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Major Dam Storage & Spillway Releases */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-600" />
              <span>{language === 'en' ? 'Kerala Dam Storage & Gate Releases' : 'ഡാം സംഭരണ നില & അലേർട്ടുകൾ'}</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">KSEB Live Sync</span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredDams.map((dam) => (
              <div key={dam.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                      dam.status === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                      dam.status === 'orange' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-cyan-50 text-cyan-700 border-cyan-200'
                    }`}>
                      {dam.status.toUpperCase()} ALERT
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      {language === 'en' ? dam.nameEn : dam.nameMl}
                    </h4>
                    <p className="text-[11px] text-slate-500">📍 {dam.district} • {dam.river} • Level: {dam.currentLevelM} / {dam.maxLevelM}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-base font-black text-cyan-700">{dam.percentage}%</span>
                    <p className="text-[10px] text-slate-400">Capacity</p>
                  </div>
                </div>

                {/* Storage Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      dam.percentage > 90 ? 'bg-red-600' : dam.percentage > 80 ? 'bg-amber-500' : 'bg-cyan-600'
                    }`}
                    style={{ width: `${dam.percentage}%` }}
                  ></div>
                </div>

                {dam.gatesOpen && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-[11px] p-2 rounded-xl flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-red-600 animate-bounce" />
                    <span>{dam.gatesOpen} Spillway Gate(s) Opened • Downstream River Warning Issued</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
