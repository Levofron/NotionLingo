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
  }
}

type TThemeMode = 'light' | 'dark';
