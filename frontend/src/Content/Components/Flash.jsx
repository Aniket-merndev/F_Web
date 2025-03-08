import React, { useEffect, useState } from 'react';
import Bus from '../../utils/Bus';
import { IoClose } from "react-icons/io5";
import { motion } from 'framer-motion';

export const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({ message, type }) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 5000);
        });
    }, []);

    return (
        <motion.div
            animate={visibility ? {
                visibility: 'visible',
                opacity: 1,
                x: '-105%'
            } : {
                visibility: 'hidden',
                opacity: 0,
                x: '0',
            }}
            transition={{
                duration: 0.25,
                ease: 'easeInOut',
            }}
            style={{ boxShadow: '0 0 10px #C7C7C7' }}
            className={`ct-toast shadow-2xl w-[350px] fixed z-[100] bottom-[30px] left-[100%] bg-[--background-color] overflow-hidden rounded-xl px-3 py-2 flex justify-between ${visibility && 'active'}`}>
            <div className="message flex flex-col">
                <span className="capitalize ft-medium">{type}</span>
                <div className="text-sm ft-light text-[--contrast-color-offset]">{message}</div>
            </div>
            <IoClose className='opacity-80 cursor-pointer' onClick={() => { setVisibility(false) }} />
            <div className={`progress ${visibility && 'active'}`}></div>
        </motion.div>
    )
}