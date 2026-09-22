import type { Project } from "../lib/types/content";

// Fallback content used when PUBLIC_STRAPI_URL is unset, so the site builds
// and deploys with no CMS attached. Slugs here are the routes that
// src/pages/projects/[slug].astro pre-renders.
export const projects: Project[] = [
    {
        id: 1,
        title: "go-dispatch",
        slug: "go-dispatch",
        summary:
            "Job dispatch engine in Go with a priority queue, worker pool, rate limiting and an event bus. Standard library only, no go.sum.",
        tech: ["Go", "Concurrency", "Docker"],
        repo: "https://github.com/Inc-cryp/go-dispatch",
        challenges: [
            "Losing in-flight jobs when the process received SIGTERM",
            "A queue that could panic by sending on a closed channel",
            "Token bucket Reserve() returning a zero duration for sub-nanosecond waits",
        ],
        outcome: [
            "Graceful drain: 1286/1286 jobs processed on shutdown, 0 lost",
            "Race-free queue with 89% test coverage, verified with -race",
        ],
    },
    {
        id: 2,
        title: "go-k8s-app",
        slug: "go-k8s-app",
        summary:
            "Containerised Go HTTP service deployed to Kubernetes, with health and version endpoints, environment-based config and graceful shutdown.",
        tech: ["Go", "Docker", "Kubernetes", "GitHub Actions"],
        repo: "https://github.com/Inc-cryp/go-k8s-app",
        challenges: [
            "The build failed outright: the Dockerfile built ./cmd/server, which did not exist",
            "A .gitignore entry of `server` silently excluded the cmd/server directory",
            "The Kubernetes manifest referenced an image name Docker could never resolve",
        ],
        outcome: [
            "Static 5.6 MB image built from a non-root Alpine runtime",
            "Multi-stage build, CI on every push, 100% coverage on internal packages",
        ],
    },
    {
        id: 3,
        title: "simple-ewallet",
        slug: "simple-ewallet",
        summary:
            "Digital wallet REST API in Go using a layered architecture: handlers, use cases and MySQL/Redis persistence.",
        tech: ["Go", "MySQL", "Redis", "Docker"],
        repo: "https://github.com/Inc-cryp/simple-ewallet",
        challenges: [
            "Separating transport, business logic and persistence concerns",
            "Keeping wallet balances consistent under concurrent transfers",
        ],
        outcome: [
            "Clean layering that keeps HTTP concerns out of the domain",
            "Redis-backed caching for hot reads",
        ],
    },
    {
        id: 4,
        title: "go-rest-grpc-microservices",
        slug: "go-rest-grpc-microservices",
        summary:
            "Microservice pair exposing both REST and gRPC transports, with a shared Docker Compose environment.",
        tech: ["Go", "gRPC", "REST", "Docker Compose"],
        repo: "https://github.com/Inc-cryp/go-rest-grpc-microservices",
        challenges: [
            "Serving one domain model over two transports without duplicating logic",
            "Wiring service discovery between the HTTP and gRPC processes",
        ],
        outcome: [
            "One use-case layer behind both a REST handler and a gRPC service",
            "Single `docker compose up` brings the whole system up",
        ],
    },
    {
        id: 5,
        title: "astro-portfolio",
        slug: "astro-portfolio",
        summary:
            "This site: a fast, statically rendered portfolio and blog built with Astro, React islands and Tailwind CSS.",
        tech: ["Astro", "React", "Tailwind CSS", "TypeScript"],
        repo: "https://github.com/Inc-cryp/astro-portfolio",
        challenges: [
            "Every page is pre-rendered, so an unreachable CMS broke the build",
            "Keeping navigation links and generated routes from drifting apart",
        ],
        outcome: [
            "Content layer that reads Strapi when configured and local data otherwise",
            "Blog and project links are derived from the same source as the routes",
        ],
    },
];
