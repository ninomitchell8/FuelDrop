import React,{useState} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";
import {useNavigate} from "react-router-dom";


function Configure(){

    const [formData, setFormData] = useState({
    
            type: "",
            make: "",
            model: "",
            regNumber: "",
            fuel: "",
            litres: ""   
        });

    const navigate = useNavigate();

    const handleChange = async (e) => {

        setFormData ({...formData,[e.target.name]: e.target.value});

    };

    const handleSubmit = async (e) =>{

        e.preventDefault()

        try{

            const response = await fetch("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/configure",{

                method: "POST",
                headers : {"Content-type": "application/json"},
                credentials: "include",
                body: JSON.stringify (formData),
            });

            const data = await response.json();
            console.log("Success",data.message);
            alert("Success");

            if(response.ok){

                navigate("/Home.jsx")
            }

        }catch(err) {

                    alert(err.message);
                }

};
            
    return(
        <div>
            <Navbar/>
            
            <h3> Fill in Item details</h3>
        <form onSubmit = {handleSubmit}>
            <div>
                <h4> Select Type </h4>

                  <Radio 
                    labelName = "Car"
                    group = "type"
                    onChange = {handleChange}
                    value = "car"
                    />

                  <Radio 
                    labelName = "Bakkie"
                    group = "type"
                    onChange = {handleChange}
                    value = "bakkie"
                    />

                <Radio 
                    labelName = "Truck"
                    group = "type"
                    onChange = {handleChange}
                    value = "truck"
                   />

                <Radio 
                    labelName = "Bus"
                    group = "type"
                    onChange = {handleChange}
                    value = "bus"
                   />
                
                <Radio 
                    labelName = "Locomotive"
                    group = "type"
                    onChange = {handleChange}
                    value = "locomotive"
                   />
                
                <Radio 
                    labelName = "Generator"
                    group = "type"
                    onChange = {handleChange}
                    value = "generator"
                    />

                 <Radio 
                    labelName = "Boiler"
                    group = "type"
                    onChange = {handleChange}
                    value ="boiler"
                    />
                
                <Radio 
                    labelName = "Tractor"
                    group = "type"
                    onChange = {handleChange}
                    value = "tractor"
                    />

                 <Radio 
                    labelName = "Harvester"
                    group = "type"
                    onChange = {handleChange}
                    value = "harvester"
                    />

                 <Radio 
                    labelName = "Combine"
                    group = "type"
                    onChange = {handleChange}
                    value = "combine"
                     />
                
                <Radio                 
                    labelName = "Boat"
                    group = "type"
                    onChange = {handleChange}
                    value = "boat"
                    />

                <Radio                 
                    labelName = "Other"
                    group = "type"
                    onChange = {handleChange}
                    value = "other"
                    />

                <Input 
                    type = "text"
                    name = "make"
                    placeholder = "Make"
                    onChange = {handleChange}
                    value = {formData.make}/>
                <Input
                    type = "text"
                    name = "model"
                    placeholder = "Model"
                    onChange = {handleChange}
                    value = {formData.model}/>

                <Input
                    type = "text"
                    name = "regNumber"
                    placeholder = "RegNo / SerialNo"
                    onChange = {handleChange}
                    value = {formData.regNumber}/>
            </div>
            <div>
                <h4>Select Fuel Type</h4>
                
                <Radio
                    labelName = "Petrol - 95 Unleaded"
                    group = "fuel"
                    value = "petrol"
                    onChange = {handleChange}/>

                <Radio 
                    labelName = "Diesel - 50ppm"
                    group = "fuel"
                    value = "diesel"
                    onChange = {handleChange}/> 
                
            </div>
            <div>
                <h4> Fuel Quantity </h4>
                <p>(min: 50 litres _ max: 100 litres)</p>                                                 
                <Input
                    type  = "text"                
                    placeholder = "Litres 50 < 1000"
                    name = "litres"
                    min = {50}
                    max = {1000}
                    onChange = {handleChange}
                    value = {formData.litres} />
            
            </div>

            <Button
                    type = "submit"
                    name = "Save to inventory"  
                    />
        </form>
                
            </div>
    )
}

export default Configure;