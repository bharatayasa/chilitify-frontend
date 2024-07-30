import { Link } from "react-router-dom";

export default function index() {
    return (
        <div>
            <div>
                <button>
                    <Link to="/register">REGISTER</Link>
                </button>
                <button>
                    <Link to="/login">LOGIN</Link>
                </button>
            </div>
        </div>
    )
}
