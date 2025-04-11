import React from "react";
import LogoBar from "./LogoBar"; // Import LogoBar

function Layout({ children }) {
  return (
    <div>
      <LogoBar /> {/* Include LogoBar at the top */}
      <div className="p-6">{children}</div> {/* Page content goes here */}
    </div>
  );
}

export default Layout;
