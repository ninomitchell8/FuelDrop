import React from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";


function Home(){
    
    return(
        <div>
            <Navbar/>
            <h3> Welcome to Fueldrop the fuelstation that comes to you!</h3>

            <Card 
                cardHeader  = "Petrol - 95 Unleaded"
                 primaryContent =  "R21.12/Litre"
                 secondaryContent = ""/>

            <Card
            cardHeader = "Diesel - 50ppm"
            primaryContent = "R19.20/Litre"
            secondaryContent = ""/>

            <Button 
                type = "submit"
                name = "Fill Up"
                to = "/Configure.jsx"
                />
    
        </div>
    )
}

export default Home;