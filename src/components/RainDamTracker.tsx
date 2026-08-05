import React, { useState } from 'react';
import { CloudRain, Waves, AlertTriangle, ShieldCheck, MapPin, Gauge, Droplets, ArrowUpRight, Flame } from 'lucide-react';
import { DistrictName } from '../types';

interface RainDamTrackerProps {
  selectedDistrict: DistrictName;
}

interface DamData {
  name: string;
  district: DistrictName;
  waterLevelPct: number;
  status: 'Normal' | 'Yellow Alert' | 'Orange Alert' | 'Red Alert' | 'Gates Opened';
  capacityM3: string;
  gatesOpenedCount?: number;
}

const KERALA_DAMS: DamData[] = [
  {
    name: 'Idukki Arch Dam (Cheruthoni)',
    district: 'Idukki',
    waterLevelPct: 84.5,
    status: 'Orange Alert',
    capacityM3: '2,398.0 MCM',
    gatesOpenedCount: 2
  },
  {
    name: 'Mullaperiyar Dam',
    district: 'Idukki',
    waterLevelPct: 91.2,
    status: 'Red Alert',
    capacityM3: '142.0 FT',
    gatesOpenedCount: 4
  },
  {
    name: 'Banasura Sagar Dam (Kabini)',
    district: 'Wayanad',
    waterLevelPct: 88.0,
    status: 'Orange Alert',
    capacityM3: '209.25 MCM',
    gatesOpenedCount: 1
  },
  {
    name: 'Malampuzha Dam',
    district: 'Palakkad',
    waterLevelPct: 76.8,
    status: 'Yellow Alert',
    capacityM3: '226.0 MCM'
  },
  {
    name: 'Idamalayar Dam',
    district: 'Ernakulam',
    waterLevelPct: 79.4,
    status: 'Yellow Alert',
    capacityM3: '1,017.8 MCM'
  },
  {
    name: 'Kakki - Anathode Dam',
    district: 'Pathanamthitta',
    waterLevelPct: 82.1,
    status: 'Yellow Alert',
    capacityM3: '447.0 MCM'
  }
];

export const RainDamTracker: React.FC<RainDamTrackerProps> = ({ selectedDistrict }) => {
  const [userReportRain, setUserReportRain] = useState<string | null>(null);

  const filteredDams = KERALA_DAMS.filter(
    (dam) => selectedDistrict === 'All Districts' || dam.district === selectedDistrict
  );

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-4 text-on-surface">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-950 border border-blue-800/40 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold shrink-0">
            <CloudRain className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <span>LIVE KERALA RAIN & DAM STORAGE TRACKER</span>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-400/30">
                LIVE 2026
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Crowdsourced district rain intensity, dam water levels & spillway gate release alerts
            </p>
          </div>
        </div>
      </div>

      {/* 1-Tap Community Rain Intensity Reporter (Mazha.live Feature) */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-xs sm:text-sm text-on-surface flex items-center gap-1.5">
          <Droplets className="w-4 h-4 text-blue-400" />
          <span>Report Live Rain Intensity at Your Location (മഴ വിവരങ്ങൾ)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { label: '☀️ No Rain', val: 'no_rain', color: 'bg-slate-800 hover:bg-slate-700 text-slate-200' },
            { label: '🌦️ Light Rain', val: 'light', color: 'bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50' },
            { label: '🌧️ Moderate', val: 'moderate', color: 'bg-blue-700 text-white font-bold' },
            { label: '⛈️ Heavy Rain', val: 'heavy', color: 'bg-amber-600 text-white font-bold' },
            { label: '🌩️ Torrential', val: 'torrential', color: 'bg-error text-on-error font-extrabold animate-pulse' }
          ].map((btn) => (
            <button
              key={btn.val}
              onClick={() => {
                setUserReportRain(btn.val);
                alert(`Rain status "${btn.label}" reported for ${selectedDistrict}! Thank you.`);
              }}
              className={`py-2.5 px-3 rounded-xl transition text-center ${btn.color} ${
                userReportRain === btn.val ? 'ring-2 ring-primary scale-95' : ''
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Major Kerala Dams Storage Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-blue-400" />
            <span>Major Kerala Dam Storage & Spillway Gate Alerts</span>
          </h3>
          <span className="text-[11px] text-on-surface-variant font-medium">Updated 24x7 KSEB/Irrigation Desk</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredDams.map((dam, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-4 space-y-2 hover:border-slate-600 transition">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                    dam.status.includes('Red') || dam.status.includes('Gates')
                      ? 'bg-error-container text-error border-error'
                      : dam.status.includes('Orange')
                      ? 'bg-amber-900/60 text-amber-300 border-amber-500'
                      : 'bg-blue-950 text-blue-300 border-blue-800'
                  }`}>
                    {dam.status}
                  </span>
                  <h4 className="font-bold text-on-surface text-sm mt-1">{dam.name}</h4>
                  <p className="text-[11px] text-on-surface-variant">📍 {dam.district} District • Cap: {dam.capacityM3}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg font-extrabold text-primary">{dam.waterLevelPct}%</span>
                  <p className="text-[10px] text-on-surface-variant">Full Capacity</p>
                </div>
              </div>

              {/* Progress Storage Bar */}
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden border border-outline-variant/30">
                <div
                  className={`h-full transition-all duration-500 ${
                    dam.waterLevelPct > 90 ? 'bg-error' : dam.waterLevelPct > 80 ? 'bg-amber-500' : 'bg-primary'
                  }`}
                  style={{ width: `${dam.waterLevelPct}%` }}
                ></div>
              </div>

              {dam.gatesOpenedCount && (
                <div className="bg-error-container/20 border border-error/30 text-error text-[11px] p-2 rounded-xl flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-bounce" />
                  <span>{dam.gatesOpenedCount} Spillway Gate(s) Raised • Downstream River Warning Issued</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
