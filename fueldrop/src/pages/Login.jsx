import React from "react";
import {useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"

function Login() {

    

    return(
        <div>
            <h1> Login </h1>

            <Input 
                type = "email"
                inputName = "email"
                placeholder = "Email"
                />

            <Input 
                type = {"password"}
                inputName = "password"
                placeholder = {"Enter password"}
                />

            <Button 
                type ="submit"
                name = "Login"
                />
            
            <p> OR </p>
             
            <Button 
                type ="submit"
                name = "Create Account"
                to = "/Register.jsx"
                />
        </div>

        
    )
}

export default Login;