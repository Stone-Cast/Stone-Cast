import Typewriter from "@/components/Typewriter";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";
import { rc_bold } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import Particles from "./Particles";

export function Homepage() {
    return (
        <section
            id="Home"
            className="relative h-screen flex overflow-x-hidden z-20"
        >
            <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full z-10">
                <Particles
                    particleColors={["#ffffff", "#089898"]}
                    particleCount={50}
                    particleSpread={8}
                    speed={0.15}
                    particleBaseSize={250}
                    moveParticlesOnHover={true}
                    alphaParticles={false}
                    disableRotation={false}
                />
            </div>
            <Image
                src="/homepageBg.jpg"
                alt="homepage background"
                fill
                priority
                quality={100}
                style={{ objectFit: "cover" }}
                className="absolute pointer-events-none"
                unoptimized={true}
            />

            <div
                className={
                    "absolute left-[5%] lg:left-[60%] top-[25%] lg:w-[300px] rounded-md lg:backdrop-brightness-70 lg:backdrop-blur-sm z-10 text-white lg:p-2"
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
