"use client";

import { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import Link from "next/link";

export const links = ["Home", "About", "Skills", "Projects", "Contacts"];

export default function NavBar() {
    const navRef = useRef<null | HTMLElement>(null);
    const titleRef = useRef<null | HTMLAnchorElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(true);
    const [isClient, setIsClient] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Detect mobile + run sticky observer
    useEffect(() => {
        setIsClient(true);
        setIsMobile(window.innerWidth < 768);

        const nav = navRef.current;
        const title = titleRef.current;
        const trigger = document.getElementById("sticky-trigger");

        if (!trigger || !nav || !title) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    nav.classList.add("max-w-full");
                    title.classList.remove("-left-50");
                    title.classList.add("delay-300", "left-5");
                    setIsSticky(true);
                } else {
                    nav.classList.remove("max-w-full");
                    title.classList.remove("left-5", "delay-300");
                    title.classList.add("-left-50");
                    setIsSticky(false);
                }
            },
            { threshold: 1 }
        );

        observer.observe(trigger);

        function handleResize() {
            setIsMobile(window.innerWidth < 768);

            if (nav && nav?.getBoundingClientRect().top <= 0) {
                title?.classList.remove("-left-50");
                title?.classList.add("left-5", "delay-300");
            } else {
                title?.classList.add("-left-50");
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
        };
    }, [isMobile]);

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
                <Link
                    href="/"
                    id="myName"
                    ref={titleRef}
                    className={`navTitle -left-50 ${
                        !isClient ? "opacity-0" : ""
                    } ${isMobile ? "hidden" : ""}`}
                >
                    Arun Karki
                </Link>

                {/* Mobile Burger */}
                {isClient && isMobile && !menuOpen && (
                    <button
                        className="fixed top-3 right-3 z-40"
                        onClick={() => setMenuOpen(true)}
                    >
                        <IoMdMenu className="text-3xl" />
                    </button>
                )}

                {/* Desktop nav links */}
                {isClient && !isMobile && (
                    <>
                        {links.map((link, index) => (
                            <Link
                                href={`#${link}`}
                                className="navLink"
                                key={index}
                                data-section={link}
                            >
                                <span title={link}>{link}</span>
                            </Link>
                        ))}
                    </>
                )}
            </nav>

            {/* MOBILE SLIDE-IN MENU */}
            {isClient && isMobile && (
                <>
                    {menuOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            onClick={() => setMenuOpen(false)}
                        ></div>
                    )}
                    <div
                        className={`fixed top-0 right-0 h-full w-64 bg-black text-white 
                        z-50 shadow-xl transform
                        transition-transform duration-300 
                        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <button
                            className="absolute top-4 right-4 text-3xl"
                            onClick={() => setMenuOpen(false)}
                        >
                            <IoMdClose />
                        </button>

                        <Link
                            href="/"
                            className="text-xl font-semibold px-6 py-10 block"
                            onClick={() => setMenuOpen(false)}
                        >
                            Arun Karki
                        </Link>

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
