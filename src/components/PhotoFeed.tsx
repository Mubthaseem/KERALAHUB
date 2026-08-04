import React, { useState } from 'react';
import { DisasterReport, DistrictName } from '../types';
import { Camera, Image as ImageIcon, Heart, Share2, ShieldAlert, Eye, EyeOff, PlusCircle, CheckCircle, AlertTriangle, MessageCircle, Send } from 'lucide-react';
import { filterContent, checkSpam, validateImageFile, inspectImageSensitivity } from '../services/moderation';
import { Language, TRANSLATIONS } from '../data/translations';

interface PhotoFeedProps {
  reports: DisasterReport[];
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  onAddReport: (reportData: {
    district: DistrictName;
    location_name: string;
    lat: number;
    lng: number;
    water_level: any;
    description: string;
    image_url?: string;
  }) => void;
  onUpvoteReport: (id: string) => void;
  language: Language;
  currentUser?: { email: string; name?: string } | null;
  onOpenAuthModal?: () => void;
}

export const PhotoFeed: React.FC<PhotoFeedProps> = ({
  reports,
  selectedDistrict,
  onSelectDistrict,
  onAddReport,
  onUpvoteReport,
  language,
  currentUser,
  onOpenAuthModal
}) => {
  const t = TRANSLATIONS[language];
  const [showPostModal, setShowPostModal] = useState(false);
  const [district, setDistrict] = useState<DistrictName>('Wayanad');
  const [locationName, setLocationName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSensitive, setIsSensitive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Track unblinded sensitive photos
  const [revealedImages, setRevealedImages] = useState<Record<string, boolean>>({});

  const filteredReports = reports.filter(
    (r) => selectedDistrict === 'All Districts' || r.district === selectedDistrict
  );

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        
        // Strict Image Content Inspection Blocker
        const validation = await validateImageFile(file.name, result);
        if (!validation.isAllowed) {
          setErrorMsg(validation.reason || 'Upload Blocked: Image contains explicit or sensitive content.');
          setImageUrl('');
          e.target.value = '';
          return;
        }

        setErrorMsg('');
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Anti-Spam Check
    const recentTexts = reports.map((r) => r.description);
    const spamCheck = checkSpam(description, recentTexts);
    if (spamCheck.isSpam) {
      setErrorMsg(spamCheck.reason || 'Post flagged as spam.');
      return;
    }

    // 2. Bad Words Moderation (English & Malayalam)
    const modResult = filterContent(description);
    if (!modResult.isClean && modResult.flagReason) {
      alert(`⚠️ Safety Alert: ${modResult.flagReason}. Bad words have been filtered out.`);
    }

    onAddReport({
      district: district === 'All Districts' ? 'Wayanad' : district,
      location_name: locationName || 'District Hotspot',
      lat: 11.5450,
      lng: 76.1650,
      water_level: 'Road Blocked',
      description: modResult.cleanText,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80'
    });

    setLocationName('');
    setDescription('');
    setImageUrl('');
    setIsSensitive(false);
    setShowPostModal(false);
  };

  const toggleRevealImage = (id: string) => {
    setRevealedImages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 font-sans">
      
      {/* Feed Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-red-600" />
            <span>CRISIS PHOTO FEED</span>
          </h2>
          <p className="text-xs text-slate-500">
            Real-time flood photos & location updates from Kerala districts
          </p>
        </div>

        <button
          onClick={() => {
            if (!currentUser && onOpenAuthModal) {
              onOpenAuthModal();
            } else {
              setShowPostModal(true);
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-red-600/30 transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Photo</span>
        </button>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {filteredReports.map((post) => {
          const sensitivity = inspectImageSensitivity(post.description + (post.image_url || ''));
          const isBlurred = (sensitivity.isSensitive || post.description.toLowerCase().includes('sensitive')) && !revealedImages[post.id];

          return (
            <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    {post.district.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{post.district} Relief Desk</h4>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      📍 {post.location_name} • {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {post.water_level}
                </span>
              </div>

              {/* Text Content */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed mb-3">
                {post.description}
              </p>

              {/* Photo Container with Sensitive Content Blur Filter */}
              {post.image_url && (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 mb-3 group">
                  <img
                    src={post.image_url}
                    alt="Crisis update photo"
                    className={`w-full max-h-96 object-cover transition duration-300 ${
                      isBlurred ? 'blur-xl scale-105 opacity-40' : ''
                    }`}
                  />

                  {/* Sensitive Warning Overlay */}
                  {isBlurred && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-900/60 backdrop-blur-md text-white">
                      <AlertTriangle className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
                      <h4 className="font-bold text-xs sm:text-sm mb-1">Sensitive Content Warning</h4>
                      <p className="text-[11px] text-slate-300 mb-3 max-w-xs">
                        This photo contains sensitive or graphic disaster imagery.
                      </p>
                      <button
                        onClick={() => toggleRevealImage(post.id)}
                        className="bg-white text-slate-900 font-bold text-xs py-1.5 px-4 rounded-lg flex items-center gap-1.5 shadow"
                      >
                        <Eye className="w-3.5 h-3.5 text-blue-600" />
                        <span>Click to Unblur & View Photo</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Social Action Bar (Like, Share, Confirm) */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                <button
                  onClick={() => onUpvoteReport(post.id)}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-red-600 font-medium transition"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
                  <span>Confirm / Like ({post.upvotes})</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `KeralaHub Update - ${post.district}`,
                        text: post.description,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Post Photo Modal with Content Safety Filters */}
      {showPostModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 font-sans">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5 text-red-600" />
              <span>POST CRISIS PHOTO UPDATE</span>
            </h3>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-xl mb-3 flex items-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePostSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select District *</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as DistrictName)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                >
                  {['Wayanad', 'Alappuzha', 'Ernakulam', 'Idukki', 'Thrissur', 'Kozhikode', 'Kottayam'].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Landmark / Location Name *</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. Chooralmala Bridge Road"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption / Status Update *</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe flood situation... (English & Malayalam profanity filters active)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Upload Photo *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
              </div>

              {isSensitive && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-[11px] p-2 rounded-lg flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Sensitive photo detected — will render with a blur protection overlay.</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
