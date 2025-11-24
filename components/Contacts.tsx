import Image from "next/image";
import Underline from "./Underline";
import Form from "./Form";

export default function Contacts() {
    return (
        <section
            className=" relative flex flex-col gap-5 md:items-center md:justify-center px-5 pt-5 pb-10 md:py-20 h-screen"
            id="Contacts"
        >
            <h1 className="relative w-full text-3xl md:text-5xl text-[var(--custom-cyan)]">
                <span className="relative">
                    Send a message
                    <Image
                        src={"/paper-plane.png"}
                        width={600}
                        height={600}
                        alt="paper-plane"
                        className="absolute -top-[30%] -right-[25%] pointer-events-none"
                    />
                </span>
            </h1>

            <Form />
        </section>
    );
}
