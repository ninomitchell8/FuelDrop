import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGasPump} from "@fortawesome/free-solid-svg-icons";


function Navbar(){

    return(

        <div className = "nav">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><><FontAwesomeIcon icon={faGasPump} /></>Fueldrop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    {/* <a className="nav-link active" aria-current="page" href="fueldrop/src/pages/Home.jsx">Home</a> */}
              
                </div>
                </div>
            </div>
            </nav>
        </div>

    );
}

export default Navbar;