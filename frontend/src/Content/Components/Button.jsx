export default function Button({text, isSubmit}){
    return(
            <button
                className="cursor-pointer bg-[--highlight-color] text-[--background-color] font-bold py-2 px-4 rounded-md hover:bg-[--highlight-hover-color] transition-theme"
                type={isSubmit && "submit"}
            >
                {text}
            </button>
    )
}