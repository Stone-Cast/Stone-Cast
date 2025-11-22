import { petit, roboto } from "@/app/fonts";
import Image from "next/image";
import Underline from "./Underline";

export default function AboutPage() {
    return (
        <section id="About">
            <div
                className={
                    roboto.className +
                    " flex flex-col gap-5 md:items-center px-5 pt-5 pb-10 md:py-20 max-w-[1400px] border mx-auto"
                }
            >
                <div className="flex flex-col items-center w-fit">
                    <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                        About Me
                    </h1>
                    <Underline />
                </div>
                <div className="flex grow flex-col xl:flex-row w-full justify-around items-stretch text-white/80 z-10">
                    <div className=" xl:w-[600px] group border">
                        <div className="frame">
                            <span
                                className={
                                    petit.className +
                                    " absolute inline-block rotate-20 group-hover:rotate-0 duration-700 text-3xl left-2/5 top-1/2 -translate-y-1/2 -translate-x-1/3 z-[1]"
                                }
                            >
                                Who's this?
                            </span>
                            <Image
                                alt="photo frame"
                                src={"/picFrame.jpg"}
                                height={300}
                                width={300}
                                className="rotate-10 md:rotate-20 duration-700 group-hover:rotate-0"
                            />
                            <div className="profilePic duration-700 translate-x-28 -translate-y-[60px] scale-130 perspective-[600px] group-hover:scale-99 group-hover:-translate-x-31 group-hover:-translate-y-27 group-hover:h-[80%]">
                                <Image
                                    alt="Arun Karki's photo"
                                    src={"/proPic.jpg"}
                                    fill
                                    className="object-cover -rotate-y-22 duration-700 group-hover:rotate-y-0 shadow-[5px_5px_5px_1px_rgba(0,0,0,0.9)] group-hover:shadow-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col text-xl border xl:w-[600px] items-center md:py-10 md:px-15 lg:px-25 gap-y-10">
                        <div>
                            <p>Hi. I am Arun Karki.</p>
                            <br />
                            <p>
                                Hailing from the charming town of Kathmandu, I
                                bring a unique blend of creativity and technical
                                expertise to the table. With a passion for
                                designing and developing dynamic and
                                user-friendly websites, I strive to deliver
                                solutions that are both visually appealing and
                                highly functional.
                            </p>
                            <br />
                            <p>
                                Want to learn more about my skills, experience
                                and what I can bring to your projects? Feel free
                                to download my resume below.
                            </p>
                        </div>
                        <div className="relative p-3 cursor-pointer">
                            <span className="absolute -top-1 left-0 inline-block h-1 w-full animate-[wiggle_1s_ease-in-out_infinite] bg-red-800"></span>
                            <span className="absolute top-0 -left-1 inline-block h-full w-1 bg-blue-800"></span>
                            <span className="absolute top-0 -right-1 inline-block h-full w-1 bg-green-800"></span>
                            <span className="absolute -bottom-1 left-0 inline-block h-1 w-full bg-yellow-800"></span>
                            Download CV
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
