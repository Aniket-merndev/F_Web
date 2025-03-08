import TeamCard from "./TeamCard"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function Team(){

    const section = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section.current, // Element that triggers the animation
            },
          })
    
        timeline.from(".team-card", {
            delay: 0.5,
            y: 50,
            duration: 0.5,
            opacity: 0,
            stagger: 0.15
        })
    }, {scope:section})

    return(
        <section ref={section} className="flex flex-col items-center w-full my-20">
            <h1 className="text-[80px] text-[--highlight-color] font-extrabold">The Team</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 w-full p-10 gap-10">
                <TeamCard
                    name={"Eggy"}
                    url={"Home/eggy.webp"}
                    position={"Desktop Clinet Dev"}
                    quote={"...please don’t publicly introduce us"}
                />
                <TeamCard
                    name={"DJakie"}
                    url={"Home/djakie.webp"}
                    position={"DBMS Supervisor"}
                    quote={"I am like... literally the best person in the world. Damn."}
                />
                <TeamCard
                    name={"Rugino3"}
                    url={"Home/rugino.webp"}
                    position={"Website Dev"}
                    quote={"I am not known to keep my word."}
                />
            </div>
        </section>
    )
}