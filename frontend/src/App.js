import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand" onClick={() => (window.location.href = "/")}>
            <span className="nav-dot"></span>
            FormBuilder
          </div>
          <span className="nav-tagline">MERN Form Builder</span>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<FormPage mode="create" />} />
            <Route path="/edit/:id" element={<FormPage mode="edit" />} />
            <Route path="/preview/:id" element={<FormPage mode="preview" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;