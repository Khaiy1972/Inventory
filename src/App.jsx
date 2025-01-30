import React from "react";
import { ProtectedRoute } from "./lib";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./Pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
