import ProjectCard from "./ProjectCard"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function OtherProjects(){
    
    const section = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section.current, // Element that triggers the animation
            },
          })
    
        timeline.from(".project-card", {
            delay: 0.5,
            y: 50,
            duration: 0.5,
            opacity: 0,
            stagger: 0.15
        })
    }, {scope:section})

    return(
        <section ref={section} className="flex flex-col items-center w-full my-20">
            <h1 className="text-[60px] sm:text-[80px] text-[--highlight-color] text-center font-extrabold">Other Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full p-10 gap-10 justify-evenly">
                <ProjectCard
                    name={"FerrumX"}
                    url={"Home/FerrumX.svg"}
                    position={"Hardware ID Java Library Wrapper"}
                />
                <ProjectCard
                    name={"FeedBack"}
                    url={"Home/FeedBack.svg"}
                    position={"Finish Tasks, Level Up"}
                />
            </div>
        </section>
    )
}