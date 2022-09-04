import { map as mapPromises } from "bluebird";
import { unnest } from "ramda";
import contentful from "../contentful";
import resolve from "contentful-resolve-response";
import type {
  INavigation,
  IArticle,
  ILink as IExternalLink,
  IZone,
  ITeam,
} from "../../@types/generated/contentful";

import { getCacheByKey, createCache, deleteCache } from "./cache.server";

import { DEFAULT_ZONE } from "./zone.server";
import type { Sys } from "contentful";

type ILink = IArticle | ITeam | IExternalLink | INavigation;
type ILinks = Array<ILink> | undefined;

const idsFor = (links: ILinks = [], contentType: string): string =>
  links
    .filter((link: ILink) => link.sys.contentType?.sys.id === contentType)
    .map((link: ILink) => link.sys.id)
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
    zone: mapZone(entry.fields.zone),
  },
});

const mapExternalLinks = (entry: IExternalLink) => ({
  sys: mapSys(entry.sys),
  fields: { ...entry.fields },
});

const mapArticles = (entry: IArticle) => ({
  sys: mapSys(entry.sys),
  fields: {
    name: entry.fields.name,
    title: entry.fields.title,
    zone: mapZone(entry.fields.zone),
  },
});

const mapTeams = (entry: ITeam) => ({
  sys: mapSys(entry.sys),
  fields: {
    name: entry.fields.name,
    title: entry.fields.title,
    zone: mapZone(entry.fields.zone),
  },
});

const mapNavigations = async (entry: INavigation) => ({
  sys: mapSys(entry.sys),
  fields: {
    name: entry.fields.name,
    isRoot: entry.fields.isRoot,
    links: await populateAllLinks(entry.fields.links),
    zone: mapZone(entry.fields.zone),
    entry: entry.fields.entry
      ? mapEntry(entry.fields.entry as IArticle)
      : undefined,
  },
});

const populateNavigationLinks = async (links: ILinks): Promise<any> =>
  populateLinks(
    links,
    "navigation",
    "fields.zone,fields.links,fields.entry,fields.isRoot",
    mapNavigations
  );

const populateExternalLinks = async (links: ILinks): Promise<any> =>
  populateLinks(links, "link", "fields.title,fields.url", mapExternalLinks);

const populateArticleLinks = async (links: ILinks): Promise<any> =>
  populateLinks(links, "article", "fields.title,fields.zone", mapArticles);

const populateTeamLinks = async (links: ILinks): Promise<any> =>
  populateLinks(links, "team", "fields.title,fields.zone", mapTeams);

const populateLinks = async (
  links: ILinks,
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

  const resolved = resolve(entries).filter((entry: any) => entry !== undefined);
  return mapPromises(resolved, async (entry: any) => mapLinks(entry));
};

const populateAllLinks = async (links: ILinks): Promise<any> => {
  if (links === undefined) return links;
  links = links.filter((link: any) => link !== undefined);

  const ids: Array<any> = links.map((link) => link.sys.id);

  const n = await populateNavigationLinks(links);
  const l = await populateExternalLinks(links);
  const a = await populateArticleLinks(links);
  const t = await populateTeamLinks(links);

  const populated = unnest([l, a, t, n]);

  const find = (id: string) => populated.find((link) => link.sys.id === id);

  return ids.map((id) => ({ ...find(id) }));
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
    include: 1,
    select:
      "sys.id,sys.contentType,fields.name,fields.links,fields.zone,fields.isRoot",
  };

  query =
    zoneId === undefined
      ? {
          ...query,
          "fields.zone.fields.name": DEFAULT_ZONE,
          "fields.isRoot": true,
        }
      : { ...query, "fields.zone.sys.id": zoneId, "fields.isRoot": true };

  const entries = await contentful().getEntries<INavigation>(query);
  const [entry] = await populate(resolve(entries));

  await createCache(key, JSON.stringify(entry));

  return entry;
}

export async function refreshNavigation(zoneId: string): Promise<INavigation> {
  await deleteCache(zoneId);
  return getNavigation(zoneId);
}
