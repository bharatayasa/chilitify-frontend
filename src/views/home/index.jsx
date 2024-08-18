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
                <section id="about">
                    <Banner />
                </section>
                <section id="dataset">
                    <Dataset />
                </section>
                <section id="algoritma">
                    <Algoritma />
                </section>
            </div>
        </div>
    )
}
