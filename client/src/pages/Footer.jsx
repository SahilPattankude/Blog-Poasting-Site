import React from 'react'
import { Link,useLocation } from 'react-router-dom'

function Footer() {
  const location   = useLocation();

  // Render Footer only on the home page ("/")
  if (location.pathname !== "/") {
    return null;
  }
  return (
    <footer className="footer">
    <div className="footer-container">
      <ul className="footer-menu">
        <li><Link to={"posts/categories/:Education"}>Education</Link></li>
        <li><Link to={"posts/categories/:Business"}>Business</Link></li>
        <li><Link to={"posts/categories/:Politics"}>Politics</Link></li>
        <li><Link to={"posts/categories/:Medical"}>Medical</Link></li>
        <li><Link to={"posts/categories/:Bollywood"}>Bollywood</Link></li>
      </ul>
      <div className="footer-bottom">
        <small>All rights reserved</small>
      </div>
    </div>
  </footer>
    
  )
}

export default Footer
