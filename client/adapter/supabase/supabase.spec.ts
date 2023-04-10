import { supabaseModule } from './supabase.module';

describe('restModule object', () => {
  it('should return proper object', () => {
    expect(supabaseModule).toEqual({
      logout: expect.any(Function),
      getUser: expect.any(Function),
      getSession: expect.any(Function),
      loginViaMagicLink: expect.any(Function),
      onAuthStateChange: expect.any(Function),
    });
  });
});
