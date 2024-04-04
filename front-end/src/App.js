import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile';
import CreateArtist from './pages/FavoriteArtistForm';
import Index from './pages/Index';
import Show from './pages/Show';
import Album from './pages/Album';
import { useEffect, useState, createContext } from 'react';
import './App.css';

export const ArtistContext = createContext(null);

function App() {

  // below this line, it's the login and signup functions
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"))
  const navigate = useNavigate()
  const URL = "http://localhost:4000/api/"


  const handleLogin = async (user) => {
    const response = await fetch(URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    if (response.status !== 200) {
      return data;
    }
    localStorage.setItem("authToken", data.token);
    setIsLoggedIn(true);

    navigate(`/profile/${data.id}`);
  };

  const handleSignUp = async (user) => {
    const response = await fetch(URL + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data);
    navigate("/login");
  };

  const handleLogout = () => {
    console.log(" in handle log");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const response = await fetch(URL + `user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        }
      });
      const data = await response.json();
      setUser(data.data);
    } else {
      console.log("no token");
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("authToken");

    if (!token) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);


  // Below this line, it's the CRUD operations for the favorite artists
  const [artists, setArtists] = useState(null)
    
  const getArtist = async () => {
    if (!isLoggedIn) {
        console.log("User is not logged in. Cannot fetch artists.");
        return;
    }
    const response = await fetch(`${URL}favoriteArtist`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("authToken")}`
      }
    });
    const data = await response.json();
    setArtists(data.data);
    console.log("Artists fetched successfully.");
}

const createArtist = async (artist) => {
    if (!isLoggedIn) {
        console.log("User is not logged in. Cannot create artist.");
        return;
    }
    await fetch(`${URL}favoriteArtist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(artist),
    }).then((response) => {
        if (response.ok) {
            console.log("Artist created successfully.");
            getArtist()
            
        } else {
            console.log("Failed to create artist.");
        }
    });
}

const updateArtist = async (artist, id) => {
    if (!isLoggedIn) {
        console.log("User is not logged in. Cannot update artist.");
        return;
    }
    await fetch(`${URL}favoriteArtist/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(artist),
    }).then((response) => {
        if (response.ok) {
            console.log("Artist updated successfully.");
        } else {
            console.log("Failed to update artist.");
        }
    });
    getArtist();
}

const deleteArtist = async (id) => {
    if (!isLoggedIn) {
        console.log("User is not logged in. Cannot delete artist.");
        return;
    }
    await fetch(`${URL}favoriteArtist/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
    }).then((response) => {
        if (response.ok) {
            console.log("Artist deleted successfully.");
        } else {
            console.log("Failed to delete artist.");
        }
    });
    getArtist();
}

  return (
    <div className="App">

      <ArtistContext.Provider value={{artists, createArtist, updateArtist, deleteArtist}}>

      <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
        <Route path="/profile/:id" element={<Profile fetchUser={fetchUser} user={user}/>}/>
        <Route path="/createArtist" element={<CreateArtist createArtist={createArtist} />} />
        <Route path="/favoriteArtist" element={<Index />} />  
        <Route path="/favoriteArtist/:id" element={<Show artists={artists} updateArtist={updateArtist} deleteArtist={deleteArtist} />} />
        <Route path="/album" element={<Album />} />

      </Routes>

      </ArtistContext.Provider>
    </div>
  );
}


export default App;
