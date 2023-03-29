import { functionImportTest } from '@infrastructure/jest';

import { supabaseInstance } from '@config/supabase.instance';

import { assignRequestTokenToSupabaseSessionMiddleware } from './assign-request-token-to-supabase-session-middleware.function';

describe('assignRequestTokenToSupabaseSessionMiddleware function', () => {
  functionImportTest(assignRequestTokenToSupabaseSessionMiddleware);

  it('should assign supabaase session', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {
        cookie: 'sb:token = token',
      },
    };

    const result = await assignRequestTokenToSupabaseSessionMiddleware(request);

    expect(result).toBeTruthy();

    expect(supabaseInstance.auth.session()).toEqual({
      user: null,
      token_type: '',
      access_token: 'token',
    });
  });

  it('should return true if cookie is not present', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request: any = {
      headers: {},
    };

    const result = await assignRequestTokenToSupabaseSessionMiddleware(request);

    expect(result).toBeTruthy();
  });
});
