import { useState, useEffect } from 'react';
import { SOSRequest, DisasterReport, ReliefCamp, ForumPost, ForumComment, DistrictName } from '../types';
import { INITIAL_SOS_REQUESTS, INITIAL_DISASTER_REPORTS, INITIAL_RELIEF_CAMPS, INITIAL_FORUM_POSTS } from '../data/mockData';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  SOS: 'keralahub_sos_v2_aug2026',
  REPORTS: 'keralahub_reports_v2_aug2026',
  CAMPS: 'keralahub_camps_v2_aug2026',
  FORUMS: 'keralahub_forums_v2_aug2026'
};

export function useEmergencyStore() {
  const [sosRequests, setSosRequests] = useState<SOSRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOS);
    return saved ? JSON.parse(saved) : INITIAL_SOS_REQUESTS;
  });

  const [disasterReports, setDisasterReports] = useState<DisasterReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return saved ? JSON.parse(saved) : INITIAL_DISASTER_REPORTS;
  });

  const [reliefCamps, setReliefCamps] = useState<ReliefCamp[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CAMPS);
    return saved ? JSON.parse(saved) : INITIAL_RELIEF_CAMPS;
  });

  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FORUMS);
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  });

  const getInitialTab = (): 'map' | 'feed' | 'rain' | 'jobs' | 'events' | 'camps' | 'forums' | 'contacts' | 'ai' | 'profile' | 'admin' => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validTabs = ['map', 'feed', 'rain', 'jobs', 'events', 'camps', 'forums', 'contacts', 'ai', 'profile', 'admin'];
    return validTabs.includes(hash) ? (hash as any) : 'feed';
  };

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictName>('All Districts');
  const [activeTab, setActiveTabState] = useState<'map' | 'feed' | 'rain' | 'jobs' | 'events' | 'camps' | 'forums' | 'contacts' | 'ai' | 'profile' | 'admin'>(getInitialTab);
  const [language, setLanguage] = useState<'en' | 'ml'>('en');

  const setActiveTab = (tab: 'map' | 'feed' | 'rain' | 'jobs' | 'events' | 'camps' | 'forums' | 'contacts' | 'ai' | 'profile' | 'admin') => {
    setActiveTabState(tab);
    window.location.hash = `#/${tab}`;
  };

  // Sync window.location.hash changes (back/forward browser buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validTabs = ['map', 'feed', 'jobs', 'events', 'camps', 'forums', 'contacts', 'ai', 'profile', 'admin'];
      if (validTabs.includes(hash)) {
        setActiveTabState(hash as any);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/feed';
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [currentUser, setCurrentUser] = useState<{ email: string; name?: string } | null>(() => {
    const saved = localStorage.getItem('keralahub_user_v1');
    return saved ? JSON.parse(saved) : null;
  });

  const handleSetUser = (user: { email: string; name?: string } | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('keralahub_user_v1', JSON.stringify(user));
    } else {
      localStorage.removeItem('keralahub_user_v1');
    }
  };

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOS, JSON.stringify(sosRequests));
  }, [sosRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(disasterReports));
  }, [disasterReports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAMPS, JSON.stringify(reliefCamps));
  }, [reliefCamps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FORUMS, JSON.stringify(forumPosts));
  }, [forumPosts]);

  // Optional Supabase Live Fetch & Realtime Listeners
  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) return;

    async function loadSupabaseData() {
      try {
        const { data: sosData } = await client!.from('sos_requests').select('*').order('created_at', { ascending: false });
        if (sosData && sosData.length > 0) setSosRequests(sosData);

        const { data: reportData } = await client!.from('disaster_reports').select('*').order('created_at', { ascending: false });
        if (reportData && reportData.length > 0) setDisasterReports(reportData);

        const { data: campData } = await client!.from('relief_camps').select('*');
        if (campData && campData.length > 0) setReliefCamps(campData);

        const { data: forumData } = await client!.from('forum_posts').select('*').order('created_at', { ascending: false });
        if (forumData && forumData.length > 0) setForumPosts(forumData);
      } catch (err) {
        console.warn('Supabase fetch notice: using local state store fallback', err);
      }
    }

    loadSupabaseData();

    // Subscribe to realtime changes
    const sosChannel = client.channel('realtime_sos')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sos_requests' }, (payload) => {
        setSosRequests((prev) => [payload.new as SOSRequest, ...prev]);
      })
      .subscribe();

    return () => {
      client.removeChannel(sosChannel);
    };
  }, []);

  // Action methods
  const addSOSRequest = async (newSOS: Omit<SOSRequest, 'id' | 'created_at' | 'status'>) => {
    const item: SOSRequest = {
      ...newSOS,
      id: 'sos-' + Date.now(),
      created_at: new Date().toISOString(),
      status: 'PENDING'
    };

    setSosRequests((prev) => [item, ...prev]);

    const client = supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('sos_requests').insert([item]);
      } catch (err) {
        console.error('Supabase SOS insert error:', err);
      }
    }
  };

  const addDisasterReport = async (newReport: Omit<DisasterReport, 'id' | 'created_at' | 'upvotes'>) => {
    const item: DisasterReport = {
      ...newReport,
      id: 'rep-' + Date.now(),
      created_at: new Date().toISOString(),
      upvotes: 1
    };

    setDisasterReports((prev) => [item, ...prev]);

    const client = supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('disaster_reports').insert([item]);
      } catch (err) {
        console.error('Supabase report insert error:', err);
      }
    }
  };

  const addForumPost = async (newPost: Omit<ForumPost, 'id' | 'created_at' | 'upvotes' | 'comments'>) => {
    const item: ForumPost = {
      ...newPost,
      id: 'post-' + Date.now(),
      created_at: new Date().toISOString(),
      upvotes: 1,
      comments: []
    };

    setForumPosts((prev) => [item, ...prev]);

    const client = supabase;
    if (isSupabaseConfigured && client) {
      try {
        await client.from('forum_posts').insert([item]);
      } catch (err) {
        console.error('Supabase forum insert error:', err);
      }
    }
  };

  const addForumComment = (postId: string, authorName: string, content: string) => {
    setForumPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment: ForumComment = {
            id: Date.now().toString(),
            author: authorName,
            author_name: authorName,
            content,
            created_at: new Date().toISOString()
          };
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  const upvoteReport = (reportId: string) => {
    setDisasterReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  };

  const upvoteForumPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  return {
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
    setCurrentUser: handleSetUser,
    addSOSRequest,
    addDisasterReport,
    addForumPost,
    addForumComment,
    upvoteReport,
    upvoteForumPost
  };
}
