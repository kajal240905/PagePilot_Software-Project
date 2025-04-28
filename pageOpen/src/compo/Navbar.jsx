import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 p-4 flex justify-between items-center transition-all duration-500 ${
        isScrolled
          ? "bg-white text-green-900 shadow-md py-2"
          : "bg-gradient-to-r from-[#14532d] to-[#4d5f28] text-white py-3"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="src/assets/NitLogo.webp"
          alt="Library Logo"
          className="h-16 w-28 mr-3 transition-transform duration-300 hover:scale-105 rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">NIT Uttarakhand</h1>
          <p className="text-md font-medium italic">Welcome to NITUK Library 📖</p>
        </div>
      </div>

      {/* Nav Links */}
      <div className="space-x-6 text-base flex items-center font-medium">
        {["Home", "About", "Others", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase()}`}
            className="relative group px-1 transition-colors duration-300"
            activeClassName="text-lime-100 underline"  // Apply underline on active
            exact
          >
            <span className="group-hover:text-lime-100">{item}</span>
          </NavLink>
        ))}

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-white text-green-800 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-green-100 transition duration-300 transform hover:scale-105"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
