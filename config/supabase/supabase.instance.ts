import { createClient } from '@supabase/supabase-js';

import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE, SUPABASE_URL } from '../constants';

export const supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getSupabaseService = () => createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);
