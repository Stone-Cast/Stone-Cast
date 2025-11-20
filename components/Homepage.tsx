import Typewriter from "@/components/Typewriter";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { rc_bold } from "@/app/fonts";
import Image from "next/image";

export function Homepage() {
    return (
        <section
            id="Home"
            className="relative h-screen flex md:justify-end max-md:items-center"
        >
            <Image
                src={"/homepageBg.jpg"}
                alt="homepage background"
                fill
                objectFit="cover"
                className="absolute pointer-events-none"
            />
            <div className={"md:w-[40%] p-4 md:p-8 md:mt-40 z-10"}>
                <h1 className={"text-4xl leading-tight"}>
                    Hi. This is
                    <br />
                    <span className={rc_bold.className}>ARUN KARKI</span>
                </h1>
                <div>
                    <p className="text-3xl py-4">
                        I AM A <Typewriter />
                    </p>
                    <a
                        href="#Contacts"
                        className="hireMe text-[25px] shadow-[7px_7px_rgba(4,4,4,0.5)] group"
                    >
                        HIRE ME
                        <FaArrowRight className="transform transition-transform duration-500 group-hover:rotate-90" />
                    </a>
                </div>
            </div>
            <a
                href="#About"
                className="absolute bottom-5 md:bottom-20 left-1/2 -translate-x-1/2 md:left-2/5 text-4xl text-[var(--custom-cyan)] animate-bounce z-10"
            >
                <FaChevronDown />
                <FaChevronDown />
            </a>
        </section>
    );
}
