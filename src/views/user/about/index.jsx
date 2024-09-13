import React from 'react'
import NavbarMenu from '../../../components/NavbarMenu'
import Foooter from '../../../components/FoooterUser';
import Algoritma from "../../home/homeComponents/Algoritma";
import BannerAbout from '../../home/homeComponents/BannerAbout';
import Dataset from "../../home/homeComponents/Dataset";
import Deployment from '../../home/homeComponents/Deployment';

export default function About() {
    return (
        <div>
            <div>
                <NavbarMenu />
            </div>
            <div>
                <BannerAbout />
            </div>
            <div>
                <Dataset />
            </div>
            <div>
                <Algoritma />
            </div>
            <div>
                <Deployment />
            </div>
            <div>
                <Foooter />
            </div>
        </div>
    )
}
