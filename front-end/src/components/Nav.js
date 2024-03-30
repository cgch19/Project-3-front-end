import { Link } from "react-router-dom"
import React from "react"

const Nav = () => {
    console.log("Nav component is rendered");
  return (
    <nav className="navbar">
    <div>
      <Link to="/" className="nav-link">Home</Link>
    </div>
    <div>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/signup" className="nav-link">Sign Up</Link>
    </div>
  </nav>
  )
} 

export default Nav