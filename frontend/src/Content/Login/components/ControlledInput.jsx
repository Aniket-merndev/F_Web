import React from 'react'
import { Controller } from 'react-hook-form'

function ControlledInput({ name, label, control, type, placeholder, error, options }) {
    return (
        <div className='mb-4'>
            <label className='block font-medium mb-1'>{label}<span className="text-red-500">*</span></label>
            <Controller
                name={name}
                control={control}
                defaultValue={localStorage.getItem(name) || ""}
                render={({ field }) => (

                    <>
                        {/* For Select Type Form Fields */}
                        {type === "options" && (
                            <select
                                {...field}
                                onChange={(e) => {
                                    localStorage.setItem(name, e.target.value);
                                    field.onChange(e); // Ensure react-hook-form handles the change
                                }}
                                placeholder= {options.default}
                                className="mt-1 w-full outline-none border-b border-transparent focus:border-[color:--contrast-color] py-2 px-4 bg-[image:--background-gradient]"
                            >
                                {Object.entries(options).map(([key, value]) => 
                                (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                )
                                )}
                            </select>  
                        )}

                        {/* For Text Area */}
                        {type === "textArea" && (
                            <textarea
                                {...field}
                                type={type}
                                onChange={(e) => {
                                    localStorage.setItem(name, e.target.value);
                                    field.onChange(e); // Ensure react-hook-form handles the change
                                }}
                                placeholder={placeholder}
                                className="mt-1 w-full outline-none border-b border-transparent focus:border-[color:--contrast-color] py-2 px-4 bg-[image:--background-gradient]"
                            ></textarea>
                        )}

                        {/* For other inputs */}
                        {type !== "options" && type !== "textArea" && (
                            <input
                                {...field}
                                type={type}
                                onChange={(e) => {
                                    localStorage.setItem(name, e.target.value);
                                    field.onChange(e); // Ensure react-hook-form handles the change
                                }}
                                placeholder={placeholder}
                                className="mt-1 w-full outline-none border-b border-transparent focus:border-[color:--contrast-color] py-2 px-4 bg-[image:--background-gradient]"
                            />
                        )}
                    </>                    
                )}
            />

            {error && (
                <p className="text-sm">{error}</p>
            )}

        </div>
    )
}

export default ControlledInput