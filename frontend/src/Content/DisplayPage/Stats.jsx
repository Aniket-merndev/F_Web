import StatBloc from "./components/StatBloc";
import StatSection from "./components/StatSection"
import { useParams, useLocation } from "react-router-dom";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useState, useEffect } from "react";
import Convertor from "./components/Convertor";
import axios from "axios";

export default function Stats () {
    const box = useRef(null);

    useGSAP(() => {
        const timeline = gsap.timeline()
    
        timeline.from(".stat-section", {
            delay: 0.5,
            y: 50,
            duration: 0.5,
            opacity: 0,
            stagger: 0.15
        })
    }, {scope:box})    

    const location = useLocation();
    
    // Access File Id from state
    const fileid = location.state?.data;

    // Access the JSON data passed via state
    // const data = location.state?.data;
    // console.log(JSON.stringify(data, null, 2));

    const [data, setData] = useState(null);
    
    let fr = new FileReader();

    fr.onload = function(e) { 
        // console.log(e);
        let result = JSON.parse(e.target.result);
        let formatted = JSON.stringify(result, null, 2);
        console.log(formatted);

        setData(result);
    }

    const [file, setFile] = useState(null);

    useEffect(() => {
        const apiUse = async() => {     // Fetch the file whose info to be diplayed
          try{
            const response = await axios.get(
              `${import.meta.env.VITE_REACT_SERVER_URL}/files/use`, {params: { fileid }}
            );
            console.log(response.data);
            setFile(response.data.files);   // Set Variable `readings` to contain the api response
            setData(response.data);
            // fr.readAsText(file);
          }
          catch (e) {
            let msg;
            // Enhanced error handling
            if (e.response) {
              // Server responded with a status code other than 2xx
              msg = `Error ${e.response.status}: ${e.response.data || "Server error"}`;
            } else if (e.request) {
              // Request was made but no response received
              msg = "No response received from server";
            } else {
              // Something else caused the error
              msg = ("Error:", e.message)
            }
            console.log(msg);
            // flash(msg, "Error");
          }  
        }
        apiUse();
    }, [fileid]);

    return (
        <div ref={box} className="w-5/6 my-32 gap-5 flex flex-col items-center">

            {/* Hardware ID */}

            {data && <>            
                <StatSection heading={"Hardware ID"}>
                    <StatBloc
                        name = {"Hardware ID"}
                        data = {data.HardwareID}
                    />
                </StatSection>
                {Object.keys(data.CPU).map((item, index) => (
                    <StatSection heading={"CPU"} cols={"md:grid-cols-4"} key={index}>
                        <StatBloc 
                            name={"CPU#"}
                            data={item}
                        />
                        <StatBloc 
                            name={"Name"}
                            data={data.CPU[item].Name}
                        />
                        <StatBloc 
                            name={"Cores"}
                            data={data.CPU[item].NumberOfCores}
                        />
                        <StatBloc 
                            name={"Threads"}
                            data={data.CPU[item].ThreadCount}
                        />  
                        <StatBloc 
                            name={"L2 Cache"}
                            data={data.CPU[item].L2CacheSize + " KB"}
                        />
                        <StatBloc 
                            name={"L3 Cache"}
                            data={data.CPU[item].L3CacheSize + " KB"}
                        />
                        <StatBloc 
                            name={"Address Width"}
                            data={data.CPU[item].AddressWidth}
                        />
                        <StatBloc 
                            name={"Processor ID"}
                            data={data.CPU[item].ProcessorID}
                        />               
                    </StatSection>            
                ))}
                {Object.keys(data.GPU).map((item, index) => (
                    <StatSection heading={"GPU"} cols={"md:grid-cols-4"} key={index}>
                        <StatBloc 
                            name={"GPU#"}
                            data={item}
                        />
                        <StatBloc 
                            name={"Name"}
                            data={data.GPU[item].Name}
                        />
                        <StatBloc 
                            name={"VRAM"}
                            data={Convertor("MB", data.GPU[item].AdapterRAM)}
                        />
                        <StatBloc 
                            name={"Driver Version"}
                            data={data.GPU[item].DriverVersion}
                        />  
                        <StatBloc 
                            name={"Driver Date"}
                            data={data.GPU[item].DriverDate}
                        />          
                    </StatSection>    
                ))}
                {Object.keys(data.Memory).map((item, index) => (
                    <StatSection heading={"Memory"} cols={"md:grid-cols-4"} key={index}>
                        <StatBloc 
                            name={"Memory#"}
                            data={item}
                        />
                        <StatBloc 
                            name={"Name"}
                            data={data.Memory[item].Name}
                        />
                        <StatBloc 
                            name={"Manufacturer"}
                            data={data.Memory[item].Manufacturer}
                        />
                        <StatBloc 
                            name={"Part Number"}
                            data={data.Memory[item].PartNumber}
                        />  
                        <StatBloc 
                            name={"Capacity"}
                            data={Convertor("MB", data.Memory[item].Capacity)}
                        />
                        <StatBloc 
                            name={"Data Width"}
                            data={data.Memory[item].DataWidth}
                        />
                        <StatBloc 
                            name={"Speed"}
                            data={data.Memory[item].Speed}
                        />
                        <StatBloc 
                            name={"Serial Number"}
                            data={data.Memory[item].SerialNumber}
                        />               
                    </StatSection>
                ))}
                <StatSection heading={"Mainboard"} cols={"md:grid-cols-4"}>
                    <StatBloc 
                        name = {"Manufacturer"}
                        data = {data.Mainboard.Manufacturer}
                    />
                    <StatBloc 
                        name = {"Model"}
                        data = {data.Mainboard.Model}
                    />
                    <StatBloc 
                        name = {"Product"}
                        data = {data.Mainboard.Product}
                    />
                    <StatBloc 
                        name = {"Serial"}
                        data = {data.Mainboard.SerialNumber}
                    />                                      
                </StatSection>            
                <StatSection heading={"BIOS"} cols={"md:grid-cols-4"}>
                    <StatBloc 
                        name = {"Name"}
                        data = {data.BIOS.Name}
                    />
                    <StatBloc 
                        name = {"Manufacturer"}
                        data = {data.BIOS.Manufacturer}
                    />
                    <StatBloc 
                        name = {"Release Date"}
                        data = {data.BIOS.ReleaseDate}
                    />
                    <StatBloc 
                        name = {"Version"}
                        data = {data.BIOS.Version}
                    />                                      
                </StatSection>
                {Object.keys(data.Network).map((item, index) => (
                    <StatSection heading={"Network"} cols={"md:grid-cols-4"} key={index}>
                        <StatBloc 
                            name = {"Connection#"}
                            data = {item}
                        />
                        <StatBloc 
                            name = {"Name"}
                            data = {data.Network[item].Name}
                        />
                        <StatBloc 
                            name = {"MAC"}
                            data = {data.Network[item].MACAddress}
                        />                                     
                    </StatSection>
                ))}
                {Object.keys(data.Storage).map((item, index) => (            
                    <StatSection heading={"Storage"} cols={"md:grid-cols-4"} key={index}>
                        <StatBloc 
                            name = {"Storage#"}
                            data = {item}
                        />
                        <StatBloc 
                            name = {"Model"}
                            data = {data.Storage[item].Model}
                        />
                        <StatBloc 
                            name = {"Size"}
                            data={Convertor("GB", data.Storage[item].Size)}                        
                        />
                        <StatBloc 
                            name = {"Firmware"}
                            data = {data.Storage[item].FirmwareRevision}
                        />
                        <StatBloc 
                            name = {"Serial"}
                            data = {data.Storage[item].SerialNumber}
                        />                                               
                    </StatSection>
                ))}            
                {Object.keys(data['Operating System']).map((item, index) => (                
                    <StatSection heading={"Operating System"} cols={"md:grid-cols-4"} key={index}>
                        <StatBloc 
                            name = {"OS#"}
                            data = {item}
                        />
                        <StatBloc 
                            name = {"Version"}
                            data = {data['Operating System'][item].Version}
                        />
                        <StatBloc 
                            name = {"Build"}
                            data = {data['Operating System'][item].BuildNumber}
                        />
                        <StatBloc 
                            name = {"Architecture"}
                            data = {data['Operating System'][item].OSArchitecture}
                        />                                      
                    </StatSection>
                ))}
            </>}
        </div>
    )
}