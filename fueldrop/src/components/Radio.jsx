import React from "react";

function Radio (props) {

    return (
        <div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={props.group} id="radio" value= {props.value}/>
                <label className="form-check-label" for="radioDefault1">
                    {props.labelName}
                </label>
            </div>
        </div>
    );
}

export default Radio;