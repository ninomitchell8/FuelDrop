import "./SelectCard.css";
import Button from "../components/Button.jsx";

function SelectCard({ item, isSelected, onToggleSelect, onRemove  }){

    const handleClick = () => {
    console.log("BUTTON CLICKED", item.inventory_id);
    onToggleSelect();
};


        return(

    <div className="selectCard"
            style={{
                border: isSelected ? "2px solid green" : "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem"
            }}
        >
        <div className="card-header">
           <p> Registration / Serial Number - {item.regNumber} </p>
        </div>
        
        <div className="card-body">
            <h5 className="card-title">{item.make} - {item.model}</h5>
            <h5 className="card-title">{item.type}</h5>
            <p className="card-text">{item.fuel}  </p>
            <p className="card-text">{item.litres}-Litres </p>
            <Button
                type = "button"
                name={isSelected ? "Remove from queue" : "Add to fueling queue"}
                onClick={handleClick}
            />
            <Button             
            type = "button"
            name = "Delete from inventory"
            onClick= {onRemove}
            />
         
        </div>
    </div>
        

        )

    }

export default SelectCard;