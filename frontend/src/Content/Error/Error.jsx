import { Link, useRouteError } from 'react-router-dom'
import Astronaut from './Components/Astronaut';

function Error() {
    const error = useRouteError();
    const { status = 500, message = "Something went wrong !!" } = error;

    return (
        <div className='h-[100svh] flex flex-col md:flex-row items-center justify-center md:justify-start gap-6'>

            <div className='w-[100vw] sm:w-[70vw] md:w-[40vw] opacity-70'>
                <Astronaut />
            </div>

            <div className='ft-regular opacity-60 text-gray-800 flex flex-col items-center justify-center gap-2'>
                <h1 className='text-[100px] leading-none '>{status}</h1>
                <p className='text-center text-lg ft-semibold w-80'>{message}</p>
                <Link to={'/'}>
                    <button className='bg-[#07223D] text-white px-6 py-2 rounded-full mt-6'>Go Home</button>
                </Link>
            </div>
        </div>
    )
}

export default Error