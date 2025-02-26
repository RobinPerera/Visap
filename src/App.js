import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./app/login/LoginPage";
import Home from "./app/home/Home";
import Recorder from "./app/record/Recorder";
import Publisher from "./app/record/publisher/Publisher";


const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/record" element={<Publisher />} />
      </Routes>
    </Router>
  );
};

export default App;
