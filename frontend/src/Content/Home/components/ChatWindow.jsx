import ChatBox from "./ChatBox"

export default function ChatWindow() {


    return(
        <section className="w-[min(590px,100%)]">
            <div className="flex flex-col justify-around bg-[url('Home/Chat_bg.svg')] bg-contain bg-center h-[800px] py-10 xs:p-10">
                <div className="flex justify-start">
                    <ChatBox 
                        sender={"#UltimateLifeform"}
                        text={"What are your Pronouns?"}
                    />
                </div>
                <div className="flex justify-end">
                    <ChatBox 
                        sender={"OMEGA"}
                        text={"NVIDIA GEFORCE RTX 2060 Intel Core i5 10400F CPU 16 GB RAM"}
                        isRight={true}
                    />
                </div>
                <div className="flex justify-start">
                    <ChatBox 
                        sender={"#UltimateLifeform"}
                        text={"Too long, try this: https://ferrum_web_id_ultimate_lifeform_specs_secure_share"}
                    />
                </div>
                <div className="flex justify-end">
                    <ChatBox 
                        sender={"Rugino"}
                        text={"unbelievable."}
                        isRight={true}
                    />
                </div>
            </div>
        </section>
    )
}