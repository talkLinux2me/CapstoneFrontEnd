import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">M2M</h1>
        <div className="hidden md:flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mentors"
            className={({ isActive }) => 
              `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : ''}`
            }
          >
            For Mentees
          </NavLink>
          <NavLink
            to="/mentees"
            className={({ isActive }) => 
              `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : ''}`
            }
          >
            For Mentors
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => 
              `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : ''}`
            }
          >
            Registration
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => 
              `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : ''}`
            }
          >
            Login
          </NavLink>
          {/* <NavLink to="/profile" className={({ isActive }) => 
            `text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded ${isActive ? 'bg-gray-700 text-white' : ''}`
          }>
            Profile
          </NavLink> */}
        </div>
        <button 
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `block text-gray-300 hover:bg-gray-600 px-3 py-2 ${isActive ? 'bg-gray-600' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/mentors"
            className={({ isActive }) => 
              `block text-gray-300 hover:bg-gray-600 px-3 py-2 ${isActive ? 'bg-gray-600' : ''}`
            }
          >
            For Mentees
          </NavLink>
          <NavLink
            to="/mentees"
            className={({ isActive }) => 
              `block text-gray-300 hover:bg-gray-600 px-3 py-2 ${isActive ? 'bg-gray-600' : ''}`
            }
          >
            For Mentors
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => 
              `block text-gray-300 hover:bg-gray-600 px-3 py-2 ${isActive ? 'bg-gray-600' : ''}`
            }
          >
            Registration
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => 
              `block text-gray-300 hover:bg-gray-600 px-3 py-2 ${isActive ? 'bg-gray-600' : ''}`
            }
          >
            Login
          </NavLink>
          {/* <NavLink to="/profile" className={({ isActive }) => 
            `block text-gray-300 hover:bg-gray-600 px-3 py-2 ${isActive ? 'bg-gray-600' : ''}`
          }>
            Profile
          </NavLink> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
