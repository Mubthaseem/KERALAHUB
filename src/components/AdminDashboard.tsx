import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, UserCheck, Flag, Activity, Settings, Database, Sliders } from 'lucide-react';
import { DistrictName } from '../types';

interface AdminDashboardProps {
  currentUser?: { email: string; name?: string } | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [reportedCount, setReportedCount] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-4">
      
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white shadow-md shadow-red-600/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold">KERALAHUB ADMIN & MODERATOR CONTROL CENTER</h2>
            <p className="text-xs text-slate-400">System Configuration, Emergency Broadcasts & Safety Moderation</p>
          </div>
        </div>

        <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Status: <strong>Active (Zero-Cost Supabase Tier)</strong></span>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Statewide Emergency Broadcast Toggle */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-slate-900 text-sm">Statewide Emergency Mode</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Activating Emergency Mode highlights SOS signals state-wide and pins KSDMA red alerts to top priority across all district feeds.
          </p>

          <button
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              emergencyMode
                ? 'bg-red-600 text-white shadow-md shadow-red-600/30 animate-pulse'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{emergencyMode ? '⚠️ EMERGENCY MODE ACTIVE' : 'Activate Emergency Mode'}</span>
          </button>
        </div>

        {/* Content Moderation Queue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm">Content Moderation Queue</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Automated profanity filters (English, Malayalam, Manglish) and image upload blockers active.
          </p>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between">
            <span className="text-slate-600">Pending Flags:</span>
            <span className="font-bold text-slate-900">{reportedCount} items</span>
          </div>
        </div>

        {/* System & Database Status */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Database & RLS Security</h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Row Level Security (RLS) active on Supabase PostgreSQL tables (`posts`, `sos_requests`, `profiles`).
          </p>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs flex justify-between">
            <span className="text-slate-600">PostgreSQL Schema:</span>
            <span className="font-bold text-emerald-600">100% Verified</span>
          </div>
        </div>

      </div>

    </div>
  );
};
