import React, { useState } from "react";
const logo = new URL("../../assets/images/logofoodsite.png", import.meta.url).href;
import { Link } from "react-router-dom";
import useOnlinestatus from "../../utils/useOnlinestatus";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

  const NavComponent = () => {
  const [btnNameReact, setbtnNameReact] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);
  const isOnline = useOnlinestatus();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-orange-100 shadow-lg px-4 md:px-10 py-4 relative">
      {/* Logo */}
     
      <div className="flex items-center w-full md:w-auto justify-between">
        <img className="w-24 h-auto object-contain" alt="logo" src={logo} />
        {/* Hamburger Icon */}
        <button
          className="md:hidden text-orange-600 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Nav Links */}
      <nav
        className={`
          nav-items w-full md:w-auto
          ${menuOpen ? "block" : "hidden"}
          md:block
        `}
      >
        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-4 md:mt-0 bg-orange-50 md:bg-transparent p-4 md:p-0 rounded md:rounded-none shadow md:shadow-none">
          <li>
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition" onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 font-medium transition" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition" onClick={() => setMenuOpen(false)}>Cart</Link>
          </li>
          <li>
            <Link to="/grocery" className="text-gray-700 hover:text-orange-600 font-medium transition" onClick={() => setMenuOpen(false)}>Grocery</Link>
          </li>
          <li>
            <button
              className="bg-orange-500 text-white px-4 py-1 rounded-md shadow hover:bg-pink-600 transition font-semibold"
              onClick={() => {
                setbtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                setMenuOpen(false);
              }}
            >
              {btnNameReact}
            </button>
          </li>
          <li>
            {isOnline ? (
              <FontAwesomeIcon icon={faCircle} style={{ color: 'green', fontSize: '14px' }} />
            ) : (
              <FontAwesomeIcon icon={faCircle} style={{ color: 'red', fontSize: '14px' }} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Header = () => {
  return (
    <header className="w-full">
      <NavComponent />
    </header>
  );
};

export default Header;