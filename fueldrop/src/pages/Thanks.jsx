import React from "react";
import Button from"../components/Button.jsx";
import Footer from"../components/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGasPump} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Eta from "../components/Eta"; 
import "./Thanks.css";




function Thanks (){

     const location = useLocation();

     const invoice = location.state;

            if(!invoice){

                throw new Error("No Invoice data found");
            }

    


    return (

        <div className = "thanks">

            <h3> 
                 Your fuel will be delivered to you in a estimated time of <strong><Eta orderId={invoice.order_id}/></strong>
                 Thank you for making <><FontAwesomeIcon icon={faGasPump} /></> Fueldrop your refueling partner!
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