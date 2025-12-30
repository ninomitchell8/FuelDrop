import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx"

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

            const response = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/login",{

            method:"POST",
            headers:{ "Content-Type": "application/json"},//response data in JSON format
            body: JSON.stringify(formData),//converts JSON data to string format
        });
        const data = await response.json();
        console.log("Success:", data.message);
        alert ("success");

        if (response.ok){ //boolean value


            navigate("/Home.jsx");
        }

            }catch (err){

                alert(err.message);
            }
    };
    

    return(
        
        <div>
        
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
            
            <p> OR </p>
             
            <Button 
                type ="submit"
                name = "Create Account"
                to = "/Register.jsx"
                />
        </form>
        </div>
     
        

    )
};  

export default Login;