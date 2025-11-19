"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NavBar() {
    const navRef = useRef<null | HTMLElement>(null);
    const titleRef = useRef<null | HTMLAnchorElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        const title = titleRef.current;
        const trigger = document.getElementById("sticky-trigger");

        if (!trigger || !nav) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    // when nav has reached the top and stuck
                    nav?.classList.add("max-w-full");
                    title?.classList.remove("-left-50");
                    title?.classList.add("delay-300");
                    title?.classList.add("left-5");
                } else {
                    nav?.classList.remove("max-w-full");
                    title?.classList.remove("left-5");
                    title?.classList.remove("delay-300");
                    title?.classList.add("-left-50");
                }
            },
            { threshold: 1 }
        );

        observer.observe(trigger);
        return () => observer.disconnect();
    }, []);

    const links = ["Home", "About", "Skills", "Projects", "Contacts"];

    return (
        <>
            <div id="sticky-trigger" className="h-0"></div>
            <nav ref={navRef} className="nav z-30">
                <Link href="/" id="myName" ref={titleRef} className="navTitle">
                    Arun Karki
                </Link>

                {links.map((link, index) => (
                    <Link href={`#${link}`} className="navLink" key={index}>
                        <span title={link}>{link}</span>
                    </Link>
                ))}
            </nav>
        </>
    );
}
