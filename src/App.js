import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Singup from "./Signup";
import Profile from "./Profile";

import "./App.css"

function App() {
  let userLogin = localStorage.getItem("token");
  return (
    <Router>
      <div className="App">
        {userLogin ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="profile" element={<Profile />} />
            <Route path="*" element={<Home />}></Route>
          </Routes>
          :
          <Routes>
            <Route exact path="/" element={<Singup />} />
            <Route path="*" element={<Singup />}></Route>
          </Routes>
        }
      </div>
    </Router>
  )
}

export default App;
