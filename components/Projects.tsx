import { roboto } from "@/app/fonts";
import Underline from "./Underline";

export default function Projects() {
    return (
        <section
            id="Projects"
            className="projects relative bg-[url('../public/homepageBg.jpg')] bg-no-repeat bg-cover bg-fixed bg-center h-screen lg:h-[130vh] lg:[clip-path:polygon(0_0,100%_30%,100%_100%,0_100%)] lg:-top-25 lg:-scroll-mt-30"
        >
            <div
                className={
                    roboto.className +
                    " relative flex flex-col gap-5 md:items-center px-5 pt-5 md:pt-20 lg:pt-50 max-w-[1400px] mx-auto z-10"
                }
            >
                <div className="recentProjects relative flex flex-col items-center w-fit self-start md:ml-[5%] xl:ml-[8%]">
                    <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                        Recent Projects
                    </h1>
                    <Underline />
                </div>
            </div>
            <svg
                className="hidden lg:block absolute bottom-0 left-0 w-full h-full pointer-events-none z-10"
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
                    y1="0.2"
                    x2="100"
                    y2="30.2"
                    stroke="rgb(1,247,247)"
                    strokeWidth="0.4"
                    filter="url(#glowFilter)"
                />
            </svg>
        </section>
    );
}
