import React from 'react';
import { Home, Compass, MapPin, Bell, User, Plus } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onOpenCreateModal: () => void;
  sosCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenCreateModal,
  sosCount
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[600] bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 md:hidden font-sans">
      <div className="max-w-md mx-auto flex items-center justify-between">
        
        {/* 1. Home Feed */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`flex flex-col items-center justify-center w-12 py-1 transition ${
            activeTab === 'feed' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* 2. Explore / Communities */}
        <button
          onClick={() => onSelectTab('forums')}
          className={`flex flex-col items-center justify-center w-12 py-1 transition ${
            activeTab === 'forums' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Explore</span>
        </button>

        {/* 3. Center Create FAB */}
        <button
          onClick={onOpenCreateModal}
          className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 -mt-5 active:scale-95 transition border-2 border-white"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        {/* 4. Live GIS Map */}
        <button
          onClick={() => onSelectTab('map')}
          className={`flex flex-col items-center justify-center w-12 py-1 transition ${
            activeTab === 'map' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Map</span>
        </button>

        {/* 5. Alerts / Profile */}
        <button
          onClick={() => onSelectTab('ai')}
          className={`flex flex-col items-center justify-center w-12 py-1 transition relative ${
            activeTab === 'ai' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Bell className="w-5 h-5" />
          {sosCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          )}
          <span className="text-[10px] mt-0.5">AI Assist</span>
        </button>

      </div>
    </div>
  );
};
