import React,{useState,useEffect} from "react";
import Button from "../components/Button.jsx";
import Navbar from "../components/Navbar.jsx";
import Card from "../components/Card.jsx";
import Radio from "../components/Radio.jsx";
import Input from "../components/Input.jsx";
import SelectCard from "../components/SelectCard.jsx"
import {useNavigate} from "react-router-dom";




function Home(){

    const navigate = useNavigate();

   const[inventory,setInventory] = useState([]); // retrieve data from db
 
   const [loading,setLoading] = useState([true]); // load inventory on opening of Home

   const [selectedItems,setSelectedItems] = useState ([]); // select button

   const [location,setLocation] = useState ([null]); //intial state no valid data = null

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
           
            
            const data = await res.json()
            
            if(res.ok){
                alert("Success");
                navigate("/invoice",{state: data}); //use data inside route
            }

        }catch(err) {

                    alert(err.message);
                }

    };

   useEffect( () => { //not allowed to make async

    const fetchData = async() => {

        try{

            const res = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/home",{

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
       };


    fetchData(); //manual run
    
},[]);


    
    return(
        <div>
            
            <Navbar />
                <h3> Ready to fill up?</h3>
        
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
                    <p> Add an item to your Fueldrop inventory before filling up. </p>
                </div>
                <div>
                    <Button
                    type = "submit"
                    name = "+ Add Item"
                    to = "/Configure.jsx"/>

                </div>
               <form onSubmit={handleSubmit}>
                <div>
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
                    <h4>Location</h4>
                    <Button                
                        type = "submit"
                        name = "Share Location"
                        />     
                </div>

            </form> 

                
                    
         </div>
    );
}

export default Home;
