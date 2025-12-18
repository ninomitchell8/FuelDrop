import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";


function App() {
  
  return (
      <Router>
        <Routes>
          <Route path = "/" element = {<Landing />}/>
          <Route path ="/Register.jsx" element = {<Register />}/>
          <Route path ="/Login.jsx" element = {<Login />}/>
          <Route path = "/Home.jsx" element = {<Home />}/> 
        </Routes>
      </Router>
  )
}

export default App;
