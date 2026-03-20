import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import {useNavigate,useLocation} from "react-router-dom";
import Button from "../components/Button";
import Eta from "../components/Eta";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";


function Invoice() {

    const [loading, setLoading] = useState([true]);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const location = useLocation();

    const invoice = location.state;

            if(!invoice){

                throw new Error("No Invoice data found");
            }

    console.log(invoice)

    return(

        <div>
            <Navbar />

            <h1>Invoice</h1>

            <p> Registration / Serial No: Make: Model: Type: Fuel:  Unit Price:  Item Price:  </p>

            {invoice.items.map((item, index) =>(

                <div key={`${item.inventory_id}-${index}`}>

                    <p> {item.regNumber} {item.make} {item.model} {item.type} {item.fuel} R{Number(item.unit_price).toFixed(2)} R{Number(item.item_price).toFixed(2)}</p>
                    
                </div>
          
            ))}

            <div> 
                <p> Delivery fee : R{Number(invoice.delivery_fee).toFixed(2)}</p>
                <p> Total Price: R {Number(invoice.total_price).toFixed(2)} </p> 
                <p> Minimum payable price on delivery (75%): R{Number(invoice.min_price).toFixed(2)}</p>        
            </div>

            <div>
                <Eta orderId={invoice.order_id} />
            </div>

            <div>

                <Button 
                type = "submit"
                name = {<><FontAwesomeIcon icon={faArrowLeft}/>Back </>}
                to = "/Home.jsx"
                />

                <Button 
                 type = "submit"
                 name = {<>Confirm Order <FontAwesomeIcon icon={faTruckFast} /> </>} 
                 to = "/Thanks.jsx"
                />
            
            </div>
   
            
        </div>

    );
}  

export default Invoice;