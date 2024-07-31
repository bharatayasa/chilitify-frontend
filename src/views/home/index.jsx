import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="container mx-auto">
            <div className="bg-slate-500 flex gap-5">
                <div>
                    <Link to="/register">Register</Link>
                </div>

                <div>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}
