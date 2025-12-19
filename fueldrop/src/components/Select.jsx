import React from "react";

function Select(props){

    return(
        
        <div>

            <select class="form-select" aria-label="Default select example">
                <option selected>{props.heading}</option>
                <option value={props.value}>{props.number}</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>

        </div>

        );
}

export default Select;
