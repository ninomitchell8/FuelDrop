import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

function Button(props){

    const navigate = useNavigate() //navigate's a function

    const handleClick = () => {
        if (props.to) {
            navigate(props.to);
        } else if (props.onClick) {
            props.onClick();   // 👈 EXECUTE IT
        }
    }


    return(
        <button type={props.type} className="btn" onClick = {handleClick}>{props.name}</button>
    );
}

export default Button;
