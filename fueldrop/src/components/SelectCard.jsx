import "./SelectCard.css";
import Button from "../components/Button.jsx";

function SelectCard(props){

        return(

    <div className="selectCard"
            style={{
                border: isSelected ? "2px solid green" : "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem"
            }}
        >
        <div className="card-header">
           <p> Registration / Serial Number - {props.header} </p>
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.title1} - {props.title2}</h5>
            <h5 className="card-title">{props.title3}</h5>
            <p className="card-text">{props.text1}  </p>
            <p className="card-text">{props.text2}  = {props.price} </p>
            <Button
                name={isSelected ? "Remove from queue" : "Add to fueling queue"}
                onClick={() => onToggleSelect(item)}
            />
         

        </div>
    </div>
        
        )

    }

export default SelectCard;