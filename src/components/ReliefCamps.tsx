import React from 'react';
import { ReliefCamp, DistrictName } from '../types';
import { Tent, Phone, MapPin, Users, PackageCheck, AlertCircle } from 'lucide-react';

interface ReliefCampsProps {
  camps: ReliefCamp[];
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  onJumpToCampMap: (lat: number, lng: number) => void;
}

export const ReliefCamps: React.FC<ReliefCampsProps> = ({
  camps,
  selectedDistrict,
  onSelectDistrict,
  onJumpToCampMap
}) => {
  const filteredCamps = camps.filter(
    (camp) => selectedDistrict === 'All Districts' || camp.district === selectedDistrict
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xl font-bold font-mono text-slate-900 flex items-center gap-2">
              KERALA RELIEF CAMPS & SUPPLY TRACKER
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Active relief shelters, capacity metrics, and urgent donation requirements
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
          <Tent className="w-4 h-4 text-emerald-600" />
          <span>{filteredCamps.length} Active Camps Listed</span>
        </div>
      </div>

      {/* Grid of Camps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => {
          const occupancyPercent = Math.round((camp.current_occupancy / camp.max_capacity) * 100);
          const isFull = occupancyPercent >= 90;

          return (
            <div
              key={camp.id}
              className="white-spider-card white-spider-card-hover rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                    isFull
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {isFull ? 'NEAR CAPACITY' : 'ACCEPTING REFUGEES'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {camp.district}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1 hover:text-red-600 transition">
                  {camp.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{camp.location_name}</span>
                </div>

                {/* Capacity Progress */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-600 font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-600" /> Occupancy:
                    </span>
                    <span className="font-bold text-slate-900">
                      {camp.current_occupancy} / {camp.max_capacity} ({occupancyPercent}%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isFull ? 'bg-red-600' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(100, occupancyPercent)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Needed Supplies */}
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-800 mb-2">
                    <PackageCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>URGENT REQUIRED SUPPLIES:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {camp.needed_supplies.map((supply, idx) => (
                      <span
                        key={idx}
                        className="bg-amber-50 text-amber-900 border border-amber-200 text-[11px] px-2 py-0.5 rounded-md font-medium"
                      >
                        • {supply}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${camp.phone}`}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Officer</span>
                </a>

                <button
                  onClick={() => onJumpToCampMap(camp.lat, camp.lng)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 transition border border-slate-200"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>View Map</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
