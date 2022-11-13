declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface ProcessEnv {
    NEXT_PUBLIC_API_ROUTE_SECRET: string;
    NEXT_PUBLIC_APP_ENV: 'test' | 'local' | 'staging' | 'production';
    NEXT_PUBLIC_APP_URL: string;
  }
}
