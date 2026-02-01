import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // Load initial theme from localStorage or system preference
        const stored = localStorage.getItem("theme");
        let initialDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (stored) {
            initialDark = stored === "dark";
        }
        setDark(initialDark);
        document.documentElement.classList.toggle("dark", initialDark);
    }, []);

    const handleToggle = () => {
        const newDark = !dark;
        setDark(newDark);
        document.documentElement.classList.toggle("dark", newDark);
        localStorage.setItem("theme", newDark ? "dark" : "light");
    };

    return (
        <button
            onClick={handleToggle}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
    );
}
