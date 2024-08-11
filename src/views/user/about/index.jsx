import React from 'react'
import NavbarMenu from '../../../components/NavbarMenu'
import Foooter from '../../../components/FoooterUser';
import Algoritma from "../../home/homeComponents/Algoritma";
import Banner from "../../home/homeComponents/Banner";
import Dataset from "../../home/homeComponents/Dataset";

export default function About() {
    return (
        <div>
            <div>
                <NavbarMenu />
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
            <div>
                <Foooter />
            </div>
        </div>
    )
}
