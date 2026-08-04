import React, { useState } from 'react';
import { useEmergencyStore } from './services/store';
import { Navbar } from './components/Navbar';
import { InteractiveDisasterMap } from './components/InteractiveDisasterMap';
import { SOSModal } from './components/SOSModal';
import { ReportModal } from './components/ReportModal';
import { ReliefCamps } from './components/ReliefCamps';
import { Forums } from './components/Forums';
import { EmergencyContacts } from './components/EmergencyContacts';
import { BloggerGuideModal } from './components/BloggerGuideModal';
import { AuthModal } from './components/AuthModal';
import { PhotoFeed } from './components/PhotoFeed';
import { MarketplaceJobs } from './components/MarketplaceJobs';
import { EventsTourism } from './components/EventsTourism';
import { AdminDashboard } from './components/AdminDashboard';

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
    language,
    setLanguage,
    currentUser,
    setCurrentUser,
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [mapSOSCoords, setMapSOSCoords] = useState<{ lat: number; lng: number } | null>(null);

  const requireAuth = (action: () => void) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    } else {
      action();
    }
  };

  const handleOpenSOSWithCoords = (lat: number, lng: number) => {
    requireAuth(() => {
      setMapSOSCoords({ lat, lng });
      setIsSOSModalOpen(true);
    });
  };

  const handleJumpToCampMap = (lat: number, lng: number) => {
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        selectedDistrict={selectedDistrict}
        onSelectDistrict={setSelectedDistrict}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSOSModal={() => requireAuth(() => { setMapSOSCoords(null); setIsSOSModalOpen(true); })}
        onOpenReportModal={() => requireAuth(() => setIsReportModalOpen(true))}
        onOpenBloggerModal={() => setIsBloggerModalOpen(true)}
        sosCount={sosRequests.filter(s => s.status === 'PENDING').length}
        language={language}
        onToggleLanguage={setLanguage}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={() => setCurrentUser(null)}
      />

      {/* Main Content Body */}
      <main className="flex-1 p-3 sm:p-4 max-w-7xl mx-auto w-full font-sans">
        {activeTab === 'map' && (
          <InteractiveDisasterMap
            sosRequests={sosRequests}
            disasterReports={disasterReports}
            reliefCamps={reliefCamps}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onOpenSOSModalWithCoords={handleOpenSOSWithCoords}
            onUpvoteReport={upvoteReport}
            language={language}
          />
        )}

        {activeTab === 'feed' && (
          <PhotoFeed
            reports={disasterReports}
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            onAddReport={(data) => requireAuth(() => addDisasterReport(data))}
            onUpvoteReport={upvoteReport}
            language={language}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'jobs' && (
          <MarketplaceJobs
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            language={language}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'events' && (
          <EventsTourism
            selectedDistrict={selectedDistrict}
            onSelectDistrict={setSelectedDistrict}
            language={language}
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
            onAddPost={(data) => requireAuth(() => addForumPost(data))}
            onAddComment={(id, author, text) => requireAuth(() => addForumComment(id, author, text))}
            onUpvotePost={upvoteForumPost}
            currentUser={currentUser}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'contacts' && (
          <EmergencyContacts />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard currentUser={currentUser} />
        )}
      </main>

      {/* Emergency & Auth Modals */}
      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onSubmitSOS={addSOSRequest}
        initialCoords={mapSOSCoords}
        selectedDistrict={selectedDistrict}
        currentUser={currentUser}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={addDisasterReport}
        selectedDistrict={selectedDistrict}
        currentUser={currentUser}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      <BloggerGuideModal
        isOpen={isBloggerModalOpen}
        onClose={() => setIsBloggerModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © 2026 <strong>KERALAHUB.ONLINE</strong> • Kerala's Unified Digital Ecosystem & Emergency Response Hub
          </p>
          <p className="text-[11px] text-slate-400">
            Powered by OpenStreetMap, Supabase Auth & Google Blogger Architecture
          </p>
        </div>
      </footer>

    </div>
  );
};

export default App;
