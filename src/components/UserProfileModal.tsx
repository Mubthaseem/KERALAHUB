import React, { useState } from 'react';
import { User, MapPin, Calendar, Heart, MessageSquare, Image as ImageIcon, Bookmark, Edit3, ShieldCheck, CheckCircle } from 'lucide-react';
import { DisasterReport } from '../types';

interface UserProfileModalProps {
  currentUser?: { email: string; name?: string } | null;
  reports: DisasterReport[];
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ currentUser, reports }) => {
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'replies' | 'media' | 'bookmarks'>('posts');

  const userName = currentUser?.name || 'Arun Nair';
  const userHandle = `@${userName.toLowerCase().replace(/\s+/g, '_')}`;

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-4">
      
      {/* Profile Card Container */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        
        {/* Banner Cover Image */}
        <div className="h-36 sm:h-44 bg-slate-900 relative">
          <img
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
            alt="Profile Cover Tea Garden"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Profile Details & Avatar */}
        <div className="px-5 pb-5 pt-0 relative">
          
          <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-3">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white overflow-hidden bg-slate-800 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow">
                <CheckCircle className="w-3.5 h-3.5" />
              </span>
            </div>

            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs px-4 py-2 rounded-xl transition">
              Edit Profile
            </button>
          </div>

          {/* Name & Bio */}
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">{userName}</h2>
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">{userHandle}</p>

            <p className="text-xs text-slate-700 mt-2 font-normal leading-relaxed">
              Proud Keralite 🌴 | Emergency Relief Volunteer | Photographer 📷 | Nature Lover | Kottayam
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" /> Kottayam, Kerala
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined May 2023
              </span>
            </div>

            {/* Stats Counter */}
            <div className="flex items-center gap-6 mt-4 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="font-extrabold text-slate-900 text-sm">1.2K</span>{' '}
                <span className="text-slate-500">Posts</span>
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm">2.5K</span>{' '}
                <span className="text-slate-500">Followers</span>
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm">980</span>{' '}
                <span className="text-slate-500">Following</span>
              </div>
            </div>
          </div>

        </div>

        {/* Profile Sub-Tabs */}
        <div className="flex items-center justify-around border-t border-slate-200 text-xs font-bold text-slate-600 bg-slate-50">
          {(['posts', 'replies', 'media', 'bookmarks'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`py-3 px-4 capitalize transition border-b-2 ${
                activeSubTab === tab
                  ? 'border-emerald-600 text-emerald-700 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {/* Render Activity Posts */}
      <div className="space-y-3">
        {reports.slice(0, 2).map((post) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                AN
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">{userName}</h4>
                <p className="text-[10px] text-slate-400">📍 {post.location_name}</p>
              </div>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed mb-2">{post.description}</p>
            {post.image_url && (
              <img src={post.image_url} alt="Post media" className="w-full max-h-60 object-cover rounded-xl border border-slate-200" />
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
