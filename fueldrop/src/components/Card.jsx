import React from"react";

function Card (props){

    return(
        <div class="card">
            <div className="card-header">
                {props.cardHeader}
            </div>
            <div className="card-body">
                <figure>
                <blockquote className="blockquote">
                    <p>{props.content}</p>
                    <p>{props.content}</p>
                </blockquote>
                </figure>
            </div>
        </div>

    );
}

export default Card;