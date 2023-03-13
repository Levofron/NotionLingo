import { supabaseInstance } from '@config/supabase/supabase.instance';

export const getProfileById = async (userId: string) => {
  const { data } = await supabaseInstance
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .throwOnError()
    .single();

  return data;
};
