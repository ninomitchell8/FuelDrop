import Openrouteservice from 'openrouteservice-js';
// // Note: The API key is currently still passed as a parameter but not needed by the local instance


// let orsDirections = new Openrouteservice.Directions(
//   { host: "http://localhost:8082/ors" }
// );



// const Openrouteservice = require("openrouteservice-js");


// const request = require('request');


 app.post("/eta",auth,async(req, res =>{

    const api = 

    const user_id = req.user.id;

    const myLatitude = -33.940;

    const myLongitude = 18.847;

    const location = db.get("SELECT latitude, longitude FROM orders WHERE user_id = ?",
        
        [latitude, longitude, user_id]),

        
   

            // req ({
            //         method: 'POST',
            //         url: 'https://api.openrouteservice.org/v2/matrix/driving-car',
            //         body: '{"locations":[[myLatitude],[myLongitude],[location.latitude],[location.longitude]}',
            //         headers: {
            //             'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            //             'Authorization': api,
            //             'Content-Type': 'application/json; charset=utf-8'
            //         }}, function (error, res, body) {

            //         console.log('Status:', res.statusCode);
            //         console.log('Headers:', JSON.stringify(res.headers));
            //         console.log('Response:', body);
            //     }),
            let matrix = new Openrouteservice.Matrix({api_key:"eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQwMDM0ZGY5OWQ4MDQwNzk4NzFjNDU1YTg1MTE3NmQxIiwiaCI6Im11cm11cjY0In0="});

            matrix.calculate({
                locations: [[myLatitude, myLongitude], [location.latitude, location.longitude], [location.latitude, location.longitude]],
                profile: "driving-car",
                sources: ['all'],
                destinations: ['all'],
                metrics : ['duration','distance'],
            }).then(function(json){

                console.log(JSON.stringify(json));
                
        });

}));

       // https://api.openrouteservice.org/v2/matrix/driving-car

//         // Add your api_key here
//         const Matrix = new Openrouteservice.Matrix({ api_key: "XYZ"})

