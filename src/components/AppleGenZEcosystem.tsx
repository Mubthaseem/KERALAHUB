import React, { useState } from 'react';
import { 
  Search, MapPin, Bell, User, CloudRain, ShieldAlert, Sparkles, MessageSquare, 
  Share2, Heart, Repeat, Plus, Compass, TrendingUp, AlertTriangle, CheckCircle, 
  Activity, ArrowUpRight, Flame, Layers, PhoneCall, Bot, Briefcase, ShoppingBag, 
  Users, ChevronRight, X, Radio, Train, Bus, Zap, Shield, Filter
} from 'lucide-react';
import { MazhaPixelPerfect } from './MazhaPixelPerfect';
import { InteractiveDisasterMap } from './InteractiveDisasterMap';
import { PhotoFeed } from './PhotoFeed';
import { MarketplaceJobs } from './MarketplaceJobs';
import { EventsTourism } from './EventsTourism';
import { AIAssistant } from './AIAssistant';
import { EmergencyContacts } from './EmergencyContacts';
import { useEmergencyStore } from '../services/store';

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

const KERALA_14_DISTRICTS = [
  { name: 'Ernakulam', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80', pop: '3.4M', temp: '28°C', alert: 'Normal', trending: '#KochiTechSummit' },
  { name: 'Thiruvananthapuram', img: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=600&q=80', pop: '3.3M', temp: '29°C', alert: 'Normal', trending: 'Technopark Phase 4' },
  { name: 'Wayanad', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80', pop: '817K', temp: '22°C', alert: 'Orange Alert', trending: '#ChooralmalaRescue' },
  { name: 'Idukki', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', pop: '1.1M', temp: '19°C', alert: 'Red Alert', trending: 'Cheruthoni Gate 2' },
  { name: 'Alappuzha', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80', pop: '2.1M', temp: '27°C', alert: 'Yellow Alert', trending: 'Kuttanad Waterway' },
  { name: 'Kozhikode', img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=600&q=80', pop: '3.0M', temp: '28°C', alert: 'Normal', trending: 'Beach Food Festival' },
  { name: 'Thrissur', img: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80', pop: '3.1M', temp: '29°C', alert: 'Normal', trending: 'Vadakkunnathan Event' },
  { name: 'Kottayam', img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80', pop: '1.9M', temp: '26°C', alert: 'Yellow Alert', trending: 'Meenachil Basin' },
  { name: 'Malappuram', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', pop: '4.1M', temp: '29°C', alert: 'Normal', trending: 'Sevens Football' },
  { name: 'Palakkad', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80', pop: '2.8M', temp: '31°C', alert: 'Normal', trending: 'Malampuzha Storage' },
  { name: 'Pathanamthitta', img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80', pop: '1.2M', temp: '25°C', alert: 'Yellow Alert', trending: 'Pamba River Flow' },
  { name: 'Kannur', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', pop: '2.5M', temp: '28°C', alert: 'Normal', trending: 'Theyyam Festival' },
  { name: 'Kollam', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', pop: '2.6M', temp: '28°C', alert: 'Normal', trending: 'Ashtamudi Kayal' },
  { name: 'Kasaragod', img: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80', pop: '1.3M', temp: '29°C', alert: 'Normal', trending: 'Bekal Fort Sunset' }
];

export const AppleGenZEcosystem: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState<'home' | 'rain' | 'map' | 'feed' | 'jobs' | 'events' | 'ai' | 'contacts'>('home');
  const [language, setLanguage] = useState<'en' | 'ml'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-slate-900 font-sans selection:bg-emerald-500 selection:text-white pb-20 md:pb-12">
      
      {/* 1. FLOATING GLASS NAVIGATION BAR (Apple / Linear / Arc Style) */}
      <nav className="fixed top-3 left-0 right-0 z-50 max-w-7xl mx-auto px-3 sm:px-6">
        <div className="apple-glass rounded-3xl p-2.5 sm:p-3 shadow-apple flex items-center justify-between gap-3 border border-white/80">
          
          {/* Logo & Brand */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 px-2 hover:opacity-80 transition text-left"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-emerald-400 font-black text-xl shadow-md">
              🌿
            </div>
            <div className="hidden sm:block">
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight leading-none">
                Kerala<span className="text-emerald-600">Hub</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">THE DIGITAL ECOSYSTEM</p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search news, districts, rain, jobs, emergency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/80 border border-slate-200/80 rounded-2xl py-2 pl-11 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
          </div>

          {/* Nav Tabs & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('rain')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rain'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rain Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Live Map</span>
            </button>

            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all hidden lg:flex items-center gap-1.5 ${
                activeTab === 'feed'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Feed</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
            >
              {language === 'en' ? 'മലയാളം' : 'EN'}
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={() => setIsAiOpen(!isAiOpen)}
              className="p-2.5 bg-gradient-to-r from-emerald-500 to-sky-500 text-white rounded-2xl shadow-md hover:opacity-90 transition scale-95 hover:scale-100"
              title="Kerala AI Assistant"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

        </div>
      </nav>

      {/* Spacer for Floating Navbar */}
      <div className="h-20 sm:h-24"></div>

      {/* Active Tab Sub-view Switcher */}
      {activeTab === 'rain' && <MazhaPixelPerfect onBackToHub={() => setActiveTab('home')} />}

      {activeTab === 'map' && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <InteractiveDisasterMap
            sosRequests={sosRequests}
            disasterReports={disasterReports}
            reliefCamps={reliefCamps}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onOpenSOSModalWithCoords={() => {}}
            onUpvoteReport={upvoteReport}
            language={language}
          />
        </div>
      )}

      {activeTab === 'feed' && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <PhotoFeed
            reports={disasterReports}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onAddReport={() => {}}
            onUpvoteReport={upvoteReport}
            language={language}
            currentUser={currentUser}
            onOpenAuthModal={() => {}}
          />
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <MarketplaceJobs
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            language={language}
            currentUser={currentUser}
            onOpenAuthModal={() => {}}
          />
        </div>
      )}

      {activeTab === 'events' && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <EventsTourism
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            language={language}
          />
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <AIAssistant selectedDistrict={selectedDistrict} />
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <EmergencyContacts />
        </div>
      )}

      {/* 2. HOMEPAGE EXPERIENCE */}
      {activeTab === 'home' && (
        <main className="max-w-7xl mx-auto px-3 sm:px-6 space-y-8 animate-fadeIn">
          
          {/* HERO SECTION: "Kerala, Live." */}
          <div className="relative rounded-4xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-8 sm:p-12 text-white shadow-2xl overflow-hidden border border-white/10">
            {/* Background Contours & Soft Glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>KERALA DIGITAL ECOSYSTEM • LIVE 2026</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
                Kerala, <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">Live.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl leading-relaxed">
                Everything happening across Kerala in one place — Community, Emergency Alerts, Rain Trackers, Jobs, Events & Tourism. Powered by the people.
              </p>

              {/* Quick Action Chips */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('rain')}
                  className="px-4 py-2.5 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 transition flex items-center gap-2 backdrop-blur-md"
                >
                  <CloudRain className="w-4 h-4 text-sky-400" />
                  <span>Live Rain Tracker</span>
                </button>

                <button
                  onClick={() => setActiveTab('map')}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 transition flex items-center gap-2 backdrop-blur-md"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>3D GIS Map</span>
                </button>

                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-4 py-2.5 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 transition flex items-center gap-2 backdrop-blur-md"
                >
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span>Jobs & Careers</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. 🚨 URGENT NEWS HERO (Bloomberg + Apple News Style) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <span>Urgent Kerala News Stream</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">Updated 24x7 Control Desk</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Featured Left Card (Apple News Featured Card) */}
              <div className="lg:col-span-2 apple-card overflow-hidden group cursor-pointer border border-slate-200/80">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
                    alt="Emergency Feature"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                      RED ALERT • WAYANAD & IDUKKI
                    </span>
                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30">
                      KSDMA VERIFIED
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                    <p className="text-xs text-emerald-300 font-bold">📍 Chooralmala, Wayanad • 10 mins ago</p>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug group-hover:text-emerald-300 transition">
                      Heavy Monsoon Downpour Forecasted Across Hilly Terrains; Relief Control Operations Activated
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      State Disaster Management Authority issues emergency protocol for Banasura Sagar and Cheruthoni spillway river basins.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side Scrollable Stream List */}
              <div className="apple-card p-4 space-y-3 flex flex-col justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2">
                  Breaking News Stream
                </h3>

                <div className="space-y-3 max-h-72 overflow-y-auto no-scrollbar pr-1">
                  {[
                    { tag: 'WEATHER', title: 'IMD issues Yellow Alert for Kottayam & Alappuzha', time: '15m ago', dist: 'Kottayam' },
                    { tag: 'TRAFFIC', title: 'Munnar Gap Road opened for light vehicles only', time: '32m ago', dist: 'Idukki' },
                    { tag: 'GOVT', title: 'K-FON Phase 2 high-speed broadband expansion launched', time: '1h ago', dist: 'Statewide' },
                    { tag: 'JOBS', title: 'Technopark Phase IV hiring drive for 2,500 software engineers', time: '2h ago', dist: 'Trivandrum' }
                  ].map((news, idx) => (
                    <div key={idx} className="p-2.5 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {news.tag}
                        </span>
                        <span className="text-[10px] text-slate-400">{news.time} • {news.dist}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs hover:text-emerald-700 transition leading-snug">
                        {news.title}
                      </h4>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveTab('feed')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                >
                  <span>Open Full News Feed</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* 4. LIVE STATUS CHIPS BAR */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Live Status Updates Across Kerala
            </h3>

            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
              {[
                { icon: CloudRain, label: '🟢 Rain Alerts', text: 'Normal in Kochi, Heavy in Idukki', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
                { icon: AlertTriangle, label: '🚨 Emergency', text: 'Control Room 1070 Active', color: 'bg-red-50 border-red-200 text-red-800' },
                { icon: MapPin, label: '🚧 Road Closures', text: 'Munnar Gap Road Restricted', color: 'bg-amber-50 border-amber-200 text-amber-800' },
                { icon: Zap, label: '⚡ Power Grid', text: '98.5% Statewide Grid Stable', color: 'bg-blue-50 border-blue-200 text-blue-800' },
                { icon: Train, label: '🚆 Railway', text: 'Vande Bharat On Time', color: 'bg-purple-50 border-purple-200 text-purple-800' },
                { icon: Bus, label: '🚌 KSRTC Swift', text: 'All Inter-District Buses Running', color: 'bg-sky-50 border-sky-200 text-sky-800' }
              ].map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border ${chip.color} shrink-0 text-xs font-bold shadow-sm transition hover:scale-105 cursor-pointer`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div>
                      <p className="leading-none">{chip.label}</p>
                      <p className="text-[10px] font-normal opacity-80 mt-0.5">{chip.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. DISTRICT QUICK ACCESS (14 CARDS) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Explore All 14 Kerala Districts
              </h2>
              <span className="text-xs text-slate-500 font-medium">Select a district to view local updates</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {KERALA_14_DISTRICTS.map((dist, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedDistrict(dist.name as any);
                    setActiveTab('map');
                  }}
                  className="apple-card overflow-hidden group cursor-pointer p-3 space-y-2 border border-slate-200/80 hover:border-emerald-500 transition"
                >
                  <div className="h-32 rounded-2xl overflow-hidden relative">
                    <img
                      src={dist.img}
                      alt={dist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>

                    <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      dist.alert.includes('Red') ? 'bg-red-600 text-white border-red-500' :
                      dist.alert.includes('Orange') ? 'bg-amber-500 text-white border-amber-400' :
                      'bg-emerald-600 text-white border-emerald-500'
                    }`}>
                      {dist.alert}
                    </span>

                    <div className="absolute bottom-2 left-2 text-white">
                      <h4 className="font-extrabold text-sm leading-tight">{dist.name}</h4>
                      <p className="text-[10px] text-slate-300">Pop: {dist.pop} • {dist.temp}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
                    <span className="truncate font-semibold text-emerald-700">{dist.trending}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {/* 6. AI ASSISTANT EXPANDABLE SIDE PANEL (Vercel / Notion AI Style) */}
      {isAiOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 apple-glass-dark text-white p-6 shadow-2xl flex flex-col justify-between border-l border-white/20 animate-slideLeft">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-white">Kerala AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsAiOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="font-medium">Ask me anything about Kerala in natural language:</p>
              <div className="space-y-1.5 pt-2">
                {[
                  "Is Munnar Gap Road blocked?",
                  "What is the water level of Banasura Sagar Dam?",
                  "Jobs hiring in Technopark Trivandrum?",
                  "Nearest emergency hospital in Kottayam?"
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => alert(`Asking AI: "${prompt}"...`)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition text-slate-200 hover:text-white flex items-center justify-between"
                  >
                    <span>{prompt}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Ask Kerala AI..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      )}

      {/* 7. FLOATING MOBILE BOTTOM NAVIGATION (Apple Frosted Glass Pill) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="apple-glass rounded-full p-2 shadow-2xl border border-white/80 flex items-center justify-around">
          {[
            { id: 'home', icon: Compass, label: 'Home' },
            { id: 'rain', icon: CloudRain, label: 'Rain' },
            { id: 'map', icon: MapPin, label: 'Map' },
            { id: 'feed', icon: Users, label: 'Feed' },
            { id: 'jobs', icon: Briefcase, label: 'Jobs' }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white font-bold scale-105 shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
