import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

export default function ChatBox({sender, text, isRight}) {
    
    const chatbox = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: chatbox.current, // Element that triggers the animation
            },
          })
    
        timeline.from(chatbox.current, {
            delay: 0.5,
            // x: isRight? 50 : -50,
            y: 50,
            duration: 0.5,
            opacity: 0,
            stagger: 0.15
        })
    }, {})

    return(
        <div ref={chatbox} className="flex flex-col bg-[--highlight-color] py-6 px-4 rounded-lg max-w-[300px]">
            <h2 className="font-bold">{sender}</h2>
            <p className="text-wrap text-ellipsis overflow-hidden">{text}</p>
        </div>
    )
}