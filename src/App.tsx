import React, { useState, useEffect } from 'react';
import { CloudRain, Compass, Users, ShoppingBag, Briefcase, Bot, PhoneCall, ShieldAlert, Waves, ArrowRight, Building2, Flame, MapPin, Search } from 'lucide-react';
import { MazhaFullTracker } from './components/MazhaFullTracker';

type ActiveModule = 'home' | 'rain' | 'map' | 'feed' | 'jobs' | 'events' | 'ai' | 'contacts';

export const App: React.FC = () => {
  const getInitialModule = (): ActiveModule => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validModules: ActiveModule[] = ['home', 'rain', 'map', 'feed', 'jobs', 'events', 'ai', 'contacts'];
    return validModules.includes(hash as ActiveModule) ? (hash as ActiveModule) : 'home';
  };

  const [activeModule, setActiveModuleState] = useState<ActiveModule>(getInitialModule);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const setActiveModule = (mod: ActiveModule) => {
    setActiveModuleState(mod);
    window.location.hash = `#/${mod}`;
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validModules: ActiveModule[] = ['home', 'rain', 'map', 'feed', 'jobs', 'events', 'ai', 'contacts'];
      if (validModules.includes(hash as ActiveModule)) {
        setActiveModuleState(hash as ActiveModule);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-700 selection:text-white pb-12">
      
      {/* Official Government Top Ticker Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              State Portal • Government of Kerala Digital Ecosystem
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">State Control Desk: 1070</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-bold flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> District Helpline: 1077
            </span>
          </div>
        </div>
      </div>

      {/* Main Official Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          
          {/* Logo & Brand */}
          <button onClick={() => setActiveModule('home')} className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-amber-400 font-black text-xl shadow">
              🛡️
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                Kerala<span className="text-blue-700">Hub</span>.online
              </h1>
              <p className="text-xs text-slate-500 font-medium">The Digital Ecosystem of Kerala</p>
            </div>
          </button>

          {/* Navigation Bar & Language */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModule('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeModule === 'home'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Home Hub
            </button>

            {/* Direct Rain Selector Button */}
            <button
              onClick={() => setActiveModule('rain')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeModule === 'rain'
                  ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 text-sky-600" />
              <span>Live Rain Tracker 🌧️</span>
            </button>

            {/* Language Switch */}
            <div className="hidden sm:flex items-center bg-slate-100 border border-slate-300 rounded-xl p-0.5 text-xs font-bold ml-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  language === 'en' ? 'bg-blue-900 text-white' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  language === 'ml' ? 'bg-blue-900 text-white' : 'text-slate-600'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main View Module Switcher */}
      {activeModule === 'rain' ? (
        <MazhaFullTracker />
      ) : (
        /* HOME SCREEN PORTAL GRID */
        <main className="max-w-6xl mx-auto px-3 sm:px-4 py-8 space-y-8 animate-fadeIn">
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                OFFICIAL KERALA DIGITAL HUB
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome to KeralaHub.online
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kerala's unified digital platform — Select any service below to view Live Rain & Dam data, Community Feeds, Satellite Maps, Jobs, and Emergency Alerts.
              </p>
            </div>
          </div>

          {/* HOME GRID SERVICES SELECTOR */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900">Explore KeralaHub Services</h3>
              <span className="text-xs text-slate-500 font-medium">Select a category below</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Service 1: LIVE RAIN & DAM TRACKER (Mazha.live) */}
              <div
                onClick={() => setActiveModule('rain')}
                className="bg-white border border-slate-200 hover:border-sky-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                  🌧️
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-sky-700 transition">
                      Live Rain & Dam Tracker
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Crowdsourced rain intensity reports, dam water levels & spillway gate release warnings across all 14 districts.
                  </p>
                </div>
                <span className="inline-block text-[10px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  Featured Service (Mazha.live)
                </span>
              </div>

              {/* Service 2: LIVE GIS SATELLITE MAP & SOS */}
              <div
                onClick={() => setActiveModule('rain')}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                  🗺️
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition">
                      GIS Satellite Map & SOS
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Esri high-resolution satellite map, live flood pins & 1-tap auto-GPS emergency rescue SOS button.
                  </p>
                </div>
                <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Emergency GIS Layer
                </span>
              </div>

              {/* Service 3: COMMUNITY FEED */}
              <div
                onClick={() => setActiveModule('rain')}
                className="bg-white border border-slate-200 hover:border-blue-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                  📸
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition">
                      Kerala Community Feed
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Twitter/X-style micro-feed for Kerala news, citizen photos, district updates, and social dispatches.
                  </p>
                </div>
                <span className="inline-block text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Social Hub
                </span>
              </div>

              {/* Service 4: JOBS & EMPLOYMENT */}
              <div
                onClick={() => setActiveModule('rain')}
                className="bg-white border border-slate-200 hover:border-purple-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                  💼
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition">
                      Jobs & Careers Portal
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Kerala Government recruitment alerts, Technopark/Infopark IT hiring, private jobs, and internships.
                  </p>
                </div>
                <span className="inline-block text-[10px] font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                  Employment Desk
                </span>
              </div>

              {/* Service 5: MARKETPLACE */}
              <div
                onClick={() => setActiveModule('rain')}
                className="bg-white border border-slate-200 hover:border-amber-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                  🛍️
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition">
                      Marketplace & Free Items
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Buy, sell, or donate relief goods, electronics, hostel/PG listings, and community classifieds.
                  </p>
                </div>
                <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Classifieds
                </span>
              </div>

              {/* Service 6: AI KNOWLEDGE ENGINE */}
              <div
                onClick={() => setActiveModule('rain')}
                className="bg-white border border-slate-200 hover:border-rose-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                  🤖
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-slate-900 group-hover:text-rose-700 transition">
                      Kerala AI Assistant
                    </h4>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-1 transition" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    24x7 intelligent chat assistant for weather guidelines, hospital locations, and district information.
                  </p>
                </div>
                <span className="inline-block text-[10px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Smart AI Bot
                </span>
              </div>

            </div>
          </div>

        </main>
      )}

      {/* Official Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 font-sans mt-12">
        <p>© 2026 <strong>KeralaHub.online</strong> • The Complete Digital Ecosystem of Kerala</p>
      </footer>

    </div>
  );
};

export default App;
