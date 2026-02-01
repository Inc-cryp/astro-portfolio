import { useEffect, useState, useMemo } from "react";

const commands = [
    { name: "Home", href: "/", keywords: ["home", "main"] },
    { name: "Projects", href: "/projects", keywords: ["projects", "work", "portfolio"] },
    { name: "Blog", href: "/blog", keywords: ["blog", "posts", "articles"] },
    { name: "Contact", href: "/contact", keywords: ["contact", "email", "reach"] },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const filteredCommands = useMemo(() => {
        return commands.filter(
            (cmd) =>
                cmd.name.toLowerCase().includes(query.toLowerCase()) ||
                cmd.keywords.some((kw) => kw.includes(query.toLowerCase()))
        );
    }, [query]);

    const handleSelect = (cmd) => {
        window.location.href = cmd.href;
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === "Enter") {
            if (filteredCommands[selectedIndex]) {
                handleSelect(filteredCommands[selectedIndex]);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Type a command or search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                    />
                </div>
                <div className="max-h-64 overflow-y-auto">
                    {filteredCommands.map((cmd, index) => (
                        <div
                            key={cmd.name}
                            onClick={() => handleSelect(cmd)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${index === selectedIndex ? "bg-blue-100 dark:bg-blue-900" : ""
                                }`}
                        >
                            <div className="font-medium text-gray-900 dark:text-white">{cmd.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{cmd.keywords.join(", ")}</div>
                        </div>
                    ))}
                </div>
                <div className="p-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    Press ⌘K to open, Esc to close, ↑↓ to navigate, Enter to select
                </div>
            </div>
        </div>
    );
}