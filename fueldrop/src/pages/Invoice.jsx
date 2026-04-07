import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import {useNavigate,useLocation} from "react-router-dom";
import Button from "../components/Button";
import Eta from "../components/Eta";
import "./Invoice.css";
import Footer from"../components/Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";


function Invoice() {

    const [loading, setLoading] = useState(true);

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

            <div>
                <table className="invoice-table">
                    <thead>
                        <tr>
                        <th>Reg/Serial No</th>
                        
                        <th>Make</th>
                        
                        <th>Model</th>
                        
                        <th>Type</th>
                        
                        <th>Fuel</th>
                        
                        <th>Unit Price</th>
                        
                        <th>Total</th>
                        
                        </tr>
                    </thead>

                    <tbody>
                        {invoice.items.map((item, index) => (
                        <tr key={`${item.inventory_id}-${index}`}>
                            <td>{item.regNumber}</td>                            
                            <td>{item.make}</td>                          
                            <td>{item.model}</td>                           
                            <td>{item.type}</td>                            
                            <td>{item.fuel}</td>                           
                            <td>R{Number(item.unit_price).toFixed(2)}</td>                         
                            <td>R{Number(item.item_price).toFixed(2)}</td>
                        </tr>
                        ))}

                       <tbody>
                            <tr>
                                <td>Delivery fee : R{Number(invoice.delivery_fee).toFixed(2)}</td>
                            </tr>
                            <tr>
                                  <td>  <Eta orderId={invoice.order_id} /> </td>
                            </tr>
                            <tr>
                                <td>Minimum total payable (75%): <strong>R{Number(invoice.min_price).toFixed(2)}</strong></td>
                            </tr>
                            <tr>                                             
                                <td>Maximum total payable: <strong>R {Number(invoice.total_price).toFixed(2)}</strong></td>
                            </tr>
                        </tbody> 
                    </tbody>
                </table>
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

            <Footer />
   
            
        </div>

    );
}  

export default Invoice;