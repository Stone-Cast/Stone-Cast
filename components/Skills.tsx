import { roboto } from "@/app/fonts";
import Underline from "./Underline";
import SkillBall from "./SkillBall";

export default function Skills() {
    return (
        <section
            id="Skills"
            className="relative sectionEndLine overflow-x-clip md:[clip-path:polygon(0_0,100%_0,100%_100%,0_75%)] pt-5 md:py-20 bg-[var(--custom-grey)] z-20 "
        >
            <div
                className={
                    roboto.className +
                    " flex flex-col gap-5 md:items-center px-5 max-w-[1400px] mx-auto"
                }
            >
                <div className="flex flex-col items-center w-fit">
                    <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                        My Skills
                    </h1>
                    <Underline />
                </div>
                <div className="flex flex-col md:flex-row-reverse w-full justify-around items-stretch text-white/80 gap-5">
                    <div className="md:w-1/2 h-[50vh] min-h-[400px] md:h-[70vh] md:min-h-[600px]">
                        <SkillBall />
                    </div>

                    <div className="skillsInfo md:w-1/2 flex items-center">
                        <p>
                            I work with a modern full-stack toolkit, using
                            React, Next.js, Tailwind CSS, and TypeScript on the
                            frontend, and technologies like Node.js, Express,
                            MongoDB, and PostgreSQL on the backend. I enjoy
                            creating responsive, polished user interfaces while
                            also building reliable APIs and database structures
                            that keep applications scalable and efficient.
                        </p>
                    </div>
                </div>
            </div>
            <svg
                className="hidden md:block absolute bottom-0 left-0 w-full h-full pointer-events-none z-10"
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
                    y1="75"
                    x2="100"
                    y2="100"
                    stroke="rgb(1,247,247)"
                    strokeWidth="0.4"
                    filter="url(#glowFilter)"
                />
            </svg>
        </section>
    );
}
