import React from "react";
import { ProtectedRoute } from "./lib";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./Pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>

        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
