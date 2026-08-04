import React from 'react';
import { AlertTriangle, MapPin, Tent, MessageSquare, PhoneCall, PlusCircle, ShieldAlert, Radio, HelpCircle } from 'lucide-react';
import { DistrictName } from '../types';
import { KERALA_DISTRICTS } from '../data/mockData';

interface NavbarProps {
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  activeTab: 'map' | 'camps' | 'forums' | 'contacts';
  onSelectTab: (tab: 'map' | 'camps' | 'forums' | 'contacts') => void;
  onOpenSOSModal: () => void;
  onOpenReportModal: () => void;
  onOpenBloggerModal: () => void;
  sosCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedDistrict,
  onSelectDistrict,
  activeTab,
  onSelectTab,
  onOpenSOSModal,
  onOpenReportModal,
  onOpenBloggerModal,
  sosCount
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Spider-Tracker Crisis Live Ticker */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs font-mono flex items-center justify-between border-b border-red-900/40">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-bold text-red-400 tracking-wide uppercase flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" /> SPIDER-TRACKER RADAR LIVE:
          </span>
          <span className="truncate text-slate-300">
            Waynad Chooralmala & Kuttanad Alappuzha emergency response active • {sosCount} Active Rescue Signals Pending
          </span>
        </div>
        <button
          onClick={onOpenBloggerModal}
          className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-[11px] font-mono border border-slate-700 transition"
        >
          <HelpCircle className="w-3 h-3 text-red-400" />
          <span>$0 Blogger Deploy Guide</span>
        </button>
      </div>

      {/* Main Header HUD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Spider HUD Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-500/20 border border-red-500">
                {/* Spider Radar Web Icon */}
                <svg className="w-6 h-6 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" strokeOpacity="0.4"/>
                  <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold font-mono text-slate-900 tracking-tight flex items-center gap-1.5">
                    KERALA<span className="text-red-600">HUB</span>.ONLINE
                  </h1>
                  <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                    SPIDER-RADAR V1
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Statewide Emergency Disaster Map & Community SOS
                </p>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onOpenSOSModal}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-md shadow-red-600/30 animate-bounce"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>SOS</span>
              </button>
            </div>
          </div>

          {/* District Selector & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* District Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <select
                value={selectedDistrict}
                onChange={(e) => onSelectDistrict(e.target.value as DistrictName)}
                className="bg-transparent font-medium text-slate-900 focus:outline-none cursor-pointer pr-1"
              >
                {KERALA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Report Photo Button */}
            <button
              onClick={onOpenReportModal}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition border border-slate-800 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Report Hazard / Photo</span>
            </button>

            {/* Desktop SOS Trigger */}
            <button
              onClick={onOpenSOSModal}
              className="hidden md:flex bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg items-center gap-2 shadow-md shadow-red-600/25 transition transform active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
              <span>DISPATCH EMERGENCY SOS</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-4 border-t border-slate-100 pt-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectTab('map')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Interactive Spider Radar Map</span>
          </button>

          <button
            onClick={() => onSelectTab('camps')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'camps'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Tent className="w-4 h-4" />
            <span>Relief Camps & Supplies</span>
          </button>

          <button
            onClick={() => onSelectTab('forums')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'forums'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>District Community Forums</span>
          </button>

          <button
            onClick={() => onSelectTab('contacts')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Helplines</span>
          </button>
        </div>

      </div>
    </header>
  );
};
