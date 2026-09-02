import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Globe, Bell, Bookmark, ChevronDown, Menu, ShieldAlert, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { KonarkMandalaLogo } from './OdishaMotifs';
import { ASSET_IMAGES } from '../data/landingData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface HeaderProps {
  currentPage?: 'home' | 'explore' | 'watch' | 'emergency' | 'plan' | 'generatedJourney';
  onNavigate?: (page: 'home' | 'explore' | 'watch' | 'emergency') => void;
  onOpenPlan: () => void;
  onSelectCategory?: (id: string) => void;
  savedCount?: number;
  onOpenSaved?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenPlan,
  savedCount = 0,
  onOpenSaved,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const isLoggedIn = Boolean(authUser);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setAuthUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleEmailAuth = async () => {
    if (!supabase) {
      setAuthMessage('Authentication is not configured yet. Add the Supabase keys in .env.local.');
      return;
    }

    setAuthBusy(true);
    setAuthMessage('');
    const result = authMode === 'signup'
      ? await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: { data: { full_name: authFullName }, emailRedirectTo: window.location.origin },
        })
      : await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });

    setAuthBusy(false);
    if (result.error) {
      setAuthMessage(result.error.message);
      return;
    }

    if (authMode === 'signup' && !result.data.session) {
      setAuthMessage('Check your email to verify your account, then sign in.');
      return;
    }

    setAuthModalOpen(false);
    setAuthPassword('');
  };

  const handleGoogleAuth = async () => {
    if (!supabase) {
      setAuthMessage('Authentication is not configured yet. Add the Supabase keys in .env.local.');
      return;
    }

    setAuthBusy(true);
    setAuthMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setAuthBusy(false);
      setAuthMessage(error.message);
    }
  };

  const navLinks = [
    {
      name: 'Explore',
      id: 'explore',
      onClick: () => onNavigate?.('explore'),
      isActive: currentPage === 'explore',
    },
    {
      name: 'Watch Odisha',
      id: 'watch',
      onClick: () => onNavigate?.('watch'),
      isActive: currentPage === 'watch',
    },
    {
      name: 'Plan Journey',
      id: 'plan',
      onClick: onOpenPlan,
      isActive: false,
    },
    {
      name: 'Map',
      id: 'map',
      onClick: () => {
        if (currentPage !== 'home') onNavigate?.('home');
        setTimeout(() => {
          document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      isActive: false,
    },
    {
      name: 'Emergency Help',
      id: 'emergency',
      onClick: () => onNavigate?.('emergency'),
      isActive: currentPage === 'emergency',
    },
    {
      name: 'About',
      id: 'about',
      onClick: () => {
        if (currentPage !== 'home') onNavigate?.('home');
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
      isActive: false,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#ebdcc8]/80 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 text-left cursor-pointer focus:outline-none"
          >
            <KonarkMandalaLogo className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:rotate-45" />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-wider font-bold text-[#1a2638] leading-none">
                ODYSHA
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-600 font-medium tracking-tight mt-0.5 sm:mt-1">
                Local knowledge. Better journeys.
              </span>
            </div>
          </button>

          {/* Desktop & Wide Tablet Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.onClick}
                className={`text-sm font-medium transition-all py-1.5 relative cursor-pointer focus:outline-none ${
                  link.isActive
                    ? 'text-[#9a3412] font-semibold'
                    : 'text-gray-700 hover:text-[#9a3412]'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">{link.id === 'emergency' && <ShieldAlert className="h-3.5 w-3.5" />}{link.name}</span>
                {/* Active indicator bar matching screenshot */}
                {link.isActive ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9a3412] rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9a3412]/50 transition-all group-hover:w-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right Header Actions (Language, Bell, Bookmark, User profile) */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Language Selector */}
            <div className="relative">
              
            </div>

            {/* Notification Bell with '0' badge */}
            

            {/* Saved / Bookmarks Button */}
            <button
              onClick={onOpenSaved}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 rounded-full transition-colors cursor-pointer relative"
              title="Saved places"
              aria-label="Saved places"
            >
              <Bookmark className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#9a3412] text-white text-[9px] font-bold flex items-center justify-center rounded-full leading-none">
                  {savedCount}
                </span>
              )}
            </button>

            {/* =========================================
                USER / AUTHENTICATION
            ========================================= */}

            {!isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthMessage('');
                  setAuthModalOpen(true);
                }}
                className="
                  rounded-full
                  border border-[#e6ddd0]
                  bg-white
                  px-5 py-2.5
                  text-sm
                  font-semibold
                  text-[#182639]
                  shadow-sm
                  transition-all
                  hover:-translate-y-0.5
                  hover:border-[#c9552d]
                  hover:text-[#c9552d]
                  hover:shadow-md
                "
              >
                Login / Sign Up
              </button>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setUserDropdownOpen(!userDropdownOpen)
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-amber-200
                    bg-white
                    px-2
                    py-1.5
                    transition-all
                    hover:bg-gray-50
                  "
                >
                  <img
                    src={ASSET_IMAGES.userAvatar}
                    alt={authUser?.user_metadata?.full_name || authUser?.email || 'User'}
                    className="
                      h-7 w-7
                      rounded-full
                      object-cover
                      border
                      border-amber-200
                      shrink-0
                    "
                    referrerPolicy="no-referrer"
                  />

                  <span className="text-xs sm:text-sm font-semibold text-gray-800">
                    {authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || 'Traveller'}
                  </span>

                  <ChevronDown
                    className="w-3.5 h-3.5 text-gray-500 shrink-0"
                  />
                </button>

                {userDropdownOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      mt-2
                      w-48
                      rounded-2xl
                      border
                      border-gray-100
                      bg-white
                      shadow-xl
                      z-50
                      overflow-hidden
                    "
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-800">
                        {authUser?.user_metadata?.full_name || 'Odysha traveller'}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {authUser?.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        onOpenPlan?.();
                      }}
                      className="
                        w-full
                        text-left
                        px-4 py-2.5
                        text-xs
                        text-gray-700
                        hover:bg-[#faf6f0]
                      "
                    >
                      My Planned Journeys
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        onOpenSaved?.();
                      }}
                      className="
                        w-full
                        text-left
                        px-4 py-2.5
                        text-xs
                        text-gray-700
                        hover:bg-[#faf6f0]
                      "
                    >
                      Saved Places
                    </button>

                    <div className="border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={async () => {
                        setUserDropdownOpen(false);
                        await supabase?.auth.signOut();
                      }}
                      className="
                        w-full
                        text-left
                        px-4 py-2.5
                        text-xs
                        font-medium
                        text-[#b84a2d]
                        hover:bg-[#fff5f1]
                      "
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Mobile / Tablet Header Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenSaved}
              className="p-2 text-gray-700 hover:text-gray-900 rounded-lg relative"
              aria-label="Saved Places"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#9a3412] text-white text-[9px] font-bold flex items-center justify-center rounded-full leading-none">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Ornate Lace Motif Frieze Border running across the bottom of the header */}
      <div
        className="w-full h-[6px] sm:h-[8px] bg-repeat-x bg-contain opacity-75 pointer-events-none"
        style={{
          backgroundImage: `url(${ASSET_IMAGES.headerLace})`,
          backgroundSize: 'auto 100%',
        }}
      />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fcfbf9] border-b border-[#eee7dc] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  link.onClick();
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left block text-base font-medium px-3 py-2.5 rounded-lg transition-colors ${
                  link.isActive
                    ? 'bg-[#faf3e7] text-[#9a3412] font-semibold'
                    : 'text-gray-800 hover:text-[#9a3412] hover:bg-[#faf6f0]'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#eee7dc] flex flex-col gap-3">
            {/* User quick card in mobile drawer */}
            <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-gray-200">
              <img
                src={ASSET_IMAGES.userAvatar}
                alt={authUser?.user_metadata?.full_name || authUser?.email || 'Traveller'}
                className="w-8 h-8 rounded-full object-cover border border-amber-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900">{authUser?.user_metadata?.full_name || 'Odysha traveller'}</p>
                <p className="text-[10px] text-gray-500 truncate">{authUser?.email}</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            
            
          </div>
        </div>
      )}

    {authModalOpen &&
      createPortal(
        <div
        className="
          fixed
          inset-0
          z-[9999]
          flex
          items-center
          justify-center
          overflow-y-auto
          bg-black/40
          backdrop-blur-sm
          px-4
          py-6
        "
        onClick={() => setAuthModalOpen(false)}
      >
        <div
          className="
            relative
            w-full
            max-w-[420px]
            max-h-[90vh]
            overflow-y-auto
            rounded-[20px]
            border
            border-[#eadfce]
            bg-[#fffaf3]
            px-6
            py-5
            shadow-2xl
          "
          onClick={(e) => e.stopPropagation()}
        >


          {/* ODYSHA Branding */}
          <div className="text-center mb-3">
            <div className="flex justify-center mb-2">
              <KonarkMandalaLogo className="w-8 h-8 text-[#c9552d]" />
            </div>

            <div className="font-serif text-lg font-bold tracking-wide text-[#182639]">
              ODYSHA
            </div>

            <div className="text-[10px] text-gray-500 tracking-tight mt-0.5">
              Local knowledge. Better journeys.
            </div>

            {/* Traditional divider */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="h-px w-12 bg-[#c9552d]/35" />
              <span className="text-[#c9552d] text-xs">✦</span>
              <div className="h-px w-12 bg-[#c9552d]/35" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-serif text-[25px] font-bold tracking-tight text-[#182639]">
                  {authMode === 'login'
                    ? 'Welcome back'
                    : 'Join ODYSHA'}
                </h2>

                <p className="mt-1 text-sm text-[#5f6470]">
                  {authMode === 'login'
                    ? 'Continue discovering Odisha your way.'
                    : 'Begin your journey with ODYSHA.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="
                  text-gray-400
                  hover:text-gray-700
                  text-xl
                "
              >
                ×
              </button>
            </div>
          </div>

          {/* Login / Signup switch */}
          <div className="mb-6 flex rounded-xl border border-[#eadfce] bg-[#f3ede4] p-1">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`
                flex-1
                rounded-lg
                py-2
                text-sm
                font-semibold
                transition
                ${
                  authMode === 'login'
                    ? 'bg-white text-[#182639] shadow-sm'
                    : 'text-gray-500'
                }
              `}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`
                flex-1
                rounded-lg
                py-2
                text-sm
                font-semibold
                transition
                ${
                  authMode === 'signup'
                    ? 'bg-white text-[#182639] shadow-sm'
                    : 'text-gray-500'
                }
              `}
            >
              Sign Up
            </button>
          </div>

          {/* Signup name */}
          {authMode === 'signup' && (
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={authFullName}
                onChange={(event) => setAuthFullName(event.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#ded4c5]
                  px-4 py-3
                  text-sm
                  outline-none
                  focus:border-[#c9552d]
                  focus:ring-2
                  focus:ring-[#c9552d]/10
                "
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">
              Email
            </label>

            <input
                type="email"
                placeholder="you@example.com"
                value={authEmail}
                onChange={(event) => setAuthEmail(event.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-[#ded4c5]
                bg-white/80
                px-4
                py-3
                text-sm
                text-[#182639]
                outline-none
                transition
                placeholder:text-[#9b9a98]
                focus:border-[#c9552d]
                focus:ring-2
                focus:ring-[#c9552d]/10
              "
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="mb-1.5 block text-xs font-semibold text-gray-700">
              Password
            </label>

            <input
                type="password"
                placeholder="Enter a secure password"
                value={authPassword}
                onChange={(event) => setAuthPassword(event.target.value)}
              className="
                w-full
                rounded-xl
                border
                border-[#ded4c5]
                bg-white/80
                px-4
                py-3
                text-sm
                text-[#182639]
                outline-none
                transition
                placeholder:text-[#9b9a98]
                focus:border-[#c9552d]
                focus:ring-2
                focus:ring-[#c9552d]/10
              "
            />
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleEmailAuth}
            disabled={authBusy || !authEmail || !authPassword || (authMode === 'signup' && !authFullName)}
            className="
              w-full
              rounded-xl
              bg-[#182639]
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#c9552d]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {authBusy ? 'Please wait…' : authMode === 'login' ? 'Login' : 'Create Account'}
          </button>

          {authMessage && (
            <p className="mt-3 rounded-xl border border-[#eadfce] bg-[#fff8ee] px-3 py-2 text-center text-xs leading-relaxed text-[#765b42]">
              {authMessage}
            </p>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={authBusy}
            className="
              w-full
              rounded-xl
              border
              border-[#ded4c5]
              bg-white
              py-3
              text-sm
              font-semibold
              text-[#3d4654]
              transition-all
              hover:border-[#c9552d]/40
              hover:bg-[#fffaf3]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            Continue with Google
          </button>

          <p className="mt-3 text-center text-[10px] leading-relaxed text-[#8c877f]">
            <div className="mt-6 mb-4 overflow-hidden">
              <img
                src="/src/assets/images/odisha_divider_mandala.png"
                alt=""
                className="w-full h-5 object-cover opacity-45"
              />
            </div>
            By continuing, you agree to ODYSHA's terms and privacy policy.
          </p>
            </div>
          </div>,
          document.body
        )}

    </header>
  );
};
