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
                    <p>{props.secondaryContent}</p>
                </blockquote>
                </figure>
            </div>
        </div>

    );
}

export default Card;
