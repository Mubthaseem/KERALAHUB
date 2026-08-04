import React, { useState } from 'react';
import { User, Lock, Mail, LogIn, UserPlus, X, ShieldCheck, Zap } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { email: string; name?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      } catch (err: any) {
        setErrorMsg(err.message || 'Google login failed.');
      }
    } else {
      // Local fallback simulation
      onLoginSuccess({ email: 'user.google@gmail.com', name: 'Google Account User' });
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        if (isSignUp) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } }
          });
          if (error) throw error;
          alert('Account created! Logging in...');
          onLoginSuccess({ email: data.user?.email || email, name: name || email.split('@')[0] });
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
          onLoginSuccess({ email: data.user?.email || email, name: data.user?.user_metadata?.full_name || email.split('@')[0] });
        }
        onClose();
      } catch (err: any) {
        setErrorMsg(err.message || 'Authentication failed.');
      } finally {
        setLoading(false);
      }
    } else {
      onLoginSuccess({ email, name: name || email.split('@')[0] });
      onClose();
    }
  };

  const handleGuestLogin = () => {
    const guestId = Math.floor(1000 + Math.random() * 9000);
    onLoginSuccess({ email: `volunteer${guestId}@keralahub.online`, name: `Volunteer #${guestId}` });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto font-sans">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold shadow-md shadow-red-600/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {isSignUp ? 'Create Volunteer Account' : 'Sign In to KeralaHub'}
              </h3>
              <p className="text-xs text-slate-500">
                Official User & Volunteer Portal Access
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-xl mb-3 font-medium">
            {errorMsg}
          </div>
        )}

        {/* 1-Tap Google Account Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center gap-2.5 transition mb-3"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google Account</span>
        </button>

        <div className="my-3 border-t border-slate-100 flex items-center justify-center relative">
          <span className="bg-white px-3 text-[11px] text-slate-400 font-medium relative -top-2.5">
            OR WITH EMAIL
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isSignUp && (
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Nair"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 text-slate-900"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 pl-9 text-slate-900"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-red-600/25 transition flex items-center justify-center gap-1.5"
          >
            {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>{loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}</span>
          </button>
        </form>

        {/* 1-Tap Guest Access */}
        <button
          onClick={handleGuestLogin}
          className="w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>1-Tap Instant Guest Access</span>
        </button>

        {/* Toggle Mode */}
        <div className="mt-3 text-center text-xs text-slate-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-red-600 font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>

      </div>
    </div>
  );
};
