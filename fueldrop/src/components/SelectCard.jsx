import "./SelectCard.css";

function SelectCard(props){

        return(

        <div className="selectCard">
        <div className="card-header">
            {props.header}
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.text}</p>
            <a href="#" className="btn">{props.btnName}</a>
        </div>
    </div>
        
        )

    }

export default SelectCard;