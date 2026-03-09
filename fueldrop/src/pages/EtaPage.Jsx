import React from {useState,useEffect} ,"react";
import Eta from "../components/Eta.jsx";
import Button from "../components/Button.jsx";


function EtaPage(){

    const {loading,setLoading} = useState(true);

    const location = useLocation();

    const invoice = location.state;

            if(!invoice){

                throw new Error("No Invoice data found");
            }

    console.log(invoice)



return (

        <div>
            <Eta orderId={invoice.order_id} /> 
        </div>  
     
    );
}

export default EtaPage;