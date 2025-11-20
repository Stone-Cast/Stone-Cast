import AboutPage from "@/components/AboutPage";
import { Homepage } from "@/components/Homepage";
import NavBar from "@/components/NavBar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
    return (
        <main className="bg-[var(--custom-grey)]">
            <Homepage />
            <NavBar />
            <AboutPage />
            <Skills />
            <Projects />
        </main>
    );
}
