import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Register from "./pages/Register.jsx"

function App() {
  
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />}/>
          <Route path ="/Register" element = {<Register />}/>
        </Routes>
      </Router>
  );
}

export default App
