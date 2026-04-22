import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import Footer from"../components/Footer.jsx";
import "./Login.css";

function Login() {

    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });

    const navigate = useNavigate();

    const handleChange = async (e) => {

        setFormData({...formData, [e.target.name] : e.target.value });
    };

    const handleSubmit = async (e) =>{ 
        
        e.preventDefault() //prevent reload

        try{

            const response = await fetch (`${import.meta.env.VITE_API_URL}/login`,{

            method:"POST",
            headers:{ "Content-Type": "application/json"},//response data in JSON format
            body: JSON.stringify(formData),//converts JSON data to string format
        });
        
        const data = await response.json();
     
        if (response.ok){ //boolean value

            navigate("/home.jsx");
           
            localStorage.setItem("token", data.token);
            console.log("JWT:", data.token);
            
        }

            }catch (err){

                throw new Error (alert("Failed to log in! Incorrect username or password."));
            }
        
    };
    

    return(
       
        <div className ="login">
        
            <h1> Login </h1>

        <form onSubmit = {handleSubmit} >

            <Input 
                type = "email"
                name = "email"
                placeholder = "Email"
                value = {formData.email}
                onChange = {handleChange}
                />

            <Input 
                type = {"password"}
                name = "password"
                placeholder = {"Enter password"}
                value = {formData.password}
                onChange = {handleChange}
                />

            <Button 
                type ="submit"
                name = "Login"
                />
              
           <Button 
                type ="submit"
                name = "Create Account"
                to = "/Register.jsx"
                />
        </form>

        <Footer />
        </div>
     
        

    )
};  

export default Login;