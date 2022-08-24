import contentful from '../contentful';
import { Entry } from 'contentful';
import { IArticleFields } from '../../@types/generated/contentful';

export async function getArticle(articleId: string): Promise<Entry<IArticleFields>> {
  const client = contentful();
  return client.getEntry<IArticleFields>(articleId);
};