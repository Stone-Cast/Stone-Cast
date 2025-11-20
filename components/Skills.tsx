import { roboto } from "@/app/fonts";
import Underline from "./Underline";
import SkillBall from "./SkillBall";

export default function Skills() {
    return (
        <section
            id="Skills"
            className={
                roboto.className +
                " relative h-screen flex flex-col gap-5 md:items-center px-5 pt-5 pb-10 md:py-20 bg-black mx-auto md:[clip-path:polygon(0_0,100%_0,100%_100%,0_60%)]"
            }
        >
            <div className="flex flex-col items-center w-fit">
                <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                    My Skills
                </h1>
                <Underline />
            </div>
            <div className="flex flex-col lg:flex-row-reverse max-md:gap-y-3 w-full text-white/80 z-10 grow">
                <div className="xl:w-1/2 max-md:h-[400px] grow">
                    <SkillBall />
                </div>
                <div className="text-xl xl:w-1/2 items-center justify-between md:py-10 md:px-15">
                    <p>
                        I work with a modern full-stack toolkit, using React,
                        Next.js, Tailwind CSS, and TypeScript on the frontend,
                        and technologies like Node.js, Express, MongoDB, and
                        PostgreSQL on the backend. I enjoy creating responsive,
                        polished user interfaces while also building reliable
                        APIs and database structures that keep applications
                        scalable and efficient.
                    </p>
                </div>
            </div>
            {/* <div className="absolute bottom-0 bg-red-800 h-2 w-full rotate-15 origin-right"></div> */}
        </section>
    );
}
