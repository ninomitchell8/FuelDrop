import React from "react";
import "./Radio.css";

function Radio (props) {

    return (
        <div className = "radio">
            <div className="form-check">
                <input className="check-input" type="radio" name={props.name} id="radio" value= {props.value} onChange = {props.onChange}/>
                <label className="check-label" htmlFor="radioDefault1">
                    {props.labelName}
                </label>
            </div>
        </div>
    );
}

export default Radio;