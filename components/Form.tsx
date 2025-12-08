"use client";

import { SendEmails } from "@/app/actions";
import { story_script } from "@/app/fonts";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoPaperPlane } from "react-icons/io5";

export default function Form() {
    const [isExpanded, setIsExpanded] = useState(false);
    const formContainerRef = useRef<HTMLDivElement>(null);

    // Handle clicks outside the form
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                formContainerRef.current &&
                !formContainerRef.current.contains(event.target as Node)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function handleSubmit(e: FormData) {
        await SendEmails(e);
        alert("Message sent.");
    }

    return (
        <div
            ref={formContainerRef}
            className="relative md:top-[60px] mx-auto w-full md:w-[450px] xl:w-full max-w-[520px] my-auto"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => {
                // Check if any input inside the form is focused
                const formElement =
                    formContainerRef.current?.querySelector("form");
                const hasFocusedInput = formElement?.contains(
                    document.activeElement
                );

                if (!hasFocusedInput) {
                    setIsExpanded(false);
                }
            }}
        >
            <Image
                src={"/letter-before.webp"}
                alt="letter's cover."
                width={100}
                height={100}
                className=" absolute bottom-35 left-1/2 -translate-x-1/2 w-[102%] max-w-[520px] pointer-events-none"
            />
            <Image
                src={"/letter-after.webp"}
                alt="letter's cover. cover letter? ahaha!"
                width={300}
                height={100}
                className=" absolute -bottom-3 left-1/2 -translate-x-1/2 w-[102%] max-w-[535px] z-30 rounded-bl-2xl rounded-br-2xl pointer-events-none"
            />
            <form
                action={handleSubmit}
                className={`relative max-w-[560px] flex flex-col mx-auto gap-y-4 p-5 md:p-7 xl:p-10 rounded-lg w-full bg-white transition-all duration-1000 z-20 overflow-hidden ${
                    isExpanded
                        ? "h-[520px] md:h-[560px] xl:h-[600px]"
                        : "h-[290px] md:h-[330px]"
                }`}
            >
                <span
                    className={
                        story_script.className +
                        " text-2xl lg:text-3xl uppercase"
                    }
                >
                    Hey Arun,
                </span>
                <div className="md:flex items-center gap-2">
                    <label htmlFor="message" className="hidden md:block">
                        Your message:
                    </label>
                    <textarea
                        name="message"
                        placeholder="Type your message here..."
                        className="p-2 rounded-lg max-md:w-full md:grow border border-dashed"
                        onFocus={() => setIsExpanded(true)}
                    />
                </div>
                <span
                    className={
                        story_script.className +
                        " text-2xl lg:text-3xl uppercase "
                    }
                >
                    Best Regards,
                </span>
                <div className="flex items-center gap-2 duration-1000">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="p-4 rounded-3xl max-md:w-full md:grow border border-dashed"
                        onFocus={() => setIsExpanded(true)}
                        required
                    />
                </div>
                <div className="flex items-center gap-2 duration-1000">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        className="p-4 rounded-3xl max-md:w-full md:grow border border-dashed"
                        onFocus={() => setIsExpanded(true)}
                        required
                    />
                </div>
                <button
                    id="submitButton"
                    type="submit"
                    className="lg:relative w-fit mx-auto z-10 px-5 md:px-10 py-2 md:py-3 rounded-4xl cursor-pointer bg-[rgb(37,41,52)]"
                >
                    <span className="flex max-w-[150px] justify-center items-center gap-3 text-xl md:text-2xl text-white ">
                        SEND <IoPaperPlane className="inline " />
                    </span>
                </button>
            </form>
        </div>
    );
}
