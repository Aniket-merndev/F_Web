import StatBloc from "./StatBloc"

export default function StatSection({children, heading, cols}) {

    // console.log(section);

    // const singleEntry = () => (
    //     <StatBloc 
    //         name = {heading}
    //         data = {section}
    //         key = {section + heading}
    //     />  
    // )

    // const parseSection = () => {
    //     if ((typeof section) !== "object") {
    //         return singleEntry();
    //     }
    //     else {
    //         let entries = Object.entries(section);
    //         console.log(entries);
    //         return (
    //             entries.map((stat, index) => (
    //                 <StatBloc 
    //                     name = {stat[0]}
    //                     data = {stat[1]}
    //                     key = {section[0] + stat[0]}
    //                 />  
    //             ))
    //         )
    //     }
    // }

    return (
        <div className="stat-section bg-[image:--background-gradient] rounded-3xl p-10 w-full">
            <h2 className="absolute mt-[-2rem] font-bold text-[--contrast-color]">{heading}</h2>
            {/* {parseSection()} */}
            <div className={`grid ${cols} grid-cols-1`}>
                {children}
            </div>
        </div>
    )
}