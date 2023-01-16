declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    CRYPTO_ALGORITHM: string;
    CRYPTO_SECRET_KEY: string;
    NEXT_PUBLIC_API_ROUTE_SECRET: string;
    NEXT_PUBLIC_APP_ENV: 'test' | 'local' | 'staging' | 'production';
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_UNSPLASH_BASE_URL: string;
  }
}

declare module 'text-to-ipa' {
  export default {
    lookup(word: string | null | undefned): { error: 'undefined' | 'multi' | null, text: string | null } | undefined;
  };
}

type TThemeMode = 'light' | 'dark';
