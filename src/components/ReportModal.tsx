import React, { useState } from 'react';
import { PlusCircle, MapPin, Camera, X, Droplets, AlertTriangle } from 'lucide-react';
import { DistrictName, WaterLevel } from '../types';
import { KERALA_DISTRICTS } from '../data/mockData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (reportData: {
    district: DistrictName;
    location_name: string;
    lat: number;
    lng: number;
    water_level: WaterLevel;
    description: string;
    image_url?: string;
    reporter_contact?: string;
  }) => void;
  selectedDistrict: DistrictName;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  selectedDistrict
}) => {
  const [district, setDistrict] = useState<DistrictName>('Wayanad');
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState<number>(11.5450);
  const [lng, setLng] = useState<number>(76.1650);
  const [waterLevel, setWaterLevel] = useState<WaterLevel>('Waist Level');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [contact, setContact] = useState('');

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !description) {
      alert('Please fill out location name and description.');
      return;
    }

    onSubmitReport({
      district: district === 'All Districts' ? 'Wayanad' : district,
      location_name: locationName,
      lat,
      lng,
      water_level: waterLevel,
      description,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      reporter_contact: contact
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
              <PlusCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-mono tracking-tight flex items-center gap-2">
                REPORT DISASTER & HAZARD
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Geo-tag Flood Levels, Road Blocks & Landslides
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-xs">
          
          {/* Water Level Gauge */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1.5 uppercase">
              Current Water / Flood Level *
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 font-mono text-[11px]">
              {(['Knee Level', 'Waist Level', 'Chest Level', 'Submerged Roof', 'Road Blocked'] as WaterLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setWaterLevel(level)}
                  className={`py-2 px-1 rounded-lg border font-semibold transition text-center ${
                    waterLevel === level
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* District & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono font-bold text-slate-700 mb-1">
                District *
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value as DistrictName)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                Location Name / Landmark *
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. AC Road Near Bridge"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1">
              Hazard Description & Current Situation *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe road blockage, water speed, mudslides, or affected houses..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1">
              Upload Location Photo (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-mono font-bold px-3 py-2 rounded-lg flex items-center gap-2 text-xs transition">
                <Camera className="w-4 h-4 text-blue-600" />
                <span>Choose Photo File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-[11px] text-slate-400 font-mono truncate">
                {imageUrl ? 'Photo selected ✅' : 'Or paste URL below'}
              </span>
            </div>
            {!imageUrl && (
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 mt-2 text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            )}
          </div>

          {/* Contact info optional */}
          <div>
            <label className="block font-mono font-bold text-slate-700 mb-1">
              Your Contact (Optional for Verification)
            </label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+91 94470 00000"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold text-sm py-3 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>PIN DISASTER REPORT ON MAP</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
