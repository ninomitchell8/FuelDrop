import React from"react";
import  "./Card.css";

function Card (props){

    return(
        <div className="card">
            <div className="card-header">
               <h5> {props.cardHeader} </h5>
            </div>
            <div className="card-body">
                <figure>
                <blockquote className="blockquote">
                    <p>{props.primaryContent}</p>
                    <h5>{props.secondaryContent}</h5>
                </blockquote>
                </figure>
            </div>
        </div>

    );
}

export default Card;
