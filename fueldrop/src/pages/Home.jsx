import React,{useState,useEffect} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";
import SelectCard from "../components/SelectCard.jsx"
import Footer from"../components/Footer.jsx";
import {useNavigate,useLocation} from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";




function Home(){

    const location = useLocation();

    const navigate = useNavigate();

   const[inventory,setInventory] = useState([]); // retrieve data from db
 
   const [loading,setLoading] = useState(true); // load inventory on opening of Home

   const [selectedItems,setSelectedItems] = useState ([]); // select button

   const [locations,setLocation] = useState (null); //intial state no valid data = null

   const [order,setOrder] = useState({

    fuel : "",
    litres: "",
    latitude: "",
    longitude: ""
});



   const token = localStorage.getItem("token");

   const toggleSelect = (item) => {

        setSelectedItems (prev =>{ //previous state  - component state before update applied

            const exists = prev.find (
                
                i=> i.inventory_id == item.inventory_id); //loops through current selected items(prev)_tries to find item with same inventory

            if (exists){
                
                return prev.filter ( //creates new array except item removed

                    i => i.inventory_id !== item.inventory_id
                );
            }else{

                return [...prev,item] //spread operator - copy all selected items  add new item to end
            }
        }) //prev latest state
       }

       const removeInventoryItem = async (id) => { 

        try{

            const res = await fetch(

                `https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/inventory/${id}`,{
                    method : "DELETE",
                    headers : {
                        "Authorization" : `Bearer ${token}`
                    }
                }

            )

            if (!res.ok) throw new Error("Failed to delete");
            
            setInventory(prev =>
                prev.filter(item => item.inventory_id !==id)
            );

            setSelectedItems (prev =>
                prev.filter(item => item.inventory_id !== id)
            );

            
        }catch (err){
            console.log(err);
        }
    };
  
    const getLocation = ()=> {

        return new Promise((resolve, reject) => {

           if (!navigator.geolocation){

            reject(new Error("Geolocation not supported"));
            
            return;
           }
           
           navigator.geolocation.getCurrentPosition(
            (position) => {

                resolve({
                    
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            
            (error) => {

                reject(new Error( error.message)); 
            }
           );
    });
};

    const handleSubmit = async (e) =>{

        if (selectedItems.length === 0){
        alert("Select an item from your inventory to proceed");
        return;
    }

        const token = localStorage.getItem("token"); //get token from storage

        e.preventDefault() 

        try{

            const coords = await getLocation();

            if (!coords || !coords.latitude || !coords.longitude){

                alert ("Location not found!")

                return;
            }

            const order = {

            items: selectedItems.map( item =>({

                inventory_id: item.inventory_id,
                
                })),
                latitude : coords.latitude,
                longitude : coords.longitude

            };

            console.log("ORDER:", order);

            const res = await fetch("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/invoice",{ //sends order to backend

    
                method: "POST",
                headers : {"Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify (order)
            });
           
            
            const data = await res.json();

            if (selectedItems.length === 0){

                    alert("Add an item to the fueling queue to proceed");
                    navigate("/home");
                }
                
            
            if(res.ok){
                
                navigate("/invoice",{state: data}); //use data inside route
            }

        }catch(err) {

                    throw new Error (alert("No data captured for invoice"));
            
                }

    };
 

   useEffect( () => { //not allowed to make async

    

    const fetchData = async() => {

        try{

            const res = await fetch (`${import.meta.env.VITE_API_URL}/home`,{

                headers:{                 
                    "Authorization" : `Bearer ${token}`
                }
            
            })

            if (!res.ok){

                throw new Error("Http error"); //defined error

            }

                const data = await res.json();
                console.log(data);
                setInventory(Array.isArray(data) ? data: []);// ? = if array = true = data_ else = []
                setLoading(false);  
                        
            console.log("RAW /home response:", data);

            }catch (err){
                console.log("Failed to fetch inventory", err);

            }

             
    }
       

    fetchData(); //manual run
    
},[]);

useEffect(() => {
    if (location.state?.refresh) {
        fetchData();
    }
}, [location.state]);


    
    return(
        <div>
            
            <Navbar />
                <h1> Lets fill up!</h1>
            
                <div className ="fuel">
                    <Card 
                        cardHeader  = "Petrol - 95 Unleaded"
                        primaryContent =  "R19.28/Litre"
                        secondaryContent = ""/>

                    <Card
                        cardHeader = "Diesel - 50ppm"
                        primaryContent = "R19.46/Litre"
                        secondaryContent = ""/>
                </div>

                <div>
                    <h4> Add an item to your Fueldrop inventory before filling up. </h4>
                </div>
                <div>
                    <Button
                    type = "submit"
                    name = "+ Add Item to Inventory"
                    to = "/Configure.jsx"/>

                <div>
                    <h4> Select Item from your inventory to proceed. </h4>
                </div>

                </div>
               <form onSubmit={handleSubmit}>
                <div className = "Inventory">
                        {Array.isArray(inventory) && inventory.map (item =>( //Only render list if its an array - defensive render_map for ea item return componernt
                            <SelectCard
                                key = {item.inventory_id}               
                                item = {item} 
                                isSelected = {selectedItems.some( //. some test if atleast 1 element in array //is.select boolean value
                                    i => i.inventory_id === item.inventory_id
                                )} 

                                onToggleSelect = {() => toggleSelect(item)}
                                onRemove ={() => removeInventoryItem(item.inventory_id)}
                            /> 
                        ))}  
                    
                </div>

                <div>
                    <Button                
                        type = "submit"
                        name = {<>Proceed <FontAwesomeIcon icon={faArrowRight}/></> }
                        />     
                </div>

            </form> 

            <Footer />

                
                    
         </div>
    );
}

export default Home;
