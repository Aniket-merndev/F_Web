import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledInput from './components/ControlledInput';
import Button from '../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Schema that decides how Form elements are validated while submitting
const schema = yup
  .object({
    username: yup
      .string()
      .required("Username is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_repeat: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match') // Validate that it matches `password`
      .required('Repeat password is required'),      
  })
  .required();  

export default function SignUp() {

  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  // Sends POST Request to backend API to Sign Up
  const apiSignUp = async(data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_SERVER_URL}/auth/signup`,
        data
      );
      // localStorage.setItem("token", response.data);
      flash("Created Account successfully");
      console.log("Created Account successfully");
      navigate("/login");
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
        msg = ("Error:", e.message);
      }
      console.log(msg);
      flash(msg, "Error");
    }
  }  

  const onSubmit = (data) => { 
    console.log(data);
    apiSignUp(data);
  }

  const formFields = [    // Array of Input fields for the form
    {
      name: "username",
      label: "User Name",
      type: "text",
      placeholder: "Enter your user name",
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email address",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your Password",
    },
    {
      name: "password_repeat",
      label: "Repeat Password",
      type: "password",
      placeholder: "Enter your Password again",
    },    
  ]

  return (
    <div className='flex flex-col items-center h-[70vh] mt-32 justify-center'>
        <div className="p-10 bg-[--background-color-offset] rounded-[30px] flex flex-col items-center">
          <h1 className='text-xl font-bold mb-10'>Sign Up</h1>
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

              <div className="flex w-full justify-between px-5 gap-5">
                <button className='font-bold py-2 px-4 rounded-md border-2 border-[color:--contrast-color] hover:bg-[color:--background-color]' type='submit'>Sign Up</button>
                <Link to={"/login"} className='flex'>
                  <Button text={"Login instead"} />
                </Link>
              </div>
          </form>
        </div>
    </div>
  )
}
