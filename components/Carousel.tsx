"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const cardInfos = [
    {
        front: "https://picsum.photos/id/10/300/300",
        back: "https://picsum.photos/id/20/300/300",
        title: "URL Shortener",
        redirectTo: "https://urlshortener-three-lemon.vercel.app/",
    },
    {
        front: "https://picsum.photos/id/30/300/300",
        back: "https://picsum.photos/id/40/300/300",
        title: "MovieList",
        redirectTo: "https://movie-list-ten-jade.vercel.app/",
    },
    {
        front: "https://picsum.photos/id/50/300/300",
        back: "https://picsum.photos/id/60/300/300",
        title: "Pomofocus Clone",
        redirectTo: "https://pomofocus-clone-sage.vercel.app/",
    },
    {
        front: "https://picsum.photos/id/70/300/300",
        back: "https://picsum.photos/id/80/300/300",
        title: "Project 4",
        redirectTo: "https://www.example.com",
    },
    {
        front: "https://picsum.photos/id/90/300/300",
        back: "https://picsum.photos/id/100/300/300",
        title: "Project 5",
        redirectTo: "https://www.example.com",
    },
    {
        front: "https://picsum.photos/id/110/300/300",
        back: "https://picsum.photos/id/120/300/300",
        title: "Project 6",
        redirectTo: "https://www.example.com",
    },
];

export default function App() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = scrollRef.current;
        if (!slider) return;

        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;

        const cardWidth = 320; // card + gap

        function handleDown(e: MouseEvent) {
            if (!slider) return;
            isDown = true;

            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;

            slider.classList.add("cursor-grabbing", "snap-none");
            slider.classList.remove("snap-x");
        }

        function handleMove(e: MouseEvent) {
            if (!slider || !isDown) return;

            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.4;
            slider.scrollLeft = scrollLeft - walk;
        }

        function handleUp() {
            if (!slider || !isDown) return;

            isDown = false;
            slider.classList.remove("cursor-grabbing");

            // --- Smooth snap to nearest card ---
            const nearestIndex = Math.round(slider.scrollLeft / cardWidth);
            const nearestOffset = nearestIndex * cardWidth;

            slider.scrollTo({
                left: nearestOffset,
                behavior: "smooth",
            });

            // turn snapping back ON after animation finishes. however the css snapping is ignored during js based scrolling tho.
            // i have still put in 320ms for timeout to restore snapping for other devices.
            setTimeout(() => {
                slider.classList.remove("snap-none");
                slider.classList.add("snap-x");
            }, 320);
        }

        function handleLeave() {
            if (isDown) isDown = false;
        }

        slider.addEventListener("mousedown", handleDown);
        slider.addEventListener("mousemove", handleMove);
        slider.addEventListener("mouseup", handleUp);
        slider.addEventListener("mouseleave", handleLeave);

        return () => {
            slider.removeEventListener("mousedown", handleDown);
            slider.removeEventListener("mousemove", handleMove);
            slider.removeEventListener("mouseup", handleUp);
            slider.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    const scroll = (direction: string) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full flex items-center justify-center md:pb-15">
            <div className=" max-w-full">
                {/* Left Button */}
                <button
                    onClick={() => scroll("left")}
                    className="flex items-center justify-center absolute left-0 md:left-[43%] lg:left-[45%] xl:left-[47%] top-1/2 md:top-full -translate-1/2 z-10 rounded-4xl w-10 md:w-15 h-10 md:h-15 cursor-pointer font-[20px] bg-black/70 text-white "
                >
                    <FaAngleLeft className="text-xl md:text-3xl" />
                </button>

                {/* Scrollable Cards */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 xl:gap-9.5 snap-x snap-mandatory overflow-x-scroll"
                >
                    <style>
                        {`
                                div::-webkit-scrollbar {
                                    display: none;
                                }
                            `}
                    </style>
                    {cardInfos.map(
                        ({ front, back, title, redirectTo }, index) => (
                            <Card
                                key={index}
                                front={front}
                                back={back}
                                title={title}
                                redirectTo={redirectTo}
                            />
                        )
                    )}
                </div>

                {/* Right Button */}
                <button
                    onClick={() => scroll("right")}
                    className="flex items-center justify-center absolute left-full md:left-[57%] lg:left-[55%] xl:left-[53%] top-1/2 md:top-full -translate-1/2 z-10 rounded-4xl w-10 md:w-15 h-10 md:h-15 cursor-pointer font-[20px] bg-black/70 text-white "
                >
                    <FaAngleRight className="text-xl md:text-3xl" />
                </button>
            </div>
        </div>
    );
}

function Card({
    front,
    back,
    title,
    redirectTo,
}: {
    front: string;
    back: string;
    title: string;
    redirectTo: string;
}) {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="flex items-center h-[360px] snap-start">
            <div
                className="w-[300px] h-[300px] xl:w-[280px] [perspective:800px]"
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div
                    className={`relative w-full h-full rounded-xl [transform-style:preserve-3d] transition-all duration-1500 ${
                        isFlipped
                            ? "[transform:rotateY(180deg)]"
                            : "[transform:rotateY(0deg)]"
                    }  
                    before:absolute before:content-[''] before:w-full before:h-full before:bg-black/40 before:rounded-xl before:[transform:translateZ(1px)] 
                    after:absolute after:content-[''] after:w-full after:h-full after:bg-black/40 after:rounded-xl after:[transform:translateZ(-2px)]`}
                >
                    <span
                        className="absolute top-1/2 left-1/2 -translate-1/2 text-white text-2xl font-bold text-center pointer-events-none"
                        style={{
                            transform: "translateZ(70px)",
                            textShadow: "0 4px 8px rgba(0,0,0,0.9)",
                        }}
                    >
                        {title}
                    </span>
                    <Image
                        src={front}
                        alt={title}
                        fill
                        className="object-cover rounded-xl"
                    />
                    <Image
                        src={back}
                        alt={title}
                        fill
                        className="object-cover rounded-xl"
                        style={{
                            transform: "translateZ(-1px) rotateY(180deg)",
                        }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-1/2"
                        style={{
                            transform: "translateZ(-70px) rotateY(180deg)",
                        }}
                    >
                        <div className="visitButton relative px-0.5 rounded-xl overflow-hidden group">
                            <button className="relative z-10 bg-[var(--custom-cyan)] text-2xl font-bold text-white px-10 py-2 rounded-xl duration-800 group-hover:bg-transparent cursor-pointer">
                                <Link target="_blank" href={redirectTo}>
                                    VISIT
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
