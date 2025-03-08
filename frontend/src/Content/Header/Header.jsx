import { GoogleLogin } from '@react-oauth/google';
import LightMode from './components/LightMode';
import Login from './components/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from '../../Store/User.js/UserSlice';

export default function Header() {

    const navigate = useNavigate();

    const dispatch = useDispatch();   // To set Global variable setUser

    const user = useSelector((state) => state.userReducer.user);
    // console.log(user);

    const handleLogout = () => {       
        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Reset Redux state
        dispatch(clearUser());

        navigate("/")
    }

    return(
        <section className='fixed left-0 mb-10 w-[100vw] bg-[--background-color] z-10 transition-theme'>
            <div className="flex justify-between h-20 px-10 py-5">
                <Link to={"/"}>
                    <div className="bg-[image:--highlight-gradient] text-white text-2xl leading-5 p-2 font-bold ml-[-2.5rem] pl-10">Ferrum Web</div>
                </Link>

                <div className='flex items-center gap-5'>
                    {/* <Login /> */}
                    {(user === null)
                        ? <Login />
                        : 
                        <>
                            <Link to={"/dashboard"} className='font-semibold hover:text-[color:--highlight-hover-color]'>{"Welcome, " + user}</Link>
                            <button 
                                className="cursor-pointer bg-[--highlight-color] text-[--background-color] font-bold py-2 px-4 rounded-md hover:bg-[--highlight-hover-color] transition-theme"
                                onClick={handleLogout}
                            >Logout</button>
                        </>
                    }

                    <LightMode/>
                    
                    {/* Goggle Authentication Button */}
                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />  */}
                </div>

            </div>
            <div className='h-[3px] w-full bg-[image:--highlight-gradient]'></div>
        </section>
    )
}