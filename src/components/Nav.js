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
    navigate("/artist");
    setPopupOpen(false);
    
  }
  const handleFavoriteArtist = () => {
    navigate("/favoriteartist");
    setPopupOpen(false);
  }

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
                </div>
                <div className="popup">
                {/* <Button onClick={() => { close(); handleSearchAlbum(); setPopupOpen(false); }} className="nav-button">Search Artist🔍</Button> */}
                <Button onClick={() => { close(); handleFavoriteArtist(); setPopupOpen(false); }} className="nav-button">Favorite Artists</Button>
                <Button onClick={() => { close(); handleCreateArtist(); setPopupOpen(false); }} className="nav-button">Create Artist</Button>
                <button  onClick={props.handleLogout} className="nav-button">Logout</button>
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


