import { TSession } from '@domain/supabase/supabase.types';
import { AxiosResponse } from 'axios';

export interface IRestSource {
  healthCheck: () => Promise<AxiosResponse<string>>;
  setSupabaseCookie: (supabaseSession: TSession | null) => Promise<void>;
}
