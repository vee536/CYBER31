// Thin wrapper around Supabase Auth (email + password). No-ops gracefully
// when cloud sync isn't configured, so the app never crashes on auth calls
// in a project that hasn't set up Supabase.

import { supabase, isCloudSyncEnabled } from './supabaseClient';

export const isAuthEnabled = () => isCloudSyncEnabled();

export const signUp = async (email, password) => {
  if (!supabase) throw new Error('Cloud sync is not configured for this deployment.');
  return supabase.auth.signUp({ email, password });
};

export const signIn = async (email, password) => {
  if (!supabase) throw new Error('Cloud sync is not configured for this deployment.');
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  if (!supabase) return { error: null };
  return supabase.auth.signOut();
};

export const getSession = async () => {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// Returns an unsubscribe function.
export const onAuthStateChange = (callback) => {
  if (!supabase) return () => {};
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return () => subscription.unsubscribe();
};
