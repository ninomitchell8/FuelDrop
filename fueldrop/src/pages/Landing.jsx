import React from "react";
import Button from "../components/Button.jsx";

function Landing(){
    return(
        <div>
            <h1> Welcome to FuelDrop </h1>
            <h2> The Fueling Station that comes to you!</h2> 
            <h2> Ready to get your fuel delivered?</h2>
            <h3> Already made use of our services?</h3> 

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