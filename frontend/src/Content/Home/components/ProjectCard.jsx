export default function ProjectCard({name, url, position}){
    return (
        <div className="project-card flex justify-stretch gap-5 justify-self-center">
            <img className="relative top-[2px] left-[2px] w-[70px] h-[70px] rounded-md object-cover object-center" src={url} alt="" />
            <div className="flex flex-col">
                <h2 className="text-[--contrast-color] font-bold text-xl">{name}</h2>
                <p className="text-[--contrast-color]">{position}</p>
            </div>
        </div>
    )
}