import React,{useState, useEffect} from "react";



function Eta(){

   const [loading, setLoading] = useState ([true]);

   const [etaData, setEtaData] = useState(null);

   useEffect( ()=> {

    const fetchETA = async () => {

        try {

            const res = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/eta",{

                method:"POST",
                headers:{                 
                     "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },

                body: JSON.stringify(({ordfer_id:1}))
            })

                if (!res.ok){

                    throw new Error ("Http err");
                }

                const data = await res.json();
                console.log(data);
                setEtaData(data);
                setLoading ([false]);


        }catch(err){

            console.log(err);
        }


    };



    fetchETA();
  
    },[]);

    return (

        <div>
            <p>{JSON.stringify(etaData,null,2)} </p>
        </div>
    );
}

export default Eta;