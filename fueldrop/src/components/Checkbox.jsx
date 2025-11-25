import React from "react";

function Checkbox (props) {

    return (
        
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value={props.value} id={props.id} checked/>
            <label class="form-check-label" for="checkChecked">
                {props.name}
            </label>
        </div>

    );
}

export default Checkbox;