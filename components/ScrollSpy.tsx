"use client";

import { useEffect } from "react";
import { links } from "./NavBar";

const SECTIONS = links;

export default function ScrollSpy() {
    useEffect(() => {
        // Ensure DOM is hydrated
        if (typeof window === "undefined") return;

        const timeout = setTimeout(() => {
            const sectionElements = SECTIONS.map((id) =>
                document.getElementById(id)
            ).filter(Boolean) as HTMLElement[];

            const navLinks = Array.from(
                document.querySelectorAll("a[data-section]")
            );

            if (!sectionElements.length || !navLinks.length) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const visibleId = entry.target.id;

                        navLinks.forEach((link) => {
                            const el = link as HTMLElement; // or HTMLAnchorElement
                            el.classList.toggle(
                                "activeNav",
                                el.dataset.section === visibleId
                            );
                        });
                    });
                },
                { threshold: 0.8 }
            );

            sectionElements.forEach((section) => observer.observe(section));

            return () => observer.disconnect();
        }, 50); // wait for hydration

        return () => clearTimeout(timeout);
    }, []);

    return null;
}
