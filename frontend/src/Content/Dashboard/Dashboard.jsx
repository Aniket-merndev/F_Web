import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link, useLoaderData } from 'react-router-dom';
import { store } from '../../Store/store';
import Button from '../Components/Button';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  let [readings, setReadings] = useState([]);

  // console.log(readings);

  const user = useSelector((state) => state.userReducer.user);   // Fetch User from Global State

  useEffect(() => {
    const apiFetch = async() => {
      try{
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_SERVER_URL}/files/fetch`, {params: { user }}
        );
        console.log(response.data);
        setReadings(response.data.files);   // Set Variable `readings` to contain the api response
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
        setReadings([]);
      }  
    }
    apiFetch();
  }, [user]);

  const navigate = useNavigate();   // To Navigate to Another site
  
  const nav = (fileid) => {
    navigate(`/display`, { state: { data: fileid } });
  }

  return (
    <div className='text-[--contrast-color] text-xl flex flex-col items-center w-full mt-32 min-h-lvh'>
      <p className='font-semibold '>{"Welcome, " + user}</p>

      <div className="mt-20 w-full items-center flex flex-col">
        {(readings.length !== 0) 
          ? (
            <table className='w-4/5 bg-[--background-color-offset] rounded-[30px] transition-theme'>
              <caption className='font-semibold mb-10'>Uploaded Readings...</caption>
              <thead className=''>
                <tr>
                  <th className='py-5'>File</th>
                  <th className='py-5'>Date</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((reading, index) => (
                  <tr key={index}>
                    <th className='border-t-[1px] border-gray-400 py-5'><button onClick={() => nav(reading.fileid)} className='hover:text-[color:--highlight-hover-color]'>{reading.filename}</button></th>
                    {/* <th className='border-t-[1px] border-gray-400 py-5'>{format(new Date(reading.uploadDate), "yyyy-MM-dd HH:mm:ss")}</th> */}
                    <th className='border-t-[1px] border-gray-400 py-5'>
                    {reading.uploaddate ? format(new Date(reading.uploaddate), "yyyy-MM-dd HH:mm:ss") : "No date available"}
                    </th>
                  </tr>              
                ))}
              </tbody>
            </table>
          )
          : (
            <div className='flex flex-col items-center gap-5'>
              <p>Looks like you have no uploads.</p>
              <Link to={"/upload"}><Button text={"Upload Now!"}/></Link>
            </div>
          )
        }
      </div>
    </div>
  )
}