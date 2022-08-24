import { createClient, Entry } from 'contentful';
import { IArticleFields } from '../../@types/generated/contentful';

export async function getEntry(entryId: string): Promise<Entry<IArticleFields>> {
  const accessToken = process.env.CONTENTFUL_API_KEY as string;
  const space = process.env.CONTENTFUL_SPACE_ID as string;
  const environment = process.env.CONTENTFUL_ENV as string;
  const client = createClient({ accessToken, space, environment });
  return client.getEntry<IArticleFields>(entryId);
};