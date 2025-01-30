import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div>
          <img src="/logo1.png" alt="logo" />
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>Street No.87 Paschim Vihar, Delhi, India</li>
            <li>jobquest@gmail.com</li>
            <li>+91 8765245311</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li to={"/"}>
              <Link to={"/"}>Home</Link>
            </li>
            <li to={"/jobs"}>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"https://twitter.com/TheSahil061003"}>
                <span>
                  <FaSquareXTwitter />
                </span>
                <span>Twitter (X)</span>
              </Link>
            </li>
            <li>
              <Link to={"https://www.instagram.com/sahilchauhan0603/"}>
                <span>
                  <FaSquareInstagram />
                </span>
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to={"mailto:sahilchauhan0603@gmail.com"}>
                <span>
                  <FaYoutube />
                </span>
                <span>Gmail</span>
              </Link>
            </li>
            <li>
              <Link to={"https://linkedin.com/in/sahil-chauhan-a6a626265"}>
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright">
        &copy; CopyRight 2025. All Rights Reserved By JobQuest
      </div>
    </>
  );
};

export default Footer;
