import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Albums from './Albums';
import Login from './Login';
import Register from './Register';
import Account from './Account';
import NotFound from './NotFound';
import UserContext from './context/UserContext';



function App() {
  

  const { currentUser, setCurrentUser, setIsLoading } = useContext(UserContext);

  console.log(currentUser)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
      fetch("/auth", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Token validation failed");
        }
        return r.json();
      })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((error) => {
        console.error("Error authentication:", error);
        localStorage.removeItem("token");
      })
      .finally(() => {
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
    }
  }, []);

  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account/>} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
