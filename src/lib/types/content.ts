// Types for the content layer.
//
// The same shapes are used whether the data comes from Strapi (when
// PUBLIC_STRAPI_URL is set) or from the local files in src/data, so pages
// never have to care which source is active.

export interface Cover {
    url: string;
    alternativeText?: string | null;
}

export interface Category {
    name: string;
}

/** A blog post, normalised out of Strapi's attributes envelope. */
export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    body?: string;
    category?: Category | null;
    cover?: Cover | null;
}

/** A portfolio project. */
export interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    tech: string[];
    repo: string;
    challenges: string[];
    outcome: string[];
}

/** Strapi v4 wraps every entity in { id, attributes }. */
export interface StrapiEntity<T> {
    id: number;
    attributes: T;
}

/** Shape of a Strapi v4 list response. */
export interface StrapiResponse<T> {
    data: StrapiEntity<T>[];
}

/** Raw Strapi post attributes, before normalisation. */
export interface PostAttributes {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    body?: string;
    category?: Category | null;
    cover?: Cover | null;
}

/** Raw Strapi project attributes, before normalisation. */
export interface ProjectAttributes {
    title: string;
    slug: string;
    summary: string;
    tech: string[];
    repo: string;
    challenges: string[];
    outcome: string[];
}
