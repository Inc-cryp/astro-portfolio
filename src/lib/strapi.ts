import type { ProjectAttributes, StrapiResponse } from "./types/project"


const API_URL = import.meta.env.PUBLIC_STRAPI_URL;

export async function getPosts() {
    const res = await fetch(
        `${API_URL}/posts?populate=cover,category&sort=publishedAt:desc`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }

    return res.json();
}

export async function getPostBySlug(slug: string) {
    const res = await fetch(
        `${API_URL}/posts?filters[slug][$eq]=${slug}&populate=cover,category`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch post");
    }

    return res.json();
}

export async function getProjects(): Promise<StrapiResponse<ProjectAttributes>> {
    const res = await fetch(
        `${API_URL}/projects?sort=publishedAt:desc`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch projects");
    }

    return res.json();
}

import type { Project } from "@/lib/types/project";


export async function getProjectBySlug(
    slug: string
): Promise<Project | null> {
    const res = await fetch(
        `${API_URL}/projects?filters[slug][$eq]=${slug}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch project");
    }

    const json = await res.json();

    if (!json.data.length) return null;

    const p = json.data[0];

    return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        summary: p.summary,
        tech: p.tech,
        repo: p.repo,
    };
}
