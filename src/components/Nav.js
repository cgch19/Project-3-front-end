import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState } from 'react';
import { Button } from "react-bulma-components"


const Nav = (props) => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false); 

  const handleCreateArtist = () => {
    navigate("/createartist");
    setPopupOpen(false);
  }

  const handleSearchAlbum = () => {
    navigate("/Album");
    setPopupOpen(false);
    
  }
  const handleFavoriteArtist = () => {
    navigate("/favoriteartist");
    setPopupOpen(false);
  }

  const loggedInLink = (
    <span >
      {/* <Button onClick={handleSearchAlbum} className="nav-button">Search Album🔍</Button> */}
       {/* <Button onClick={() => { handleSearchAlbum(); setPopupOpen(false); }} className="nav-button">Search Album🔍</Button>
      <button onClick={handleFavoriteArtist} className="nav-button">Favorite Artists</button>
      <button onClick={handleCreateArtist} className="nav-button">Create Artist</button> */}
      {/* <button  onClick={props.handleLogout} className="nav-button">Logout</button> */}
    </span>
  )

  return (
    <nav className="navbar">
      <div>
        <Link className="nav-button" to="/">Home</Link>
      </div>
      <div>
        {props.isLoggedIn ? (
          <Popup
            trigger={<button className="nav-button" onClick={() => setPopupOpen(!popupOpen)}>Menu</button>}
            modal
            nested
            open={popupOpen}
            onClose={() => {
              console.log("Closing popup...");
              setPopupOpen(false);
            }} 
          >
            {close => (
              <div className='modal'>
                <div className='content'>
                  {loggedInLink}
                </div>
                <div className="popup">
                <Button onClick={() => { close(); handleSearchAlbum(); setPopupOpen(false); }} className="nav-button">Search Album🔍</Button>
                <Button onClick={() => { close(); handleFavoriteArtist(); setPopupOpen(false); }} className="nav-button">Favorite Artists</Button>
                <Button onClick={() => { close(); handleCreateArtist(); setPopupOpen(false); }} className="nav-button">Create Artist</Button>
                <button  onClick={props.handleLogout} className="nav-button">Logout</button>
                {/* <Button onClick={() => {close(); setPopupOpen(false);}} className="close-menu">Close Menu</Button> */}
                </div>
              </div>
            )}
          </Popup>
        ) : (
          <div>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button">Sign Up</Link>
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