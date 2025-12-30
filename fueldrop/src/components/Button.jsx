import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

function Button(props){

    const navigate = useNavigate() //navigate's a function

    return(
        <button type={props.type} className="btn" onClick = {() => props.to ? navigate(props.to):props.onClick}>{props.name}</button>
    );
}

export default Button;
