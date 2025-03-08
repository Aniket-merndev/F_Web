import { useForm } from "react-hook-form"
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Components/Button";
import axios from "axios";

export default function UploadFile() {

    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);
    console.log(user);
    const handleFileChange = (e) => {
        setFile(e.target.files[0].name);
    };

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm()

    let fr = new FileReader();

    fr.onload = function(e) { 
        // console.log(e);
        let result = JSON.parse(e.target.result);
        let formatted = JSON.stringify(result, null, 2);
        // console.log(formatted);

        let id = result.HardwareID;
        // console.log(id);
        // Navigate to /displaypage/:id and pass the JSON data as state
        navigate(`/display`, { state: { data: result } });
    }

    const apiUpload = async(file) => {
        const formData = new FormData();
        formData.append('file', file); // 'file' is the key expected by your backend
        formData.append('user', user);
        try{
          const response = await axios.post(`${import.meta.env.VITE_REACT_SERVER_URL}/files/upload?user=${user}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Inform the server about the content type
            },
          });
          console.log(response.data);
          flash("File uploaded successfully");
          navigate(`/display`, { state: { data: response.data.fileid } });
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
          flash(msg, "Error");
        }  
      }
    
    const onSubmit = (data) => {
        let file = data.uploadFile[0];
        // console.log(file)
        // fr.readAsText(file);
        apiUpload(file);
    }
    
    return (
        <div className="flex flex-col items-center h-[70vh] mt-32 justify-center">
          <h2 className="text-center text-2xl font-semibold text-gray-400 mb-6">
             No Account? No Problem!
          </h2>
    
          <div className="border-4 border-dashed  p-6 rounded-lg flex flex-col items-center m-4 border-gray-400">
                <FaCloudUploadAlt className=" text-4xl mb-2 text-gray-400" />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-[--highlight-color] text-[--background-color] font-bold py-2 px-4 rounded-md hover:bg-[--highlight-hover-color]"
                >
                    + Choose files
                </label>
                <form 
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit(onSubmit)}
                    id="file-form"
                >
                    <input
                        id="file-upload"
                        type="file"
                        accept=".json"
                        className="hidden"
                        {...register("uploadFile", { 
                            required: "Upload a data file before proceeding!", 
                            onChange: handleFileChange
                        })}
                    />
                    {errors.uploadFile && (
                        <p className="text-red-500 text-sm">{errors.uploadFile.message}</p>
                    )}
                    <p className="text-gray-400 mt-2">Add a hardware.json data file produced by the Ferrum Web desktop client.</p>
                    {file && (
                        <p className="mt-2 text-[--contrast-color-offset] font-medium">{file}</p>
                    )}
                    <Button text={"Submit"} isSubmit={true}></Button>
                </form>
          </div>
        </div>
    );
}