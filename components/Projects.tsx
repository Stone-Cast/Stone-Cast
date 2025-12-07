import { roboto } from "@/app/fonts";
import Underline from "./Underline";
import Carousel from "./Carousel";

export default function Projects() {
    return (
        <section
            id="Projects"
            className="projects relative bg-[url('../public/homepageBg.jpg')] bg-no-repeat bg-cover bg-fixed bg-center md:-mt-[208px] lg:-scroll-mt-30 overflow-x-clip z-10"
        >
            <div
                className={
                    roboto.className +
                    " relative flex flex-col gap-5 md:items-center px-5 pt-5 md:pt-20 lg:pt-50 mx-auto z-10"
                }
            >
                <div className="recentProjects relative flex flex-col items-center w-fit self-start md:ml-[5%] xl:ml-[8%]">
                    <h1 className="text-2xl md:text-4xl text-[var(--custom-cyan)]">
                        Recent Projects
                    </h1>
                    <Underline />
                </div>
                <div className="w-[305px] md:w-[625px] lg:w-[945px] xl:w-[1245px] mx-auto py-20">
                    <Carousel />
                </div>
            </div>
        </section>
    );
}
