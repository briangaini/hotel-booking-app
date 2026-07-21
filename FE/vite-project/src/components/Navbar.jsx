import React, { useState } from 'react'
import { NavLink } from "react-router-dom" 

import { IoClose, IoMenuSharp } from "react-icons/io5";
const navLists = [
    {name: "Home", path: "/"},
    {name: "About us", path: "/about-us"},
    {name: "Privacy Policy", path: "/privacy-policy"},
    {name: "Contact Us", path: "/contact-us"},
]

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const handleNavLinkClick = () => {
        setIsMenuOpen(false);
    };

  return (
    <header className='bg-white py-6 border'>
        <nav className='container mx-auto flex justify-between px-5'>
            <a href="/">
                <img src="/logo for hotel rooftops project.png" alt=""  className='h-12'/>
            </a>
            <ul className="sm:flex hidden items-center gap-8"> {/* Added flex classes for proper layout */}
                {
                    navLists.map((list, index) => (
                        <li key={index}> {/* Added key for React list rendering */}
                            {/* FIXED PATH: Uses backticks (`) for the template literal */}
                            <NavLink to={`${list.path}`} className="hover:text-blue-500 transition duration-150"> 
                                {list.name}
                            </NavLink>
                        </li>
                    ))
                }
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>

            {/* toggle menu */}
            <div className='flex items-center sm:hidden'>
                <button 
                onClick={toggleMenu}
                className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'>
                    {
                        isMenuOpen ? <IoClose className='size-6'/>: <IoMenuSharp  className='size-6'/>
                    }
                </button>
            </div>
        </nav>

        {/* mobile menu items */}
        {
            isMenuOpen && (
                <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50"> {/* Added flex classes for proper layout */}
                {
                    navLists.map((list, index) => (
                        <li className='mt-5 px-4' 
                        key={index}> 
                        <NavLink 
                            to={list.path} 
                            onClick={handleNavLinkClick} 
                            className="block py-2 text-lg text-gray-800 hover:text-blue-500 transition duration-150"
                        > 
                            {list.name}
                        </NavLink>
                        </li>
                    ))
                }
                <li className='px-4 mt-5'>
                    <NavLink to="/login">Login</NavLink>
                </li>
            </ul>
            )
        }
    </header> 
  )
}

export default Navbar