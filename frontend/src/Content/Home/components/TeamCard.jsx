import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger);

export default function TeamCard({name, url, position, quote}){

    // const box = useRef(null);

    // useGSAP(() => {
    //     const timeline = gsap.timeline({
    //         scrollTrigger: {
    //           trigger: box.current, // Element that triggers the animation
    //         },
    //       })
    
    //     timeline.from(box.current, {
    //         delay: 0.5,
    //         x: 50,
    //         duration: 0.5,
    //         opacity: 0,
    //         stagger: 0.15
    //     })
    // }, {})

    return (
        <div className="team-card flex flex-col justify-between rounded-xl p-5 bg-[--background-color-offset] w-[250px] xs:w-[350px] h-auto xs:h-[175px] justify-self-center">
            <div className="flex justify-stretch gap-5">
                <div className="rounded-full w-[54px] h-[54px] bg-[image:--highlight-gradient] z-[0]">
                <img className="relative top-[2px] left-[2px] rounded-full w-[50px] h-[50px] object-cover object-center" src={url} alt="" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[--contrast-color] font-bold text-xl">{name}</h2>
                    <p className="text-[--contrast-color]">{position}</p>
                </div>
            </div>
            <p className="text-[--contrast-color] my-3 italic text-right">{quote}</p>
        </div>
    )
}