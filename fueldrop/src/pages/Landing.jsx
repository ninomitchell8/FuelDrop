import React from "react";
import Button from "../components/Button.jsx";

function Landing(){
    return(
        <div>
            <h1> Welcome to FuelDrop </h1>
            <h2> The Fuel Station that comes to you!</h2> 
            <h2> Ready to get your fuel delivered?</h2>

            <Button 
            type ="submit"
            name =  "Login"
            to = "/Login.jsx"
            />
            <p>Or</p>
            
            <Button
            type = "submit"
            name = "Create Account"
            to= "/Register.jsx"
            />
            
        </div>
    )
}

export default Landing;