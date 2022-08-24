import contentful from '../contentful';
import { Entry } from 'contentful';
import { INavigationFields } from '../../@types/generated/contentful';

export async function getNavigation(navigationId: string): Promise<Entry<INavigationFields>> {
  const client = contentful();
  return client.getEntry<INavigationFields>(navigationId);
};