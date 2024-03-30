import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Nav = (props) => {

  const loggedInLink = (
    <div>
      <button onClick={props.handleLogout} className="logout-button">Logout</button>
      <button onClick={props.handleFavoriteArtist} className="nav-button">Favorite Artist</button>
      <button onClick={props.handleCreateArtist} className="nav-button">Create Artist</button>
      <Link to="/searchAlbum" className="nav-link">Search Album</Link>
    </div>
  )


  const noAuthLinks = (
    <div>
    <Link to="/login" className="nav-link">Login</Link>
    <Link to="/signup" className="nav-link">Sign Up</Link>
    </div>
  )

  return (
    <nav className="navbar">
      <div>
        <Link className="nav-link" to="/">Home</Link>
      </div>
      <div>
        {props.isLoggedIn ? (
          <Popup
            trigger={<button className="nav-button">Menu</button>}
            modal
            nested
          >
            {close => (
              <div className='modal'>
                <div className='content'>
                  {loggedInLink}
                </div>
                <div>
                  <button onClick={close}>Close Menu</button>
                </div>
              </div>
            )}
          </Popup>
        ) : (
          <div>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </div>
        )}
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