import React,{useState} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";
import {useNavigate} from "react-router-dom";


function Configure(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    
            type: "",
            make: "",
            model: "",
            regNumber: "",
            fuel: "",
            litres: ""   
        });


    const handleChange = async (e) => {

        setFormData ({...formData,[e.target.name]: e.target.value});

    };

    
    const handleSubmit = async (e) =>{

        const token = localStorage.getItem("token"); //get token from storage

        
        e.preventDefault() 

        try{

            console.log("FORM DATA:", formData);


            const response = await fetch("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/configure",{ 

    
                method: "POST",
                headers : {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify (formData)
            });

            const data = await response.json();
           
            
            if(response.ok){

                navigate("/home.jsx");
                alert("Success");
            }

        }catch(err) {

                    alert(err.message);
                }

};
            
    return(
        <div>
            <Navbar/>
            
            <h1> Fill in your new Inventory Item details</h1>
          <form onSubmit = {handleSubmit}>
            <div>
                <h4> Select Type </h4>

                  <Radio 
                    labelName = "Car"
                    name = "type"
                    onChange = {handleChange}
                    value = "Car"
                    />

                  <Radio 
                    labelName = "Bakkie"
                    name = "type"
                    onChange = {handleChange}
                    value = "Bakkie"
                    />

                     <Radio 
                    labelName = "SUV"
                    name = "type"
                    onChange = {handleChange}
                    value = "SUV"
                    />

                <Radio 
                    labelName = "Truck"
                    name = "type"
                    onChange = {handleChange}
                    value = "Truck"
                   />

                <Radio 
                    labelName = "Bus"
                    name = "type"
                    onChange = {handleChange}
                    value = "Bus"
                   />
                
                <Radio 
                    labelName = "Locomotive"
                    name = "type"
                    onChange = {handleChange}
                    value = "Locomotive"
                   />
                
                <Radio 
                    labelName = "Generator"
                    name = "type"
                    onChange = {handleChange}
                    value = "Generator"
                    />

                 <Radio 
                    labelName = "Boiler"
                    name = "type"
                    onChange = {handleChange}
                    value ="Boiler"
                    />
                
                <Radio 
                    labelName = "Tractor"
                    name = "type"
                    onChange = {handleChange}
                    value = "Tractor"
                    />

                 <Radio 
                    labelName = "Harvester"
                    name = "type"
                    onChange = {handleChange}
                    value = "Harvester"
                    />

                 <Radio 
                    labelName = "Combine"
                    name = "type"
                    onChange = {handleChange}
                    value = "Combine"
                     />
                
                <Radio                 
                    labelName = "Boat"
                    name = "type"
                    onChange = {handleChange}
                    value = "Boat"
                    />

                <Radio                 
                    labelName = "Other"
                    name = "type"
                    onChange = {handleChange}
                    value = "Other"
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
                    name = "fuel"
                    value = "petrol"
                    onChange = {handleChange}/>

                <Radio 
                    labelName = "Diesel - 50ppm"
                    name = "fuel"
                    value = "diesel"
                    onChange = {handleChange}/> 
                
            </div>
            <div>
                <h4> Fuel Quantity </h4>
                <p>(min: 50 litres _ max: 1000 litres)</p>                                                 
                <Input
                    type  = "text"                
                    placeholder = "Litres 50 < 1000"
                    name = "litres"
                    min = {50}
                    max = {1000}
                    onChange = {handleChange}
                    value = {formData.litres} />
            
            </div>
            <div>
                <Button
                        type = "submit"
                        name = "Save to inventory"
                        />
            </div>
          </form>
                
            </div>
    )
}

export default Configure;