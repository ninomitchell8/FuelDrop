import React, {useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"
import { useNavigate } from "react-router-dom";



function Register(){

   const [formData,setFormData] = useState ({
    name:"", 
    lastname:"", 
    cellphone:"", 
    email:"", 
    password:"", 
    confirmPassword:""});//setform data

   const navigate = useNavigate();
   
   const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value}); //event properties
    };

   const handleSubmit = async (e) => {

     e.preventDefault();

     console.log("Formdata:",formData);

     try{

        const response = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/register",{ //fetching resource from network.pauses exuecution before functionuntil fetch executed
            method:"POST",
            headers:{ "Content-Type": "application/json"},//response data in JSON format
            body: JSON.stringify(formData),//converts JSON data to string format
        });
        const data = await response.json();
        console.log("Success:", data.message);
        alert ("success");

        if (response.ok){ //boolean value


            navigate("/Login.jsx");                     
        }

    }catch (err){
        console.error(err.message);
        alert(err.message);    
    }
    

 };

 
    return(

        <div>
            <Navbar/>
            <h1>Register</h1>
        <form onSubmit = {handleSubmit}>
            <Input 
                type = "text"
                name = "name"
                placeholder = "First Name"
                value = {formData.name}
                onChange = {handleChange}
                />
            <Input 
                type = "text"
                name = "lastname"
                placeholder = "Last Name"
                value = {formData.lastname}
                onChange = {handleChange}
                />
            <Input 
                type = "number"
                name = "cellphone"
                placeholder = "Cellphone"
                value = {formData.cellphone}
                onChange = {handleChange}
                />

            <Input 
                type = "email"
                name = "email"
                placeholder = "Email"
                value = {formData.email}
                onChange = {handleChange}
                />

            <Input 
                type = "password"
                name = "password"
                placeholder = "Create password"
                value = {formData.password}
                onChange = {handleChange}
                />
            <Input
                type = "password"
                name = "confirmPassword"
                placeholder = "Confirm password"
                value = {formData.confirmPassword} 
                onChange = {handleChange}
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
        </form>
        </div>
    )
 };

export default Register;