import { rc_light, roboto } from "@/app/fonts";
import Underline from "./Underline";
import AnimatedProfileImage from "@/components/AnimatedProfileImage";
import Link from "next/link";

export default function AboutPage() {
    return (
        <section id="About" className="sectionEndLine relative overflow-x-clip">
            <div
                className={
                    roboto.className +
                    " flex flex-col gap-5 md:items-center px-5 pt-5 pb-10 md:py-20 max-w-[1400px] mx-auto "
                }
            >
                <div className="flex flex-col items-center w-fit">
                    <h1
                        className={
                            rc_light.className +
                            " text-2xl md:text-4xl text-[var(--custom-cyan)]"
                        }
                    >
                        About Me
                    </h1>
                    <Underline />
                </div>
                <div className="flex flex-col lg:flex-row justify-around text-white/80">
                    <AnimatedProfileImage />

                    <div className="flex flex-col gap-12 items-center lg:w-1/2 info">
                        <div>
                            Hi. I am Arun Karki. <br />
                            <br />
                            Hailing from the charming town of Kathmandu, I bring
                            a unique blend of creativity and technical expertise
                            to the table. With a passion for designing and
                            developing dynamic and user-friendly websites, I
                            strive to deliver solutions that are both visually
                            appealing and highly functional.
                            <br />
                            <br />
                            Want to learn more about my skills, experience and
                            what I can bring to your projects? Feel free to
                            download my resume below.
                        </div>

                        <div className="relative p-1 overflow-hidden">
                            <div className="absolute inset-0 z-0 animate-[spin_4s_linear_infinite]">
                                <div className="absolute top-1/2 right-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[linear-gradient(180deg,var(--custom-cyan),transparent_90%)]"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[linear-gradient(0deg,var(--custom-cyan),transparent_90%)]"></div>
                            </div>
                            <Link
                                href={""}
                                className="relative z-10 block bg-[var(--custom-grey)] p-3 md:p-5"
                            >
                                Download CV
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <svg
                className="hidden lg:block absolute bottom-0 left-0 w-full h-full pointer-events-none"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
            >
                <defs>
                    <filter
                        id="glowFilter"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="0.9"
                            result="blur1"
                        />
                        <feMerge>
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <line
                    x1="0"
                    y1="99"
                    x2="100"
                    y2="74"
                    stroke="rgb(1,247,247)"
                    strokeWidth="0.4"
                    filter="url(#glowFilter)"
                />
            </svg>
        </section>
    );
}
