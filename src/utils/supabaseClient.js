import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Cloud sync is entirely optional: without these env vars the app runs on
// localStorage alone, exactly as it did before. Set both in a .env.local
// (see .env.example) to enable cross-device progress sync.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const isCloudSyncEnabled = () => supabase !== null;
