import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import {useNavigate,useLocation} from "react-router-dom";
import Button from "../components/Button";
import Eta from "../components/Eta";


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

            {invoice.items.map((item, index) =>(

                <div key={`${item.inventory_id}-${index}`}>
                    <p> {item.make} - {item.model} - {item.type} </p>
                    <p> Registration / Serial No: Fuel:  Unit Price:  Item Price:  </p>
                    <p> {item.regNumber} {item.fuel} R{Number(item.unit_price).toFixed(2)} R{Number(item.item_price).toFixed(2)}</p>
                    
                </div>
          
            ))}

            <div> 
                <p> Delivery fee : R{Number(invoice.delivery_fee).toFixed(2)}</p>
                <p> Total Price: R {Number(invoice.total_price).toFixed(2)} </p>         
            </div>

            <div>
                <Eta orderId={invoice.order_id} />
            </div>

            <div>

                <Button 
                 type = "submit"
                 name = "Confirm Order"
                 onClick={() => navigate("/eta", { state: invoice })}
                />
            
            </div>
   
            
        </div>

    );
}  

export default Invoice;