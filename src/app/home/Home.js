import React, { useState } from "react";
import HeroBg from "./hero-bg.png"; // Background image path
import {
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center flex flex-col"
      style={{
        backgroundImage: `url(${HeroBg})`,
      }}
    >
      {/* Header Section */}
      <header className="bg-blue-900 bg-opacity-90 text-white">
        <div className="flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <div className="text-2xl font-bold">VI-Sap</div>

          {/* Navigation Links for Large Devices */}
          <nav className="hidden lg:flex space-x-6 text-lg">
            <a href="#gallery" className="hover:text-blue-400">
              Gallery
            </a>
            <a href="#myspace" className="hover:text-blue-400">
              MySpace
            </a>
            <a href="#collaboration" className="hover:text-blue-400">
              Collaboration
            </a>
            <a href="#group" className="hover:text-blue-400">
              Group
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <FaSearch className="text-white" />
          </div>

          {/* Hamburger Menu for Small Devices */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <FaUserCircle
              className="text-3xl cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <nav className="lg:hidden bg-blue-800 text-white text-lg">
            <a href="#gallery" className="block px-6 py-2 hover:bg-blue-700">
              Gallery
            </a>
            <a href="#myspace" className="block px-6 py-2 hover:bg-blue-700">
              MySpace
            </a>
            <a
              href="#collaboration"
              className="block px-6 py-2 hover:bg-blue-700"
            >
              Collaboration
            </a>
            <a href="#group" className="block px-6 py-2 hover:bg-blue-700">
              Group
            </a>
          </nav>
        )}
      </header>

      {/* Main Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-32 py-[10rem] text-center lg:text-left">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-white">VI-Sap</h1>
          <p className="text-gray-300">
            Explicabo esse amet tempora quibusdam laudantium, laborum eaque
            magnam fugiat hic? Esse dicta aliquid error repudiandae earum
            suscipit fugiat molestias, veniam, vel architecto veritatis delectus
            repellat modi impedit sequi.
          </p>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          {/* Placeholder for illustration */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
