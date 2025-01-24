import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Import Header
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <Header /> {/* Always render Header */}
      <main>
        <Outlet /> {/* Render current route's component */}
      </main>
      <Footer /> {/* Always render Footer */}
    </div>
  );
}

export default Layout;
