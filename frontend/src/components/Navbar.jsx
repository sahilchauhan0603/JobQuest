import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setShowNavbar(false);
      } else {
        // Scrolling up or near top
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${showNavbar ? "navbar-visible" : "navbar-hidden"} ${showMenu ? "show_navbar" : ""}`}>
      <div className="logo">
        <img src="/logo1.png" alt="logo" />
      </div>

      <div className="links">
        <ul>
          <li>
            <Link to={"/"} onClick={() => setShowMenu(!showMenu)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/jobs"} onClick={() => setShowMenu(!showMenu)}>
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setShowMenu(!showMenu)}>
              About
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to={"/dashboard"} onClick={() => setShowMenu(!showMenu)}>
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to={"/login"} onClick={() => setShowMenu(!showMenu)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <GiHamburgerMenu className="hamburger" onClick={() => setShowMenu(!showMenu)} />
    </nav>
  );
};

export default Navbar;
