import React from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";

function Home(){

    // const [formData, setFormData] = useState({
    
    //         email: "",
    //         password: ""
    
    //     });
    
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
            <div>
                <h4> Select Type </h4>

                <Radio 
                    labelName = "Vehicle"
                    group = "type"/>
                
                <Radio 
                    labelName = "Generator"
                     group = "type"/>
                
                <Radio 
                    labelName = "Farm Equipment"
                    group = "type"/>
                
                <Radio                 
                    labelName = "Marine"
                    group = "type"/>

                <Input 
                    type = "text"
                    name = "Make"
                    placeholder = "Make"
                    />
                <Input
                type = "text"
                name = "Model"
                placeholder = "Model"/>
            </div>
            <div>
                <h4>Select Fuel</h4>
                
                <Radio
                    labelName = "Petrol - 95 Unleaded"
                    group = "fuel"/>

                <Radio 
                    labelName = "Diesel - 50ppm"
                    group = "fuel"/> 
            </div>        
                <Button 
                    type = "submit"
                    name = "Fill Up"
                    />
            </div>
    )
}

export default Home;
