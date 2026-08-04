import React, { useState } from 'react';
import { ForumPost, DistrictName } from '../types';
import { MessageSquare, ThumbsUp, CheckCircle, Send, PlusCircle, AlertTriangle, ShieldCheck, Tag } from 'lucide-react';

interface ForumsProps {
  posts: ForumPost[];
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  onAddPost: (post: {
    district: DistrictName;
    category: 'Emergency Alert' | 'Volunteer Task' | 'Supplies Needed' | 'Road Update' | 'General';
    author_name: string;
    title: string;
    content: string;
    image_url?: string;
  }) => void;
  onAddComment: (postId: string, author: string, content: string) => void;
  onUpvotePost: (postId: string) => void;
}

export const Forums: React.FC<ForumsProps> = ({
  posts,
  selectedDistrict,
  onSelectDistrict,
  onAddPost,
  onAddComment,
  onUpvotePost
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // New Post State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<'Emergency Alert' | 'Volunteer Task' | 'Supplies Needed' | 'Road Update' | 'General'>('Emergency Alert');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Comment State
  const [commentInputs, setCommentInputs] = useState<Record<string, { author: string; text: string }>>({});

  const filteredPosts = posts.filter((post) => {
    const matchesDistrict = selectedDistrict === 'All Districts' || post.district === selectedDistrict;
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesDistrict && matchesCategory;
  });

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('Please fill out Title, Name, and Content.');
      return;
    }

    onAddPost({
      district: selectedDistrict === 'All Districts' ? 'Wayanad' : selectedDistrict,
      category,
      author_name: author,
      title,
      content,
      image_url: imageUrl || undefined
    });

    setTitle('');
    setAuthor('');
    setContent('');
    setImageUrl('');
    setShowCreateModal(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const input = commentInputs[postId];
    if (!input || !input.text || !input.author) {
      alert('Please enter your name and comment text.');
      return;
    }

    onAddComment(postId, input.author, input.text);

    setCommentInputs((prev) => ({
      ...prev,
      [postId]: { author: '', text: '' }
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 font-sans">
      
      {/* Header & Create Trigger */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            KERALA COMMUNITY DISASTER FORUMS
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            District-wise emergency announcements, volunteer tasks, road updates & mutual help
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-red-600/30 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Start New Discussion Thread</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6">
        {['All', 'Emergency Alert', 'Volunteer Task', 'Supplies Needed', 'Road Update', 'General'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="white-spider-card rounded-2xl p-6">
            
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase">
                  {post.category}
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md">
                  📍 {post.district}
                </span>
                {post.is_verified && (
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    VERIFIED OFFICIAL
                  </span>
                )}
              </div>

              <span className="text-[11px] text-slate-400 font-mono">
                {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Title & Body */}
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-mono">{post.title}</h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-4 whitespace-pre-line">{post.content}</p>

            {post.image_url && (
              <div className="mb-4 rounded-xl overflow-hidden max-h-80 border border-slate-200">
                <img src={post.image_url} alt="Forum attachment" className="w-full object-cover" />
              </div>
            )}

            {/* Footer Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
              <span>Posted by <strong>{post.author_name}</strong></span>

              <button
                onClick={() => onUpvotePost(post.id)}
                className="flex items-center gap-1.5 text-blue-600 font-bold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition border border-blue-200"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Upvote ({post.upvotes})</span>
              </button>
            </div>

            {/* Comments Thread */}
            <div className="mt-4 pt-4 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
              <h4 className="text-xs font-mono font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Comments ({post.comments.length})</span>
              </h4>

              {/* Comment list */}
              <div className="space-y-2 mb-4">
                {post.comments.map((c) => (
                  <div key={c.id} className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-slate-800">{c.author}</span>
                      <span>{new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="text-slate-700 text-xs">{c.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={commentInputs[post.id]?.author || ''}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [post.id]: { author: e.target.value, text: prev[post.id]?.text || '' }
                    }))
                  }
                  className="bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                />

                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[post.id]?.text || ''}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({
                      ...prev,
                      [post.id]: { author: prev[post.id]?.author || '', text: e.target.value }
                    }))
                  }
                  className="bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none sm:col-span-2"
                />
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Post Comment</span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold font-mono text-slate-900 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-red-600" />
              CREATE FORUM THREAD
            </h3>

            <form onSubmit={handleCreatePostSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Thread Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                >
                  <option value="Emergency Alert">⚠️ Emergency Alert</option>
                  <option value="Volunteer Task">🤝 Volunteer Task</option>
                  <option value="Supplies Needed">📦 Supplies Needed</option>
                  <option value="Road Update">🛣️ Road Update</option>
                  <option value="General">💬 General Discussion</option>
                </select>
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Author Name *</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Meppadi Relief Volunteers"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Thread Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief summary title..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">Details & Message *</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write thread announcement details..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-slate-100 text-slate-700 font-mono font-bold px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold px-4 py-2 rounded-lg"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
