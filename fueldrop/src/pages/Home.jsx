import React,{useState,useEffect} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";
import SelectCard from "../components/SelectCard.jsx"



function Home(){

   const[inventory,setInventory] = useState([]);

   const token = localStorage.getItem("token");

   useEffect( () => { //not allowed to make async

    const fetchData = async() => {

        try{

            const res = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/home",{

                headers:{                 
                    "Authorization" : `Bearer ${token}`
                }
            
            });

            if (!res.ok){

                throw new Error("Http error"); //defined error

            }
            
            const data = await res.json();

            console.log("RAW /home response:", data);

            setInventory(data.inventory);

            }catch (err){
                console.log("Failed to fetch inventory", err);

            }
       };
    
    fetchData(); //manual run
    
},[]);


    
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
                </div>

                <div>
                    <p> Add an item to your Fueldrop inventory before filling up. </p>
                </div>
                
                <div>
                    
                        {Array.isArray(inventory) && inventory.map (item =>( //Only render list if its an array - defensive render_map for ea item return componernt
                            <SelectCard
                                key = {item.inventory_id}               
                                header = {item.regNumber}
                                title = {item.make}
                                text = {item.model}
                                btnName ="Add to fueling queue"
                            /> 
                        ))}  
                    
                
                </div>

                    
                <div>
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
                        
                <div>        
                    <Button 
                    type = "submit"
                    name = "Fill Up"/>
                </div>
         </div>
    );
}

export default Home;
