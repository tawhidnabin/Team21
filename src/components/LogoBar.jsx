import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";  // Left logo
import secondLogo from "../assets/lsbu.png";  // Right logo

function LogoBar() {
  return (
    <div className="bg-gray-100 p-4 flex justify-between items-center">  {/* Off-white background */}
      {/* Left Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-12" />
      </Link>

      {/* Right Logo */}
      <div className="flex justify-end">
        <img src={secondLogo} alt="Second Logo" className="h-12" />
      </div>
    </div>
  );
}

export default LogoBar;
