import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Error from "./Content/Error/Error";
import Home from "./Content/Home/Home";
import Stats from "./Content/DisplayPage/Stats";
import UploadFile from "./Content/UploadFile/UploadFile";
import Login from "./Content/Login/Login";
import SignUp from "./Content/Login/SignUp";
import Bus from "./utils/Bus";
import Dashboard from "./Content/Dashboard/Dashboard";

window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index element={<Home />} />
            <Route path="display" element={<Stats />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />}/>

            <Route
                path="*"
                loader={() => {
                throw { status: 404, message: "Page Not Found" };
                }}
            />

            <Route path="upload" element={<UploadFile />} />
        </Route>
    )
)