export const projects = [
    {
        slug: "payment-service",
        title: "Payment Service API",
        summary: "Reliable payment API with idempotency and retry mechanism.",
        tech: ["Go", "PostgreSQL", "Redis", "Docker"],
        challenges: [
            "Race condition on concurrent requests",
            "Handling webhook retries safely",
        ],
        outcome: [
            "99% reduction in duplicate transactions",
            "Improved payment reliability",
        ],
        repo: "https://github.com/username/payment-service",
    },
];