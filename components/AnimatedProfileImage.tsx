"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AnimatedProfileImage() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [frameWidth, setFrameWidth] = useState<number>(300);

    useEffect(() => {
        const updateFrameWidth = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setFrameWidth(250);
            } else if (width < 1024) {
                setFrameWidth(300);
            } else {
                setFrameWidth(325);
            }
        };

        // Set initial width
        updateFrameWidth();

        window.addEventListener("resize", updateFrameWidth);

        return () => window.removeEventListener("resize", updateFrameWidth);
    }, []);

    return (
        <div
            className="lg:w-1/2 flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="relative w-fit h-fit ml-[15%] md:ml-[30%] lg:ml-[10%] xl:mx-auto">
                <Image
                    src={"/picFrame.jpg"}
                    width={frameWidth}
                    height={frameWidth}
                    alt="picture frame"
                    className={`transition-all duration-700 md:pointer-events-none ${
                        isExpanded ? "rotate-[0deg]" : "rotate-[20deg]"
                    }`}
                />
                <div
                    className={`absolute transition-all duration-700 perspective-[600px] md:pointer-events-none ${
                        isExpanded
                            ? "h-[80%] w-[83%] top-[10%] left-[8.5%] scale-100"
                            : "top-[15%] left-[40%] md:left-[55%] xl:left-[70%] h-[83%] md:h-[90%] w-[70%] md:w-[80%] scale-130"
                    }`}
                >
                    <Image
                        src={"/proPic.jpg"}
                        alt="profile picture"
                        fill
                        className={`object-cover md:pointer-events-none transition-all duration-700 ${
                            isExpanded
                                ? "rotate-y-0 shadow-none"
                                : "-rotate-y-22 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.9)]"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
}
