import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { SOSRequest, DisasterReport, ReliefCamp, DistrictName } from '../types';
import { ShieldAlert, AlertTriangle, Tent, Phone, Users, MapPin, Eye, ThumbsUp, Filter } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface InteractiveDisasterMapProps {
  sosRequests: SOSRequest[];
  disasterReports: DisasterReport[];
  reliefCamps: ReliefCamp[];
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  onOpenSOSModalWithCoords?: (lat: number, lng: number) => void;
  onUpvoteReport: (id: string) => void;
  language: Language;
}

// Custom Leaflet Icons styled as Official Emergency Beacons
const createBeaconIcon = (type: 'sos' | 'flood' | 'camp') => {
  let iconHtml = '';
  if (type === 'sos') {
    iconHtml = `
      <div className="sos-beacon-pin">
        <div style="background-color: #dc2626; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; box-shadow: 0 0 10px rgba(220,38,38,0.8); border: 2px solid white;">
          🆘
        </div>
      </div>
    `;
  } else if (type === 'flood') {
    iconHtml = `
      <div className="flood-beacon-pin">
        <div style="background-color: #2563eb; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; box-shadow: 0 0 8px rgba(37,99,235,0.8); border: 2px solid white;">
          🌊
        </div>
      </div>
    `;
  } else {
    iconHtml = `
      <div className="camp-beacon-pin">
        <div style="background-color: #10b981; color: white; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; box-shadow: 0 0 8px rgba(16,185,129,0.8); border: 2px solid white;">
          ⛺
        </div>
      </div>
    `;
  }

  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-beacon-pin',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const DistrictCoordinates: Record<string, [number, number, number]> = {
  'All Districts': [10.2, 76.4, 8],
  'Wayanad': [11.6, 76.1, 11],
  'Idukki': [9.9, 77.0, 10],
  'Alappuzha': [9.5, 76.4, 11],
  'Ernakulam': [10.0, 76.3, 11],
  'Thrissur': [10.5, 76.2, 11],
  'Kozhikode': [11.25, 75.78, 11],
  'Malappuram': [11.07, 76.07, 11],
  'Kottayam': [9.59, 76.52, 11],
  'Pathanamthitta': [9.26, 76.78, 11],
  'Palakkad': [10.78, 76.65, 10],
  'Kannur': [11.87, 75.37, 11],
  'Kasaragod': [12.51, 75.00, 11],
  'Kollam': [8.89, 76.60, 11],
  'Thiruvananthapuram': [8.52, 76.93, 11]
};

const MapViewController: React.FC<{ district: DistrictName }> = ({ district }) => {
  const map = useMap();
  useEffect(() => {
    const coords = DistrictCoordinates[district] || DistrictCoordinates['All Districts'];
    map.flyTo([coords[0], coords[1]], coords[2], { duration: 1.5 });
  }, [district, map]);
  return null;
};

const MapEventsHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
};

export const InteractiveDisasterMap: React.FC<InteractiveDisasterMapProps> = ({
  sosRequests,
  disasterReports,
  reliefCamps,
  selectedDistrict,
  onSelectDistrict,
  onOpenSOSModalWithCoords,
  onUpvoteReport,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [showSOS, setShowSOS] = useState(true);
  const [showFloods, setShowFloods] = useState(true);
  const [showCamps, setShowCamps] = useState(true);
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  const filteredSOS = sosRequests.filter(
    (item) => selectedDistrict === 'All Districts' || item.district === selectedDistrict
  );
  const filteredReports = disasterReports.filter(
    (item) => selectedDistrict === 'All Districts' || item.district === selectedDistrict
  );
  const filteredCamps = reliefCamps.filter(
    (item) => selectedDistrict === 'All Districts' || item.district === selectedDistrict
  );

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[550px] bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row font-sans">
      
      {/* Map Control Bar Overlay */}
      <div className="absolute top-4 left-4 z-[500] flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 shadow-md">
        <div className="text-xs font-bold text-slate-700 px-2 flex items-center gap-1 border-r border-slate-200 pr-3">
          <Filter className="w-3.5 h-3.5 text-red-600" />
          <span>{t.radar_layers}</span>
        </div>

        {/* SOS Toggle */}
        <button
          onClick={() => setShowSOS(!showSOS)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            showSOS ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <span>🆘</span>
          <span>{t.layer_sos} ({filteredSOS.length})</span>
        </button>

        {/* Hazards Toggle */}
        <button
          onClick={() => setShowFloods(!showFloods)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            showFloods ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <span>🌊</span>
          <span>{t.layer_floods} ({filteredReports.length})</span>
        </button>

        {/* Camps Toggle */}
        <button
          onClick={() => setShowCamps(!showCamps)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
            showCamps ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <span>⛺</span>
          <span>{t.layer_camps} ({filteredCamps.length})</span>
        </button>
      </div>

      {/* Quick District Jump Pills */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto z-[500] flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 text-xs text-white max-w-full md:max-w-2xl">
        <span className="font-bold text-red-400 text-[11px] whitespace-nowrap pl-1 uppercase">
          {t.hotspots}
        </span>
        {['Wayanad', 'Alappuzha', 'Ernakulam', 'Idukki', 'Thrissur', 'Kozhikode'].map((dist) => (
          <button
            key={dist}
            onClick={() => onSelectDistrict(dist as DistrictName)}
            className={`px-2.5 py-1 rounded-md text-[11px] transition whitespace-nowrap ${
              selectedDistrict === dist
                ? 'bg-red-600 text-white font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {dist}
          </button>
        ))}
      </div>

      {/* Main Leaflet Map Engine */}
      <div className="w-full h-full relative">
        <MapContainer
          center={[10.2, 76.4]}
          zoom={8}
          scrollWheelZoom={true}
          className="w-full h-full rounded-none"
        >
          <MapViewController district={selectedDistrict} />
          {onOpenSOSModalWithCoords && (
            <MapEventsHandler onMapClick={onOpenSOSModalWithCoords} />
          )}

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Render SOS Pins */}
          {showSOS &&
            filteredSOS.map((sos) => (
              <Marker
                key={sos.id}
                position={[sos.lat, sos.lng]}
                icon={createBeaconIcon('sos')}
              >
                <Popup>
                  <div className="p-1 max-w-xs font-sans">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-2">
                      <span className="bg-red-100 text-red-700 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                        {sos.urgency} SOS • {sos.category}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(sos.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1">{sos.name}</h4>
                    <p className="text-xs text-slate-600 mb-2">{sos.details}</p>

                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs mb-3 space-y-1">
                      <div className="flex items-center gap-1 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        <span className="font-medium">{sos.location_name}, {sos.district}</span>
                      </div>
                      {sos.people_count && (
                        <div className="flex items-center gap-1 text-slate-700">
                          <Users className="w-3.5 h-3.5 text-blue-600" />
                          <span>Stranded: <strong>{sos.people_count}</strong></span>
                        </div>
                      )}
                    </div>

                    <a
                      href={`tel:${sos.phone}`}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>CALL ({sos.phone})</span>
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Render Flood Hazard Markers */}
          {showFloods &&
            filteredReports.map((report) => (
              <Marker
                key={report.id}
                position={[report.lat, report.lng]}
                icon={createBeaconIcon('flood')}
              >
                <Popup>
                  <div className="p-1 max-w-xs font-sans">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-2">
                      <span className="bg-blue-100 text-blue-700 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                        WATER: {report.water_level}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {report.district}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-medium mb-2">{report.description}</p>

                    {report.image_url && (
                      <div className="relative mb-2 rounded-lg overflow-hidden border border-slate-200 max-h-36 group">
                        <img
                          src={report.image_url}
                          alt="Hazard photo"
                          className="w-full h-32 object-cover"
                        />
                        <button
                          onClick={() => setActiveImageModal(report.image_url!)}
                          className="absolute inset-0 bg-slate-900/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-xs gap-1"
                        >
                          <Eye className="w-4 h-4" /> View Photo
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">{report.location_name}</span>
                      <button
                        onClick={() => onUpvoteReport(report.id)}
                        className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition text-[11px]"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Confirm ({report.upvotes})</span>
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Render Relief Camp Markers */}
          {showCamps &&
            filteredCamps.map((camp) => (
              <Marker
                key={camp.id}
                position={[camp.lat, camp.lng]}
                icon={createBeaconIcon('camp')}
              >
                <Popup>
                  <div className="p-1 max-w-xs font-sans">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-2">
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                        RELIEF CAMP • {camp.status}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {camp.current_occupancy}/{camp.max_capacity} Occupied
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1">{camp.name}</h4>
                    <p className="text-xs text-slate-600 mb-2">{camp.location_name}</p>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3 border border-slate-200">
                      <div
                        className="bg-emerald-600 h-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (camp.current_occupancy / camp.max_capacity) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="mb-3 text-[11px]">
                      <span className="font-bold text-slate-700 block mb-1">Needed Supplies:</span>
                      <div className="flex flex-wrap gap-1">
                        {camp.needed_supplies.map((item, idx) => (
                          <span key={idx} className="bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href={`tel:${camp.phone}`}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow transition"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>CALL CAMP OFFICER ({camp.phone})</span>
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

        </MapContainer>
      </div>

      {/* Fullsize Image Modal */}
      {activeImageModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 p-2">
            <div className="flex justify-end p-2">
              <button
                onClick={() => setActiveImageModal(null)}
                className="text-slate-500 hover:text-slate-900 font-bold text-sm bg-slate-100 px-3 py-1 rounded-lg"
              >
                Close ✕
              </button>
            </div>
            <img src={activeImageModal} alt="Enlarged disaster report" className="w-full max-h-[75vh] object-contain rounded-xl" />
          </div>
        </div>
      )}

    </div>
  );
};
