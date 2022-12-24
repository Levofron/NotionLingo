import { createClient } from '@supabase/supabase-js';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@constants';

export const supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
