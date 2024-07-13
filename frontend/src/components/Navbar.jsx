import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

// react icons
//import { FaBook } from "react-icons/fa6";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import logo from '../assets/bestbookcenter.png'


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);


    // toggle Menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrolly > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.addEventListener("scroll", handleScroll)
        }
    },)

    // NavItems here 

    const navItems = [
        { link: "Home", path: "/" },
        { link: "About", path: "/about" },
        { link: "Shop", path: "/shop" },
        { link: "Rare books", path: "/" },
        //{link: "Rare books", path: "/admin/dashboard"},
        { link: "Blog", path: "/blog" }
    ]

    return (
        <header className='w-full bg-transparent fixed top-0 right-0 transition-all ease-in duration-300'>

            <nav className={`py-4 lg:px-24 justify-center ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-400" : "bg-orange-200"} text-white`}>

                <div className='flex justify-between items-center text-base gap-8'>
                    <img src={logo} alt="Best Book Center Logo" className='h-12 w-18 mr-3' />
                    {/* <Link to="/"className='text-2xl font-bold text-green-600 flex items-center gap-2'> <FaBook className='inline-block'/> Best Books Center </Link> */}

                    {/* nav items for large device */}

                    <ul className='md:flex space-x-12 hidden'>
                        {
                            navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'> {link}</Link>)
                        }
                    </ul>

                    {/* {btn for large devices} */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        <button><FaBarsStaggered className='w-5 hover:text-blue-700' /></button>
                    </div>

                    {/* {menu btn for the mobile devices} */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {
                                isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />
                            }
                        </button>
                    </div>
                </div>

                {/* navitems for sm devices */}

                <div className={`space-y-4 px-4 mt-12 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {
                        navItems.map(({ link, path }) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer '> {link}</Link>)
                    }
                </div>

            </nav>
        </header>
    )
}

export default Navbar