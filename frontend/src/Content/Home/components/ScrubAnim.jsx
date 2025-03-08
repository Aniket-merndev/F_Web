import { BiCircle } from "react-icons/bi"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrubAnim({mirror}) {

    const canvas = useRef(null);
    const circle = useRef(null);
    const pathRef = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline()

        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
        });

        // gsap.from(circle.current, {
        //     // y: () => document.documentElement.scrollHeight - window.innerHeight,
        //     y: -200,
        //     delay: 0.5,
        //     duration: 0.5,
        // })
    
        timeline.to(circle.current, {
            motionPath: {
                path: pathRef.current,
                curviness: 0,
                align: pathRef.current, // Align to itself (no rotation needed)
                alignOrigin: [0.1, 0.5],
                autoRotate: true, // Keep orientation fixed
                // immediateRender: false,
            },
            ease: "none",
            scrollTrigger: {
                trigger: canvas.current,
                scrub: 1, //Enables scroll scrubbing, Lag time
                start: "top top",
                end: "bottom 80%",
            },
        })
        
        gsap.to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: canvas.current,
              scrub: 1, //Enables scroll scrubbing, Lag time
              start: "top top",
              end: "bottom 80%",
            },
          }
        );
    })



    return(
        <div ref={canvas} className="h-[1500px] grid [grid-template-areas:'stack']">
            <div ref={circle} className="[grid-area:stack] h-20 w-20 translate-x-40 translate-y-20">
                <BiCircle className="h-20 w-20 fill-[--highlight-color]"/>
            </div>
            <svg
                viewBox="0 0 200 1500"
                xmlns="http://www.w3.org/2000/svg"
                className="[grid-area:stack] h-full"
            >
                <path
                ref={pathRef}
                d={mirror
                    ? 
                    'M150,0 L50,200 L50,500 L150,800 L150,1100 L50,1300 L50,1500'
                    :
                    'M50,0 L150,200 L150,500 L50,800 L50,1100 L150,1300 L150,1500'
                }
                fill="none"
                className="stroke-[--highlight-color]"
                strokeWidth="10"
                />
            </svg>
        </div>
    )
}
