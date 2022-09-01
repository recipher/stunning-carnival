import { map as mapPromises } from "bluebird";
import { unnest, reverse } from "ramda";
import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type {
  INavigation,
  IArticle,
  ILink,
  IZone,
} from "../../@types/generated/contentful";

import { getCacheByKey, createCache, deleteCache } from "./cache.server";

import { DEFAULT_ZONE } from "./zone.server";
import type { Sys } from "contentful";

type ILinkable = IArticle | ILink | INavigation;
type ILinkables = Array<ILinkable> | undefined;

const idsFor = (links: ILinkables = [], contentType: string): string =>
  links
    .filter((link: ILinkable) => link.sys.contentType.sys.id === contentType)
    .map((link: ILinkable) => link.sys.id)
    .join(",");

const mapSys = (sys: Sys | undefined): any => ({
  id: sys?.id,
  contentType: {
    sys: {
      id: sys?.contentType?.sys.id,
    },
  },
});

const mapZone = (zone: IZone | undefined) => ({
  sys: mapSys(zone?.sys),
  fields: {
    name: zone?.fields?.name,
    title: zone?.fields?.title,
  },
});

const mapEntry = (entry: IArticle) => ({
  sys: mapSys(entry.sys),
  fields: {
    title: entry.fields.title,
    isHidden: entry.fields.isHidden,
    zone: mapZone(entry.fields.zone),
  },
});

const mapLinks = (entry: ILink) => ({
  sys: mapSys(entry.sys),
  fields: { ...entry.fields },
});

const mapArticles = (entry: IArticle) => ({
  sys: mapSys(entry.sys),
  fields: {
    name: entry.fields.name,
    title: entry.fields.title,
    isHidden: entry.fields.isHidden,
    zone: mapZone(entry.fields.zone),
  },
});

const mapNavigations = async (entry: INavigation) => ({
  sys: mapSys(entry.sys),
  fields: {
    name: entry.fields.name,
    isRoot: entry.fields.isRoot,
    isHidden: entry.fields.isHidden,
    links: await populateAllLinks(entry.fields.links),
    zone: mapZone(entry.fields.zone),
    entry: mapEntry(entry.fields.entry as IArticle),
  },
});

const populateNavigationLinks = async (links: ILinkables): Promise<any> =>
  populateLinks(
    links,
    "navigation",
    "fields.zone,fields.links,fields.entry,fields.isHidden,fields.isRoot",
    mapNavigations
  );

const populateLinkLinks = async (links: ILinkables): Promise<any> =>
  populateLinks(links, "link", "fields.title,fields.url", mapLinks);

const populateArticleLinks = async (links: ILinkables): Promise<any> =>
  populateLinks(links, "article", "fields.title,fields.isHidden,fields.zone", mapArticles);

const populateLinks = async (
  links: ILinkables,
  contentType: string,
  select: string,
  mapLinks: Function
): Promise<any> => {
  if (links === undefined) return links;

  const entries = await contentful().getEntries<INavigation>({
    content_type: contentType,
    select: `sys.id,sys.contentType,fields.name,${select}`,
    "sys.id[in]": idsFor(links, contentType),
  });

  return mapPromises(resolve(entries), async (entry: any) => mapLinks(entry));
};

const populateAllLinks = async (links: ILinkables): Promise<any> => {
  if (links === undefined) return links;

  const n = await populateNavigationLinks(links);
  const l = await populateLinkLinks(links);
  const a = await populateArticleLinks(links);

  return reverse(unnest([l, a, n]));
};

const populate = async (navigation: Array<INavigation>): Promise<any> => {
  return mapPromises(navigation, async (entry: any) => ({
    sys: mapSys(entry.sys),
    fields: {
      name: entry.fields.name,
      links: await populateAllLinks(entry.fields.links),
      zone: mapZone(entry.fields.zone),
    },
  }));
};

export async function getNavigation(
  zoneId: string | undefined
): Promise<INavigation> {
  const key = zoneId || DEFAULT_ZONE;
  const data = await getCacheByKey(key);
  if (data) return JSON.parse(data);

  let query: any = {
    content_type: "navigation",
    limit: 1,
    select: "sys.id,sys.contentType,fields.name,fields.links,fields.zone,fields.isHidden,fields.isRoot",
  };

  query =
    zoneId === undefined
      ? { ...query, "fields.zone.fields.name": DEFAULT_ZONE }
      : { ...query, "fields.zone.sys.id": zoneId };

  const entries = await contentful().getEntries<INavigation>(query);
  const [entry] = await populate(resolve(entries));

  await createCache(key, JSON.stringify(entry));

  return entry;
}

export async function refreshNavigation(zoneId: string): Promise<INavigation> {
  await deleteCache(zoneId);
  return getNavigation(zoneId);
}
