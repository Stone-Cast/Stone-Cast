import Image from "next/image";
import Underline from "./Underline";
import Form from "./Form";

export default function Contacts() {
    return (
        <section
            className=" relative flex flex-col gap-5 md:items-center md:justify-center px-5 pt-5 pb-10 md:py-20 h-screen"
            id="Contacts"
        >
            <div className="md:hidden flex flex-col items-center w-fit text-[var(--custom-cyan)]">
                <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                    Send a message
                </h1>
                <Underline />
            </div>
            <div className="max-md:hidden md:absolute top-[5%] left-[5%] lg:top-[12%] lg:left-[12%] w-[420px] text-[var(--custom-cyan)] z-20">
                <h1 className="md:text-5xl">Send a message</h1>
                <Image
                    src={"/paper-plane.png"}
                    width={500}
                    height={500}
                    alt="paper-plane"
                    className="absolute -top-8 left-5"
                />
            </div>

            <Form />
        </section>
    );
}
