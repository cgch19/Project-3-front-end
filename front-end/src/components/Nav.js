import { Link } from "react-router-dom"

const Nav = (props) => {
  
  const loggedInLink = (
    <div>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  )

  const noAuthLinks = (
    <div>
    <Link to="/login" className="nav-link">Login</Link>
    <Link to="/signup" className="nav-link">Sign Up</Link>
    </div>
  )

  return (
    <nav  className="navbar">
      <div>
        <Link className="nav-link" to="/">Home</Link>
      </div>
      <div>
        {props.isLoggedIn ? loggedInLink : noAuthLinks}
      </div>
    </nav>
  )
}

export default Nav

// const Nav = () => {
//     console.log("Nav component is rendered");
//   return (
//     <nav className="navbar">
//     <div>
//       <Link to="/" className="nav-link">Home</Link>
//     </div>
//     <div>
//       <Link to="/login" className="nav-link">Login</Link>
//       <Link to="/signup" className="nav-link">Sign Up</Link>
//     </div>
//   </nav>
//   )
// } 