export default function Footer() {
    return(
        <section className="flex flex-col items-center w-full">
             <div className='h-[3px] w-full bg-[image:--highlight-gradient]'></div>
             <p className="text-[--contrast-color] py-10">Copyright© {new Date().getFullYear()}. All Rights Reserved.</p>
        </section>
    )
}