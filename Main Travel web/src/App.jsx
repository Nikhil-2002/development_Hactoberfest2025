import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Destinations from './Components/Destinations';
import About from './Components/About';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import WeatherApp from './Components/Weather';
import './index.css';
import './App.css';
function App() {
  return (
    <div>
      <Router basename='/BHARAT-BACKPACKERS'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/weather" element={<WeatherApp />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </div>
    
  );
}

export default App;

