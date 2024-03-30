import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Homepage from './pages/Homepage';
import './App.css';

function App() {

  const handleLogin = async(user) => {
    const response = await fetch(URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
  }
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
