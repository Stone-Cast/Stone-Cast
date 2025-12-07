import Link from "next/link";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="relative bg-black text-white p-10 z-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Name */}
                <div>
                    <h2 className="text-xl font-semibold">Arun Karki</h2>
                    <p className="text-sm text-gray-300 mt-2">
                        Crafting clean, modern and reliable web experiences.
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-medium mb-2">Contact</h3>
                    <p className="text-sm text-gray-300">📞 +977 9860848085</p>
                    <p className="text-sm text-gray-300">
                        📧{" "}
                        <a
                            href="mailto:contact@arun-karki.com.np"
                            className="underline"
                        >
                            contact@arun-karki.com.np
                        </a>
                    </p>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-lg font-medium mb-2">Social</h3>
                    <div className="flex items-center gap-4 text-xl">
                        <Link
                            href="https://github.com/Stone-Cast/"
                            target="_blank"
                        >
                            <FaGithub className="hover:text-white duration-300" />
                        </Link>
                        {/* <Link href="https://linkedin.com/" target="_blank">
                            <FaLinkedin className="hover:text-[rgb(0,119,181)] duration-300" />
                        </Link>
                        <Link href="https://facebook.com/" target="_blank">
                            <FaFacebook className="hover:text-[rgb(24,119,242)] duration-300" />
                        </Link>
                        <Link href="https://instagram.com/" target="_blank">
                            <FaInstagram className="hover:text-[rgb(150,47,191)] duration-300" />
                        </Link> */}
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm text-gray-400">
                <p>
                    © {new Date().getFullYear()} Arun Karki. All rights
                    reserved.
                </p>
                <p className="mt-1">Built with ❤️</p>
            </div>
        </footer>
    );
}
