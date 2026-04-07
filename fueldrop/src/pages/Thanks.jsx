import React from "react";
import Button from"../components/Button.jsx";
import Footer from"../components/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGasPump} from "@fortawesome/free-solid-svg-icons";



function Thanks (){

    


    return (

        <div>

            <h3> 
                 Your Fuel will be Delivererd to you shortly.
                 Thank you for making <><FontAwesomeIcon icon={faGasPump} /></>Fueldrop your Refueling partner!
            </h3>

           
            <Button 
                type= "btn"
                name= "Log Out"
                to = "/Login.jsx"
            />

            <Footer />

        </div>
    )
}

export default Thanks;