import React from "react";
import "./Radio.css";

function Radio (props) {

    return (
        <div className = "radio">
            <div className="form-check">
                <input className="check-input" type="radio" name={props.group} id="radio" value= {props.value}/>
                <label className="check-label" for="radioDefault1">
                    {props.labelName}
                </label>
            </div>
        </div>
    );
}

export default Radio;