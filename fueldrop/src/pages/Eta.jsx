import React,{useState, useEffect} from "react";


function Eta(){

   const token = localStorage.getItem("token");

   const [loading, setLoading] = useState (true);

   const [eta, setEta] = useState(null);

   const orderId = 0;

   useEffect( ()=> {

    if(!orderId)return;

    const fetchETA = async (orderId) => {

        try {

            const res = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/eta",{

                method:"POST",
                headers:{                 
                     "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`,
                },

                body: JSON.stringify(({order_id: orderId}))
            })

                if (!res.ok){

                    throw new Error ("Http err");
                }

                const data = await res.json();
                console.log(data);
                setEta(data.eta);
                setLoading (false);


        }catch(err){

            console.error("failed to fetch",err);
        }


    };

    fetchETA(orderId);
  
    },[orderId]);

    return (

        <div>
        {eta && <p> {eta} </p>}
        </div>
    );
}

export default Eta;