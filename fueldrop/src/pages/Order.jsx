import {useState,useEffect} from "react";

function order() {

    const {order,setOrder} = useState();

    const {loading,setLoading} = useState([true]);

    const token = localStorage.getItem("token");

    useEffect (() => {

        const fetchData = async ()=> {

            try{

                const res = await fetch ("https://literate-cod-jpx676qxq6q3pwp5-5000.app.github.dev/orders",{

                    headers: {

                        "Authorization" : `Bearer ${token}`
                    }
                })

                if(!res.ok){

                    throw new Error("http request failed");
                }

                const data = await res.json();

                console.log(data);

                setOrder (Array.isArray(data) ? data: []);

                setLoading(false);
            
            }catch (err){
                console.log("Failed to fetch orders", err);
            }
    });


    return(

        <div>


        </div>

        );
    

export default order;