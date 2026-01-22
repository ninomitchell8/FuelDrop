import Openrouteservice from 'openrouteservice-js'
// Note: The API key is currently still passed as a parameter but not needed by the local instance


let orsDirections = new Openrouteservice.Directions(
  { host: "http://localhost:8082/ors" }
);



const Openrouteservice = require("openrouteservice-js");

let orsDirectionsApi = new Openrouteservice.Directions({ api_key: "XYZ"});



const request = require('request');


app.post("/sharelocation",auth,async(req,res) =>{

    const api = eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQwMDM0ZGY5OWQ4MDQwNzk4NzFjNDU1YTg1MTE3NmQxIiwiaCI6Im11cm11cjY0In0=

  

        request({
            method: 'POST',
            url: 'https://api.openrouteservice.org/v2/matrix/driving-car',
            body: '{"locations":[[9.70093,48.477473],[9.207916,49.153868],[37.573242,55.801281],[115.663757,38.106467]]}',
            headers: {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Authorization': 'api',
                'Content-Type': 'application/json; charset=utf-8'
            }}, function (error, response, body) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
            console.log('Response:', body);
        });

       // https://api.openrouteservice.org/v2/matrix/driving-car

        // Add your api_key here
        const Matrix = new Openrouteservice.Matrix({ api_key: "XYZ"})

        try {
            let response = await Matrix.calculate({
            locations: [[8.690958, 49.404662], [8.687868, 49.390139], [8.687868, 49.390133]],
            profile: "driving-car",
            sources: ['all'],
            destinations: ['all']
        })
        // Add your own result handling here
            console.log("response: ", response)

        } catch (err) {
            console.log("An error occurred: " + err.status)
            console.error(await err.response.json())
        }


});