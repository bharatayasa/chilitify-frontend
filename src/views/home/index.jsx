import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div>
                <Link to="/register">REGISTER</Link>
                <Link to="/login">LOGIN</Link>
            </div>
        </div>
    )
}
