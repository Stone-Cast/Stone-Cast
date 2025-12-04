import { roboto } from "@/app/fonts";
import Underline from "./Underline";
import SkillBall from "./SkillBall";

export default function Skills() {
    return (
        <section
            id="Skills"
            className="sectionEndLine relative overflow-x-clip"
        >
            <div
                className={
                    roboto.className +
                    " flex flex-col gap-5 md:items-center px-5 pt-5 md:pt-20 max-w-[1400px] mx-auto"
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
        </section>
    );
}
