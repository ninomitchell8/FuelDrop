import React from "react";

function Input(props){

    return(

      
            <input className ="button" type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>

    );
}

export default Input;