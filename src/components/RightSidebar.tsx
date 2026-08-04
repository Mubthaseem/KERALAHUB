import React from 'react';
import { Search, TrendingUp, CheckCircle, Flame, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { DistrictName } from '../types';

interface RightSidebarProps {
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ selectedDistrict, onSelectDistrict }) => {
  return (
    <aside className="hidden lg:block w-[340px] shrink-0 p-4 h-screen sticky top-0 no-scrollbar overflow-y-auto font-sans text-on-surface">
      
      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        <input
          type="text"
          placeholder="Search KeralaHub..."
          className="w-full bg-surface-container-high border border-outline-variant/30 rounded-full py-2.5 pl-11 pr-4 text-xs text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary transition"
        />
      </div>

      {/* Trending Glass Card */}
      <div className="glass-card rounded-2xl p-4 mb-5 space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-sm text-on-surface mb-2">
          <Flame className="w-4 h-4 text-primary" />
          <span>Trending in Kerala</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="cursor-pointer group hover:bg-surface-variant/20 p-2 rounded-xl transition">
            <div className="flex justify-between items-center text-[10px] text-on-surface-variant mb-0.5">
              <span>1 • Tourism & Nature</span>
            </div>
            <p className="font-bold text-on-surface group-hover:text-primary transition">#KeralaTourism</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">12.5k Posts</p>
          </div>

          <div className="cursor-pointer group hover:bg-surface-variant/20 p-2 rounded-xl transition">
            <div className="flex justify-between items-center text-[10px] text-error mb-0.5">
              <span>2 • Emergency Alert</span>
            </div>
            <p className="font-bold text-on-surface group-hover:text-error transition">#WayanadUpdate</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">8,230 Posts</p>
          </div>

          <div className="cursor-pointer group hover:bg-surface-variant/20 p-2 rounded-xl transition">
            <div className="flex justify-between items-center text-[10px] text-on-surface-variant mb-0.5">
              <span>3 • Technology</span>
            </div>
            <p className="font-bold text-on-surface group-hover:text-primary transition">K-FON High-Speed Broadband</p>
            <p className="text-[10px] text-on-surface-variant mt-0.5">5,102 Posts</p>
          </div>
        </div>
      </div>

      {/* Who to Follow / Official Channels */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <h3 className="font-bold text-sm text-on-surface mb-2">Official Channels</h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                KSDMA
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-on-surface truncate text-xs">Kerala SDMA</p>
                  <CheckCircle className="w-3.5 h-3.5 text-primary fill-primary/10" />
                </div>
                <p className="text-[10px] text-on-surface-variant truncate">@keralasdma</p>
              </div>
            </div>
            <button className="px-3 py-1 bg-on-surface text-surface rounded-full font-bold text-[11px] hover:bg-on-surface/90 transition shrink-0 ml-1">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-4 px-2 text-[10px] text-on-surface-variant space-y-1">
        <p>© 2026 KeralaHub Corp. • Digital Ecosystem</p>
      </div>

    </aside>
  );
};
