import React,{useState,useEffect} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";
import SelectCard from "../components/SelectCard.jsx"



function Home(){

   const[inventory,setInventory] = useState([]); // retrieve data from db
 
   const [loading,setLoading] = useState([true]); // load inventory on opening of Home

   const [selectedItems,setSelectedItems] = useState ([]); // select button



   const token = localStorage.getItem("token");

   useEffect( () => { //not allowed to make async

    const fetchData = async() => {

        try{

            const res = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/home",{

                headers:{                 
                    "Authorization" : `Bearer ${token}`
                }
            
            })

            .then (res => res.json())
            .then(data =>{

                console.log(data);
                setInventory(Array.isArray(data) ? data: []);// ? = if array = true = data_ else = []
                setLoading(false);  
            })

            if (!res.ok){

                throw new Error("Http error"); //defined error

            }
            console.log("RAW /home response:", data);

            }catch (err){
                console.log("Failed to fetch inventory", err);

            }
       };

       const toggleSelect = (item) => {

        setSelectedItems (prev =>{ //previous state  - component state before update applied

            const exists = prev.find (i=> i.inventory_id == item.inventory_id); //loops through current selected items(prev)_tries to find item with same inventory

            if (exists){
                
                return prev.filter ( //creates new array except item removed

                    i =>i.inventory_id !== i.item_id
                );
            }else{

                return [...prev,item] //spread operator - copy all selected items  add new item to end
            }
        }) //prev latest state
       }
    
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
                                title1 = {item.make}
                                title2 = {item.model}
                                title3 = {item.type}
                                text1 = {item.fuel}
                                text2 = {item.litres} 
                                isSelected = {selectedItems.some(
                                    i => i.invenetory_id === item.inventory_id
                                )}                          
                                onToggleSelect = {toggleSelect}
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
