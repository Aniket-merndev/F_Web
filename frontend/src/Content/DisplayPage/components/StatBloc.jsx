export default function StatBloc({name, data, span}) {
    return (
        <div className={`flex flex-col md:flex-row justify-stretch p-2 gap-5 ${span && ("col-span-" + span)}`}>
            <span className="text-[--contrast-color]">{name}</span>
            <span className="border-solid border-[1px] border-[--contrast-color] h-7 rounded-full flex-grow text-[--contrast-color] px-2 overflow-x-auto  whitespace-nowrap scrollbar-custom">{data}</span>
        </div>
    )
}