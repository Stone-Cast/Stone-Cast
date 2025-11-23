import { roboto } from "@/app/fonts";
import Underline from "./Underline";
import AnimatedProfileImage from "@/components/AnimatedProfileImage";

export default function AboutPage() {
    return (
        <section id="About">
            <div
                className={
                    roboto.className +
                    " flex flex-col gap-5 md:items-center px-5 pt-5 pb-10 md:py-20 max-w-[1400px] mx-auto"
                }
            >
                <div className="flex flex-col items-center w-fit">
                    <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                        About Me
                    </h1>
                    <Underline />
                </div>
                <div className="flex flex-col lg:flex-row w-full justify-around text-white/80">
                    <AnimatedProfileImage />

                    <div className="lg:w-1/2 text-lg md:text-xl p-5 md:px-10 lg:px-15 lg:py-10 xl:px-25 xl:py-10 xl:text-2xl">
                        Hi. I am Arun Karki. <br />
                        <br />
                        Hailing from the charming town of Kathmandu, I bring a
                        unique blend of creativity and technical expertise to
                        the table. With a passion for designing and developing
                        dynamic and user-friendly websites, I strive to deliver
                        solutions that are both visually appealing and highly
                        functional.
                        <br />
                        <br />
                        Want to learn more about my skills, experience and what
                        I can bring to your projects? Feel free to download my
                        resume below.
                    </div>
                </div>
            </div>
        </section>
    );
}
