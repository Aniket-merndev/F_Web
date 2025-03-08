import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledInput from './components/ControlledInput';
import Button from '../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUser } from '../../Store/User.js/UserSlice';

// Schema that decides how Form elements are validated while submitting
const schema = yup
  .object({
    email_username: yup
      .string()
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

export default function Login() {

  const navigate = useNavigate();   // To Navigate to Another site

  const dispatch = useDispatch();   // To set Global variable setUser

  // Sends POST Request to backend API to login
  const apiLogin = async(data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_SERVER_URL}/auth/login`,
        data
      );
      const { token, username } = response.data;
      // console.log(token);
      localStorage.setItem('token', token);
      flash("Logged in successfully");
      dispatch(setUser({ user:username, token }));
      // console.log(response.data.username);
      navigate("/dashboard");
    } catch (e) {
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
    // console.log(data);
    apiLogin(data);
  }
  
  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  
  const formFields = [    // Array of Input fields for the form
    {
        name: "email_username",
        label: "Email / Username",
        type: "text",
        placeholder: "Enter email / username",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ]

  return (
    <div className='flex flex-col items-center h-[70vh] mt-32 justify-center'>
        <div className="p-10 bg-[--background-color-offset] rounded-[30px] flex flex-col items-center">
          <h1 className='text-xl font-bold mb-10'>Log In</h1>
          <form
              onSubmit={handleSubmit(onSubmit)}
              id="create-job-form"
          >
              {formFields.map((field, index) => (
                  <ControlledInput
                  name={field.name}
                  label={field.label}
                  control={control}
                  type={field.type}
                  placeholder={field.placeholder}
                  error={errors[field.name]?.message}
                  options={field.options || undefined} // Pass undefined if options is not present
                  key={index}
                  />
              ))}

              <div className="flex w-full justify-between px-5">
                <Button text={"Login"} isSubmit={true}/>
                <Link to={"/signup"} className='font-bold py-2 px-4 rounded-md border-2 border-[color:--contrast-color] hover:bg-[color:--background-color]'>Sign Up</Link>
              </div>
          </form>
        </div>
    </div>
  )
}
