import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Albums from './Albums';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';
import { AlbumProvider } from './context/AlbumContext';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <AlbumProvider>
          <Route path="/albums" element={<Albums />} />
        </AlbumProvider>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
