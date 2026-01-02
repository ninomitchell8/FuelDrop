import React,{useState} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";


function Configure(){

    const [formData, setFormData] = useState({
    
    //         email: "",
    //         password: ""
    
        });
    
    return(
        <div>
            <Navbar/>
            <h3> Fill in Item details</h3>

            
            <div>
                <h4> Select Type </h4>

                  <Radio 
                    labelName = "Car"
                    group = "type"/>

                  <Radio 
                    labelName = "Bakkie"
                    group = "type"/>

                <Radio 
                    labelName = "Truck"
                    group = "type"/>
                
                <Radio 
                    labelName = "Locomotive"
                    group = "type"/>
                
                <Radio 
                    labelName = "Generator"
                     group = "type"/>
                
                <Radio 
                    labelName = "Farm Equipment"
                    group = "type"/>
                
                <Radio                 
                    labelName = "Boat"
                    group = "type"/>

                <Radio                 
                    labelName = "Other"
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

                <Input
                    type = "text"
                    name = "regNumber"
                    placeholder = "Registration / Serial number"/>
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
            <div>
                <h4> Required Fuel</h4>
                <p>(min: 50 litres_max: 100 litres)</p>                                                 
                <Input
                    type  = "text"
                    name ="litres"
                    placeholder = "Enter a number between 50 litres & 1000 litres"
                    min = {50}
                    max = {1000}
                   />
            
            </div>
                <Button
                    type = "submit"
                    name = "Save item to Fuel Drop inventory"
                    to = "/Home.jsx"  
                    />
            </div>
    )
}

export default Configure;