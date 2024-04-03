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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const URL = "http://localhost:4000/api/";

  const handleLogin = async (user) => {
    try {
      const response = await fetch(URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("authToken", data.token);
      setIsLoggedIn(true);
      navigate(`/profile/${data.id}`);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleSignUp = async (user) => {
    try {
      const response = await fetch(URL + "auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      navigate("/login");
    } catch (error) {
      console.error("Sign up failed:", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await fetch(URL + `user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": token
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setUser(data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error.message);
      }
    } else {
      console.log("No token found.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const [artists, setArtists] = useState(null);

  const getArtist = async () => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot fetch artists.");
      return;
    }
    try {
      const response = await fetch(`${URL}favoriteArtist`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setArtists(data.data);
      console.log("Artists fetched successfully.");
    } catch (error) {
      console.error("Failed to fetch artists:", error.message);
    }
  };

  const createArtist = async (artist) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot create artist.");
      return;
    }
    try {
      const response = await fetch(`${URL}favoriteArtist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(artist),
      });
      if (!response.ok) {
        throw new Error("Failed to create artist.");
      }
      console.log("Artist created successfully.");
      getArtist();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateArtist = async (artist, id) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot update artist.");
      return;
    }
    try {
      const response = await fetch(`${URL}favoriteArtist/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(artist),
      });
      if (!response.ok) {
        throw new Error("Failed to update artist.");
      }
      console.log("Artist updated successfully.");
      getArtist();
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteArtist = async (id) => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Cannot delete artist.");
      return;
    }
    try {
      const response = await fetch(`${URL}favoriteArtist/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete artist.");
      }
      console.log("Artist deleted successfully.");
      getArtist();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getArtist();
  }, [isLoggedIn]);

  return (
    <div className="App">
      <ArtistContext.Provider value={{ artists, createArtist, updateArtist, deleteArtist }}>
        <Nav isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup handleSignUp={handleSignUp} />} />
          <Route path="/profile/:id" element={<Profile fetchUser={fetchUser} user={user} />} />
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
