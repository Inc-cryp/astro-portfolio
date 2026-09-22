// Content source for the site.
//
// When PUBLIC_STRAPI_URL is set, content is read from Strapi. When it is
// empty or unset, the local files in src/data are used instead, so `npm run
// build` succeeds on a clean clone with no CMS running and with no .env.
// That matters because `astro build` pre-renders every page: a hard Strapi
// dependency makes the build fail outright when the CMS is unreachable.

import type {
    Category,
    Cover,
    Post,
    PostAttributes,
    Project,
    ProjectAttributes,
    StrapiEntity,
    StrapiResponse,
} from "./types/content";

import { posts as localPosts } from "../data/posts";
import { projects as localProjects } from "../data/projects";

const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

/** True when the site is configured to read from Strapi. */
export const usesStrapi = Boolean(API_URL);

// Cache per build: a single `astro build` renders many pages and must not
// re-fetch the same collection once per page.
const cache = new Map<string, Promise<unknown>>();

function fetchOnce<T>(path: string): Promise<T> {
    let pending = cache.get(path) as Promise<T> | undefined;

    if (!pending) {
        pending = (async () => {
            const res = await fetch(`${API_URL}${path}`);

            if (!res.ok) {
                throw new Error(
                    `Strapi request failed: GET ${path} -> ${res.status}`
                );
            }

            return res.json() as Promise<T>;
        })();

        cache.set(path, pending);
    }

    return pending;
}

function normaliseProject(
    entry: StrapiEntity<ProjectAttributes>
): Project {
    const a = entry.attributes;

    return {
        id: entry.id,
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        tech: a.tech ?? [],
        repo: a.repo,
        challenges: a.challenges ?? [],
        outcome: a.outcome ?? [],
    };
}

function normalisePost(
    entry: StrapiEntity<PostAttributes>
): Post {
    const a = entry.attributes;

    return {
        id: entry.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        date: a.date,
        body: a.body,
        category: (a.category as Category | null) ?? null,
        cover: (a.cover as Cover | null) ?? null,
    };
}

export async function getProjects(): Promise<Project[]> {
    if (!usesStrapi) {
        return localProjects;
    }

    const json = await fetchOnce<StrapiResponse<ProjectAttributes>>(
        "/projects?sort=publishedAt:desc"
    );

    return (json.data ?? []).map(normaliseProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    if (!usesStrapi) {
        return localProjects.find((p) => p.slug === slug) ?? null;
    }

    const json = await fetchOnce<StrapiResponse<ProjectAttributes>>(
        `/projects?filters[slug][$eq]=${encodeURIComponent(slug)}`
    );

    const entry = json.data?.[0];

    return entry ? normaliseProject(entry) : null;
}

export async function getPosts(): Promise<Post[]> {
    if (!usesStrapi) {
        return localPosts;
    }

    const json = await fetchOnce<StrapiResponse<PostAttributes>>(
        "/posts?populate=cover,category&sort=publishedAt:desc"
    );

    return (json.data ?? []).map(normalisePost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!usesStrapi) {
        return localPosts.find((p) => p.slug === slug) ?? null;
    }

    const json = await fetchOnce<StrapiResponse<PostAttributes>>(
        `/posts?filters[slug][$eq]=${encodeURIComponent(
            slug
        )}&populate=cover,category`
    );

    const entry = json.data?.[0];

    return entry ? normalisePost(entry) : null;
}
