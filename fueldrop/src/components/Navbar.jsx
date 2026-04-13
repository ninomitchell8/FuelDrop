import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGasPump} from "@fortawesome/free-solid-svg-icons";



function Navbar(){

    return(

    <div>

            <div className = "nav">
                <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="../Home.jsx"><><FontAwesomeIcon icon={faGasPump} /></>FuelDrop</a>
                    <a className="nav-link" href="../Login.jsx"></a>
                    <a className="nav-link" href="../Login.jsx"></a>

                    <a className="nav-link" href="../Login.jsx">Log Out</a>
                    
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                
                    </div>
                    </div>
                </div>
                </nav>
            </div>
            <div>

                
            </div>

    </div>

    );
}

export default Navbar;