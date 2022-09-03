// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import type { Asset, Entry } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export interface IArticleFields {
  /** Name */
  name: string;

  /** Title */
  title: string;

  /** Zone */
  zone?: IZone | undefined;

  /** Contents */
  contents?: Document | undefined;

  /** isHidden */
  isHidden?: boolean | undefined;
}

export interface IArticle extends Entry<IArticleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "article";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ILinkFields {
  /** Name */
  name: string;

  /** Url */
  url: string;

  /** Title */
  title: string;
}

export interface ILink extends Entry<ILinkFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "link";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface INavigationFields {
  /** Name */
  name: string;

  /** Entry */
  entry?: IArticle | ILink | undefined;

  /** Zone */
  zone?: IZone | undefined;

  /** Links */
  links?: (IArticle | ILink | INavigation | ITeam)[] | undefined;

  /** IsRoot */
  isRoot?: boolean | undefined;

  /** isHidden */
  isHidden?: boolean | undefined;
}

export interface INavigation extends Entry<INavigationFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "navigation";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPersonFields {
  /** Name */
  name: string;

  /** Photo */
  photo?: Asset | undefined;

  /** Bio */
  bio?: string | undefined;

  /** LinkedIn */
  linkedIn?: string | undefined;
}

export interface IPerson extends Entry<IPersonFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "person";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPositionFields {
  /** Name */
  name: string;

  /** Person */
  person?: IPerson | undefined;

  /** Reports */
  reports?: IPosition[] | undefined;
}

export interface IPosition extends Entry<IPositionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "position";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITeamFields {
  /** Name */
  name: string;

  /** Positions */
  positions?: IPosition[] | undefined;

  /** Zone */
  zone?: IZone | undefined;

  /** Title */
  title?: string | undefined;
}

export interface ITeam extends Entry<ITeamFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "team";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IZoneFields {
  /** Name */
  name: string;

  /** Title */
  title?: string | undefined;
}

export interface IZone extends Entry<IZoneFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "zone";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "article"
  | "link"
  | "navigation"
  | "person"
  | "position"
  | "team"
  | "zone";

export type LOCALE_CODE = "en-US" | "es";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
