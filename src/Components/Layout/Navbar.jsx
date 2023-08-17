import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Auth/Logout';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useSelector(state => state.user);
    const emailAddress = useSelector(state => state.emailAddress);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-cyan-600 to-blue-700 shadow-lg">
            <div className="md:flex items-center justify-between py-2 px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center">
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="block text-gray-800 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
                                <path className="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
                                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className="text-xl md:text-3xl">
                        <a href="/">
                            <span class="logo-letter font-bold text-white">w</span>
                            <lord-icon
                                src="https://cdn.lordicon.com/dycatgju.json"
                                trigger="loop"
                                delay="2000"
                                colors="primary:#ffffff"
                                style={{width: "25px", height: "25px", paddingTop: "4px"}}>
                            </lord-icon>
                            <span class="logo-letter font-bold text-white">rkX</span>
                        </a>
                    </div>
                </div>

                <div className={`md:flex md:items-center ${menuOpen ? 'block' : 'hidden'}`}>
                    <div className="text-gray-800 py-2 md:py-0 md:space-x-2">
                        <NavLink to='/' className="block md:inline font-bold text-white hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md">Home</NavLink>
                        <NavLink to='/' className="block md:inline font-bold text-white hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md">Find Freelancer</NavLink>
                        <NavLink to='/' className="block md:inline font-bold text-white hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md">Become a Seller</NavLink>
                        <NavLink to='/' className="block md:inline font-bold text-white hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md">About</NavLink>
                        {user ? (
                        <>
                            <div className="relative inline-block text-left">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div>
                                        <lord-icon
                                            src="https://cdn.lordicon.com/hbvyhtse.json"
                                            trigger="hover"
                                            colors="primary:#ffffff"
                                            style={{width:"50px", height:"30px", paddingTop:"7px"}}>
                                        </lord-icon>
                                    </div>
                                </button>
                                {dropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="about-menu">
                                            <NavLink
                                                to="/about"
                                                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jfhbogmw.json"
                                                    trigger="hover"
                                                    colors="primary:#0000"
                                                    style={{width:"30px", height:"30px", paddingTop: "10px"}}>
                                                </lord-icon>
                                                {user.username}
                                            </NavLink>
                                            <div
                                                className="block px-4 py-2 text-base font-medium text-red-500 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jfhbogmw.json"
                                                    trigger="loop"
                                                    colors="primary:#c71f16"
                                                    style={{width:"30px", height:"30px", paddingTop: "10px"}}>
                                                </lord-icon>
                                                <Logout />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                        ) : (
                            <>
                                <NavLink to="/login" className="block md:inline font-bold text-white hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md">Login</NavLink>
                                <NavLink to="/signup" className="block md:inline font-bold text-white hover:bg-gray-900 hover:text-gray-100 hover:font-extrabold py-2 px-2 md:py-0 rounded-md">Signup</NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;