import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from "react-scroll";

function NavbarLandingPage() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["about", "dataset", "algoritma", "deployment"];
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="pb-20">
            <div className="navbar bg-base-100 fixed w-full z-50 bg-primary/10 backdrop-blur-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li className={`text-lg ${activeSection === 'about' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                                <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
                            </li>

                            <li className={`text-lg ${activeSection === 'dataset' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                                <ScrollLink to="dataset" smooth={true} duration={500}>Dataset</ScrollLink>
                            </li>

                            <li className={`text-lg ${activeSection === 'algoritma' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                                <ScrollLink to="algoritma" smooth={true} duration={500}>Algoritma</ScrollLink>
                            </li>

                            <li className={`text-lg ${activeSection === 'deployment' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                                <ScrollLink to="deployment" smooth={true} duration={500}>Deployment</ScrollLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex ml-20">
                        <p className="text-2xl font-extrabold">Chilitify</p>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 lg:flex lg:gap-5">
                        <li className={`text-lg ${activeSection === 'about' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
                        </li>
                        <li className={`text-lg ${activeSection === 'dataset' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <ScrollLink to="dataset" smooth={true} duration={500}>Dataset</ScrollLink>
                        </li>
                        <li className={`text-lg ${activeSection === 'algoritma' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <ScrollLink to="algoritma" smooth={true} duration={500}>Algoritma</ScrollLink>
                        </li>
                        <li className={`text-lg ${activeSection === 'deployment' ? 'bg-primary text-white rounded-lg font-semibold' : ''}`}>
                            <ScrollLink to="deployment" smooth={true} duration={500}>Deployment</ScrollLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar-end">
                    <div className="hidden md:flex mr-20">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarLandingPage;
