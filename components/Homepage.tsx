import Typewriter from "@/components/Typewriter";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { rc_bold } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";

export function Homepage() {
    return (
        <section id="Home" className="relative h-screen flex overflow-x-hidden">
            <Image
                src={"/homepageBg.jpg"}
                alt="homepage background"
                fill
                objectFit="cover"
                className="absolute pointer-events-none"
            />
            <div
                className={
                    "absolute left-[5%] lg:left-[60%] top-[25%] w-full lg:w-fit z-10 text-white"
                }
            >
                <h1 className={"text-4xl leading-tight w-fit "}>
                    Hi. This is
                    <br />
                    <span className={rc_bold.className}>ARUN KARKI</span>
                </h1>
                <div>
                    <p className="text-3xl py-4 w-fit ">
                        I AM A <Typewriter />
                    </p>
                    <Link
                        href="#Contacts"
                        className="hireMe text-[25px] shadow-[7px_7px_rgba(4,4,4,0.5)] group"
                    >
                        HIRE ME
                        <FaArrowRight className="transform transition-transform duration-500 group-hover:rotate-90" />
                    </Link>
                </div>
            </div>
            <Link
                href="#About"
                className="absolute bottom-5 md:bottom-20 left-1/2 -translate-x-1/2 md:left-2/5 text-4xl text-[var(--custom-cyan)] animate-bounce z-10"
            >
                <FaChevronDown />
                <FaChevronDown />
            </Link>
        </section>
    );
}
