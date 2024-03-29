import { Link } from "react-router-dom"

const Nav = (props) => {
   const loggedInLink = (
     <div>
        <button id="logout-btn" onClick={props.handleLogout}>Logout</button>
     </div>
    )
    const noAuthLinks = (
        <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </div>
    )

  return (
    <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                {props.isLoggedIn ? loggedInLink : noAuthLinks}
            </div>
        </nav>
  )
} 

export default Nav