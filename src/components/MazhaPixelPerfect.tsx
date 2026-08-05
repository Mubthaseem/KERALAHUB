import React, { useState } from 'react';
import { 
  Zap, CloudRain, AlertTriangle, RefreshCw, Locate, Flame, Layers, Maximize2, 
  Search, Heart, MapPin, Shield, Activity, BarChart2, Award, ChevronRight, Moon, Sun
} from 'lucide-react';

interface MazhaPixelPerfectProps {
  onBackToHub?: () => void;
}

export const MazhaPixelPerfect: React.FC<MazhaPixelPerfectProps> = ({ onBackToHub }) => {
  const [activeSideTab, setActiveSideTab] = useState<'live' | 'activity' | 'insights' | 'board'>('live');
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null);
  const [searchPin, setSearchPin] = useState('');
  const [totalReportsCount, setTotalReportsCount] = useState(1686);

  const districtAlerts = [
    { name: 'Alappuzha', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Ernakulam', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Idukki', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Kannur', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Kasaragod', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Kollam', level: 'YELLOW ALERT', color: 'text-yellow-400' },
    { name: 'Kottayam', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Kozhikode', level: 'ORANGE ALERT', color: 'text-amber-500' },
    { name: 'Malappuram', level: 'YELLOW ALERT', color: 'text-yellow-400' },
    { name: 'Palakkad', level: 'YELLOW ALERT', color: 'text-yellow-400' },
    { name: 'Wayanad', level: 'RED ALERT', color: 'text-red-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#070e1a] text-slate-100 font-sans flex flex-col overflow-hidden selection:bg-blue-600 selection:text-white">
      
      {/* 1. TOP NAV BAR (Exact mazha.LIVE Replica) */}
      <div className="bg-[#070e1a] border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between z-30 shrink-0">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-lg transition mr-1"
            >
              ← KeralaHub
            </button>
          )}
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <span className="text-lg font-black tracking-tight text-white">
              mazha<span className="text-cyan-400">.LIVE</span>
            </span>
          </div>
        </div>

        {/* Center Language Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-bold">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded transition ${
              language === 'en' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            ENGLISH
          </button>
          <button
            onClick={() => setLanguage('ml')}
            className={`px-3 py-1 rounded transition ${
              language === 'ml' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            മലയാളം
          </button>
        </div>

        {/* Right Theme Icon */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition">
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SCROLLING MARQUEE ALERT TICKER */}
      <div className="bg-[#0f0000] border-b border-red-900/40 text-xs py-1 px-2 overflow-hidden whitespace-nowrap shrink-0 z-20">
        <div className="inline-flex items-center gap-6 animate-marquee text-[11px] font-bold">
          {districtAlerts.map((alert, idx) => (
            <span key={idx} className="inline-flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-sm ${alert.level.includes('RED') ? 'bg-red-500' : alert.level.includes('ORANGE') ? 'bg-amber-500' : 'bg-yellow-400'}`}></span>
              <span className={alert.color}>{alert.level}</span>
              <span className="text-white">{alert.name}</span>
              <span className="text-slate-600">■</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. MAIN MAP WORKSPACE */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {/* Fullscreen Dark Interactive Map Embed */}
        <div className="absolute inset-0 bg-[#090d16] overflow-hidden">
          <iframe
            title="Kerala Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=74.85%2C8.25%2C77.55%2C12.85&amp;layer=mapnik"
            className="w-full h-full border-0 opacity-40 filter invert brightness-90 contrast-125 saturate-50 pointer-events-auto"
          ></iframe>

          {/* Overlay Grid Contours for Kerala Boundary effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a] via-transparent to-[#070e1a]/80 pointer-events-none"></div>
        </div>

        {/* LEFT FLOATING PANEL (KERALA RAIN NETWORK) */}
        <div className="absolute top-4 left-4 z-20 w-56 space-y-3 pointer-events-auto">
          <div className="bg-[#0b1322]/90 backdrop-blur-md border border-slate-800/90 rounded-xl p-3 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                KERALA RAIN NETWORK
              </span>
              <span className="text-[9px] text-slate-500">v2.4</span>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 gap-1.5 text-center text-xs">
              <div className="bg-[#101a2d] border border-slate-800 p-2 rounded-lg">
                <p className="text-base font-black text-white">0</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">REPORTS</p>
              </div>
              <div className="bg-[#101a2d] border border-slate-800 p-2 rounded-lg">
                <p className="text-base font-black text-cyan-400">0</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">ACTIVE</p>
              </div>
              <div className="bg-[#101a2d] border border-slate-800 p-2 rounded-lg">
                <p className="text-base font-black text-white">0</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">DISTRICTS</p>
              </div>
              <div className="bg-[#101a2d] border border-slate-800 p-2 rounded-lg">
                <p className="text-base font-black text-amber-400">⚠️</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase">PEAK</p>
              </div>
            </div>

            {/* Total Reports Counter */}
            <div className="bg-[#101a2d] border border-slate-800 p-2.5 rounded-lg text-center">
              <p className="text-lg font-black text-cyan-400 flex items-center justify-center gap-1">
                💧 <span>{totalReportsCount.toLocaleString()}</span>
              </p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">TOTAL REPORTS</p>
            </div>

            <div className="text-[9px] text-slate-400 flex justify-between px-1">
              <span>40 active</span>
              <span>2,566h uptime</span>
            </div>
          </div>

          <div className="bg-[#0b1322]/80 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 text-[11px] font-bold text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              LIVE REPORTS
            </span>
            <span className="text-slate-500">0 active</span>
          </div>
        </div>

        {/* CENTER BOTTOM FLOATING BUTTON: "Report Rain" */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <button
            onClick={() => setShowReportModal(true)}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-full shadow-2xl shadow-blue-600/50 transition-all scale-105 hover:scale-110 flex items-center gap-2 border border-blue-400/40"
          >
            <CloudRain className="w-5 h-5 animate-bounce" />
            <span>🌧️ Report Rain</span>
          </button>
        </div>

        {/* RIGHT FLOATING MAP TOOL CONTROLS */}
        <div className="absolute top-4 right-[380px] z-20 hidden lg:flex flex-col gap-2 pointer-events-auto">
          {[
            { icon: RefreshCw, label: 'Reload' },
            { icon: Locate, label: 'Locate' },
            { icon: Flame, label: 'Heatmap' },
            { icon: CloudRain, label: 'Rain' },
            { icon: AlertTriangle, label: 'Alerts' },
            { icon: Layers, label: 'Layers' },
            { icon: Maximize2, label: 'Expand' }
          ].map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <button
                key={idx}
                className="w-9 h-9 bg-[#0b1322]/90 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-800 backdrop-blur-md flex flex-col items-center justify-center transition group relative"
                title={tool.label}
              >
                <Icon className="w-4 h-4" />
                <span className="absolute right-12 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  {tool.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT FLOATING SIDE DRAWER ("Live Rain") */}
        <aside className="w-full sm:w-[360px] bg-[#0b1322]/95 border-l border-slate-800/80 z-20 flex flex-col h-full shrink-0 backdrop-blur-md pointer-events-auto">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <span>Live Rain</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <span className="text-[10px] text-blue-400 font-bold uppercase">LIVE</span>
            </h3>
          </div>

          {/* Search PIN Area */}
          <div className="p-3 border-b border-slate-800">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search PIN Area"
                value={searchPin}
                onChange={(e) => setSearchPin(e.target.value)}
                className="w-full bg-[#101a2d] border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* 4 Sub-Tabs: Live | Activity | Insights | Board */}
          <div className="grid grid-cols-4 text-center border-b border-slate-800 text-xs font-bold text-slate-400 bg-[#090f1b]">
            <button
              onClick={() => setActiveSideTab('live')}
              className={`py-2.5 border-b-2 transition ${
                activeSideTab === 'live' ? 'border-blue-500 text-blue-400 bg-slate-800/50' : 'border-transparent hover:text-white'
              }`}
            >
              🌧️ Live
            </button>
            <button
              onClick={() => setActiveSideTab('activity')}
              className={`py-2.5 border-b-2 transition ${
                activeSideTab === 'activity' ? 'border-blue-500 text-blue-400 bg-slate-800/50' : 'border-transparent hover:text-white'
              }`}
            >
              📈 Activity
            </button>
            <button
              onClick={() => setActiveSideTab('insights')}
              className={`py-2.5 border-b-2 transition ${
                activeSideTab === 'insights' ? 'border-blue-500 text-blue-400 bg-slate-800/50' : 'border-transparent hover:text-white'
              }`}
            >
              📊 Insights
            </button>
            <button
              onClick={() => setActiveSideTab('board')}
              className={`py-2.5 border-b-2 transition ${
                activeSideTab === 'board' ? 'border-blue-500 text-blue-400 bg-slate-800/50' : 'border-transparent hover:text-white'
              }`}
            >
              🏆 Board
            </button>
          </div>

          {/* Empty / Reports List Body */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-3 overflow-y-auto no-scrollbar">
            <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 text-2xl">
              🌧️
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-300">No reports yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
                Be the first to report rainfall in your PIN area right now!
              </p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-lg"
            >
              Submit First Report
            </button>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-400 bg-[#090f1b]">
            <button className="py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition">
              💧 All
            </button>
            <button className="py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition">
              🗺️ Districts
            </button>
            <button className="py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200 transition">
              🔍 Search
            </button>
          </div>

        </aside>

      </div>

      {/* 4. BOTTOM FOOTER BAR (Exact mazha.LIVE Footer) */}
      <div className="bg-[#050a12] border-t border-slate-800/80 px-4 py-2 text-[10px] text-slate-500 flex flex-wrap items-center justify-between gap-2 shrink-0 z-30">
        <div>
          <span>Crowdsourced · 0 active · 652 total reports · Not official meteorology</span>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-2.5 py-1 bg-red-950/60 border border-red-800/50 text-red-400 rounded-full font-bold flex items-center gap-1 text-[10px]">
            <Heart className="w-3 h-3 fill-red-400" /> Support
          </button>
          <span>Made by Akhil</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Disclaimer</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">About</span>
          <span>•</span>
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
        </div>
      </div>

      {/* REPORT RAIN MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1322] border border-slate-800 rounded-3xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-cyan-400" />
                <span>Report Live Rainfall</span>
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300">Select current rain condition at your location:</p>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: '☀️ No Rain', val: 'no_rain' },
                  { label: '🌦️ Light Rain', val: 'light' },
                  { label: '🌧️ Moderate Rain', val: 'moderate' },
                  { label: '⛈️ Heavy Rain', val: 'heavy' },
                  { label: '🌩️ Torrential Rain', val: 'torrential' }
                ].map((item) => (
                  <button
                    key={item.val}
                    onClick={() => {
                      setSelectedIntensity(item.val);
                      setTotalReportsCount(totalReportsCount + 1);
                      alert(`Rain report "${item.label}" recorded! Thank you.`);
                      setShowReportModal(false);
                    }}
                    className={`p-3 rounded-2xl border transition text-left font-bold bg-[#101a2d] hover:bg-slate-800 border-slate-800 text-slate-200 hover:text-white flex items-center justify-between ${
                      selectedIntensity === item.val ? 'border-cyan-500 ring-1 ring-cyan-500' : ''
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
