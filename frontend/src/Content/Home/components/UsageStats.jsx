import UsageComp from "./UsageComp"

export default function UsageStats() {
    return(
        <section className="flex flex-col w-[90%] items-center my-20">
            <div className='h-[1px] w-full bg-[--contrast-color]'></div>
            <div className="flex flex-col sm:flex-row my-10 w-full justify-around items-center sm:items-stretch px-5 sm:h-60 xl:h-80">
                <UsageComp 
                    topText={"100,000 +"}
                    bottomText={"Downloads"}
                />
                <div className='w-[90%] sm:w-[1px] h-[1px] sm:h-auto bg-[--contrast-color]'></div>
                <UsageComp 
                    topText={"100,000 +"}
                    bottomText={"Downloads"}
                />
                <div className='w-[90%] sm:w-[1px] h-[1px] sm:h-auto bg-[--contrast-color]'></div>
                <UsageComp 
                    topText={"100,000 +"}
                    bottomText={"Downloads"}
                />
            </div>
            <div className='h-[1px] w-full bg-[--contrast-color]'></div>
        </section>
    )
}