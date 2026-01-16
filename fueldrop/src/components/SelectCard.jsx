import "./SelectCard.css";

function SelectCard(props){

        return(

    <div className="selectCard">
        <div className="card-header">
           <p> Registration / Serial Number - {props.header} </p>
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.title1} - {props.title2}</h5>
            <h5 className="card-title">{props.title3}</h5>
            <p className="card-text">{props.text1}  </p>
            <p className="card-text">{props.text2} - Litres </p>
            <a href="#" className="btn">{props.btnName1}</a>
            <a href="#" className="btn">{props.btnName2}</a>

        </div>
    </div>
        
        )

    }

export default SelectCard;