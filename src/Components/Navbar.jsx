import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = ["Home", "About", "Daily", "Hourly", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl relative left-[2vw] font-bold text-red-400 cursor-default">Climax</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link}
              to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
              className="hover:text-sky-400 hover:border-b-2 border-sky-400 transition duration-300"
            >
              {link}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-700">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <li key={link}>
                <Link
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="block text-gray-700 text-lg hover:text-sky-400 transition duration-300"
                  onClick={() => setMenuOpen(false)} // Close menu when clicking a link
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;


        {/* <button className='w-[10vw] bg-sky-400 none p-[0.7vw] text-white text-[1vw] cursor-pointer rounded-[50px] transition-colors duration-200 origin-bottom-left hover:bg-black hover:text-white'>
          Login/SignUp
          </button>
        <div className='min-h-[30px] min-w-[30px] border bg-white rounded-[50%]'></div> */}