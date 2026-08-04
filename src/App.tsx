import React, { useState } from 'react';
import { useEmergencyStore } from './services/store';
import { Navbar } from './components/Navbar';
import { InteractiveSpiderMap } from './components/InteractiveSpiderMap';
import { SOSModal } from './components/SOSModal';
import { ReportModal } from './components/ReportModal';
import { ReliefCamps } from './components/ReliefCamps';
import { Forums } from './components/Forums';
import { EmergencyContacts } from './components/EmergencyContacts';
import { BloggerGuideModal } from './components/BloggerGuideModal';

export const App: React.FC = () => {
  const {
    sosRequests,
    disasterReports,
    reliefCamps,
    forumPosts,
    selectedDistrict,
    setSelectedDistrict,
    activeTab,
    setActiveTab,
    addSOSRequest,
    addDisasterReport,
    addForumPost,
    addForumComment,
    upvoteReport,
    upvoteForumPost
  } = useEmergencyStore();

  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBloggerModalOpen, setIsBloggerModalOpen] = useState(false);
  const [mapSOSCoords, setMapSOSCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleOpenSOSWithCoords = (lat: number, lng: number) => {
    setMapSOSCoords({ lat, lng });
    setIsSOSModalOpen(true);
  };

  const handleJumpToCampMap = (lat: number, lng: number) => {
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-red-500 selection:text-white">
      
      {/* Navigation & Radar Header */}
      <Navbar
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSOSModal={() => {
          setMapSOSCoords(null);
          setIsSOSModalOpen(true);
        }}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
        sosCount={sosRequests.filter(s => s.status === 'PENDING').length}
      />

      {/* Main Content Body */}
      <main className="flex-1 p-3 sm:p-4 max-w-7xl mx-auto w-full">
        {activeTab === 'map' && (
          <InteractiveSpiderMap
            sosRequests={sosRequests}
            disasterReports={disasterReports}
            reliefCamps={reliefCamps}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onOpenSOSModalWithCoords={handleOpenSOSWithCoords}
            onUpvoteReport={upvoteReport}
          />
        )}

        {activeTab === 'camps' && (
          <ReliefCamps
            camps={reliefCamps}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onJumpToCampMap={handleJumpToCampMap}
          />
        )}

        {activeTab === 'forums' && (
          <Forums
            posts={forumPosts}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onAddPost={addForumPost}
            onAddComment={addForumComment}
            onUpvotePost={upvoteForumPost}
          />
        )}

        {activeTab === 'contacts' && (
          <EmergencyContacts />
        )}
      </main>

      {/* Spider Radar Modals */}
      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onSubmitSOS={addSOSRequest}
        initialCoords={mapSOSCoords}
        selectedDistrict={selectedDistrict}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={addDisasterReport}
        selectedDistrict={selectedDistrict}
      />

      <BloggerGuideModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © 2026 <strong>KERALAHUB.ONLINE</strong> • Community Disaster Relief & SOS Radar
          </p>
          <p className="text-[11px] text-slate-400">
            Powered by 100% Free OpenStreetMap, Supabase & Google Blogger Architecture
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;
