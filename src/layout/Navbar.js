import React from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Navbar({title}) {
  
  return (
    
    <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark mb-3 p-3">
      <a href="/" className="navbar-brand">{title}</a>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <Link to = "/" className = "nav-link">Aktive</Link>
        </li>
        <li className="nav-item active">
          <Link to = "/" className = "nav-link">Ana Sayfa</Link>
        </li>
        <li className="nav-item active">
          <Link to="/list" className="nav-link">
            Personel Listesi 
          </Link>
        </li>
        <li className="nav-item active">
          <Link to = "/add" className = "nav-link">Personel Ekle</Link>
       </li>
       <li className="nav-item active">
          <Link to = "/about" className = "nav-link">Hakkımızda</Link>
       </li>
      
      </ul>
    
    </nav>
    
  )
}
Navbar.propTypes = {
  title : PropTypes.string.isRequired
}
Navbar.defaultProps = {
  title : "Default App"
}
export default Navbar;
