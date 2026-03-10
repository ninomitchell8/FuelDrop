import React from "react";
import Button from "../components/Button.jsx";


function Confirm(){


return (

        <div>
            <Button
                type = "submit"
                name = "Confirm Delivery"
                to = "/Thanks.jsx" 
                /> 
        </div>  
     
    );
}

export default Confirm;