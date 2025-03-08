import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export default function LightMode(){

    // const defaultTheme = (
    //     window.matchMedia &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches
    // )? "dark"
    // :   (localStorage.getItem("theme") || false)

    const [lightMode, setLightMode] = useState(false);

    useEffect(()=>{
        if(lightMode) {
            localStorage.setItem("lightMode", "true");
            document.documentElement.setAttribute("data-theme", "light");
        }
        else {
            localStorage.setItem("lightMode", "false");
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, [lightMode]);

    return (
        <div className="toggle-theme-wrapper">
          <label className="toggle-theme block" htmlFor="checkbox">
            <input
            className="hidden"
              type="checkbox"
              id="checkbox"
              onChange={() => (setLightMode(!lightMode))}
              defaultChecked={lightMode}
            />
            {/* <span className="text-3xl duration-300">{lightMode? "☀️" : "🌒"}</span> */}
            <span className="text-3xl transition-all duration-75 ease-in-out text-[--contrast-color]">{lightMode? <BiMoon /> : <BiSun />}</span>
          </label>
        </div>
    );
}