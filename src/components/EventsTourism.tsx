import React, { useState } from 'react';
import { EventItem, DistrictName } from '../types';
import { Calendar, Compass, MapPin, Clock, Users, ArrowUpRight, Sun, Award } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface EventsTourismProps {
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  language: Language;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-01',
    title: 'Thrissur Pooram Grand Cultural Spectacle',
    district: 'Thrissur',
    category: 'Festival',
    event_date: 'May 2026',
    location_name: 'Vadakkunnathan Temple Ground, Thrissur',
    description: 'The mother of all Kerala temple festivals with traditional Kudamattam, Elanjithara Melam, and fireworks.',
    organizer_name: 'Thrissur Paramekkavu & Thiruvambady Devaswoms',
    image_url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-02',
    title: 'Kerala Tech Summit & AI Hackathon',
    district: 'Ernakulam',
    category: 'Tech Meetup',
    event_date: 'August 15, 2026',
    location_name: 'Infopark Phase 1, Kochi',
    description: 'Statewide developer gathering focused on Web GIS, Open-source disaster tech, and AI applications.',
    organizer_name: 'Kerala Tech Community & Startup Mission',
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  }
];

const TOURISM_DESTINATIONS = [
  {
    name: 'Munnar Tea Gardens & Anamudi Peak',
    district: 'Idukki',
    tag: 'Hill Station',
    rating: '4.9 ★',
    desc: 'Lush green tea plantations, misty valleys, and cool climate at 1,600m above sea level.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Varkala Cliff Beach & Mineral Springs',
    district: 'Thiruvananthapuram',
    tag: 'Coastal Beach',
    rating: '4.8 ★',
    desc: 'Dramatic red sandstone cliffs overlooking the Arabian Sea with sunset points and natural water springs.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Alappuzha Backwaters & Houseboat Cruise',
    district: 'Alappuzha',
    tag: 'Backwaters',
    rating: '4.9 ★',
    desc: 'The Venice of the East — serene backwater canals, traditional Kettuvallam houseboats, and paddy fields.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  }
];

export const EventsTourism: React.FC<EventsTourismProps> = ({
  selectedDistrict,
  onSelectDistrict,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'events' | 'tourism'>('events');

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-4">
      
      {/* Navigation Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
            {activeTab === 'events' ? <Calendar className="w-5 h-5" /> : <Compass className="w-5 h-5 text-amber-300" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase">
              {activeTab === 'events' ? 'Kerala Cultural Events & Festivals' : 'Kerala Tourism & Destinations'}
            </h2>
            <p className="text-xs text-slate-500">
              {activeTab === 'events' ? 'Temple Poorams, Church Feasts, Tech Meetups & Sports' : 'Explore hill stations, backwaters, beaches & eco-tourism'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'events' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Events Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('tourism')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'tourism' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>God's Own Country</span>
          </button>
        </div>
      </div>

      {/* Render Content */}
      {activeTab === 'events' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EVENTS_DATA.map((evt) => (
            <div key={evt.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition flex flex-col">
              <img src={evt.image_url} alt={evt.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-red-50 text-red-700 font-bold text-[10px] px-2 py-0.5 rounded border border-red-200 uppercase">
                      {evt.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {evt.event_date}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{evt.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{evt.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-600" /> {evt.district}
                  </span>
                  <span className="font-semibold text-slate-700">Org: {evt.organizer_name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOURISM_DESTINATIONS.map((dest, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition flex flex-col">
              <img src={dest.image} alt={dest.name} className="w-full h-44 object-cover" />
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded border border-emerald-200 uppercase">
                      {dest.tag}
                    </span>
                    <span className="text-xs font-bold text-amber-500">{dest.rating}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{dest.name}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{dest.desc}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">📍 {dest.district} District</span>
                  <button className="text-red-600 font-bold hover:underline flex items-center gap-0.5 text-xs">
                    <span>Explore Guide</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
