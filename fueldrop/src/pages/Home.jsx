import React from "react";
import Button from "..component/Button.jsx";
import Navbar from "../components/Navbar.jsx";


function Home(){
    
    return(
        <div>
            <Navbar/>
            <h3> Welcome to Fueldrop the fuelstation that comes to you!</h3>
            <h3> with what fuel can we help you with today?</h3>
            

            <Button 
                type = "submit"
                name = "Fill Up"
                to = "/Configure.jsx"
                />
        </div>
    )
}

export default Home;