import NavbarLandingPage from "../../components/NavbarLandingPage";
import Algoritma from "./homeComponents/Algoritma";
import Banner from "./homeComponents/Banner";
import Dataset from "./homeComponents/Dataset";

export default function Home() {
    return (
        <div>
            <div>
                <NavbarLandingPage />
            </div>
            <div>
                <Banner />
            </div>
            <div>
                <Dataset />
            </div>
            <div>
                <Algoritma />
            </div>
        </div>
    )
}
