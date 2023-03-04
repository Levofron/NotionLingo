import { Client } from '@notionhq/client';

export const createNotionClient = (token: string) => new Client({ auth: token });
