import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Nav = (props) => {
  const navigate = useNavigate();

  const handleCreateArtist = () => {
    navigate("/create-artist");
  };

  const handleSearchAlbum = () => {
    navigate("/Album")
  }

  const loggedInLink = (
    <div className="popup">
      <button onClick={props.handleLogout} className="nav-button">Logout</button>
      <button onClick={handleCreateArtist} className="nav-button">Create Artist</button>
      <button onClick={handleSearchAlbum} className="nav-button">Search Album</button>
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
                  <button onClick={close} className="popup-button">Close Menu</button>
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

export default Nav;


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