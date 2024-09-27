import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">M2M</h1>
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded transition duration-300 ${isActive ? 'bg-purple-700' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mentors"
            className={({ isActive }) => 
              `text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded transition duration-300 ${isActive ? 'bg-purple-700' : ''}`
            }
          >
            For Mentees
          </NavLink>
          <NavLink
            to="/mentees"
            className={({ isActive }) => 
              `text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded transition duration-300 ${isActive ? 'bg-purple-700' : ''}`
            }
          >
            For Mentors
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => 
              `text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded transition duration-300 ${isActive ? 'bg-purple-700' : ''}`
            }
          >
            Registration
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => 
              `text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded transition duration-300 ${isActive ? 'bg-purple-700' : ''}`
            }
          >
            Login
          </NavLink>
        </div>
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-purple-700">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `block text-white hover:bg-purple-600 px-3 py-2 transition duration-300 ${isActive ? 'bg-purple-600' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mentors"
            className={({ isActive }) => 
              `block text-white hover:bg-purple-600 px-3 py-2 transition duration-300 ${isActive ? 'bg-purple-600' : ''}`
            }
          >
            For Mentees
          </NavLink>
          <NavLink
            to="/mentees"
            className={({ isActive }) => 
              `block text-white hover:bg-purple-600 px-3 py-2 transition duration-300 ${isActive ? 'bg-purple-600' : ''}`
            }
          >
            For Mentors
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => 
              `block text-white hover:bg-purple-600 px-3 py-2 transition duration-300 ${isActive ? 'bg-purple-600' : ''}`
            }
          >
            Registration
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => 
              `block text-white hover:bg-purple-600 px-3 py-2 transition duration-300 ${isActive ? 'bg-purple-600' : ''}`
            }
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
