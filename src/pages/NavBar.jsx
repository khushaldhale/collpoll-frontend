import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="navbar-brand text-xl font-bold text-gray-800">
          Brand
        </Link>
        <div className="lg:hidden">
          <button
            className="text-gray-800 text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
        </div>
        <div
          className={`navbar-links lg:flex lg:items-center lg:space-x-4 absolute lg:static top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <Link
            to="/dashboard"
            className="block text-gray-800 hover:text-blue-500 p-2 lg:p-0"
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="block text-gray-800 hover:text-blue-500 p-2 lg:p-0"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block text-gray-800 hover:text-blue-500 p-2 lg:p-0"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
