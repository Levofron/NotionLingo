export const SUPPORTED_WORD_COLUMN_NAMES = ['word'];
export const SUPPORTED_MEANING_COLUMN_NAMES = ['meaning'];
export const SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES = ['example sentence'];

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const API_ROUTE_SECRET = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const APPLICATION_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENV || 'local';

export const { CRYPTO_ALGORITHM } = process.env;
export const { CRYPTO_SECRET_KEY } = process.env;
