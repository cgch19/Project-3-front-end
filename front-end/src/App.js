import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import CreateArtist from './pages/FavoriteArtistForm';
import Album from './pages/Album';
import { useEffect, useState, createContext } from 'react';
import './App.css';

export const ArtistContext = createContext(null)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const URL = "http://localhost:4000/api/"

  const handleLogin = async(user) => {
    const response = await fetch(URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    if(response.status !== 200) {
      return data
    }
    localStorage.setItem("authToken", data.token)
    setIsLoggedIn(true)

    navigate(`/profile/${data.id}`)
  }

  const handleSignUp = async(user) => {
    const response = await fetch(URL + "auth/signup", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    })
    const data = await response.json()
    console.log(data)
    navigate("/login")
  }

  const handleLogout = () => {
    console.log(" in handle log")
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    navigate("/")
  }

  const [user, setUser] = useState(null)

  const fetchUser = async(id) => {
    const token = localStorage.getItem("authToken")
    if(token) {
      const response = await fetch(URL + `user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        }
      })
      const data = await response.json()
      setUser(data.data)
    }else {
      console.log("no token")
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("authToken")

    if(!token) {
      setIsLoggedIn(false)
    }else {
      setIsLoggedIn(true)
    }
  }, [])

  // Below is the CRUD artist code
  const [artists, setArtists] = useState(null)
    
  const getArtist = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setArtists(data.data);
  }

  const createArtist = async (artist) => {
      await fetch(URL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(artist),
      })
      getArtist()
  }

  const updateArtist = async (artist, id) => {
      await fetch(URL + id, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(artist),
      });
      getArtist();
  }

  const deleteArtist = async (id) => {
      await fetch(URL + id, {
          method: "DELETE",
      });
      getArtist();
  }

  useEffect(() => {
      getArtist();
  }, []);


  return (
    <div className="App">
      <ArtistContext.Provider value={{artists}}>

      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
        <Route path="/profile/:id" element={<Profile fetchUser={fetchUser} user={user}/>}/>
        <Route path="/createArtist" element={<CreateArtist createArtist={createArtist} />} />
        <Route path="/searchAlbum" element={<Album />} />
        <Route path="/album" element={<Album />} />
        <Route path="/create-artist" element={<CreateArtist createArtist={createArtist} />} />
      </Routes>
      </ArtistContext.Provider>
    </div>
  );
}

export default App;
