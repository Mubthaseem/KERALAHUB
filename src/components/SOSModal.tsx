import React, { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, Phone, Users, AlertOctagon, X, Navigation } from 'lucide-react';
import { DistrictName, SOSCategory, UrgencyLevel } from '../types';
import { KERALA_DISTRICTS } from '../data/mockData';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSOS: (sosData: {
    name: string;
    phone: string;
    district: DistrictName;
    location_name: string;
    lat: number;
    lng: number;
    category: SOSCategory;
    urgency: UrgencyLevel;
    details: string;
    people_count: number;
  }) => void;
  initialCoords?: { lat: number; lng: number } | null;
  selectedDistrict: DistrictName;
}

export const SOSModal: React.FC<SOSModalProps> = ({
  isOpen,
  onClose,
  onSubmitSOS,
  initialCoords,
  selectedDistrict
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState<DistrictName>('Wayanad');
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState<number>(11.5367);
  const [lng, setLng] = useState<number>(76.1724);
  const [category, setCategory] = useState<SOSCategory>('Rescue Boat');
  const [urgency, setUrgency] = useState<UrgencyLevel>('CRITICAL');
  const [details, setDetails] = useState('');
  const [peopleCount, setPeopleCount] = useState(2);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    if (selectedDistrict !== 'All Districts') {
      setDistrict(selectedDistrict);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    if (initialCoords) {
      setLat(initialCoords.lat);
      setLng(initialCoords.lng);
    }
  }, [initialCoords]);

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setIsLocating(false);
        },
        (error) => {
          console.warn('Geolocation failed:', error);
          setIsLocating(false);
          alert('Could not fetch exact GPS. Please enter location manually or select on map.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !locationName || !details) {
      alert('Please fill out all required fields.');
      return;
    }

    onSubmitSOS({
      name,
      phone,
      district,
      location_name: locationName,
      lat,
      lng,
      category,
      urgency,
      details,
      people_count: peopleCount
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        
        {/* Spider Distress Signal Modal Header */}
        <div className="bg-red-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono tracking-tight flex items-center gap-2">
                DISPATCH SOS SIGNAL
              </h3>
              <p className="text-xs text-red-100 font-mono">
                Immediate Emergency Relief & Rescue Request
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
          
          {/* Priority Urgency Picker */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1.5 uppercase">
              Urgency Level *
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUrgency('CRITICAL')}
                className={`py-2 px-3 rounded-lg font-mono font-bold border transition flex items-center justify-center gap-1 ${
                  urgency === 'CRITICAL'
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>CRITICAL</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('HIGH')}
                className={`py-2 px-3 rounded-lg font-mono font-bold border transition ${
                  urgency === 'HIGH'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                HIGH
              </button>

              <button
                type="button"
                onClick={() => setUrgency('MEDIUM')}
                className={`py-2 px-3 rounded-lg font-mono font-bold border transition ${
                  urgency === 'MEDIUM'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                MEDIUM
              </button>
            </div>
          </div>

          {/* Emergency Category */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1">
              Help Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SOSCategory)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="Rescue Boat">🛥️ Rescue Boat Needed</option>
              <option value="Food & Clean Water">📦 Food & Drinking Water</option>
              <option value="Medical Emergency">🚑 Medical Assistance / Dialysis</option>
              <option value="Elderly / Infant Evacuation">👶 Elderly / Infant Shelter Transfer</option>
              <option value="Power & Signal Outage">⚡ Power & Communications Outage</option>
              <option value="General">🆘 General Assistance</option>
            </select>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                Your / Contact Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Nair"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                Contact Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* District & Landmark */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                District *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as DistrictName)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {KERALA_DISTRICTS.filter(d => d !== 'All Districts').map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                People Stranded *
              </label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 pl-9 text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Name & GPS Detector */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono font-bold text-slate-700">
                Landmark / House Address *
              </label>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="text-red-600 hover:text-red-700 font-mono font-bold text-[11px] flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-200"
              >
                <Navigation className="w-3 h-3" />
                <span>{isLocating ? 'Locating...' : 'Detect GPS Location'}</span>
              </button>
            </div>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. Near St. George Church, Ward 3, Chooralmala"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            />
            <p className="text-[10px] text-slate-500 font-mono mt-1">
              Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
            </p>
          </div>

          {/* Details */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1">
              Emergency Details & Immediate Needs *
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe situation, water level, medical conditions, or nearest visible building..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-red-500 focus:outline-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-sm py-3 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition active:scale-98"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>BROADCAST EMERGENCY SOS SIGNAL NOW</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
