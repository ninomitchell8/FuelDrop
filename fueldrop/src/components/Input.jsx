import React from "react";

function Input(props){

    return(

        <form>
            <input className ="button" type={props.type} name={props.name} placeholder={props.placeholder}/>
        </form>
    );
}

export default Input;