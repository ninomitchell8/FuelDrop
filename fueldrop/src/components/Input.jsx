import React from "react";
import "./Input.css";

function Input(props){

    return(

        <div>
            <input className ="input" type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange} min={props.min} max ={props.max}/>
        </div>
    );
}

export default Input;