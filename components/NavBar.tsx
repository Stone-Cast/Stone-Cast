"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";

export default function NavBar() {
    const navRef = useRef<null | HTMLElement>(null);
    const titleRef = useRef<null | HTMLAnchorElement>(null);

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const links = ["Home", "About", "Skills", "Projects", "Contacts"];

    // Detect mobile + run sticky observer
    useEffect(() => {
        const nav = navRef.current;
        const title = titleRef.current;
        const trigger = document.getElementById("sticky-trigger");

        window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);

        if (!trigger || !nav) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    nav.classList.add("max-w-full");
                    title?.classList.remove("-left-50");
                    title?.classList.add("delay-300");
                    title?.classList.add("left-5");
                } else {
                    nav.classList.remove("max-w-full");
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

    // Recalculate on resize
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 768);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Disable scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen && isMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [menuOpen, isMobile]);

    return (
        <>
            {/* Sticky observer trigger */}
            <div id="sticky-trigger" className="h-0"></div>

            {/* Main NAV */}
            <nav ref={navRef} className="nav z-30">
                {!isMobile && (
                    <Link
                        href="/"
                        id="myName"
                        ref={titleRef}
                        className="navTitle"
                    >
                        Arun Karki
                    </Link>
                )}

                {/* Mobile Burger */}
                {isMobile && !menuOpen && (
                    <button
                        className="fixed top-3 right-3 z-40"
                        onClick={() => setMenuOpen(true)}
                    >
                        <IoMdMenu className="text-3xl" />
                    </button>
                )}

                {/* Desktop nav links */}
                {!isMobile && (
                    <>
                        {links.map((link, index) => (
                            <Link
                                href={`#${link}`}
                                className="navLink"
                                key={index}
                            >
                                <span title={link}>{link}</span>
                            </Link>
                        ))}
                    </>
                )}
            </nav>

            {/* MOBILE SLIDE-IN MENU */}
            {isMobile && (
                <>
                    {/* BACKDROP */}
                    {menuOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={() => setMenuOpen(false)}
                        ></div>
                    )}
                    <div
                        className={`
                        fixed top-0 right-0 h-full w-64 bg-black text-white 
                        z-50 shadow-xl transform
                        transition-transform duration-300 
                        ${menuOpen ? "translate-x-0" : "translate-x-full"}
                    `}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-3xl"
                            onClick={() => setMenuOpen(false)}
                        >
                            <IoMdClose />
                        </button>

                        {/* Title */}
                        <Link
                            href="/"
                            className="text-xl font-semibold px-6 py-10 block"
                            onClick={() => setMenuOpen(false)}
                        >
                            Arun Karki
                        </Link>

                        {/* Mobile Links */}
                        <div className="flex flex-col gap-6 px-6 text-lg">
                            {links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={`#${link}`}
                                    className="hover:text-gray-300"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
