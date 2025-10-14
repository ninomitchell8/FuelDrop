import React from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"

function Register(){

    return(

        <div>
            <h1>Register</h1>
            
            <Input 
                type = "text"
                inputName = "fName"
                placeholder = "First Name"
                />
            <Input 
                type = "text"
                inputName = "lName"
                placeholder = "Last Name"
                />
            <Input 
                type = "number"
                inputName = "cellphone"
                placeholder = "Cellphone"
                />

            <Input 
                type = "email"
                inputName = "email"
                placeholder = "Email"
                />

            <Input 
                type = "password"
                inputName = "password"
                placeholder = "Create password"
                />
            <Input
                type = "password"
                inputName = "confirmPassword"
                placeholder = "Confirm password" 
                />
            <Button 
                type ="submit"
                name = "Submit"
                />
            <p> OR </p>

            <Button 
                type = "submit"
                name = "Login"
                to  = "/Login.jsx"
                />
        </div>
    )
}

export default Register;