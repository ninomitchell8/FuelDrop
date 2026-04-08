import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGasPump} from "@fortawesome/free-solid-svg-icons";



function Navbar(){

    return(

    <div>

            <div className = "nav">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="../Home.jsx"><><FontAwesomeIcon icon={faGasPump} /></>Fueldrop</a>
                    <a className="LogOut" href="../Login.jsx"><p>logout</p></a>
                    
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