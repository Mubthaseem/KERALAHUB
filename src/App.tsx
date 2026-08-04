import React, { useState } from 'react';
import { useEmergencyStore } from './services/store';
import { SidebarNav } from './components/SidebarNav';
import { RightSidebar } from './components/RightSidebar';
import { BottomNav } from './components/BottomNav';

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
import { AIAssistant } from './components/AIAssistant';
import { UserProfileModal } from './components/UserProfileModal';

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
    <div className="bg-background text-on-surface font-sans min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      
      {/* 3-Column Stitch Layout */}
      <div className="flex min-h-screen max-w-[1440px] mx-auto relative">
        
        {/* Left SideNav */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenReportModal={() => requireAuth(() => setIsReportModalOpen(true))}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Center Content Area */}
        <main className="flex-1 md:ml-64 flex justify-center w-full min-h-screen pb-20 md:pb-6">
          <div className="w-full max-w-[720px] border-r border-outline-variant/20 min-h-screen p-2 sm:p-4">
            
            {/* Top Live Emergency Banner */}
            <div className="bg-error-container/20 border border-error/40 rounded-xl p-3 mb-4 flex items-center justify-between text-xs text-on-surface">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                <span className="font-bold text-error uppercase">Live Alert:</span>
                <span className="truncate max-w-[200px] sm:max-w-md text-on-surface-variant">
                  Waynad Chooralmala & Kuttanad Alappuzha emergency response active
                </span>
              </div>
              <button
                onClick={() => requireAuth(() => { setMapSOSCoords(null); setIsSOSModalOpen(true); })}
                className="bg-error hover:bg-error/90 text-on-error font-bold px-3 py-1 rounded-lg shrink-0 text-[11px] shadow"
              >
                SOS HELP
              </button>
            </div>

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

            {activeTab === 'ai' && (
              <AIAssistant selectedDistrict={selectedDistrict} />
            )}

            {activeTab === 'profile' && (
              <UserProfileModal currentUser={currentUser} reports={disasterReports} />
            )}

            {activeTab === 'admin' && (
              <AdminDashboard currentUser={currentUser} />
            )}

          </div>
        </main>

        {/* Right Sidebar Widgets */}
        <RightSidebar selectedDistrict={selectedDistrict} onSelectDistrict={setSelectedDistrict} />

      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCreateModal={() => requireAuth(() => setIsReportModalOpen(true))}
        sosCount={sosRequests.filter(s => s.status === 'PENDING').length}
      />

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

    </div>
  );
};

export default App;
