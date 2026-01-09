import React,{useState} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";


function Home(){

   
    
    return(
        <div>
            
            <Navbar />
                <h3> Ready to fill up?</h3>
        
                <div>
                    <Card 
                        cardHeader  = "Petrol - 95 Unleaded"
                        primaryContent =  "R21.12/Litre"
                        secondaryContent = ""/>

                    <Card
                    cardHeader = "Diesel - 50ppm"
                    primaryContent = "R19.20/Litre"
                    secondaryContent = ""/>
                <div/>

                <div>
                    <p> Add an item to your Fueldrop inventory before filling up. </p>

                    <Button
                    type = "submit"
                    name = "+ Add Item"
                    to = "/Configure.jsx"/>

                </div>
                    
                <div>
                    <h4>Location</h4>
                    <Button                
                        type = "submit"
                        name = "Share Location"/>     
                </div>
                        
                </div>        
                    <Button 
                    type = "submit"
                    name = "Fill Up"/>
                </div>
         
    );
}

export default Home;
