import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Phone, MapPin, Search } from 'lucide-react';
import { EMERGENCY_CONTACTS, KERALA_DISTRICTS } from '../data/mockData';
import { DistrictName } from '../types';

export const EmergencyContacts: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterDistrict, setFilterDistrict] = useState<string>('All');

  const filteredContacts = EMERGENCY_CONTACTS.filter((contact) => {
    const matchesSearch =
      contact.title.toLowerCase().includes(search.toLowerCase()) ||
      contact.role.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search);
    const matchesDistrict = filterDistrict === 'All' || contact.district === filterDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            <h2 className="text-xl font-bold font-mono tracking-tight text-white">
              KERALA DISASTER EMERGENCY HELPLINES
            </h2>
          </div>
          <p className="text-xs text-slate-300 font-mono">
            24x7 Direct phone numbers for State Control Rooms, NDRF, Police, Fire Force & District Collectorates
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search hotline by district, service name, or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl p-2.5 pl-9 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <select
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
        >
          <option value="All">All Districts & Statewide</option>
          <option value="Statewide">Statewide Hotlines</option>
          {KERALA_DISTRICTS.filter(d => d !== 'All Districts').map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Grid of Helpline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact, index) => (
          <div
            key={index}
            className="white-spider-card white-spider-card-hover rounded-2xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-2">
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  {contact.district}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  VERIFIED 24x7
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm mb-1 font-mono">
                {contact.title}
              </h3>
              <p className="text-xs text-slate-600 mb-3">{contact.role}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <a
                href={`tel:${contact.phone}`}
                className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-sm transition"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {contact.phone}</span>
              </a>

              {contact.secondary_phone && (
                <a
                  href={`tel:${contact.secondary_phone}`}
                  className="text-slate-600 hover:text-slate-900 bg-slate-100 font-mono font-medium text-[11px] py-1.5 px-2.5 rounded-lg border border-slate-200"
                >
                  Alt: {contact.secondary_phone}
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
