export enum ERestEndpoints {
  CONTACT = '/contact',
  DELETE_PROFILE = '/profile/delete',
  GET_AVAILABLE_NOTION_PAGES = '/notion/available-pages',
  GET_LOGGED_USER = '/profile/logged',
  GET_RANDOM_NOTION_WORDS = '/notion/random-words',
  GET_WORD_SUGGESTIONS = '/cambridge-dictionary/find',
  HEALTH_CHECK = '/health-check',
  INCREASE_DAILY_STREAK = '/profile/increase-daily-streak',
  RESET_NOTION_INTEGRATION = '/profile/reset-notion-integration',
  SET_NOTION_API_TOKEN = '/notion/set-api-token',
  SET_NOTION_PAGE_ID = '/notion/set-page-id',
  SET_SUPABASE_COOKIE = '/set-supabase-cookie',
}
