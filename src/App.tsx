import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PocketBaseStatus from './components/PocketBaseStatus';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Testimonials from './pages/Testimonials';
import Appointments from './pages/Appointments';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articulos" element={<Articles />} />
            <Route path="/testimonios" element={<Testimonials />} />
            <Route path="/turnos" element={<Appointments />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <PocketBaseStatus />
      </div>
    </Router>
  );
}

export default App;
