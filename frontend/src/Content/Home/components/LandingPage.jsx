import { Link } from "react-router-dom"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from "react";

export default function LandingPage() {

    const heroSection = useRef(null);
    const tagline = useRef(null);
    const tagline2 = useRef(null);
    const CTA = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline()
    
        timeline.from(tagline.current, {
            delay: 0.5,
            x: 50,
            duration: 0.5,
            opacity: 0,
        }).from(tagline2.current, {
            duration: 0.5,
            x: 50,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.15
        }).from(CTA.current, {
            duration: 0.75,
            y: 10,
            opacity: 0,
            ease: "power2.out",
            stagger: 0.15          
        })
    }, { scope: heroSection })

    return(
        <section ref={heroSection} className="flex flex-col items-center h-[80vh] mt-32 justify-center">
            <h1 ref={tagline} className="text-[3rem] md:text-[4rem] lg:text-[6rem] xl:text-[8rem] text-[--highlight-color] font-bold text-center ">Share PC Specs </h1>
            <div className="flex flex-row-reverse justify-center w-[80vw] items-center">
                <h1 ref={tagline2} className="text-[3rem] md:text-[4rem] lg:text-[6rem] xl:text-[8rem] bg-[image:--highlight-gradient] bg-clip-text text-transparent font-bold lg:ml-[150px] xl:ml-[250px]">in a Blitz!</h1>
                <div ref={CTA} className="mr-6">
                    <p className="text-[--contrast-color] text-4xl">You should try it</p>    
                    <Link className="mt-8" to={"/upload"}>
                        <button
                            className="cursor-pointer bg-[--highlight-color] text-[--background-color] font-bold py-2 px-4 rounded-xl sm:rounded-3xl hover:bg-[--highlight-hover-color] text-4xl sm:text-6xl pt-3 transition-theme"
                        >
                            NOW!
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}