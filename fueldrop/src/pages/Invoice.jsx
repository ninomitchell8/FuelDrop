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

            <div className="table-wrapper">

                <table className="invoice-table">
                    <thead>
                        <tr>
                        <th>Reg/Serial No</th>
                        
                        <th>Make</th>
                        
                        <th>Model</th>
                        
                        <th>Type</th>
                        
                        <th>Fuel</th>

                        <th>Max capacity (Litres)</th>
                        
                        <th>Unit price</th>
                        
                        <th>Item total</th>
                        

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
                            <td>{item.litres}</td>                           
                            <td>R{Number(item.unit_price).toFixed(2)}</td>                         
                            <td>R{Number(item.item_price).toFixed(2)}</td>
                        </tr>
                        ))}
                       
                    </tbody>
                </table>
                
                <div className="invoice-summary">
  
                    <div className="summary-item">
                        <span>Estimated delivery:</span>
                        <span><Eta orderId={invoice.order_id} /></span>
                    </div>

                    <div className="summary-item">
                        <span>Delivery fee:</span>
                        <span>R{Number(invoice.delivery_fee).toFixed(2)}</span>
                    </div>

                    <div className="summary-item">
                        <span>Minimum total (75%):</span>
                        <strong>R{Number(invoice.min_price).toFixed(2)}</strong>
                    </div>

                    <div className="summary-item">
                        <span>Maximum total:</span>
                        <strong>R{Number(invoice.total_price).toFixed(2)}</strong>
                    </div>

                    </div>
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
                 onClick = {() => navigate("/Thanks.jsx", { state: invoice })}
                />
            
            </div>

            <Footer />
   
            
        </div>

    );
}  

export default Invoice;