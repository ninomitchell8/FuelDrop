import React from "react";
import { useNavigate } from "react-router-dom";

function Button(props){

    const navigate = useNavigate() //navigate's a function

    return(
        <button type={props.type} class="btn btn-warning" onClick = {() => props.to ? navigate(props.to):props.onClick}>{props.name}</button>
    );
}

export default Button;