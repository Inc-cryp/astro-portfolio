// src/lib/types/strapi.ts

export interface ProjectAttributes {
  id: number;
  title: string;
  slug: string;
  summary: string;
  tech: string[];
  repo: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Entity Strapi (data yang dipakai UI)
export interface Project {
  id: number
  title: string
  slug: string
  summary: string
  tech: string[]
  repo: string
  challenges: string[]
  outcome: string[]
}

export interface StrapiResponse<T> {
  data: T[];
}
