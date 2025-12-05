import Image from "next/image";
import Form from "./Form";

export default function Contacts() {
    return (
        <section
            className=" relative flex flex-col gap-5 md:items-center md:justify-center px-5 pt-5 pb-10 md:py-20 min-h-screen "
            id="Contacts"
        >
            <h1 className="md:absolute top-[10%] w-full text-3xl md:text-5xl text-[var(--custom-cyan)]">
                <span className="relative md:left-[5%] xl:left-[10%] ">
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
