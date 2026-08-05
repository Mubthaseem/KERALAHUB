import React, { useState, useEffect } from 'react';
import { CloudRain, Compass, Users, ShoppingBag, Briefcase, Bot, PhoneCall, ShieldAlert, Waves, ArrowRight, Building2, Flame, MapPin, Search } from 'lucide-react';
import { useEmergencyStore } from './services/store';

import { MazhaFullTracker } from './components/MazhaFullTracker';
import { InteractiveDisasterMap } from './components/InteractiveDisasterMap';
import { PhotoFeed } from './components/PhotoFeed';
import { MarketplaceJobs } from './components/MarketplaceJobs';
import { EventsTourism } from './components/EventsTourism';
import { AIAssistant } from './components/AIAssistant';
import { EmergencyContacts } from './components/EmergencyContacts';
import { SOSModal } from './components/SOSModal';
import { ReportModal } from './components/ReportModal';
import { AuthModal } from './components/AuthModal';

type ActiveModule = 'home' | 'rain' | 'map' | 'feed' | 'jobs' | 'events' | 'ai' | 'contacts';

export const App: React.FC = () => {
  const {
    sosRequests,
    disasterReports,
    reliefCamps,
    selectedDistrict,
    setSelectedDistrict,
    currentUser,
    setCurrentUser,
    addSOSRequest,
    addDisasterReport,
    upvoteReport
  } = useEmergencyStore();

  const getInitialModule = (): ActiveModule => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validModules: ActiveModule[] = ['home', 'rain', 'map', 'feed', 'jobs', 'events', 'ai', 'contacts'];
    return validModules.includes(hash as ActiveModule) ? (hash as ActiveModule) : 'home';
  };

  const [activeModule, setActiveModuleState] = useState<ActiveModule>(getInitialModule);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mapSOSCoords, setMapSOSCoords] = useState<{ lat: number; lng: number } | null>(null);

  const setActiveModule = (mod: ActiveModule) => {
    setActiveModuleState(mod);
    window.location.hash = `#/${mod}`;
  };

  const requireAuth = (action: () => void) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    } else {
      action();
    }
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
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveModule('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                activeModule === 'rain'
                  ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 text-sky-600" />
              <span>Live Rain 🌧️</span>
            </button>

            <button
              onClick={() => setActiveModule('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                activeModule === 'map' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Satellite Map</span>
            </button>

            <button
              onClick={() => setActiveModule('feed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                activeModule === 'feed' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Feed</span>
            </button>

            <button
              onClick={() => setActiveModule('jobs')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                activeModule === 'jobs' ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs</span>
            </button>

            <button
              onClick={() => setActiveModule('ai')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                activeModule === 'ai' ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Bot</span>
            </button>

            {/* Language Switch */}
            <div className="hidden md:flex items-center bg-slate-100 border border-slate-300 rounded-xl p-0.5 text-xs font-bold ml-1">
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

      {/* Main Content View Switcher */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
        {activeModule === 'rain' && <MazhaFullTracker />}

        {activeModule === 'map' && (
          <InteractiveDisasterMap
            sosRequests={sosRequests}
            disasterReports={disasterReports}
            reliefCamps={reliefCamps}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onOpenSOSModalWithCoords={(lat, lng) => {
              requireAuth(() => {
                setMapSOSCoords({ lat, lng });
                setIsSOSModalOpen(true);
              });
            }}
            onUpvoteReport={upvoteReport}
            language={language}
          />
        )}

        {activeModule === 'feed' && (
          <PhotoFeed
            reports={disasterReports}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onAddReport={(data) => requireAuth(() => addDisasterReport(data))}
            onUpvoteReport={upvoteReport}
            language={language}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeModule === 'jobs' && (
          <MarketplaceJobs
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            language={language}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeModule === 'events' && (
          <EventsTourism
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            language={language}
          />
        )}

        {activeModule === 'ai' && (
          <AIAssistant selectedDistrict={selectedDistrict} />
        )}

        {activeModule === 'contacts' && (
          <EmergencyContacts />
        )}

        {activeModule === 'home' && (
          /* HOME SCREEN PORTAL GRID */
          <div className="space-y-8 animate-fadeIn">
            
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
                <span className="text-xs text-slate-500 font-medium">Click any category to launch</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Service 1: LIVE RAIN & DAM TRACKER (Mazha.live) */}
                <div
                  onClick={() => setActiveModule('rain')}
                  className="bg-white border border-slate-200 hover:border-sky-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
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
                    Mazha.live Features
                  </span>
                </div>

                {/* Service 2: LIVE GIS SATELLITE MAP & SOS */}
                <div
                  onClick={() => setActiveModule('map')}
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
                  onClick={() => setActiveModule('feed')}
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
                  onClick={() => setActiveModule('jobs')}
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

                {/* Service 5: EVENTS & TOURISM */}
                <div
                  onClick={() => setActiveModule('events')}
                  className="bg-white border border-slate-200 hover:border-amber-500 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer group space-y-3"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition">
                    🌴
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition">
                        Events & Tourism Guide
                      </h4>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Thrissur Pooram, Boat Races, Tech Summits, Munnar/Wayanad hill station travel & festival calendar.
                    </p>
                  </div>
                  <span className="inline-block text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Tourism Calendar
                  </span>
                </div>

                {/* Service 6: AI KNOWLEDGE ENGINE */}
                <div
                  onClick={() => setActiveModule('ai')}
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

          </div>
        )}
      </main>

      {/* Modals */}
      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onSubmitSOS={addSOSRequest}
        initialCoords={mapSOSCoords}
        selectedDistrict={selectedDistrict}
        currentUser={currentUser}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={addDisasterReport}
        selectedDistrict={selectedDistrict}
        currentUser={currentUser}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Official Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 font-sans mt-12">
        <p>© 2026 <strong>KeralaHub.online</strong> • The Complete Digital Ecosystem of Kerala</p>
      </footer>

    </div>
  );
};

export default App;
