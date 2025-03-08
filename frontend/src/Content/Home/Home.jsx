import LandingPage from "./components/LandingPage"
import ChatWindow from "./components/ChatWindow"
import UsageStats from "./components/UsageStats"
import Team from "./components/Team"
import OtherProjects from "./components/OtherProjects"
import ScrubAnim from "./components/ScrubAnim"

export default function Home(){
    return(
        <div className="grid [grid-template-areas:'stack']">
            <div className="[grid-area:stack] hidden lg:flex w-full min-h-[100vh] justify-between overflow-hidden">
                <div className="flex">
                    <ScrubAnim mirror={true}/>
                    <div className="hidden 2xl:block -translate-x-28"> 
                    <ScrubAnim mirror={true}/>
                    </div>
                </div>
                <div className="flex">
                    <div className="hidden 2xl:block translate-x-28"> 
                    <ScrubAnim/>
                    </div>
                    <ScrubAnim />
                </div>
            </div>

            <div className="[grid-area:stack] flex flex-col items-center">
                <LandingPage />
                <ChatWindow />
                <UsageStats />
                <Team />
                <OtherProjects />
            </div>
        </div>
    )
}