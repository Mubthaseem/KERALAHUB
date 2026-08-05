import React from 'react';
import { Home, Compass, Users, ShoppingBag, Briefcase, AlertTriangle, Bot, Settings, HelpCircle, ShieldAlert, CloudRain } from 'lucide-react';

interface SidebarNavProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onOpenReportModal: () => void;
  currentUser?: { email: string; name?: string } | null;
  onOpenAuthModal: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenReportModal,
  currentUser,
  onOpenAuthModal
}) => {
  return (
    <nav className="hidden md:flex flex-col h-full py-4 px-3 bg-surface-container-low border-r border-outline-variant/20 w-64 shrink-0 fixed left-0 top-0 z-40 text-on-surface">
      
      {/* Brand Header */}
      <div className="px-4 pb-6 pt-2">
        <h1 className="text-2xl font-black tracking-tight text-primary flex items-center gap-1.5">
          <span>KeralaHub</span>
        </h1>
        <p className="text-xs text-on-surface-variant mt-0.5 opacity-80">Digital Ecosystem</p>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 space-y-1.5 px-1 font-medium text-sm">
        
        {/* Home Feed */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'feed'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        {/* Live GIS Map */}
        <button
          onClick={() => onSelectTab('map')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'map'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span>Live Satellite Map</span>
        </button>

        {/* Live Rain & Dam Tracker (Mazha.live) */}
        <button
          onClick={() => onSelectTab('rain')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'rain'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <CloudRain className="w-5 h-5 text-blue-400" />
          <span>Live Rain & Dam Storage</span>
        </button>

        {/* Communities / Forums */}
        <button
          onClick={() => onSelectTab('forums')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'forums'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Communities</span>
        </button>

        {/* Marketplace */}
        <button
          onClick={() => onSelectTab('jobs')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'jobs'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Marketplace & Jobs</span>
        </button>

        {/* Events */}
        <button
          onClick={() => onSelectTab('events')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'events'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Events & Tourism</span>
        </button>

        {/* Emergency Disaster Hub */}
        <button
          onClick={() => onSelectTab('camps')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition ${
            activeTab === 'camps'
              ? 'bg-error-container text-error font-bold shadow-sm'
              : 'text-error hover:bg-error-container/20'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
          <span>Emergency Hub</span>
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => onSelectTab('ai')}
          className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition mt-2 ${
            activeTab === 'ai'
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface'
          }`}
        >
          <Bot className="w-5 h-5 text-primary" />
          <span>AI Assistant</span>
        </button>

      </div>

      {/* Report Action Button */}
      <div className="px-2 py-3">
        <button
          onClick={onOpenReportModal}
          className="w-full py-3 px-4 bg-error text-on-error rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-error/90 transition shadow-lg flex items-center justify-center gap-1.5"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Report Incident</span>
        </button>
      </div>

      {/* User Profile Snippet */}
      <div className="px-2 pt-3 border-t border-outline-variant/20 mt-auto">
        {currentUser ? (
          <button
            onClick={() => onSelectTab('profile')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-variant/40 transition text-left"
          >
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs">
              {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : 'RN'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-on-surface truncate">{currentUser.name || 'Rahul Menon'}</p>
              <p className="text-[10px] text-on-surface-variant truncate">{currentUser.email}</p>
            </div>
          </button>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="w-full py-2 px-3 bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs font-bold rounded-xl transition"
          >
            Sign In / Register
          </button>
        )}
      </div>

    </nav>
  );
};
