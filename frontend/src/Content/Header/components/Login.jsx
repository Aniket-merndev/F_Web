import { Link } from "react-router-dom";
import Button from "../../Components/Button";

export default function Login(){
    return (
        <Link to="/login">
            <Button text={"Login"}/>
        </Link>
    )
}