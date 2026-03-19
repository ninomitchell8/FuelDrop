import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx";
import Configure from "./pages/Configure.jsx";
import Invoice from "./pages/Invoice.jsx";
import Confirm from "./pages/Confirm.jsx";
import Thanks from "./pages/Thanks.jsx";


function App() {
  
  return (
      <Router>
        <Routes>
          <Route path = "/" element = { <Login/>}/>
          <Route path ="/Register.jsx" element = { <Register/> }/>
          <Route path = "/Home.jsx" element = { <Home/> }/>
          <Route path = "/Configure.jsx" element = { <Configure/> }/> 
          <Route path = "/invoice" element = { <Invoice/> }/>
          <Route path = "/Confirm.jsx" element = { <Confirm/> }/>
          <Route path = "/Thanks.jsx" element = { <Thanks/> }/>
          <Route path = "/Login.jsx" element = { <Login/> }/>
        </Routes>
      </Router>
  )
}

export default App;
