import contentful from '../contentful';
import resolve from 'contentful-resolve-response';
import type { Entry } from 'contentful';
import type { INavigationFields } from '../../@types/generated/contentful';

export async function getNavigation(navigationId: string): Promise<Entry<INavigationFields>> {
  const client = contentful();
  const entry = await client.getEntry<INavigationFields>(navigationId, { include: 10 });
  return resolve(entry);
};