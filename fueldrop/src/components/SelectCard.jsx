import "./SelectCard.css";
import Button from "../components/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";


function SelectCard({ item, isSelected, onToggleSelect, onRemove  }){

    const handleClick = () => {
    console.log("BUTTON CLICKED", item.inventory_id);
    onToggleSelect();
};


        return(

    <div className="selectCard"
            style={{
                border: isSelected ? "2px solid #9CD5FF" : "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem"
            }}
        >
        <div className="card-header">
           <h6> Reg No. / Serial No. - {item.regNumber} </h6>
        </div>
        
        <div className="card-body">
            <h5 className="card-title">{item.make} - {item.model}</h5>
            <h5 className="card-title">{item.type}</h5>
            <p className="card-text">{item.fuel}  </p>
            <p className="card-text">Maximum fuel capacity = {item.litres} Litres </p>
            <Button
                type = "button"
                name= {isSelected ? (<><FontAwesomeIcon icon={faTrashCan } />Remove from queue </>) : (<> <FontAwesomeIcon icon={faGasPump}/> Add to fueling queue </>)}
                onClick={handleClick}
            />

        <div className = "delete">

                <Button             
                type = "button"
                name = {<> <FontAwesomeIcon icon={faTrashCan } /> Delete from inventory </>}
                onClick= {onRemove}
                />

        </div>
         
        </div>
    </div>
        

        )

    }

export default SelectCard;