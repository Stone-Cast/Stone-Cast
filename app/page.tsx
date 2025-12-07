import AboutPage from "@/components/AboutPage";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import { Homepage } from "@/components/Homepage";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import ScrollSpy from "@/components/ScrollSpy";
import Skills from "@/components/Skills";

export default function Home() {
    return (
        <main className="relative bg-[var(--custom-grey)]">
            <Homepage />
            <NavBar />
            <AboutPage />
            <Skills />
            <Projects />
            <Contacts />
            <Footer />
            <ScrollSpy />
        </main>
    );
}
