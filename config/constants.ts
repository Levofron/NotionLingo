export const SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES = [
  'example',
  'Example',
  'Sentence',
  'sentence',
  'Example sentence',
  'example sentence',
];
export const SUPPORTED_MEANING_COLUMN_NAMES = ['Meaning', 'meaning'];
export const SUPPORTED_WORD_COLUMN_NAMES = ['Word', 'word', 'Name', 'name'];
export const SUPPORTED_TYPE_COLUMN_NAMES = ['Type', 'type', 'Category', 'category'];

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const API_ROUTE_SECRET = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const UNSPLASH_BASE_URL = process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL;
export const APPLICATION_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENV || 'local';

export const { CRYPTO_ALGORITHM, CRYPTO_SECRET_KEY, SUPABASE_SERVICE_ROLE } = process.env;

export const GITHUB_LINK = 'https://github.com/playerony';
export const CONTACT_EMAIL = 'pawel.wojtasinski.1995@gmail.com;';
export const TWITTER_LINK = 'https://twitter.com/wojtasinskipawe';
export const LINKEDIN_LINK = 'https://linkedin.com/in/pwojtasinski';
export const BUY_ME_A_COFFEE_LINK = 'https://buymeacoffee.com/playerony';
export const PAYPAL_LINK = 'https://www.paypal.com/donate/?hosted_button_id=XQC5QN5G4JJW2';

export const DEFAULT_SPEECH_SYNTHESIS_PITCH = 1;
export const DEFAULT_SPEECH_SYNTHESIS_VOLUME = 1;
export const DEFAULT_SPEECH_SYNTHESIS_RATE = 0.8;
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE = 'speechSynthesisRate';
export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE = 'speechSynthesisVoice';
export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH = 'speechSynthesisPitch';
export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME = 'speechSynthesisVolume';