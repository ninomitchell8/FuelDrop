import React from "react";
import Input from"..components/Input.jsx";
import Button from "..components/Button.jsx"

function Register(){

    return(

        <div>
            <h1>Register</h1>
            
            <Input 
                type = {text}
                InputName ={fName}
                placeholder = {"First Name"}
                />
            <Input 
                type = {text}
                InputName = {lName}
                placeholder = {"Last Name"}
                />
            <Input 
                type = {number}
                InputName = {cellphone}
                placeholder = {"Cellphone"} 
                />
            <Input 
                type = {password}
                InputName = {password}
                placeholder = {"Create password"}
                />
            <Input
                type = {confirmPassword}
                inputName = {confirmPassword}
                placeholder = {"Confirm password"} 
                />
            <Button 
                type ={submit}
                buttonName = {Register}
                />
        </div>
    )
}

export default Register;