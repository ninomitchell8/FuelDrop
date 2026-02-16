import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import {useNavigate,useLocation} from "react-router-dom";



function Invoice() {

    // const [invoice, setInvoice] = useState([]);

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
                    <p> Registeration / Serial No: Fuel:  Unit Price:  Item Price:  </p>
                    <p> {item.regNumber} {item.fuel} R{Number(item.unit_price).toFixed(2)} R{Number(item.item_price).toFixed(2)}</p>
                    
                </div>
          
            ))}

            <div> 
                <p> Delivery fee : R{Number(invoice.delivery_fee).toFixed(2)}</p>
                <p> Total Price: R {Number(invoice.total_price).toFixed(2)} </p> 
                
            
            </div>
            

        </div>

    );
}  

export default Invoice;