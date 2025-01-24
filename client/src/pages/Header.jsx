import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App';

function Header() {
  const { user } = useContext(UserContext); // Access global username

    return (
        <nav className="header-container">
          <div className="header-logo">
            <h1 className="header-title">BlogMaker</h1>
          </div>
    
          <ul className="navbar-menu">
            <li className="menu-item">
              <Link to={`"/profile/${user.username}"`} className="menu-link">{user.username}</Link>
            </li>
            <li className="menu-item">
              <Link to="/create" className="menu-link">Create Post</Link>
            </li>
            <li className="menu-item">
              <Link to="/login" className="menu-link">LogOut</Link>
            </li>
          </ul>
        </nav>
      );
}

export default Header
