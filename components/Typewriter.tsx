"use client";

import { useState, useEffect } from "react";

export default function Typewriter() {
    const words = ["DEVELOPER", "DESIGNER", "FREELANCER"];

    const [index, setIndex] = useState(0); // which word
    const [subIndex, setSubIndex] = useState(0); // which character
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];

        // End of word → pause → start deleting
        if (!deleting && subIndex === currentWord.length) {
            const timeout = setTimeout(() => setDeleting(true), 1000);
            return () => clearTimeout(timeout);
        }

        // Word deleted → move to next
        if (deleting && subIndex === 0) {
            setDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(
            () => {
                setSubIndex((prev) => prev + (deleting ? -1 : 1));
            },
            deleting ? 50 : 120
        );

        return () => clearTimeout(timeout);
    }, [subIndex, deleting, index]);

    return (
        <span className="text-[var(--custom-cyan)]">
            {words[index].substring(0, subIndex)}
        </span>
    );
}
