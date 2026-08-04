import React, { useState } from 'react';
import { MapPin, Tent, MessageSquare, PhoneCall, PlusCircle, ShieldAlert, Radio, HelpCircle, Shield, Menu, X, Camera, Briefcase, Calendar, ShieldCheck } from 'lucide-react';
import { DistrictName } from '../types';
import { KERALA_DISTRICTS } from '../data/mockData';
import { Language, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  activeTab: 'map' | 'feed' | 'jobs' | 'events' | 'camps' | 'forums' | 'contacts' | 'admin';
  onSelectTab: (tab: 'map' | 'feed' | 'jobs' | 'events' | 'camps' | 'forums' | 'contacts' | 'admin') => void;
  onOpenSOSModal: () => void;
  onOpenReportModal: () => void;
  onOpenBloggerModal: () => void;
  sosCount: number;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  currentUser: { email: string; name?: string } | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedDistrict,
  onSelectDistrict,
  activeTab,
  onSelectTab,
  onOpenSOSModal,
  onOpenReportModal,
  onOpenBloggerModal,
  sosCount,
  language,
  onToggleLanguage,
  currentUser,
  onOpenAuthModal,
  onSignOut
}) => {
  const t = TRANSLATIONS[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-sans">
      
      {/* Official Crisis Live Ticker Bar */}
      <div className="bg-slate-900 text-white px-3 sm:px-4 py-1 text-[11px] sm:text-xs flex items-center justify-between border-b border-red-900/40">
        <div className="flex items-center gap-1.5 overflow-hidden max-w-[65%] sm:max-w-[75%]">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-bold text-red-400 uppercase shrink-0 hidden sm:inline">
            LIVE ALERT:
          </span>
          <span className="truncate text-slate-300">
            {t.sos_alert_ticker}
          </span>
        </div>

        <div className="flex items-center gap-2">
            {/* User Profile Badge or Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-white px-2 py-0.5 rounded text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="truncate max-w-[100px] font-bold">{currentUser.name || currentUser.email}</span>
                <button
                  onClick={onSignOut}
                  className="text-slate-400 hover:text-red-400 ml-1 text-[10px]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold px-2 py-0.5 rounded border border-slate-700 transition flex items-center gap-1"
              >
                <span>Sign In</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded p-0.5 text-[10px] sm:text-[11px]">
            <button
              onClick={() => onToggleLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition ${
                language === 'en' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onToggleLanguage('ml')}
              className={`px-1.5 py-0.5 rounded transition ${
                language === 'ml' ? 'bg-red-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              മലയാളം
            </button>
          </div>

          <button
            onClick={onOpenBloggerModal}
            className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-[11px] border border-slate-700 transition"
          >
            <HelpCircle className="w-3 h-3 text-red-400" />
            <span>{t.btn_blogger_guide}</span>
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/20 border border-red-500 shrink-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-none">
                  KERALA<span className="text-red-600">HUB</span>.ONLINE
                </h1>
                <span className="bg-red-50 text-red-700 border border-red-200 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.2 rounded">
                  EMERGENCY
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-1">
                {t.brand_subtitle}
              </p>
            </div>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* District Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <select
                value={selectedDistrict}
                onChange={(e) => onSelectDistrict(e.target.value as DistrictName)}
                className="bg-transparent font-medium text-slate-900 focus:outline-none cursor-pointer pr-1"
              >
                {KERALA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist === 'All Districts' ? t.filter_all_districts : dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Report Hazard */}
            <button
              onClick={onOpenReportModal}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 transition border border-slate-800 shadow-sm whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.btn_report}</span>
            </button>

            {/* Emergency SOS Trigger */}
            <button
              onClick={onOpenSOSModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 shadow-md shadow-red-600/25 transition active:scale-95 whitespace-nowrap"
            >
              <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
              <span>{t.btn_sos}</span>
            </button>
          </div>

          {/* Mobile Fast SOS & Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSOSModal}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-md shadow-red-600/30 animate-bounce"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>SOS</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Expandable Control Bar */}
        {mobileMenuOpen && (
          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 lg:hidden bg-slate-50 p-3 rounded-xl">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-600">Select District:</span>
              <div className="flex-1 max-w-[200px] flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    onSelectDistrict(e.target.value as DistrictName);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-transparent font-medium text-slate-900 focus:outline-none"
                >
                  {KERALA_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist === 'All Districts' ? t.filter_all_districts : dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  onOpenReportModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-900 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.btn_report}</span>
              </button>

              <button
                onClick={() => {
                  onOpenBloggerModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-800 text-slate-200 text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Blogger Guide</span>
              </button>
            </div>
          </div>
        )}

        {/* Responsive Tab Navigation Bar */}
        <div className="flex items-center gap-1 mt-3 border-t border-slate-100 pt-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onSelectTab('map')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'map'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{t.nav_map}</span>
          </button>

          <button
            onClick={() => onSelectTab('feed')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'feed'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4 shrink-0" />
            <span>{t.nav_feed}</span>
          </button>

          <button
            onClick={() => onSelectTab('jobs')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'jobs'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>{t.nav_jobs}</span>
          </button>

          <button
            onClick={() => onSelectTab('events')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'events'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{t.nav_events}</span>
          </button>

          <button
            onClick={() => onSelectTab('camps')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'camps'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Tent className="w-4 h-4 shrink-0" />
            <span>{t.nav_camps}</span>
          </button>

          <button
            onClick={() => onSelectTab('forums')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'forums'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>{t.nav_forums}</span>
          </button>

          <button
            onClick={() => onSelectTab('contacts')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'contacts'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-4 h-4 shrink-0" />
            <span>{t.nav_contacts}</span>
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{t.nav_admin}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
