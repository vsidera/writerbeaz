import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../Auth/Logout';
import logoheader from '../../images/assets/logonobg.png';
import { FaBookOpen } from 'react-icons/fa';
import Survey from '../Survey/Survey'; // Import the SurveyMonkeyEmbed component

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    const user = useSelector(state => state.user);

    const handleHover = () => {
        setHovered(!hovered);
    };

    return (
        <nav className="bg-gradient-to-b from-gray-100 to-gray-100 shadow-md" style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1000', padding:'10px'}}>
            <div className="md:flex items-center justify-between py-2 px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center">
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="block text-gray-100 hover:text-gray-100 focus:text-gray-700 focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg className="h-6 w-6 fill-current text-black" viewBox="0 0 24 24">
                                <path className="hidden" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
                                <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div style={{backgroundColor:'black', borderRadius:'0px'}} className="text-xl md:text-3xl">
                        <a style={{display:'flex'}} href="/" >
                            <img src={logoheader} alt='logo' style={{ height: '115px', width: 'auto', position:'absolute', transform: 'rotate(90deg)', marginLeft:'-48px', marginTop:'-30px' }}/>
                            <h1  className="header-logo1" style={{fontSize:'36px',padding:'0px', marginLeft:'50px'}} >WriterBeaz<FaBookOpen /> </h1></a>
                    </div>
                </div>

                <div className={`md:flex md:items-center ${menuOpen ? 'block' : 'hidden'}`}>
                    <div  className="text-gray-800 py-2 md:py-0 md:space-x-2">
                        <NavLink  to='/' className={`block md:inline font-bold text-black hover:bg-none hover:text-gray-900 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '/' ? 'bg-gray-100' : ''}`}>Home</NavLink>
                        {  (
                            <>
                                <a href='#services' spy={true}
                                smooth={true}
                                duration={500} className={`block md:inline font-bold text-black hover:bg-none hover:text-gray-900 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '#services' ? 'bg-black' : ''}`}>Our Services</a>
                                <a href='#about'  className={`block md:inline font-bold text-black hover:bg-none hover:text-gray-900 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '/signup' ? 'bg-black' : ''}`}>About Us</a>

                                <a href="#team" className={`block md:inline font-bold text-black hover:bg-none hover:text-gray-900 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '/signup' ? 'bg-black' : ''}`}>Our Team</a>
                            </>
                        )}
                        <a href="#testimony"  className={`block md:inline font-bold text-black hover:bg-none hover:text-gray-900 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '#testimonials' ? 'bg-black' : ''}`}>Testimonials</a>
                        <a href="https://blogs.writerbeaz.com" style={{marginRight:'100px'}} className={`block md:inline font-bold text-black hover:bg-none hover:text-gray-900 hover:font-extrabold py-2 px-2 md:py-0 rounded-md ${location.pathname === '/signup' ? 'bg-black' : ''}`}>Blog</a>
                        {  (
                            <>
                                <div className="relative inline-block text-left">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <div>

                                        </div>
                                    </button>
                                    {dropdownOpen && (
                                        <div className={`origin-top-right absolute md:right-0 ${menuOpen ? 'mt-2' : 'mt-4'} w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5`}>
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="about-menu">
                                                <NavLink
                                                    to="/profile"
                                                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/jfhbogmw.json"
                                                        trigger="hover"
                                                        colors="primary:#0000"
                                                        style={{width:"30px", height:"30px", paddingTop: "10px"}}
                                                    >
                                                    </lord-icon>

                                                </NavLink>
                                                <div>
                                                    <Logout />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {!user && (

                                    <>
                                        <NavLink   to="/login" style={{padding:'10px 30px 10px 30px', border: '1px solid gray'}} className={`block md:inline text-black hover:bg-gray-900 hover:text-gray-100 py-2 px-2 md:py-0 rounded-md ${location.pathname === '/login' ? 'bg-black' : ''} `}>Login </NavLink>
                                        <NavLink to="/signup" style={{padding:'11px 31px 11px 31px', border: 'none', background:'linear-gradient(to right, #AD9551, goldenrod'}} className={`block md:inline text-white hover:bg-gray-900 hover:text-gray-900  py-2 px-2 md:py-0 rounded-md ${location.pathname === '/signup' ? 'bg-black' : ''}`}>Signup</NavLink>
                                    </>)}
                            </>
                        )}
                    </div>
                </div>
                <div className="md:flex md:items-center justify-end">
                    <Survey style={{ padding: '10px 30px', border: '1px solid gray', backgroundColor: 'white', color: 'black', borderRadius: '5px' }} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
