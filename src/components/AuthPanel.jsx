import React, { useState } from 'react';
import { X, UserCircle2, Mail, Lock, LogIn, UserPlus, AlertTriangle, CheckCircle2, LogOut } from 'lucide-react';
import { signUp, signIn, signOut, isAuthEnabled } from '../utils/authClient';
import { cyberAudio } from '../utils/audio';

export default function AuthPanel({ isOpen, onClose, user, onAuthed }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setNotice('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleModeSwitch = (nextMode) => {
    cyberAudio.playClick();
    setMode(nextMode);
    setError('');
    setNotice('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (!email.trim() || !password) {
      setError('Enter an email and password.');
      return;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await signUp(email.trim(), password);
        if (signUpError) throw signUpError;

        if (data.session) {
          cyberAudio.playUnlock();
          onAuthed(data.session.user);
          handleClose();
        } else {
          // Email confirmation is required before a session exists.
          setNotice('Account created! Check your email to confirm, then log in.');
          setMode('login');
        }
      } else {
        const { data, error: signInError } = await signIn(email.trim(), password);
        if (signInError) throw signInError;
        cyberAudio.playUnlock();
        onAuthed(data.session.user);
        handleClose();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    cyberAudio.playClick();
    await signOut();
    onAuthed(null);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-md bg-cyber-950 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl hud-corner">
        {/* Header */}
        <div className="bg-cyber-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserCircle2 className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-base font-cyber font-bold text-white tracking-wider">
              {user ? 'DEFENDER PROFILE' : mode === 'signup' ? 'CREATE ACCOUNT' : 'DEFENDER LOGIN'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-cyber-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {!isAuthEnabled() && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 text-center">
              Cloud accounts aren't configured for this deployment. Progress is saved locally on
              this device only.
            </div>
          )}

          {isAuthEnabled() && user && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyber-900 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan">
                <UserCircle2 className="w-9 h-9" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-1">
                  Signed in as
                </div>
                <div className="text-sm font-bold text-white break-all">{user.email}</div>
              </div>
              <p className="text-xs font-sans text-slate-400">
                Your mission progress syncs to this account across every device you log into.
              </p>
              <button
                onClick={handleSignOut}
                className="w-full py-3 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/30 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}

          {isAuthEnabled() && !user && (
            <>
              {/* Mode toggle */}
              <div className="flex items-center gap-1 bg-cyber-900/60 p-1 rounded-xl border border-slate-800 mb-5">
                <button
                  onClick={() => handleModeSwitch('login')}
                  className={`flex-1 py-2 rounded-lg text-xs font-hud font-bold uppercase tracking-wider transition-all ${
                    mode === 'login'
                      ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => handleModeSwitch('signup')}
                  className={`flex-1 py-2 rounded-lg text-xs font-hud font-bold uppercase tracking-wider transition-all ${
                    mode === 'signup'
                      ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full bg-cyber-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                      className="w-full bg-cyber-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-all"
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="w-full bg-cyber-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-all"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-300">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {notice && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-cyber-green-dim border border-cyber-green/40 text-xs text-slate-100">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-cyber-green" />
                    <span>{notice}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-cyan to-blue-500 text-black shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mode === 'signup' ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                  <span>{isSubmitting ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Log In'}</span>
                </button>
              </form>

              <p className="text-[11px] font-sans text-slate-500 text-center mt-4">
                Signing in syncs your progress across devices. Your existing on-device progress
                will be merged into your account.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
