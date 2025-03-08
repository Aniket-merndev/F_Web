export default function UsageComp({topText, bottomText}){
    return(
        <div className="flex flex-col p-5 xl:p-10 justify-center">
            <p className="text-[--highlight-color] text-4xl xl:text-5xl font-extrabold text-center">{topText}</p>
            <p className="text-[--contrast-color] text-3xl xl:text-4xl font-bold text-center">{bottomText}</p>
        </div>                
    )
}